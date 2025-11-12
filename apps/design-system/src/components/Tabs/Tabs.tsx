import React from "react";
import {
  Tabs as STabs,
  TabsList as STabsList,
  TabsTrigger as STabsTrigger,
  TabsContent as STabsContent,
} from "@dsui/ui/components/tabs";
import { motion } from "motion/react";
import { cn } from "@dsui/ui/lib/utils";
import { ScrollArea, ScrollBar } from "../ScrollArea/ScrollArea";
import Popover from "../Popover/Popover";
import { MoreHorizontal } from "lucide-react";

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
export type TabOverflowMode =
  | "scroll" // Scrollable tabs when overflow
  | "dropdown" // Show only visible tabs, rest in dropdown menu
  | "fade"; // Show all tabs with fade effect and dropdown button

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

  // Overflow handling
  overflowMode?: TabOverflowMode;

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
    overflowMode = "scroll",
    variant = "solid",
    color = "muted",
    className,
    tabListClassName,
    tabContentClassName,
    tabTriggerClassName,
  } = props;

  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const tabsListRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

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

  // Overflow state management
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const [visibleTabsCount, setVisibleTabsCount] = React.useState(items.length);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  // Fade state management for scroll position
  const [showStartFade, setShowStartFade] = React.useState(false);
  const [showEndFade, setShowEndFade] = React.useState(false);

  const currentActiveKey =
    activeKey !== undefined ? activeKey : internalActiveKey;

  const isVertical = tabPosition === "left" || tabPosition === "right";

  // Check if tabs are overflowing
  React.useEffect(() => {
    if (!overflowMode) return;

    const checkOverflow = () => {
      const container = containerRef.current;
      const listElement = tabsListRef.current;

      if (!container || !listElement) return;

      const containerSize = isVertical
        ? container.clientHeight
        : container.clientWidth;
      const listSize = isVertical
        ? listElement.scrollHeight
        : listElement.scrollWidth;

      const hasOverflow = listSize > containerSize;
      setIsOverflowing(hasOverflow);

      if (hasOverflow && overflowMode === "dropdown") {
        // Calculate how many tabs can fit
        let totalSize = 0;
        const dropdownButtonSize = 48; // Approximate size of [...] button
        const availableSize = containerSize - dropdownButtonSize;

        let count = 0;
        for (let i = 0; i < tabRefs.current.length; i++) {
          const tab = tabRefs.current[i];
          if (!tab) break;

          const tabSize = isVertical ? tab.offsetHeight : tab.offsetWidth;
          if (totalSize + tabSize <= availableSize) {
            totalSize += tabSize;
            count++;
          } else {
            break;
          }
        }

        setVisibleTabsCount(Math.max(1, count));
      }
    };

    // Initial check
    checkOverflow();

    // Use ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (tabsListRef.current) {
      resizeObserver.observe(tabsListRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [items, overflowMode, isVertical]);

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

      // Auto-scroll to active tab in fade mode
      if (overflowMode === "fade" && scrollAreaRef.current) {
        const scrollAreaViewport = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        ) as HTMLElement;

        if (scrollAreaViewport) {
          const viewportRect = scrollAreaViewport.getBoundingClientRect();
          const tabRectInViewport = activeTabElement.getBoundingClientRect();
          const fadeWidth = 96; // 24 * 4 = 96px (w-24 class)

          if (isVertical) {
            // Scroll vertically
            const scrollTop = scrollAreaViewport.scrollTop;
            const scrollHeight = scrollAreaViewport.scrollHeight;
            const viewportHeight = viewportRect.height;
            const tabTop = tabRectInViewport.top - viewportRect.top + scrollTop;
            const tabHeight = tabRectInViewport.height;

            // If it's the first tab, scroll to the very top
            if (activeIndex === 0) {
              scrollAreaViewport.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
            // If it's the last tab, scroll to the very bottom
            else if (activeIndex === items.length - 1) {
              scrollAreaViewport.scrollTo({
                top: scrollHeight - viewportHeight,
                behavior: "smooth",
              });
            }
            // For middle tabs, try to center them with padding to avoid fade
            else {
              const targetScrollTop =
                tabTop - viewportHeight / 2 + tabHeight / 2;
              const maxScroll = scrollHeight - viewportHeight;

              // Ensure we don't scroll beyond bounds and leave space for fade
              const clampedScroll = Math.max(
                fadeWidth / 2,
                Math.min(targetScrollTop, maxScroll - fadeWidth / 2)
              );

              scrollAreaViewport.scrollTo({
                top: clampedScroll,
                behavior: "smooth",
              });
            }
          } else {
            // Scroll horizontally
            const scrollLeft = scrollAreaViewport.scrollLeft;
            const scrollWidth = scrollAreaViewport.scrollWidth;
            const viewportWidth = viewportRect.width;
            const tabLeft =
              tabRectInViewport.left - viewportRect.left + scrollLeft;
            const tabWidth = tabRectInViewport.width;

            // If it's the first tab, scroll to the very left
            if (activeIndex === 0) {
              scrollAreaViewport.scrollTo({
                left: 0,
                behavior: "smooth",
              });
            }
            // If it's the last tab, scroll to the very right
            else if (activeIndex === items.length - 1) {
              scrollAreaViewport.scrollTo({
                left: scrollWidth - viewportWidth,
                behavior: "smooth",
              });
            }
            // For middle tabs, try to center them with padding to avoid fade
            else {
              const targetScrollLeft =
                tabLeft - viewportWidth / 2 + tabWidth / 2;
              const maxScroll = scrollWidth - viewportWidth;

              // Ensure we don't scroll beyond bounds and leave space for fade
              const clampedScroll = Math.max(
                fadeWidth / 2,
                Math.min(targetScrollLeft, maxScroll - fadeWidth / 2)
              );

              scrollAreaViewport.scrollTo({
                left: clampedScroll,
                behavior: "smooth",
              });
            }
          }
        }
      }
    }
  }, [currentActiveKey, items, isVertical, overflowMode]);

  // Handle scroll events for fade mode to show/hide fade gradients
  React.useEffect(() => {
    if (overflowMode !== "fade" || !scrollAreaRef.current) return;

    const scrollAreaViewport = scrollAreaRef.current.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;

    if (!scrollAreaViewport) return;

    const handleScroll = () => {
      const threshold = 5; // Small threshold to account for floating point precision

      if (isVertical) {
        const scrollTop = scrollAreaViewport.scrollTop;
        const scrollHeight = scrollAreaViewport.scrollHeight;
        const clientHeight = scrollAreaViewport.clientHeight;

        setShowStartFade(scrollTop > threshold);
        setShowEndFade(scrollTop < scrollHeight - clientHeight - threshold);
      } else {
        const scrollLeft = scrollAreaViewport.scrollLeft;
        const scrollWidth = scrollAreaViewport.scrollWidth;
        const clientWidth = scrollAreaViewport.clientWidth;

        setShowStartFade(scrollLeft > threshold);
        setShowEndFade(scrollLeft < scrollWidth - clientWidth - threshold);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    scrollAreaViewport.addEventListener("scroll", handleScroll);

    // Recheck on resize
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(scrollAreaViewport);

    return () => {
      scrollAreaViewport.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [overflowMode, isVertical, isOverflowing]);

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

  // Determine which tabs to show based on overflow mode
  const visibleTabs =
    overflowMode === "dropdown" && isOverflowing
      ? items.slice(0, visibleTabsCount)
      : items;

  const overflowTabs =
    overflowMode === "dropdown" && isOverflowing
      ? items.slice(visibleTabsCount)
      : overflowMode === "fade" && isOverflowing
        ? items
        : [];

  // Check if active tab is in overflow (hidden) tabs
  const isActiveTabInOverflow =
    overflowMode === "dropdown" &&
    isOverflowing &&
    overflowTabs.some((tab) => tab.key === currentActiveKey);

  const renderTabTriggers = (tabItems: TabItem[], startIndex = 0) => (
    <>
      {tabItems.map((item, index) => {
        const actualIndex = startIndex + index;
        return (
          <STabsTrigger
            key={item.key}
            ref={(el) => {
              tabRefs.current[actualIndex] = el;
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
              <span className="mr-2 inline-flex items-center">{item.icon}</span>
            )}
            {item.label}
          </STabsTrigger>
        );
      })}
    </>
  );

  const renderTabsList = () => {
    const tabsListContent = (
      <STabsList
        ref={tabsListRef}
        className={cn(
          positionClasses[tabPosition].list,
          sizeClasses[size][isVertical ? "vertical" : "horizontal"],
          listVariantClass,
          listBorderClass,
          tabListClassName,
          "relative",
          {
            "overflow-hidden": overflowMode === "fade" && isOverflowing,
            "max-w-full": overflowMode === "fade", // Limit width for fade mode
          }
        )}
      >
        {renderTabTriggers(visibleTabs)}

        {/* Sliding indicator for underlined variant */}
        {variant === "underlined" &&
          indicatorStyle.width > 0 &&
          !isActiveTabInOverflow && (
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
          indicatorStyle.width > 0 &&
          !isActiveTabInOverflow && (
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
    );

    // Mode 1: Scroll - wrap in ScrollArea with ScrollBar
    if (overflowMode === "scroll") {
      return (
        <ScrollArea
          ref={scrollAreaRef}
          className={cn({
            "w-full": !isVertical,
            "pb-3": !isVertical && isOverflowing,
            "max-h-80": isVertical,
          })}
        >
          {tabsListContent}
          <ScrollBar orientation={isVertical ? "vertical" : "horizontal"} />
        </ScrollArea>
      );
    }

    // Mode 2 & 3: Dropdown or Fade with overflow button
    if (
      (overflowMode === "dropdown" || overflowMode === "fade") &&
      isOverflowing
    ) {
      return (
        <div
          className={cn("relative flex items-start gap-1", {
            "flex-col": isVertical,
            "flex-1 w-full": overflowMode === "fade", // Take full width for fade mode
          })}
        >
          {/* Fade effect for mode 3 */}
          {overflowMode === "fade" && (
            <div
              className={cn("relative flex-1 overflow-hidden", {
                "w-full": !isVertical,
                "h-full": isVertical,
              })}
            >
              <ScrollArea
                ref={scrollAreaRef}
                className={cn({
                  "w-full": !isVertical,
                  "h-full": isVertical,
                })}
              >
                {tabsListContent}
                <ScrollBar
                  orientation={isVertical ? "vertical" : "horizontal"}
                />
              </ScrollArea>

              {/* Start gradient overlay (left/top) - only show when scrolled */}
              {showStartFade && (
                <div
                  className={cn("absolute pointer-events-none z-20", {
                    "top-0 left-0 bottom-0 w-24 bg-linear-to-r from-background to-transparent":
                      !isVertical,
                    "left-0 right-0 top-0 h-24 bg-linear-to-b from-background to-transparent":
                      isVertical,
                  })}
                />
              )}

              {/* End gradient overlay (right/bottom) - only show when not at end */}
              {showEndFade && (
                <div
                  className={cn("absolute pointer-events-none z-20", {
                    "top-0 right-0 bottom-0 w-24 bg-linear-to-l from-background to-transparent":
                      !isVertical,
                    "left-0 right-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent":
                      isVertical,
                  })}
                />
              )}
            </div>
          )}

          {/* Show tabs list without fade for dropdown mode */}
          {overflowMode === "dropdown" && tabsListContent}

          {/* Overflow menu button */}
          <Popover
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
            trigger={
              <button
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-50",
                  "hover:bg-accent hover:text-accent-foreground",
                  "h-9 px-3 shrink-0",
                  {
                    "bg-accent text-accent-foreground": dropdownOpen,
                  }
                )}
                aria-label="More tabs"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            }
            content={
              <div className={cn("flex flex-col gap-1 p-1 min-w-[150px]")}>
                {overflowTabs.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      handleValueChange(item.key);
                      setDropdownOpen(false);
                    }}
                    disabled={item.disabled}
                    className={cn(
                      "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                      "hover:bg-accent hover:text-accent-foreground",
                      "disabled:pointer-events-none disabled:opacity-50",
                      "text-left",
                      {
                        "bg-accent text-accent-foreground":
                          item.key === currentActiveKey,
                      }
                    )}
                  >
                    {item.icon && (
                      <span className="inline-flex items-center">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            }
            side={isVertical ? "right" : "bottom"}
            align="end"
          />
        </div>
      );
    }

    return tabsListContent;
  };

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
        ref={containerRef}
        className={cn("flex", {
          [alignmentClasses[alignment].horizontal]: !isVertical,
          [alignmentClasses[alignment].vertical]: isVertical,
          "w-full": fullWidth && !isVertical,
        })}
      >
        {renderTabsList()}
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
