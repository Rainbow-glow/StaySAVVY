import connectDB from "@/lib/connectDB"
import Booking from "@/models/booking.model"

export const getBookings = async () => {
    await connectDB()

    const bookings = await Booking.find({}).sort({ createdAt: -1 })
    const count = await Booking.countDocuments()

    return { bookings, count }
}