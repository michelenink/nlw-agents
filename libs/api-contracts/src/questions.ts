// Question API Contracts

export interface CreateQuestionRequest {
  question: string;
}

export interface CreateQuestionResponse {
  id: string;
  question: string;
  answer: string | null;
  createdAt: string;
}

export interface GetRoomQuestionsResponse {
  id: string;
  question: string;
  answer: string | null;
  createdAt: string;
  isGeneratingAnswer?: boolean;
}
[];
