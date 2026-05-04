import * as React from "react";
import { memo, useMemo } from "react";
import { cn } from "@dsui/ui/index";
import Button from "./Button/Button";
import type { CalendarColor } from "./Calendar/Calendar";

const pad = (num: number): string => String(num).padStart(2, "0");

// Color variants for time grid items
const getColorClasses = (color: CalendarColor = "primary") => {
  const colorMap = {
    primary: {
      bg: "ds:bg-primary",
      text: "ds:text-primary-foreground",
    },
    secondary: {
      bg: "ds:bg-secondary",
      text: "ds:text-secondary-foreground",
    },
    accent: {
      bg: "ds:bg-accent",
      text: "ds:text-accent-foreground",
    },
    destructive: {
      bg: "ds:bg-destructive",
      text: "ds:text-destructive-foreground",
    },
    muted: {
      bg: "ds:bg-muted",
      text: "ds:text-muted-foreground",
    },
    success: {
      bg: "ds:bg-success",
      text: "ds:text-success-foreground",
    },
    error: {
      bg: "ds:bg-error",
      text: "ds:text-error-foreground",
    },
    warning: {
      bg: "ds:bg-warning",
      text: "ds:text-warning-foreground",
    },
    foreground: {
      bg: "ds:bg-foreground",
      text: "ds:text-background",
    },
  };
  return colorMap[color];
};

type TimeGridViewProps = {
  HOURS: number[];
  MINUTES: number[];
  hours: number | undefined;
  minutes: number | undefined;
  disabled: boolean;
  isTimeDisabled: (h: number, m: number, s: number) => boolean;
  onTimeSelect: (h: number, m: number) => void;
  color?: CalendarColor;
};

export const TimeGridView = memo(
  React.forwardRef<HTMLDivElement, TimeGridViewProps>(
    (
      {
        HOURS,
        MINUTES,
        hours,
        minutes,
        disabled,
        isTimeDisabled,
        onTimeSelect,
        color = "primary",
      },
      ref
    ) => {
      // Generate all time combinations based on intervals (always HH:mm, never shows seconds)
      const timeOptions = useMemo(() => {
        const options: Array<{ h: number; m: number; display: string }> = [];

        for (const h of HOURS) {
          for (const m of MINUTES) {
            options.push({
              h,
              m,
              display: `${pad(h)}:${pad(m)}`,
            });
          }
        }

        return options;
      }, [HOURS, MINUTES]);

      const currentValue =
        hours !== undefined && minutes !== undefined
          ? `${pad(hours)}:${pad(minutes)}`
          : "";

      const handleTimeSelect = (h: number, m: number) => {
        // Always set seconds to 0 in grid mode
        if (!isTimeDisabled(h, m, 0)) {
          onTimeSelect(h, m);
        }
      };

      return (
        <div className="ds:flex ds:flex-col ds:gap-2">
          <div
            ref={ref}
            className="ds:flex ds:flex-col ds:gap-1 ds:h-64 overflow-y-auto ds:p-2 ds:rounded-md"
          >
            {timeOptions.map(({ h, m, display }) => {
              const itemDisabled = isTimeDisabled(h, m, 0);
              const isSelected = display === currentValue;
              const colorClasses = getColorClasses(color);

              return (
                <Button
                  key={display}
                  type="button"
                  variant="outline"
                  onClick={() => handleTimeSelect(h, m)}
                  data-selected={isSelected || undefined}
                  disabled={disabled || itemDisabled}
                  size="sm"
                  className={cn(
                    isSelected
                      ? `${colorClasses.bg} ${colorClasses.text} font-semibold`
                      : "ds:text-foreground"
                  )}
                >
                  {display}
                </Button>
              );
            })}
          </div>
        </div>
      );
    }
  )
);

TimeGridView.displayName = "TimeGridView";
