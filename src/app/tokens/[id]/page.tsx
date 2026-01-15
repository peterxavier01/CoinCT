import TokenDetailsView from "@/components/tokens/token-details-view";
import { use } from "react";

interface CoinDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function CoinDetailsPage({ params }: CoinDetailsPageProps) {
  const { id } = use(params);

  return (
    <main className="main-container">
      <TokenDetailsView id={id} />
    </main>
  );
}
