import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";

import CoinImage from "../coin-image";

import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

interface CoinCardProps {
  id: string;
  coin: CoinListData;
}

const CoinCard = ({ coin }: CoinCardProps) => {
  const isTrendingUp = coin.price_change_percentage_24h > 0;
  const isTrendingDown = coin.price_change_percentage_24h < 0;

  return (
    <Link href={`/coins/${coin.id}`} id="coin-card">
      <div className="flex items-center gap-2.5">
        <CoinImage
          item={{ large: coin.image, name: coin.name, symbol: coin.symbol }}
          className="text-sm"
        />
      </div>

      {/** TODO: Add LineSeries Chart */}

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
