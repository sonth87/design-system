"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@dsui/ui/lib/utils";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "ds:data-[state=open]:animate-in ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=open]:fade-in-0 ds:fixed ds:inset-0 ds:z-50 ds:bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "ds:group/drawer-content ds:bg-background ds:fixed ds:z-50 ds:flex ds:h-auto ds:flex-col",
          "ds:data-[vaul-drawer-direction=top]:inset-x-0 ds:data-[vaul-drawer-direction=top]:top-0 ds:data-[vaul-drawer-direction=top]:mb-24 ds:data-[vaul-drawer-direction=top]:max-h-[80vh] ds:data-[vaul-drawer-direction=top]:rounded-b-lg ds:data-[vaul-drawer-direction=top]:border-b",
          "ds:data-[vaul-drawer-direction=bottom]:inset-x-0 ds:data-[vaul-drawer-direction=bottom]:bottom-0 ds:data-[vaul-drawer-direction=bottom]:mt-24 ds:data-[vaul-drawer-direction=bottom]:max-h-[80vh] ds:data-[vaul-drawer-direction=bottom]:rounded-t-lg ds:data-[vaul-drawer-direction=bottom]:border-t",
          "ds:data-[vaul-drawer-direction=right]:inset-y-0 ds:data-[vaul-drawer-direction=right]:right-0 ds:data-[vaul-drawer-direction=right]:w-3/4 ds:data-[vaul-drawer-direction=right]:border-l ds:data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "ds:data-[vaul-drawer-direction=left]:inset-y-0 ds:data-[vaul-drawer-direction=left]:left-0 ds:data-[vaul-drawer-direction=left]:w-3/4 ds:data-[vaul-drawer-direction=left]:border-r ds:data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="ds:bg-muted ds:mx-auto ds:mt-4 ds:hidden ds:h-2 ds:w-[100px] ds:shrink-0 ds:rounded-full ds:group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "ds:flex ds:flex-col ds:gap-0.5 ds:p-4 ds:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center ds:group-data-[vaul-drawer-direction=top]/drawer-content:text-center ds:md:gap-1.5 ds:md:text-left",
        className
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("ds:mt-auto ds:flex ds:flex-col ds:gap-2 ds:p-4", className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("ds:text-foreground ds:font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("ds:text-muted-foreground ds:text-sm", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
