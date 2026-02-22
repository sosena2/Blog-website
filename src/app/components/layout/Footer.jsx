import React from 'react'
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className='mt-8 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6'>
        <div className='flex flex-col gap-4'>
          <div className='font-bold text-2xl'>Wanderlust</div>
          <div className='text-gray-500'>Sharing travel stories and inspiring adventures around the globe.</div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='font-bold'>Explore</div>
          <div className='flex flex-col text-gray-500 '>
            <Link href={'/about'}>About</Link>
            <Link href={'/authors'}>Authors</Link>
            <Link href={'/topics'}>Topics</Link>
          </div>
        </div> 
        <div className='flex flex-col gap-4'>
          <div className='font-bold'>Resources</div>
          <div className='flex flex-col text-gray-500 '>
            <Link href={'/help'}>Help Center</Link>
            <Link href={'/privacy'}>Privacy</Link>
            <Link href={'/terms'}>Terms</Link>
          </div>
        </div>
        <div className='flex flex-col gap-4 '>
          <div className='font-bold'>Connect</div>
          <div className='flex flex-col text-gray-500 '>
            <Link href={'/x'}>X</Link>
            <Link href={'/instagram'}>Instagram</Link>
            <Link href={'/facebook'}>Facebook</Link>
          </div> 
        </div>
      </div> 
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <hr className='py-3 text-gray-300' />
      </div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-500 pb-6'>
        © 2026 Wanderlust. All rights reserved.
      </div>
    </footer>
  ) 
}

export default Footer