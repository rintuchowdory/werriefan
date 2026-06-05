import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.1rem 2rem', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, background: 'rgba(10,15,30,0.92)',
      backdropFilter: 'blur(12px)', zIndex: 100,
    }}>
      <Link to="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
        Wer<span style={{ color: 'var(--amber)' }}>RiefAn</span>.de
      </Link>
      <div style={{ display: 'flex', gap: '1.75rem', fontSize: '0.875rem', color: 'var(--muted)' }}>
        <Link to="/suche">Suche</Link>
        <Link to="/melden">Nummer melden</Link>
        <a href="#preise">Preise</a>
      </div>
      <Link to="/suche" style={{
        background: 'var(--amber)', color: '#0A0F1E',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem',
        padding: '0.5rem 1.2rem', borderRadius: '6px',
      }}>
        Kostenlos starten
      </Link>
    </nav>
  )
}
