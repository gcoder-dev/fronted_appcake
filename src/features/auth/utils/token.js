const TOKEN_KEY = 'appcake_token'

function normalizeToken(rawToken) {
  if (typeof rawToken !== 'string') return ''
  return rawToken.replace(/^Bearer\s+/i, '').trim()
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  const normalizedToken = normalizeToken(token)
  if (!normalizedToken) return
  localStorage.setItem(TOKEN_KEY, normalizedToken)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}
