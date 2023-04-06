import { Book } from './books'

type User = {
  id: string
  createdAt: string
  updatedAt: string
  email: string
  firstName?: string
  lastName?: string
  books: Book[]
}

type GoogleAuthDto = {
  email: string
  firstName?: string
  lastName?: string
}

export { type User, type GoogleAuthDto }
