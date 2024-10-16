import mongoose from "mongoose";

export interface BookingType {
    room: mongoose.Types.ObjectId;
    user?: mongoose.Types.ObjectId;
    userId: string,
    checkInDate: Date;
    checkOutDate: Date;
    totalPrice: number;
    status: 'confirmed' | 'checkedIn' | 'checkedOut' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed';
}