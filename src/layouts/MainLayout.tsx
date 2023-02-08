import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-backgroundColor text-black p-4">
      {children}
    </div>
  )
}

export default Layout
