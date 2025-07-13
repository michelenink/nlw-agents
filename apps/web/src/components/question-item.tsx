import { Card, CardContent } from '@/components/ui/card';
import { dayjs } from '@/lib/dayjs';
import { Bot, Loader2, MessageSquare } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  answer?: string | null;
  createdAt: string;
  isGeneratingAnswer?: boolean;
}

interface QuestionItemProps {
  question: Question;
}

export function QuestionItem({ question }: QuestionItemProps) {
  const isInsufficientContextResponse = (answer: string | null) => {
    if (!answer) {
      return false;
    }

    const insufficientContextKeywords = [
      'não há informações suficientes',
      'não há informações',
      'informações insuficientes',
      'não há dados suficientes',
      'conteúdo fornecido não',
      'com base no conteúdo fornecido',
      'não encontrei informações',
      'não consegui encontrar',
    ];

    const lowerAnswer = answer.toLowerCase();

    for (const keyword of insufficientContextKeywords) {
      if (lowerAnswer.includes(keyword.toLowerCase())) {
        return true;
      }
    }

    return false;
  };

  const shouldShowAnswerSection = () => {
    if (question.isGeneratingAnswer) {
      return true;
    }

    if (!question.answer) {
      return false;
    }

    if (isInsufficientContextResponse(question.answer)) {
      return false;
    }

    return true;
  };

  const getAnswerContent = () => {
    if (question.isGeneratingAnswer) {
      return (
        <div className="flex items-center space-x-2">
          <Loader2 className="size-4 animate-spin text-primary" />
          <span className="text-primary text-sm italic">
            Gerando resposta...
          </span>
        </div>
      );
    }

    return (
      <p className="whitespace-pre-line text-sm leading-relaxed">
        {question.answer}
      </p>
    );
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="size-4 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-medium text-foreground">Pergunta</p>
              <p className="whitespace-pre-line text-muted-foreground text-sm leading-relaxed">
                {question.question}
              </p>
            </div>
          </div>

          {shouldShowAnswerSection() && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="size-4 text-secondary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-1 font-medium text-foreground">
                  Resposta da IA
                </p>
                <div className="text-muted-foreground">
                  {getAnswerContent()}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <span className="text-muted-foreground text-xs">
              {dayjs(question.createdAt).toNow()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
