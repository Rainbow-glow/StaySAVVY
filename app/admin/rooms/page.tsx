import CreateRoom from '@/components/create-room'
import React from 'react'

const Page = async () => {
  return (
    <div className='flex flex-col max-w-4xl mx-auto gap-y-5'>

      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Manage Rooms</h2>
        <CreateRoom />
      </div>
    </div>
  )
}

export default Page