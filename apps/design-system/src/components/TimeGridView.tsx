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
      bg: "bg-primary",
      text: "text-primary-foreground",
    },
    secondary: {
      bg: "bg-secondary",
      text: "text-secondary-foreground",
    },
    accent: {
      bg: "bg-accent",
      text: "text-accent-foreground",
    },
    destructive: {
      bg: "bg-destructive",
      text: "text-destructive-foreground",
    },
    muted: {
      bg: "bg-muted",
      text: "text-muted-foreground",
    },
    success: {
      bg: "bg-success",
      text: "text-success-foreground",
    },
    error: {
      bg: "bg-error",
      text: "text-error-foreground",
    },
    warning: {
      bg: "bg-warning",
      text: "text-warning-foreground",
    },
    foreground: {
      bg: "bg-foreground",
      text: "text-background",
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
        <div className="flex flex-col gap-2">
          <div
            ref={ref}
            className="flex flex-col gap-1 h-64 overflow-y-auto p-2 rounded-md"
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
                      : "text-foreground"
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
