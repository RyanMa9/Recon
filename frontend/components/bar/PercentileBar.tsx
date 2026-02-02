import { Progress } from "../ui/progress";

interface PercentileBarProps {
  value: number;
  color: string;
}

export default function PercentileBar({ value, color }: PercentileBarProps) {
  return <Progress value={value} color={color}></Progress>;
}
