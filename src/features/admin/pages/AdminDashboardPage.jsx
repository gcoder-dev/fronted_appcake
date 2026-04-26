import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { fetchPasteles } from '../../catalog/api/catalogApi.js'
import { buildImageUrl } from '../../../shared/config/api.js'
import { formatPrice } from '../../../shared/utils/currency.js'
import { clearToken } from '../../auth/utils/token.js'
import { logoutAdmin } from '../../auth/api/authApi.js'
import { createPastel, deletePastel, updatePastel } from '../api/adminPastelesApi.js'
import { CakeFormModal } from '../components/CakeFormModal.jsx'

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [pasteles, setPasteles] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCake, setSelectedCake] = useState(null)

  const mode = selectedCake ? 'edit' : 'create'

  const getApiErrorMessage = (err, fallbackMessage) =>
    err?.response?.data?.message || err?.response?.data?.error || fallbackMessage

  const loadPasteles = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchPasteles()
      setPasteles(data ?? [])
    } catch (_err) {
      setError('Error al cargar pasteles.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPasteles()
  }, [])

  const openCreateModal = () => {
    if (saving) return
    setSelectedCake(null)
    setIsModalOpen(true)
  }

  const openEditModal = (cake) => {
    if (saving || deletingId !== null) return
    setSelectedCake(cake)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCake(null)
  }

  const handleSave = async (payload) => {
    setSaving(true)
    try {
      if (mode === 'edit' && selectedCake) {
        await updatePastel(selectedCake.id, payload)
      } else {
        await createPastel(payload)
      }
      closeModal()
      await loadPasteles()
    } catch (err) {
      setError(getApiErrorMessage(err, 'No se pudo guardar el pastel.'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (deletingId !== null) return
    const ok = window.confirm('Estas seguro de eliminar este pastel?')
    if (!ok) return
    try {
      setDeletingId(id)
      await deletePastel(id)
      await loadPasteles()
    } catch (err) {
      setError(getApiErrorMessage(err, 'No se pudo eliminar el pastel.'))
    } finally {
      setDeletingId(null)
    }
  }

  const handleLogout = async () => {
    try {
      await logoutAdmin()
    } catch (_err) {
      // Optional backend logout call.
    } finally {
      clearToken()
      navigate('/admin/login', { replace: true })
    }
  }

  return (
    <main className="min-h-screen bg-[--color-cream] px-6 py-10 md:px-10">
      <section className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[--color-cocoa]">Dashboard de Pasteles</h1>
            <p className="text-sm text-[--color-mocha]">Administra el catalogo y precios de AppCake.</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary" onClick={openCreateModal} disabled={saving || deletingId !== null}>
              <Plus size={18} /> Nuevo pastel
            </button>
            <button className="btn-secondary" onClick={handleLogout} disabled={saving || deletingId !== null}>
              Cerrar sesion
            </button>
          </div>
        </div>

        {loading && <p className="text-[--color-mocha]">Cargando...</p>}
        {error && <p className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-red-700">{error}</p>}

        {!loading && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pasteles.map((cake) => (
              <article key={cake.id} className="rounded-2xl border border-[--color-latte] p-4">
                <img
                  src={buildImageUrl(cake.imagen)}
                  alt={cake.nombre}
                  className="h-40 w-full rounded-xl object-cover"
                />
                <h3 className="mt-3 text-lg font-bold text-[--color-brown]">{cake.nombre}</h3>
                <p className="mt-2 text-sm text-[--color-mocha]">{cake.descripcion}</p>
                <p className="mt-3 text-xl font-black text-[--color-cocoa]">{formatPrice(cake.precio)}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    className="btn-secondary"
                    onClick={() => openEditModal(cake)}
                    disabled={saving || deletingId !== null}
                  >
                    <Pencil size={16} /> Editar
                  </button>
                  <button
                    className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={() => handleDelete(cake.id)}
                    disabled={deletingId !== null || saving}
                  >
                    <Trash2 size={16} className="inline" /> {deletingId === cake.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <CakeFormModal
        isOpen={isModalOpen}
        mode={mode}
        cake={selectedCake}
        onClose={closeModal}
        onSubmit={handleSave}
        isSaving={saving}
      />
    </main>
  )
}
