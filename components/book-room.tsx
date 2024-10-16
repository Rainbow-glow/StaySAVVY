'use client'

import React, { ReactNode, useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { DialogContent, DialogDescription, DialogTitle } from './ui/dialog'
import BookRoomForm from './forms/booking.form'
import { RoomType } from '@/types/room.types'

interface BookRoomProps { 
    room: RoomType, 
    userId: string, 
    roomId: string, 
    pricePerNight: number, 
    trigger?: ReactNode 
}

const BookRoom = ({ room, roomId, userId, pricePerNight, trigger }: BookRoomProps) => {
    const [open, setOpen] = useState(false)
  return (
    <div className=''>

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className=''>
                { trigger || (<Button className='rounded-full w-full' disabled={room?.status === 'booked'}>{room?.status === 'booked' ? "Booked" : "Book now"}</Button>)}
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    Book this room <b>{room.roomNumber}</b>
                </DialogTitle>
                <DialogDescription className=''>
                    <BookRoomForm pricePerNight={pricePerNight} roomId={roomId} userId={userId} closeModal={() => setOpen(false)} />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default BookRoom