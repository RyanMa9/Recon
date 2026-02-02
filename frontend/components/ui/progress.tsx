"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  color?: string; // Tailwind class for the indicator
}

function Progress({ className, value, color, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-muted h-5 rounded-full relative flex w-full items-center overflow-x-hidden",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`${color} size-full flex-1 transition-all`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
