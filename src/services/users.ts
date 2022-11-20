import { User } from '../types'
import { apiAxiosInstance } from './axios'
import { handleApiError } from './errorHandler'

export const updateUser = async (editUserDto: Partial<User>) => {
  try {
    return await apiAxiosInstance.put<User>('/users', editUserDto)
  } catch (error) {
    return handleApiError(error)
  }
}

export const getMe = async () => {
  try {
    return await apiAxiosInstance.get<User>('/users/me')
  } catch (error) {
    return handleApiError(error)
  }
}
