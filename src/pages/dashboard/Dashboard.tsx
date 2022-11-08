import { useContext, useMemo } from 'react'
import { MainPageTitle, NavbarVolumeSearch } from '../../components/ui'
import { UserContext } from '../../contexts/userContext'
import { ReadState } from '../../types'
import { BookList } from './BookList'

const Dashboard = () => {
  const { user } = useContext(UserContext)

  const readBooks = useMemo(() => {
    return user?.books.filter((b) => b.readState === ReadState.read)
  }, [user?.books])

  const wantsToReadBooks = useMemo(() => {
    return user?.books.filter((b) => b.readState === ReadState.wantsToRead)
  }, [user?.books])

  const currentlyReadingBooks = useMemo(() => {
    return user?.books.filter((b) => b.readState === ReadState.currentlyReading)
  }, [user?.books])

  return (
    <div className="mb-4 flex flex-col justify-center items-center">
      <MainPageTitle className="mb-2 text-center" title="Dashboard" />
      <NavbarVolumeSearch className='mb-2' />
      <div className='space-y-4'>
        {readBooks && readBooks.length > 0 && (
          <BookList books={readBooks} title="Read: " />
        )}
        {currentlyReadingBooks && currentlyReadingBooks.length > 0 && (
          <BookList books={currentlyReadingBooks} title="Currently reading: " />
        )}
        {wantsToReadBooks && wantsToReadBooks.length > 0 && (
          <BookList books={wantsToReadBooks} title="Want to read: " />
        )}
      </div>
    </div>
  )
}

export default Dashboard
