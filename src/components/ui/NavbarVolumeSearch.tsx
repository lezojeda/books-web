import debounce from 'lodash.debounce'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { searchVolumes } from '../../services/volume'
import { Volume } from '../../types'
import { SearchInput } from '../forms/inputs/SearchInput'
import { DropdownList } from './DropdownList'

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
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const debouncedGetVolumes = useMemo(() => {
    return debounce(async (searchValue: string) => {
      setShowDropdown(true)
      setLoading(true)
      setVolumes(undefined)
      const response = await searchVolumes(searchValue)
      setLoading(false)
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
    <form className="flex flex-col space-y-2 relative w-96">
      <SearchInput
        className="w-full"
        register={() => register('searchValue')}
      />
      {showDropdown && (
        <DropdownList loading={loading} setShowDropdownList={setShowDropdown}>
          {volumes?.map((v: Volume, i: number) => (
            <li
              key={v.id}
              className={`py-1 w-full cursor-pointer hover:bg-slate-100 ${
                i === volumes.length - 1 ? '' : 'border-b'
              }`}
            >
              <span className="italic">{v.volumeInfo.title}</span>
              {' - '}
              {v.volumeInfo.authors ? v.volumeInfo.authors[0] : ''}
            </li>
          ))}
        </DropdownList>
      )}
    </form>
  )
}
