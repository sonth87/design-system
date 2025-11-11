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
export type TabVariant =
  | "solid" // Default muted background with shadow on active
  | "bordered" // Border around group + colored background on active
  | "pills" // Colored pills without group border
  | "text" // Text color only, minimal style
  | "outline" // Outlined/stroked border on active
  | "underlined" // Underline/border-bottom style
  | "enclosed"; // Browser tab style, connects to content
export type TabColor =
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "destructive"
  | "success"
  | "warning";

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
  variant?: TabVariant;
  color?: TabColor;
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

// Color classes for backgrounds, text, and borders
const getColorClasses = (variant: TabVariant, color: TabColor): string => {
  // Helper to generate color-specific classes based on variant
  const colorMap: Record<
    TabColor,
    { bg: string; text: string; border: string }
  > = {
    primary: {
      bg: "data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:text-primary-foreground",
      text: "data-[state=active]:text-primary dark:data-[state=active]:text-primary",
      border:
        "data-[state=active]:border-primary dark:data-[state=active]:border-primary",
    },
    secondary: {
      bg: "data-[state=active]:bg-secondary dark:data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground dark:data-[state=active]:text-secondary-foreground",
      text: "data-[state=active]:text-secondary dark:data-[state=active]:text-secondary",
      border:
        "data-[state=active]:border-secondary dark:data-[state=active]:border-secondary",
    },
    muted: {
      bg: "data-[state=active]:bg-muted dark:data-[state=active]:bg-muted data-[state=active]:text-muted-foreground dark:data-[state=active]:text-muted-foreground",
      text: "data-[state=active]:text-muted-foreground dark:data-[state=active]:text-muted-foreground",
      border:
        "data-[state=active]:border-border dark:data-[state=active]:border-border",
    },
    accent: {
      bg: "data-[state=active]:bg-accent dark:data-[state=active]:bg-accent data-[state=active]:text-accent-foreground dark:data-[state=active]:text-accent-foreground",
      text: "data-[state=active]:text-accent-foreground dark:data-[state=active]:text-accent-foreground",
      border:
        "data-[state=active]:border-accent dark:data-[state=active]:border-accent",
    },
    destructive: {
      bg: "data-[state=active]:bg-destructive dark:data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground dark:data-[state=active]:text-destructive-foreground",
      text: "data-[state=active]:text-destructive dark:data-[state=active]:text-destructive",
      border:
        "data-[state=active]:border-destructive dark:data-[state=active]:border-destructive",
    },
    success: {
      bg: "data-[state=active]:bg-success dark:data-[state=active]:bg-success data-[state=active]:text-success-foreground dark:data-[state=active]:text-success-foreground",
      text: "data-[state=active]:text-success dark:data-[state=active]:text-success",
      border:
        "data-[state=active]:border-success dark:data-[state=active]:border-success",
    },
    warning: {
      bg: "data-[state=active]:bg-warning dark:data-[state=active]:bg-warning data-[state=active]:text-warning-foreground dark:data-[state=active]:text-warning-foreground",
      text: "data-[state=active]:text-warning dark:data-[state=active]:text-warning",
      border:
        "data-[state=active]:border-warning dark:data-[state=active]:border-warning",
    },
  };

  const colors = colorMap[color];

  switch (variant) {
    case "bordered":
    case "pills":
      // Background color on active state
      return `${colors.bg} dark:data-[state=active]:border-transparent`;
    case "text":
      // Text color only on active state
      return colors.text;
    case "outline":
      // Border color on active state
      return colors.border;
    case "underlined":
      // Bottom/side border color on active state
      return colors.border;
    case "enclosed":
      // Border color on active state (except bottom/side)
      return colors.border;
    default:
      return "";
  }
};

