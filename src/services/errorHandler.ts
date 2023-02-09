import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponseData } from '../types'

export const handleApiError = (
  error: unknown
):
  | AxiosResponse<ErrorResponseData>
  | {
      message: string
      status: number
    } => {
  if (axios.isAxiosError(error)) {
    const apiError = error as AxiosError<ErrorResponseData>
    if (apiError.response) {
      return apiError.response
    }
  }
  const stockError = error as Error
  return { message: stockError.message, status: 500 }
}
