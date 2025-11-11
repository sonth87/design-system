import * as React from "react";
import { memo, useMemo } from "react";
import { cn } from "@dsui/ui/index";
import Button from "./Button/Button";

const pad = (num: number): string => String(num).padStart(2, "0");

type TimeGridViewProps = {
  HOURS: number[];
  MINUTES: number[];
  hours: number | undefined;
  minutes: number | undefined;
  disabled: boolean;
  isTimeDisabled: (h: number, m: number, s: number) => boolean;
  onTimeSelect: (h: number, m: number) => void;
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

      const currentValue = hours !== undefined && minutes !== undefined ? `${pad(hours)}:${pad(minutes)}` : "";

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
                      ? "bg-primary text-primary-foreground font-semibold"
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
