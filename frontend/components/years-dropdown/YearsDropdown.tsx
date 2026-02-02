import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useState } from "react";

interface YearsDropdownProps {
  setYear: (q: string) => void;
  defaultYear: string;
}

export default function YearsDropdown({
  setYear,
  defaultYear,
}: YearsDropdownProps) {
  const [display, setDisplay] = useState(defaultYear);

  // uses default year = 10, when filter dropdown is changed set a new year
  // using function for button display and change state for main page for results for radar, etc
  return (
    <Select
      value={display}
      onValueChange={(display) => {
        setYear(display);
        setDisplay(display);
      }}
    >
      <SelectTrigger className="w-48 rounded">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectGroup>
        <SelectContent>
          <SelectLabel>Previous X Years:</SelectLabel>
          <SelectItem value="1">Past Year</SelectItem>
          <SelectItem value="2">Past 2 Years</SelectItem>
          <SelectItem value="3">Past 3 Years</SelectItem>
          <SelectItem value="4">Past 4 Years</SelectItem>
          <SelectItem value="5">Past 5 Years</SelectItem>
          <SelectItem value="6">Past 6 Years</SelectItem>
          <SelectItem value="7">Past 7 Years</SelectItem>
          <SelectItem value="8">Past 8 Years</SelectItem>
          <SelectItem value="9">Past 9 Years</SelectItem>
          <SelectItem value="10">Past 10 Years</SelectItem>
          <SelectItem value="15">Past 15 Years</SelectItem>
          <SelectItem value="20">Past 20 Years</SelectItem>
          <SelectItem value="25">Past 25 Years</SelectItem>
          <SelectItem value="30">Past 30 Years</SelectItem>
        </SelectContent>
      </SelectGroup>
    </Select>
  );
}
