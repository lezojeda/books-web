import { Volume } from '../../types'
import VolumeListItem from './VolumeListItem'

const VolumesList = ({ volumes }: { volumes: Volume[] | undefined }) => {
  return (
    <ul className="w-[720px] xl:w-[960px] h-[540px] overflow-auto">
      {volumes ? (
        volumes.map((volume, index) => (
          <VolumeListItem
            className={index === volumes.length - 1 ? '' : 'mb-4'}
            key={volume.id}
            volume={volume}
          />
        ))
      ) : (
        <></>
      )}
    </ul>
  )
}

export default VolumesList
