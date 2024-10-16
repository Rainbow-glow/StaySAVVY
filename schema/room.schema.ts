import { z } from 'zod'

const RoomSchema = z.object({
    type: z.string().max(60),
    description: z.string().max(120).optional(),
    pricePerNight: z.string(),
    status: z.string().optional(),
    roomNumber: z.string(),
    image: z.string().optional()
})

export default RoomSchema