// Get TabsList border classes based on position
const getListBorderClasses = (
  variant: TabVariant,
  color: TabColor,
  tabPosition: TabPosition
): string => {
  if (variant === "underlined") {
    // Underlined variant: border on the opposite side from where tabs connect
    const borderMap: Record<TabPosition, string> = {
      top: "border-b",
      bottom: "border-t",
      left: "border-r",
      right: "border-l",
    };
    return borderMap[tabPosition];
  }

  if (variant === "enclosed") {
    // Enclosed variant: colored border on the opposite side
    const borderBaseMap: Record<TabPosition, string> = {
      top: "border-b",
      bottom: "border-t",
      left: "border-r",
      right: "border-l",
    };
    
    const colorBorderMap: Record<
      TabPosition,
      Record<TabColor, string>
    > = {
      top: {
        primary: "border-b-primary",
        secondary: "border-b-secondary",
        muted: "border-b-border",
        accent: "border-b-accent",
        destructive: "border-b-destructive",
        success: "border-b-success",
        warning: "border-b-warning",
      },
      bottom: {
        primary: "border-t-primary",
        secondary: "border-t-secondary",
        muted: "border-t-border",
        accent: "border-t-accent",
        destructive: "border-t-destructive",
        success: "border-t-success",
        warning: "border-t-warning",
      },
      left: {
        primary: "border-r-primary",
        secondary: "border-r-secondary",
        muted: "border-r-border",
        accent: "border-r-accent",
        destructive: "border-r-destructive",
        success: "border-r-success",
        warning: "border-r-warning",
      },
      right: {
        primary: "border-l-primary",
        secondary: "border-l-secondary",
        muted: "border-l-border",
        accent: "border-l-accent",
        destructive: "border-l-destructive",
        success: "border-l-success",
        warning: "border-l-warning",
      },
    };
    return `${borderBaseMap[tabPosition]} ${colorBorderMap[tabPosition][color]}`;
  }

  return "";
};

// Get trigger border classes for enclosed variant based on position
const getEnclosedTriggerClasses = (tabPosition: TabPosition): string => {
  const baseClasses =
    "bg-background dark:bg-background border border-transparent data-[state=active]:shadow-none rounded-none";

  const positionMap: Record<TabPosition, string> = {
    top: `${baseClasses} rounded-t data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:border-b-0 data-[state=active]:border-b-background dark:data-[state=active]:border-b-background h-full data-[state=active]:-mb-0.5 data-[state=active]:translate-y-[0px]`,
    bottom: `${baseClasses} rounded-b data-[state=active]:border-b data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:border-t-0 data-[state=active]:border-t-background dark:data-[state=active]:border-t-background h-full data-[state=active]:-mt-0.5 data-[state=active]:translate-y-[0px]`,
    left: `${baseClasses} rounded-l data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-b data-[state=active]:border-r-0 data-[state=active]:border-r-background dark:data-[state=active]:border-r-background w-full data-[state=active]:-mr-0.5 data-[state=active]:translate-x-[0.5px]`,
    right: `${baseClasses} rounded-r data-[state=active]:border-t data-[state=active]:border-r data-[state=active]:border-b data-[state=active]:border-l-0 data-[state=active]:border-l-background dark:data-[state=active]:border-l-background w-full data-[state=active]:-ml-0.5 data-[state=active]:translate-x-[0.5px]`,
  };

  return positionMap[tabPosition];
};

// Get trigger border classes for underlined variant based on position
const getUnderlinedTriggerClasses = (tabPosition: TabPosition): string => {
  const baseClasses =
    "bg-background dark:bg-background rounded-none border-0 border-transparent data-[state=active]:shadow-none";

  const positionMap: Record<TabPosition, string> = {
    top: `${baseClasses} border-b-2 h-full`,
    bottom: `${baseClasses} border-t-2 h-full`,
    left: `${baseClasses} border-r-2 w-full`,
    right: `${baseClasses} border-l-2 w-full`,
  };

  return positionMap[tabPosition];
};

const variantClasses: Record<
  TabVariant,
  {
    list: { horizontal: string; vertical: string };
    trigger: { horizontal: string; vertical: string };
  }
