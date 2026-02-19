import React from 'react'
import Image from 'next/image'

const Card = () => {
  return (
    <div  className='flex flex-col bg-white rounded-2xl p-6 w-full mx-auto shadow-2xl' >
        <div className='flex-1'>
            <Image src="/images/awash.jpg" alt="alt-photo" width={400} height={250} className="w-full h-full "/>
        </div> 
        <div className='flex-1 m-4'>
            <div className='flex justify-start'>
                <button className='bg-fuchsia-200 text-fuchsia-900 rounded-2xl px-4 py-2'>Featured</button>
            </div>
            <div className='text-2xl font-bold mt-4' style={{ fontFamily: 'var(--font-playfair-display)'}}>The Ultimate Guide to Tropical Paradise Islands</div>
            <div className='text-gray-500 my-2 text-xl'>Discover hidden gems in the Pacific and Caribbean that most travelers miss.</div>
            <hr className='text-gray-500'/>
            <div className='flex my-4 gap-4'>
                <div className='w-20 h-20 relative' >
                    <Image src="/profile.jpg" alt="profile photo" fill className="rounded-full object-cover" />
   
                </div>
                <div className='flex flex-row items-center gap-4'>
                <div>Sarah Martinez</div>
                <div className='text-gray-500'>Feb 15, 2026 · 8 min read   </div>
                </div>
                
                
            </div>
        </div>
    </div> 
  )
}   

export default Card