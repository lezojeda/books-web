import axios, { AxiosError } from 'axios'

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const apiError = error as AxiosError<Error>
    return apiError.response
  }
  const stockError = error as Error
  return { message: stockError.message, status: 500 }
}