> = {
  // Solid: Default style (muted background, active has white background)
  solid: {
    list: {
      horizontal: "bg-muted dark:bg-muted rounded-lg p-[3px]",
      vertical: "bg-muted dark:bg-muted rounded-lg p-[3px]",
    },
    trigger: {
      horizontal:
        "data-[state=active]:bg-background dark:data-[state=active]:bg-background data-[state=active]:shadow-sm",
      vertical:
        "data-[state=active]:bg-background dark:data-[state=active]:bg-background data-[state=active]:shadow-sm",
    },
  },

  // Bordered: With border on group and colored active background
  bordered: {
    list: {
      horizontal:
        "bg-background dark:bg-background border p-1 gap-1 rounded-lg",
      vertical: "bg-background dark:bg-background border p-1 gap-1 rounded-lg",
    },
    trigger: {
      horizontal: "",
      vertical: "",
    },
  },

  // Pills: No border/background on group, colored background on active button
  pills: {
    list: {
      horizontal: "bg-transparent p-0 gap-1",
      vertical: "bg-transparent p-0 gap-1",
    },
    trigger: {
      horizontal: "",
      vertical: "",
    },
  },

  // Text: No border/background on group, colored text on active button
  text: {
    list: {
      horizontal: "bg-transparent p-0 gap-1",
      vertical: "bg-transparent p-0 gap-1",
    },
    trigger: {
      horizontal:
        "bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none",
      vertical:
        "bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none",
    },
  },

  // Outline: No border/background on group, colored border (stroke) on active button
  outline: {
    list: {
      horizontal: "bg-transparent p-0 gap-1",
      vertical: "bg-transparent p-0 gap-1",
    },
    trigger: {
      horizontal:
        "bg-transparent border border-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none",
      vertical:
        "bg-transparent border border-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none",
    },
  },

  // Underlined: Bottom border on group, bottom border on active tab
  underlined: {
    list: {
      horizontal: "bg-background dark:bg-background rounded-none p-0",
      vertical: "bg-background dark:bg-background rounded-none p-0",
    },
    trigger: {
      horizontal: "", // Will be set dynamically
      vertical: "", // Will be set dynamically
    },
  },

  // Enclosed: Border on active tab except bottom border (tab style)
  enclosed: {
    list: {
      horizontal:
        "bg-background dark:bg-background justify-start rounded-none p-0",
      vertical:
        "bg-background dark:bg-background items-start rounded-none p-0",
    },
    trigger: {
      horizontal: "", // Will be set dynamically
      vertical: "", // Will be set dynamically
    },
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
    variant = "solid",
    color = "muted",
    className,
    tabListClassName,
    tabContentClassName,
    tabTriggerClassName,
  } = props;

  const isVertical = tabPosition === "left" || tabPosition === "right";
  const orientation = isVertical ? "vertical" : "horizontal";

  // Get variant classes
  const variantConfig = variantClasses[variant];
  const listVariantClass =
    variantConfig.list[isVertical ? "vertical" : "horizontal"];
  
  // Get trigger variant class based on variant type
  let triggerVariantClass =
    variantConfig.trigger[isVertical ? "vertical" : "horizontal"];
  
  // For underlined and enclosed variants, use dynamic classes based on position
  if (variant === "underlined") {
    triggerVariantClass = getUnderlinedTriggerClasses(tabPosition);
  } else if (variant === "enclosed") {
    triggerVariantClass = getEnclosedTriggerClasses(tabPosition);
  }

  // Get color classes based on variant
  const triggerColorClass = getColorClasses(variant, color);
  const listBorderClass = getListBorderClasses(variant, color, tabPosition);

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
            listVariantClass,
            listBorderClass,
            tabListClassName
          )}
        >
          {items.map((item) => (
            <STabsTrigger
              key={item.key}
              value={item.key}
              disabled={item.disabled}
              className={cn(
                triggerVariantClass,
                triggerColorClass,
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
