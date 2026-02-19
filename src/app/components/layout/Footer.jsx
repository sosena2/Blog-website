import React from 'react'
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className='mx-4 mt-5'>
      <div className='grid grid-cols-4 gap-4 mb-5'>
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
      <hr  className='py-3 text-gray-500'/>
      <div className='text-center text-gray-500'>© 2026 Wanderlust. All rights reserved.</div>
    </footer>
  ) 
}

export default Footer