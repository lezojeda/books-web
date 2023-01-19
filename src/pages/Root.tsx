import { Link, Outlet, useLocation } from 'react-router-dom'
import { MainPageTitle, SecondaryButton } from '../components/ui'
import { isTokenExpired, TOKEN_ITEM_KEY } from '../utils/auth.utils'

export const Root = () => {
  const location = useLocation()
  const signOut = () => {
    localStorage.removeItem(TOKEN_ITEM_KEY)
    window.location.reload()
  }
  return (
    <>
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
      {location.pathname !== '/auth' && (
        <>
          {!isTokenExpired() ? (
            <SecondaryButton content="Sign out" onClick={signOut} />
          ) : (
            <Link to="auth">Sign in</Link>
          )}
        </>
      )}
    </>
  )
}

export default Root
