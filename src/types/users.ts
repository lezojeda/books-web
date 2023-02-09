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

export { type User }
