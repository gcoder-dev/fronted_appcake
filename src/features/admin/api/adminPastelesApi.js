import { http } from '../../../shared/api/httpClient.js'

function toFormData(payload) {
  const formData = new FormData()
  formData.append('nombre', payload.nombre)
  formData.append('descripcion', payload.descripcion)
  formData.append('precio', String(payload.precio))

  if (payload.imagenArchivo) {
    formData.append('imagenArchivo', payload.imagenArchivo)
  } else if (payload.imagenUrl) {
    formData.append('imagenUrl', payload.imagenUrl)
  }

  return formData
}

export async function createPastel(payload) {
  const formData = toFormData(payload)
  const { data } = await http.post('/pasteles', formData)
  return data
}

export async function updatePastel(id, payload) {
  const formData = toFormData(payload)
  const { data } = await http.put(`/pasteles/${id}`, formData)
  return data
}

export async function deletePastel(id) {
  const { data } = await http.delete(`/pasteles/${id}`)
  return data
}
