import { ApiResponse, User } from '../types'
import { apiAxiosInstance } from './axios'
import { handleApiError } from './errorHandler'

export const signIn = async (
  email: string,
  password: string
): Promise<ApiResponse<SignInResponse>> => {
  try {
    return await apiAxiosInstance.post<SignInResponse>('/auth/signin', {
      email,
      password,
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    return await apiAxiosInstance.post<User>('/auth/signup', {
      email,
      password,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
