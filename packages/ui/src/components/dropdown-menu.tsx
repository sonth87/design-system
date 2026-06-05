"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@dsui/ui/lib/utils";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "ds:bg-popover ds:text-popover-foreground ds:data-[state=open]:animate-in ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=open]:fade-in-0 ds:data-[state=closed]:zoom-out-95 ds:data-[state=open]:zoom-in-95 ds:data-[side=bottom]:slide-in-from-top-2 ds:data-[side=left]:slide-in-from-right-2 ds:data-[side=right]:slide-in-from-left-2 ds:data-[side=top]:slide-in-from-bottom-2 ds:z-50 ds:max-h-(--radix-dropdown-menu-content-available-height) ds:min-w-[8rem] ds:origin-(--radix-dropdown-menu-content-transform-origin) ds:overflow-x-hidden ds:overflow-y-auto ds:rounded-md ds:border ds:p-1 ds:shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
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

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "ds:focus:bg-accent ds:focus:text-accent-foreground ds:relative ds:flex ds:cursor-default ds:items-center ds:gap-2 ds:rounded-sm ds:py-1.5 ds:pr-2 ds:pl-8 ds:text-sm ds:outline-hidden ds:select-none ds:data-[disabled]:pointer-events-none ds:data-[disabled]:opacity-50 ds:[&_svg]:pointer-events-none ds:[&_svg]:shrink-0 ds:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="ds:pointer-events-none ds:absolute ds:left-2 ds:flex ds:size-3.5 ds:items-center ds:justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="ds:size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "ds:focus:bg-accent ds:focus:text-accent-foreground ds:relative ds:flex ds:cursor-default ds:items-center ds:gap-2 ds:rounded-sm ds:py-1.5 ds:pr-2 ds:pl-8 ds:text-sm ds:outline-hidden ds:select-none ds:data-[disabled]:pointer-events-none ds:data-[disabled]:opacity-50 ds:[&_svg]:pointer-events-none ds:[&_svg]:shrink-0 ds:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="ds:pointer-events-none ds:absolute ds:left-2 ds:flex ds:size-3.5 ds:items-center ds:justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="ds:size-2 ds:fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "ds:px-2 ds:py-1.5 ds:text-sm ds:font-medium ds:data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("ds:bg-border ds:-mx-1 ds:my-1 ds:h-px", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ds:text-muted-foreground ds:ml-auto ds:text-xs ds:tracking-widest",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "ds:focus:bg-accent ds:focus:text-accent-foreground ds:data-[state=open]:bg-accent ds:data-[state=open]:text-accent-foreground ds:[&_svg:not([class*='text-'])]:text-muted-foreground ds:flex ds:cursor-default ds:items-center ds:gap-2 ds:rounded-sm ds:px-2 ds:py-1.5 ds:text-sm ds:outline-hidden ds:select-none ds:data-[inset]:pl-8 ds:[&_svg]:pointer-events-none ds:[&_svg]:shrink-0 ds:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ds:ml-auto ds:size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "ds:bg-popover ds:text-popover-foreground ds:data-[state=open]:animate-in ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=open]:fade-in-0 ds:data-[state=closed]:zoom-out-95 ds:data-[state=open]:zoom-in-95 ds:data-[side=bottom]:slide-in-from-top-2 ds:data-[side=left]:slide-in-from-right-2 ds:data-[side=right]:slide-in-from-left-2 ds:data-[side=top]:slide-in-from-bottom-2 ds:z-50 ds:min-w-[8rem] ds:origin-(--radix-dropdown-menu-content-transform-origin) ds:overflow-hidden ds:rounded-md ds:border ds:p-1 ds:shadow-lg",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
