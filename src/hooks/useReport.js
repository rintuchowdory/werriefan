import { useState, useCallback } from 'react'

const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'https://numcheck-proxy.YOUR-SUBDOMAIN.workers.dev'

export function useReport() {
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [loading, setLoading] = useState(false)

  const report = useCallback(async ({ number, category, comment }) => {
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch(`${WORKER_URL}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, category, comment }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }, [])

  return { report, status, loading }
}
