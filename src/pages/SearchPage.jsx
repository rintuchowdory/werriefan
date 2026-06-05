import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import ResultCard from '../components/ResultCard.jsx'
import { usePhoneLookup } from '../hooks/usePhoneLookup.js'
import { Link } from 'react-router-dom'

export default function SearchPage() {
  const { number } = useParams()
  const { lookup, result, loading, error } = usePhoneLookup()

  useEffect(() => {
    if (number) lookup(decodeURIComponent(number))
  }, [number])

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.02em', marginBottom: '1.75rem' }}>
        Nummer prüfen
      </h1>

      <SearchBar initialValue={number ? decodeURIComponent(number) : ''} />

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</div>
          <p>Nummer wird geprüft…</p>
        </div>
      )}

      {error && (
        <div style={{
          marginTop: '1.5rem', background: 'rgba(255,71,87,0.1)',
          border: '1px solid rgba(255,71,87,0.3)', borderRadius: '10px',
          padding: '1rem 1.25rem', color: 'var(--red)', fontSize: '0.9rem',
        }}>
          ⚠ Fehler: {error}. Bitte überprüfe die Nummer und versuche es erneut.
        </div>
      )}

      {result && <ResultCard data={result} />}

      {result && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link to={`/melden?number=${encodeURIComponent(result.number)}`}
            style={{
              display: 'inline-block',
              border: '1px solid var(--border)', borderRadius: '8px',
              padding: '0.65rem 1.5rem', fontSize: '0.85rem', color: 'var(--muted)',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = 'rgba(245,166,35,0.4)'; e.target.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--muted)' }}
          >
            + Diese Nummer als Spam melden
          </Link>
        </div>
      )}

      {!number && !loading && !result && (
        <div style={{ marginTop: '4rem', color: 'var(--muted)', textAlign: 'center', fontSize: '0.9rem' }}>
          <p>Gib eine Rufnummer ein, um Informationen abzurufen.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Beispiel: <code style={{ background: 'var(--navy2)', padding: '2px 8px', borderRadius: '4px' }}>030 12345678</code></p>
        </div>
      )}

      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
