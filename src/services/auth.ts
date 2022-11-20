import { User } from '../types'
import { apiAxiosInstance } from './axios'
import { handleApiError } from './errorHandler'

type SignInResponse = {
  access_token: string
}

export const signIn = async (email: string, password: string) => {
  try {
    const response = await apiAxiosInstance.post<SignInResponse>(
      '/auth/signin',
      {
        email,
        password,
      }
    )

    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    const response = await apiAxiosInstance.post<User>('/auth/signup', {
      email,
      password,
    })

    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}
