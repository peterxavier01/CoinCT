import { ErrorBoundary } from "react-error-boundary";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

import SearchInput from "@/components/search-input";
import ErrorUI from "@/components/error-ui";
import TokenView from "@/components/tokens/token-view";
import { TokensViewFallback } from "@/components/home/fallback";

import { fetchCoinsListWithMarketData } from "@/hooks/use-coin";
import { SearchProvider } from "@/contexts/search-context";

interface TokensPageProps {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TokensPage({ searchParams }: TokensPageProps) {
  const queryClient = new QueryClient();
  const { page = 1 } = await searchParams;

  const currentPage = Number(page) || 1;
  const perPage = 10;

  await queryClient.prefetchQuery({
    queryKey: ["coins-list-with-market-data", currentPage, perPage],
    queryFn: () => fetchCoinsListWithMarketData(currentPage, perPage),
  });

  return (
    <ErrorBoundary
      fallback={
        <ErrorUI error={new Error("Failed to fetch data. Please try again.")} />
      }
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchProvider>
          <main className="main-container">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
              <h1 className="text-2xl font-semibold">All Tokens</h1>
              <SearchInput />
            </div>

            <Suspense fallback={<TokensViewFallback />}>
              <TokenView currentPage={currentPage} perPage={perPage} />
            </Suspense>
          </main>
        </SearchProvider>
      </HydrationBoundary>
    </ErrorBoundary>
  );
}
