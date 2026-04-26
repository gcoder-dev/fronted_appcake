import { useEffect, useMemo, useState } from 'react'

const initialForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  imagenArchivo: null,
  imagenUrl: '',
}

export function CakeFormModal({ isOpen, mode, cake, onClose, onSubmit, isSaving }) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (!isOpen) return
    if (cake) {
      setForm({
        nombre: cake.nombre || '',
        descripcion: cake.descripcion || '',
        precio: String(cake.precio || ''),
        imagenArchivo: null,
        imagenUrl: cake.imagen || '',
      })
      return
    }
    setForm(initialForm)
  }, [cake, isOpen])

  const modalTitle = useMemo(() => (mode === 'edit' ? 'Editar pastel' : 'Nuevo pastel'), [mode])

  if (!isOpen) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setForm((prev) => ({ ...prev, imagenArchivo: file }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSaving) return
    await onSubmit({
      ...form,
      precio: Number(form.precio),
    })
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-black text-[--color-cocoa]">{modalTitle}</h3>
          <button
            className="text-sm font-semibold text-[--color-mocha] disabled:opacity-60"
            onClick={onClose}
            type="button"
            disabled={isSaving}
          >
            Cerrar
          </button>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-[--color-brown]">Nombre</span>
            <input className="input-base" name="nombre" value={form.nombre} onChange={handleChange} required />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-[--color-brown]">Descripcion</span>
            <textarea
              className="input-base min-h-24"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-[--color-brown]">Precio</span>
            <input
              className="input-base"
              type="number"
              min="0"
              step="0.01"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-[--color-brown]">Subir imagen</span>
            <input
              className="input-base py-2"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isSaving}
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-[--color-brown]">Imagen URL (opcional)</span>
            <input
              className="input-base"
              name="imagenUrl"
              value={form.imagenUrl}
              onChange={handleChange}
              placeholder="/uploads/mi-imagen.jpg"
              disabled={isSaving}
            />
          </label>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={isSaving}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
