import { AxiosResponse } from 'axios'

export type ApiResponse<T> =
  | AxiosResponse<T, any> // Successful response
  | AxiosResponse<Error, any> // API handled error
  | {
      message: string
      status: number
    } // Generic error

export type Collection<ItemType> = {
  kind: string
  totalItems: number
  items?: ItemType[]
}
