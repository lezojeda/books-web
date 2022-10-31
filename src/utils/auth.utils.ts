import jwtDecode from 'jwt-decode'
import { UserContextType } from '../contexts/userContext'
import { Book } from '../types/books'

type TokenData = {
  sub: number
  email: string
  id: string
  books: Book[]
  iat: number
  exp: number
}

export const TOKEN_ITEM_KEY = 'token-books'

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_ITEM_KEY)
  return !!token
}

export const getUserDataFromToken = (token: string): UserContextType | null => {
  try {
    const tokenData: TokenData = jwtDecode(token)
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

export const setToken = (token: string) =>
  localStorage.setItem(TOKEN_ITEM_KEY, token)

export const getToken = () => localStorage.getItem(TOKEN_ITEM_KEY)

export const isTokenExpired = (): boolean => {
  const token = getToken()

  if (token) {
    const tokenData: TokenData = jwtDecode(token)
    const currentDate = new Date()
    if (tokenData.exp * 1000 < currentDate.getTime()) {
      return true
    }
    return false
  }
  return true
}
