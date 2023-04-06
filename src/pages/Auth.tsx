import { SignInForm, SignUpForm } from '../components/forms'
import { MainPageTitle } from '../components/ui'

const SignIn = () => {
  return (
    <div className="my-auto text-center">
      <MainPageTitle className="mb-4" title="Sign in" />
      <SignInForm />
      <MainPageTitle className="mt-6 mb-4" title="Create account" />
      <SignUpForm />
    </div>
  )
}

export default SignIn
