import { Link, useRouteError } from 'react-router-dom'
import { MainPageTitle } from '../components/ui'

type RouteError = {
  status: number
  statusText?: string
  message?: string
}

const ErrorPage = () => {
  const error = useRouteError() as RouteError
  console.error(error)

  return (
    <>
      <MainPageTitle className="mb-2" title="Oops!" />
      <p className="text-xl">Sorry, an unexpected error has occurred:</p>
      <p className="text-xl mb-4">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go back to home</Link>
    </>
  )
}

export default ErrorPage
