import { AxiosResponse } from 'axios'

type ErrorResponseData = {
  error: string
  message: string | string[]
  statusCode: number
}

type ApiResponse<T> =
  | AxiosResponse<T> // Successful response
  | AxiosResponse<ErrorResponseData> // API handled error
  | {
      message: string
      status: number
    } // Generic error

type Collection<ItemType> = {
  kind: string
  totalItems: number
  items?: ItemType[]
}

export { type ErrorResponseData, type ApiResponse, type Collection }
