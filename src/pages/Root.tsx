import { Link, Outlet, useLocation } from 'react-router-dom'
import { MainPageTitle, SecondaryButton } from '../components/ui'
import { getToken, TOKEN_ITEM_KEY } from '../utils/auth.utils'

export const Root = () => {
  const location = useLocation()
  const signOut = () => {
    localStorage.removeItem(TOKEN_ITEM_KEY)
    window.location.reload()
  }
  return (
    <>
      <div className="mb-6 w-full">
        <Outlet />{' '}
      </div>
      {location.pathname === '/' && (
        <>
          <MainPageTitle className="mb-2" title="Home" />
          {getToken() && (
            <Link to="dashboard" style={{ marginBottom: '24px' }}>
              Dashboard
            </Link>
          )}
        </>
      )}
      {location.pathname !== '/auth' && (
        <>
          {getToken() ? (
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
