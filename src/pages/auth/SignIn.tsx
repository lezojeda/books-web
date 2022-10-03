import SignInForm from '../../components/forms/SignInForm'
import MainPageTitle from '../../components/ui/MainPageTitle'

function SignIn() {
  return (
    <>
      <MainPageTitle className="mb-4" title="Sign in page" />
      <SignInForm />
    </>
  )
}

export default SignIn
