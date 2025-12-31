import Image from "next/image";

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";

const CoinSelector = () => {
  return (
    <Select defaultValue="usd">
      <SelectTrigger className="w-[100px] rounded-sm">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value="usd">
            <Image src="/usd.svg" alt="USD" width={15} height={15} />
            <span>USD</span>
          </SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CoinSelector;
