"use client";

import { useQuery } from "@tanstack/react-query";
import CoinCard from "./coin-card";

import { useCoin } from "@/hooks/use-coin";
import { fetcher } from "@/actions/coin-gecko.actions";

const CoinsList = () => {
  const { coinsMarketsQuery } = useCoin("bitcoin");
  const { data: coinsMarkets } = coinsMarketsQuery;

  const coinsQuery = useQuery({
    queryKey: ["coins-markets"],
    queryFn: () =>
      fetcher<CoinListData[]>("/coins/markets", {
        vs_currency: "usd",
        symbols: "btc, eth, sol, doge",
        price_change_percentage: "24h",
      }),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const { data: coins } = coinsQuery;

  return (
    <section
      id="coins-list"
      className="py-6 px-4 md:px-7.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {coins?.map((coin) => (
        <CoinCard key={coin.id} id={coin.id} coin={coin} />
      ))}
    </section>
  );
};

export default CoinsList;
