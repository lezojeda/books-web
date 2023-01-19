import { Link } from 'react-router-dom'
import { Volume } from '../../types'

const VolumeListItem = ({ volume }: { volume: Volume }) => {
  return (
    <li className="text-left whitespace-nowrap py-4" key={volume.id}>
      <Link to={`/volumes/${volume.id}`}>
        <div className="flex items-center">
          <img src={volume.volumeInfo.imageLinks?.smallThumbnail} alt="" />
          <div>
            <span>{volume.volumeInfo.title}</span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VolumeListItem
