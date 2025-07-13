export type GetRoomResponse = {
  rooms: Array<{
    id: string;
    name: string;
    questionCount: number;
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
