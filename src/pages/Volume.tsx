import debounce from 'lodash.debounce'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Params, useLoaderData } from 'react-router-dom'
import { MainPageTitle } from '../components/ui'
import { getVolume } from '../services/volume'
import { updateUser } from '../services/user'
import { Volume as VolumeType } from '../types'
import { UserContext } from '../contexts/userContext'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export type ReadState = 'booksRead' | 'wantsToRead' | 'currentlyReading'

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
      const book = {
        readState,
        bookId: volume.id
      }
      const editUserDto = {
        books: [],
      }
      setLoading(true)
      await updateUser(editUserDto)
      setLoading(false)
    }, 500)
  }, [])
  useEffect(() => {
    if (isValid && !isValidating && data.readState) {
      debouncedUpdateUserBooks(data.readState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.readState, debouncedUpdateUserBooks])

  const selectedDefaultValue = useMemo(() => {
    const bookInUser = user?.books.find((book) => book.bookId === volume.id)
    if (bookInUser) return bookInUser.readState
  }, [user?.books, volume.id])

  return (
    <div className="text-center space-y-4">
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
      <form className="flex flex-col items-center">
        <fieldset>
          <legend className="hidden">Add book to:</legend>
          <select
            defaultValue={selectedDefaultValue}
            disabled={loading}
            {...register('readState')}
          >
            <option value="">Add book to:</option>
            <option value="currentlyReading">Currently reading</option>
            <option value="wantsToRead">Want to read</option>
            <option value="booksRead">Already read</option>
          </select>
        </fieldset>
      </form>
    </div>
  )
}

export default Volume
