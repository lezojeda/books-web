export enum ReadState {
  read = 'read',
  currentlyReading = 'currentlyReading',
  wantsToRead = 'wantsToRead',
}

export type Book = {
  id: string
  bookId: string // The one coming from google books API
  userId: string
  readState: ReadState
  title?: string
  publishedDate?: string
  firstAuthor?: string
}

export type BookDto = Omit<Book, 'id'>
