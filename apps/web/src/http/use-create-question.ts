import type {
  CreateQuestionRequest,
  CreateQuestionResponse,
  GetRoomQuestionsResponse,
} from "@agents-workspace/shared-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateQuestions(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result: CreateQuestionResponse = await response.json();

      return result;
    },

    //Executa no momento que for feita a chamada na api
    onMutate: ({ question }) => {
      queryClient.invalidateQueries({ queryKey: ["get-questions", roomId] });

      const firstPageData = queryClient.getQueryData<GetRoomQuestionsResponse>([
        "get-questions",
        roomId,
        1,
        10,
      ]);

      if (firstPageData) {
        const newQuestion = {
          id: crypto.randomUUID(),
          question,
          answer: null,
          createdAt: new Date().toISOString(),
          isGeneratingAnswer: true,
        };

        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ["get-questions", roomId, 1, 10],
          {
            ...firstPageData,
            questions: [newQuestion, ...firstPageData.questions],
            pagination: {
              ...firstPageData.pagination,
              totalCount: firstPageData.pagination.totalCount + 1,
            },
          }
        );

        return { newQuestion, firstPageData };
      }

      return {};
    },

    onSuccess: (data, _variables, context) => {
      if (context?.newQuestion) {
        const firstPageData =
          queryClient.getQueryData<GetRoomQuestionsResponse>([
            "get-questions",
            roomId,
            1,
            10,
          ]);

        if (firstPageData) {
          queryClient.setQueryData<GetRoomQuestionsResponse>(
            ["get-questions", roomId, 1, 10],
            {
              ...firstPageData,
              questions: firstPageData.questions.map((question) => {
                if (question.id === context.newQuestion.id) {
                  return {
                    ...context.newQuestion,
                    answer: data.answer,
                    id: data.questionId,
                    isGeneratingAnswer: false,
                  };
                }
                return question;
              }),
            }
          );
        }
      }

      queryClient.invalidateQueries({ queryKey: ["get-questions", roomId] });
    },

    onError: (_error, _variables, context) => {
      if (context?.firstPageData) {
        queryClient.setQueryData(
          ["get-questions", roomId, 1, 10],
          context.firstPageData
        );
      }

      queryClient.invalidateQueries({ queryKey: ["get-questions", roomId] });
    },
  });
}
