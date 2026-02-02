"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "@/components/navbar/Navbar";
import DivisionDropDown from "@/components/division-dropdown/DivisionDropdown";
import YearsDropdown from "@/components/years-dropdown/YearsDropdown";
import StatRadarChart from "@/components/stat-chart/Radarstats";
import StatCardContent from "@/components/stat-card/StatCardContent";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getFighterStats } from "@/app/services/fighterservice";
import { DEFAULT_YEARS, STAT_CATEGORIES } from "@/app/constants";
import { FighterStat, transformStats, TransformedStat } from "@/lib/stats";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import useSearchById from "@/lib/use-search-by-id";

export default function FighterPage() {
  // states necessary for filtering a fighter's stats according to user input
  const [division, setDivision] = useState("");
  const [years, setYears] = useState(DEFAULT_YEARS);
  const [fighterStatsResults, setFighterstatsResults] = useState<FighterStat[]>(
    []
  );
  const [transformedStats, setTransformedStats] = useState<TransformedStat[]>(
    []
  );

  // get the static params from url
  const params = useParams();
  const fighter_id = params.id;

  // find nickname and name using helper function
  const { name, nickname } = useSearchById(fighter_id as string);

  // fetch stats when change in division or years filter dropdowns
  useEffect(() => {
    if (typeof fighter_id !== "string") return;

    async function fetchStats() {
      try {
        const stats = await getFighterStats(
          fighter_id as string,
          division,
          years
        );
        setFighterstatsResults(stats ?? []);
        setTransformedStats(transformStats(stats ?? []));
      } catch (err) {
        console.error(err);
      }
    }

    fetchStats();
  }, [fighter_id, division, years]);

  // needed because of imbalance in number of stats for each category, must do it manually to maintain good looking design
  const outcomeVolatility = STAT_CATEGORIES[3];
  const otherStats = STAT_CATEGORIES.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-gray-200">
      <Navbar />
      {/*left section: radar chart*/}
      <main className="max-w-7xl mx-auto px-6 pt-15 pb-12 flex flex-col gap-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 flex flex-col gap-4">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-300">
              Skill Tree
            </h2>
            <StatRadarChart stats={transformedStats} />
          </div>

          {/* Right section: fighter info*/}
          <Card className="bg-background ring-0 p-8 flex flex-col gap-5">
            <CardContent>
              <div className="flex flex-col items-center gap-0.5 mt-25">
                <Avatar className="w-25 h-25">
                  <AvatarImage src="/figure.png" />
                </Avatar>
                <div className="text-lg font-bold">{name}</div>
                <div className="text-sm italic text-muted-foreground">
                  {nickname}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-3">
              <DivisionDropDown
                fighter_id={fighter_id as string}
                setDivision={setDivision}
              />
              <YearsDropdown setYear={setYears} defaultYear={DEFAULT_YEARS} />
            </CardFooter>
          </Card>
        </section>
        <Separator orientation="horizontal" className="h-30"></Separator>

        <section>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-300 mb-6">
            Stats Analyzed
          </h2>

          {/* Three Cards: Balanced ones */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {otherStats.map((category, index) => (
              <Card
                key={category.title}
                className="rounded border-t-2 p-5 hover:brightness-110 transition-colors"
                style={{
                  borderTopColor:
                    index === 0
                      ? "#3b82f6"
                      : index === 1
                      ? "#22c55e"
                      : "#ef4444",
                }}
              >
                <CardHeader>
                  <CardTitle>
                    <h1 className="flex items-center gap-2 text-xl font-black">
                      {category.img && (
                        <Avatar className="flex-shrink-0 w-15 h-30">
                          <AvatarImage src={category.img} />
                        </Avatar>
                      )}
                      {category.title}
                    </h1>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StatCardContent
                    transformedStats={transformedStats}
                    categoryTitle={category.title}
                    color={
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                        ? "bg-green-500"
                        : "bg-red-500"
                    }
                  />
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Wide card for outcome vol - less important, at the bottom */}
          <Card className="bg-card rounded border-t-2 border-purple-500 p-6 hover:brightness-110 transition-colors">
            <CardHeader>
              <h1 className="flex items-center gap-2 text-xl font-black">
                {
                  <Avatar className="w-15 h-30">
                    <AvatarImage src={"/outvol.png"} />
                  </Avatar>
                }
                {outcomeVolatility.title}
              </h1>
            </CardHeader>
            <CardContent>
              <StatCardContent
                transformedStats={transformedStats}
                categoryTitle={outcomeVolatility.title}
                color="bg-purple-500"
              />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
