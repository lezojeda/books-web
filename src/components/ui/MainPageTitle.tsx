import classNames from 'classnames'

export function MainPageTitle({
  className,
  title,
}: {
  className?: string
  title: string
}) {
  return (
    <h1 className={classNames('font-semibold text-3xl', className)}>{title}</h1>
  )
}
