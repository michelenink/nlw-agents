import { Pagination } from "@/components/ui/pagination";
import { useRoomQuestions } from "@/http/use-room-question";
import { useState } from "react";
import { QuestionItem } from "./question-item";

interface QuestionListProps {
	roomId: string;
}

export function QuestionList(props: QuestionListProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const { data } = useRoomQuestions(props.roomId, {
		page: currentPage,
		limit: 10,
	});

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	if (!data) {
		return <div>Carregando...</div>;
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="font-semibold text-2xl text-foreground">
					Perguntas & Respostas
				</h2>
				{data.pagination.totalCount > 0 && (
					<span className="text-sm text-muted-foreground">
						{data.pagination.totalCount} pergunta
						{data.pagination.totalCount > 1 ? "s" : ""}
					</span>
				)}
			</div>

			{data.questions?.map((question) => (
				<QuestionItem key={question.id} question={question} />
			))}

			{data.questions?.length === 0 && (
				<div className="text-center py-8">
					<p className="text-muted-foreground">
						Nenhuma pergunta foi feita ainda. Seja o primeiro a perguntar!
					</p>
				</div>
			)}

			{data.pagination && data.pagination.totalPages > 1 && (
				<div className="mt-6">
					<Pagination
						currentPage={data.pagination.page}
						totalPages={data.pagination.totalPages}
						onPageChange={handlePageChange}
						hasNextPage={data.pagination.hasNextPage}
						hasPreviousPage={data.pagination.hasPreviousPage}
					/>
				</div>
			)}
		</div>
	);
}
