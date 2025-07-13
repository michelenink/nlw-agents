import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestions } from "@/http/use-create-question";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createQuestionSchema = z.object({
	question: z
		.string()
		.min(1, "Pergunta é obrigatória")
		.min(10, "Pergunta deve ter pelo menos 10 caracteres")
		.max(500, "Pergunta deve ter menos de 500 caracteres"),
});

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

interface QuestionFormProps {
	roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
	const { mutateAsync: createQuestion } = useCreateQuestions(roomId);

	const form = useForm<CreateQuestionFormData>({
		resolver: zodResolver(createQuestionSchema),
		defaultValues: {
			question: "",
		},
	});

	async function handleCreateQuestion(data: CreateQuestionFormData) {
		await createQuestion(data);

		form.reset();
	}

	const isSubmitting = form.formState.isSubmitting;

	return (
		<Card>
			<CardHeader>
				<CardTitle>Fazer uma Pergunta</CardTitle>
				<CardDescription>
					Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className="flex flex-col gap-6"
						onSubmit={form.handleSubmit(handleCreateQuestion)}
					>
						<FormField
							control={form.control}
							name="question"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sua Pergunta</FormLabel>
									<FormControl>
										<Textarea
											autoComplete="off"
											className="min-h-[100px]"
											placeholder="O que você gostaria de saber?"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={isSubmitting} type="submit">
							{isSubmitting ? "Enviando..." : "Enviar pergunta"}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
