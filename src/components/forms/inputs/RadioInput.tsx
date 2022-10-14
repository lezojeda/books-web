import { ComponentPropsWithoutRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export type Props = ComponentPropsWithoutRef<'input'> & {
  label: string
  register: UseFormRegisterReturn
}

export const RadioInput = ({
  className,
  id,
  label,
  register,
  value,
}: Props) => {
  return (
    <>
      <input
        className={className}
        type="radio"
        id={id}
        value={value}
        {...register}
      />
      <label className="mr-2" htmlFor={id}>
        {label}
      </label>
    </>
  )
}
