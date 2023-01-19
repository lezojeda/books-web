import React, { useEffect, useState } from 'react'
import { getMe } from '../services/users'
import { User } from '../types/users'
import { isAuthenticated, removeToken } from '../utils/auth.utils'

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

  const getAndSetUserData = async () => {
    const getMeResponse = await getMe()

    if (
      getMeResponse &&
      getMeResponse.status === 200 &&
      'data' in getMeResponse &&
      'books' in getMeResponse.data
    ) {
      setUser && setUser(getMeResponse.data)
    } else {
      removeToken()
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      getAndSetUserData()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
