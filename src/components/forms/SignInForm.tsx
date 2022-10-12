import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { signIn } from '../../services/auth'
import { AuthFormData } from '../../types'
import { setToken } from '../../utils/auth.utils'
import { CircularProgress } from '../ui'
import { TextInput } from './inputs/TextInput'

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthFormData>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Get the previous user's location to redirect them after login
  const location = useLocation(),
    locationState = location.state as { from: Location },
    from = locationState?.from?.pathname || '/dashboard'

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true)
    setErrorMessage('')
    const signInResponse = await signIn(data.email, data.password)
    setLoading(false)
    if ('access_token' in signInResponse) {
      setToken(signInResponse.access_token)
      navigate(from, { replace: true })
    } else {
      if ('message' in signInResponse) {
        setErrorMessage(signInResponse.message)
      } else {
        setErrorMessage(signInResponse.error)
      }
    }
  }

  return (
    <form className="flex flex-col space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        id="email"
        label="E-mail"
        register={register('email', { required: true })}
      />
      <TextInput
        id="password"
        label="Password"
        register={register('password', { required: true })}
        type="password"
      />
      <button
        className="bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
        disabled={isSubmitting}
      >
        sign in
      </button>
      <div className="h-5 flex justify-center">
        {errorMessage ? errorMessage : loading ? <CircularProgress /> : <></>}
      </div>
    </form>
  )
}
