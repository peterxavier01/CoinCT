import Link from "next/link";
import { MoveUpRightIcon } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

interface TokenCardListProps {
  data: CoinDetailsData;
}

const TokenCardList = ({ data }: TokenCardListProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 mt-9">
      <TokenCard
        label="Market Cap"
        value={formatCurrency(data.market_data.market_cap.usd)}
      />

      <TokenCard
        label="Volume"
        value={formatCurrency(data.market_data.total_volume.usd)}
      />

      <TokenCard label="Rank" value={data.market_cap_rank} />

      <TokenCard
        label="Website"
        value={
          <Link
            href={data.links.homepage[0]}
            target="_blank"
            className="text-green-500 gap-2 flex items-center"
          >
            Link Website
            <MoveUpRightIcon className="size-4" />
          </Link>
        }
      />

      <TokenCard
        label="Explorer"
        value={
          <Link
            href={data.links.blockchain_site[0]}
            target="_blank"
            className="text-green-500 gap-2 flex items-center"
          >
            Website
            <MoveUpRightIcon className="size-4" />
          </Link>
        }
      />

      <TokenCard
        label="Website"
        value={
          <Link
            href={data.links.subreddit_url ?? ""}
            target="_blank"
            className="text-green-500 gap-2 flex items-center"
          >
            Community
            <MoveUpRightIcon className="size-4" />
          </Link>
        }
      />
    </div>
  );
};

export default TokenCardList;

interface TokenCardProps {
  label: string;
  value: React.ReactNode;
}

const TokenCard = ({ label, value }: TokenCardProps) => {
  return (
    <div className="space-y-1.5 px-6 py-5 rounded-[0.625rem] bg-dark-500">
      <p className="text-base font-medium text-purple-100">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};
