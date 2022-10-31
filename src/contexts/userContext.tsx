import React, { useEffect, useState } from 'react'
import { User } from '../types/users'
import {
  getToken,
  getUserDataFromToken,
  isAuthenticated,
} from '../utils/auth.utils'

export type UserContextType = Pick<User, 'email' | 'books' | 'id'>

export type UserContext = {
  user?: UserContextType
  setUser?: (user: UserContextType) => void
}

export const UserContext = React.createContext<UserContext>({
  user: undefined,
  setUser: undefined,
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType>()

  useEffect(() => {
    if (isAuthenticated()) {
      const sessionData = getUserDataFromToken(getToken() || '')
      if (sessionData) {
        setUser && setUser(sessionData)
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
