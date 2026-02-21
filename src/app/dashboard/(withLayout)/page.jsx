import React from 'react'
import StatsCards from '../../components/dashboard/StatsCards'
import PostsTable from '../../components/dashboard/PostsTable'

const page = () => {
  return (
    <div className="w-full bg-[#F5F1EB] px-8 py-12 mt-6">
      <StatsCards />
      <PostsTable />
    </div>
  )
}

export default page