import * as React from "react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { cn } from "@dsui/ui/index";
import Button from "../Button/Button";
import Select from "../Select/Select";
import Input, { type InputProps } from "../Input/Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@dsui/ui/components/popover";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@dsui/ui/components/drawer";
import { isMobile } from "react-device-detect";
import { Clock } from "lucide-react";
import { TimeColumnwheel } from "../../components/WheelColumn";
import { TimeGridView } from "../../components/TimeGridView";

export type TimePickerMode = "wheel" | "select" | "compact";

export type DisabledTimeRange = {
  from: string; // Format: "HH:mm" or "HH:mm:ss"
  to: string; // Format: "HH:mm" or "HH:mm:ss"
};

export type TimePickerProps = Omit<
  InputProps,
  "value" | "onChange" | "onSelect" | "mask" | "children"
> & {
  value?: Date;
  onChange?: (date: Date) => void;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  disabled?: boolean;
  className?: string;
  timeLabel?: boolean | { hours?: string; minutes?: string; seconds?: string };

  // New configuration options
  mode?: TimePickerMode; // Display mode: 'wheel' (default), 'select', 'compact'
  hourInterval?: number; // Hour interval (e.g., 1, 2, 3) - defaults to 1
  minuteInterval?: number; // Minute interval (e.g., 5, 10, 15, 30) - defaults to 1
  secondInterval?: number; // Second interval (e.g., 5, 10, 15, 30) - defaults to 1
  disabledTimes?: string[]; // Array of disabled times in "HH:mm" or "HH:mm:ss" format
  disabledTimeRanges?: DisabledTimeRange[]; // Array of disabled time ranges
  showNowButton?: boolean; // Show "Now" button to select current time
  nowButtonLabel?: string; // Label for "Now" button (defaults to "Now")

  // Standalone mode configuration
  standalone?: boolean; // When true (default), TimePicker shows as a drawer/popover with trigger. When false, it's used as an integrated component (e.g., inside DatePicker)
  desktopMode?: "popover" | "drawer"; // Desktop display mode for standalone: 'popover' or 'drawer'
  mobileMode?: "popover" | "drawer"; // Mobile display mode for standalone: 'popover' or 'drawer'
};

const generateIntervalArray = (max: number, interval: number = 1): number[] => {
  const result: number[] = [];
  for (let i = 0; i < max; i += interval) {
    result.push(i);
  }
  return result;
};

const pad = (num: number): string => String(num).padStart(2, "0");

