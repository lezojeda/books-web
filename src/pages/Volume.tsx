import debounce from 'lodash.debounce'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  useForm
} from 'react-hook-form'
import { useLoaderData } from 'react-router-dom'
import { ErrorMessagesList } from '../components/forms/ErrorMessagesList'
import { UpdateBookStatusForm } from '../components/forms/UpdateBookStatusForm'
import {
  MainPageTitle
} from '../components/ui'
import { GoBackArrow } from '../components/ui/GoBackArrow'
import { UserContext } from '../contexts/userContext'
import { UpserBookResponse, upsertBook } from '../services/books'
import { getMe } from '../services/users'
import { BookDto, ReadState, Volume as VolumeType } from '../types'

export const Volume = () => {
  const { user, setUser } = useContext(UserContext)
  const {
    register,
    watch,
    formState: { isSubmitting, isValid, isValidating, isDirty },
  } = useForm<{
    readState: ReadState
  }>()
  const [errorMessages, setErrorMessages] = useState<string[]>()
  const [loading, setLoading] = useState(false)
  const volume = useLoaderData() as VolumeType
  const data = watch()

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

  const handleUpsertBookResponse = useCallback(
    (response: UpserBookResponse) => {
      if ('data' in response) {
        if (response.data instanceof Object && 'message' in response.data) {
          if (Array.isArray(response.data.message)) {
            setErrorMessages(response.data.message)
            return
          }
          setErrorMessages([response.data.message])
        } else {
          updateUserBooks()
        }
      } else {
        setErrorMessages([response.message])
      }
    },
    [updateUserBooks]
  )

  const debouncedUpdateUserBooks = useMemo(() => {
    return debounce(async (readState: ReadState) => {
      const bookDto = prepareBookDto(readState)

      if (bookDto) {
        setLoading(true)
        const response = await upsertBook(bookDto)

        handleUpsertBookResponse(response)
        setLoading(false)
      }
    }, 500)
  }, [handleUpsertBookResponse, prepareBookDto])

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
    <div className="text-center space-y-2 flex flex-col items-center mb-2">
      <div className="relative mx-auto text-lg">
        <div className="relative">
          <GoBackArrow />
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
      <UpdateBookStatusForm
        loading={loading}
        register={register}
        selectedDefaultValue={selectedDefaultValue}
      />
      <ErrorMessagesList errorMessages={errorMessages} loading={isSubmitting} />
    </div>
  )
}

export default Volume
