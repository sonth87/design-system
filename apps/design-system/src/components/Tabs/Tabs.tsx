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
import { Popover } from "../Popover";
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

    let rafId: number | null = null;

    const handleScroll = () => {
      // Cancel previous frame if still pending
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
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

        // Update indicator position smoothly during scroll
        const activeIndex = items.findIndex(
          (tab) => tab.key === currentActiveKey
        );
        const activeTabElement = tabRefs.current[activeIndex];
        const listElement = tabsListRef.current;

        if (activeTabElement && listElement) {
          const listRect = listElement.getBoundingClientRect();
          const tabRect = activeTabElement.getBoundingClientRect();

          const left = tabRect.left - listRect.left;
          const top = tabRect.top - listRect.top;

          setIndicatorStyle({
            left: left,
            width: tabRect.width,
            top: top,
            height: tabRect.height,
          });
        }

        rafId = null;
      });
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    scrollAreaViewport.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Recheck on resize
    const resizeObserver = new ResizeObserver(handleScroll);
    resizeObserver.observe(scrollAreaViewport);

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      scrollAreaViewport.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [overflowMode, isVertical, isOverflowing, items, currentActiveKey]);

  // Enable horizontal scrolling with mouse wheel for horizontal tabs in scroll/fade modes
  React.useEffect(() => {
    if (overflowMode !== "scroll" && overflowMode !== "fade") return;
    if (isVertical) return; // Only for horizontal tabs

    const scrollAreaViewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement;

    if (!scrollAreaViewport) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollAreaViewport.scrollLeft += e.deltaY * 2;
      }
    };

    scrollAreaViewport.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollAreaViewport.removeEventListener("wheel", handleWheel);
    };
  }, [overflowMode, isVertical]);

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
                "ds:relative ds:z-10 ds:bg-transparent ds:data-[state=active]:bg-transparent":
                  variant === "solid" ||
                  variant === "bordered" ||
                  variant === "pills",
                // Apply text color for active state with sliding indicator
                "ds:data-[state=active]:text-white":
                  (variant === "bordered" || variant === "pills") &&
                  color === "primary",
                "ds:data-[state=active]:text-white":
                  (variant === "bordered" || variant === "pills") &&
                  color === "secondary",
                "ds:data-[state=active]:text-ink700":
                  (variant === "bordered" || variant === "pills") &&
                  color === "muted",
                "ds:data-[state=active]:text-ink900":
                  (variant === "bordered" || variant === "pills") &&
                  color === "accent",
                "ds:data-[state=active]:text-white":
                  (variant === "bordered" || variant === "pills") &&
                  color === "destructive",
                "ds:data-[state=active]:text-white":
                  (variant === "bordered" || variant === "pills") &&
                  (color === "success" || color === "warning"),
                "ds:flex-1": fullWidth && !isVertical,
                "ds:w-full ds:justify-start": isVertical,
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
              <span className="ds:mr-2 ds:inline-flex ds:items-center">{item.icon}</span>
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
          "ds:relative",
          {
            "ds:overflow-hidden": overflowMode === "fade" && isOverflowing,
            "ds:max-w-full": overflowMode === "fade", // Limit width for fade mode
            // For overflow modes, allow natural width expansion
            "ds:w-auto": overflowMode === "dropdown" || overflowMode === "fade",
          }
        )}
      >
        {renderTabTriggers(visibleTabs)}

        {/* Sliding indicator for underlined variant */}
        {variant === "underlined" &&
          indicatorStyle.width > 0 &&
          !isActiveTabInOverflow && (
            <motion.div
              className={cn("ds:absolute ds:rounded-full ds:z-10", {
                // Horizontal positions (top/bottom)
                "ds:h-0.5 ds:bottom-0": tabPosition === "top",
                "ds:h-0.5 ds:top-0": tabPosition === "bottom",
                // Vertical positions (left/right)
                "ds:w-0.5 ds:right-0": tabPosition === "left",
                "ds:w-0.5 ds:left-0": tabPosition === "right",
                // Colors
                "ds:bg-primaryA-500": color === "primary",
                "ds:bg-primaryC-500": color === "secondary",
                "ds:bg-ink700": color === "muted",
                "ds:bg-ink200": color === "accent",
                "ds:bg-red600": color === "destructive",
                "ds:bg-green500": color === "success",
                "ds:bg-orange500": color === "warning",
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
              className={cn("ds:absolute ds:rounded-md ds:pointer-events-none ds:z-0", {
                "ds:bg-white ds:shadow-sm": variant === "solid",

                "ds:bg-primaryA-500":
                  (variant === "bordered" || variant === "pills") &&
                  color === "primary",
                "ds:bg-primaryC-500":
                  (variant === "bordered" || variant === "pills") &&
                  color === "secondary",
                "ds:bg-ink200":
                  (variant === "bordered" || variant === "pills") &&
                  color === "muted",
                "ds:bg-ink200":
                  (variant === "bordered" || variant === "pills") &&
                  color === "accent",
                "ds:bg-red600":
                  (variant === "bordered" || variant === "pills") &&
                  color === "destructive",
                "ds:bg-green500":
                  (variant === "bordered" || variant === "pills") &&
                  color === "success",
                "ds:bg-orange500":
                  (variant === "bordered" || variant === "pills") &&
                  color === "warning",

                "ds:border ds:rounded-full ds:border-primaryA-500":
                  variant === "pill-stroke" && color === "primary",
                "ds:border ds:rounded-full ds:border-primaryC-500":
                  variant === "pill-stroke" && color === "secondary",
                "ds:rounded-full ds:border-ink200":
                  variant === "pill-stroke" && color === "muted",
                "ds:border ds:rounded-full ds:border-ink200":
                  variant === "pill-stroke" && color === "accent",
                "ds:border ds:rounded-full ds:border-red600":
                  variant === "pill-stroke" && color === "destructive",
                "ds:border ds:rounded-full ds:border-green500":
                  variant === "pill-stroke" && color === "success",
                "ds:border ds:rounded-full ds:border-orange500":
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
            "ds:w-full": !isVertical,
            "ds:pb-2": !isVertical && isOverflowing,
            "ds:max-h-[300px] ds:*:data-radix-scroll-area-viewport:h-full ds:*:data-radix-scroll-area-viewport:max-h-[inherit]":
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
          className={cn("ds:relative ds:flex ds:items-start ds:gap-1", {
            "ds:flex-col": isVertical,
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
                  "ds:inline-flex ds:items-center ds:justify-center ds:rounded-md ds:text-sm ds:font-medium ds:ring-offset-white ds:transition-colors",
                  "ds:focus-visible:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ink500 ds:focus-visible:ring-offset-2",
                  "ds:disabled:pointer-events-none ds:disabled:opacity-50",
                  "ds:hover:bg-ink200 ds:hover:text-ink900",
                  "ds:h-9 ds:px-3 ds:shrink-0",
                  {
                    "ds:bg-ink200 ds:text-ink900": dropdownOpen,
                  }
                )}
                aria-label="More tabs"
              >
                <MoreHorizontal className="ds:h-4 ds:w-4" />
              </button>
            }
            content={
              <div className={cn("ds:flex ds:flex-col ds:gap-1 ds:p-1")}>
                {overflowTabs.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      handleValueChange(item.key);
                      setDropdownOpen(false);
                    }}
                    disabled={item.disabled}
                    className={cn(
                      "ds:flex ds:items-center ds:gap-2 ds:rounded-sm ds:px-2 ds:py-1.5 ds:text-sm",
                      "ds:hover:bg-ink200 ds:hover:text-ink900",
                      "ds:disabled:pointer-events-none ds:disabled:opacity-50",
                      "ds:text-left",
                      {
                        "ds:bg-ink200 ds:text-ink900":
                          item.key === currentActiveKey,
                      }
                    )}
                  >
                    {item.icon && (
                      <span className="ds:inline-flex ds:items-center">
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
            className="ds:w-auto ds:min-w-32 ds:max-w-sm ds:max-h-96 ds:overflow-auto ds:p-0"
          />
        </div>
      );
    }

    // Mode 3: Fade with overflow button
    if (overflowMode === "fade" && isOverflowing) {
      return (
        <div
          className={cn("ds:relative ds:flex ds:items-start ds:gap-1", {
            "ds:flex-col": isVertical,
            "ds:flex-1 ds:w-full": true, // Take full width for fade mode
          })}
        >
          {/* Fade effect for mode 3 */}
          <div
            className={cn("ds:relative ds:flex-1 ds:overflow-hidden", {
              "ds:w-full": !isVertical,
              "ds:h-full": isVertical,
            })}
          >
            <ScrollArea
              ref={scrollAreaRef}
              className={cn({
                "ds:w-full": !isVertical,
                "ds:h-full": isVertical,
              })}
            >
              {tabsListContent}
              <ScrollBar orientation={isVertical ? "vertical" : "horizontal"} />
            </ScrollArea>

            {/* Start gradient overlay (left/top) - only show when scrolled */}
            {showStartFade && (
              <div
                className={cn("ds:absolute ds:pointer-events-none ds:z-20", {
                  "ds:top-0 ds:left-0 ds:bottom-0 ds:w-24 ds:bg-linear-to-r ds:from-white ds:to-transparent":
                    !isVertical,
                  "ds:left-0 ds:right-0 ds:top-0 ds:h-24 ds:bg-linear-to-b ds:from-white ds:to-transparent":
                    isVertical,
                })}
              />
            )}

            {/* End gradient overlay (right/bottom) - only show when not at end */}
            {showEndFade && (
              <div
                className={cn("ds:absolute ds:pointer-events-none ds:z-20", {
                  "ds:top-0 ds:right-0 ds:bottom-0 ds:w-24 ds:bg-linear-to-l ds:from-white ds:to-transparent":
                    !isVertical,
                  "ds:left-0 ds:right-0 ds:bottom-0 ds:h-24 ds:bg-linear-to-t ds:from-white ds:to-transparent":
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
                  "ds:inline-flex ds:items-center ds:justify-center ds:rounded-md ds:text-sm ds:font-medium ds:ring-offset-white ds:transition-colors",
                  "ds:focus-visible:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ink500 ds:focus-visible:ring-offset-2",
                  "ds:disabled:pointer-events-none ds:disabled:opacity-50",
                  "ds:hover:bg-ink200 ds:hover:text-ink900",
                  "ds:h-9 ds:px-3 ds:shrink-0",
                  {
                    "ds:bg-ink200 ds:text-ink900": dropdownOpen,
                  }
                )}
                aria-label="More tabs"
              >
                <MoreHorizontal className="ds:h-4 ds:w-4" />
              </button>
            }
            content={
              // <div className={cn("flex flex-col gap-1 min-w-[150px]")}>
              <ScrollArea
                className="ds:min-w-[150px] ds:max-h-[256px] ds:[&_[data-radix-scroll-area-viewport]]:max-h-[256px]"
                snapType="y"
              >
                {items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      handleValueChange(item.key);
                      setDropdownOpen(false);
                    }}
                    disabled={item.disabled}
                    className={cn(
                      "ds:snap-start",
                      "ds:w-full ds:flex ds:items-center ds:gap-2 ds:rounded-sm ds:px-2 ds:py-1.5 ds:text-sm",
                      "ds:hover:bg-ink200 ds:hover:text-ink900",
                      "ds:disabled:pointer-events-none ds:disabled:opacity-50",
                      "ds:text-left",
                      {
                        "ds:bg-ink200 ds:text-ink900":
                          item.key === currentActiveKey,
                      }
                    )}
                  >
                    {item.icon && (
                      <span className="ds:inline-flex ds:items-center">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                ))}
              </ScrollArea>
              // </div>
            }
            side={isVertical ? "right" : "bottom"}
            align="end"
            className="ds:p-2"
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
      className={cn("ds:gap-2", positionClasses[tabPosition].root, className)}
    >
      <div
        ref={containerRef}
        className={cn("ds:flex", {
          [alignmentClasses[alignment].horizontal]: !isVertical,
          [alignmentClasses[alignment].vertical]: isVertical,
          "ds:w-full":
            (fullWidth ||
              overflowMode === "dropdown" ||
              overflowMode === "fade") &&
            !isVertical,
          "ds:overflow-hidden":
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
