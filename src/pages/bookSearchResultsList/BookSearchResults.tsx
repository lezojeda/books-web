import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import { Link, useLoaderData, useSearchParams } from 'react-router-dom'
import { BookSearchInput } from '../../components/forms/inputs/BookSearchInput'
import { MainPageTitle, PrimaryButton } from '../../components/ui'
import { Collection, Volume } from '../../types'
import VolumesList from './VolumesList'

const BookSearchResults = () => {
  const bookResults = useLoaderData() as Collection<Volume>
  const [searchParams, setSearchParams] = useSearchParams()
  const { handleSubmit, register } = useForm<{
    searchValue: string
  }>()

  const searchValue = searchParams.get('q')
  const startIndex = searchParams.get('startIndex')

  const onSubmit = (data: { searchValue: string }) => {
    setSearchParams(`q=${data.searchValue}`)
  }

  return (
    <div className="space-y-2 flex flex-col items-center p-8">
      <div className="mb-12 flex flex-col items-center">
        <form
          className="flex space-x-4 items-end mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <BookSearchInput
            className="w-full"
            register={register('searchValue')}
          />
          <PrimaryButton className="h-[34px]" content="Search" />
        </form>
        {searchValue && (
          <div className="relative flex">
            <Link
              className="flex justify-center w-8 mr-4 hover:opacity-70 cursor-pointer"
              to="/dashboard"
            >
              <ArrowLeftIcon />
            </Link>
            <MainPageTitle
              className="mb-2"
              title={`Search results for "${searchValue}"`}
            />
          </div>
        )}
      </div>
      {bookResults.items && (
        <>
          <VolumesList volumes={bookResults.items} />

          {/* Previous / Next buttons */}
          <div className="text-lg">
            <a
              className="mr-12 hover:underline cursor-pointer"
              onClick={() =>
                setSearchParams(
                  `q=${searchValue}&startIndex=${Number(startIndex) - 20}`
                )
              }
            >
              Previous
            </a>
            <a
              className="hover:underline cursor-pointer"
              onClick={() =>
                setSearchParams(
                  `q=${searchValue}&startIndex=${
                    startIndex ? Number(startIndex) + 20 : 20
                  }`
                )
              }
            >
              Next
            </a>
          </div>
        </>
      )}
    </div>
  )
}

export default BookSearchResults
