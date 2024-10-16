import mongoose, { Document, Schema, Model, model } from "mongoose";

// Define Payment interface
interface Payment extends Document {
    booking: mongoose.Types.ObjectId; // Reference to Booking model
    amount: number;
    paymentDate: Date;
    status: 'pending' | 'completed' | 'failed';
}

// Create Payment schema
const PaymentSchema = new Schema<Payment>(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Export Payment model
const Payment: Model<Payment> = mongoose.models.Payment || model<Payment>('Payment', PaymentSchema);
export default Payment;