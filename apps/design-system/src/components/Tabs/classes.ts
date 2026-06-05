import { cn } from "@dsui/ui/index";
import type {
  TabAlignment,
  TabColor,
  TabPosition,
  TabSize,
  TabVariant,
} from "./types";

export const sizeClasses: Record<
  TabSize,
  { horizontal: string; vertical: string }
> = {
  sm: {
    horizontal: "ds:text-xs ds:h-7 ds:[&>button]:px-2",
    vertical: "ds:text-xs ds:[&>button]:py-0.5",
  },
  md: {
    horizontal: "ds:text-sm ds:h-9 ds:[&>button]:px-3",
    vertical: "ds:text-sm ds:[&>button]:py-1",
  },
  lg: {
    horizontal: "ds:text-base ds:h-11 ds:[&>button]:px-4",
    vertical: "ds:text-base ds:[&>button]:py-1.5",
  },
};

export const alignmentClasses: Record<
  TabAlignment,
  { horizontal: string; vertical: string }
> = {
  start: {
    horizontal: "ds:justify-start",
    vertical: "ds:items-start",
  },
  center: {
    horizontal: "ds:justify-center",
    vertical: "ds:items-center",
  },
  end: {
    horizontal: "ds:justify-end",
    vertical: "ds:items-end",
  },
};

export const positionClasses: Record<
  TabPosition,
  { root: string; list: string }
> = {
  top: {
    root: "ds:flex ds:flex-col",
    list: "ds:flex-row",
  },
  bottom: {
    root: "ds:flex ds:flex-col-reverse",
    list: "ds:flex-row",
  },
  left: {
    root: "ds:flex ds:flex-row",
    list: "ds:flex-col ds:h-fit",
  },
  right: {
    root: "ds:flex ds:flex-row-reverse",
    list: "ds:flex-col ds:h-fit",
  },
};

