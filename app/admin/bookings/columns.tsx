"use client"

import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Booking = {
  id: string
  checkInDay: Date
  checkOutDay: Date
  status: "pending" | "confirmed" | "cancelled"
  userId: string,
  room: string,
  paymentStatus: 'pending'| 'paid'| 'failed'
}

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "userId",
        header: "User",
    },
    {
        accessorKey: "room",
        header: "Room",
    },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = (row.getValue("status"))
   
        return <div className={cn("px-1 w-fit py-0.5 rounded-full text-center", {
            'bg-amber-600/20 tex-amber-600': status === 'pending',
            'bg-green-600/20 tex-green-600': status === 'confirmed',
            'bg-red-600/20 tex-red-600': status === 'cancelled',
        })}>{status as string}</div>
      },
    },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
        const status = (row.getValue("paymentStatus"))
   
        return <div className={cn("px-1 py-0.5 w-fit rounded-full text-center", {
            'bg-amber-600/20 tex-amber-600': status === 'pending',
            'bg-green-600/20 tex-green-600': status === 'paid',
            'bg-red-600/20 tex-red-600': status === 'failed',
        })}>{status as string}</div>
      },
  },
]