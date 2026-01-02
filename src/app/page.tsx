import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import CoinOverview from "@/components/home/coin-overview";
import CoinsList from "@/components/home/coins-list";
import TrendingCoins from "@/components/home/trending-coins";
import {
  CoinOverviewFallback,
  CoinsListFallback,
  TrendingCoinsFallback,
} from "@/components/home/fallback";
import ErrorUI from "@/components/error-ui";

import { fetchTrendingCoins } from "@/hooks/use-coin";

export default async function Home() {
  const queryClient = new QueryClient();

  // this is to prefetch the trending coins data on the server
  // so that the credentials are not leaked to the client
  await queryClient.prefetchQuery({
    queryKey: ["trending-coins"],
    queryFn: fetchTrendingCoins,
  });

  return (
    <ErrorBoundary
      fallback={
        <ErrorUI error={new Error("Failed to fetch data. Please try again.")} />
      }
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main className="main-container">
          <section className="home-grid">
            <ErrorBoundary
              fallback={
                <ErrorUI
                  error={
                    new Error(
                      "Failed to fetch cryptocurrency data. Please try again."
                    )
                  }
                />
              }
            >
              <Suspense fallback={<CoinOverviewFallback />}>
                <CoinOverview />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary
              fallback={
                <ErrorUI
                  error={
                    new Error(
                      "Failed to fetch trending coins data. Please try again."
                    )
                  }
                />
              }
            >
              <Suspense fallback={<TrendingCoinsFallback />}>
                <TrendingCoins />
              </Suspense>
            </ErrorBoundary>
          </section>

          <section className="w-full mt-7 space-y-4">
            <ErrorBoundary
              fallback={
                <ErrorUI
                  error={
                    new Error(
                      "Failed to fetch coins list data. Please try again."
                    )
                  }
                />
              }
            >
              <Suspense fallback={<CoinsListFallback />}>
                <CoinsList />
              </Suspense>
            </ErrorBoundary>
          </section>
        </main>
      </HydrationBoundary>
    </ErrorBoundary>
  );
}
