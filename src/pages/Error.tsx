import { useRouteError } from 'react-router-dom'
import { MainPageTitle } from '../components/ui'

type RouteError = {
  data: any
  status: number
  statusText?: string
  message?: string
}

function ErrorPage() {
  const error = useRouteError() as RouteError
  console.error(error)

  return (
    <>
      <MainPageTitle className="mb-2" title="Oops!" />
      <p className="text-xl">Sorry, an unexpected error has occurred:</p>
      <p className="text-xl">
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  )
}

export default ErrorPage
