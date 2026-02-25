import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { normalizeImageSrc } from '@/app/lib/utils/image'

const FeaturedStories = ({ story, loading, error }) => {
    const coverSrc = normalizeImageSrc(story?.coverImage, '/images/island.jpg')
    const profileSrc = normalizeImageSrc(story?.author?.profileImage, '/images/profile.jpg')

    if (loading) {
        return (
            <div className='flex bg-white rounded-2xl p-6 w-[90%] mx-auto shadow-2xl'>
                <p className='text-gray-500'>Loading featured story...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className='flex bg-white rounded-2xl p-6 w-[90%] mx-auto shadow-2xl'>
                <p className='text-red-600'>{error}</p>
            </div>
        )
    }

    if (!story) {
        return (
            <div className='flex bg-white rounded-2xl p-6 w-[90%] mx-auto shadow-2xl'>
                <p className='text-gray-500'>No featured story yet.</p>
            </div>
        )
    }

  return (
    <div  className='card-appear group flex flex-col lg:flex-row bg-white rounded-2xl p-6 w-[90%] mx-auto shadow-lg border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl' >
        <div className='flex-1 relative h-64 sm:h-72 md:h-105 overflow-hidden rounded-2xl'>
            <Image 
                src={coverSrc}
                alt={story.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
        </div> 
        <div className='flex-1 mt-6 lg:mt-0 lg:ml-6'>
            <div className='flex justify-start'>
                <button className='bg-fuchsia-200 text-fuchsia-900 rounded-2xl px-4 py-2'>Featured</button>
            </div>
            <div className='text-3xl md:text-4xl font-bold mt-4' style={{ fontFamily: 'var(--font-playfair-display)'}}>{story.title}</div>
            <div className='text-gray-500 mt-2 text-base md:text-[18px]'>{story.excerpt || story.content?.slice(0, 130) || "No summary available"}...</div>
            <div className='flex gap-4 mt-6'>
                <div className='w-15 h-15 relative mb-2' >
                    <Image src={profileSrc} alt="profile photo" fill className="rounded-full object-cover" />
   
                </div>
                <div className='flex flex-col justify-center text-left'>
                    <div>{story.author?.name || "Unknown Author"}</div>
                    <div className='text-gray-500'>{new Date(story.createdAt).toDateString()}</div>
                </div>
            </div>
                                                <Link href={`/stories/${story.slug}`} className='text-[#0F4C5C] font-medium transition-colors duration-200 hover:text-[#0C3D4A]'>Read More</Link>
        </div>
    </div> 
  )
}   

export default FeaturedStories