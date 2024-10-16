import connectDB from "@/lib/connectDB";
import Room from "@/models/room.model";  // Ensure the path is correct

export const searchRooms = async ({ query }: { query: string }) => {
  await connectDB();  // Ensure the database is connected

  const searchRegex = new RegExp(query, "i");

  const rooms = await Room.find({
    $or: [
      { name: searchRegex },
      { description: searchRegex },
      { location: searchRegex },
    ],
  }).sort({ createdAt: -1 }).lean();

  return rooms;
};
