import debounce from 'lodash.debounce'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Params, useLoaderData } from 'react-router-dom'
import { RadioInput } from '../components/forms/inputs/RadioInput'
import { MainPageTitle } from '../components/ui'
import { getVolume } from '../services/volume'
import { updateUser } from '../services/user'
import { Volume as VolumeType } from '../types'
import { UserContext } from '../contexts/userContext'

type ReadState = 'booksRead' | 'wantsToRead' | 'currentlyReading'

type FormData = {
  readState: ReadState
}

export async function loader({ params }: { params: Params<any> }) {
  return getVolume(params.volumeId)
}

export const Volume = () => {
  const { user } = useContext(UserContext) || {}
  const {
    register,
    watch,
    formState: { isValid, isValidating },
  } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const volume = useLoaderData() as VolumeType
  const data = watch()

  const debouncedUpdateUser = useMemo(() => {
    return debounce(async (readState: ReadState) => {
      if (user) {
        const editUserDto = {
          [readState]: [volume.id, ...user[readState]],
        }
        setLoading(true)
        await updateUser(editUserDto)
        setLoading(false)
      }
    }, 500)
  }, [user, volume.id])

  useEffect(() => {
    if (isValid && !isValidating && data.readState) {
      debouncedUpdateUser(data.readState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.readState, debouncedUpdateUser])

  return (
    <div className="text-center space-y-2">
      <div>
        <MainPageTitle title={volume.volumeInfo.title} />
        by {volume.volumeInfo.authors} ({volume.volumeInfo.publishedDate})
      </div>
      <form className="flex">
        <fieldset>
          <legend className="font-bold mb-1">Add book to:</legend>

          <RadioInput
            className="mr-2"
            disabled={loading}
            id="wantsToRead"
            label="Want to read"
            value="wantsToRead"
            register={register('readState')}
          />

          <RadioInput
            className="mr-2"
            disabled={loading}
            id="currentlyReading"
            label="Currently reading"
            value="currentlyReading"
            register={register('readState')}
          />

          <RadioInput
            className="mr-2"
            disabled={loading}
            id="booksRead"
            label="Already read"
            value="booksRead"
            register={register('readState')}
          />
        </fieldset>
      </form>
    </div>
  )
}

export default Volume
