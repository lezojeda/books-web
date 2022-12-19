import { Collection, Volume } from '../types'
import { googleBooksApiInstance } from './axios'
import { handleApiError } from './errorHandler'

/**
 * Performs a book search.
 * @function
 * @param {string} searchValue - Full-text search query string.
 * @param {number} startIndex - Index of the first result to return (starts at 0)
 * @param {number} maxResults - Maximum number of results to return. Acceptable values are 0 to 40, inclusive.
 */
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
