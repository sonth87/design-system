"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@dsui/ui/lib/utils";

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;
function Popover({ modal, ...props }: PopoverProps) {
  return <PopoverPrimitive.Root data-slot="popover" modal={modal} {...props} />;
}

type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;
function PopoverTrigger({ ...props }: PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

type PopoverContentProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
> & {
  /** Increase z-index for use in modals/dialogs */
  modal?: boolean;
};
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  modal = false,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "ds:bg-popover ds:text-popover-foreground ds:data-[state=open]:animate-in ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=open]:fade-in-0 ds:data-[state=closed]:zoom-out-95 ds:data-[state=open]:zoom-in-95 ds:data-[side=bottom]:slide-in-from-top-2 ds:data-[side=left]:slide-in-from-right-2 ds:data-[side=right]:slide-in-from-left-2 ds:data-[side=top]:slide-in-from-bottom-2 ds:origin-(--radix-popover-content-transform-origin) ds:rounded-md ds:border ds:p-4 ds:shadow-md ds:outline-hidden",
          modal ? "ds:z-[100]" : "ds:z-50",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

type PopoverAnchorProps = React.ComponentProps<typeof PopoverPrimitive.Anchor>;
const PopoverAnchor = React.forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ ...props }, ref) => {
    return (
      <PopoverPrimitive.Anchor
        ref={ref}
        data-slot="popover-anchor"
        {...props}
      />
    );
  }
);

PopoverAnchor.displayName = "PopoverAnchor";

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  type PopoverProps,
  type PopoverTriggerProps,
  type PopoverAnchorProps,
  type PopoverContentProps,
};
