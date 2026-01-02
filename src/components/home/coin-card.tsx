"use client";

import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Time } from "lightweight-charts";

import CoinImage from "../coin-image";
import LineSeriesChart from "../line-series-chart";

import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { useCoinsMarketChart } from "@/hooks/use-coin";

interface CoinCardProps {
  id: string;
  coin: CoinListData;
}

const CoinCard = ({ id, coin }: CoinCardProps) => {
  const { data: coinsMarketChartData } = useCoinsMarketChart(id);
  const isTrendingUp = coin.price_change_percentage_24h > 0;
  const isTrendingDown = coin.price_change_percentage_24h < 0;

  // Transform the market chart data to the format expected by LineSeriesChart
  // CoinGecko returns timestamps in milliseconds, lightweight-charts expects seconds
  const chartData =
    coinsMarketChartData?.prices?.map((price) => ({
      value: price[1],
      time: (price[0] / 1000) as Time,
    })) || [];

  return (
    <Link href={`/coins/${coin.id}`} id="coin-card">
      <div className="flex items-center gap-2.5">
        <CoinImage
          item={{ large: coin.image, name: coin.name, symbol: coin.symbol }}
          className="text-sm"
        />
      </div>

      {chartData.length > 0 && (
        <LineSeriesChart
          data={chartData}
          height={100}
          lineColor={isTrendingUp ? "#2ebe7b" : "#da5c54"}
        />
      )}

      <div className="flex flex-row justify-between items-center mt-4">
        <p className="text-xl font-medium">
          {formatCurrency(coin.current_price)}
        </p>

        <div
          className={cn(
            "flex flex-row items-center gap-1 rounded-[2rem] px-3 py-1.5",
            isTrendingUp
              ? "bg-green-400/20 text-green-400"
              : "bg-red-400/20 text-red-400"
          )}
        >
          <p className="text-sm">
            {formatPercentage(coin.price_change_percentage_24h)}
          </p>
          {isTrendingUp && <TrendingUp className="size-2.5 shrink-0" />}
          {isTrendingDown && <TrendingDown className="size-2.5 shrink-0" />}
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
