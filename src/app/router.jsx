import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicCatalogPage } from '../features/catalog/pages/PublicCatalogPage.jsx'
import { LoginPage } from '../features/auth/pages/LoginPage.jsx'
import { AdminDashboardPage } from '../features/admin/pages/AdminDashboardPage.jsx'
import { ProtectedRoute } from '../features/auth/components/ProtectedRoute.jsx'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<PublicCatalogPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
