"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@dsui/ui/lib/utils";

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  );
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />;
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "ds:focus:bg-accent ds:focus:text-accent-foreground ds:data-[state=open]:bg-accent ds:data-[state=open]:text-accent-foreground ds:[&_svg:not([class*='text-'])]:text-muted-foreground ds:flex ds:cursor-default ds:items-center ds:rounded-sm ds:px-2 ds:py-1.5 ds:text-sm ds:outline-hidden ds:select-none ds:data-[inset]:pl-8 ds:[&_svg]:pointer-events-none ds:[&_svg]:shrink-0 ds:[&_svg:not([class*='size-'])]:size-4 ds:gap-2",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ds:ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
        "ds:bg-popover ds:text-popover-foreground ds:data-[state=open]:animate-in ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=open]:fade-in-0 ds:data-[state=closed]:zoom-out-95 ds:data-[state=open]:zoom-in-95 ds:data-[side=bottom]:slide-in-from-top-2 ds:data-[side=left]:slide-in-from-right-2 ds:data-[side=right]:slide-in-from-left-2 ds:data-[side=top]:slide-in-from-bottom-2 ds:z-50 ds:min-w-[8rem] ds:origin-(--radix-context-menu-content-transform-origin) ds:overflow-hidden ds:rounded-md ds:border ds:border-border ds:p-1 ds:shadow-lg",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        updatePositionStrategy="always"
        className={cn(
          "ds:bg-popover ds:text-popover-foreground ds:data-[state=open]:animate-in ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=open]:fade-in-0 ds:data-[state=closed]:zoom-out-95 ds:data-[state=open]:zoom-in-95 ds:data-[side=bottom]:slide-in-from-top-2 ds:data-[side=left]:slide-in-from-right-2 ds:data-[side=right]:slide-in-from-left-2 ds:data-[side=top]:slide-in-from-bottom-2 ds:z-50 ds:max-h-(--radix-context-menu-content-available-height) ds:min-w-[8rem] ds:origin-(--radix-context-menu-content-transform-origin) ds:overflow-x-hidden ds:overflow-y-auto ds:rounded-md ds:border ds:p-1 ds:shadow-md",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "ds:focus:bg-accent ds:focus:text-accent-foreground ds:data-[variant=destructive]:text-destructive ds:data-[variant=destructive]:focus:bg-destructive/10 ds:dark:data-[variant=destructive]:focus:bg-destructive/20 ds:data-[variant=destructive]:focus:text-destructive ds:data-[variant=destructive]:*:[svg]:!text-destructive ds:[&_svg:not([class*='text-'])]:text-muted-foreground ds:relative ds:flex ds:cursor-default ds:items-center ds:gap-2 ds:rounded-sm ds:px-2 ds:py-1.5 ds:text-sm ds:outline-hidden ds:select-none ds:data-[disabled]:pointer-events-none ds:data-[disabled]:opacity-50 ds:data-[inset]:pl-8 ds:[&_svg]:pointer-events-none ds:[&_svg]:shrink-0 ds:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(
        "ds:focus:bg-accent ds:focus:text-accent-foreground ds:relative ds:flex ds:cursor-default ds:items-center ds:gap-2 ds:rounded-sm ds:py-1.5 ds:pr-2 ds:pl-8 ds:text-sm ds:outline-hidden ds:select-none ds:data-[disabled]:pointer-events-none ds:data-[disabled]:opacity-50 ds:[&_svg]:pointer-events-none ds:[&_svg]:shrink-0 ds:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="ds:pointer-events-none ds:absolute ds:left-2 ds:flex ds:size-3.5 ds:items-center ds:justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="ds:size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      className={cn(
        "ds:focus:bg-accent ds:focus:text-accent-foreground ds:relative ds:flex ds:cursor-default ds:items-center ds:gap-2 ds:rounded-sm ds:py-1.5 ds:pr-2 ds:pl-8 ds:text-sm ds:outline-hidden ds:select-none ds:data-[disabled]:pointer-events-none ds:data-[disabled]:opacity-50 ds:[&_svg]:pointer-events-none ds:[&_svg]:shrink-0 ds:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="ds:pointer-events-none ds:absolute ds:left-2 ds:flex ds:size-3.5 ds:items-center ds:justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="ds:size-2 ds:fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "ds:text-foreground ds:px-2 ds:py-1.5 ds:text-sm ds:font-medium ds:data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("ds:bg-border ds:-mx-1 ds:my-1 ds:h-px", className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ds:text-muted-foreground ds:ml-auto ds:text-xs ds:tracking-widest",
        className
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
