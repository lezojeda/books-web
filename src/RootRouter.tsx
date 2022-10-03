import { useEffect } from 'react'
import SignIn from './pages/auth/signin'
import { RoutePage } from './types/Routes'
import { isAuthenticated } from './utils/auth.utils'
import { Route, Routes } from 'react-router-dom'
import Signin from './pages/auth/signin'

function Router() {
  useEffect(() => {
    if (isAuthenticated()) {
      // const sessionData = getTokenData(getToken() || '')
      // if (sessionData) {
      //   setUser && setUser(sessionData)
      // }
    }
  }, [])

  const renderWithLayoutAndProvider = (
    Layout: any,
    component: React.ReactNode,
    Provider?: any
  ) => {
    if (Layout && Provider) {
      return (
        <Provider>
          <Layout>{component}</Layout>
        </Provider>
      )
    } else if (Layout) {
      return <Layout>{component}</Layout>
    }
    return <>{component}</>
  }

  return (
    <Routes>
      {/* {pages.concat(pages).map((page, index) => {
        return (
          <Route
            element={page.component
            }
            key={index}
            path={page.path}
          />
        )
      })} */}
      <Route path="/signin" element={<Signin />} />
    </Routes>
  )
}

export default Router
