import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/userContext'
import { googleAuth, signIn } from '../../services/auth'
import {
  ApiResponse,
  AuthFormData,
  GoogleCredentialsResponse,
  SignInResponse,
} from '../../types'
import {
  getUserDataFromGoogleToken,
  getUserDataFromToken,
  setToken,
} from '../../utils/auth.utils'
import { PrimaryButton } from '../ui'
import { ErrorMessagesList } from './ErrorMessagesList'
import { TextInput } from './inputs/TextInput'

declare global {
  interface Window {
    handleGoogleCredentialResponse(response: GoogleCredentialsResponse): void
  }
}

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthFormData>()
  const [errorMessages, setErrorMessages] = useState<string[]>()
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSignInResponse = (response: ApiResponse<SignInResponse>) => {
    if ('data' in response && response.data !== undefined) {
      const { data } = response
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
    } else if ('message' in response) {
      setErrorMessages([response.message])
    }
  }

  // Get the previous user's location to redirect them after login
  const location = useLocation(),
    locationState = location.state as { from: Location },
    from = locationState?.from?.pathname || '/dashboard'

  const onSubmit = async (data: AuthFormData) => {
    setErrorMessages([])
    const signInResponse = await signIn(data.email, data.password)

    handleSignInResponse(signInResponse)
  }

  // Must declare it as a window method so it can be used as value for data-callback attribute
  window.handleGoogleCredentialResponse = async (
    response: GoogleCredentialsResponse
  ) => {
    const user = getUserDataFromGoogleToken(response.credential)
    if (user) {
      const googleAuthResponse = await googleAuth(user)
      handleSignInResponse(googleAuthResponse)
    }
  }

  /** Load Google sign-in script */
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
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
        <ErrorMessagesList
          errorMessages={errorMessages}
          loading={isSubmitting}
        />
      </form>
      <p className="text-lg mb-[20px]">OR</p>
      <div
        id="g_id_onload"
        data-callback="handleGoogleCredentialResponse"
        data-client_id={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </div>
  )
}
