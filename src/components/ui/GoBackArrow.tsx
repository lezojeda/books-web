import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

export const GoBackArrow = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div
      className="absolute -left-12 top-8 w-8 hover:opacity-70 cursor-pointer"
      onClick={goBack}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          goBack()
        }
      }}
      tabIndex={0}
    >
      <ArrowLeftIcon />
    </div>
  )
}
