"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { buildPageNumbers, cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface TokensPaginationProps {
  currentPage: number;
  data: CoinListWithMarketData[];
  perPage: number;
}

export function TokensPagination({
  currentPage,
  data,
  perPage,
}: TokensPaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/tokens?page=${page}`);
  };

  const estimatedTotalPages =
    currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

  const hasMorePages = data.length === perPage;

  const pageNumbers = buildPageNumbers(currentPage, estimatedTotalPages);

  const isLastPage = !hasMorePages || currentPage === estimatedTotalPages;

  return (
    <Pagination id="coins-pagination">
      <PaginationContent className="pagination-content">
        <PaginationItem className="pagination-control prev">
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={
              currentPage === 1 ? "control-disabled" : "control-button"
            }
          />
        </PaginationItem>

        <div className="pagination-pages">
          {pageNumbers.map((page) => (
            <PaginationItem key={page.id}>
              {page.type === "ellipsis" ? (
                <span className="ellipsis">...</span>
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(page.value)}
                  className={cn("page-link", {
                    "page-link-active": currentPage === page.value,
                  })}
                >
                  {page.value}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>

        <PaginationItem className="pagination-control next">
          <PaginationNext
            onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
            className={isLastPage ? "control-disabled" : "control-button"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
