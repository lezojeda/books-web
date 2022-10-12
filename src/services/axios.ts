import axios from 'axios'
import { getToken } from '../utils/auth.utils'

const apiAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

apiAxiosInstance.interceptors.request.use(function (config) {
  config.headers = {
    Authorization: `Bearer ${getToken()}`,
  }

  return config
})

const googleBooksApiInstance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
})

export { apiAxiosInstance, googleBooksApiInstance }
