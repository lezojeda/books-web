import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Volume } from '../../types'

const VolumeListItem = ({
  className,
  volume,
}: {
  className?: string
  volume: Volume
}) => {
  const volumeAuthors = volume.volumeInfo.authors
  return (
    <li
      className={classNames('text-left whitespace-nowrap py-4', className)}
      key={volume.id}
    >
      <div className="flex items-center">
        <div className="w-8 h-16 xl:w-16 xl:h-32 mr-6">
          <Link to={`/volumes/${volume.id}`}>
            <img
              alt={`Cover image for ${volume.volumeInfo.title}`}
              className="text-xs lg:text-sm h-full w-full whitespace-normal overflow-hidden"
              src={volume.volumeInfo.imageLinks?.thumbnail}
            />
          </Link>
        </div>
        <span className="max-w-[32px]">
          <Link to={`/volumes/${volume.id}`}>
            <div className="text-xl">{volume.volumeInfo.title}</div>
          </Link>
          <div>
            {volumeAuthors
              ? `by ${volumeAuthors.join(', ')}`
              : 'Author/s not found'}
          </div>
        </span>
      </div>
    </li>
  )
}

export default VolumeListItem
