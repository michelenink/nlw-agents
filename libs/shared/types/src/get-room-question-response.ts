export type GetRoomQuestionsResponse = {
  questions: Array<{
    id: string;
    question: string;
    answer: string | null;
    createdAt: string;
    isGeneratingAnswer?: boolean;
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
