import { buildImageUrl } from '../../../shared/config/api.js'
import { formatPrice } from '../../../shared/utils/currency.js'

export function CakeCard({ cake, onImageClick }) {
  const imageUrl = buildImageUrl(cake.imagen)

  return (
    <article className="cake-card">
      <button
        type="button"
        onClick={() => onImageClick?.(cake, imageUrl)}
        className="cursor-zoom-in rounded-2xl text-left"
        aria-label={`Ver imagen de ${cake.nombre} en grande`}
      >
        <img src={imageUrl} alt={cake.nombre} className="h-56 w-full rounded-2xl object-cover" />
      </button>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-[--color-brown]">{cake.nombre}</h3>
        <p className="min-h-[72px] text-sm text-[--color-mocha]">{cake.descripcion}</p>
      </div>
      <p className="text-2xl font-black text-[--color-cocoa]">{formatPrice(cake.precio)}</p>
    </article>
  )
}
