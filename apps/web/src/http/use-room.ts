import type { GetRoomResponse } from "@agents-workspace/shared-types";
import { useQuery } from "@tanstack/react-query";

export function useRooms() {
  return useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const rooms: GetRoomResponse = await response.json();
      return rooms;
    },
  });
}
