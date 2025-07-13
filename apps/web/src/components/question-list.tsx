import { useRoomQuestions } from '@/http/use-room-question';
import { QuestionItem } from './question-item';

interface QuestionListProps {
  roomId: string;
}

export function QuestionList(props: QuestionListProps) {
  const { data } = useRoomQuestions(props.roomId);

  if (!data) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

     {data?.map((question) => (
      <QuestionItem key={question.id} question={question} />
     ))}
    </div>
  );
}
