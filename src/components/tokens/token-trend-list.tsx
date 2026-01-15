import { MoveDownRightIcon, MoveUpRightIcon } from "lucide-react";

import { cn, formatCurrency } from "@/lib/utils";

interface TokenTrendListProps {
  data: CoinDetailsData;
}

const TokenTrendList = ({ data }: TokenTrendListProps) => {
  return (
    <div className="flex items-center gap-4 mt-9">
      <TokenTrend
        trendValue={
          data.market_data.price_change_percentage_24h_in_currency.usd
        }
        trendLabel="Today"
        isPriceUp={
          data.market_data.price_change_percentage_24h_in_currency.usd > 0
        }
      />

      <span className="w-0.5 bg-purple-600 self-stretch" />

      <div>
        <TokenTrend
          trendValue={
            data.market_data.price_change_percentage_30d_in_currency.usd
          }
          trendLabel="30 Days"
          isPriceUp={
            data.market_data.price_change_percentage_30d_in_currency.usd > 0
          }
        />
      </div>

      <span className="w-0.5 bg-purple-600 self-stretch" />

      <div>
        <p className="text-sm font-medium text-purple-100">Market Cap Rank</p>
        <div className="flex items-center gap-2 mt-1.5">
          <p className="text-lg font-medium">{data.market_cap_rank}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenTrendList;

interface TokenTrendProps {
  trendValue: number;
  isPriceUp: boolean;
  trendLabel: string;
}
const TokenTrend = ({ trendValue, trendLabel, isPriceUp }: TokenTrendProps) => {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-purple-100">{trendLabel}</p>
      <div
        className={cn(
          "flex items-center gap-2",
          isPriceUp ? "text-green-400" : "text-red-400"
        )}
      >
        <p>{formatCurrency(trendValue)}</p>
        {isPriceUp ? (
          <MoveUpRightIcon className="size-3" />
        ) : (
          <MoveDownRightIcon className="size-3" />
        )}
      </div>
    </div>
  );
};
