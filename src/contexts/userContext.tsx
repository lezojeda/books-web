import React, { useState } from 'react'
import { User } from '../types/user'

type UserType = Pick<
  User,
  'email' | 'booksRead' | 'wantsToRead' | 'currentlyReading'
>

export type UserContext = {
  user?: UserType
  setUser: (user: UserType) => void
}

export const UserContext = React.createContext<UserContext | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>()

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
