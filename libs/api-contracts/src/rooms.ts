// Room API Contracts

export interface CreateRoomRequest {
  name: string;
  description: string;
}

export interface CreateRoomResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface GetRoomsResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  questionsCount: number;
}
[];
