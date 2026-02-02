import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { getFighterDivisions } from "@/app/services/fighterservice";
import { useEffect, useState } from "react";

interface Division {
  division: string;
}

interface DivisionDropDownProps {
  fighter_id: string;
  setDivision: (q: string) => void;
}

// takes in a fighter_id and a function to set the division to be queried
export default function DivisionDropdown({
  fighter_id,
  setDivision,
}: DivisionDropDownProps) {
  const [divisions, setUseDivisions] = useState<Division[]>([]);
  const [selectedDivision, setSelectedDivision] = useState("");

  // since fighters have different divisions, can't just pick random one or invalid
  // instead set default division by picking first one on mount that's valid
  useEffect(() => {
    const fetchDivisions = async () => {
      const data = await getFighterDivisions(fighter_id);
      setUseDivisions(data);

      if (data.length > 0) {
        setSelectedDivision(data[0].division);
        setDivision(data[0].division);
      }
    };

    fetchDivisions();
  }, [fighter_id, setDivision]);

  // when the select has a value change, change the displayed division and set state division from main page
  // to get results for page
  return (
    <Select
      value={selectedDivision ?? ""}
      onValueChange={(value) => {
        setSelectedDivision(value);
        setDivision(value);
      }}
      disabled={!divisions.length} // disable if no divisions
    >
      <SelectTrigger className="w-48 rounded">
        <SelectValue
          placeholder={divisions.length ? "Select Division" : "No divisions"}
        />
      </SelectTrigger>

      {divisions.length > 0 && (
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Divisions:</SelectLabel>
            {divisions.map((divObj) => (
              <SelectItem
                className="rounded-full"
                key={divObj.division}
                value={divObj.division}
              >
                {divObj.division}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      )}
    </Select>
  );
}
