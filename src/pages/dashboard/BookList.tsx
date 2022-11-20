import { Book } from '../../types'

export const BookList = ({
  books,
  title,
}: {
  books: Book[]
  title: string
}) => {
  return (
    <div>
      <h2 className="text-center font-medium">{title}</h2>
      <ul className="flex flex-col items-center">
        {books.map((book) => {
          if (!book.title) return null
          return (
            <li className="list-disc whitespace-nowrap" key={book.bookId}>
              {book.title} - {book.firstAuthor}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
