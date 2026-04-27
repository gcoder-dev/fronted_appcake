import { buildImageUrl } from '../../../shared/config/api.js'
import { formatPrice } from '../../../shared/utils/currency.js'

export function CakeCard({ cake, onImageClick }) {
  const imageUrl = buildImageUrl(cake.imagen)
  const fallbackSvg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500'%3E%3Crect width='100%25' height='100%25' fill='%23f8efe4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b3f2e' font-family='Arial' font-size='32'%3EImagen no disponible%3C/text%3E%3C/svg%3E"

  const handleImageError = (event) => {
    const current = event.currentTarget
    const attemptedFallback = current.dataset.fallbackApplied === 'true'

    if (!attemptedFallback && cake.imagen?.startsWith('/')) {
      current.dataset.fallbackApplied = 'true'
      current.src = `${window.location.origin}${cake.imagen}`
      return
    }

    current.src = fallbackSvg
  }

  return (
    <article className="cake-card">
      <button
        type="button"
        onClick={() => onImageClick?.(cake, imageUrl)}
        className="cursor-zoom-in rounded-2xl text-left"
        aria-label={`Ver imagen de ${cake.nombre} en grande`}
      >
        <img
          src={imageUrl}
          alt={cake.nombre}
          className="h-56 w-full rounded-2xl object-cover"
          onError={handleImageError}
        />
      </button>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-[--color-brown]">{cake.nombre}</h3>
        <p className="min-h-[72px] text-sm text-[--color-mocha]">{cake.descripcion}</p>
      </div>
      <p className="text-2xl font-black text-[--color-cocoa]">{formatPrice(cake.precio)}</p>
    </article>
  )
}
