import React from "react";
import {
  Tabs as STabs,
  TabsList as STabsList,
  TabsTrigger as STabsTrigger,
  TabsContent as STabsContent,
} from "@dsui/ui/components/tabs";
import { motion } from "motion/react";
import { cn } from "@dsui/ui/lib/utils";

export type TabPosition = "top" | "bottom" | "left" | "right";
export type TabSize = "sm" | "md" | "lg";
export type TabVariant =
  | "solid" // Default muted background with shadow on active
  | "bordered" // Border around group + colored background on active
  | "pills" // Colored pills without group border
  | "pill-stroke" // Pill-style with stroke border, no background on active
  | "text" // Text color only, minimal style
  | "outline" // Outlined/stroked border on active
  | "underlined" // Underline/border-bottom style
  | "enclosed" // Browser tab style, connects to content
  | "enclosed-fill"; // Browser tab style with background on inactive tabs
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
    case "pill-stroke":
      // Border color on active state, no background
      return `${colors.border} data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent`;
    case "text":
      // Text color only on active state
      return colors.text;
    case "outline":
      // Border color on active state
      return colors.border;
    case "underlined":
      // Bottom/side border color on active state
      return cn(colors.border, colors.text);
    case "enclosed":
      // Border color on active state (except bottom/side)
      return cn(colors.border, colors.text);
    case "enclosed-fill":
      // Border color on active state (except bottom/side)
      return cn(colors.border, colors.text);
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

    const colorBorderMap: Record<TabPosition, Record<TabColor, string>> = {
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

  if (variant === "enclosed-fill") {
    // Enclosed-fill variant: colored border on the opposite side
    const borderBaseMap: Record<TabPosition, string> = {
      top: "border-b",
      bottom: "border-t",
      left: "border-r",
      right: "border-l",
    };

    const colorBorderMap: Record<TabPosition, Record<TabColor, string>> = {
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

// Get trigger border classes for enclosed variant based on position
const getEnclosedTriggerClasses = (tabPosition: TabPosition): string => {
  const baseClasses =
    "bg-background dark:bg-background border border-transparent data-[state=active]:shadow-none rounded-none";

  const positionMap: Record<TabPosition, string> = {
    top: `${baseClasses} rounded-t-md data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:border-b-0 data-[state=active]:border-b-background dark:data-[state=active]:border-b-background h-full data-[state=active]:-mb-0.5 data-[state=active]:translate-y-[0px]`,
    bottom: `${baseClasses} rounded-b-md data-[state=active]:border-b data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:border-t-0 data-[state=active]:border-t-background dark:data-[state=active]:border-t-background h-full data-[state=active]:-mt-0.5 data-[state=active]:translate-y-[0px]`,
    left: `${baseClasses} rounded-l-md data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-b data-[state=active]:border-r-0 data-[state=active]:border-r-background dark:data-[state=active]:border-r-background w-full data-[state=active]:-mr-0.5 data-[state=active]:translate-x-[1px]`,
    right: `${baseClasses} rounded-r-md data-[state=active]:border-t data-[state=active]:border-r data-[state=active]:border-b data-[state=active]:border-l-0 data-[state=active]:border-l-background dark:data-[state=active]:border-l-background w-full data-[state=active]:-ml-0.5 data-[state=active]:translate-x-[1px]`,
  };

  return positionMap[tabPosition];
};

// Get trigger border classes for enclosed-fill variant based on position
const getEnclosedFillTriggerClasses = (tabPosition: TabPosition): string => {
  const baseClasses =
    "bg-muted dark:bg-muted border border-transparent data-[state=active]:bg-background dark:data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none";

  const positionMap: Record<TabPosition, string> = {
    top: `${baseClasses} rounded-t-md data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:border-b-0 data-[state=active]:border-b-background dark:data-[state=active]:border-b-background h-full data-[state=active]:-mb-0.5 data-[state=active]:translate-y-[0px]`,
    bottom: `${baseClasses} rounded-b-md data-[state=active]:border-b data-[state=active]:border-l data-[state=active]:border-r data-[state=active]:border-t-0 data-[state=active]:border-t-background dark:data-[state=active]:border-t-background h-full data-[state=active]:-mt-0.5 data-[state=active]:translate-y-[0px]`,
    left: `${baseClasses} rounded-l-md data-[state=active]:border-t data-[state=active]:border-l data-[state=active]:border-b data-[state=active]:border-r-0 data-[state=active]:border-r-background dark:data-[state=active]:border-r-background w-full data-[state=active]:-mr-0.5 data-[state=active]:translate-x-[1px]`,
    right: `${baseClasses} rounded-r-md data-[state=active]:border-t data-[state=active]:border-r data-[state=active]:border-b data-[state=active]:border-l-0 data-[state=active]:border-l-background dark:data-[state=active]:border-l-background w-full data-[state=active]:-ml-0.5 data-[state=active]:translate-x-[1px]`,
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
      horizontal: "",
      vertical: "",
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

  // Pill-stroke: Pill-style with stroke border, stronger border radius, no background on active
  "pill-stroke": {
    list: {
      horizontal: "bg-transparent p-0 gap-1",
      vertical: "bg-transparent p-0 gap-1",
    },
    trigger: {
      horizontal: "border border-border rounded-full bg-transparent",
      vertical: "border border-border rounded-full bg-transparent",
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
      vertical: "bg-background dark:bg-background items-start rounded-none p-0",
    },
    trigger: {
      horizontal: "", // Will be set dynamically
      vertical: "", // Will be set dynamically
    },
  },

  // Enclosed-fill: Border on active tab except bottom border with background on inactive tabs
  "enclosed-fill": {
    list: {
      horizontal:
        "bg-background dark:bg-background justify-start rounded-none p-0 gap-1",
      vertical:
        "bg-background dark:bg-background items-start rounded-none p-0 gap-1",
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
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const tabsListRef = React.useRef<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<{
    left: number;
    width: number;
    top: number;
    height: number;
  }>({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
  });
  const [internalActiveKey, setInternalActiveKey] = React.useState<
    string | undefined
  >(activeKey || defaultActiveKey || items[0]?.key);

  const currentActiveKey =
    activeKey !== undefined ? activeKey : internalActiveKey;

  const isVertical = tabPosition === "left" || tabPosition === "right";

  React.useLayoutEffect(() => {
    const activeIndex = items.findIndex((tab) => tab.key === currentActiveKey);
    const activeTabElement = tabRefs.current[activeIndex];
    const listElement = tabsListRef.current;

    if (activeTabElement && listElement) {
      const listRect = listElement.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();

      // Calculate relative position within the list
      const left = tabRect.left - listRect.left;
      const top = tabRect.top - listRect.top;

      setIndicatorStyle({
        left: left,
        width: tabRect.width,
        top: top,
        height: tabRect.height,
      });
    }
  }, [currentActiveKey, items, isVertical]);

  const handleValueChange = (key: string) => {
    if (activeKey === undefined) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  };

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
  } else if (variant === "enclosed-fill") {
    triggerVariantClass = getEnclosedFillTriggerClasses(tabPosition);
  }

  // Get color classes based on variant
  const triggerColorClass = getColorClasses(variant, color);
  const listBorderClass = getListBorderClasses(variant, color, tabPosition);

  return (
    <STabs
      ref={ref}
      defaultValue={defaultActiveKey}
      value={currentActiveKey}
      onValueChange={handleValueChange}
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
          ref={tabsListRef}
          className={cn(
            positionClasses[tabPosition].list,
            sizeClasses[size][isVertical ? "vertical" : "horizontal"],
            listVariantClass,
            listBorderClass,
            tabListClassName,
            "relative"
          )}
        >
          {items.map((item, index) => (
            <STabsTrigger
              key={item.key}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              value={item.key}
              disabled={item.disabled}
              className={cn(
                triggerVariantClass,
                // Apply styles based on variant
                {
                  // For sliding indicator variants, remove default background
                  "relative z-10 bg-transparent data-[state=active]:bg-transparent":
                    variant === "solid" ||
                    variant === "bordered" ||
                    variant === "pills",
                  // Apply text color for active state with sliding indicator
                  "data-[state=active]:text-primary-foreground":
                    (variant === "bordered" || variant === "pills") &&
                    color === "primary",
                  "data-[state=active]:text-secondary-foreground":
                    (variant === "bordered" || variant === "pills") &&
                    color === "secondary",
                  "data-[state=active]:text-muted-foreground":
                    (variant === "bordered" || variant === "pills") &&
                    color === "muted",
                  "data-[state=active]:text-accent-foreground":
                    (variant === "bordered" || variant === "pills") &&
                    color === "accent",
                  "data-[state=active]:text-destructive-foreground":
                    (variant === "bordered" || variant === "pills") &&
                    color === "destructive",
                  "data-[state=active]:text-white":
                    (variant === "bordered" || variant === "pills") &&
                    (color === "success" || color === "warning"),
                  "flex-1": fullWidth && !isVertical,
                  "w-full justify-start": isVertical,
                },
                // For other variants, apply normal color classes
                !(
                  variant === "solid" ||
                  variant === "bordered" ||
                  variant === "pills"
                ) && triggerColorClass,
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
          {/* Sliding indicator for underlined variant */}
          {variant === "underlined" && indicatorStyle.width > 0 && (
            <motion.div
              className={cn("absolute rounded-full z-10", {
                // Horizontal positions (top/bottom)
                "h-0.5 bottom-0": tabPosition === "top",
                "h-0.5 top-0": tabPosition === "bottom",
                // Vertical positions (left/right)
                "w-0.5 right-0": tabPosition === "left",
                "w-0.5 left-0": tabPosition === "right",
                // Colors
                "bg-primary": color === "primary",
                "bg-secondary": color === "secondary",
                "bg-muted-foreground": color === "muted",
                "bg-accent": color === "accent",
                "bg-destructive": color === "destructive",
                "bg-green-500": color === "success",
                "bg-yellow-500": color === "warning",
              })}
              animate={
                isVertical
                  ? {
                      top: indicatorStyle.top,
                      height: indicatorStyle.height,
                    }
                  : {
                      left: indicatorStyle.left,
                      width: indicatorStyle.width,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
          {/* Sliding indicator for solid, bordered, pills variants */}
          {(variant === "solid" ||
            variant === "bordered" ||
            variant === "pills") &&
            indicatorStyle.width > 0 && (
              <motion.div
                className={cn("absolute rounded-md pointer-events-none z-0", {
                  "bg-background shadow-sm": variant === "solid",
                  "bg-primary":
                    (variant === "bordered" || variant === "pills") &&
                    color === "primary",
                  "bg-secondary":
                    (variant === "bordered" || variant === "pills") &&
                    color === "secondary",
                  "bg-muted":
                    (variant === "bordered" || variant === "pills") &&
                    color === "muted",
                  "bg-accent":
                    (variant === "bordered" || variant === "pills") &&
                    color === "accent",
                  "bg-destructive":
                    (variant === "bordered" || variant === "pills") &&
                    color === "destructive",
                  "bg-success":
                    (variant === "bordered" || variant === "pills") &&
                    color === "success",
                  "bg-warning":
                    (variant === "bordered" || variant === "pills") &&
                    color === "warning",
                })}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  top: indicatorStyle.top,
                  height: indicatorStyle.height,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
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
