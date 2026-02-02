"use client";

import { useEffect } from "react";
import { searchFighter } from "@/app/services/fighterservice";
import { Input } from "../ui/input";
import { Fighter } from "@/lib/stats";

interface SearchbarProps {
  query: string;
  setQuery: (q: string) => void;
  setResult: (q: Fighter[]) => void;
}

export default function Searchbar({
  query,
  setQuery,
  setResult,
}: SearchbarProps) {
  useEffect(() => {
    // query is empty, clear results and do nothing
    if (!query) {
      setResult([]);
      return;
    }

    // search update result, timeout to debounce
    const handler = setTimeout(async () => {
      try {
        const data = await searchFighter(query);
        setResult(data);
      } catch (err) {
        console.error(err);
        setResult([]);
      }
    }, 200);

    // clear previous timeout if query changes before 200ms
    return () => clearTimeout(handler);
  }, [query, setResult]);

  return (
    <Input
      className="bg-input text-foreground placeholder:text-muted-foreground rounded-full"
      placeholder="Search Fighters"
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
