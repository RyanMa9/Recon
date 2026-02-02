import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";

interface FighterCardProp {
  id: string;
  name: string;
  nickname?: string;
  height?: string;
  reach?: string;
}

export default function Fightercard({
  id,
  name,
  nickname,
  height,
  reach,
}: FighterCardProp) {
  // styles and creates cards with given stats
  return (
    <a href={`/fighters/${id}`}>
      <Card
        className="w-64 flex flex-col items-center text-center p-4 gap-3
             border-b-2 border-transparent hover:border-b-[#d7172e] transition-all cursor-pointer rounded"
      >
        <CardContent className="flex flex-col items-center gap-2">
          <Avatar className="w-15 h-15">
            <AvatarImage
              src="/figure.png"
              className="object-cover rounded-full"
            />
          </Avatar>

          <div className="text-sm font-semibold leading-tight">{name}</div>
          <div className="text-xs text-muted-foreground italic">
            {!nickname ? name : nickname}
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-between mt-2 px-1">
          {/* Height */}
          <div className="flex flex-col items-start text-xs">
            <span className="font-semibold">Height</span>
            <span className="text-muted-foreground">
              {" "}
              {height != null ? `${height} ″` : "-"}
            </span>
          </div>

          {/* Reach */}
          <div className="flex flex-col items-end text-xs">
            <span className="font-semibold ">Reach</span>
            <span className="text-muted-foreground">
              {" "}
              {reach != null ? `${reach} ″` : "-"}
            </span>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
}
