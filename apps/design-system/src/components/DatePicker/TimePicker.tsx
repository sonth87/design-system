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
import { format as dfFormat, parse, isValid } from "date-fns";
import type { CalendarColor } from "../Calendar/Calendar";

export type TimePickerMode = "wheel" | "select" | "compact";

export type DisabledTimeRange = {
  from: string; // Format: "HH:mm" or "HH:mm:ss"
  to: string; // Format: "HH:mm" or "HH:mm:ss"
};

export type FormatType = string | { input: string; output: string };

export type TimePickerProps = Omit<
  InputProps,
  "value" | "onChange" | "onSelect" | "mask" | "children"
> & {
  value?: string; // Time string in specified format
  onChange?: (
    event?: React.ChangeEvent<HTMLInputElement>,
    value?: string,
    date?: Date,
  ) => void;
  onSelect?: (date?: Date, value?: string) => void;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  disabled?: boolean;
  className?: string;
  timeLabel?:
    | boolean
    | string
    | { hours?: string; minutes?: string; seconds?: string };
  mask?: boolean | string; // Enable mask for time input: true (auto-generate), string (custom mask), false/undefined (no mask)
  format?: FormatType; // Time format using date-fns format tokens (default: auto from showSeconds)

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
  color?: CalendarColor; // Color variant for selected time (defaults to "primary")
};

const generateIntervalArray = (max: number, interval: number = 1): number[] => {
  const result: number[] = [];
  for (let i = 0; i < max; i += interval) {
    result.push(i);
  }
  return result;
};

const pad = (num: number): string => String(num).padStart(2, "0");

// Format time Date to string using date-fns
const formatTime = (
  date: Date | undefined,
  format: string = "HH:mm",
): string => {
  if (!date || !isValid(date)) return "";
  return dfFormat(date, format);
};

// Parse time string to Date using date-fns
const parseTimeString = (
  timeStr: string,
  format: string = "HH:mm",
): Date | undefined => {
  if (!timeStr) return undefined;

  const referenceDate = new Date();
  const parsedDate = parse(timeStr, format, referenceDate);

  if (!isValid(parsedDate)) return undefined;

  return parsedDate;
};

function generateMaskFromTimeFormat(format: string): string {
  return format
    .replace(/HH|mm|ss/g, (match) => {
      switch (match) {
        case "HH":
        case "mm":
        case "ss":
          return "99";
        default:
          return match;
      }
    })
    .replace(/H|m|s/g, () => "9");
}

