import { Link } from 'react-router-dom'
import { SecondaryButton } from '../components/ui'
import { TOKEN_ITEM_KEY } from '../utils/auth.utils'

export const Navbar = () => {
  const signOut = () => {
    localStorage.removeItem(TOKEN_ITEM_KEY)
    window.location.reload()
  }

  return (
    <nav className="absolute top-0 flex items-center justify-end w-full p-2 space-x-6">
      <Link to="/dashboard">Dashboard</Link>
      <SecondaryButton content="Sign out" onClick={signOut} />
    </nav>
  )
}
