import classNames from 'classnames'
import { GenericButton, GenericButtonProps } from './GenericButton'

export const PrimaryButton = ({
  content,
  className,
  disabled,
}: GenericButtonProps) => {
  return (
    <GenericButton
      className={classNames(
        'bg-primary text-white disabled:bg-gray-100 disabled:text-gray-400 hover:opacity-70',
        className
      )}
      content={content}
      disabled={disabled}
    ></GenericButton>
  )
}
