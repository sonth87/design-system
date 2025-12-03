"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

function ResizablePanel({
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

const resizableHandleVariants = cva(
  "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
  {
    variants: {
      variant: {
        default: "",
        line: "transition-all hover:bg-primary/50 hover:shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)] hover:ring-1 hover:ring-primary/30 data-[resize-handle-state=hover]:bg-primary/50 data-[resize-handle-state=hover]:shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)] data-[resize-handle-state=hover]:ring-1 data-[resize-handle-state=hover]:ring-primary/30 data-[resize-handle-state=drag]:bg-primary data-[resize-handle-state=drag]:shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)] data-[resize-handle-state=drag]:ring-1 data-[resize-handle-state=drag]:ring-primary/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function ResizableHandle({
  withHandle,
  icon,
  variant,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> &
  VariantProps<typeof resizableHandleVariants> & {
    withHandle?: boolean;
    icon?: React.ReactNode;
  }) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      data-slot="resizable-handle"
      className={cn(resizableHandleVariants({ variant }), className)}
      {...props}
    >
      {withHandle &&
        variant !== "line" &&
        (icon ?? (
          <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
            <GripVerticalIcon className="size-2.5" />
          </div>
        ))}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  resizableHandleVariants,
};
