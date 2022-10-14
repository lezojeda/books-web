import classNames from 'classnames'
import { ComponentPropsWithoutRef } from 'react'

export type GenericButtonProps = ComponentPropsWithoutRef<'button'> & {
  content: string
}

export const GenericButton = ({
  content,
  className,
  ...rest
}: GenericButtonProps) => {
  return (
    <button
      className={classNames(
        'font-semibold py-2 px-4 rounded inline-flex items-center enabled:cursor-pointer',
        className
      )}
      {...rest}
    >
      {content}
    </button>
  )
}
