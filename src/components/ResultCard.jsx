import { riskColor, riskLabel, categoryLabel, formatNumber } from '../utils/formatNumber.js'

function Badge({ label, color }) {
  return (
    <span style={{
      background: color + '22', border: `1px solid ${color}44`,
      color, fontSize: '0.75rem', fontWeight: 600,
      padding: '3px 10px', borderRadius: '100px',
    }}>{label}</span>
  )
}

function StatBox({ label, value, color }) {
  return (
    <div style={{
      background: 'var(--navy)', border: '1px solid var(--border)',
      borderRadius: '10px', padding: '1rem 1.25rem', flex: 1, minWidth: '120px',
    }}>
      <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: color || 'var(--text)' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>{label}</div>
    </div>
  )
}

export default function ResultCard({ data }) {
  if (!data) return null

  const score = data.spam_score ?? 0
  const rColor = riskColor(score)

  return (
    <div style={{
      background: 'var(--navy2)', border: '1px solid var(--border)',
      borderRadius: '16px', overflow: 'hidden', marginTop: '2rem',
    }}>
      {/* Header bar */}
      <div style={{ background: rColor + '18', borderBottom: `1px solid ${rColor}33`, padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
            {formatNumber(data.number)}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>
            {data.carrier || 'Unbekannter Anbieter'} · {data.country || 'DE'}
            {data.line_type && ` · ${data.line_type === 'mobile' ? 'Mobilfunk' : 'Festnetz'}`}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <Badge label={riskLabel(score)} color={rColor} />
          {data.category && <Badge label={categoryLabel(data.category)} color="var(--muted)" />}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ padding: '1.5rem 1.75rem' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <StatBox label="Spam-Score" value={`${score}%`} color={rColor} />
          <StatBox label="Meldungen" value={data.reports ?? 0} />
          <StatBox label="Zuletzt gemeldet" value={data.last_reported ? new Date(data.last_reported).toLocaleDateString('de-DE') : '–'} />
          <StatBox label="Gültig" value={data.valid ? 'Ja' : 'Nein'} color={data.valid ? 'var(--teal)' : 'var(--red)'} />
        </div>

        {/* Risk bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '6px' }}>
            <span>Risiko-Bewertung</span><span>{score}%</span>
          </div>
          <div style={{ height: '6px', background: 'var(--navy3)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${score}%`, background: rColor, borderRadius: '3px', transition: 'width 0.8s ease' }} />
          </div>
        </div>

        {/* Comments / AI summary */}
        {data.summary && (
          <div style={{ background: 'var(--navy)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            <span style={{ color: 'var(--amber)', fontWeight: 600, fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>COMMUNITY-FAZIT</span>
            {data.summary}
          </div>
        )}

        {/* User comments */}
        {data.comments?.length > 0 && (
          <div style={{ marginTop: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '10px', fontWeight: 600, letterSpacing: '0.06em' }}>NUTZER-BERICHTE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.comments.map((c, i) => (
                <div key={i} style={{ background: 'var(--navy)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--text)' }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.75rem', marginRight: '8px' }}>
                    {new Date(c.date).toLocaleDateString('de-DE')}
                  </span>
                  {c.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
