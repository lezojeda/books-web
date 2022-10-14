import { SignInForm, SignUpForm } from '../components/forms'
import { MainPageTitle } from '../components/ui'

export const SignIn = () => {
  return (
    <>
      <MainPageTitle className="mb-4" title="Sign in" />
      <SignInForm />
      <MainPageTitle className="mb-4" title="Create account" />
      <SignUpForm />
    </>
  )
}

export default SignIn
