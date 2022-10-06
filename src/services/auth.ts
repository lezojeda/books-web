import axios, { AxiosError } from 'axios'
import axiosInstance from './axios'
import { Error, User } from '../types'

type SignInResponse = {
  access_token: string
}

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post<SignInResponse>('/auth/signin', {
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

export const signUp = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post<User>('/auth/signup', {
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
