'use client'

import React, { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from './ui/button'
import { DialogContent, DialogDescription, DialogTitle } from './ui/dialog'
import CreateRoomForm from './forms/create-room.form'

import { LucidePlusCircle } from 'lucide-react'

const CreateRoom = () => {
    const [open, setOpen] = useState(false)
  return (
    <div>

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='rounded-full gap-x-1.5 hover:bg-primary/30 hover:text-primary bg-primary text-white hover:transition-all'>
                    <LucidePlusCircle />
                    <span>Create Room</span>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    Create a new room
                </DialogTitle>
                <DialogDescription>
                    <CreateRoomForm closeModal={() => setOpen(false)} />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateRoom