import Image from "next/image";

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";

interface CoinSelectorProps {
  coins: FormattedCoin[];
  coinId: string;
  setCoinId: (coinId: string) => void;
}

const CoinSelector = ({ coins, coinId, setCoinId }: CoinSelectorProps) => {
  return (
    <Select value={coinId} onValueChange={setCoinId}>
      <SelectTrigger className="w-[110px] rounded-[0.5rem] dark:bg-dark-400">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {coins.map((coin) => (
            <SelectItem key={coin.id} value={coin.id}>
              <Image
                src={coin.image}
                alt={coin.symbol}
                width={15}
                height={15}
              />
              <span className="uppercase text-sm">{coin.symbol}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CoinSelector;
