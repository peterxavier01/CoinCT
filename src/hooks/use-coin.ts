import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { fetcher } from "@/actions/coin-gecko.actions";

export const fetchTrendingCoins = async () => {
  const response = await fetcher<TrendingCoinsResponse>(
    "/search/trending",
    undefined,
    300
  );
  return response;
};

export const fetchCoinsList = async () => {
  const response = await fetcher<CoinListData[]>("/coins/markets", {
    vs_currency: "usd",
    symbols: "btc, eth, sol, dot, doge, usdt, usdc, bnb, xrp, ltc",
    price_change_percentage: "24h",
  });
  return response;
};

export const fetchCoinsMarkets = async (coinId: string) => {
  const response = await fetcher<CoinMarketChartData>(
    `/coins/${coinId}/market_chart`,
    {
      vs_currency: "usd",
      days: 1,
    }
  );
  return response;
};

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

  const trendingCoinsQuery = useSuspenseQuery({
    queryKey: ["trending-coins"],
    queryFn: fetchTrendingCoins,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  /**
   * Get the coins markets
   * Used for the line chart in the CoinsList component
   */
  const coinsMarketsQuery = useQuery({
    queryKey: ["coins-market-chart", coinId],
    queryFn: () => fetchCoinsMarkets(coinId ?? ""),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    coinQuery,
    ohlcQuery,
    coinsQuery,
    trendingCoinsQuery,
    coinsMarketsQuery,
  };
};
