import axios from 'axios'
import { getToken } from '../utils/auth.utils'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use(function (config) {
  config.headers = {
    Authorization: `Bearer ${getToken()}`,
  }

  return config
})

export default axiosInstance