export function TimePicker({
  value,
  onChange,
  onSelect,
  showHours = true,
  showMinutes = true,
  showSeconds = false,
  disabled = false,
  className,
  timeLabel,
  mask,
  format,
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
  color = "primary",
  ...props
}: TimePickerProps) {
  // Determine input and output formats (like DatePicker)
  let inputFormat: string;
  let outputFormat: string;
  if (typeof format === "string") {
    inputFormat = format;
    outputFormat = format;
  } else if (format) {
    inputFormat = format.input;
    outputFormat = format.output;
  } else {
    // Auto-determine from showSeconds if not provided
    inputFormat = showSeconds ? "HH:mm:ss" : "HH:mm";
    outputFormat = showSeconds ? "HH:mm:ss" : "HH:mm";
  }

  const [hours, setHours] = useState<number | undefined>(undefined);
  const [minutes, setMinutes] = useState<number | undefined>(undefined);
  const [seconds, setSeconds] = useState<number | undefined>(undefined);
  const [standaloneOpen, setStandaloneOpen] = useState(false);

  useEffect(() => {
    if (value) {
      const parsed = parseTimeString(value, inputFormat);
      if (parsed) {
        setHours(parsed.getHours());
        setMinutes(parsed.getMinutes());
        setSeconds(parsed.getSeconds());
      }
    } else {
      setHours(undefined);
      setMinutes(undefined);
      setSeconds(undefined);
    }
  }, [value, inputFormat]);

  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Generate time arrays based on intervals
  const HOURS = useMemo(
    () => generateIntervalArray(24, hourInterval),
    [hourInterval],
  );
  const MINUTES = useMemo(
    () => generateIntervalArray(60, minuteInterval),
    [minuteInterval],
  );
  const SECONDS = useMemo(
    () => generateIntervalArray(60, secondInterval),
    [secondInterval],
  );

  // Helper function to check if a time is disabled
  const isTimeDisabled = useCallback(
    (
      h: number | undefined,
      m: number | undefined,
      s: number | undefined = 0,
    ): boolean => {
      const timeStr = `${pad(h ?? 0)}:${pad(m ?? 0)}${showSeconds ? `:${pad(s ?? 0)}` : ""}`;

      // Check if specific time is disabled
      if (disabledTimes.includes(timeStr)) {
        return true;
      }

      // Check if time is in a disabled range
      for (const range of disabledTimeRanges) {
        const [fromH, fromM, fromS = 0] = range.from.split(":").map(Number);
        const [toH, toM, toS = 0] = range.to.split(":").map(Number);

        const currentTime = (h ?? 0) * 3600 + (m ?? 0) * 60 + (s ?? 0);
        const fromTime = fromH * 3600 + fromM * 60 + fromS;
        const toTime = toH * 3600 + toM * 60 + toS;

        if (currentTime >= fromTime && currentTime <= toTime) {
          return true;
        }
      }

      return false;
    },
    [disabledTimes, disabledTimeRanges, showSeconds],
  );

  // Helper function to get time label based on type and timeLabel prop
  const getTimeLabel = useCallback(
    (type: "hours" | "minutes" | "seconds"): string | undefined => {
      if (!timeLabel) return undefined;

      if (typeof timeLabel === "boolean") {
        return timeLabel
          ? type === "hours"
            ? "Hour"
            : type === "minutes"
              ? "Minute"
              : "Second"
          : undefined;
      }

      if (typeof timeLabel === "string") {
        return timeLabel;
      }

      // Object case
      if (type === "hours") return timeLabel.hours || "Hour";
      if (type === "minutes") return timeLabel.minutes || "Minute";
      return timeLabel.seconds || "Second";
    },
    [timeLabel],
  );

  // If timeLabel is a string, show it as a common label above all columns
  const shareLabel = typeof timeLabel === "string" && (
    <div
      key="common-label"
      className="text-xs font-semibold text-muted-foreground uppercase p-2 border-b w-full text-center"
    >
      {timeLabel}
    </div>
  );

  // Find nearest valid time
  const findNearestValidTime = useCallback(
    (
      targetH: number,
      targetM: number,
      targetS: number = 0,
    ): { h: number; m: number; s: number } => {
      // Find nearest hour
      const nearestH = HOURS.reduce((prev, curr) =>
        Math.abs(curr - targetH) < Math.abs(prev - targetH) ? curr : prev,
      );

      // Find nearest minute
      const nearestM = MINUTES.reduce((prev, curr) =>
        Math.abs(curr - targetM) < Math.abs(prev - targetM) ? curr : prev,
      );

      // Find nearest second
      const nearestS = SECONDS.reduce((prev, curr) =>
        Math.abs(curr - targetS) < Math.abs(prev - targetS) ? curr : prev,
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
    [HOURS, MINUTES, SECONDS, isTimeDisabled],
  );

  const updateDateTime = useCallback(
    (h: number, m: number, s: number) => {
      const newDate = new Date();
      newDate.setHours(h, m, s, 0);
      const formattedValue = formatTime(newDate, outputFormat);
      onSelect?.(newDate, formattedValue);
    },
    [outputFormat, onSelect],
  );

  const handleHourChange = (h: number) => {
    if (!isTimeDisabled(h, minutes, seconds)) {
      setHours(h);
      updateDateTime(h, minutes ?? 0, seconds ?? 0);
    }
  };

  const handleMinuteChange = (m: number) => {
    if (!isTimeDisabled(hours, m, seconds)) {
      setMinutes(m);
      updateDateTime(hours ?? 0, m, seconds ?? 0);
    }
  };

  const handleSecondChange = (s: number) => {
    if (!isTimeDisabled(hours, minutes, s)) {
      setSeconds(s);
      updateDateTime(hours ?? 0, minutes ?? 0, s);
    }
  };

  // Scroll to center item when selected
  const scrollToSelected = useCallback(
    (ref: RefObject<HTMLDivElement | null>) => {
      if (ref.current) {
        const selected = ref.current.querySelector(
          "[data-selected]",
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
    [],
  );

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
  }, [hoursRef, minutesRef, secondsRef, gridRef, mode, scrollToSelected]);

  const handleNowClick = () => {
    const now = new Date();
    const { h, m, s } = findNearestValidTime(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    );
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    updateDateTime(h, m, s);
    setTimeout(() => scrollHandler(), 100);
  };

  useEffect(() => {
    const timer = setTimeout(() => scrollHandler(), 100);
    return () => clearTimeout(timer);
  }, [standaloneOpen, mode, scrollHandler]);

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
      value: number | undefined;
      onChange: (val: number) => void;
      timeLabel?: string;
      type: "hours" | "minutes" | "seconds";
    }) => (
      <div className="flex flex-col gap-2">
        {timeLabel && (
          <div className="text-xs font-semibold text-muted-foreground uppercase p-2 border-b w-full text-center">
            {timeLabel}
          </div>
        )}
        <div className="p-2">
          <Select
            value={selectedValue?.toString() || ""}
            onValueChange={(value) => onChangeCol(Number(value))}
            disabled={disabled}
            clearable={false}
            search={false}
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
      </div>
    ),
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
    const columns = [];

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
          color={color}
        />
      );
    }

    if (showHours) {
      const hourLabel =
        typeof timeLabel === "string" ? undefined : getTimeLabel("hours");

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
            color={color}
          />,
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
          />,
        );
      }
    }

    if (showMinutes) {
      const minuteLabel =
        typeof timeLabel === "string" ? undefined : getTimeLabel("minutes");

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
            color={color}
          />,
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
          />,
        );
      }
    }

    if (showSeconds) {
      const secondLabel =
        typeof timeLabel === "string" ? undefined : getTimeLabel("seconds");

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
            color={color}
          />,
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
          />,
        );
      }
    }

    return columns;
  };

  // If standalone mode is disabled, return the content directly (for integration with DatePicker)
  if (!standalone) {
    return (
      <div
        className={cn("flex flex-col gap-2 h-full justify-between", className)}
      >
        {shareLabel}

        <div
          className={cn(
            "flex rounded overflow-clip mb-auto",
            mode === "wheel"
              ? "items-end justify-center p-0 h-72"
              : "items-start justify-center",
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
    <div className={cn("flex flex-col gap-4 h-full", className)}>
      {shareLabel}

      <div
        className={cn(
          "flex rounded overflow-clip my-auto mx-auto max-w-sm md:max-w-md lg:max-w-lg relative",
          mode === "wheel"
            ? "items-end justify-center p-0"
            : "items-start justify-center",
          {
            "h-72": mode === "wheel",
            "w-xs": standalone && (isMobile || desktopMode === "drawer"),
          },
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
          "backdrop-blur bg-background/50",
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
          "backdrop-blur bg-background",
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

  // Determine the mask to use
  const timeFormat = outputFormat; // Use outputFormat for placeholder
  let maskToUse: string | undefined;
  if (mask === true) {
    maskToUse = generateMaskFromTimeFormat(inputFormat);
  } else if (typeof mask === "string") {
    maskToUse = mask;
  }
  // If mask is false or undefined, maskToUse remains undefined

  // Handle Input change (when user types)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const parsedDate = parseTimeString(inputValue, inputFormat);

    if (parsedDate) {
      setHours(parsedDate.getHours());
      setMinutes(parsedDate.getMinutes());
      setSeconds(parsedDate.getSeconds());
      const formattedValue = formatTime(parsedDate, outputFormat);
      onChange?.(e, formattedValue, parsedDate);
      onSelect?.(parsedDate, formattedValue);
    } else {
      // Reset state when input is cleared
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      onChange?.(e, inputValue, undefined);
      onSelect?.(undefined, inputValue);
    }
  };

  // Return Input with picker as suffix icon (standalone mode)
  return (
    <Input
      {...props}
      clearable
      value={value || ""}
      placeholder={timeFormat}
      mask={maskToUse}
      disabled={disabled}
      className="cursor-pointer"
      onChange={handleInputChange}
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
