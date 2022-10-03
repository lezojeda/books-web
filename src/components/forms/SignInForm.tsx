import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { signIn } from '../../services/auth'
import { setToken } from '../../utils/auth.utils'

type SignInFormData = {
  email: string
  password: string
}

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>()
  const navigate = useNavigate()

  // Get the previous user's location to redirect them after login
  const location = useLocation(),
    locationState = location.state as { from: Location },
    from = locationState?.from?.pathname || '/'

  const onSubmit = async (data: SignInFormData) => {
    const signInResponse = await signIn(data.email, data.password)
    if ('access_token' in signInResponse) {
      setToken(signInResponse.access_token)
    }
    navigate(from, { replace: true })
  }

  return (
    <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mr-2" htmlFor="email">
          Email
        </label>
        <input
          className="border"
          type="text"
          {...register('email', { required: true })}
        />
      </div>
      <div>
        <label className="mr-2" htmlFor="password">
          Password
        </label>
        <input
          className="border"
          type="password"
          {...register('password', { required: true })}
        />
      </div>
      <button
        className="bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
        disabled={isSubmitting}
      >
        Sign in
      </button>
    </form>
  )
}
export default SignInForm
