import { FighterStat } from "@/lib/stats";
export const DEFAULT_YEARS = "10"; // default years for years dropdown that's reasonable

// storing intended label and description of stats to be used later
export const STAT_FIELDS: {
  key: keyof FighterStat;
  label: string;
  description: string;
}[] = [
  {
    key: "control_yield_percentile",
    label: "Control Yield",
    description: "Wrestling Dominance: Fighter Control Time / Round Minutes",
  },
  {
    key: "defensive_liability_strikes_on_feet_percentile_inverted",
    label: "Defense for Strikes Feet",
    description:
      "Elusiveness on Feet: Lowest Opponent Strikes on Feet / Round Minutes",
  },
  {
    key: "defensive_liability_strikes_on_ground_percentile_inverted",
    label: "Defense for Strikes Ground",
    description:
      "Elusiveness on Ground: Lowest Opponent Strikes on Ground  / Round Minutes",
  },
  {
    key: "defensive_liability_takedowns_percentile_inverted",
    label: "Defense for Takedowns",
    description:
      "Elusiveness with takedowns: Lowest Opponent Takedowns  / Round Minutes",
  },
  {
    key: "defensive_recovery_ground_percentile_inverted",
    label: "Ground Recovery",
    description:
      "Recovery from Ground: Lowest Opponent Control Time  / Round Minutes",
  },
  {
    key: "outcome_volatility_percentile",
    label: "Outcome Volatility",
    description:
      "KOs chance: Outcome without decision by judges / Round Minutes",
  },
  {
    key: "striking_efficiency_on_feet_percentile",
    label: "Striking Efficiency Feet",
    description:
      "Standing Striking Accuracy: Standing Significant Strikes landed / Standing Significant Strikes thrown",
  },
  {
    key: "striking_efficiency_on_ground_percentile",
    label: "Striking Efficiency Ground",
    description:
      "Ground Striking Accuracy: Ground Significant Strikes landed / Ground Strikes on Feet thrown",
  },
  {
    key: "striking_output_on_feet_per_minute_percentile",
    label: "Striking Output Feet",
    description:
      "Standing Striking Volume: Standing Significant Strikes landed / Round Minutes",
  },
  {
    key: "striking_output_on_ground_percentile",
    label: "Striking Output Ground",
    description:
      "Ground Striking Volume: Ground Significant Strikes landed / Round Minutes",
  },
  {
    key: "striking_superiority_on_feet_per_minute_percentile",
    label: "Striking Superiority Feet",
    description: "Standing Significant Strikes landed",
  },
  {
    key: "takedown_aggression_percentile",
    label: "Submission Agression",
    description: "Agression on Ground: Submissions / Round Minutes",
  },
  {
    key: "takedown_attempt_commitment_percentile",
    label: "Takedown Commitment",
    description: "Takedown Aggression: Takedowns Attempted / Round Minutes",
  },
  {
    key: "takedown_efficiency_percentile",
    label: "Takedown Efficiency",
    description: "Takedown Accuracy: Takedowns Attempted / Takedowns Landed",
  },
];

// used for categorizing and filtering stats into groups
export const STAT_CATEGORIES = [
  {
    title: "Striking",
    keys: [
      "striking_output_on_feet_per_minute_percentile",
      "striking_efficiency_on_feet_percentile",
      "striking_superiority_on_feet_per_minute_percentile",
    ],
    img: "/striking.png",
  },
  {
    title: "Wrestling",
    keys: [
      "takedown_aggression_percentile",
      "takedown_attempt_commitment_percentile",
      "takedown_efficiency_percentile",
      "control_yield_percentile",
      "striking_output_on_ground_percentile",
      "striking_efficiency_on_ground_percentile",
    ],
    img: "/wrestling.png",
  },
  {
    title: "Defense",
    keys: [
      "defensive_liability_strikes_on_feet_percentile_inverted",
      "defensive_liability_takedowns_percentile_inverted",
      "defensive_liability_strikes_on_ground_percentile_inverted",
      "defensive_recovery_ground_percentile_inverted",
    ],
    img: "/defense.png",
  },
  {
    title: "Outcome Volatility",
    keys: ["outcome_volatility_percentile"],
    img: "/outvol.png",
  },
];
