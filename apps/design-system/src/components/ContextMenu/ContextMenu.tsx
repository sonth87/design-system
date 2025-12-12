import React from "react";
import {
  ContextMenu as SContextMenu,
  ContextMenuTrigger as SContextMenuTrigger,
  ContextMenuContent as SContextMenuContent,
  ContextMenuItem as SContextMenuItem,
  ContextMenuCheckboxItem as SContextMenuCheckboxItem,
  ContextMenuRadioItem as SContextMenuRadioItem,
  ContextMenuRadioGroup as SContextMenuRadioGroup,
  ContextMenuLabel as SContextMenuLabel,
  ContextMenuSeparator as SContextMenuSeparator,
  ContextMenuGroup as SContextMenuGroup,
  ContextMenuSub as SContextMenuSub,
  ContextMenuSubTrigger as SContextMenuSubTrigger,
  ContextMenuSubContent as SContextMenuSubContent,
  ContextMenuShortcut as SContextMenuShortcut,
} from "@dsui/ui/components/context-menu";
import { cn } from "@dsui/ui/lib/utils";

export type ContextMenuItem =
  | {
      key: string;
      label?: string;
      icon?: React.ReactNode;
      shortcut?: string;
      children?: ContextMenuItem[];
      type?: "item";
      checked?: boolean;
      disabled?: boolean;
      variant?: "default" | "destructive";
      onClick?: () => void;
      className?: string;
    }
  | {
      key: string;
      type: "checkbox";
      label?: string;
      icon?: React.ReactNode;
      shortcut?: string;
      checked?: boolean;
      disabled?: boolean;
      onCheckedChange?: (checked: boolean) => void;
      className?: string;
    }
  | {
      key: string;
      type: "radio";
      label?: string;
      icon?: React.ReactNode;
      shortcut?: string;
      group: string;
      value?: string;
      disabled?: boolean;
      onClick?: () => void;
      className?: string;
    }
  | {
      key: string;
      type: "separator";
    }
  | {
      key: string;
      type: "group";
      label?: string;
      children: ContextMenuItem[];
      disabled?: boolean;
    }
  | {
      key: string;
      type: "label";
      label: string;
      inset?: boolean;
      className?: string;
    };

export interface ContextMenuProps {
  // Core props
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;

  // Content
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  items?: ContextMenuItem[];

  // Styling
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
}

const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  (props, ref) => {
    const {
      onOpenChange,
      modal = false,
      children,
      trigger,
      content,
      items,
      className,
      contentClassName,
      triggerClassName,
    } = props;

    // If children are provided (compound pattern), render them directly
    if (children) {
      return (
        <SContextMenu onOpenChange={onOpenChange} modal={modal}>
          {children}
        </SContextMenu>
      );
    }

    // Render items if provided
    const renderItems = (menuItems: ContextMenuItem[]): React.ReactNode => {
      return menuItems.map((item) => {
        switch (item.type) {
          case "separator":
            return <SContextMenuSeparator key={item.key} />;

          case "label":
            return (
              <SContextMenuLabel
                key={item.key}
                inset={item.inset}
                className={item.className}
              >
                {item.label}
              </SContextMenuLabel>
            );

          case "group":
            return (
              <SContextMenuGroup key={item.key}>
                {item.label && (
                  <SContextMenuLabel>{item.label}</SContextMenuLabel>
                )}
                {renderItems(item.children)}
              </SContextMenuGroup>
            );

          case "checkbox":
            return (
              <SContextMenuCheckboxItem
                key={item.key}
                checked={item.checked}
                disabled={item.disabled}
                className={item.className}
                onCheckedChange={item.onCheckedChange}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
                {item.shortcut && (
                  <SContextMenuShortcut>{item.shortcut}</SContextMenuShortcut>
                )}
              </SContextMenuCheckboxItem>
            );

          case "radio":
            return (
              <SContextMenuRadioGroup
                key={item.key}
                value={item.value || item.group}
              >
                <SContextMenuRadioItem
                  value={item.value || item.key}
                  disabled={item.disabled}
                  onClick={item.onClick}
                  className={item.className}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                  {item.shortcut && (
                    <SContextMenuShortcut>{item.shortcut}</SContextMenuShortcut>
                  )}
                </SContextMenuRadioItem>
              </SContextMenuRadioGroup>
            );

          default: {
            // item or undefined type
            if (item.children && item.children.length > 0) {
              // Submenu
              return (
                <SContextMenuSub key={item.key}>
                  <SContextMenuSubTrigger
                    disabled={item.disabled}
                    className={cn(
                      item.disabled ? "opacity-50 cursor-not-allowed" : "",
                      item.className
                    )}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </SContextMenuSubTrigger>
                  <SContextMenuSubContent>
                    {renderItems(item.children)}
                  </SContextMenuSubContent>
                </SContextMenuSub>
              );
            } else {
              // Regular item
              return (
                <SContextMenuItem
                  key={item.key}
                  disabled={item.disabled}
                  variant={item.variant}
                  onClick={item.onClick}
                  className={item.className}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                  {item.shortcut && (
                    <SContextMenuShortcut>{item.shortcut}</SContextMenuShortcut>
                  )}
                </SContextMenuItem>
              );
            }
          }
        }
      });
    };

    // Props-based pattern with trigger and items
    const triggerElement = trigger ? (
      <SContextMenuTrigger asChild className={cn(triggerClassName)}>
        {trigger}
      </SContextMenuTrigger>
    ) : null;

    const contentElement =
      content || items ? (
        <SContextMenuContent
          ref={ref}
          className={cn(className, contentClassName)}
        >
          {content}
          {items && renderItems(items)}
        </SContextMenuContent>
      ) : null;

    return (
      <SContextMenu onOpenChange={onOpenChange} modal={modal}>
        {triggerElement}
        {contentElement}
      </SContextMenu>
    );
  }
);

ContextMenu.displayName = "ContextMenu";

export default ContextMenu;
