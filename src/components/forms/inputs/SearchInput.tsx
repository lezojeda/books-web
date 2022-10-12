import classNames from 'classnames'
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form'
import { TextInput } from './TextInput'

export const SearchInput = ({
  className,
  register,
}: {
  className?: string
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn
}) => {
  return (
    <TextInput
      className={classNames(className)}
      id="search"
      label="Search books"
      register={register('search')}
    />
  )
}
