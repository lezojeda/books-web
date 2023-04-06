import { Book } from './books'

type BasicToken = {
  iat: number
  exp: number
  sub: number
  email: string
}

type APITokenData = BasicToken & {
  id: string
  books: Book[]
}

type GoogleTokenData = BasicToken & {
  family_name: string
  given_name: string
  name: string
}

type AuthFormData = {
  email: string
  password: string
}

type SignInResponse = {
  access_token: string
}

type GoogleCredentialsResponse = {
  clientId: string
  credential: string
  select_by: string
}

export {
  type APITokenData,
  type GoogleTokenData,
  type AuthFormData,
  type SignInResponse,
  type GoogleCredentialsResponse,
}
