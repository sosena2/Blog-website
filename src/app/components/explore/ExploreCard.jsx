import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { normalizeImageSrc } from '@/app/lib/utils/image'

const ExploreCard = ({story}) => {
  const coverSrc = normalizeImageSrc(story?.coverImage, '/images/awash.jpg')
  const profileSrc = normalizeImageSrc(story?.author?.profileImage, '/images/profile.jpg')

  return (
    <Link href={`/stories/${story.slug}`} className='card-appear group grid grid-cols-1 md:grid-cols-3 bg-white rounded-2xl p-5 md:p-6 w-full mx-auto shadow-lg border border-gray-100 gap-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl' >
          <div className='md:col-span-1 relative h-52 sm:h-56 overflow-hidden rounded-xl'>
              <Image 
              src={coverSrc}
              alt={story.title}
              fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"/>
          </div> 

          {/* content */}
          <div className='md:col-span-2 md:mt-0'>

                {/* Tag */}
              <div className='flex justify-start'>
                  {story.tags?.length > 0 && (
                    <button className='bg-fuchsia-200 text-fuchsia-900 rounded-2xl px-4 py-2'>{story.tags[0]}</button>
                  )}
                
                {/*Title*/}
              </div>
              <div className='text-xl sm:text-2xl font-bold mt-3' style={{ fontFamily: 'var(--font-playfair-display)'}}>{story.title}</div>
              {/* description */}
              <div className='text-gray-500 my-2 text-[18px]'>{story.excerpt || story.content?.slice(0, 120)}...</div>
              {/* Author section */}
              <div className='flex flex-wrap items-center my-4 gap-3'>
                  <div className='w-10 h-10 relative' >
                      <Image 
                    src={profileSrc}
                      alt="profile photo" 
                      fill 
                      className="rounded-full object-cover" />
     
                  </div>
                    <div className='flex flex-wrap items-center gap-3'>
                  <div>{story.author?.name || "Unknown Author"}</div>
                  <div className='text-gray-500'>{new Date(story.createdAt).toDateString()}</div>
                  </div>
              </div>
          </div>
      </Link> 
    )
  }   

export default ExploreCard