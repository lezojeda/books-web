import { Link, Outlet, useLocation } from 'react-router-dom'
import { MainPageTitle } from '../components/ui'
import { isTokenExpired } from '../utils/auth.utils'
import { Navbar } from '../layouts/Navbar'

export const Root = () => {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/auth' && <Navbar />}
      <Outlet />{' '}
      {location.pathname === '/' && (
        <>
          <MainPageTitle className="mb-2" title="Home" />
          {!isTokenExpired() && (
            <Link to="dashboard" style={{ marginBottom: '24px' }}>
              Dashboard
            </Link>
          )}
        </>
      )}
    </>
  )
}

export default Root
