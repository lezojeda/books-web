import { Volume } from '../../types'
import VolumeListItem from './VolumeListItem'

const VolumesList = ({ volumes }: { volumes: Volume[] | undefined }) => {
  return (
    <ul className="w-[720px] border border-black overflow-x-scroll">
      {volumes &&
        volumes.map((volume) => {
          return <VolumeListItem key={volume.id} volume={volume} />
        })}
    </ul>
  )
}

export default VolumesList
