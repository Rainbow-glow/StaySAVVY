'use client'

import React, { useState } from 'react'
import { Dialog, DialogClose, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

import { LucideDelete, LucidePlusCircle } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const DeleteRoom = ({ id }: {id: string}) => {
    const [open, setOpen] = useState(false)

    const router = useRouter()

    const { mutate: deleteRoom, isPending: isDeleting } = useMutation({
        mutationKey: ['delete-room', id],
        mutationFn: async ({ id }: { id: string }) => {
            const res = axios.delete('/api/rooms?id='+ id)
            return res
        }
    })

    const handleDelete = () => {
        deleteRoom({ id }, {
            onSuccess: () => {
                toast.success('Deleted')
                router.replace('/')
                setOpen(false)
            },
            onError(err) {
                toast.error(err?.message)
            }
        })
    }
  return (
    <div>

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'destructive'} className='rounded-full gap-x-1.5 hover:transition-all'>
                    <LucideDelete />
                    <span>Delete</span>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>
                    Delete this room
                </DialogTitle>
                <DialogDescription>
                    <p>Are your sure you want to delete this room?</p>
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'secondary'} className='rounded-full'>
                            No
                        </Button>
                    </DialogClose>
                    <Button variant={'destructive'} className='rounded-full' onClick={handleDelete}>
                        {isDeleting ? 'Deleting' : 'Yes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default DeleteRoom
