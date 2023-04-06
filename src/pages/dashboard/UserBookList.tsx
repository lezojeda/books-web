import { Book } from '../../types'

const UserBookList = ({ books, title }: { books: Book[]; title: string }) => {
  return (
    <>
      <h2 className="font-semibold text-center">{title}</h2>
      <ul className="flex flex-col items-center">
        {books.map((book) => {
          if (!book.title) return null
          return (
            <li className="list-disc text-center" key={book.bookId}>
              {book.title} - {book.firstAuthor}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default UserBookList
