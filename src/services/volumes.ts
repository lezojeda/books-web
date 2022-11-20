import { Collection, Volume } from '../types'
import { googleBooksApiInstance } from './axios'
import { handleApiError } from './errorHandler'

export const searchVolumes = async (
  searchValue: string,
  startIndex?: number,
  maxResults?: number
) => {
  try {
    const response = await googleBooksApiInstance.get<Collection<Volume>>(
      '/volumes',
      {
        params: {
          q: searchValue,
          startIndex,
          maxResults,
        },
      }
    )

    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export const getVolume = async (volumeId?: string) => {
  try {
    const response = await googleBooksApiInstance.get<Volume>(
      `/volumes/${volumeId}`
    )

    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}
