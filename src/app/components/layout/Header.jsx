"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Button from '../ui/Button'
import { Compass, PenLine, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleDashboardClick = () => {
    const token = localStorage.getItem('token')
    router.push(token ? '/dashboard' : '/login')
  }

  return (
    <header className='fixed top-0 left-0 w-full z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3'>
        <div className='font-bold text-3xl tracking-tight'>
          <Link href={'/'} style={{ fontFamily: 'var(--font-playfair-display)' }}>Wanderlust</Link>
        </div>
        <div className='hidden md:flex items-center gap-8 text-gray-600 font-medium'>
          <Link href={'/explore'} className='hover:text-[#0F4C5C] transition-all duration-200 inline-flex items-center gap-2 hover:-translate-y-0.5'>
            <Compass size={17} />
            Explore
          </Link>
          <Link href={'/write'} className='hover:text-[#0F4C5C] transition-all duration-200 inline-flex items-center gap-2 hover:-translate-y-0.5'>
            <PenLine size={17} />
            Write
          </Link>
        </div>
        <div className='hidden md:block'>
          <Button
            variant='soft'
            className='rounded-2xl px-5 py-2.5'
            onClick={handleDashboardClick}
          >
            Dashboard
          </Button>
        </div>
        <button
          type='button'
          onClick={() => setIsOpen((prev) => !prev)}
          className='md:hidden inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5'
          aria-label='Toggle navigation'
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {isOpen && (
        <div className='md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md animate-fade-down'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3 text-gray-700 font-medium'>
            <Link href={'/explore'} className='flex items-center gap-2 transition-all duration-200 hover:text-[#0F4C5C] hover:translate-x-1' onClick={() => setIsOpen(false)}>
              <Compass size={17} />
              Explore
            </Link>
            <Link href={'/write'} className='flex items-center gap-2 transition-all duration-200 hover:text-[#0F4C5C] hover:translate-x-1' onClick={() => setIsOpen(false)}>
              <PenLine size={17} />
              Write
            </Link>
            <Button
              variant='soft'
              className='rounded-2xl px-5 py-2.5 w-full'
              onClick={() => {
                handleDashboardClick()
                setIsOpen(false)
              }}
            >
              Dashboard
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header