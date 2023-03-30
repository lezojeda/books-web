import debounce from 'lodash.debounce'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { CircularProgress, MainPageTitle } from '../components/ui'
import { BookDto, ReadState, Volume as VolumeType } from '../types'
import { UserContext } from '../contexts/userContext'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { upsertBook } from '../services/books'
import classNames from 'classnames'
import { getMe } from '../services/users'

export const Volume = () => {
  const { user, setUser } = useContext(UserContext)
  const {
    register,
    watch,
    formState: { isValid, isValidating, isDirty },
  } = useForm<{
    readState: ReadState
  }>()
  const [loading, setLoading] = useState(false)
  const volume = useLoaderData() as VolumeType
  const data = watch()
  const navigate = useNavigate()

  const volumeAuthors = volume.volumeInfo.authors

  const prepareBookDto = useCallback(
    (readState: ReadState) => {
      if (user?.id) {
        const bookDto: BookDto = {
          readState,
          bookId: volume.id,
          userId: user.id,
        }
        if (volume.volumeInfo.authors)
          bookDto.firstAuthor = volume.volumeInfo.authors[0]
        if (volume.volumeInfo.title) bookDto.title = volume.volumeInfo.title
        if (volume.volumeInfo.publishedDate)
          bookDto.publishedDate = volume.volumeInfo.publishedDate
        return bookDto
      }
    },
    [
      user?.id,
      volume.id,
      volume.volumeInfo.authors,
      volume.volumeInfo.publishedDate,
      volume.volumeInfo.title,
    ]
  )

  const updateUserBooks = useCallback(async () => {
    const getMeResponse = await getMe()

    if (getMeResponse) {
      if (
        getMeResponse.status === 200 &&
        'data' in getMeResponse &&
        'books' in getMeResponse.data
      ) {
        setUser && setUser(getMeResponse.data)
      }
    }
  }, [setUser])

  const debouncedUpdateUserBooks = useMemo(() => {
    return debounce(async (readState: ReadState) => {
      const bookDto = prepareBookDto(readState)

      if (bookDto) {
        setLoading(true)
        const response = await upsertBook(bookDto)

        if (response) {
          if (response.status === 200) {
            updateUserBooks()
          }
        }
        setLoading(false)
      }
    }, 500)
  }, [prepareBookDto, updateUserBooks])

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
      <div className="relative w-1/2 mx-auto text-lg">
          <div className="relative">
            <div
              className="absolute -left-12 top-8 w-8 hover:opacity-70 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon />
            </div>
            <MainPageTitle className="mb-4" title={volume.volumeInfo.title} />
          </div>
          {volumeAuthors && volumeAuthors.length > 0 ? (
            <p>by {volumeAuthors.join(', ')}</p>
          ) : (
            <p>Unknown author/s</p>
          )}
          {volume.volumeInfo.publishedDate && (
            <>({volume.volumeInfo.publishedDate})</>
          )}
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
