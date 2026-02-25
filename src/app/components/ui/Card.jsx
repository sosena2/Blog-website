import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { normalizeImageSrc } from '@/app/lib/utils/image'

const Card = ({ story }) => {
    const coverSrc = normalizeImageSrc(story?.coverImage, '/images/awash.jpg')
    const profileSrc = normalizeImageSrc(story?.author?.profileImage, '/images/profile.jpg')

  return (
    <div  className='card-appear group flex flex-col bg-white rounded-2xl p-6 w-full mx-auto shadow-lg border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl' >
                <div className='relative h-56 overflow-hidden rounded-2xl'>
                        <Image src={coverSrc} alt={story.title} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"/>
        </div> 
        <div className='flex-1 mt-4'>
            <div className='flex justify-start'>
                <button className='bg-fuchsia-200 text-fuchsia-900 rounded-2xl px-4 py-2'>{story.tags?.[0] || "Travel"}</button>
            </div>
            <div className='text-xl md:text-2xl font-bold mt-4' style={{ fontFamily: 'var(--font-playfair-display)'}}>{story.title}</div>
            <div className='text-gray-500 my-2 text-[18px] '>{story.excerpt || story.content?.slice(0, 120) || "No summary available"}...</div>
            <hr className='text-gray-500'/>
            <div className='flex my-4 gap-4'>
                <div className='w-20 h-20 relative' >
                    <Image src={profileSrc} alt="profile photo" fill className="rounded-full object-cover" />
   
                </div>
                <div className='flex flex-row items-center gap-4'>
                <div>{story.author?.name || "Unknown Author"}</div>
                <div className='text-gray-500'>{new Date(story.createdAt).toDateString()}</div>
                </div>
                
                
            </div>
                        <Link href={`/stories/${story.slug}`} className='text-[#0F4C5C] font-medium transition-colors duration-200 hover:text-[#0C3D4A]'>Read More</Link>
        </div>
    </div> 
  )
}   

export default Card