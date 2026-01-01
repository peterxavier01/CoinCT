import { useQuery } from "@tanstack/react-query";

import { fetcher } from "@/actions/coin-gecko.actions";

export const useCoin = (coinId?: string) => {
  const coinQuery = useQuery({
    queryKey: ["coin", coinId],
    queryFn: () =>
      fetcher<CoinDetailsData>(`/coins/${coinId}`, {
        dex_pair_format: "symbol",
      }),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const ohlcQuery = useQuery({
    queryKey: ["coin-ohlc", coinId],
    queryFn: () =>
      fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
        vs_currency: "usd",
        days: 1,
        precision: "full",
      }),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const coinsQuery = useQuery({
    queryKey: ["coins-markets"],
    queryFn: () =>
      fetcher<CoinListData[]>("/coins/markets", {
        vs_currency: "usd",
        symbols: "btc, eth, sol, dot, doge, usdt, usdc, bnb, xrp, ltc",
        price_change_percentage: "24h",
      }),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const trendingCoinsQuery = useQuery({
    queryKey: ["trending-coins"],
    queryFn: () =>
      fetcher<TrendingCoinsResponse>("/search/trending", undefined, 300),
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  /**
   * Get the coins markets
   * Used for the line chart in the CoinsList component
   */
  const coinsMarketsQuery = useQuery({
    queryKey: ["coins-market-chart", coinId],
    queryFn: () =>
      fetcher<CoinListData[]>(`/coins/${coinId}/market_chart`, {
        vs_currency: "usd",
        days: 1,
      }),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: !!coinId,
  });

  return {
    coinQuery,
    ohlcQuery,
    coinsQuery,
    trendingCoinsQuery,
    coinsMarketsQuery,
  };
};
