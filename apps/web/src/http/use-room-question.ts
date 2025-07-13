import type { GetRoomQuestionsResponse } from "@agents-workspace/shared-types";
import { useQuery } from "@tanstack/react-query";

interface UseRoomQuestionsParams {
  page?: number;
  limit?: number;
}

export function useRoomQuestions(
  roomId: string,
  { page = 1, limit = 10 }: UseRoomQuestionsParams = {}
) {
  return useQuery({
    queryKey: ["get-questions", roomId, page, limit],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions?${searchParams}`
      );

      const result: GetRoomQuestionsResponse = await response.json();
      return result;
    },
    refetchInterval: (query) => {
      const data = query.state.data;
      const hasGeneratingAnswers = data?.questions?.some(
        (question) => question.isGeneratingAnswer
      );
      return hasGeneratingAnswers ? 3000 : false;
    },
    refetchIntervalInBackground: true,
  });
}
