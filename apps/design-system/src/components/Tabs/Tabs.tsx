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
import type {
  TabAlignment,
  TabColor,
  TabItem,
  TabOverflowMode,
  TabPosition,
  TabSize,
  TabVariant,
} from "./types";
import {
  alignmentClasses,
  getColorClasses,
  getEnclosedFillTriggerClasses,
  getEnclosedTriggerClasses,
  getListBorderClasses,
  getUnderlinedTriggerClasses,
  positionClasses,
  sizeClasses,
  variantClasses,
} from "./classes";

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

  // Check if tabs are overflowing (for scroll and fade modes)
  React.useLayoutEffect(() => {
    if (!overflowMode || overflowMode === "dropdown") return;

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

  // Calculate visible tabs for dropdown mode
  React.useLayoutEffect(() => {
    if (overflowMode !== "dropdown") return;

    const calculateVisibleTabs = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerSize = isVertical
        ? container.clientHeight
        : container.clientWidth;

      // Calculate how many tabs can fit including the [...] button
      let totalSize = 0;
      const dropdownButtonSize = 48; // Size of [...] button with gap
      const listPadding = 6; // p-[3px] = 6px total padding for some variants
      const gap =
        variant === "enclosed-fill" ||
        variant === "bordered" ||
        variant === "pills" ||
        variant === "pill-stroke" ||
        variant === "text" ||
        variant === "outline"
          ? 4
          : 0; // gap-1 = 4px

      let count = 0;
      for (let i = 0; i < tabRefs.current.length; i++) {
        const tab = tabRefs.current[i];
        if (!tab) break;

        const tabSize = isVertical ? tab.offsetHeight : tab.offsetWidth;
        const withGap = i > 0 ? gap : 0;

        // Check if we can fit this tab + [...] button if there are more tabs
        const hasMoreTabs = i < tabRefs.current.length - 1;
        const requiredSize =
          totalSize +
          tabSize +
          withGap +
          (hasMoreTabs ? dropdownButtonSize : 0) +
          listPadding;

        if (requiredSize <= containerSize) {
          totalSize += tabSize + withGap;
          count++;
        } else {
          break;
        }
      }

      // Only show overflow if we can't fit all tabs
      const hasHiddenTabs = count < items.length;
      setIsOverflowing(hasHiddenTabs);
      setVisibleTabsCount(Math.max(1, count));
    };

    // Initial calculation
    calculateVisibleTabs();

    // Use ResizeObserver for responsive updates
    const resizeObserver = new ResizeObserver(calculateVisibleTabs);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Also observe each tab for size changes
    tabRefs.current.forEach((tab) => {
      if (tab) resizeObserver.observe(tab);
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [items, overflowMode, isVertical, variant]);

  React.useLayoutEffect(() => {
    const activeIndex = items.findIndex((tab) => tab.key === currentActiveKey);
    const activeTabElement = tabRefs.current[activeIndex];
    const listElement = tabsListRef.current;

    if (activeTabElement && listElement) {
      const listRect = listElement.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();

      // Calculate relative position within the list
      let left = tabRect.left - listRect.left;
      let top = tabRect.top - listRect.top;

      // For fade mode, account for scroll position
      if (overflowMode === "fade" && scrollAreaRef.current) {
        const scrollAreaViewport = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        ) as HTMLElement;

        if (scrollAreaViewport) {
          if (isVertical) {
            top += scrollAreaViewport.scrollTop;
          } else {
            left += scrollAreaViewport.scrollLeft;
          }
        }
      }

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

      // Update indicator position when scrolling
      const activeIndex = items.findIndex(
        (tab) => tab.key === currentActiveKey
      );
      const activeTabElement = tabRefs.current[activeIndex];
      const listElement = tabsListRef.current;

      if (activeTabElement && listElement) {
        const listRect = listElement.getBoundingClientRect();
        const tabRect = activeTabElement.getBoundingClientRect();

        let left = tabRect.left - listRect.left;
        let top = tabRect.top - listRect.top;

        if (isVertical) {
          top += scrollAreaViewport.scrollTop;
        } else {
          left += scrollAreaViewport.scrollLeft;
        }

        setIndicatorStyle({
          left: left,
          width: tabRect.width,
          top: top,
          height: tabRect.height,
        });
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
  }, [overflowMode, isVertical, isOverflowing, items, currentActiveKey]);

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

  // For dropdown mode: show [...] button only if there are hidden tabs
  const showDropdownButton =
    overflowMode === "dropdown" && isOverflowing && overflowTabs.length > 0;

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
            // For overflow modes, allow natural width expansion
            "w-auto": overflowMode === "dropdown" || overflowMode === "fade",
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
                "bg-success": color === "success",
                "bg-warning": color === "warning",
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
          variant === "pills" ||
          variant === "pill-stroke") &&
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

                "border rounded-full border-primary":
                  variant === "pill-stroke" && color === "primary",
                "border rounded-full border-secondary":
                  variant === "pill-stroke" && color === "secondary",
                "rounded-full border-muted":
                  variant === "pill-stroke" && color === "muted",
                "border rounded-full border-accent":
                  variant === "pill-stroke" && color === "accent",
                "border rounded-full border-destructive":
                  variant === "pill-stroke" && color === "destructive",
                "border rounded-full border-success":
                  variant === "pill-stroke" && color === "success",
                "border rounded-full border-warning":
                  variant === "pill-stroke" && color === "warning",
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
            "pb-2": !isVertical && isOverflowing,
            "max-h-[300px] *:data-radix-scroll-area-viewport:h-full *:data-radix-scroll-area-viewport:max-h-[inherit]":
              isVertical,
          })}
        >
          {tabsListContent}
          <ScrollBar orientation={isVertical ? "vertical" : "horizontal"} />
        </ScrollArea>
      );
    }

    // Mode 2: Dropdown - show visible tabs + [...] button for overflow tabs
    if (overflowMode === "dropdown" && showDropdownButton) {
      return (
        <div
          className={cn("relative flex items-start gap-1", {
            "flex-col": isVertical,
          })}
        >
          {/* Show only visible tabs */}
          {tabsListContent}

          {/* Overflow menu button - only show if there are hidden tabs */}
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
              <div className={cn("flex flex-col gap-1 p-1")}>
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
            className="w-auto min-w-32 max-w-sm max-h-96 overflow-auto p-0"
          />
        </div>
      );
    }

    // Mode 3: Fade with overflow button
    if (overflowMode === "fade" && isOverflowing) {
      return (
        <div
          className={cn("relative flex items-start gap-1", {
            "flex-col": isVertical,
            "flex-1 w-full": true, // Take full width for fade mode
          })}
        >
          {/* Fade effect for mode 3 */}
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
              <ScrollBar orientation={isVertical ? "vertical" : "horizontal"} />
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

          {/* Overflow menu button - shows all tabs */}
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
                {items.map((item) => (
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
          "w-full":
            (fullWidth ||
              overflowMode === "dropdown" ||
              overflowMode === "fade") &&
            !isVertical,
          "overflow-hidden":
            overflowMode === "dropdown" || overflowMode === "fade",
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
