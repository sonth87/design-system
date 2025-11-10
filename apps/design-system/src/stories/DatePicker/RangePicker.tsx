import * as React from "react";
import {
  CalendarDayButton as SCalendarDayButton,
  type CalendarDayButtonProps as SCalendarDayButtonProps,
  Calendar,
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
import Input, { type InputProps } from "../Input/Input";
import Button from "../Button/Button";
import { TimePicker } from "./TimePicker";
import { type DatePickerProps } from "./DatePicker";
import { CalendarIcon, MoveRight } from "lucide-react";
import { isMobile } from "react-device-detect";
import { format as dfFormat, parse, isValid, type Locale } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { DATE_FORMAT } from "@/constants/common";
import { FloatingLabel } from "@/components/FloatLabel";

export type DateRange = {
  from?: Date | undefined;
  to?: Date | undefined;
};

export type DateRangeText = { from?: string; to?: string } | null;

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

export type RangePickerRenderProps = {
  fromValue: string;
  toValue: string;
  range?: DateRange;
  onSelect: (range?: DateRange) => void;
  onFromChange: (text: string) => void;
  onToChange: (text: string) => void;
};

export type TimeConfig = Omit<
  React.ComponentProps<typeof TimePicker>,
  "value" | "onSelect" | "format"
>;

export type RangePickerProps = Omit<
  DatePickerProps,
  "value" | "onChange" | "onSelect" | "children" | "label" | "placeholder"
> & {
  label?: string | DateRangeText;
  placeholder?: string | DateRangeText;
  value?: DateRangeText;
  onChange?: (value?: DateRange, text?: DateRangeText) => void;
  onSelect?: (value?: DateRange, text?: DateRangeText) => void;
  children?: (props: RangePickerRenderProps) => React.ReactNode;
  separator?: React.ReactNode;
  timeConfig?: [TimeConfig, TimeConfig];
  numberOfMonths?: number;
};

export function RangePicker({
  label,
  value,
  placeholder,
  onChange,
  onSelect,
  calendarClassName,
  side = "bottom",
  align = "end",
  format = "dd/MM/yyyy",
  language = "vi",
  mask,
  closeOnSelect = false,
  showOutsideDays = true,
  calendarConfig,
  timeConfig,
  desktopMode = "popover",
  mobileMode = "drawer",
  children,
  separator = <MoveRight className="size-5" />,
  showTime = false,
  timeFormat = "HH:mm",
  hideDate = false,
  numberOfMonths = 1,
  ...props
}: RangePickerProps) {
  const inputId = React.useId();

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

  const initialFromDate = value?.from
    ? parseDate(value.from, inputFormat)
    : undefined;
  const initialToDate = value?.to
    ? parseDate(value.to, inputFormat)
    : undefined;
  const initialRange: DateRange = {
    from: initialFromDate,
    to: initialToDate,
  };

  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(initialRange);
  const [month, setMonth] = React.useState<Date | undefined>(
    initialFromDate || new Date()
  );
  const [fromInputValue, setFromInputValue] = React.useState(value?.from || "");
  const [toInputValue, setToInputValue] = React.useState(value?.to || "");
  const [fromTime, setFromTime] = React.useState<Date | undefined>(undefined);
  const [toTime, setToTime] = React.useState<Date | undefined>(undefined);
  const fromInputRef = React.useRef<HTMLInputElement>(null);
  const toInputRef = React.useRef<HTMLInputElement>(null);

  const shouldFloat = !!(fromInputValue.trim() || toInputValue.trim());

  const _locale: Locale = calendarConfig?.locale
    ? (calendarConfig?.locale as Locale)
    : language === "en"
      ? enUS
      : vi;

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
  const handleSelectForRenderProp = (range?: DateRange) => {
    setRange(range);
    const fromFormatted = formatDateTimeValue(range?.from);
    const toFormatted = formatDateTimeValue(range?.to);
    setFromInputValue(fromFormatted);
    setToInputValue(toFormatted);
    onSelect?.(range, { from: fromFormatted, to: toFormatted });
  };

  const handleFromChangeForRenderProp = (text: string) => {
    setFromInputValue(text);

    // If the input is cleared (empty), clear both fields
    if (text.trim() === "") {
      setFromInputValue("");
      setToInputValue("");
      const newRange: DateRange = { from: undefined, to: undefined };
      setRange(newRange);
      onSelect?.(newRange, newRange as DateRangeText);
      return;
    }

    // Try to parse based on showTime
    let parsedDate: Date | undefined;
    if (showTime) {
      parsedDate = parseDate(text, `${inputFormat} ${timeFormat}`);
    } else {
      parsedDate = parseDate(text, inputFormat);
    }
    const newRange: DateRange = { from: parsedDate, to: range?.to };
    if (parsedDate) {
      setRange(newRange);
      setMonth(parsedDate);
      setFromTime(parsedDate);
      onSelect?.(newRange, {
        from: formatDateTimeValue(parsedDate),
        to: formatDateTimeValue(range?.to),
      });
    } else {
      setRange(newRange);
      onSelect?.(newRange, {
        from: formatDateTimeValue(range?.from),
        to: formatDateTimeValue(range?.to),
      });
    }
  };

  const handleToChangeForRenderProp = (text: string) => {
    setToInputValue(text);

    // If the input is cleared (empty), clear both fields
    if (text.trim() === "") {
      setFromInputValue("");
      setToInputValue("");
      const newRange: DateRange = { from: undefined, to: undefined };
      setRange(newRange);
      onSelect?.(newRange, newRange as DateRangeText);
      return;
    }

    // Try to parse based on showTime
    let parsedDate: Date | undefined;
    if (showTime) {
      parsedDate = parseDate(text, `${inputFormat} ${timeFormat}`);
    } else {
      parsedDate = parseDate(text, inputFormat);
    }
    const newRange: DateRange = {
      from: range?.from,
      to: parsedDate,
    };
    if (parsedDate) {
      setRange(newRange);
      setToTime(parsedDate);
      onSelect?.(newRange, {
        from: formatDateTimeValue(range?.from),
        to: formatDateTimeValue(parsedDate),
      });
    } else {
      setRange(newRange);
      onSelect?.(newRange, {
        from: formatDateTimeValue(range?.from),
        to: undefined,
      });
    }
  };

  const handleTimeChangeFrom = (date?: Date) => {
    if (date) {
      setFromTime(date);
      // Merge: keep date (year, month, day) from existing range.from, take time (hours, minutes, seconds) from TimePicker
      const mergedDate = new Date(range?.from || new Date());
      mergedDate.setHours(
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        0
      );

      const newRange: DateRange = {
        from: mergedDate,
        to: range?.to,
      };
      setRange(newRange);
      setFromInputValue(formatDateTimeValue(mergedDate));
      onSelect?.(newRange, {
        from: formatDateTimeValue(mergedDate),
        to: formatDateTimeValue(range?.to),
      });
      onChange?.(newRange, {
        from: formatDateTimeValue(mergedDate),
        to: formatDateTimeValue(range?.to),
      });
    }
  };

  const handleTimeChangeTo = (date?: Date) => {
    if (date) {
      setToTime(date);
      // Merge: keep date (year, month, day) from existing range.to, take time (hours, minutes, seconds) from TimePicker
      const mergedDate = new Date(range?.to || new Date());
      mergedDate.setHours(
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        0
      );

      const newRange: DateRange = {
        from: range?.from,
        to: mergedDate,
      };
      setRange(newRange);
      setToInputValue(formatDateTimeValue(mergedDate));
      onSelect?.(newRange, {
        from: formatDateTimeValue(range?.from),
        to: formatDateTimeValue(mergedDate),
      });
      onChange?.(newRange, {
        from: formatDateTimeValue(range?.from),
        to: formatDateTimeValue(mergedDate),
      });
    }
  };

  // Determine trigger component
  const triggerComponent = children ? (
    children({
      fromValue: fromInputValue,
      toValue: toInputValue,
      range,
      onSelect: handleSelectForRenderProp,
      onFromChange: handleFromChangeForRenderProp,
      onToChange: handleToChangeForRenderProp,
    })
  ) : (
    <Button
      variant="ghost"
      className="!p-1 !leading-0 h-auto rounded hover:bg-accent transition-colors"
      size={props?.size}
    >
      <CalendarIcon
        className={cn({
          "size-3": props.size === "xs" || props.size === "sm",
          "size-3.5": !props.size || props.size === "normal",
          "size-4": props.size === "lg" || props.size === "xl",
        })}
      />
      <span className="sr-only">Select date range</span>
    </Button>
  );

  const calendarSelection = (
    <div
      className={cn("flex items-stretch", showTime && !hideDate ? "gap-0" : "")}
    >
      {!hideDate && (
        <Calendar
          {...calendarConfig}
          mode="range"
          selected={range as any}
          captionLayout="dropdown"
          month={month}
          onMonthChange={setMonth}
          numberOfMonths={isMobile ? 1 : numberOfMonths || 1}
          onSelect={(selectedRange) => {
            // Preserve time from TimePicker values if showTime is enabled
            let preservedRange = selectedRange;
            if (showTime) {
              // Get current time from TimePicker state
              const fromTimeObj = fromTime;
              const toTimeObj = toTime;

              preservedRange = {
                from: selectedRange?.from
                  ? new Date(
                      selectedRange.from.getFullYear(),
                      selectedRange.from.getMonth(),
                      selectedRange.from.getDate(),
                      fromTimeObj?.getHours() || 0,
                      fromTimeObj?.getMinutes() || 0,
                      fromTimeObj?.getSeconds() || 0
                    )
                  : undefined,
                to: selectedRange?.to
                  ? new Date(
                      selectedRange.to.getFullYear(),
                      selectedRange.to.getMonth(),
                      selectedRange.to.getDate(),
                      toTimeObj?.getHours() || 0,
                      toTimeObj?.getMinutes() || 0,
                      toTimeObj?.getSeconds() || 0
                    )
                  : undefined,
              };
            }
            setRange(preservedRange);
            const fromFormatted = formatDateTimeValue(preservedRange?.from);
            const toFormatted = formatDateTimeValue(preservedRange?.to);
            setFromInputValue(fromFormatted);
            setToInputValue(toFormatted);
            onSelect?.(preservedRange, {
              from: fromFormatted,
              to: toFormatted,
            });
            onChange?.(preservedRange, {
              from: fromFormatted,
              to: toFormatted,
            });
            if (
              closeOnSelect &&
              preservedRange?.from &&
              preservedRange?.to &&
              !showTime
            ) {
              setOpen(false);
            }
          }}
          locale={_locale}
          formatters={{
            formatMonthDropdown: (date) =>
              date.toLocaleString(_locale.code, { month: "short" }),
          }}
          showOutsideDays={showOutsideDays}
          className={cn(
            "mx-auto",
            {
              "[--cell-size:clamp(0px,calc(100vw/7.5),52px)] mb-8 bg-transparent":
                isMobile || desktopMode === "drawer",
              "[--cell-size:clamp(0px,calc(100vw/7.5),34px)]":
                !isMobile && desktopMode !== "drawer",
            },
            calendarClassName
          )}
        />
      )}
      {showTime && (
        <div className="flex gap-0 border-l border-border">
          <TimePicker
            {...timeConfig?.[0]}
            value={fromTime ? dfFormat(fromTime, timeFormat) : undefined}
            onSelect={handleTimeChangeFrom}
            format={timeFormat}
            showHours
            showMinutes
            showSeconds={timeFormat === "HH:mm:ss"}
            standalone={false}
          />
          <div className="border-l border-border" />
          <TimePicker
            {...timeConfig?.[1]}
            value={toTime ? dfFormat(toTime, timeFormat) : undefined}
            onSelect={handleTimeChangeTo}
            format={timeFormat}
            showHours
            showMinutes
            showSeconds={timeFormat === "HH:mm:ss"}
            standalone={false}
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
          <DrawerTitle>Select date range</DrawerTitle>
          <DrawerDescription>Set your date range</DrawerDescription>
        </DrawerHeader>
        {calendarSelection}
      </DrawerContent>
    </Drawer>
  );

  // If children is provided, use render prop pattern with picker
  if (children) {
    const mode = isMobile ? mobileMode : desktopMode;
    return mode === "drawer" ? drawPicker : popPicker;
  }

  // Helper function to render range input
  const renderRangeInput = (
    type: "from" | "to",
    inputValue: string,
    setInputValue: (value: string) => void,
    additionalProps?: Partial<InputProps>
  ) => {
    const isFrom = type === "from";

    return (
      <Input
        {...props}
        {...additionalProps}
        ref={isFrom ? fromInputRef : toInputRef}
        id={inputId}
        size={
          props.isFloatLabel ? (props.size ? props.size : "xl") : props.size
        }
        className={cn(
          props.className,
          "relative peer border-0 focus:ring-0 rounded-none hover:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:border-0",
          isFrom ? "pr-0" : ""
        )}
        label={
          props.isFloatLabel && typeof label === "object"
            ? isFrom
              ? label?.from || ""
              : label?.to || ""
            : ""
        }
        placeholder={
          typeof placeholder === "object"
            ? isFrom
              ? placeholder?.from || ""
              : placeholder?.to || ""
            : placeholder
        }
        clearable={!isFrom}
        value={inputValue}
        mask={maskToUse}
        onChange={(e) => {
          const inputValue = e.target.value;
          setInputValue(inputValue);

          // If the input is cleared (empty), clear both fields
          if (inputValue.trim() === "") {
            setFromInputValue("");
            setToInputValue("");
            const newRange: DateRange = { from: undefined, to: undefined };
            setRange(newRange);
            onSelect?.(newRange, newRange as DateRangeText);
            onChange?.(newRange, newRange as DateRangeText);
            return;
          }

          // Try to parse based on showTime
          let date: Date | undefined;
          if (showTime) {
            date = parseDate(inputValue, `${inputFormat} ${timeFormat}`);
          } else {
            date = parseDate(inputValue, inputFormat);
          }
          const newRange: DateRange = isFrom
            ? { from: date, to: range?.to }
            : { from: range?.from, to: date };

          if (date) {
            setRange(newRange);
            if (isFrom) setMonth(date);
            // Update time state if time was parsed
            if (isFrom) {
              setFromTime(date);
              // setFromInputValue(formatDateTimeValue(date)); // Sync input value
            } else {
              setToTime(date);
              // setToInputValue(formatDateTimeValue(date)); // Sync input value
            }
            const fromFormatted = formatDateTimeValue(
              isFrom ? date : range?.from
            );
            const toFormatted = formatDateTimeValue(isFrom ? range?.to : date);
            onSelect?.(newRange, { from: fromFormatted, to: toFormatted });
            onChange?.(newRange, { from: isFrom ? inputValue : fromInputValue, to: isFrom ? toInputValue : inputValue });

            // If from input and date is valid, auto-focus to to input if to is empty
            // if (isFrom && toInputRef.current && !toInputValue.trim()) {
            //   requestAnimationFrame(() => toInputRef.current?.focus());
            // }
          } else {
            onSelect?.(newRange, {
              from: formatDateTimeValue(range?.from),
              to: isFrom ? formatDateTimeValue(range?.to) : undefined,
            });
            onChange?.(newRange, {
              from: formatDateTimeValue(range?.from),
              to: isFrom ? formatDateTimeValue(range?.to) : undefined,
            });
          }
        }}
        onClear={
          !isFrom
            ? () => {
                setFromInputValue("");
                setToInputValue("");
                const newRange: DateRange = { from: undefined, to: undefined };
                setRange(newRange);
                onSelect?.(newRange, newRange as DateRangeText);
                onChange?.(newRange, newRange as DateRangeText);
              }
            : undefined
        }
        onBlur={() => {
          // Check if blurring out of the entire range picker group
          const activeElement = document.activeElement;
          if (
            activeElement !== fromInputRef.current &&
            activeElement !== toInputRef.current
          ) {
            // Delay validation by 100ms
            setTimeout(() => {
              // Check again if still blurred out of the group
              const currentActiveElement = document.activeElement;
              if (
                currentActiveElement !== fromInputRef.current &&
                currentActiveElement !== toInputRef.current
              ) {
                // Blurred out of the group, validate both inputs
                const validateInput = (val: string) => {
                  if (val.trim() === "") return true; // empty is valid (will clear)
                  let parsed: Date | undefined;
                  if (showTime) {
                    parsed = parseDate(val, `${inputFormat} ${timeFormat}`);
                  } else {
                    parsed = parseDate(val, inputFormat);
                  }
                  return !!parsed;
                };

                const fromValid = validateInput(fromInputValue);
                const toValid = validateInput(toInputValue);

                // Clear if either is invalid, or if only one has value
                const shouldClear =
                  !fromValid ||
                  !toValid ||
                  (fromInputValue.trim() && !toInputValue.trim()) ||
                  (!fromInputValue.trim() && toInputValue.trim());

                if (shouldClear) {
                  // If either is invalid, clear both
                  setFromInputValue("");
                  setToInputValue("");
                  const newRange: DateRange = { from: undefined, to: undefined };
                  setRange(newRange);
                  onSelect?.(newRange, newRange as DateRangeText);
                  onChange?.(newRange, newRange as DateRangeText);
                }
              }
            }, 100);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
    );
  };

  // Default input rendering with two inputs
  return (
    <div
      className={cn(
        "group relative flex items-center border rounded-md focus-within:ring-2 focus-within:ring-offset-2 bg-background transition-[color,box-shadow]",
        {
          "border-input focus-within:ring-ring": !props.state,
          "border-success focus-within:ring-success": props.state === "success",
          "border-warning focus-within:ring-warning": props.state === "warning",
          "border-error focus-within:ring-error": props.state === "error",
        }
      )}
    >
      {renderRangeInput("from", fromInputValue, setFromInputValue)}
      <span
        className={cn("text-muted-foreground select-none pl-2", {
          "opacity-30": props.disabled,
        })}
      >
        {separator}
      </span>
      {renderRangeInput("to", toInputValue, setToInputValue, {
        suffixIcon: isMobile
          ? mobileMode === "drawer"
            ? drawPicker
            : popPicker
          : desktopMode === "drawer"
            ? drawPicker
            : popPicker,
      })}
      {props.isFloatLabel && typeof label === "string" && (
        <FloatingLabel
          htmlFor={inputId}
          size={props.size}
          infoTooltip={props.infoTooltip}
          className="z-10"
          shouldFloat={shouldFloat}
        >
          {label}
        </FloatingLabel>
      )}
    </div>
  );
}

export const CalendarDayButton = SCalendarDayButton;
export type CalendarDayButtonProps = SCalendarDayButtonProps;
