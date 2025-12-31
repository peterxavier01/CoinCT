import CoinSelector from "./coin-selector";

import { CoinOverviewFallback } from "./fallback";
import ChartHeader from "./chart-header";

import { fetcher } from "@/actions/coin-gecko.actions";

const CoinOverview = async () => {
  const [coin, coinOHLCData] = await Promise.all([
    fetcher<CoinDetailsData>("/coins/bitcoin", {
      dex_pair_format: "symbol",
    }),
    fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
      vs_currency: "usd",
      days: 1,
      // interval is not supported in the demo API
      //   interval: "hourly",
      precision: "full",
    }),
  ]);

  if (!coin || !coinOHLCData) {
    return <CoinOverviewFallback />;
  }

  return (
    <section id="coin-overview" className="py-6 px-7.5">
      <div className="flex items-center justify-between mb-7.5">
        <h3 className="text-2xl font-semibold">Chart</h3>
        <CoinSelector />
      </div>
      <ChartHeader key={coin.id} coin={coin} />
    </section>
  );
};

export default CoinOverview;
