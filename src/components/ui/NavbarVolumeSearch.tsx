import debounce from 'lodash.debounce'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { searchVolumes } from '../../services/volume'
import { Volume } from '../../types'
import { SearchInput } from '../forms/inputs/SearchInput'

type FormData = {
  searchValue: string
}

export const NavbarVolumeSearch = () => {
  const {
    register,
    watch,
    formState: { isValid, isValidating },
  } = useForm<FormData>({
    mode: 'onChange',
  })
  const [volumes, setVolumes] = useState<Volume[]>()

  const debouncedGetVolumes = useMemo(() => {
    return debounce(async (searchValue: string) => {
      const response = await searchVolumes(searchValue)
      if ('items' in response) setVolumes(response.items)
    }, 500)
  }, [])

  const data = watch()

  useEffect(() => {
    if (isValid && !isValidating && data.searchValue) {
      debouncedGetVolumes(data.searchValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.searchValue, debouncedGetVolumes])
  return (
    <form className="border flex flex-col space-y-2 relative w-96">
      <SearchInput className='w-full' register={() => register('searchValue')} />
      {/* TODO: Implement on click outside to close dropdown of results */}
      <ul className='absolute top-14 bg-white border p-1'>
        {volumes?.map((v: Volume) => (
          <li key={v.id}>
            <span className="italic">{v.volumeInfo.title}</span>
            {' - '}
            {v.volumeInfo.authors ? v.volumeInfo.authors[0] : ''}
          </li>
        ))}
      </ul>
    </form>
  )
}
