import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import BookSearchResults from './pages/BookSearchResults'
import { loader as VolumeLoader } from './pages/Volume'

const Root = React.lazy(() => import('./pages/Root'))
const ErrorPage = React.lazy(() => import('./pages/Error'))
const Auth = React.lazy(() => import('./pages/Auth'))
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'))
const Volume = React.lazy(() => import('./pages/Volume'))

export const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
      {
        path: 'volumes/:volumeId',
        element: (
          <ProtectedRoute>
            <Volume />
          </ProtectedRoute>
        ),
        loader: VolumeLoader,
      },
      {
        path: 'search',
        element: (
          <ProtectedRoute>
            <BookSearchResults />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
