import React from "react";
import {
  Popover as SPopover,
  PopoverTrigger as SPopoverTrigger,
  PopoverContent as SPopoverContent,
} from "@dsui/ui/components/popover";
import { cn } from "@dsui/ui/lib/utils";

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps {
  // Core props
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;

  // Content
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  content?: React.ReactNode;

  // Layout
  side?: PopoverSide;
  align?: PopoverAlign;
  sideOffset?: number;
  alignOffset?: number;

  // Styling
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>((props, ref) => {
  const {
    open,
    defaultOpen,
    onOpenChange,
    modal = false,
    children,
    trigger,
    content,
    side = "bottom",
    align = "center",
    sideOffset = 4,
    alignOffset,
    className,
    contentClassName,
    triggerClassName,
  } = props;

  // If children are provided (compound pattern), render them directly
  // if (children) {
  //   return (
  //     <SPopover
  //       open={open}
  //       defaultOpen={defaultOpen}
  //       onOpenChange={onOpenChange}
  //       modal={modal}
  //     >
  //       {children}
  //     </SPopover>
  //   );
  // }

  // Fallback to props-based pattern
  const triggerElement = trigger || children;

  return (
    <SPopover
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {triggerElement && (
        <SPopoverTrigger asChild className={cn(triggerClassName)}>
          {triggerElement}
        </SPopoverTrigger>
      )}
      <SPopoverContent
        ref={ref}
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={cn(className, contentClassName)}
      >
        {content}
      </SPopoverContent>
    </SPopover>
  );
});

Popover.displayName = "Popover";

export default Popover;
