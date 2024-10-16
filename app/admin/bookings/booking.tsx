import { getBookings } from "@/actions/booking.actions"
import { Booking as TBooking, columns } from "./columns"
import { DataTable } from "./data-table"

const Booking = async () => {
    const { bookings } = await getBookings()

    return (
        <DataTable columns={columns} data={bookings as any} />
    )
}

export default Booking