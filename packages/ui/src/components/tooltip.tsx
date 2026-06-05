"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@dsui/ui/lib/utils";

type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
> & {
  delayDuration?: number;
};

function TooltipProvider({
  delayDuration = 0,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

function Tooltip({ ...props }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>;

function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

type TooltipContentProps = Omit<
  React.ComponentProps<typeof TooltipPrimitive.Content>,
  "content"
> & {
  sideOffset?: number;
  content?: React.ReactNode;
};

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  content,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "ds:bg-foreground ds:text-background ds:animate-in ds:fade-in-0 ds:zoom-in-95 ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=closed]:zoom-out-95 ds:data-[side=bottom]:slide-in-from-top-2 ds:data-[side=left]:slide-in-from-right-2 ds:data-[side=right]:slide-in-from-left-2 ds:data-[side=top]:slide-in-from-bottom-2 ds:z-50 ds:w-fit ds:origin-(--radix-tooltip-content-transform-origin) ds:rounded-md ds:px-3 ds:py-1.5 ds:text-xs ds:text-balance",
          className
        )}
        {...props}
      >
        {content ?? children}
        <TooltipPrimitive.Arrow className="ds:bg-foreground ds:fill-foreground ds:z-50 ds:size-2.5 ds:translate-y-[calc(-50%_-_2px)] ds:rotate-45 ds:rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
export type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipProviderProps,
};
