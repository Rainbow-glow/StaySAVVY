'use server'

import connectDB from "@/lib/connectDB"
import Room from "@/models/room.model"
import { RoomType } from "@/types/room.types"

export const getRooms = async () => {
    await connectDB()
    return await Room.find({}).sort({ createdAt: -1 })
}

export const getRoomDetail = async (id: string) => {
    await connectDB()
    return await Room.findById(id)
}

export const deleteRoom = async (id: string) => {
    await connectDB()
    return await Room.findByIdAndDelete(id)
}


export const updateRoom = async (id: string, data: RoomType) => {
    await connectDB()
    return await Room.findByIdAndUpdate(id, data).lean()
}