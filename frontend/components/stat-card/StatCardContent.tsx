import PercentileBar from "../bar/PercentileBar";
import { TransformedStat } from "@/lib/stats";
import { STAT_CATEGORIES, STAT_FIELDS } from "@/app/constants";
import { Label } from "../ui/label";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

interface StatCardContentProps {
  transformedStats: TransformedStat[];
  categoryTitle: string; // e.g. "Striking"
  color: string;
}

export default function StatCardContent({
  transformedStats,
  categoryTitle,
  color,
}: StatCardContentProps) {
  // find the right category or check if it even exists
  const category = STAT_CATEGORIES.find((c) => c.title === categoryTitle);
  if (!category) return null;

  // get stats and transform to have description as well
  const statsForCategory = transformedStats
    .filter((stat) => category.keys.includes(stat.key))
    .map((stat) => {
      const meta = STAT_FIELDS.find((f) => f.key === stat.key);
      return {
        ...stat,
        description: meta?.description ?? "",
      };
    });

  return (
    <div className="flex flex-col gap-5">
      {statsForCategory.map((stat) => (
        <div key={stat.label} className="flex flex-col ">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Label className="text-xs font-medium">{`${stat.label} : ${stat.value}th Percentile`}</Label>
            </HoverCardTrigger>
            <HoverCardContent className="flex w-64 flex-col gap-0.5 rounded">
              <div>{stat.description}</div>
            </HoverCardContent>
          </HoverCard>
          <PercentileBar key={stat.key} value={stat.value} color={color} />
        </div>
      ))}
    </div>
  );
}
