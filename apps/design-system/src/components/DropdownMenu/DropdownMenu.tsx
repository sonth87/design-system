import React, { useState } from "react";
import {
  DropdownMenu as SDropdownMenu,
  DropdownMenuTrigger as SDropdownMenuTrigger,
  DropdownMenuContent as SDropdownMenuContent,
  DropdownMenuPortal as SDropdownMenuPortal,
  DropdownMenuItem as SDropdownMenuItem,
  DropdownMenuCheckboxItem as SDropdownMenuCheckboxItem,
  DropdownMenuRadioItem as SDropdownMenuRadioItem,
  DropdownMenuRadioGroup as SDropdownMenuRadioGroup,
  DropdownMenuLabel as SDropdownMenuLabel,
  DropdownMenuSeparator as SDropdownMenuSeparator,
  DropdownMenuGroup as SDropdownMenuGroup,
  DropdownMenuSub as SDropdownMenuSub,
  DropdownMenuSubTrigger as SDropdownMenuSubTrigger,
  DropdownMenuSubContent as SDropdownMenuSubContent,
} from "@dsui/ui/components/dropdown-menu";
import { cn } from "@dsui/ui/lib/utils";

export type DropdownMenuSide = "top" | "right" | "bottom" | "left";
export type DropdownMenuAlign = "start" | "center" | "end";

export type DropdownMenuItem =
  | {
      key: string;
      label?: string;
      icon?: React.ReactNode;
      children?: DropdownMenuItem[];
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
      checked?: boolean;
      disabled?: boolean;
      onClick?: () => void;
      className?: string;
    }
  | {
      key: string;
      type: "radio";
      label?: string;
      icon?: React.ReactNode;
      group: string;
      checked?: boolean;
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
      children: DropdownMenuItem[];
      disabled?: boolean;
    };

export interface DropdownMenuProps {
  // Core props
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;

  // Content
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  items?: DropdownMenuItem[];

  // Layout
  side?: DropdownMenuSide;
  align?: DropdownMenuAlign;
  sideOffset?: number;
  alignOffset?: number;

  // Portal
  portal?: boolean;

  // Context menu
  contextMenu?: boolean;

  // Styling
  className?: string;
  contentClassName?: string;
  triggerClassName?: string;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  (props, ref) => {
    const {
      open,
      defaultOpen,
      onOpenChange,
      modal = false,
      children,
      trigger,
      content,
      items,
      side = "bottom",
      align = "start",
      sideOffset,
      alignOffset,
      portal = true,
      contextMenu = false,
      className,
      contentClassName,
      triggerClassName,
    } = props;

    // Context menu state
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({
      x: 0,
      y: 0,
    });

    // Handle context menu trigger
    const handleContextMenu = (e: React.MouseEvent) => {
      if (contextMenu) {
        e.preventDefault();
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setContextMenuOpen(true);
      }
    };

    // If children are provided (compound pattern), render them directly
    if (children) {
      return (
        <SDropdownMenu
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          modal={modal}
        >
          {children}
        </SDropdownMenu>
      );
    }

    // Render items if provided
    const renderItems = (menuItems: DropdownMenuItem[]): React.ReactNode => {
      return menuItems.map((item) => {
        switch (item.type) {
          case "separator":
            return <SDropdownMenuSeparator key={item.key} />;
          case "group":
            return (
              <SDropdownMenuGroup key={item.key}>
                {item.label && (
                  <SDropdownMenuLabel>{item.label}</SDropdownMenuLabel>
                )}
                {renderItems(item.children)}
              </SDropdownMenuGroup>
            );
          case "checkbox":
            return (
              <SDropdownMenuCheckboxItem
                key={item.key}
                checked={item.checked}
                disabled={item.disabled}
                className={item.className}
                onCheckedChange={(checked: boolean) => {
                  if (checked && item.onClick) {
                    item.onClick();
                  }
                }}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </SDropdownMenuCheckboxItem>
            );
          case "radio":
            return (
              <SDropdownMenuRadioGroup key={item.key} value={item.group}>
                <SDropdownMenuRadioItem
                  value={item.key}
                  disabled={item.disabled}
                  onClick={item.onClick}
                  className={item.className}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </SDropdownMenuRadioItem>
              </SDropdownMenuRadioGroup>
            );
          default: {
            // item or undefined type
            if (item.children && item.children.length > 0) {
              // Submenu
              return (
                <SDropdownMenuSub key={item.key}>
                  <SDropdownMenuSubTrigger
                    disabled={item.disabled}
                    className={cn(
                      item.disabled ? "opacity-50 cursor-not-allowed" : "",
                      item.className
                    )}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </SDropdownMenuSubTrigger>
                  <SDropdownMenuSubContent>
                    {renderItems(item.children)}
                  </SDropdownMenuSubContent>
                </SDropdownMenuSub>
              );
            } else {
              // Regular item
              return (
                <SDropdownMenuItem
                  key={item.key}
                  disabled={item.disabled}
                  variant={item.variant}
                  onClick={item.onClick}
                  className={item.className}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </SDropdownMenuItem>
              );
            }
          }
        }
      });
    };

    // If context menu is enabled, render differently
    if (contextMenu) {
      return (
        <>
          {/* Trigger area for context menu */}
          <div
            onContextMenu={handleContextMenu}
            className={cn(triggerClassName)}
          >
            {trigger}
          </div>
          <SDropdownMenu
            open={contextMenuOpen}
            onOpenChange={setContextMenuOpen}
            modal={modal}
          >
            <SDropdownMenuTrigger asChild>
              <div
                className="fixed"
                style={{
                  left: contextMenuPosition.x,
                  top: contextMenuPosition.y,
                  width: 1,
                  height: 1,
                }}
              />
            </SDropdownMenuTrigger>
            <SDropdownMenuPortal>
              <SDropdownMenuContent
                ref={ref}
                className={cn(className, contentClassName)}
                side="bottom"
                align="start"
                sideOffset={4}
              >
                {content}
                {items && renderItems(items)}
              </SDropdownMenuContent>
            </SDropdownMenuPortal>
          </SDropdownMenu>
        </>
      );
    }

    // Fallback to props-based pattern
    const triggerElement = trigger ? (
      <div onContextMenu={handleContextMenu} className={cn(triggerClassName)}>
        {trigger}
      </div>
    ) : null;

    const contentElement =
      content || items ? (
        <SDropdownMenuContent
          ref={ref}
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className={cn(className, contentClassName)}
        >
          {content}
          {items && renderItems(items)}
        </SDropdownMenuContent>
      ) : null;

    return (
      <SDropdownMenu
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        modal={modal}
      >
        {triggerElement && (
          <SDropdownMenuTrigger asChild>{triggerElement}</SDropdownMenuTrigger>
        )}
        {portal ? (
          <SDropdownMenuPortal>{contentElement}</SDropdownMenuPortal>
        ) : (
          contentElement
        )}
      </SDropdownMenu>
    );
  }
);

DropdownMenu.displayName = "DropdownMenu";

export default DropdownMenu;
