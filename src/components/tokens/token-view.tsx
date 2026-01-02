"use client";

import { useMemo } from "react";

import { TokensPagination } from "./tokens-pagination";
import TokensTable from "./tokens-table";

import {
  useCoinsListWithMarketData,
  useSearchCoins,
  useMarketDataForCoins,
} from "@/hooks/use-coin";
import { useSearch } from "@/contexts/search-context";

interface TokenViewProps {
  currentPage: number;
  perPage: number;
}

const TokenView = ({ currentPage, perPage }: TokenViewProps) => {
  const { searchQuery } = useSearch();
  const { data: paginatedData } = useCoinsListWithMarketData(
    currentPage,
    perPage
  );
  const { data: searchResponse, isLoading: isSearching } =
    useSearchCoins(searchQuery);
  const searchCoinIds = useMemo(
    () => searchResponse?.coins.map((coin) => coin.id) || [],
    [searchResponse]
  );
  const { data: searchMarketData, isLoading: isLoadingMarketData } =
    useMarketDataForCoins(searchCoinIds);

  const data = useMemo(() => {
    // If there's a search query, use search results with market data
    if (searchQuery.trim()) {
      // If search returned no coins, return empty array immediately
      if (searchResponse && searchResponse.coins.length === 0) {
        return [];
      }
      // If search returned coins but market data is still loading, return empty array
      if (
        searchResponse &&
        searchCoinIds.length > 0 &&
        searchMarketData === undefined
      ) {
        return [];
      }
      // Return market data if available, otherwise empty array
      return searchMarketData || [];
    }
    // Otherwise, use paginated data
    return paginatedData;
  }, [
    searchQuery,
    searchMarketData,
    paginatedData,
    searchResponse,
    searchCoinIds,
  ]);

  const isLoading = searchQuery.trim()
    ? isSearching || (searchCoinIds.length > 0 && isLoadingMarketData)
    : false;

  return (
    <>
      {isLoading ? (
        <div className="text-center py-8 text-purple-100">
          Searching for tokens...
        </div>
      ) : (
        <>
          <TokensTable data={data} />

          {!searchQuery.trim() ? (
            <TokensPagination
              currentPage={currentPage}
              data={data}
              perPage={perPage}
            />
          ) : (
            <div className="text-center py-4 text-purple-100">
              Found {data.length} result{data.length !== 1 ? "s" : ""} for
              &quot;{searchQuery}&quot;
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TokenView;
