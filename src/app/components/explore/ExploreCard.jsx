import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ExploreCard = ({story}) => {
  return (
    <Link href={`/stories/${story.slug}`} className='grid grid-cols-1 md:grid-cols-3 bg-white rounded-2xl p-5 md:p-6 w-full mx-auto shadow-sm border border-gray-100 gap-4' >
          <div className='md:col-span-1 relative h-52 sm:h-56 overflow-hidden rounded-xl'>
              <Image 
              src= {story.coverImage || "/images/awash.jpg" }
              alt={story.title}
              fill
              className="object-cover"/>
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
              <div className='text-gray-500 my-2 text-base sm:text-lg'>{story.excerpt || story.content?.slice(0, 120)}...</div>
              {/* Author section */}
              <div className='flex flex-wrap items-center my-4 gap-3'>
                  <div className='w-10 h-10 relative' >
                      <Image 
                    src={story.author?.profileImage || "/profile.jpg"}
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