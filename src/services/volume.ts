import axios, { AxiosError } from 'axios'
import { Collection, Error, Volume } from '../types'
import { googleBooksApiInstance } from './axios'

export const searchVolumes = async (searchValue: string) => {
  try {
    const response = await googleBooksApiInstance.get<Collection<Volume>>(
      `/volumes?q=${searchValue}`
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error as AxiosError<Error>
      return apiError.response?.data ?? { message: error.message }
    }
    return { error: 'something went wrong!' }
  }
}
