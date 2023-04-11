import { Link, Outlet, useLocation } from 'react-router-dom'
import { MainPageTitle } from '../components/ui'
import { isAuthenticated, isTokenExpired } from '../utils/auth.utils'
import { Navbar } from '../layouts/Navbar'

export const Root = () => {
  const location = useLocation()
  const userIsNotAuthenticated = !isAuthenticated() || isTokenExpired()

  return (
    <>
      {location.pathname !== '/auth' && !userIsNotAuthenticated && <Navbar />}
      <Outlet />{' '}
      {location.pathname === '/' && (
        <>
          <MainPageTitle className="mb-2" title="Home" />
          {!userIsNotAuthenticated && (
            <Link to="dashboard" style={{ marginBottom: '24px' }}>
              Dashboard
            </Link>
          )}
          {userIsNotAuthenticated && (
            <Link to="auth" style={{ marginBottom: '24px' }}>
             Sign in/sign up
          </Link>
          )}
        </>
      )}
    </>
  )
}

export default Root
