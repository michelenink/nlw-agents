import { useCreateRoom } from "@agents/data-access";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea,
} from "@agents/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createRoomFormSchema = z.object({
	name: z.string().min(3, { message: "Inclua pelo menos 3 caracteres" }),
	description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomFormSchema>;

export function CreateRoomForm() {
	const { mutateAsync: createRoom } = useCreateRoom();

	const form = useForm<CreateRoomFormData>({
		resolver: zodResolver(createRoomFormSchema),
		defaultValues: {
			name: "",
			description: "",
		},
		mode: "onChange",
	});

	async function handleCreateRoom({ name, description }: CreateRoomFormData) {
		try {
			await createRoom({ name, description });
			form.reset();
		} catch {
			toast.error("Erro ao criar sala");
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Criar sala</CardTitle>
				<CardDescription>
					Crie uma nova sala para começar a fazer perguntas e receber respostas
					de IA.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form
						className="flex flex-col gap-6"
						onSubmit={form.handleSubmit(handleCreateRoom)}
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Nome</FormLabel>
										<FormControl>
											<Input
												{...field}
												autoComplete="off"
												placeholder="Nome da sala"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Descrição</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												autoComplete="off"
												placeholder="Descrição da sala"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<Button className="w-full" type="submit">
							Criar sala
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
