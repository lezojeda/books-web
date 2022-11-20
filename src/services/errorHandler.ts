import axios, { AxiosError } from 'axios'

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const apiError = error as AxiosError<Error>
    return apiError.response ?? { message: error, status: error.status }
  }
  return { error: 'something went wrong!' }
}
