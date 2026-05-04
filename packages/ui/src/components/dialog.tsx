"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@dsui/ui/lib/utils";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  backdropFilter,
  overlay = "dark",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay> & {
  backdropFilter?: number;
  overlay?: "dark" | "light";
}) {
  const overlayClass = overlay === "dark" ? "bg-black/50" : "bg-white/50";
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 ds:fixed ds:inset-0 ds:z-50",
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

function DialogContent({
  className,
  children,
  showCloseButton = true,
  noDefaultAnimation,
  backdropFilter,
  overlay,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  noDefaultAnimation?: boolean;
  backdropFilter?: number;
  overlay?: "dark" | "light";
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay backdropFilter={backdropFilter} overlay={overlay} />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn("ds:bg-background data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ds:fixed top-[50%] left-[50%] ds:z-50 ds:grid ds:w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] ds:gap-4 ds:rounded-lg ds:border ds:p-6 ds:shadow-lg ds:duration-200 ds:sm:max-w-lg",
          {
            "data-[state=open]:animate-in": !noDefaultAnimation,
          },
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ds:ring-offset-background ds:focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground ds:absolute ds:top-4 ds:right-4 ds:rounded-xs ds:opacity-70 ds:transition-opacity ds:hover:opacity-100 ds:focus:ring-2 ds:focus:ring-offset-2 ds:focus:outline-hidden ds:disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("ds:flex ds:flex-col ds:gap-2 ds:text-center ds:sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("ds:flex ds:flex-col-reverse ds:gap-2 ds:sm:flex-row ds:sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("ds:text-lg ds:leading-none ds:font-semibold", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("ds:text-muted-foreground ds:text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
