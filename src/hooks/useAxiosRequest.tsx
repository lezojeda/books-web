import { useEffect, useState } from 'react'
import { apiAxiosInstance } from '../services/axios'

type Parameters = {
  url: number
  method: string
  data?: any
}

const useAxios = ({ url, method, data = null }: Parameters) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    apiAxiosInstance({ url, method, data })
      .then((response) => {
        setResponse(response.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { response, error, loading }
}

export default useAxios
