import { CircularProgress, UnorderedStringList } from '../ui'

type ErrorMessagesListProps = {
  errorMessages?: string[]
  loading: boolean
}

export const ErrorMessagesList = ({
  errorMessages,
  loading,
}: ErrorMessagesListProps) => {
  return (
    <div className="h-5 flex justify-center">
      {errorMessages && errorMessages.length > 0 ? (
        <UnorderedStringList items={errorMessages} />
      ) : loading ? (
        <CircularProgress />
      ) : null}
    </div>
  )
}
