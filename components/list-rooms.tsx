import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from './ui/card'
import Image from 'next/image'
import { getRooms } from '@/actions/room.actions.'
import { Button } from './ui/button'
import { LucideType } from 'lucide-react'
import Link from 'next/link'
import BookRoom from './book-room'
import { auth } from '@clerk/nextjs/server'
import { formatNigerianNaira } from '@/lib/utils'

const ListRooms = async () => {
  const rooms = await getRooms()
  const { userId } = auth()

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 gap-y-8 items-stretch'>
      {
        rooms.map(room => (
          <Card className='flex p-0 border-secondary justify-between h-full flex-col pb-2' key={room.id}>
              <Link href={`/rooms/${room.id}`}>
                <Image
                  className='aspect-square rounded-t-md'
                  src={room?.image ?? ''}
                  width={400}
                  height={400}
                  alt={room.roomNumber}
                />
                <CardContent className='py-2.5 flex flex-col gap-y-3.5 px-1.5 justify-between'>
                  <CardTitle className='flex flex-row justify-between items-center'>
                    <span>{ room.roomNumber}</span>
                    <span className='text-sky-600'>{formatNigerianNaira(room.pricePerNight) }</span>
                  </CardTitle>
                  <div className='flex flex-col gap-y-3'>
                    <p>{ room?.description }</p>

                    <div className='flex items-center gap-x-1.5'>
                      <div className='w-10 h-10 bg-secondary/80 rounded-full flex items-center justify-center'>
                        <LucideType size={15} />
                      </div>
                      <p>{room.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Link>
              <BookRoom 
                pricePerNight={(room?.pricePerNight)}
                room={{
                  image: room.image!,
                  pricePerNight: room.pricePerNight,
                  roomNumber: room.roomNumber,
                  status: room.status,
                  type: room.type,
                  description: room.description,
                  images: room.images
                }}
                roomId={room.id}
                userId={userId!}
                trigger={
                  <Button className='rounded-full w-full' disabled={room?.status === 'booked'}>{room?.status === 'booked' ? "Booked" : "Book now"}</Button>
                }
              />
            </Card>
        ))
      }
    </div>
  )
}

export default ListRooms