import { getBookings } from '@/actions/booking.actions'
import { getRooms } from '@/actions/room.actions.'
import BookingsChart from '@/components/charts/bookings.chart'
import RoomsChart from '@/components/charts/rooms.chart'
import { Button } from '@/components/ui/button'
import React from 'react'

const Page = async () => {
  const [{ bookings }, rooms] = await Promise.all([
    await getBookings(),
    await getRooms()
  ])

  return (
    <div className='max-w-4xl mx-auto'>
        <div className='flex justify-between items-center py-3'>
          <h2 className='text-xl font-semibold'>
              Analysis
          </h2>

          <Button className='rounded-full'>View more</Button>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
            <BookingsChart 
              bookings={bookings}
            />
            <RoomsChart rooms={rooms} />
        </div>
    </div>
  )
}

export default Page