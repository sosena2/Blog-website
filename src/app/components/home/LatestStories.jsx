import React from 'react'
import Card from '../ui/Card'

const LatestStories = () => {
  return (
    <div className='w-[90%] mx-auto'>
        <h2 className='text-3xl font-bold mb-6'>Latest Stories</h2>
        <div className='grid grid-cols-2 gap-6'>
            <Card />    
            <Card />
            <Card/>
            <Card/>
        </div>
    </div>
  )
}

export default LatestStories