export type Book = {
  id: string
  bookId: string // The one coming from google books API
  userId: string
  readState: 'read' | 'currentlyReading' | 'wantsToRead'
}
