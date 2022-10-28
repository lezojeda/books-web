import axios, { AxiosError } from 'axios'
import { User } from '../types'
import { apiAxiosInstance } from './axios'

export const updateUser = async (editUserDto: Partial<User>) => {
  try {
    const response = await apiAxiosInstance.put<User>('/users', editUserDto)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error as AxiosError<Error>
      return apiError.response?.data ?? { message: error.message }
    }
    return { error: 'something went wrong!' }
  }
}
