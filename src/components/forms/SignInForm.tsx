import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/userContext'
import { signIn } from '../../services/auth'
import { AuthFormData } from '../../types'
import { getUserDataFromToken, setToken } from '../../utils/auth.utils'
import { CircularProgress, PrimaryButton, UnorderedStringList } from '../ui'
import { TextInput } from './inputs/TextInput'

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthFormData>()
  const [errorMessages, setErrorMessages] = useState<string[]>()
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  // Get the previous user's location to redirect them after login
  const location = useLocation(),
    locationState = location.state as { from: Location },
    from = locationState?.from?.pathname || '/dashboard'

  const onSubmit = async (data: AuthFormData) => {
    setErrorMessages([])
    const signInResponse = await signIn(data.email, data.password)

    if ('data' in signInResponse && signInResponse.data !== undefined) {
      const { data } = signInResponse
      if ('access_token' in data) {
        const { access_token } = data
        const userData = getUserDataFromToken(access_token)
        setUser && userData && setUser(userData)
        setToken(access_token)
        navigate(from, { replace: true })
        return
      }
      if (Array.isArray(data.message)) {
        setErrorMessages(data.message)
        return
      }
      setErrorMessages([data.message])
    } else if ('message' in signInResponse) {
      setErrorMessages([signInResponse.message])
    }
  }

  return (
    <form
      className="w-full justify-center items-center flex flex-col space-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        id="signin-email"
        label="E-mail"
        register={register('email', { required: true })}
      />
      <TextInput
        id="signin-password"
        label="Password"
        register={register('password', { required: true })}
        type="password"
      />
      <PrimaryButton content="sign in" disabled={isSubmitting} />
      <div className="h-5 flex justify-center">
        {errorMessages && errorMessages.length > 0 ? (
          <UnorderedStringList items={errorMessages} />
        ) : isSubmitting ? (
          <CircularProgress />
        ) : (
          <></>
        )}
      </div>
    </form>
  )
}
