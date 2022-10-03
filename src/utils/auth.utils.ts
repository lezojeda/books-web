import jwtDecode from 'jwt-decode'

type TokenData = {
  exp: number
  iat: number
}

export const TOKEN_ITEM_KEY = 'token-books'

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_ITEM_KEY)
  return !!token
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
