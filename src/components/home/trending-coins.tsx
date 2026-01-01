"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";

import { TrendingCoinsFallback } from "./fallback";
import DataTable from "../data-table";
import CoinImage from "../coin-image";

import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { useCoin } from "@/hooks/use-coin";

const TrendingCoins = () => {
  const { trendingCoinsQuery } = useCoin();
  const { data: trendingCoins } = trendingCoinsQuery;

  if (!trendingCoins) {
    return <TrendingCoinsFallback />;
  }

  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: (coin) => {
        const item = coin.item;

        return (
          <Link
            href={`/coins/${item.id}`}
            className="flex items-center gap-2.5"
          >
            <CoinImage item={item} />
          </Link>
        );
      },
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: (coin) => {
        const item = coin.item;
        const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

        return (
          <div
            className={cn(
              "price-change",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            <p className="flex items-center gap-1">
              {formatPercentage(item.data.price_change_percentage_24h.usd)}
              {isTrendingUp ? (
                <TrendingUp width={16} height={16} />
              ) : (
                <TrendingDown width={16} height={16} />
              )}
            </p>
          </div>
        );
      },
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.item.data.price),
    },
  ];

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>

      <DataTable
        data={trendingCoins.coins?.slice(0, 6)}
        columns={columns}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3! hidden"
        bodyCellClassName="py-2! border-none"
      />
    </div>
  );
};

export default TrendingCoins;
