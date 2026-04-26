const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 2,
})

export function formatPrice(price) {
  return formatter.format(Number(price || 0))
}
