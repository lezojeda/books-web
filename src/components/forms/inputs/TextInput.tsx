import classNames from 'classnames'
import { ComponentPropsWithoutRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export type Props = ComponentPropsWithoutRef<'input'> & {
  label: string
  register: UseFormRegisterReturn
}

export const TextInput = ({
  className,
  id,
  label,
  placeholder,
  register,
  type = 'text',
}: Props) => {
  return (
    <div>
      <label className="block" htmlFor={id}>
        {label}
      </label>
      <input
        className={classNames(
          className,
          'border border-primary-light rounded p-1'
        )}
        placeholder={placeholder}
        type={type}
        {...register}
      />
    </div>
  )
}
