import jwtDecode from 'jwt-decode'
import { UserContextType } from '../contexts/userContext'
import { APITokenData, GoogleTokenData, User } from '../types'

export const TOKEN_ITEM_KEY = 'token-books'

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_ITEM_KEY)
  return !!token
}

export const getUserDataFromToken = (token: string): UserContextType | null => {
  try {
    const tokenData: APITokenData = jwtDecode(token)
    const user = {
      email: tokenData.email,
      books: tokenData.books,
      id: tokenData.id,
    }
    return user
  } catch (error) {
    return null
  }
}

export const getUserDataFromGoogleToken = (token: string): Pick<User, 'email' | 'firstName' | 'lastName'> | null => {
  try {
    const tokenData: GoogleTokenData = jwtDecode(token)
    const user = {
      email: tokenData.email,
      firstName: tokenData.given_name,
      lastName: tokenData.family_name,
    }
    return user
  } catch (error) {
    return null
  }
}

export const setToken = (token: string) =>
  localStorage.setItem(TOKEN_ITEM_KEY, token)

export const getToken = () => localStorage.getItem(TOKEN_ITEM_KEY)

export const removeToken = () => localStorage.removeItem(TOKEN_ITEM_KEY)

export const isTokenExpired = (): boolean => {
  const token = getToken()

  if (token) {
    const tokenData: APITokenData = jwtDecode(token)
    const currentDate = new Date()
    if (tokenData.exp * 1000 < currentDate.getTime()) {
      return true
    }
    return false
  }
  return true
}
