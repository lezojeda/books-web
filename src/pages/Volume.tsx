import debounce from 'lodash.debounce'
import { useContext, useEffect, useMemo, useState } from 'react'
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
  const { user } = useContext(UserContext)
  const {
    register,
    watch,
    formState: { isValid, isValidating },
  } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const volume = useLoaderData() as VolumeType
  const data = watch()

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
        await upsertBook(bookDto)
        const updatedUser = await getMe()
        console.log(updatedUser)
        // call /me and update context with new books
        setLoading(false)
      }
    }, 500)
  }, [user, volume.id, volume.volumeInfo])

  const selectedDefaultValue = useMemo(() => {
    const bookInUser = user?.books.find((book) => book.bookId === volume.id)
    if (bookInUser) return bookInUser.readState
  }, [user?.books, volume.id])

  useEffect(() => {
    if (isValid && !isValidating && data.readState) {
      debouncedUpdateUserBooks(data.readState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.readState, debouncedUpdateUserBooks])

  return (
    <div className="text-center space-y-2">
      <div className="relative w-1/2 mx-auto">
        <Link
          className="absolute left-0 w-8 mr-4 hover:opacity-70 cursor-pointer"
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
      <form className="flex flex-col justify-center items-center">
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
        <div className='h-4'>

        <CircularProgress
          className={classNames('w-4 h-4', loading ? 'visible' : 'hidden')}
        />
        </div>
      </form>
    </div>
  )
}

export default Volume
