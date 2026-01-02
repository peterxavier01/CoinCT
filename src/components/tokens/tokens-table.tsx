"use client";

import Image from "next/image";
import Link from "next/link";

import DataTable from "../data-table";

import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

interface TokensTableProps {
  data: CoinListWithMarketData[];
}

const TokensTable = ({ data }: TokensTableProps) => {
  const columns: DataTableColumn<CoinListWithMarketData>[] = [
    {
      header: "Rank",
      cellClassName: "w-max",
      cell: (token) => (
        <>
          #{token.market_cap_rank}
          <Link href={`/tokens/${token.id}`} aria-label="View token" />
        </>
      ),
    },
    {
      header: "Token",
      cell: (token) => (
        <div className="flex items-center gap-3">
          <Image src={token.image} alt={token.name} width={36} height={36} />

          <p className="text-lg font-semibold">
            {token.name} ({token.symbol.toUpperCase()})
          </p>
        </div>
      ),
    },
    {
      header: "Price",
      cell: (coin) => (
        <p className="text-lg font-semibold">
          {formatCurrency(coin.current_price)}
        </p>
      ),
    },
    {
      header: "24hr Change",
      cell: (coin) => {
        const isTrendingUp = coin.price_change_percentage_24h > 0;

        return (
          <div
            className={cn(
              "text-lg font-medium",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            <p className="flex items-center gap-1">
              {formatPercentage(coin.price_change_percentage_24h)}
            </p>
          </div>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (coin) => (
        <p className="text-lg font-semibold">
          {formatCurrency(coin.market_cap)}
        </p>
      ),
    },
  ];

  return (
    <div className="rounded-[0.625rem] overflow-hidden border border-purple-600 mb-10">
      <DataTable
        columns={columns}
        data={data}
        rowKey={(coin) => coin.id}
        headerCellClassName="py-3! border border-purple-600 px-6!"
        bodyCellClassName="py-2! bg-dark-500 py-6! px-7.5! border border-purple-600 hover:bg-dark-400/80"
      />
    </div>
  );
};

export default TokensTable;
