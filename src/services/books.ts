import { BookDto } from '../types/books'
import { apiAxiosInstance } from './axios'
import { handleApiError } from './errorHandler'

export const upsertBook = async (bookDto: BookDto) => {
  try {
    return await apiAxiosInstance.put<void>('/books', bookDto)
  } catch (error) {
    return handleApiError(error)
  }
}
