import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated, isTokenExpired } from '../utils/auth.utils'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  if (!isAuthenticated() || isTokenExpired()) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }
  return children
}
