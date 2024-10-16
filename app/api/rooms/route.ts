import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Room from '@/models/room.model';
import { RoomType } from '@/types/room.types';
export async function GET() {
    await connectDB();
    try {
        const rooms = await Room.find();
        return NextResponse.json({ rooms });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching rooms', error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await connectDB(); 
    try {
        const roomData: RoomType = await req.json();
        
        if (!roomData.roomNumber || !roomData.type || !roomData.pricePerNight) {
            return NextResponse.json({ message: 'Invalid room data' }, { status: 400 });
        }
        
        const newRoom = new Room(roomData);
        await newRoom.save();

        return NextResponse.json({ room: newRoom }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error creating room', error }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const { id } = await req.json();
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid room ID' }, { status: 400 });
        }

        const updatedData: Partial<RoomType> = await req.json();
        const updatedRoom = await Room.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRoom) {
            return NextResponse.json({ message: 'Room not found' }, { status: 404 });
        }

        return NextResponse.json({ room: updatedRoom }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating room', error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await connectDB();
    try {
        const id = req.nextUrl.searchParams.get('id')!
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid room ID' }, { status: 400 });
        }

        const deletedRoom = await Room.findByIdAndDelete(id);

        if (!deletedRoom) {
            return NextResponse.json({ message: 'Room not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Room deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting room', error }, { status: 500 });
    }
}
