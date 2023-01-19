import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center h-full bg-backgroundColor text-black overflow-scroll p-4 border-2">
      {children}
    </div>
  )
}

export default Layout
