export type User = {
  id: string
  createdAt: string
  updatedAt: string
  email: string
  firstName?: string
  lastName?: string
  booksRead: string[]
  wantsToRead: string[]
  currentlyReading: string[]
}

export type EditUserDto = {
  email?: string
  firstName?: string
  lastName?: string
  booksRead?: string[]
  wantsToRead?: string[]
  currentlyReading?: string[]
}