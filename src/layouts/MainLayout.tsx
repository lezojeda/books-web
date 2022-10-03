import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {children}
    </div>
  )
}

export default Layout
