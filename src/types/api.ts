import { AxiosResponse } from 'axios'

type ApiResponse<T> =
  | AxiosResponse<T, any> // Successful response
  | AxiosResponse<Error, any> // API handled error
  | {
      message: string
      status: number
    } // Generic error

type Collection<ItemType> = {
  kind: string
  totalItems: number
  items?: ItemType[]
}

export { type ApiResponse, type Collection }
