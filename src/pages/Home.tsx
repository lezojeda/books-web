import { Link } from 'react-router-dom'
import { MainPageTitle } from '../components/ui'
import { getToken, TOKEN_ITEM_KEY } from '../utils/auth.utils'

function Home() {
  const signOut = () => {
    localStorage.removeItem(TOKEN_ITEM_KEY)
    location.reload()
  }
  return (
    <>
      <MainPageTitle className="mb-4" title="Home" />
      {getToken() ? (
        <span
          className="hover:underline hover:opacity-50 cursor-pointer"
          onClick={signOut}
        >
          Sign out
        </span>
      ) : (
        <Link to="signin">Sign in</Link>
      )}
    </>
  )
}

export default Home
