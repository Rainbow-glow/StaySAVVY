import mongoose, { Document, Schema, Model, model } from "mongoose";

interface Booking extends Document {
    room: mongoose.Types.ObjectId;
    user?: mongoose.Types.ObjectId;
    userId: string,
    checkInDate: Date;
    checkOutDate: Date;
    totalPrice: number;
    status: 'confirmed' | 'checkedIn' | 'checkedOut' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'failed';
}


const BookingSchema = new Schema<Booking>(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    userId: {
      type: String,
      required: true
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['confirmed', 'checkedIn', 'checkedOut', 'cancelled'],
      default: 'confirmed',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Booking: Model<Booking> = mongoose.models.Booking || model<Booking>('Booking', BookingSchema);
export default Booking;