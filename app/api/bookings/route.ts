import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/connectDB';
import Booking from '@/models/booking.model';
import { BookingType } from '@/types/booking.types';
import Room from '@/models/room.model';
import User from '@/models/user.model';

export async function GET() {
    await connectDB();
    try {
        const bookings = await Booking.find().populate('room').populate('user');
        return NextResponse.json({ bookings });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching bookings', error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const bookingData: BookingType = await req.json();

        const room = await Room.findById(bookingData.room);
        const user = await User.findOne({ userId: bookingData?.userId });
        if (!room) {
            return NextResponse.json({ message: 'Invalid room ID' }, { status: 400 });
        }
        // if (!user) {
        //     return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        // }

        const newBooking = new Booking(bookingData);
        await newBooking.save();

        room.status = 'booked';
        room.bookings?.push(newBooking.id)
        await room.save();

        return NextResponse.json({ booking: newBooking }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating booking', error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const { id } = await req.json();
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid booking ID' }, { status: 400 });
        }

        const updatedData: Partial<BookingType> = await req.json();
        const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, { new: true }).populate('room').populate('user');

        if (!updatedBooking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ booking: updatedBooking }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating booking', error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await connectDB();
    try {
        const id = req.nextUrl.searchParams.get('id')!
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid booking ID' }, { status: 400 });
        }

        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
        }

        const room = await Room.findById(deletedBooking.room);
        if (room) {
            room.status = 'available';
            await room.save();
        }

        return NextResponse.json({ message: 'Booking deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting booking', error }, { status: 500 });
    }
}
