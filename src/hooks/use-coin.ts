import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { fetcher } from "@/actions/coin-gecko.actions";

/**
 * Note: useSuspenseQuery should not be used in an aggregated hook
 * because it will cause the hook to hang until all the queries are resolved
 */

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

export const fetchCoinsListWithMarketData = async (
  page: number = 1,
  perPage: number = 10
) => {
  const response = await fetcher<CoinListWithMarketData[]>(`/coins/markets`, {
    vs_currency: "usd",
    per_page: perPage,
    page: page,
  });
  return response;
};

export const searchCoins = async (query: string) => {
  const response = await fetcher<SearchResponse>("/search", {
    query: query,
  });
  return response;
};

export const fetchMarketDataForCoins = async (coinIds: string[]) => {
  if (coinIds.length === 0) return [];

  // CoinGecko API allows fetching multiple coins by IDs
  // Using the markets endpoint with ids parameter
  const ids = coinIds.join(",");
  const response = await fetcher<CoinListWithMarketData[]>(`/coins/markets`, {
    vs_currency: "usd",
    ids: ids,
    price_change_percentage: "24h",
    per_page: 250, // Maximum allowed
  });
  return response;
};

export const useCoinById = (coinId?: string) => {
  return useQuery({
    queryKey: ["coin", coinId],
    queryFn: () =>
      fetcher<CoinDetailsData>(`/coins/${coinId}`, {
        dex_pair_format: "symbol",
      }),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useCoinOhlc = (coinId?: string) => {
  return useQuery({
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
};

export const useCoinsMarkets = () => {
  return useQuery({
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
};

export const useTrendingCoins = () => {
  return useSuspenseQuery({
    queryKey: ["trending-coins"],
    queryFn: fetchTrendingCoins,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

/**
 * Get the coins markets
 * Used for the line chart in the CoinsList component
 */
export const useCoinsMarketChart = (coinId?: string) => {
  return useQuery({
    queryKey: ["coins-market-chart", coinId],
    queryFn: () => fetchCoinsMarkets(coinId ?? ""),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

/**
 * Get the coins list with market data.
 * Used for the tokens table
 */
export const useCoinsListWithMarketData = (page: number, perPage: number) => {
  return useSuspenseQuery({
    queryKey: ["coins-list-with-market-data", page, perPage],
    queryFn: () => fetchCoinsListWithMarketData(page, perPage),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Search for coins using CoinGecko search API
 */
export const useSearchCoins = (query: string) => {
  return useQuery({
    queryKey: ["search-coins", query],
    queryFn: () => searchCoins(query),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Fetch market data for a list of coin IDs
 */
export const useMarketDataForCoins = (coinIds: string[]) => {
  return useQuery({
    queryKey: ["market-data-for-coins", coinIds.sort().join(",")],
    queryFn: () => fetchMarketDataForCoins(coinIds),
    enabled: coinIds.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};
