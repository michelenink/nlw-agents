import type { GetRoomQuestionsResponse } from "@agents-workspace/shared-types";
import { useQuery } from "@tanstack/react-query";

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ["get-questions", roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`
      );

      const result: GetRoomQuestionsResponse = await response.json();
      return result;
    },
    refetchInterval: (query) => {
      const data = query.state.data;
      const hasGeneratingAnswers = data?.some(
        (question) => question.isGeneratingAnswer
      );
      return hasGeneratingAnswers ? 3000 : false;
    },
    refetchIntervalInBackground: true,
  });
}
