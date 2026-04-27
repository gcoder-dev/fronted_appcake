import { STATIC_PASTELES, STATIC_TELEFONO } from '../data/staticCatalogData.js'

export async function fetchPasteles() {
  return STATIC_PASTELES
}

export async function fetchConfig() {
  return { telefono: STATIC_TELEFONO }
}
