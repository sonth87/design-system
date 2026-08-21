"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@dsui/ui/lib/utils";

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "ds:data-[state=open]:animate-in ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=open]:fade-in-0 ds:fixed ds:inset-0 ds:z-50 ds:bg-blackOpacity600",
        className
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  overlayClassName,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
  overlayClassName?: string;
}) {
  return (
    <SheetPortal>
      <SheetOverlay className={overlayClassName} />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "ds:bg-white ds:data-[state=open]:animate-in ds:data-[state=closed]:animate-out ds:fixed ds:z-50 ds:flex ds:flex-col ds:gap-4 ds:shadow-lg ds:transition ds:ease-in-out ds:data-[state=closed]:duration-300 ds:data-[state=open]:duration-500",
          side === "right" &&
            "ds:data-[state=closed]:slide-out-to-right ds:data-[state=open]:slide-in-from-right ds:inset-y-0 ds:right-0 ds:top-0 ds:h-full ds:w-3/4 ds:border-l ds:sm:max-w-sm",
          side === "left" &&
            "ds:data-[state=closed]:slide-out-to-left ds:data-[state=open]:slide-in-from-left ds:inset-y-0 ds:left-0 ds:top-0 ds:h-full ds:w-3/4 ds:border-r ds:sm:max-w-sm",
          side === "top" &&
            "ds:data-[state=closed]:slide-out-to-top ds:data-[state=open]:slide-in-from-top ds:inset-x-0 ds:top-0 ds:h-auto ds:w-full ds:border-b",
          side === "bottom" &&
            "ds:data-[state=closed]:slide-out-to-bottom ds:data-[state=open]:slide-in-from-bottom ds:inset-x-0 ds:bottom-0 ds:h-auto ds:w-full ds:border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ds:ring-offset-white ds:focus:ring-ink500 ds:data-[state=open]:bg-primaryC-500 ds:absolute ds:top-4 ds:right-4 ds:rounded-xs ds:opacity-70 ds:transition-opacity ds:hover:opacity-100 ds:focus:ring-2 ds:focus:ring-offset-2 ds:focus:outline-hidden ds:disabled:pointer-events-none">
          <XIcon className="ds:size-4" />
          <span className="ds:sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("ds:flex ds:flex-col ds:gap-1.5 ds:p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("ds:mt-auto ds:flex ds:flex-col ds:gap-2 ds:p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("ds:text-ink800 ds:font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("ds:text-ink700 ds:text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
