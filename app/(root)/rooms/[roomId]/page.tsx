import { getRoomDetail } from '@/actions/room.actions.'
import BookRoom from '@/components/book-room'
import DeleteRoom from '@/components/forms/room.delete'
import { formatNigerianNaira } from '@/lib/utils'
import { auth } from '@clerk/nextjs/server'
import { LucideType } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const RoomDetailPage = async ({ params: { roomId } }: { params: { roomId: string }}) => {
  const room = await getRoomDetail(roomId)
  const { userId } = auth()

  if (!room) return <p className='text-muted-foreground'>This room could not be found.</p>

  return (
    <div className='flex flex-col gap-y-3 mt-16 p-4 py-8 max-w-4xl mx-auto'>
        <div className='flex flex-row items-center justify-between'>
            <h2 className='text-2xl font-semibold py-2'>
                {room?.roomNumber}
            </h2>

            <BookRoom 
                pricePerNight={room?.pricePerNight}
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
            />
        </div>

        <div className='flex flex-col gap-4 sm:gap-8'>
            <Image 
                src={room?.image ?? ''}
                className='aspect-video rounded-md object-cover'
                width={800}
                height={800}
                alt={room?.type ?? ''}
            />

            <div className='flex flex-col gap-y-1.5'>
                <div className='flex items-center justify-between flex-wrap'>
                    <div className='flex items-center gap-x-1.5'>
                        <div className='w-10 h-10 bg-secondary/80 rounded-full flex items-center justify-center'>
                        <LucideType size={15} />
                        </div>
                        <span>{room.type}</span>
                    </div>
                    <p className='text-sky-600'>{ formatNigerianNaira(room.pricePerNight) }</p>
                </div>
                <p className='text-muted-foreground'>
                    { room.description }
                </p>
            </div>
            <DeleteRoom id={room.id} />
        </div>
    </div>
  )
}

export default RoomDetailPage