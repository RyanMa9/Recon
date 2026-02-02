"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { TransformedStat } from "@/lib/stats";

interface StatChartProps {
  stats: TransformedStat[];
}

// returns a radar chart based on given stats format
export default function StatRadarChart({ stats }: StatChartProps) {
  return (
    <div style={{ height: "50vh" }}>
      <ResponsiveContainer width="100%" height={"100%"}>
        <RadarChart data={stats}>
          <PolarGrid />
          <PolarAngleAxis dataKey="label" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: "white" }}
            itemStyle={{ color: "coral" }}
            labelStyle={{ color: "coral" }}
          />
          <Radar
            name="Percentile"
            dataKey="value"
            stroke="coral"
            fill="coral"
            fillOpacity={0.6}
            dot={true}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
