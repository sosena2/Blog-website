import React from 'react'
import Link from 'next/link'
import Button from '../ui/Button'

const Header = () => {
  return (
    <header className='flex flex-row justify-between left-0 top-0 w-full bg-white fixed p-3'>
        <div className='font-bold text-2xl'>
            <Link href={'/'}>Wanderlust</Link>
        </div>
        <div className='flex flex-row gap-8 text-gray-500'> 
            <Link href={'/explore'}>Explore</Link>
            <Link href={'/write'}>Write</Link>
        </div>
        <div>
            <Link href={'/dashboard'}>
            <Button variant='primary' >Dashboard</Button>
            </Link>
        </div>
    </header>
  ) 
}

export default Header