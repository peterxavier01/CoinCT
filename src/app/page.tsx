import { Suspense } from "react";

import CoinOverview from "@/components/home/coin-overview";
import CoinsList from "@/components/home/coins-list";
import TrendingCoins from "@/components/home/trending-coins";
import {
  CoinOverviewFallback,
  CoinsListFallback,
  TrendingCoinsFallback,
} from "@/components/home/fallback";

export default function Home() {
  return (
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
  );
}
