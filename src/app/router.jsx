import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicCatalogPage } from '../features/catalog/pages/PublicCatalogPage.jsx'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PublicCatalogPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
