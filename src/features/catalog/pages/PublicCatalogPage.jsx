import { useEffect, useMemo, useState } from 'react'
import { Cake, Sparkles } from 'lucide-react'
import { CakeCard } from '../components/CakeCard.jsx'
import { fetchConfig, fetchPasteles } from '../api/catalogApi.js'

export function PublicCatalogPage() {
  const [pasteles, setPasteles] = useState([])
  const [telefono, setTelefono] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCake, setSelectedCake] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [pastelesData, configData] = await Promise.all([fetchPasteles(), fetchConfig()])
        setPasteles(pastelesData ?? [])
        setTelefono(configData?.telefono ?? '')
      } catch (_err) {
        setError('No pudimos cargar el catalogo. Intenta nuevamente en unos segundos.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!selectedCake) return undefined

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setSelectedCake(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedCake])

  const whatsappLink = useMemo(() => {
    if (!telefono) return '#'
    const message = encodeURIComponent('Hola AppCake, me interesa hacer un pedido.')
    return `https://wa.me/${telefono}?text=${message}`
  }, [telefono])

  return (
    <main className="min-h-screen bg-[--color-cream]">
      <section className="hero-gradient relative overflow-hidden px-6 pb-20 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[--color-brown] shadow">
            <Sparkles size={16} /> Del horno a tu celebracion
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight text-[--color-cocoa] md:text-6xl">
            Artisan cakes that turn cravings into unforgettable moments.
          </h1>
          <p className="mt-5 max-w-xl text-base text-[--color-mocha] md:text-lg">
            Designed with premium ingredients, elegant style, and homemade flavor for weddings,
            birthdays, and special events.
          </p>
          <a href="#catalogo" className="btn-primary mt-8 inline-flex">
            View catalog
          </a>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="mb-8 flex items-center gap-3">
          <Cake className="text-[--color-chocolate]" />
          <h2 className="text-3xl font-extrabold text-[--color-cocoa]">CakeStyle App Catalog</h2>
        </div>

        {loading && <p className="text-[--color-mocha]">Cargando pasteles...</p>}
        {error && <p className="rounded-xl bg-red-100 px-4 py-3 text-red-700">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {pasteles.map((cake) => (
              <CakeCard
                key={cake.id}
                cake={cake}
                onImageClick={(selected, imageUrl) =>
                  setSelectedCake({ name: selected.nombre, imageUrl })
                }
              />
            ))}
          </div>
        )}
      </section>

      {selectedCake && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedCake(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada de ${selectedCake.name}`}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xl font-bold text-[--color-cocoa]"
            onClick={() => setSelectedCake(null)}
            aria-label="Cerrar imagen"
          >
            X
          </button>
          <img
            src={selectedCake.imageUrl}
            alt={selectedCake.name}
            className="max-h-[90vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      {telefono && (
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="floating-whatsapp"
          aria-label="Contactar por WhatsApp"
        >
          WhatsApp
        </a>
      )}
    </main>
  )
}
