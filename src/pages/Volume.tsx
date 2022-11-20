import debounce from 'lodash.debounce'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Params, useLoaderData } from 'react-router-dom'
import { CircularProgress, MainPageTitle } from '../components/ui'
import { getVolume } from '../services/volumes'
import { BookDto, ReadState, Volume as VolumeType } from '../types'
import { UserContext } from '../contexts/userContext'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { upsertBook } from '../services/books'
import classNames from 'classnames'
import { getMe } from '../services/users'

type FormData = {
  readState: ReadState
}

export async function loader({ params }: { params: Params<any> }) {
  return getVolume(params.volumeId)
}

export const Volume = () => {
  const { user, setUser } = useContext(UserContext)
  const {
    register,
    watch,
    formState: { isValid, isValidating, isDirty },
  } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const volume = useLoaderData() as VolumeType
  const data = watch()

  const updateUserBooks = useCallback(async () => {
    const getMeResponse = await getMe()
    if (getMeResponse.status === 200 && 'books' in getMeResponse.data) {
      setUser && setUser(getMeResponse.data)
    }
  }, [setUser])

  const debouncedUpdateUserBooks = useMemo(() => {
    return debounce(async (readState: ReadState) => {
      if (user?.id) {
        const bookDto: BookDto = {
          readState: readState,
          bookId: volume.id,
          userId: user.id,
        }
        if (volume.volumeInfo.authors)
          bookDto.firstAuthor = volume.volumeInfo.authors[0]
        if (volume.volumeInfo.title) bookDto.title = volume.volumeInfo.title
        if (volume.volumeInfo.publishedDate)
          bookDto.publishedDate = volume.volumeInfo.publishedDate

        setLoading(true)
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000))
        const response = await upsertBook(bookDto)

        if (response.status === 200) {
          updateUserBooks()
        }
        setLoading(false)
      }
    }, 500)
  }, [
    updateUserBooks,
    user?.id,
    volume.id,
    volume.volumeInfo.authors,
    volume.volumeInfo.publishedDate,
    volume.volumeInfo.title,
  ])

  const selectedDefaultValue = useMemo(() => {
    const bookFromUserBooks = user?.books.find(
      (book) => book.bookId === volume.id
    )
    if (bookFromUserBooks) return bookFromUserBooks.readState
  }, [user?.books, volume.id])

  useEffect(() => {
    if (isDirty && isValid && !isValidating && data.readState) {
      debouncedUpdateUserBooks(data.readState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.readState, debouncedUpdateUserBooks])

  return (
    <div className="text-center space-y-2 flex flex-col items-center">
      <div className="relative w-1/2 mx-auto">
        <Link
          className="absolute -left-10 top-1 w-8 mr-4 hover:opacity-70 cursor-pointer"
          to="/dashboard"
        >
          <ArrowLeftIcon />
        </Link>
        <div className="mx-auto">
          <MainPageTitle title={volume.volumeInfo.title} />
          {volume.volumeInfo.authors &&
            volume.volumeInfo.authors.length > 0 && (
              <p>by {volume.volumeInfo.authors}</p>
            )}
          {volume.volumeInfo.publishedDate && (
            <>({volume.volumeInfo.publishedDate})</>
          )}
        </div>
      </div>
      <form className="relative">
        <fieldset className="mb-2">
          <legend className="hidden">Add book to:</legend>
          <select
            defaultValue={selectedDefaultValue}
            disabled={loading}
            {...register('readState')}
          >
            <option value="">Add book to:</option>
            <option value="currentlyReading">Currently reading</option>
            <option value="wantsToRead">Want to read</option>
            <option value="read">Already read</option>
          </select>
        </fieldset>
        <div className="h-4 absolute top-0 -right-8">
          <CircularProgress
            className={classNames('w-4 h-4', loading ? 'visible' : 'hidden')}
          />
        </div>
      </form>
    </div>
  )
}

export default Volume
