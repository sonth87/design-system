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
        "ds:flex ds:h-full ds:w-full ds:data-[panel-group-direction=vertical]:flex-col",
        className
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
  "ds:bg-border ds:focus-visible:ring-ring ds:relative ds:flex ds:w-px ds:items-center ds:justify-center ds:after:absolute ds:after:inset-y-0 ds:after:left-1/2 ds:after:w-1 ds:after:-translate-x-1/2 ds:focus-visible:ring-1 ds:focus-visible:ring-offset-1 ds:focus-visible:outline-hidden ds:data-[panel-group-direction=vertical]:h-px ds:data-[panel-group-direction=vertical]:w-full ds:data-[panel-group-direction=vertical]:after:left-0 ds:data-[panel-group-direction=vertical]:after:h-1 ds:data-[panel-group-direction=vertical]:after:w-full ds:data-[panel-group-direction=vertical]:after:translate-x-0 ds:data-[panel-group-direction=vertical]:after:-translate-y-1/2 ds:[&[data-panel-group-direction=vertical]>div]:rotate-90",
  {
    variants: {
      variant: {
        default: "",
        line: "ds:transition-all ds:hover:bg-primary/50 ds:hover:shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)] ds:hover:ring-1 ds:hover:ring-primary/30 ds:data-[resize-handle-state=hover]:bg-primary/50 ds:data-[resize-handle-state=hover]:shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)] ds:data-[resize-handle-state=hover]:ring-1 ds:data-[resize-handle-state=hover]:ring-primary/30 ds:data-[resize-handle-state=drag]:bg-primary ds:data-[resize-handle-state=drag]:shadow-[0_0_12px_3px_hsl(var(--primary)/0.6)] ds:data-[resize-handle-state=drag]:ring-1 ds:data-[resize-handle-state=drag]:ring-primary/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
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
          <div className="ds:bg-border ds:z-10 ds:flex ds:h-4 ds:w-3 ds:items-center ds:justify-center ds:rounded-xs ds:border">
            <GripVerticalIcon className="ds:size-2.5" />
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
