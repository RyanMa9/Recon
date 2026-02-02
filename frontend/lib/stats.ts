import { STAT_FIELDS } from "@/app/constants";

// fighter info interface for personal metrics
export interface Fighter {
  fighter_id: string;
  name: string;
  nickname?: string;
  height?: string;
  reach?: string;
  weight?: string;
  stance?: string;
}

// "adapter" for transforming stats into useable form
export interface FighterStat {
  control_yield_percentile: number;
  defensive_liability_strikes_on_feet_percentile_inverted: number;
  defensive_liability_strikes_on_ground_percentile_inverted: number;
  defensive_liability_takedowns_percentile_inverted: number;
  defensive_recovery_ground_percentile_inverted: number;
  outcome_volatility_percentile: number;
  striking_efficiency_on_feet_percentile: number;
  striking_efficiency_on_ground_percentile: number;
  striking_output_on_feet_per_minute_percentile: number;
  striking_output_on_ground_percentile: number;
  striking_superiority_on_feet_per_minute_percentile: number;
  takedown_aggression_percentile: number;
  takedown_attempt_commitment_percentile: number;
  takedown_efficiency_percentile: number;
}
export interface TransformedStat {
  key: string; // raw field key, for filtering & category matching
  label: string; // human-readable label, for display representing what each stat means
  value: number;
}

export function transformStats(stats: FighterStat[]): TransformedStat[] {
  if (!stats.length)
    // default return on nothing
    return STAT_FIELDS.map((f) => ({ key: f.key, label: f.label, value: 0 }));

  // gets individual stats in useable format
  const s = stats[0];
  return STAT_FIELDS.map((f) => ({
    key: f.key,
    label: f.label,
    value: Math.round(s[f.key] ?? 0),
  }));
}
