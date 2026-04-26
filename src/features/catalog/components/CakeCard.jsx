import { buildImageUrl } from '../../../shared/config/api.js'
import { formatPrice } from '../../../shared/utils/currency.js'

export function CakeCard({ cake }) {
  return (
    <article className="cake-card">
      <img
        src={buildImageUrl(cake.imagen)}
        alt={cake.nombre}
        className="h-56 w-full rounded-2xl object-cover"
      />
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-[--color-brown]">{cake.nombre}</h3>
        <p className="min-h-[72px] text-sm text-[--color-mocha]">{cake.descripcion}</p>
      </div>
      <p className="text-2xl font-black text-[--color-cocoa]">{formatPrice(cake.precio)}</p>
    </article>
  )
}
