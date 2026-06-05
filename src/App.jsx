import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import ReportPage from './pages/ReportPage.jsx'

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/suche" element={<SearchPage />} />
          <Route path="/nummer/:number" element={<SearchPage />} />
          <Route path="/melden" element={<ReportPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
