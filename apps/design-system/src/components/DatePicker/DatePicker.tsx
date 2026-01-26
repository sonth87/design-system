import * as React from "react";
import {
  CalendarDayButton as SCalendarDayButton,
  type CalendarDayButtonProps as SCalendarDayButtonProps,
  Calendar,
  type CalendarProps,
  type CalendarColor,
} from "@dsui/ui/components/calendar";
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
import { cn } from "@dsui/ui/index";
import { Input, type InputProps } from "../Input";
import { Button } from "../Button";
import {
  TimePicker,
  type TimePickerMode,
  type DisabledTimeRange,
} from "./TimePicker";
import { CalendarIcon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { isMobile } from "react-device-detect";
import { format as dfFormat, parse, isValid, type Locale } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { DATE_FORMAT } from "@/constants/common";

function formatDate(
  date: Date | undefined,
  outputFormat: string = DATE_FORMAT,
  locale?: Locale
) {
  if (!date) return "";

  return dfFormat(date, outputFormat, locale ? { locale } : undefined);
}

const parseDate = (
  str: string,
  inputFormat: string = DATE_FORMAT
): Date | undefined => {
  const date = parse(str, inputFormat, new Date());
  return isValid(date) ? date : undefined;
};

function generateMaskFromFormat(format: string): string {
  return format
    .replace(/dd|MM|yyyy/g, (match) => {
      switch (match) {
        case "dd":
        case "MM":
          return "99";
        case "yyyy":
          return "9999";
        default:
          return match;
      }
    })
    .replace(/d|M|y/g, (match) => {
      switch (match) {
        case "d":
        case "M":
          return "9";
        case "y":
          return "9";
        default:
          return match;
      }
    });
}

export type FormatType = string | { input: string; output: string };

export type DatePickerRenderProps = {
  value: string;
  date?: Date;
  onSelect: (date?: Date) => void;
  onChange: (text?: string) => void;
};

export type DatePickerProps = Omit<
  InputProps,
  "value" | "onChange" | "onSelect" | "mask" | "children"
> & {
  value?: string;
  onChange?: (
    event?: React.ChangeEvent<HTMLInputElement>,
    value?: string,
    date?: Date
  ) => void;
  onSelect?: (date?: Date, value?: string) => void;
  calendarClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  size?: VariantProps<typeof Input>["size"];
  format?: FormatType;
  language?: "vi" | "en";
  mask?: boolean | string;
  closeOnSelect?: boolean;
  calendarConfig?: CalendarProps;
  desktopMode?: "popover" | "drawer";
  mobileMode?: "popover" | "drawer";
  showOutsideDays?: boolean;
  children?: (props: DatePickerRenderProps) => React.ReactNode;
  showTime?: boolean;
  timeFormat?: "HH:mm" | "HH:mm:ss";
  hideDate?: boolean;
  numberOfMonths?: number;
  variant?: "default" | "rounded";
  color?: CalendarColor;

  // TimePicker configuration options
  timePickerMode?: TimePickerMode; // Display mode: 'wheel' (default), 'select', 'compact'
  hourInterval?: number; // Hour interval (e.g., 1, 2, 3) - defaults to 1
  minuteInterval?: number; // Minute interval (e.g., 5, 10, 15, 30) - defaults to 1
  secondInterval?: number; // Second interval (e.g., 5, 10, 15, 30) - defaults to 1
  disabledTimes?: string[]; // Array of disabled times in "HH:mm" or "HH:mm:ss" format
  disabledTimeRanges?: DisabledTimeRange[]; // Array of disabled time ranges
  showNowButton?: boolean; // Show "Now" button to select current time
  nowButtonLabel?: string; // Label for "Now" button (defaults to "Now")
  timePickerLabel?:
    | boolean
    | { hours?: string; minutes?: string; seconds?: string };
  openOnFocus?: boolean; // Auto open datepicker when input is focused (default: true)
};

export function DatePicker({
  value,
  onChange,
  onSelect,
  calendarClassName,
  side = "bottom",
  align = "end",
  format = "dd/MM/yyyy",
  language = "vi",
  mask,
  closeOnSelect = false,
  calendarConfig,
  desktopMode = "popover",
  mobileMode = "drawer",
  showOutsideDays = true,
  children,
  showTime = false,
  timeFormat = "HH:mm",
  hideDate = false,
  numberOfMonths = 1,
  variant = "default",
  color = "primary",
  // TimePicker props
  timePickerMode = "wheel",
  hourInterval = 1,
  minuteInterval = 1,
  secondInterval = 1,
  disabledTimes,
  disabledTimeRanges,
  showNowButton = false,
  nowButtonLabel = "Now",
  timePickerLabel,
  openOnFocus = true,
  ...props
}: DatePickerProps) {
  let inputFormat: string;
  let outputFormat: string;
  if (typeof format === "string") {
    inputFormat = format;
    outputFormat = format;
  } else {
    inputFormat = format.input;
    outputFormat = format.output;
  }

  // Determine the mask to use
  let maskToUse: string | undefined;
  if (mask === true) {
    maskToUse = generateMaskFromFormat(inputFormat);
  } else if (typeof mask === "string") {
    maskToUse = mask;
  }
  // If mask is false or undefined, maskToUse remains undefined

  // Parse initial value with correct format
  // - hideDate + showTime: time only (e.g., "HH:mm")
  // - showTime: date + time (e.g., "dd/MM/yyyy HH:mm")
  // - default: date only (e.g., "dd/MM/yyyy")
  const fullFormat =
    hideDate && showTime
      ? timeFormat
      : showTime
        ? `${inputFormat} ${timeFormat}`
        : inputFormat;

  const initialDate = value ? parseDate(value, fullFormat) : undefined;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [month, setMonth] = React.useState<Date | undefined>(initialDate);
  const [inputValue, setInputValue] = React.useState(value || "");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isUserTyping = React.useRef(false);

  const _locale: Locale = calendarConfig?.locale
    ? (calendarConfig?.locale as Locale)
    : language === "en"
      ? enUS
      : vi;

  const mode = isMobile ? mobileMode : desktopMode;

  // Sync inputValue when value prop changes from outside
  React.useEffect(() => {
    if (value !== inputValue && !isUserTyping.current) {
      setInputValue(value || "");
      const parsedDate = value ? parseDate(value, fullFormat) : undefined;
      if (parsedDate) {
        setDate(parsedDate);
        setMonth(parsedDate);
      } else if (!value) {
        // Clear states if value is empty
        setDate(undefined);
        setMonth(undefined);
      }
    }
  }, [value, inputValue, fullFormat]);

  // Helper to format date-time based on showTime and timeFormat
  const formatDateTimeValue = (d: Date | undefined): string => {
    if (!d) return "";
    let result = formatDate(d, outputFormat, _locale);
    if (showTime) {
      result += ` ${dfFormat(d, timeFormat)}`;
    }
    return result;
  };

  // Helper functions for render props
  const handleSelectForRenderProp = (date?: Date) => {
    setDate(date);
    setInputValue(formatDateTimeValue(date));
    onSelect?.(date, formatDateTimeValue(date));
  };

  const handleChangeForRenderProp = (text?: string) => {
    if (!text) {
      setInputValue("");
      setDate(undefined);
      onSelect?.(undefined, undefined);
      return;
    }
    setInputValue(text);
    const parsedDate = parseDate(text, inputFormat);
    if (parsedDate) {
      setDate(parsedDate);
      setMonth(parsedDate);
      onSelect?.(parsedDate, formatDateTimeValue(parsedDate));
    } else {
      setDate(undefined);
      onSelect?.(undefined, undefined);
    }
  };

  const handleTimeChange = (
    event?: React.ChangeEvent<HTMLInputElement>,
    value?: string,
    newDate?: Date
  ) => {
    if (!newDate) {
      // Handle clear/invalid time
      onChange?.(event, value, undefined);
      return;
    }

    // Merge: keep date (year, month, day) from Calendar, take time (hours, minutes, seconds) from TimePicker
    const mergedDate = new Date(date || new Date());
    mergedDate.setHours(
      newDate.getHours(),
      newDate.getMinutes(),
      newDate.getSeconds(),
      0
    );

    setDate(mergedDate);
    setInputValue(formatDateTimeValue(mergedDate));
    onSelect?.(mergedDate, formatDateTimeValue(mergedDate));
    onChange?.(event, formatDateTimeValue(mergedDate), mergedDate);
  };

  // Determine trigger component
  const triggerComponent = children ? (
    children({
      value: inputValue,
      date,
      onSelect: handleSelectForRenderProp,
      onChange: handleChangeForRenderProp,
    })
  ) : (
    <Button
      variant="ghost"
      className="!p-1 !leading-0 h-auto rounded hover:bg-accent transition-colors"
      size={props.size}
    >
      <CalendarIcon
        className={cn({
          "size-3": props.size === "xs" || props.size === "sm",
          "size-3.5": !props.size || props.size === "normal",
          "size-4": props.size === "lg" || props.size === "xl",
        })}
      />
      <span className="sr-only">Select date</span>
    </Button>
  );

  const calendarSelection = (
    <div
      className={cn(
        "flex items-stretch mx-auto w-full",
        showTime && !hideDate ? "gap-0 md:max-w-lg" : "",
        // mode === "drawer" ? "mb-6" : "",
        isMobile ? "max-w-md md:max-w-md lg:max-w-lg" : ""
      )}
    >
      {!hideDate && (
        <Calendar
          {...calendarConfig}
          mode="single"
          selected={date}
          captionLayout="dropdown"
          month={month}
          onMonthChange={setMonth}
          numberOfMonths={isMobile ? 1 : numberOfMonths || 1}
          variant={variant}
          color={color}
          onSelect={(selectedDate) => {
            // Preserve time from current date when selecting new date
            let newDate = selectedDate;
            if (selectedDate && date && showTime) {
              newDate = new Date(selectedDate);
              newDate.setHours(
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
                date.getMilliseconds()
              );
            }
            setDate(newDate);
            setInputValue(formatDateTimeValue(newDate));
            onSelect?.(newDate, formatDateTimeValue(newDate));
            if (closeOnSelect && !showTime) setOpen(false);
          }}
          locale={_locale}
          formatters={{
            formatMonthDropdown: (date) =>
              date.toLocaleString(_locale.code, { month: "short" }),
          }}
          showOutsideDays={showOutsideDays}
          className={cn(
            "my-auto bg-transparent mx-auto",
            {
              "[--cell-size:clamp(0px,calc(100vw/7.5),52px)] mb-8 bg-transparent":
                (isMobile && !showTime) || desktopMode === "drawer",
              "[--cell-size:clamp(0px,calc(100vw/7.5),34px)]":
                !isMobile && desktopMode !== "drawer",
              "w-full": mode === "drawer" && showTime,
            },
            calendarClassName
          )}
        />
      )}
      {showTime && (
        <div className="border-l border-border">
          <TimePicker
            value={date ? dfFormat(date, timeFormat) : undefined}
            format={timeFormat}
            onChange={handleTimeChange}
            showHours
            showMinutes
            showSeconds={timeFormat === "HH:mm:ss"}
            mode={timePickerMode}
            hourInterval={hourInterval}
            minuteInterval={minuteInterval}
            secondInterval={secondInterval}
            disabledTimes={disabledTimes}
            disabledTimeRanges={disabledTimeRanges}
            showNowButton={showNowButton}
            nowButtonLabel={nowButtonLabel}
            timeLabel={timePickerLabel}
            standalone={false}
            color={color}
            isOpen={open}
          />
        </div>
      )}
    </div>
  );

  const popPicker = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={props.disabled}>
        {triggerComponent}
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-auto overflow-hidden p-0",
          "backdrop-blur bg-background/50"
        )}
        side={side}
        align={align}
      >
        {calendarSelection}
      </PopoverContent>
    </Popover>
  );

  const drawPicker = (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>
      <DrawerContent
        className={cn(
          "w-auto overflow-hidden p-0",
          "backdrop-blur bg-background"
        )}
      >
        <DrawerHeader className="sr-only">
          <DrawerTitle>Select date</DrawerTitle>
          <DrawerDescription>Set date</DrawerDescription>
        </DrawerHeader>
        {calendarSelection}
      </DrawerContent>
    </Drawer>
  );

  // If children is provided, use render prop pattern with picker
  if (children) {
    return mode === "drawer" ? drawPicker : popPicker;
  }

  // Default input rendering
  return (
    <Input
      {...props}
      ref={inputRef}
      type="text"
      clearable
      value={inputValue}
      mask={maskToUse}
      onChange={(e) => {
        isUserTyping.current = true;
        setInputValue(e.target.value);
        const date = parseDate(e.target.value, inputFormat);
        if (date) {
          setDate(date);
          setMonth(date);
          onSelect?.(date, formatDateTimeValue(date));
          onChange?.(e, formatDateTimeValue(date), date);
        } else {
          onSelect?.(undefined, undefined);
          onChange?.(e, undefined, undefined);
        }
      }}
      onFocus={(e) => {
        // Don't auto-open if mask is enabled - user wants to type directly
        if (openOnFocus && !open && !maskToUse) {
          setOpen(true);
        }
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        // Don't clear value when picker is open - user might be interacting with it
        // The onBlur fires when focus moves to the picker
        setTimeout(() => {
          isUserTyping.current = false;
          // Only validate and clear if picker is closed
          if (!open) {
            const parsedDate = parseDate(inputValue, inputFormat);
            if (!parsedDate && inputValue) {
              setInputValue("");
              setDate(undefined);
              setMonth(undefined);
              onSelect?.(undefined, undefined);
            }
          }
        }, 150);
        props.onBlur?.(e);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true);
        }
        props.onKeyDown?.(e);
      }}
      suffixIcon={mode === "drawer" ? drawPicker : popPicker}
    />
  );
}
