import Image from "next/image";

import { cn } from "@/lib/utils";

interface CoinImageProps<
  T extends { large: string; name: string; symbol: string }
> {
  item: T;
  className?: string;
}

const CoinImage = <T extends { large: string; name: string; symbol: string }>({
  item,
  className,
}: CoinImageProps<T>) => {
  return (
    <>
      <Image src={item.large} alt={item.name} width={48} height={48} />
      <div>
        <p>{item.name}</p>
        <p
          className={cn(
            "text-sm text-purple-100 font-medium uppercase",
            className
          )}
        >
          {item.symbol}
        </p>
      </div>
    </>
  );
};

export default CoinImage;
