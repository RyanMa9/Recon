"use client";

import { useState } from "react";
import Searchbar from "@/components/searchbar/SearchBar";
import Navbar from "@/components/navbar/Navbar";
import Searchresults from "@/components/search-results/SearchResults";
import { Fighter } from "@/lib/stats";

export default function Searchpage() {
  // state for query and state for result, give result to search results to create display results,
  // give both to query to change displayed text/results when user types in something
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Fighter[]>([]);

  return (
    <div className="dark: min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mt-7 my-3 text-lg font-bold">Fighter Search For </h2>
        <div className="flex justify-center mb-8 w-full max-w-[calc(100%-2.3rem)]">
          <Searchbar query={query} setQuery={setQuery} setResult={setResult} />
        </div>

        <div className="w-full">
          <Searchresults result={result} />
        </div>
      </div>
    </div>
  );
}
