"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@dsui/ui/lib/utils";
import { buttonVariants } from "@dsui/ui/components/button";

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay({
  className,
  backdropFilter,
  overlay = "dark",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay> & {
  backdropFilter?: number;
  overlay?: "dark" | "light";
}) {
  const overlayClass = overlay === "dark" ? "bg-blackOpacity600" : "bg-whiteOpacity500";
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "ds:data-[state=open]:animate-in ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=open]:fade-in-0 ds:fixed ds:inset-0 ds:z-50",
        overlayClass,
        className
      )}
      style={
        backdropFilter
          ? { backdropFilter: `blur(${backdropFilter}px)` }
          : undefined
      }
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  noDefaultAnimation,
  backdropFilter,
  overlay,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  noDefaultAnimation?: boolean;
  backdropFilter?: number;
  overlay?: "dark" | "light";
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay backdropFilter={backdropFilter} overlay={overlay} />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          "ds:bg-white ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=open]:fade-in-0 ds:data-[state=closed]:zoom-out-95 ds:data-[state=open]:zoom-in-95 ds:fixed ds:top-[50%] ds:left-[50%] ds:z-50 ds:grid ds:w-full ds:max-w-[calc(100%-2rem)] ds:translate-x-[-50%] ds:translate-y-[-50%] ds:gap-4 ds:rounded-lg ds:border ds:border-border ds:p-6 ds:shadow-lg ds:duration-200 ds:sm:max-w-lg",
          {
            "ds:data-[state=open]:animate-in": !noDefaultAnimation,
          },
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("ds:flex ds:flex-col ds:gap-2 ds:text-center ds:sm:text-left", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "ds:flex ds:flex-col-reverse ds:gap-2 ds:sm:flex-row ds:sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("ds:text-lg ds:font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("ds:text-ink700 ds:text-sm", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: "outline" }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