// Color classes for backgrounds, text, and borders
export const getColorClasses = (
  variant: TabVariant,
  color: TabColor
): string => {
  // Helper to generate color-specific classes based on variant
  const colorMap: Record<
    TabColor,
    { bg: string; text: string; border: string }
  > = {
    primary: {
      bg: "ds:data-[state=active]:bg-primary ds:dark:data-[state=active]:bg-primary ds:data-[state=active]:text-primary-foreground ds:dark:data-[state=active]:text-primary-foreground",
      text: "ds:data-[state=active]:text-primary ds:dark:data-[state=active]:text-primary",
      border:
        "ds:data-[state=active]:border-primary ds:dark:data-[state=active]:border-primary",
    },
    secondary: {
      bg: "ds:data-[state=active]:bg-secondary ds:dark:data-[state=active]:bg-secondary ds:data-[state=active]:text-secondary-foreground ds:dark:data-[state=active]:text-secondary-foreground",
      text: "ds:data-[state=active]:text-secondary ds:dark:data-[state=active]:text-secondary",
      border:
        "ds:data-[state=active]:border-secondary ds:dark:data-[state=active]:border-secondary",
    },
    muted: {
      bg: "ds:data-[state=active]:bg-muted ds:dark:data-[state=active]:bg-muted ds:data-[state=active]:text-muted-foreground ds:dark:data-[state=active]:text-muted-foreground",
      text: "ds:data-[state=active]:text-muted-foreground ds:dark:data-[state=active]:text-muted-foreground",
      border:
        "ds:data-[state=active]:border-border ds:dark:data-[state=active]:border-border",
    },
    accent: {
      bg: "ds:data-[state=active]:bg-accent ds:dark:data-[state=active]:bg-accent ds:data-[state=active]:text-accent-foreground ds:dark:data-[state=active]:text-accent-foreground",
      text: "ds:data-[state=active]:text-accent-foreground ds:dark:data-[state=active]:text-accent-foreground",
      border:
        "ds:data-[state=active]:border-accent ds:dark:data-[state=active]:border-accent",
    },
    destructive: {
      bg: "ds:data-[state=active]:bg-destructive ds:dark:data-[state=active]:bg-destructive ds:data-[state=active]:text-destructive-foreground ds:dark:data-[state=active]:text-destructive-foreground",
      text: "ds:data-[state=active]:text-destructive ds:dark:data-[state=active]:text-destructive",
      border:
        "ds:data-[state=active]:border-destructive ds:dark:data-[state=active]:border-destructive",
    },
    success: {
      bg: "ds:data-[state=active]:bg-success ds:dark:data-[state=active]:bg-success ds:data-[state=active]:text-success-foreground ds:dark:data-[state=active]:text-success-foreground",
      text: "ds:data-[state=active]:text-success ds:dark:data-[state=active]:text-success",
      border:
        "ds:data-[state=active]:border-success ds:dark:data-[state=active]:border-success",
    },
    warning: {
      bg: "ds:data-[state=active]:bg-warning ds:dark:data-[state=active]:bg-warning ds:data-[state=active]:text-warning-foreground ds:dark:data-[state=active]:text-warning-foreground",
      text: "ds:data-[state=active]:text-warning ds:dark:data-[state=active]:text-warning",
      border:
        "ds:data-[state=active]:border-warning ds:dark:data-[state=active]:border-warning",
    },
  };

  const colors = colorMap[color];

  switch (variant) {
    case "bordered":
    case "pills":
      // Background color on active state
      return `${colors.bg} ds:dark:data-[state=active]:border-transparent`;
    case "pill-stroke":
      // Border color on active state, no background
      return `ds:data-[state=active]:bg-transparent ds:dark:data-[state=active]:bg-transparent`;
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
export const getListBorderClasses = (
  variant: TabVariant,
  color: TabColor,
  tabPosition: TabPosition
): string => {
  if (variant === "underlined") {
    // Underlined variant: border on the opposite side from where tabs connect
    const borderMap: Record<TabPosition, string> = {
      top: "ds:border-b",
      bottom: "ds:border-t",
      left: "ds:border-r",
      right: "ds:border-l",
    };
    return borderMap[tabPosition];
  }

  if (variant === "enclosed") {
    // Enclosed variant: colored border on the opposite side
    const borderBaseMap: Record<TabPosition, string> = {
      top: "ds:border-b",
      bottom: "ds:border-t",
      left: "ds:border-r",
      right: "ds:border-l",
    };

    const colorBorderMap: Record<TabPosition, Record<TabColor, string>> = {
      top: {
        primary: "ds:border-b-primary",
        secondary: "ds:border-b-secondary",
        muted: "ds:border-b-border",
        accent: "ds:border-b-accent",
        destructive: "ds:border-b-destructive",
        success: "ds:border-b-success",
        warning: "ds:border-b-warning",
      },
      bottom: {
        primary: "ds:border-t-primary",
        secondary: "ds:border-t-secondary",
        muted: "ds:border-t-border",
        accent: "ds:border-t-accent",
        destructive: "ds:border-t-destructive",
        success: "ds:border-t-success",
        warning: "ds:border-t-warning",
      },
      left: {
        primary: "ds:border-r-primary",
        secondary: "ds:border-r-secondary",
        muted: "ds:border-r-border",
        accent: "ds:border-r-accent",
        destructive: "ds:border-r-destructive",
        success: "ds:border-r-success",
        warning: "ds:border-r-warning",
      },
      right: {
        primary: "ds:border-l-primary",
        secondary: "ds:border-l-secondary",
        muted: "ds:border-l-border",
        accent: "ds:border-l-accent",
        destructive: "ds:border-l-destructive",
        success: "ds:border-l-success",
        warning: "ds:border-l-warning",
      },
    };
    return `${borderBaseMap[tabPosition]} ${colorBorderMap[tabPosition][color]}`;
  }

  if (variant === "enclosed-fill") {
    // Enclosed-fill variant: colored border on the opposite side
    const borderBaseMap: Record<TabPosition, string> = {
      top: "ds:border-b",
      bottom: "ds:border-t",
      left: "ds:border-r",
      right: "ds:border-l",
    };

    const colorBorderMap: Record<TabPosition, Record<TabColor, string>> = {
      top: {
        primary: "ds:border-b-primary",
        secondary: "ds:border-b-secondary",
        muted: "ds:border-b-border",
        accent: "ds:border-b-accent",
        destructive: "ds:border-b-destructive",
        success: "ds:border-b-success",
        warning: "ds:border-b-warning",
      },
      bottom: {
        primary: "ds:border-t-primary",
        secondary: "ds:border-t-secondary",
        muted: "ds:border-t-border",
        accent: "ds:border-t-accent",
        destructive: "ds:border-t-destructive",
        success: "ds:border-t-success",
        warning: "ds:border-t-warning",
      },
      left: {
        primary: "ds:border-r-primary",
        secondary: "ds:border-r-secondary",
        muted: "ds:border-r-border",
        accent: "ds:border-r-accent",
        destructive: "ds:border-r-destructive",
        success: "ds:border-r-success",
        warning: "ds:border-r-warning",
      },
      right: {
        primary: "ds:border-l-primary",
        secondary: "ds:border-l-secondary",
        muted: "ds:border-l-border",
        accent: "ds:border-l-accent",
        destructive: "ds:border-l-destructive",
        success: "ds:border-l-success",
        warning: "ds:border-l-warning",
      },
    };
    return `${borderBaseMap[tabPosition]} ${colorBorderMap[tabPosition][color]}`;
  }

  return "";
};

// Get trigger border classes for underlined variant based on position
export const getUnderlinedTriggerClasses = (
  tabPosition: TabPosition
): string => {
  const baseClasses =
    "ds:bg-background ds:dark:bg-background ds:rounded-none ds:border-0 ds:border-transparent ds:data-[state=active]:shadow-none";

  const positionMap: Record<TabPosition, string> = {
    top: `${baseClasses} ds:border-b-2 ds:h-full`,
    bottom: `${baseClasses} ds:border-t-2 ds:h-full`,
    left: `${baseClasses} ds:border-r-2 ds:w-full`,
    right: `${baseClasses} ds:border-l-2 ds:w-full`,
  };

  return positionMap[tabPosition];
};

// Get trigger border classes for enclosed variant based on position
export const getEnclosedTriggerClasses = (tabPosition: TabPosition): string => {
  const baseClasses =
    "ds:bg-background ds:dark:bg-background ds:border ds:border-transparent ds:data-[state=active]:shadow-none ds:rounded-none";

  const positionMap: Record<TabPosition, string> = {
    top: `${baseClasses} ds:rounded-t-md ds:data-[state=active]:border-t ds:data-[state=active]:border-l ds:data-[state=active]:border-r ds:data-[state=active]:border-b-0 ds:data-[state=active]:border-b-background dark:ds:data-[state=active]:border-b-background ds:h-full ds:data-[state=active]:-mb-0.5 ds:data-[state=active]:translate-y-[0px]`,
    bottom: `${baseClasses} ds:rounded-b-md ds:data-[state=active]:border-b ds:data-[state=active]:border-l ds:data-[state=active]:border-r ds:data-[state=active]:border-t-0 ds:data-[state=active]:border-t-background dark:ds:data-[state=active]:border-t-background ds:h-full ds:data-[state=active]:-mt-0.5 ds:data-[state=active]:translate-y-[0px]`,
    left: `${baseClasses} ds:rounded-l-md ds:data-[state=active]:border-t ds:data-[state=active]:border-l ds:data-[state=active]:border-b ds:data-[state=active]:border-r-0 ds:data-[state=active]:border-r-background dark:ds:data-[state=active]:border-r-background ds:w-full ds:data-[state=active]:-mr-0.5 ds:data-[state=active]:translate-x-[1px]`,
    right: `${baseClasses} ds:rounded-r-md ds:data-[state=active]:border-t ds:data-[state=active]:border-r ds:data-[state=active]:border-b ds:data-[state=active]:border-l-0 ds:data-[state=active]:border-l-background dark:ds:data-[state=active]:border-l-background ds:w-full ds:data-[state=active]:-ml-0.5 ds:data-[state=active]:translate-x-[1px]`,
  };

  return positionMap[tabPosition];
};

// Get trigger border classes for enclosed-fill variant based on position
export const getEnclosedFillTriggerClasses = (
  tabPosition: TabPosition
): string => {
  const baseClasses =
    "ds:bg-muted ds:dark:bg-muted ds:border ds:border-transparent ds:data-[state=active]:bg-background ds:dark:data-[state=active]:bg-background ds:data-[state=active]:shadow-none ds:rounded-none";

  const positionMap: Record<TabPosition, string> = {
    top: `${baseClasses} ds:rounded-t-md ds:data-[state=active]:border-t ds:data-[state=active]:border-l ds:data-[state=active]:border-r ds:data-[state=active]:border-b-0 ds:data-[state=active]:border-b-background dark:ds:data-[state=active]:border-b-background ds:h-full ds:data-[state=active]:-mb-0.5 ds:data-[state=active]:translate-y-[0px]`,
    bottom: `${baseClasses} ds:rounded-b-md ds:data-[state=active]:border-b ds:data-[state=active]:border-l ds:data-[state=active]:border-r ds:data-[state=active]:border-t-0 ds:data-[state=active]:border-t-background dark:ds:data-[state=active]:border-t-background ds:h-full ds:data-[state=active]:-mt-0.5 ds:data-[state=active]:translate-y-[0px]`,
    left: `${baseClasses} ds:rounded-l-md ds:data-[state=active]:border-t ds:data-[state=active]:border-l ds:data-[state=active]:border-b ds:data-[state=active]:border-r-0 ds:data-[state=active]:border-r-background dark:ds:data-[state=active]:border-r-background ds:w-full ds:data-[state=active]:-mr-0.5 ds:data-[state=active]:translate-x-[1px]`,
    right: `${baseClasses} ds:rounded-r-md ds:data-[state=active]:border-t ds:data-[state=active]:border-r ds:data-[state=active]:border-b ds:data-[state=active]:border-l-0 ds:data-[state=active]:border-l-background dark:ds:data-[state=active]:border-l-background ds:w-full ds:data-[state=active]:-ml-0.5 ds:data-[state=active]:translate-x-[1px]`,
  };

  return positionMap[tabPosition];
};

export const variantClasses: Record<
  TabVariant,
  {
    list: { horizontal: string; vertical: string };
    trigger: { horizontal: string; vertical: string };
  }
> = {
  // Solid: Default style (muted background, active has white background)
  solid: {
    list: {
      horizontal: "ds:bg-muted ds:dark:bg-muted ds:rounded-lg ds:p-[3px]",
      vertical: "ds:bg-muted ds:dark:bg-muted ds:rounded-lg ds:p-[3px]",
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
        "ds:bg-background ds:dark:bg-background ds:border ds:p-1 ds:gap-1 ds:rounded-lg",
      vertical: "ds:bg-background ds:dark:bg-background ds:border ds:p-1 ds:gap-1 ds:rounded-lg",
    },
    trigger: {
      horizontal: "",
      vertical: "",
    },
  },

  // Pills: No border/background on group, colored background on active button
  pills: {
    list: {
      horizontal: "ds:bg-transparent ds:p-0 ds:gap-1",
      vertical: "ds:bg-transparent ds:p-0 ds:gap-1",
    },
    trigger: {
      horizontal: "",
      vertical: "",
    },
  },

  // Pill-stroke: Pill-style with stroke border, stronger border radius, no background on active
  "pill-stroke": {
    list: {
      horizontal: "ds:bg-transparent ds:p-0 ds:gap-1",
      vertical: "ds:bg-transparent ds:p-0 ds:gap-1",
    },
    trigger: {
      horizontal: "ds:border ds:border-border ds:rounded-full ds:bg-transparent",
      vertical: "ds:border ds:border-border ds:rounded-full ds:bg-transparent",
    },
  },

  // Text: No border/background on group, colored text on active button
  text: {
    list: {
      horizontal: "ds:bg-transparent ds:p-0 ds:gap-1",
      vertical: "ds:bg-transparent ds:p-0 ds:gap-1",
    },
    trigger: {
      horizontal:
        "ds:bg-transparent ds:data-[state=active]:bg-transparent ds:data-[state=active]:shadow-none",
      vertical:
        "ds:bg-transparent ds:data-[state=active]:bg-transparent ds:data-[state=active]:shadow-none",
    },
  },

  // Outline: No border/background on group, colored border (stroke) on active button
  outline: {
    list: {
      horizontal: "ds:bg-transparent ds:p-0 ds:gap-1",
      vertical: "ds:bg-transparent ds:p-0 ds:gap-1",
    },
    trigger: {
      horizontal:
        "ds:bg-transparent ds:border ds:border-transparent ds:data-[state=active]:bg-transparent ds:data-[state=active]:shadow-none",
      vertical:
        "ds:bg-transparent ds:border ds:border-transparent ds:data-[state=active]:bg-transparent ds:data-[state=active]:shadow-none",
    },
  },

  // Underlined: Bottom border on group, bottom border on active tab
  underlined: {
    list: {
      horizontal: "ds:bg-background ds:dark:bg-background ds:rounded-none ds:p-0",
      vertical: "ds:bg-background ds:dark:bg-background ds:rounded-none ds:p-0",
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
        "ds:bg-background ds:dark:bg-background ds:justify-start ds:rounded-none ds:p-0",
      vertical: "ds:bg-background ds:dark:bg-background ds:items-start ds:rounded-none ds:p-0",
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
        "ds:bg-background ds:dark:bg-background ds:justify-start ds:rounded-none ds:p-0 ds:gap-1",
      vertical:
        "ds:bg-background ds:dark:bg-background ds:items-start ds:rounded-none ds:p-0 ds:gap-1",
    },
    trigger: {
      horizontal: "", // Will be set dynamically
      vertical: "", // Will be set dynamically
    },
  },
};
