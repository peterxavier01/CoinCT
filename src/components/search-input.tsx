"use client";

import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";

import { Input } from "./ui/input";

import { useSearch } from "@/contexts/search-context";
import { useDebounce } from "@/hooks/use-debounce";

const SearchInput = () => {
  const { setSearchQuery } = useSearch();
  const [localValue, setLocalValue] = useState("");
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  return (
    <div className="flex max-w-full sm:max-w-100 w-full  items-center gap-0 bg-dark-400 rounded-[0.5rem] px-3.5 focus-within:ring-2 focus-within:ring-purple-100 min-h-13 ">
      <SearchIcon className="size-5 text-purple-100" />
      <Input
        type="text"
        placeholder="Search for tokens"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="bg-transparent! border-none shadow-none outline-none focus-visible:ring-0 text-white placeholder:text-purple-100"
      />
    </div>
  );
};

export default SearchInput;
