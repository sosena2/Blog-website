import React from 'react'
import Card from '../ui/Card'

const LatestStories = ({ stories = [], loading, error }) => {
  if (loading) {
    return (
      <div className='w-[90%] mx-auto'>
        <h2 className='text-3xl font-bold mb-6'>Latest Stories</h2>
        <div className='bg-white rounded-2xl p-6 shadow-2xl text-gray-500'>Loading latest stories...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-[90%] mx-auto'>
        <h2 className='text-3xl font-bold mb-6'>Latest Stories</h2>
        <div className='bg-white rounded-2xl p-6 shadow-2xl text-red-600'>{error}</div>
      </div>
    )
  }

  if (!stories.length) {
    return (
      <div className='w-[90%] mx-auto'>
        <h2 className='text-3xl font-bold mb-6'>Latest Stories</h2>
        <div className='bg-white rounded-2xl p-6 shadow-2xl text-gray-500'>No latest stories yet.</div>
      </div>
    )
  }

  return (
    <div className='w-[90%] mx-auto'>
        <h2 className='text-3xl font-bold mb-6'>Latest Stories</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {stories.map((story) => (
              <Card key={story._id} story={story} />
            ))}
        </div>
    </div>
  )
}

export default LatestStories