import { http } from '../../../shared/api/httpClient.js'

export async function loginAdmin(payload) {
  const { data } = await http.post('/auth/login', payload)
  return data
}

export async function logoutAdmin() {
  const { data } = await http.post('/auth/logout')
  return data
}

export async function getSession() {
  const { data } = await http.get('/auth/session')
  return data
}
