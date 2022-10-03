import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import SignIn from './pages/auth/SignIn'
import Dashboard from './pages/dashboard/Dashboard'
import ErrorPage from './pages/Error'
import Home from './pages/Home'

export const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
])
