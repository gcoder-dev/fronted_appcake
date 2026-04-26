import { http } from '../../../shared/api/httpClient.js'

export async function fetchPasteles() {
  const { data } = await http.get('/pasteles')
  return data
}

export async function fetchConfig() {
  const { data } = await http.get('/config')
  return data
}
