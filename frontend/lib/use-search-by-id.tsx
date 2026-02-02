import { getFighterMetrics } from "@/app/services/fighterservice";
import { useEffect, useState } from "react";
import { Fighter } from "./stats";

// searching given a fighter_id, returning fighter with personal metrics data, and specifically name and nickname
export default function useSearchById(fighter_id: string) {
  const [fighter, setFighter] = useState<Fighter>();

  useEffect(() => {
    if (typeof fighter_id !== "string") return;

    async function fetchFighter() {
      try {
        const data = await getFighterMetrics(fighter_id as string);
        setFighter(data?.[0] ?? null); // take the first fighter or null
      } catch (err) {
        console.error("Failed to fetch fighter metrics:", err);
      }
    }

    fetchFighter();
  }, [fighter_id]); // runs only once per fighter_id

  const name = fighter?.name ?? "";
  const nickname = fighter?.nickname ?? name;

  return { fighter, name, nickname };
}
