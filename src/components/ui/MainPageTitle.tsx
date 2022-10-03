import classNames from 'classnames'

function MainPageTitle({
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

export default MainPageTitle
