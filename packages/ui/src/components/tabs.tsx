"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@dsui/ui/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("ds:flex ds:flex-col ds:gap-2", className)}
      {...props}
    />
  );
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        "ds:bg-ink200 ds:text-ink700 ds:inline-flex ds:h-9 ds:w-fit ds:items-center ds:justify-center ds:rounded-lg ds:p-[3px]",
        className
      )}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "ds:data-[state=active]:bg-white ds:dark:data-[state=active]:text-ink800 ds:focus-visible:border-ink500 ds:focus-visible:ring-ink500/50 ds:focus-visible:outline-ink500 ds:dark:data-[state=active]:border-border ds:dark:data-[state=active]:bg-border/30 ds:text-ink800 ds:dark:text-ink700 ds:inline-flex ds:h-[calc(100%-1px)] ds:flex-1 ds:items-center ds:justify-center ds:gap-1.5 ds:rounded-md ds:border ds:border-transparent ds:px-2 ds:py-1 ds:text-sm ds:font-medium ds:whitespace-nowrap ds:transition-[color,box-shadow] ds:focus-visible:ring-[3px] ds:focus-visible:outline-1 ds:disabled:pointer-events-none ds:disabled:opacity-50 ds:data-[state=active]:shadow-sm ds:[&_svg]:pointer-events-none ds:[&_svg]:shrink-0 ds:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("ds:flex-1 ds:outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
