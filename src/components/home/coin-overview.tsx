"use client";

import { Activity, useState } from "react";
import CoinSelector from "./coin-selector";

import { CoinOverviewFallback } from "./fallback";
import ChartHeader from "./chart-header";

import { useCoinById, useCoinOhlc, useCoinsMarkets } from "@/hooks/use-coin";
import CandlestickChart from "../candlestick-chart";

const CoinOverview = () => {
  const [coinId, setCoinId] = useState<string>("bitcoin");

  const { data: coinData } = useCoinById(coinId);
  const { data: coinOHLCData } = useCoinOhlc(coinId);
  const { data: coinsData } = useCoinsMarkets();

  if (!coinData || !coinOHLCData || !coinsData) {
    return <CoinOverviewFallback />;
  }

  const formattedCoins: FormattedCoin[] = coinsData.map((coin) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    image: coin.image,
  }));

  return (
    <section id="coin-overview" className="py-6 px-4 md:px-7.5">
      <div className="flex items-center justify-between mb-7.5">
        <h3 className="text-2xl font-semibold">Chart</h3>

        <Activity mode={Boolean(formattedCoins.length) ? "visible" : "hidden"}>
          <CoinSelector
            coins={formattedCoins}
            setCoinId={setCoinId}
            coinId={coinId}
          />
        </Activity>
      </div>

      <CandlestickChart data={coinOHLCData} coinId={coinId}>
        <ChartHeader key={coinData.id} coin={coinData} />
      </CandlestickChart>
    </section>
  );
};

export default CoinOverview;
