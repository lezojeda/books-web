import { useEffect, useState } from 'react'
import axiosInstance from '../services/axios'

type Parameters = {
  url: string
  method: string
  data?: any
}

const useAxios = ({ url, method, data = null }: Parameters) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    axiosInstance({ url, method, data })
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
