import { Dispatch, ReactNode, useRef } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { CircularProgress } from './CircularProgress'

type Props = {
  children: ReactNode
  loading: boolean
  setShowDropdownList: Dispatch<React.SetStateAction<boolean>>
}

export const DropdownList = ({
  children,
  loading,
  setShowDropdownList,
}: Props) => {
  const dropdownRef = useRef<HTMLUListElement>(null)
  useOnClickOutside(dropdownRef, () => setShowDropdownList(false))

  return (
    <ul
      className="overflow-auto h-80 absolute top-14 bg-white border w-full flex flex-col items-center"
      ref={dropdownRef}
    >
      {loading && (
        <div className="py-2">
          <CircularProgress />
        </div>
      )}
      {children}
    </ul>
  )
}
