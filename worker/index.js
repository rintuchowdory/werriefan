// WerRiefAn.de – Cloudflare Worker Proxy
// Wraps numverify API, adds CORS, rate limiting, and report storage (KV)
//
// Secrets to set via wrangler:
//   wrangler secret put NUMVERIFY_API_KEY
//
// KV namespace binding (wrangler.toml):
//   [[kv_namespaces]]
//   binding = "REPORTS"
//   id = "YOUR_KV_NAMESPACE_ID"

const ALLOWED_ORIGINS = [
  'https://rintuchowdory.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
]

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

function json(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  })
}

// Simple in-memory rate limit per IP (resets per Worker instance lifecycle)
const rateLimitMap = new Map()
function isRateLimited(ip) {
  const now = Date.now()
  const window = 60_000 // 1 minute
  const limit = 20      // 20 requests per minute per IP

  const entry = rateLimitMap.get(ip) || { count: 0, start: now }
  if (now - entry.start > window) {
    rateLimitMap.set(ip, { count: 1, start: now })
    return false
  }
  if (entry.count >= limit) return true
  entry.count++
  rateLimitMap.set(ip, entry)
  return false
}

// Normalize DE phone numbers to E.164
function normalizeNumber(raw) {
  let n = raw.replace(/[\s\-().]/g, '')
  if (n.startsWith('0') && !n.startsWith('00')) n = '+49' + n.slice(1)
  if (n.startsWith('00')) n = '+' + n.slice(2)
  if (!n.startsWith('+')) n = '+49' + n
  return n
}

// Fetch from numverify API
async function numverifyLookup(number, apiKey) {
  const url = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${encodeURIComponent(number)}&country_code=DE&format=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error('numverify error ' + res.status)
  return res.json()
}

// Merge numverify data with our community KV reports
async function buildResult(number, nvData, env) {
  let reports = 0, category = 'unknown', comments = [], lastReported = null

  if (env.REPORTS) {
    try {
      const raw = await env.REPORTS.get(`num:${number}`)
      if (raw) {
        const stored = JSON.parse(raw)
        reports = stored.count || 0
        category = stored.category || 'unknown'
        comments = (stored.comments || []).slice(-5) // last 5 comments
        lastReported = stored.lastReported || null
      }
    } catch (_) {}
  }

  // Derive spam_score: base from report count, max 95
  const scoreFromReports = Math.min(reports * 8, 95)
  const spam_score = reports === 0 ? 0 : Math.max(10, scoreFromReports)

  return {
    number: nvData.international_format || number,
    valid: nvData.valid ?? false,
    carrier: nvData.carrier || null,
    line_type: nvData.line_type || null,
    country: nvData.country_code || 'DE',
    spam_score,
    reports,
    category,
    comments,
    last_reported: lastReported,
    summary: reports > 0
      ? `Diese Nummer wurde ${reports}x als ${category} gemeldet.`
      : 'Noch keine Community-Meldungen für diese Nummer.',
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const url = new URL(request.url)

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    // Rate limit
    if (isRateLimited(ip)) {
      return json({ error: 'Rate limit exceeded. Try again in a minute.' }, 429, origin)
    }

    // GET /lookup?number=...
    if (request.method === 'GET' && url.pathname === '/lookup') {
      const rawNumber = url.searchParams.get('number')
      if (!rawNumber) return json({ error: 'Missing number parameter' }, 400, origin)

      const number = normalizeNumber(rawNumber)

      try {
        const nvData = await numverifyLookup(number, env.NUMVERIFY_API_KEY)
        const result = await buildResult(number, nvData, env)
        return json(result, 200, origin)
      } catch (err) {
        return json({ error: err.message }, 502, origin)
      }
    }

    // POST /report  { number, category, comment }
    if (request.method === 'POST' && url.pathname === '/report') {
      let body
      try { body = await request.json() } catch { return json({ error: 'Invalid JSON' }, 400, origin) }

      const { number: rawNum, category = 'unknown', comment = '' } = body
      if (!rawNum) return json({ error: 'Missing number' }, 400, origin)

      const number = normalizeNumber(rawNum)

      if (env.REPORTS) {
        try {
          const existing = await env.REPORTS.get(`num:${number}`)
          const stored = existing ? JSON.parse(existing) : { count: 0, category: 'unknown', comments: [], lastReported: null }
          stored.count = (stored.count || 0) + 1
          stored.category = category
          stored.lastReported = new Date().toISOString()
          if (comment.trim()) {
            stored.comments = stored.comments || []
            stored.comments.push({ text: comment.trim().slice(0, 300), date: stored.lastReported })
            if (stored.comments.length > 20) stored.comments = stored.comments.slice(-20)
          }
          await env.REPORTS.put(`num:${number}`, JSON.stringify(stored))
        } catch (err) {
          return json({ error: 'KV write failed: ' + err.message }, 500, origin)
        }
      }

      return json({ success: true, number }, 200, origin)
    }

    return json({ error: 'Not found' }, 404, origin)
  }
}
