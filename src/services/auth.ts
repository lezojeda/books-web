import axios, { AxiosError } from 'axios'
import { Error, User } from '../types'
import { apiAxiosInstance } from './axios'

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
    if (axios.isAxiosError(error)) {
      const apiError = error as AxiosError<Error>
      return apiError.response?.data ?? { message: error.message }
    }
    return { error: 'something went wrong!' }
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
    if (axios.isAxiosError(error)) {
      const apiError = error as AxiosError<Error>
      return apiError.response?.data ?? { message: error.message }
    }
    return { error: 'something went wrong!' }
  }
}
