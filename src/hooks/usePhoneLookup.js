import { useState, useCallback } from 'react'

const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'https://numcheck-proxy.YOUR-SUBDOMAIN.workers.dev'

export function usePhoneLookup() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const lookup = useCallback(async (rawNumber) => {
    setLoading(true)
    setError(null)
    setResult(null)

    // Normalize: strip spaces/dashes, ensure +49 prefix for DE numbers
    let number = rawNumber.replace(/[\s\-().]/g, '')
    if (number.startsWith('0') && !number.startsWith('00')) {
      number = '+49' + number.slice(1)
    }
    if (!number.startsWith('+')) {
      number = '+49' + number
    }

    try {
      const res = await fetch(`${WORKER_URL}/lookup?number=${encodeURIComponent(number)}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'Fehler bei der Abfrage')
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return { lookup, result, loading, error, reset }
}
