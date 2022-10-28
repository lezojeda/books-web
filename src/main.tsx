import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './contexts/userContext'
import Layout from './layouts/MainLayout'
import { rootRouter } from './RootRouter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <UserProvider>
        <Layout>
          <RouterProvider router={rootRouter} />
        </Layout>
      </UserProvider>
    </Suspense>
  </React.StrictMode>
)
