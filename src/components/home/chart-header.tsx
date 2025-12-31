import Image from "next/image";

import { formatCurrency } from "@/lib/utils";

interface ChartHeaderProps {
  coin: CoinDetailsData;
}

const ChartHeader = ({ coin }: ChartHeaderProps) => {
  return (
    <div className="header">
      <div>
        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
      </div>
      <div className="info gap-1">
        <h1>
          <span>{coin.name}</span>/
          <span className="uppercase">{coin.symbol}</span>
        </h1>
        <p>{formatCurrency(coin.market_data.current_price.usd)}</p>
      </div>
    </div>
  );
};

export default ChartHeader;
