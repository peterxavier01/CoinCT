import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import CoinOverview from "@/components/home/coin-overview";
import CoinsList from "@/components/home/coins-list";
import TrendingCoins from "@/components/home/trending-coins";
import {
  CoinOverviewFallback,
  CoinsListFallback,
  TrendingCoinsFallback,
} from "@/components/home/fallback";

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="main-container">
        <section className="home-grid">
          <Suspense fallback={<CoinOverviewFallback />}>
            <CoinOverview />
          </Suspense>

          <Suspense fallback={<TrendingCoinsFallback />}>
            <TrendingCoins />
          </Suspense>
        </section>

        <section className="w-full mt-7 space-y-4">
          <Suspense fallback={<CoinsListFallback />}>
            <CoinsList />
          </Suspense>
        </section>
      </main>
    </HydrationBoundary>
  );
}
