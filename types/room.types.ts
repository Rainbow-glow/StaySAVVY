export interface RoomType {
    roomNumber: string;
    type: string;
    description?: string;
    pricePerNight: number;
    status: 'available' | 'booked' | 'maintenance';
    images?: string[];
    image: string,
}