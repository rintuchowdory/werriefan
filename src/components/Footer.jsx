import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      color: 'var(--muted)', fontSize: '0.8rem', flexWrap: 'wrap', gap: '1rem',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
        Wer<span style={{ color: 'var(--amber)' }}>RiefAn</span>.de
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, marginLeft: '1rem' }}>
          © {new Date().getFullYear()} · DSGVO-konform
        </span>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/suche">Suche</Link>
        <Link to="/melden">Melden</Link>
        <a href="#">Datenschutz</a>
        <a href="#">Impressum</a>
        <a href="#">API</a>
      </div>
    </footer>
  )
}
