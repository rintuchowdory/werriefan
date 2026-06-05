import SearchBar from '../components/SearchBar.jsx'

const features = [
  { icon: '🔍', title: 'Sofort-Erkennung', desc: 'Erkenne in unter 0,3 Sekunden ob eine Nummer Spam, Betrug oder seriös ist.' },
  { icon: '🚫', title: 'Spam-Datenbank', desc: '2,4 Millionen gemeldete Nummern aus der deutschen Community – täglich aktualisiert.' },
  { icon: '🔒', title: 'DSGVO-konform', desc: 'Deine Kontakte werden nie gespeichert oder hochgeladen. Alles auf deutschen Servern.' },
  { icon: '👥', title: 'Community-Power', desc: 'Nutzer melden Spam-Nummern in Echtzeit. Je mehr melden, desto besser der Schutz.' },
  { icon: '⚡', title: 'REST API', desc: 'Entwickler-API zum Einbinden in eigene Apps und Systeme.' },
  { icon: '🇩🇪', title: 'Für Deutschland', desc: 'Optimiert für +49-Nummern, deutsche Vorwahlen und lokale Telefondienstleister.' },
]

const stats = [
  { num: '2,4 Mio.', label: 'Spam-Nummern' },
  { num: '99 %', label: 'Erkennungsrate' },
  { num: '< 0,3s', label: 'Antwortzeit' },
  { num: 'Kostenlos', label: 'Basisnutzung' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '5rem 2rem 3rem', maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.3)',
          color: 'var(--amber)', fontSize: '0.77rem', fontWeight: 500,
          padding: '0.4rem 1rem', borderRadius: '100px', marginBottom: '2rem', letterSpacing: '0.04em',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--amber)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Echtzeit-Anrufer-Erkennung für Deutschland
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(2.2rem,6vw,3.8rem)', lineHeight: 1.05,
          letterSpacing: '-0.03em', marginBottom: '1.25rem',
        }}>
          Wissen, <span style={{ color: 'var(--amber)' }}>wer anruft</span> –<br />bevor du abnimmst.
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', maxWidth: '540px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          WerRiefAn.de identifiziert unbekannte Nummern, blockiert Spam-Anrufe und schützt deine Privatsphäre. Kostenlos, DSGVO-konform, made for Germany.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <SearchBar large />
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
          Keine Anmeldung &nbsp;·&nbsp; <span style={{ color: 'var(--teal)' }}>99 % Erkennungsrate</span> &nbsp;·&nbsp; DSGVO-konform
        </p>
      </section>

      {/* Stats */}
      <div style={{
        display: 'flex', maxWidth: '900px', margin: '0 auto 4rem',
        border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden',
        background: 'var(--navy2)',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: '1.5rem', textAlign: 'center',
            borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--amber)' }}>{s.num}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section style={{ padding: '3rem 2rem 5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.73rem', color: 'var(--amber)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Funktionen</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,2.4rem)', letterSpacing: '-0.02em', marginBottom: '3rem' }}>
          Alles, was du zum Schutz brauchst
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.25rem' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'var(--navy2)', border: '1px solid var(--border)',
              borderRadius: '12px', padding: '1.75rem',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,166,35,0.35)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}`}</style>
    </div>
  )
}
