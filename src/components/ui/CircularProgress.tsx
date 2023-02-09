import classNames from 'classnames'

export const CircularProgress = ({ className }: { className?: string }) => {
  return (
    <div
      className={classNames(
        'border-2 border-transparent border-t-slate-600 rounded-full w-6 h-6 animate-spin',
        className
      )}
    ></div>
  )
}
