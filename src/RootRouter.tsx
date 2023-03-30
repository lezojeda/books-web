import React from 'react'
import { createBrowserRouter, Params } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import BookSearchResults from './pages/bookSearchResultsList/BookSearchResults'
import { getVolume, searchVolumes } from './services/volumes'

const Root = React.lazy(() => import('./pages/Root'))
const ErrorPage = React.lazy(() => import('./pages/Error'))
const Auth = React.lazy(() => import('./pages/Auth'))
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'))
const Volume = React.lazy(() => import('./pages/Volume'))

export const VolumeLoader = async ({
  params,
}: {
  params: Params<'volumeId'>
}) => {
  return getVolume(params.volumeId)
}

export const BookSearchResultsLoader = async ({
  request,
}: {
  request: { url: string }
}) => {
  const url = new URL(request.url)
  const searchValue = url.searchParams.get('q')
  const startIndex = Number(url.searchParams.get('startIndex'))

  const volumes = await searchVolumes(searchValue ?? '', startIndex ?? 0, 20)

  return volumes
}

export const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Auth />,
        path: 'auth',
      },
      {
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        path: 'dashboard',
      },
      {
        element: (
          <ProtectedRoute>
            <Volume />
          </ProtectedRoute>
        ),
        loader: VolumeLoader,
        path: 'volumes/:volumeId',
      },
      {
        element: (
          <ProtectedRoute>
            <BookSearchResults />
          </ProtectedRoute>
        ),
        loader: BookSearchResultsLoader,
        path: 'search',
      },
    ],
  },
])
