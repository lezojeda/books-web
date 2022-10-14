import classNames from 'classnames'
import { GenericButton, GenericButtonProps } from './GenericButton'

export const SecondaryButton = ({
  content,
  className,
  ...rest
}: GenericButtonProps) => {
  return (
    <GenericButton
      className={classNames(
        'text-primary border border-primary-light disabled:border-primary-light disabled:text-primary-light enabled:hover:bg-primary enabled:hover:text-white',
        className
      )}
      content={content}
      {...rest}
    ></GenericButton>
  )
}
