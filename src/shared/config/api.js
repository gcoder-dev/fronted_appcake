const DEFAULT_API_URL = '/api'
const DEFAULT_UPLOADS_URL = typeof window !== 'undefined' ? window.location.origin : ''

export const API_BASE_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).trim()
export const UPLOADS_BASE_URL = (
  import.meta.env.VITE_UPLOADS_URL || DEFAULT_UPLOADS_URL
).trim()

export function buildImageUrl(imagePath = '') {
  if (!imagePath) return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  // Local static assets in /public should always resolve from the frontend app origin.
  if (imagePath.startsWith('/')) return imagePath
  return `${UPLOADS_BASE_URL}/uploads/${imagePath}`
}
