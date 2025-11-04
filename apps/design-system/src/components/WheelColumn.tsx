import * as React from "react";
import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@dsui/ui/index";

const pad = (num: number): string => String(num).padStart(2, "0");

type TimeColumnwheelProps = {
  items: number[];
  value: number;
  onChange: (val: number) => void;
  timeLabel?: string;
  itemClassName?: string;
  isItemDisabled: (item: number) => boolean;
  disabled: boolean;
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
      },
      ref
    ) => {
      const debounceTimerRef = useRef<number | null>(null);
      const containerRef = useRef<HTMLDivElement | null>(null);

      // Debounced scroll handler
      const handleScroll = useCallback(() => {
        if (!containerRef.current || disabled) return;

        // Clear previous timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        // Set new timer
        debounceTimerRef.current = setTimeout(() => {
          const container = containerRef.current;
          if (!container) return;

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
          if (closestItem !== selectedValue && !isItemDisabled(closestItem)) {
            onChangeCol(closestItem);
          }
        }, 150); // 150ms debounce
      }, [items, selectedValue, onChangeCol, isItemDisabled, disabled]);

      // Set up scroll listener
      useEffect(() => {
        const container = containerRef.current;
        if (container) {
          container.addEventListener('scroll', handleScroll, { passive: true });
          return () => {
            container.removeEventListener('scroll', handleScroll);
            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current);
            }
          };
        }
      }, [handleScroll]);

      // Cleanup on unmount
      useEffect(() => {
        return () => {
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
        };
      }, []);

      return (
        <div className="flex flex-col items-center gap-2">
          {timeLabel && (
            <div className="text-xs font-semibold text-muted-foreground uppercase">
              {timeLabel}
            </div>
          )}
          <div className="relative">
            {/* wheel style divider lines */}
            <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 border-t border-b border-border pointer-events-none z-10" />

            <div
              ref={(el) => {
                containerRef.current = el;
                if (typeof ref === 'function') {
                  ref(el);
                } else if (ref) {
                  ref.current = el;
                }
              }}
              className={cn(
                "relative h-64 w-20 overflow-y-scroll scroll-smooth",
                "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded",
                "flex flex-col snap-y snap-mandatory",
                itemClassName
              )}
              style={{
                maskImage: `linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)`,
                WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)`,
              }}
            >
              {/* Spacer Top */}
              <div className="h-30 flex-shrink-0" />

              {items.map((item) => {
                const itemDisabled = isItemDisabled(item);

                return (
                  <div
                    key={item}
                    onClick={
                      disabled || itemDisabled
                        ? undefined
                        : () => onChangeCol(item)
                    }
                    data-selected={item === selectedValue || undefined}
                    className={cn(
                      "h-10 flex-shrink-0 flex items-center justify-center transition-all snap-center",
                      "cursor-pointer text-lg font-medium",
                      "disabled:opacity-30 disabled:cursor-not-allowed disabled:line-through",
                      item === selectedValue
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    )}
                  >
                    {pad(item)}
                  </div>
                );
              })}

              {/* Spacer Bottom */}
              <div className="h-30 flex-shrink-0" />
            </div>
          </div>
        </div>
      );
    }
  )
);

TimeColumnwheel.displayName = "TimeColumnwheel";
