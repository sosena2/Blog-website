'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'
import Header from './Header'

const HIDE_LAYOUT_ROUTES = new Set(['/login', '/register'])

const RootShell = ({ children }) => {
  const pathname = usePathname()
  const hideLayout = HIDE_LAYOUT_ROUTES.has(pathname)

  return (
    <>
      {!hideLayout && <Header />}
      <main
        className={
          hideLayout
            ? 'min-h-screen bg-[#F5F1EB] flex items-center justify-center px-4'
            : 'bg-[#F5F1EB] pt-24'
        }
      >
        {children}
      </main>
      {!hideLayout && <Footer />}
    </>
  )
}

export default RootShell
