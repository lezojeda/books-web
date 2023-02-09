import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { signUp } from '../../services/auth'
import { AuthFormData } from '../../types'
import { CircularProgress, PrimaryButton, UnorderedStringList } from '../ui'
import { TextInput } from './inputs/TextInput'

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthFormData>()
  const [messages, setMessages] = useState<string[]>()

  const onSubmit = async (data: AuthFormData) => {
    setMessages([])
    const signUpResponse = await signUp(data.email, data.password)
    if ('data' in signUpResponse) {
      const { data } = signUpResponse
      if ('id' in data) {
        setMessages(['Account successfully created, you can sign in now'])
        return
      }
      if (Array.isArray(data.message)) {
        setMessages(data.message)
        return
      }
      setMessages([data.message])
    } else if ('message' in signUpResponse) {
      setMessages([signUpResponse.message])
    }
  }

  return (
    <form
      className="w-full justify-center items-center flex flex-col space-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        id="signup-email"
        label="E-mail"
        register={register('email', { required: true })}
      />
      <TextInput
        id="signup-password"
        label="Password"
        register={register('password', { required: true })}
        type="password"
      />
      <PrimaryButton content="create account" disabled={isSubmitting} />
      <div className="h-5 flex justify-center">
        {messages && messages.length > 0 ? (
          <UnorderedStringList items={messages} />
        ) : isSubmitting ? (
          <CircularProgress />
        ) : (
          <></>
        )}
      </div>
    </form>
  )
}
