import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { useRooms } from "@/http/use-room";
import { dayjs } from "@/lib/dayjs";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function RoomList() {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useRooms({ page: currentPage, limit: 10 });

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Salas recentes</CardTitle>
				<CardDescription className="text-muted-foreground text-xs">
					{data?.pagination.totalCount
						? `${data.pagination.totalCount} sala${data.pagination.totalCount > 1 ? "s" : ""} encontrada${data.pagination.totalCount > 1 ? "s" : ""}`
						: "Acesso rápido a salas recentes"}
				</CardDescription>
			</CardHeader>

			<CardContent className="flex flex-col gap-3">
				{isLoading && (
					<p className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50">
						Carregando...
					</p>
				)}

				{data?.rooms?.map((room) => {
					return (
						<Link
							className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
							key={room.id}
							to={`/room/${room.id}`}
						>
							<div className="flex flex-1 flex-col gap-1">
								<h3 className="font-medium">{room.name}</h3>

								<div className="flex items-center gap-2">
									<Badge className="text-xs" variant="secondary">
										{dayjs(room.createdAt).toNow()}
									</Badge>
									<Badge className="text-xs" variant="secondary">
										{room.questionCount} pergunta(s)
									</Badge>
								</div>
							</div>

							<span className="flex items-center gap-1 text-sm">
								Entrar
								<ArrowRightIcon className="size-3" />
							</span>
						</Link>
					);
				})}

				{data?.rooms?.length === 0 && !isLoading && (
					<p className="text-center text-muted-foreground py-4">
						Nenhuma sala encontrada
					</p>
				)}

				{data?.pagination && (
					<div className="mt-4">
						<Pagination
							currentPage={data.pagination.page}
							totalPages={data.pagination.totalPages}
							onPageChange={handlePageChange}
							hasNextPage={data.pagination.hasNextPage}
							hasPreviousPage={data.pagination.hasPreviousPage}
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