const formatTime = (
  date: Date | undefined,
  showSeconds: boolean = false
): string => {
  if (!date) return "";
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  if (showSeconds) {
    const seconds = pad(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}`;
};

export function TimePicker({
  value,
  onChange,
  showHours = true,
  showMinutes = true,
  showSeconds = false,
  disabled = false,
  className,
  timeLabel,
  mode = "wheel",
  hourInterval = 1,
  minuteInterval = 1,
  secondInterval = 1,
  disabledTimes = [],
  disabledTimeRanges = [],
  showNowButton = false,
  nowButtonLabel = "Now",
  standalone = true,
  desktopMode = "popover",
  mobileMode = "drawer",
  ...props
}: TimePickerProps) {
  const date = React.useMemo(() => value || new Date(), [value]);

  const [hours, setHours] = useState(date.getHours());
  const [minutes, setMinutes] = useState(date.getMinutes());
  const [seconds, setSeconds] = useState(date.getSeconds());
  const [standaloneOpen, setStandaloneOpen] = useState(false);

  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Generate time arrays based on intervals
  const HOURS = useMemo(
    () => generateIntervalArray(24, hourInterval),
    [hourInterval]
  );
  const MINUTES = useMemo(
    () => generateIntervalArray(60, minuteInterval),
    [minuteInterval]
  );
  const SECONDS = useMemo(
    () => generateIntervalArray(60, secondInterval),
    [secondInterval]
  );

  // Helper function to check if a time is disabled
  const isTimeDisabled = useCallback(
    (h: number, m: number, s: number = 0): boolean => {
      const timeStr = `${pad(h)}:${pad(m)}${showSeconds ? `:${pad(s)}` : ""}`;

      // Check if specific time is disabled
      if (disabledTimes.includes(timeStr)) {
        return true;
      }

      // Check if time is in a disabled range
      for (const range of disabledTimeRanges) {
        const [fromH, fromM, fromS = 0] = range.from.split(":").map(Number);
        const [toH, toM, toS = 0] = range.to.split(":").map(Number);

        const currentTime = h * 3600 + m * 60 + s;
        const fromTime = fromH * 3600 + fromM * 60 + fromS;
        const toTime = toH * 3600 + toM * 60 + toS;

        if (currentTime >= fromTime && currentTime <= toTime) {
          return true;
        }
      }

      return false;
    },
    [disabledTimes, disabledTimeRanges, showSeconds]
  );

  // Find nearest valid time
  const findNearestValidTime = useCallback(
    (
      targetH: number,
      targetM: number,
      targetS: number = 0
    ): { h: number; m: number; s: number } => {
      // Find nearest hour
      const nearestH = HOURS.reduce((prev, curr) =>
        Math.abs(curr - targetH) < Math.abs(prev - targetH) ? curr : prev
      );

      // Find nearest minute
      const nearestM = MINUTES.reduce((prev, curr) =>
        Math.abs(curr - targetM) < Math.abs(prev - targetM) ? curr : prev
      );

      // Find nearest second
      const nearestS = SECONDS.reduce((prev, curr) =>
        Math.abs(curr - targetS) < Math.abs(prev - targetS) ? curr : prev
      );

      // If the nearest time is disabled, find the next available time
      if (isTimeDisabled(nearestH, nearestM, nearestS)) {
        // Try to find next available time
        for (const h of HOURS) {
          for (const m of MINUTES) {
            for (const s of SECONDS) {
              if (!isTimeDisabled(h, m, s)) {
                return { h, m, s };
              }
            }
          }
        }
      }

      return { h: nearestH, m: nearestM, s: nearestS };
    },
    [HOURS, MINUTES, SECONDS, isTimeDisabled]
  );

  const updateDateTime = useCallback(
    (h: number, m: number, s: number) => {
      const newDate = new Date(date);
      newDate.setHours(h, m, s, 0);
      onChange?.(newDate);
    },
    [date, onChange]
  );

  const handleHourChange = (h: number) => {
    if (!isTimeDisabled(h, minutes, seconds)) {
      setHours(h);
      updateDateTime(h, minutes, seconds);
    }
  };

  const handleMinuteChange = (m: number) => {
    if (!isTimeDisabled(hours, m, seconds)) {
      setMinutes(m);
      updateDateTime(hours, m, seconds);
    }
  };

  const handleSecondChange = (s: number) => {
    if (!isTimeDisabled(hours, minutes, s)) {
      setSeconds(s);
      updateDateTime(hours, minutes, s);
    }
  };

  const scrollHandler = useCallback(() => {
    if (mode === "wheel") {
      // Scroll to selected item when picker opens (only for initial load)
      scrollToSelected(hoursRef);
      scrollToSelected(minutesRef);
      scrollToSelected(secondsRef);
    } else if (mode === "compact") {
      // Scroll to selected item in grid mode
      scrollToSelected(gridRef);
    }
  }, [hoursRef, minutesRef, secondsRef, gridRef, mode]);

  const handleNowClick = () => {
    const now = new Date();
    const { h, m, s } = findNearestValidTime(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    updateDateTime(h, m, s);
    setTimeout(() => scrollHandler(), 100);
  };

  // Scroll to center item when selected
  const scrollToSelected = useCallback(
    (ref: RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        const selected = ref.current.querySelector(
          "[data-selected]"
        ) as HTMLElement;
        if (selected) {
          const container = ref.current;
          const containerHeight = container.clientHeight;
          const selectedTop = selected.offsetTop;
          const selectedHeight = selected.clientHeight;

          const scrollPosition =
            selectedTop - containerHeight / 2 + selectedHeight / 2;

          container.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
      }
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => scrollHandler(), 100);
    return () => clearTimeout(timer);
  }, [standaloneOpen, mode, scrollToSelected]);

  // Normal Mode - Dropdown/Input style
  const TimeColumnNormal = memo(
    ({
      items,
      value: selectedValue,
      onChange: onChangeCol,
      timeLabel,
      type,
    }: {
      items: number[];
      value: number;
      onChange: (val: number) => void;
      timeLabel?: string;
      type: "hours" | "minutes" | "seconds";
    }) => (
      <div className="flex flex-col gap-2">
        {timeLabel && (
          <label className="text-xs font-semibold text-muted-foreground uppercase">
            {timeLabel}
          </label>
        )}
        <Select
          value={selectedValue.toString()}
          onValueChange={(value) => onChangeCol(Number(value))}
          disabled={disabled}
          clearable={false}
          search={false}
          className={cn(
            "h-10 px-3 py-2 rounded-md border border-border w-16",
            "text-sm font-medium cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          options={items.map((item) => {
            const itemDisabled =
              (type === "hours" && isTimeDisabled(item, minutes, seconds)) ||
              (type === "minutes" && isTimeDisabled(hours, item, seconds)) ||
              (type === "seconds" && isTimeDisabled(hours, minutes, item));

            return {
              label: pad(item),
              value: item.toString(),
              disabled: itemDisabled,
            };
          })}
        />
      </div>
    )
  );

  // Grid Mode - Combined time selection (HH:mm format only, vertical layout)
  const handleTimeSelect = (h: number, m: number) => {
    // Always set seconds to 0 in grid mode
    if (!isTimeDisabled(h, m, 0)) {
      setHours(h);
      setMinutes(m);
      setSeconds(0);
      updateDateTime(h, m, 0);
    }
  };

  const renderColumns = () => {
    // Grid mode shows combined time options
    if (mode === "compact") {
      return (
        <TimeGridView
          HOURS={HOURS}
          MINUTES={MINUTES}
          hours={hours}
          minutes={minutes}
          disabled={disabled}
          isTimeDisabled={isTimeDisabled}
          onTimeSelect={handleTimeSelect}
          ref={gridRef}
        />
      );
    }

    const columns = [];

    if (showHours) {
      const hourLabel = timeLabel
        ? typeof timeLabel === "boolean"
          ? "Hour"
          : timeLabel.hours
        : undefined;

      if (mode === "wheel") {
        columns.push(
          <TimeColumnwheel
            key="hours"
            ref={hoursRef}
            items={HOURS}
            value={hours}
            onChange={handleHourChange}
            timeLabel={hourLabel}
            isItemDisabled={(item) => isTimeDisabled(item, minutes, seconds)}
            disabled={disabled}
          />
        );
      } else if (mode === "select") {
        columns.push(
          <TimeColumnNormal
            key="hours"
            items={HOURS}
            value={hours}
            onChange={handleHourChange}
            timeLabel={hourLabel}
            type="hours"
          />
        );
      }
    }

    if (showMinutes) {
      const minuteLabel = timeLabel
        ? typeof timeLabel === "boolean"
          ? "Minute"
          : timeLabel.minutes
        : undefined;

      if (mode === "wheel") {
        columns.push(
          <TimeColumnwheel
            key="minutes"
            ref={minutesRef}
            items={MINUTES}
            value={minutes}
            onChange={handleMinuteChange}
            timeLabel={minuteLabel}
            itemClassName={showHours ? "border-l" : undefined}
            isItemDisabled={(item) => isTimeDisabled(hours, item, seconds)}
            disabled={disabled}
          />
        );
      } else if (mode === "select") {
        columns.push(
          <TimeColumnNormal
            key="minutes"
            items={MINUTES}
            value={minutes}
            onChange={handleMinuteChange}
            timeLabel={minuteLabel}
            type="minutes"
          />
        );
      }
    }

    if (showSeconds) {
      const secondLabel = timeLabel
        ? typeof timeLabel === "boolean"
          ? "Second"
          : timeLabel.seconds
        : undefined;

      if (mode === "wheel") {
        columns.push(
          <TimeColumnwheel
            key="seconds"
            ref={secondsRef}
            items={SECONDS}
            value={seconds}
            onChange={handleSecondChange}
            timeLabel={secondLabel}
            itemClassName={showMinutes || showHours ? "border-l" : undefined}
            isItemDisabled={(item) => isTimeDisabled(hours, minutes, item)}
            disabled={disabled}
          />
        );
      } else if (mode === "select") {
        columns.push(
          <TimeColumnNormal
            key="seconds"
            items={SECONDS}
            value={seconds}
            onChange={handleSecondChange}
            timeLabel={secondLabel}
            type="seconds"
          />
        );
      }
    }

    return columns;
  };

  // If standalone mode is disabled, return the content directly (for integration with DatePicker)
  if (!standalone) {
    return (
      <div
        className={cn(
          "flex flex-col gap-2 h-full justify-between",
          className
        )}
      >
        <div
          className={cn(
            "flex rounded overflow-clip my-auto",
            mode === "wheel"
              ? "items-end justify-center p-0"
              : "items-start justify-center gap-4"
          )}
        >
          {renderColumns()}
        </div>

        {showNowButton && (
          <Button
            type="button"
            variant="solid"
            size="xs"
            onClick={handleNowClick}
            disabled={disabled}
            className={cn("rounded-none")}
          >
            {nowButtonLabel}
          </Button>
        )}
      </div>
    );
  }

  // Render the time picker content
  const timePickerContent = (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        className={cn(
          "flex rounded overflow-clip my-auto",
          mode === "wheel"
            ? "items-end justify-center p-0"
            : "items-start justify-center gap-4"
        )}
      >
        {renderColumns()}
      </div>

      {showNowButton && (
        <Button
          type="button"
          variant="solid"
          size="xs"
          onClick={handleNowClick}
          disabled={disabled}
          className={cn("rounded-none")}
        >
          {nowButtonLabel}
        </Button>
      )}
    </div>
  );

  // Standalone mode: show as drawer or popover with Input
  const iconTrigger = (
    <Button
      variant="ghost"
      className="!p-1 !leading-0 h-auto rounded hover:bg-accent transition-colors"
      disabled={disabled}
    >
      <Clock className="size-4" />
      <span className="sr-only">Select time</span>
    </Button>
  );

  const popPicker = (
    <Popover open={standaloneOpen} onOpenChange={setStandaloneOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        {iconTrigger}
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-auto overflow-hidden p-0",
          "backdrop-blur bg-background/50"
        )}
      >
        {timePickerContent}
      </PopoverContent>
    </Popover>
  );

  const drawPicker = (
    <Drawer open={standaloneOpen} onOpenChange={setStandaloneOpen}>
      <DrawerTrigger asChild>{iconTrigger}</DrawerTrigger>
      <DrawerContent
        className={cn(
          "w-auto overflow-hidden p-0",
          "backdrop-blur bg-background/90"
        )}
      >
        <DrawerHeader className="sr-only">
          <DrawerTitle>Select time</DrawerTitle>
          <DrawerDescription>Choose a time</DrawerDescription>
        </DrawerHeader>
        {timePickerContent}
      </DrawerContent>
    </Drawer>
  );

  // Return Input with picker as suffix icon (standalone mode)
  return (
    <Input
      {...props}
      clearable
      value={formatTime(value, showSeconds)}
      placeholder="HH:mm"
      disabled={disabled}
      className="cursor-pointer"
      suffixIcon={
        isMobile
          ? mobileMode === "drawer"
            ? drawPicker
            : popPicker
          : desktopMode === "drawer"
            ? drawPicker
            : popPicker
      }
    />
  );
}
