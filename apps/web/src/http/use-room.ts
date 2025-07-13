import type { GetRoomResponse } from "@agents-workspace/shared-types";
import { useQuery } from "@tanstack/react-query";

interface UseRoomsParams {
  page?: number;
  limit?: number;
}

export function useRooms({ page = 1, limit = 10 }: UseRoomsParams = {}) {
  return useQuery({
    queryKey: ["get-rooms", page, limit],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(
        `http://localhost:3333/rooms?${searchParams}`
      );
      const rooms: GetRoomResponse = await response.json();
      return rooms;
    },
  });
}
