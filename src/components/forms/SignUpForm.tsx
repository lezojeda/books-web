import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { signUp } from '../../services/auth'
import { AuthFormData } from '../../types'
import { CircularProgress, PrimaryButton } from '../ui'
import { TextInput } from './inputs/TextInput'

export const SignUpForm = () => {
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
    from = locationState?.from?.pathname || '/'

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true)
    setErrorMessage('')
    const signInResponse = await signUp(data.email, data.password)
    setLoading(false)
    if (signInResponse) {
      if ('id' in signInResponse) {
        navigate(from, { replace: true })
      } else {
        if ('data' in signInResponse) {
          setErrorMessage(signInResponse.data.message)
        } else {
          setErrorMessage(signInResponse.message)
        }
      }
    }
  }
  return (
    <form
      className="w-full justify-center items-center flex flex-col space-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      <PrimaryButton content="create account" disabled={isSubmitting} />
      <div className="h-5 flex justify-center">
        {errorMessage ? errorMessage : loading ? <CircularProgress /> : <></>}
      </div>
    </form>
  )
}
