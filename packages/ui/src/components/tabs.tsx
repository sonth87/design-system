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
        "ds:bg-muted ds:text-muted-foreground ds:inline-flex ds:h-9 ds:w-fit ds:items-center ds:justify-center ds:rounded-lg p-[3px]",
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
      className={cn("data-[state=active]:bg-background dark:data-[state=active]:text-foreground ds:focus-visible:border-ring ds:focus-visible:ring-ring/50 ds:focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 ds:text-foreground ds:dark:text-muted-foreground ds:inline-flex h-[calc(100%-1px)] ds:flex-1 ds:items-center ds:justify-center ds:gap-1.5 ds:rounded-md ds:border ds:border-transparent ds:px-2 ds:py-1 ds:text-sm ds:font-medium ds:whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] ds:focus-visible:outline-1 ds:disabled:pointer-events-none ds:disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
