import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './layouts/MainLayout'
import Auth from './pages/auth/Auth'
import Dashboard from './pages/dashboard/Dashboard'
import ErrorPage from './pages/Error'
import Root from './pages/Root'

export const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Root />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
