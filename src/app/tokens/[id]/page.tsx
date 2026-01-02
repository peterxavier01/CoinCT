import { use } from "react";

interface CoinDetailsPageProps extends NextPageProps {
  params: Promise<{ id: string }>;
}

export default function CoinDetailsPage({ params }: CoinDetailsPageProps) {
  const { id } = use(params);

  return <div>CoinDetailsPage {id}</div>;
}
