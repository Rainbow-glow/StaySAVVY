import React from 'react'
import BookingTable from './booking'

const Page = () => {
  return (
    <div className='flex flex-col max-w-5xl mx-auto gap-y-5'>
      <h2 className='text-xl font-semibold'>Manage Bookings</h2>

      <div >
        <BookingTable />
      </div>
    </div>
  )
}

export default Page