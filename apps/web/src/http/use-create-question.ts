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
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        "get-questions",
        roomId,
      ]);

      if (!questions) {
        return;
      }

      const questionsArray = questions ?? [];
      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true, // Sempre inicia como true, será ajustado no onSuccess
      };

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ["get-questions", roomId],
        [newQuestion, ...questionsArray]
      );

      return { newQuestion, questions };
    },

    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData(
        ["get-questions", roomId],
        (questions: GetRoomQuestionsResponse) => {
          if (!questions) {
            return questions;
          }

          if (!context?.newQuestion) {
            return questions;
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                answer: data.answer,
                id: data.questionId,
                isGeneratingAnswer: false,
              };
            }
            return question;
          });
        }
      );
    },

    onError: (_error, _variables, context) => {
      if (context?.questions) {
        queryClient.setQueryData(["get-questions", roomId], context.questions);
      }
    },
  });
}
