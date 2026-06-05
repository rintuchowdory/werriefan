// Format a raw number string for display: +49 30 12345678
export function formatNumber(raw) {
  if (!raw) return ''
  const clean = raw.replace(/\D/g, '')
  if (raw.startsWith('+49') && clean.length >= 10) {
    const local = clean.slice(2)
    if (local.length === 10) return `+49 ${local.slice(0,3)} ${local.slice(3,6)} ${local.slice(6)}`
    return `+49 ${local}`
  }
  return raw
}

// Returns risk label color from score 0–100
export function riskColor(score) {
  if (score >= 70) return 'var(--red)'
  if (score >= 40) return 'var(--amber)'
  return 'var(--teal)'
}

export function riskLabel(score) {
  if (score >= 70) return 'Hohes Risiko'
  if (score >= 40) return 'Mittleres Risiko'
  return 'Sicher'
}

export function categoryLabel(cat) {
  const map = {
    spam: 'Spam',
    telemarketing: 'Telemarketing',
    scam: 'Betrug',
    robocall: 'Robocall',
    unknown: 'Unbekannt',
    safe: 'Seriös',
    debt_collector: 'Inkasso',
    survey: 'Umfrage',
  }
  return map[cat] || cat
}
