import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserContext } from '../contexts/userContext'
import { isAuthenticated, isTokenExpired } from '../utils/auth.utils'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useContext(UserContext)
  const location = useLocation()
  if (!isAuthenticated() || isTokenExpired() || !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }
  return children
}

export default ProtectedRoute
