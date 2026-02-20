'use client'
import React, {useState} from 'react'
import {Search,Filter} from 'lucide-react'
import ExploreCard from '../components/explore/ExploreCard'

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [sortBy, setSortBy] = useState('Most Recent');
  

  const tags = ['#Adventure', '#Beach', '#City', '#Nature', '#Culture'];

  const toggleTag = (tag) =>{
    setActiveTag(prev => prev === tag ? 'All' : tag)
  };
  return (
    <div className="bg-[#F5F1EB] space-y-8 pb-10">
      <div className=' p-20 text-center'>
        <div className='text-5xl font-bold mb-4'style={{ fontFamily: 'var(--font-playfair-display)'}} >Explore stories</div>
        <div className='text-gray-500 text-xl'>Discover travel stories from around the world</div>
      </div>
      {/* search */}
      <div className='w-[70%] mx-auto relative '>
        <Search className="absolute left-5 top-1/2 transform -translate-y-2 text-gray-400 h-5 w-5" />
          <input
          type="text"
          placeholder="Search for destinations, topics, or authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-3xl focus:outline-none focus:ring-1 focus:ring-green-950 focus:border-transparent shadow-sm"
        />      
      </div>
      {/* filter */}
      <div className='bg-white w-[90%] mx-auto p-6 rounded-lg'>
        
        <div className='flex items-center gap-2 mb-4 text-gray-500'>
          <Filter className='h-5 w-5'></Filter>
          <h2 className='font-medium'>Filter by tag</h2>
        </div>
        {/* tags grid */}
        <div className='flex flex-wrap gap-2 mb-6'>
          {/* All Button */}
          <button
            onClick={() => setActiveTag('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${ activeTag === 'All'
                ? 'bg-green-950 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
              `}
            >
              All
          </button>
          {/* dynamic tag */}
          {tags.map((tag) => (
            <button
            key={tag}
            onClick = {() => toggleTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${ activeTag === tag
                ? 'bg-green-950 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
              `}
              >
                #{tag}
            </button>
          ))}
        </div>
        {/* sort section */}
        <div className='flex flex-col gap-2'>
          <p className=''> Sort by</p> 
          <select className='w-full bg-gray-200 px-4 py-2 rounded-lg'>
            <option>Most Recent</option>
            <option>Oldest</option>
            <option>Most Popular</option>
          </select>
        </div>

      </div>
      <div className='w-[90%] mx-auto flex flex-col gap-6'>
        <ExploreCard />
        <ExploreCard />
        <ExploreCard />
        <ExploreCard />
      </div>
    </div>
  )
}

export default Explore