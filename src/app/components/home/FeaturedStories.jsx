import React from 'react'
import Image from 'next/image'

const FeaturedStories = () => {
  return (
    <div  className='flex bg-white rounded-2xl p-6 w-[90%] mx-auto shadow-2xl' >
        <div className='flex-1'>
            <Image 
                src="/images/island.jpg" 
                alt="abjata" 
                width={500} 
                height={300}
                className="w-full h-full "
            />
        </div> 
        <div className='flex-1 m-6'>
            <div className='flex justify-start'>
                <button className='bg-fuchsia-200 text-fuchsia-900 rounded-2xl px-4 py-2'>Featured</button>
            </div>
            <div className='text-4xl font-bold mt-4' style={{ fontFamily: 'var(--font-playfair-display)'}}>The Ultimate Guide to Tropical Paradise Islands</div>
            <div className='text-gray-500 mt-2 text-xl'>Discover hidden gems in the Pacific and Caribbean that most travelers miss.</div>
            <div className='flex gap-4 m-6'>
                <div className='w-20 h-20 relative' >
                    <Image src="/profile.jpg" alt="profile photo" fill className="rounded-full object-cover" />
   
                </div>
                <div className='flex flex-col justify-center text-left'>
                    <div>Sarah Martinez</div>
                    <div className='text-gray-500'>Feb 15, 2026 · 8 min read   </div>
                </div>
            </div>
            <div>Read More</div>
        </div>
    </div> 
  )
}   

export default FeaturedStories