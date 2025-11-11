import React from "react";
import {
  Tabs as STabs,
  TabsList as STabsList,
  TabsTrigger as STabsTrigger,
  TabsContent as STabsContent,
} from "@dsui/ui/components/tabs";
import { cn } from "@dsui/ui/lib/utils";

export type TabPosition = "top" | "bottom" | "left" | "right";
export type TabSize = "sm" | "md" | "lg";

export interface TabItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export type TabAlignment = "start" | "center" | "end";

export interface TabsProps {
  // Core props
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
  onChange?: (key: string) => void;

  // Layout
  tabPosition?: TabPosition;
  size?: TabSize;
  alignment?: TabAlignment;
  fullWidth?: boolean;

  // Styling
  className?: string;
  tabListClassName?: string;
  tabContentClassName?: string;
  tabTriggerClassName?: string;
}

const sizeClasses: Record<TabSize, { horizontal: string; vertical: string }> = {
  sm: {
    horizontal: "text-xs h-7 [&>button]:px-2",
    vertical: "text-xs [&>button]:py-0.5",
  },
  md: {
    horizontal: "text-sm h-9 [&>button]:px-3",
    vertical: "text-sm [&>button]:py-1",
  },
  lg: {
    horizontal: "text-base h-11 [&>button]:px-4",
    vertical: "text-base [&>button]:py-1.5",
  },
};

const alignmentClasses: Record<
  TabAlignment,
  { horizontal: string; vertical: string }
> = {
  start: {
    horizontal: "justify-start",
    vertical: "items-start",
  },
  center: {
    horizontal: "justify-center",
    vertical: "items-center",
  },
  end: {
    horizontal: "justify-end",
    vertical: "items-end",
  },
};

const positionClasses: Record<TabPosition, { root: string; list: string }> = {
  top: {
    root: "flex flex-col",
    list: "flex-row",
  },
  bottom: {
    root: "flex flex-col-reverse",
    list: "flex-row",
  },
  left: {
    root: "flex flex-row",
    list: "flex-col h-fit",
  },
  right: {
    root: "flex flex-row-reverse",
    list: "flex-col h-fit",
  },
};

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    items,
    defaultActiveKey,
    activeKey,
    onChange,
    tabPosition = "top",
    size = "md",
    alignment = "start",
    fullWidth = false,
    className,
    tabListClassName,
    tabContentClassName,
    tabTriggerClassName,
  } = props;

  const isVertical = tabPosition === "left" || tabPosition === "right";
  const orientation = isVertical ? "vertical" : "horizontal";

  return (
    <STabs
      ref={ref}
      defaultValue={defaultActiveKey}
      value={activeKey}
      onValueChange={onChange}
      orientation={orientation}
      className={cn("gap-2", positionClasses[tabPosition].root, className)}
    >
      <div
        className={cn("flex", {
          [alignmentClasses[alignment].horizontal]: !isVertical,
          [alignmentClasses[alignment].vertical]: isVertical,
          "w-full": fullWidth && !isVertical,
        })}
      >
        <STabsList
          className={cn(
            positionClasses[tabPosition].list,
            sizeClasses[size][isVertical ? "vertical" : "horizontal"],
            tabListClassName
          )}
        >
          {items.map((item) => (
            <STabsTrigger
              key={item.key}
              value={item.key}
              disabled={item.disabled}
              className={cn(
                {
                  "flex-1": fullWidth && !isVertical,
                  "w-full justify-start": isVertical,
                },
                item.className,
                tabTriggerClassName
              )}
            >
              {item.icon && (
                <span className="mr-2 inline-flex items-center">
                  {item.icon}
                </span>
              )}
              {item.label}
            </STabsTrigger>
          ))}
        </STabsList>
      </div>
      {items.map((item) => (
        <STabsContent
          key={item.key}
          value={item.key}
          className={cn(tabContentClassName)}
        >
          {item.children}
        </STabsContent>
      ))}
    </STabs>
  );
});

Tabs.displayName = "Tabs";

export default Tabs;
