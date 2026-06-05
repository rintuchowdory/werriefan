import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const s = {
  wrap: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'var(--navy2)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '6px 6px 6px 18px',
    transition: 'border-color 0.2s',
  },
  input: {
    background: 'none', border: 'none', outline: 'none',
    color: 'var(--text)', fontSize: '1rem', flex: 1,
    fontFamily: 'var(--font-body)',
  },
  btn: {
    background: 'var(--amber)', color: '#0A0F1E',
    fontFamily: 'var(--font-display)', fontWeight: 700,
    fontSize: '0.9rem', padding: '0.65rem 1.4rem',
    borderRadius: '8px', border: 'none', whiteSpace: 'nowrap',
    transition: 'background 0.2s',
  },
}

export default function SearchBar({ large = false, initialValue = '' }) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  const handleSearch = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    navigate(`/nummer/${encodeURIComponent(trimmed)}`)
  }

  return (
    <div style={{ ...s.wrap, maxWidth: large ? '560px' : '100%', width: '100%' }}
      onFocus={e => e.currentTarget.style.borderColor = 'rgba(245,166,35,0.5)'}
      onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <input
        style={s.input}
        type="tel"
        placeholder="z.B. +49 30 12345678 oder 030 12345678"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
        aria-label="Telefonnummer suchen"
      />
      <button
        style={s.btn}
        onClick={handleSearch}
        onMouseEnter={e => e.target.style.background = 'var(--amber2)'}
        onMouseLeave={e => e.target.style.background = 'var(--amber)'}
      >
        Nummer prüfen
      </button>
    </div>
  )
}
