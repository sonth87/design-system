"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@dsui/ui/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "ds:flex ds:items-center ds:gap-2 ds:text-sm ds:font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 ds:peer-disabled:cursor-not-allowed ds:peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Label };
