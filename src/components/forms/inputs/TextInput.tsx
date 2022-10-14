import classNames from 'classnames'
import { UseFormRegisterReturn } from 'react-hook-form'

export const TextInput = ({
  className,
  id,
  label,
  placeholder,
  register,
  type,
}: {
  className?: string
  id: string
  label: string
  placeholder?: string
  register: UseFormRegisterReturn<any>
  type?: string
}) => {
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
        {...register}
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}
