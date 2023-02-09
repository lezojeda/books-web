type AuthFormData = {
  email: string
  password: string
}

type SignInResponse = {
  access_token: string
}

export { type AuthFormData, type SignInResponse }
