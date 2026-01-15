import Image from "next/image";
import { MoveDownRightIcon, MoveUpRightIcon } from "lucide-react";

import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

interface DetailsHeaderProps {
  data: CoinDetailsData;
}

const DetailsHeader = ({ data }: DetailsHeaderProps) => {
  const isPriceUp =
    data.market_data.price_change_percentage_24h_in_currency.usd > 0;

  return (
    <div className="space-y-1 sm:space-y-4">
      <h1 className="text-2xl sm:text-3xl font-medium">{data.name}</h1>

      <div className="flex items-center gap-5">
        <Image
          src={data.image.large}
          alt={data.name}
          width={77}
          height={77}
          className="rounded-full size-14 sm:size-20"
        />
        <p className="text-[2.5rem] sm:text-[4rem] font-semibold">
          {formatCurrency(data.market_data.current_price.usd)}
        </p>
        <div
          className={cn(
            "px-3 py-1.5 rounded-[2rem] text-sm font-medium flex items-center gap-1",
            isPriceUp
              ? "text-green-400 bg-green-400/20"
              : "text-red-400 bg-red-400/20"
          )}
        >
          {formatPercentage(
            data.market_data.price_change_percentage_24h_in_currency.usd
          )}
          {isPriceUp ? (
            <MoveUpRightIcon className="size-3" />
          ) : (
            <MoveDownRightIcon className="size-3" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
