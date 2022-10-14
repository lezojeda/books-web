import { Link, Outlet, useLocation } from 'react-router-dom'
import { MainPageTitle } from '../components/ui'
import { getToken, TOKEN_ITEM_KEY } from '../utils/auth.utils'

function Root() {
  const location = useLocation()
  const signOut = () => {
    localStorage.removeItem(TOKEN_ITEM_KEY)
    window.location.reload()
  }
  return (
    <>
      <Outlet />{' '}
      {location.pathname === '/' && (
        <MainPageTitle className="mb-4" title="Home" />
      )}
      {location.pathname !== '/auth' && (
        <>
          {getToken() ? (
            <a
              className="hover:underline hover:opacity-50 cursor-pointer"
              onClick={signOut}
            >
              Sign out
            </a>
          ) : (
            <Link to="auth">Sign in</Link>
          )}
        </>
      )}
    </>
  )
}

export default Root
