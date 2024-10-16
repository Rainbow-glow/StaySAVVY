import mongoose, { Document, Schema, Model, model } from "mongoose";


interface User extends Document {
    userId: string;
    email: string;
    role: 'admin' | 'guest';
    bookings?: mongoose.Types.ObjectId[];
}


const UserSchema = new Schema<User>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'guest'],
      default: 'guest',
    },
    bookings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    }],
  },
  { timestamps: true }
);

const User: Model<User> = mongoose.models.User || model<User>('User', UserSchema);
export default User;