import { Book } from './book'

export type User = {
  id: string
  createdAt: string
  updatedAt: string
  email: string
  firstName?: string
  lastName?: string
  books: Book[]
}
