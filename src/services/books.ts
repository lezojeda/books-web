import axios, { AxiosError } from 'axios'
import { BookDto } from '../types/books'
import { apiAxiosInstance } from './axios'

export const upsertBook = async (bookDto: BookDto) => {
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
