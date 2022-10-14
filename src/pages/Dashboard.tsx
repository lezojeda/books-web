import { MainPageTitle, NavbarVolumeSearch } from '../components/ui'

export const Dashboard = () => {
  return (
    <div className="mb-4">
      <MainPageTitle className="mb-2 text-center" title="Dashboard" />
      <NavbarVolumeSearch />
    </div>
  )
}

export default Dashboard