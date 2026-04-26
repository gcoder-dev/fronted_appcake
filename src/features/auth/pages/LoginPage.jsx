import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { loginAdmin } from '../api/authApi.js'
import { setToken } from '../utils/token.js'

export function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ usuario: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await loginAdmin(form)
      const rawToken = data?.token ?? data?.accessToken ?? data?.jwt ?? ''
      const loginOk = data?.ok ?? Boolean(rawToken)

      if (loginOk && rawToken) {
        setToken(rawToken)
        navigate('/admin', { replace: true })
      } else {
        setError('Sesion iniciada, pero no recibimos token valido del backend.')
      }
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message || err?.response?.data?.error || ''
      setError(backendMessage || 'No se pudo iniciar sesion. Verifica tus datos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[--color-cream] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <LockKeyhole className="text-[--color-chocolate]" />
          <h1 className="text-2xl font-black text-[--color-cocoa]">Panel Administrativo</h1>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[--color-brown]">Usuario</span>
            <input
              className="input-base"
              name="usuario"
              value={form.usuario}
              onChange={onChange}
              required
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-[--color-brown]">Contrasena</span>
            <input
              className="input-base"
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
            />
          </label>

          {error && <p className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
            {loading ? 'Ingresando...' : 'Entrar al dashboard'}
          </button>
        </form>
      </div>
    </main>
  )
}
