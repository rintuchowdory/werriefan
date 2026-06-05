import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useReport } from '../hooks/useReport.js'

const CATEGORIES = [
  { value: 'spam',          label: 'Spam' },
  { value: 'telemarketing', label: 'Telemarketing / Werbung' },
  { value: 'scam',          label: 'Betrug / Phishing' },
  { value: 'robocall',      label: 'Robocall / Automatischer Anruf' },
  { value: 'debt_collector',label: 'Inkasso' },
  { value: 'survey',        label: 'Umfrage' },
  { value: 'unknown',       label: 'Unbekannt / Sonstiges' },
]

const inputStyle = {
  background: 'var(--navy2)', border: '1px solid var(--border)',
  borderRadius: '8px', padding: '0.7rem 1rem', color: 'var(--text)',
  fontSize: '0.95rem', width: '100%', outline: 'none',
  fontFamily: 'var(--font-body)', transition: 'border-color 0.2s',
}

export default function ReportPage() {
  const [searchParams] = useSearchParams()
  const [number, setNumber]     = useState(searchParams.get('number') || '')
  const [category, setCategory] = useState('spam')
  const [comment, setComment]   = useState('')
  const { report, status, loading } = useReport()

  const handleSubmit = () => {
    if (!number.trim()) return
    report({ number: number.trim(), category, comment })
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
        Nummer melden
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
        Hilf der Community – melde Spam, Betrug und unerwünschte Anrufe.
      </p>

      {status === 'success' ? (
        <div style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.3)', borderRadius: '12px', padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✓</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--teal)', marginBottom: '0.5rem' }}>Danke für deine Meldung!</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Die Nummer wurde der Community-Datenbank hinzugefügt.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '6px', fontWeight: 600, letterSpacing: '0.04em' }}>TELEFONNUMMER</label>
            <input
              style={inputStyle}
              type="tel"
              value={number}
              onChange={e => setNumber(e.target.value)}
              placeholder="+49 30 12345678"
              onFocus={e => e.target.style.borderColor = 'rgba(245,166,35,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '6px', fontWeight: 600, letterSpacing: '0.04em' }}>KATEGORIE</label>
            <select
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
              value={category}
              onChange={e => setCategory(e.target.value)}
              onFocus={e => e.target.style.borderColor = 'rgba(245,166,35,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            >
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '6px', fontWeight: 600, letterSpacing: '0.04em' }}>ERFAHRUNGSBERICHT (OPTIONAL)</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: '100px', lineHeight: 1.6 }}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Was wurde dir angeboten? Wie oft hat die Nummer angerufen?"
              onFocus={e => e.target.style.borderColor = 'rgba(245,166,35,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {status === 'error' && (
            <p style={{ color: 'var(--red)', fontSize: '0.85rem' }}>⚠ Fehler beim Senden. Bitte versuche es erneut.</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !number.trim()}
            style={{
              background: loading ? 'var(--navy3)' : 'var(--amber)',
              color: loading ? 'var(--muted)' : '#0A0F1E',
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '0.95rem', padding: '0.85rem',
              borderRadius: '8px', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Wird gesendet…' : 'Nummer melden'}
          </button>
        </div>
      )}
    </div>
  )
}
