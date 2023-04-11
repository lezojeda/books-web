import classNames from 'classnames'
import { CircularProgress } from '../ui'
import { ReadState } from '../../types'
import { UseFormRegister } from 'react-hook-form'

type UpdateBookStatusFormProps = {
  loading: boolean
  register: UseFormRegister<{
    readState: ReadState
  }>
  selectedDefaultValue: ReadState | undefined
}

export const UpdateBookStatusForm = ({
  loading,
  register,
  selectedDefaultValue,
}: UpdateBookStatusFormProps) => {
  return (
    <form className="relative">
      <label className="hidden" htmlFor="book-status-select">
        Add book to:
      </label>
      <select
        className="p-2 border border-primary-light rounded"
        defaultValue={selectedDefaultValue}
        disabled={loading}
        id="book-status-select"
        {...register('readState')}
      >
        <option value="">Add book to:</option>
        <option value="currentlyReading">Currently reading</option>
        <option value="wantsToRead">Want to read</option>
        <option value="read">Already read</option>
      </select>
      <div className="h-4 absolute top-0 -right-8">
        <CircularProgress
          className={classNames('w-4 h-4', loading ? 'visible' : 'hidden')}
        />
      </div>
    </form>
  )
}
