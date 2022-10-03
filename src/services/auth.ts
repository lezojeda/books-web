import axios from 'axios'
import axiosInstance from './axios'

type SignInResponse = {
  access_token: string
}

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post<SignInResponse>('/auth/signin', {
      email,
      password,
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.message }
    }
    return { error: 'something went wrong!' }
  }
}
