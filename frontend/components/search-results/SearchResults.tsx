"use client";

import Fightercard from "../fighter-card/Fightercard";
import { Fighter } from "@/lib/stats";

interface ResultsProps {
  result: Fighter[];
}

export default function Searchresults({ result }: ResultsProps) {
  // creates cards with the given result data
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 md:px-0">
      {result.map((fighter) => (
        <Fightercard
          key={fighter.fighter_id}
          id={fighter.fighter_id}
          name={fighter.name}
          nickname={fighter.nickname}
          height={fighter.height}
          reach={fighter.reach}
        />
      ))}
    </div>
  );
}
