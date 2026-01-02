"use client";

import { TokensPagination } from "./tokens-pagination";
import TokensTable from "./tokens-table";

import { useCoinsListWithMarketData } from "@/hooks/use-coin";

interface TokenViewProps {
  currentPage: number;
  perPage: number;
}

const TokenView = ({ currentPage, perPage }: TokenViewProps) => {
  const { data } = useCoinsListWithMarketData(currentPage, perPage);

  return (
    <>
      <TokensTable data={data} />

      <TokensPagination
        currentPage={currentPage}
        data={data}
        perPage={perPage}
      />
    </>
  );
};

export default TokenView;
