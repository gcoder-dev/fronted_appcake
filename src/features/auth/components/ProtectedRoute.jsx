import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getSession } from '../api/authApi.js'
import { clearToken, getToken } from '../utils/token.js'

export function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    async function validateSession() {
      const token = getToken()
      if (!token) {
        setStatus('unauthorized')
        return
      }
      try {
        const data = await getSession()
        const isAdmin =
          data?.isAdmin === true ||
          data?.admin === true ||
          data?.role === 'ADMIN' ||
          data?.rol === 'ADMIN'
        setStatus(isAdmin ? 'authorized' : 'unauthorized')
      } catch (_error) {
        clearToken()
        setStatus('unauthorized')
      }
    }

    validateSession()
  }, [])

  if (status === 'checking') {
    return (
      <div className="grid min-h-screen place-items-center bg-[--color-cream]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[--color-brown]/20 border-t-[--color-brown]" />
      </div>
    )
  }

  if (status === 'unauthorized') {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
