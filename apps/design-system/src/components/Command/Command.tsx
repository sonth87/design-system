import React from "react";
import {
  Command as SCommand,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
  CommandShortcut,
} from "@dsui/ui/components/command";
import { cn } from "@dsui/ui/lib/utils";

export interface CommandItem {
  readonly type: "item";
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface CommandGroup {
  readonly type: "group";
  heading: string;
  className?: string;
  items: CommandItem[];
}

export interface CommandSeparator {
  readonly type: "separator";
}

export type CommandItemType = CommandItem | CommandGroup | CommandSeparator;

export interface CommandProps {
  className?: string;
  children?: React.ReactNode;
  items?: CommandItemType[];
  search?: boolean | string;

  // Dialog mode props
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>((props, ref) => {
  const {
    className,
    children,
    items,
    search,
    open,
    defaultOpen,
    onOpenChange,
    modal = false,
    title = "Command Palette",
    description = "Search for a command to run...",
    showCloseButton = true,
    ...rest
  } = props;

  const renderItems = (items: CommandItemType[]) => {
    return items.map((item, index) => {
      switch (item.type) {
        case "item":
          return (
            <CommandItem
              key={index}
              disabled={item.disabled}
              className={item.className}
              onSelect={item.onClick}
            >
              {item.children ? (
                item.children
              ) : (
                <>
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <CommandShortcut>{item.shortcut}</CommandShortcut>
                  )}
                </>
              )}
            </CommandItem>
          );
        case "group":
          return (
            <CommandGroup
              key={index}
              heading={item.heading}
              className={item.className}
            >
              {item.items.map((subItem, subIndex) => (
                <CommandItem
                  key={subIndex}
                  disabled={subItem.disabled}
                  className={subItem.className}
                  onSelect={subItem.onClick}
                >
                  {subItem.children ? (
                    subItem.children
                  ) : (
                    <>
                      {subItem.icon && (
                        <subItem.icon className="mr-2 h-4 w-4" />
                      )}
                      <span>{subItem.label}</span>
                      {subItem.shortcut && (
                        <CommandShortcut>{subItem.shortcut}</CommandShortcut>
                      )}
                    </>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          );
        case "separator":
          return <CommandSeparator key={index} />;
        default:
          return null;
      }
    });
  };

  const commandContent = (
    <SCommand
      ref={ref}
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className,
      )}
      {...rest}
    >
      {search && (
        <CommandInput
          placeholder={
            typeof search === "string" ? search : "Type a command or search..."
          }
        />
      )}
      <CommandList>
        {items ? (
          <>
            <CommandEmpty>No results found.</CommandEmpty>
            {renderItems(items)}
          </>
        ) : (
          children
        )}
      </CommandList>
    </SCommand>
  );

  // If dialog props are provided, render as dialog
  if (
    modal &&
    (open !== undefined || onOpenChange || defaultOpen !== undefined)
  ) {
    return (
      <CommandDialog
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        modal={modal}
        title={title}
        description={description}
        showCloseButton={showCloseButton}
      >
        <Command
          className={className}
          items={items}
          search={search}
          {...rest}
        />
      </CommandDialog>
    );
  }

  // Otherwise, render as regular command
  return commandContent;
});

Command.displayName = "Command";

export default Command;
