import { AxiosResponse } from 'axios'
import { BookDto } from '../types/books'
import { apiAxiosInstance } from './axios'
import { handleApiError } from './errorHandler'
import { ErrorResponseData } from '../types'

export type UpserBookResponse =
  | AxiosResponse<void, any>
  | AxiosResponse<ErrorResponseData, any>
  | {
      message: string
      status: number
    }

export const upsertBook = async (bookDto: BookDto): Promise<UpserBookResponse> => {
  try {
    return await apiAxiosInstance.put<void>('/books', bookDto)
  } catch (error) {
    return handleApiError(error)
  }
}
