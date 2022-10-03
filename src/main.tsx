import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Layout from './layouts/MainLayout'
import { rootRouter } from './RootRouter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={rootRouter} />
    </Layout>
  </React.StrictMode>
)
