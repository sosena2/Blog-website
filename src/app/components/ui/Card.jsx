import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Card = ({ story }) => {
  return (
        <div  className='flex flex-col bg-white rounded-2xl p-6 w-full mx-auto shadow-sm border border-gray-100' >
                <div className='relative h-56 overflow-hidden rounded-2xl'>
                        <Image src={story.coverImage || "/images/awash.jpg"} alt={story.title} fill className="object-cover"/>
        </div> 
        <div className='flex-1 mt-4'>
            <div className='flex justify-start'>
                <button className='bg-fuchsia-200 text-fuchsia-900 rounded-2xl px-4 py-2'>{story.tags?.[0] || "Travel"}</button>
            </div>
            <div className='text-xl md:text-2xl font-bold mt-4' style={{ fontFamily: 'var(--font-playfair-display)'}}>{story.title}</div>
            <div className='text-gray-500 my-2 text-base md:text-xl'>{story.content?.slice(0, 120) || "No summary available"}...</div>
            <hr className='text-gray-500'/>
            <div className='flex my-4 gap-4'>
                <div className='w-20 h-20 relative' >
                    <Image src={story.author?.profileImage || "/profile.jpg"} alt="profile photo" fill className="rounded-full object-cover" />
   
                </div>
                <div className='flex flex-row items-center gap-4'>
                <div>{story.author?.name || "Unknown Author"}</div>
                <div className='text-gray-500'>{new Date(story.createdAt).toDateString()}</div>
                </div>
                
                
            </div>
            <Link href={`/stories/${story.slug}`} className='text-[#0F4C5C] font-medium'>Read More</Link>
        </div>
    </div> 
  )
}   

export default Card