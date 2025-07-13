import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	hasNextPage,
	hasPreviousPage,
}: PaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	const getPageNumbers = () => {
		const pages = [];
		const showPages = 5; // Quantidade de páginas visíveis

		let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
		const endPage = Math.min(totalPages, startPage + showPages - 1);

		if (endPage - startPage + 1 < showPages) {
			startPage = Math.max(1, endPage - showPages + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return pages;
	};

	return (
		<div className="flex items-center justify-center space-x-2">
			<Button
				variant="outline"
				size="sm"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={!hasPreviousPage}
			>
				<ChevronLeft className="size-4" />
				Anterior
			</Button>

			{getPageNumbers().map((page) => (
				<Button
					key={page}
					variant={currentPage === page ? "default" : "outline"}
					size="sm"
					onClick={() => onPageChange(page)}
				>
					{page}
				</Button>
			))}

			<Button
				variant="outline"
				size="sm"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={!hasNextPage}
			>
				Próxima
				<ChevronRight className="size-4" />
			</Button>
		</div>
	);
}
