enum ReadState {
  read = 'read',
  currentlyReading = 'currentlyReading',
  wantsToRead = 'wantsToRead',
}

type Book = {
  id: string
  bookId: string // The one coming from google books API
  userId: string
  readState: ReadState
  title?: string
  publishedDate?: string
  firstAuthor?: string
}

type BookDto = Omit<Book, 'id'>

export { ReadState, type Book, type BookDto }
