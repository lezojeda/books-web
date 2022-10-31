import axios, { AxiosError } from 'axios'
import { Book } from '../types/books'
import { apiAxiosInstance } from './axios'

export const upsertBook = async (bookDto: Omit<Book, 'id'>) => {
  try {
    await apiAxiosInstance.put<void>('/books', bookDto)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error as AxiosError<Error>
      return apiError.response?.data ?? { message: error.message }
    }
    return { error: 'something went wrong!' }
  }
}
