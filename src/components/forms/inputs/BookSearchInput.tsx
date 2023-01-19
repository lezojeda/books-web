import classNames from 'classnames'
import { UseFormRegisterReturn } from 'react-hook-form'
import { TextInput } from './TextInput'

export const BookSearchInput = ({
  className,
  register,
}: {
  className?: string
  register: UseFormRegisterReturn
}) => {
  return (
    <TextInput
      className={classNames(className)}
      id="search"
      label="Search books:"
      placeholder="Search by author, book name..."
      register={register}
    />
  )
}
