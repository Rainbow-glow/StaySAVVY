import CreateRoom from "@/components/create-room";
import ListRooms from "@/components/list-rooms";
import Loader from "@/components/loading";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-col gap-y-3 mt-16 p-4 py-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center py-3 gap-x-4">
        <h2 className="font-semibold text-2xl">Available rooms</h2>

        <CreateRoom />
      </div>


      <Suspense fallback={<Loader />}>
        <ListRooms />
      </Suspense>
    </div>
  );
}
