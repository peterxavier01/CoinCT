"use client";

import DetailsHeader from "./details-header";
import TokenTrendList from "./token-trend-list";
import TokenCardList from "./token-card-list";

import { useCoinById } from "@/hooks/use-coin";
import OrderBook from "./order-book";

interface TokenDetailsViewProps {
  id: string;
}

const TokenDetailsView = ({ id }: TokenDetailsViewProps) => {
  const { data, isLoading } = useCoinById(id);

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section>
        <DetailsHeader data={data} />
        <TokenTrendList data={data} />
        <TokenCardList data={data} />
        <OrderBook data={data} />
      </section>

      <aside></aside>
    </div>
  );
};

export default TokenDetailsView;
