import * as React from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@dsui/ui/index";
import type { CalendarColor } from "./Calendar/Calendar";

const pad = (num: number): string => String(num).padStart(2, "0");

// Color variants for time picker items
const getColorClass = (color: CalendarColor = "primary"): string => {
  const colorMap = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    destructive: "text-destructive",
    muted: "text-muted-foreground",
    success: "text-success",
    error: "text-error",
    warning: "text-warning",
    foreground: "text-foreground",
  };
  return colorMap[color];
};

type TimeColumnwheelProps = {
  items: number[];
  value: number | undefined;
  onChange: (val: number) => void;
  timeLabel?: string;
  itemClassName?: string;
  isItemDisabled: (item: number) => boolean;
  disabled: boolean;
  color?: CalendarColor;
};

export const TimeColumnwheel = memo(
  React.forwardRef<HTMLDivElement, TimeColumnwheelProps>(
    (
      {
        items,
        value: selectedValue,
        onChange: onChangeCol,
        timeLabel,
        itemClassName,
        isItemDisabled,
        disabled,
        color = "primary",
      },
      ref
    ) => {
      const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
      );
      const containerRef = useRef<HTMLDivElement | null>(null);
      const [scrollTop, setScrollTop] = useState(0);

      // Debounced scroll handler
      const handleScroll = useCallback(() => {
        if (!containerRef.current || disabled) return;

        const container = containerRef.current;
        const currentScrollTop = container.scrollTop;
        setScrollTop(currentScrollTop);

        // Clear previous timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        // Set new timer
        debounceTimerRef.current = setTimeout(() => {
          const scrollTop = container.scrollTop;
          const itemHeight = 40; // h-10 = 40px
          const containerHeight = container.clientHeight;
          const dividerCenter = containerHeight / 2; // Divider lines ở giữa container

          // Calculate which item is at the divider center
          // Account for top spacer (h-30 = 120px)
          const adjustedScrollTop = scrollTop - 120;
          const dividerPosition = adjustedScrollTop + dividerCenter;

          // Find the item whose center is closest to divider center
          let closestItem = items[0];
          let minDistance = Infinity;

          items.forEach((item, index) => {
            const itemTop = index * itemHeight;
            const itemCenter = itemTop + itemHeight / 2;
            const distance = Math.abs(itemCenter - dividerPosition);

            if (distance < minDistance) {
              minDistance = distance;
              closestItem = item;
            }
          });

          // Only trigger change if different from current value and not disabled
          if (!isItemDisabled(closestItem)) {
            // Always update if item is different, or snap to correct position
            if (closestItem !== selectedValue) {
              onChangeCol(closestItem);
            } else {
              // Re-trigger to ensure input reflects the snapped value
              // This handles cases where user scrolled slightly but ended on same value
              const itemIndex = items.indexOf(closestItem);
              const targetScrollTop =
                120 +
                itemIndex * itemHeight -
                containerHeight / 2 +
                itemHeight / 2;

              if (Math.abs(container.scrollTop - targetScrollTop) > 5) {
                container.scrollTo({
                  top: targetScrollTop,
                  behavior: "smooth",
                });
              }
            }
          }
        }, 100); // 100ms debounce for faster response
      }, [items, selectedValue, onChangeCol, isItemDisabled, disabled]);

      // Set up scroll listener
      useEffect(() => {
        const container = containerRef.current;
        if (container) {
          container.addEventListener("scroll", handleScroll, { passive: true });
          return () => {
            container.removeEventListener("scroll", handleScroll);
            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current);
            }
          };
        }
      }, [handleScroll]);

      // Scroll to selected value when it changes or on mount
      useEffect(() => {
        if (containerRef.current && selectedValue !== undefined) {
          const itemIndex = items.indexOf(selectedValue);
          if (itemIndex !== -1) {
            const itemHeight = 40;
            const containerHeight = containerRef.current.clientHeight;
            const targetScrollTop =
              120 +
              itemIndex * itemHeight -
              containerHeight / 2 +
              itemHeight / 2;

            containerRef.current.scrollTo({
              top: targetScrollTop,
              behavior: "smooth",
            });
          }
        }
      }, [selectedValue, items]);

      // Cleanup on unmount
      useEffect(() => {
        return () => {
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
        };
      }, []);

      const getItemStyle = (index: number, isSelected: boolean) => {
        const itemHeight = 40;
        const containerHeight = 256; // h-64 = 256px
        const centerY = containerHeight / 2;
        const itemCenterY = 120 + index * itemHeight + itemHeight / 2; // 120px spacer + item position
        const distanceFromCenter = Math.abs(
          itemCenterY - (scrollTop + centerY)
        );
        const maxDistance = containerHeight / 2;

        // Calculate opacity and scale based on distance
        const opacity = Math.max(
          0.3,
          1 - (distanceFromCenter / maxDistance) * 0.7
        );
        const fontSize = isSelected ? "1.3rem" : "1rem";

        return {
          opacity,
          fontSize,
          transition: "opacity 0.2s ease, transform 0.2s ease",
        };
      };

      return (
        <div className="ds:flex ds:flex-col ds:items-center ds:gap-2 ds:w-full ds:h-full ds:max-h-72">
          {timeLabel && (
            <div className="ds:text-xs ds:font-semibold ds:text-muted-foreground ds:uppercase ds:p-2 ds:border-b ds:w-full ds:text-center ds:h-8">
              {timeLabel}
            </div>
          )}
          <div
            className={cn(
              "ds:relative ds:w-full",
              timeLabel ? "ds:h-[calc(100%_-_2rem)]" : " ds:h-full"
            )}
          >
            {/* wheel style divider lines */}
            <div className="ds:absolute ds:top-1/2 ds:left-0 ds:right-0 ds:h-10 ds:-translate-y-1/2 ds:border-t ds:border-b ds:border-border ds:pointer-events-none ds:z-10" />

            <div
              ref={(el) => {
                containerRef.current = el;
                if (typeof ref === "function") {
                  ref(el);
                } else if (ref) {
                  ref.current = el;
                }
              }}
              className={cn(
                "ds:relative ds:h-full ds:w-full ds:min-w-20 ds:min-h-60 ds:overflow-y-scroll ds:scroll-smooth",
                "ds:[&::-webkit-scrollbar]:w-1 ds:[&::-webkit-scrollbar-track]:bg-transparent",
                "ds:[&::-webkit-scrollbar-thumb]:bg-border ds:[&::-webkit-scrollbar-thumb]:rounded",
                "ds:flex ds:flex-col ds:snap-y ds:snap-mandatory",
                itemClassName
              )}
              style={{
                maskImage: `linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)`,
                WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)`,
              }}
            >
              {/* Spacer Top */}
              <div className="ds:h-[calc(50%-1.25rem)] ds:flex-shrink-0" />

              {items.map((item, index) => {
                const itemDisabled = isItemDisabled(item);
                const isSelected =
                  selectedValue !== undefined && item === selectedValue;
                const itemStyle = getItemStyle(index, isSelected);

                return (
                  <div
                    key={item}
                    onClick={
                      disabled || itemDisabled
                        ? undefined
                        : () => onChangeCol(item)
                    }
                    data-selected={isSelected || undefined}
                    className={cn(
                      "ds:h-10 ds:flex-shrink-0 ds:flex ds:items-center ds:justify-center ds:transition-all ds:snap-center",
                      "ds:cursor-pointer ds:text-lg ds:font-medium ds:select-none",
                      "ds:disabled:opacity-30 ds:disabled:cursor-not-allowed ds:disabled:line-through",
                      isSelected
                        ? `${getColorClass(color)} ds:font-bold`
                        : "ds:text-muted-foreground"
                    )}
                    style={itemStyle}
                  >
                    {pad(item)}
                  </div>
                );
              })}

              {/* Spacer Bottom */}
              <div className="ds:h-[calc(50%-1.25rem)] ds:flex-shrink-0" />
            </div>
          </div>
        </div>
      );
    }
  )
);

TimeColumnwheel.displayName = "TimeColumnwheel";
