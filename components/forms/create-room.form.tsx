'use client'

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import RoomSchema from '@/schema/room.schema'
import { z } from 'zod'

import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import { useMutation } from '@tanstack/react-query'
import Room from '@/models/room.model'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CreateRoomForm = ({ closeModal }: { closeModal?: () => void }) => {
    const router = useRouter()

    const { mutate: create, isPending, data } = useMutation({
        mutationKey: ['create-room'],
        mutationFn: async ({...values }: any ) => {
            const { data } = await axios.post(process.env.NEXT_PUBLIC_URL + '/api/rooms', {...values})
            return data as Room
        }
    })


    const form = useForm<z.infer<typeof RoomSchema>>({
        resolver: zodResolver(RoomSchema),
        defaultValues: {
          type: "",
          description: "",
          pricePerNight: "0",
          roomNumber: "",
          status: "available",
          image: ""
        },
      })
     
      function onSubmit(values: z.infer<typeof RoomSchema>) {
        create({...values}, {
            onSuccess: () => {
                toast.success('Room created successfully.')
                router.refresh()
                closeModal?.()
                form.reset()
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })
      }

    return (
        <div className='flex flex-col gap-y-3'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div className='flex items-center gap-x-2'>
                    <FormField
                        control={form.control}
                        name="roomNumber"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Room Number</FormLabel>
                            <FormControl>
                            <Input placeholder="Room Number (e.g A567)..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Room Type</FormLabel>
                            <FormControl>
                            <Input placeholder="Room Type" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Room Description</FormLabel>
                        <FormControl>
                        <Textarea placeholder="Description..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="pricePerNight"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                        <Input placeholder="Price per Night..." type='number' {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                        <Input placeholder="Room Image..." {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <Button type="submit" className='w-full rounded-full'>{isPending ? 'Creating...' : 'Create'}</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreateRoomForm