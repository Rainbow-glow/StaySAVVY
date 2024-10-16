import mongoose, { Document, Schema, Model, model } from "mongoose";

interface Room extends Document {
    roomNumber: string;
    type: string;
    description?: string;
    pricePerNight: number;
    status: 'available' | 'booked' | 'maintenance';
    bookings?: mongoose.Types.ObjectId[];
    images?: string[];
    image?: string
}

const RoomSchema = new Schema<Room>(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'booked', 'maintenance'],
      default: 'available',
    },
    bookings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    }],
    image: {
      type: String,
      required: false
    },
    images: [{
      type: String,
      required: false,
    }],
  },
  { timestamps: true }
);

const Room: Model<Room> = mongoose.models?.Room || model<Room>('Room', RoomSchema);
export default Room;