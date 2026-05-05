"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@dsui/ui/lib/utils";

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("ds:relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="ds:size-full ds:rounded-[inherit] ds:transition-[color,box-shadow] ds:outline-none ds:focus-visible:ring-[3px] ds:focus-visible:outline-1 ds:focus-visible:ring-ring/50 ds:[scrollbar-width:thin] ds:[scrollbar-color:transparent_transparent] ds:hover:[scrollbar-color:hsl(var(--border))_transparent] ds:[&::-webkit-scrollbar]:w-2 ds:[&::-webkit-scrollbar]:h-2 ds:[&::-webkit-scrollbar-track]:bg-transparent ds:[&::-webkit-scrollbar-thumb]:bg-transparent ds:[&::-webkit-scrollbar-thumb]:rounded ds:hover:[&::-webkit-scrollbar-thumb]:bg-border"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "ds:flex ds:touch-none ds:p-px ds:transition-colors ds:select-none",
        orientation === "vertical" &&
          "ds:h-full ds:w-2.5 ds:border-l ds:border-l-transparent",
        orientation === "horizontal" &&
          "ds:h-2.5 ds:flex-col ds:border-t ds:border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="ds:bg-border ds:relative ds:flex-1 ds:rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
