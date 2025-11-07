import * as React from "react";
import {
  CalendarDayButton as SCalendarDayButton,
  type CalendarDayButtonProps as SCalendarDayButtonProps,
  Calendar,
  type CalendarProps,
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
import { CalendarIcon, MoveRight } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { isMobile } from "react-device-detect";
import { format as dfFormat, parse, isValid, type Locale } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { DATE_FORMAT } from "@/constants/common";
import { FloatingLabel } from "@/components/FloatLabel";

export type DateRange = {
  from?: Date | undefined;
  to?: Date | undefined;
} | null;

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

export type RangePickerProps = Omit<
  InputProps,
  | "label"
  | "value"
  | "placeholder"
  | "onChange"
  | "onSelect"
  | "mask"
  | "children"
> & {
  label?: string | [string, string];
  placeholder?: string | [string, string];
  value?: DateRangeText;
  onChange?: (value?: DateRange, text?: DateRangeText) => void;
  onSelect?: (value?: DateRange, text?: DateRangeText) => void;
  calendarClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  size?: VariantProps<typeof Input>["size"];
  format?: FormatType;
  language?: "vi" | "en";
  mask?: boolean | string;
  closeOnSelect?: boolean;
  showOutsideDays?: boolean;
  calendarConfig?: CalendarProps;
  desktopMode?: "popover" | "drawer";
  mobileMode?: "popover" | "drawer";
  children?: (props: RangePickerRenderProps) => React.ReactNode;
  separator?: React.ReactNode;
  showTime?: boolean;
  timeFormat?: "HH:mm" | "HH:mm:ss";
  hideDate?: boolean;
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
  desktopMode = "popover",
  mobileMode = "drawer",
  children,
  separator = <MoveRight className="size-5" />,
  showTime = false,
  timeFormat = "HH:mm",
  hideDate = false,
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
    const parsedDate = parseDate(text, inputFormat);
    const newRange: DateRange = { from: parsedDate, to: range?.to };
    if (parsedDate) {
      setRange(newRange);
      setMonth(parsedDate);
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
    const parsedDate = parseDate(text, inputFormat);
    const newRange: DateRange = {
      from: range?.from,
      to: parsedDate,
    };
    if (parsedDate) {
      setRange(newRange);
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

  const handleTimeChangeFrom = (
    _event?: React.ChangeEvent<HTMLInputElement>,
    _value?: string,
    date?: Date
  ) => {
    if (date) {
      const newRange: DateRange = {
        from: date,
        to: range?.to,
      };
      setRange(newRange);
      setFromInputValue(formatDateTimeValue(date));
      onSelect?.(newRange, {
        from: formatDateTimeValue(date),
        to: formatDateTimeValue(range?.to),
      });
      onChange?.(newRange, {
        from: formatDateTimeValue(date),
        to: formatDateTimeValue(range?.to),
      });
    }
  };

  const handleTimeChangeTo = (
    _event?: React.ChangeEvent<HTMLInputElement>,
    _value?: string,
    date?: Date
  ) => {
    if (date) {
      const newRange: DateRange = {
        from: range?.from,
        to: date,
      };
      setRange(newRange);
      setToInputValue(formatDateTimeValue(date));
      onSelect?.(newRange, {
        from: formatDateTimeValue(range?.from),
        to: formatDateTimeValue(date),
      });
      onChange?.(newRange, {
        from: formatDateTimeValue(range?.from),
        to: formatDateTimeValue(date),
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
          onSelect={(selectedRange) => {
            setRange(selectedRange);
            const fromFormatted = formatDateTimeValue(selectedRange?.from);
            const toFormatted = formatDateTimeValue(selectedRange?.to);
            setFromInputValue(fromFormatted);
            setToInputValue(toFormatted);
            onSelect?.(selectedRange, { from: fromFormatted, to: toFormatted });
            onChange?.(selectedRange, { from: fromFormatted, to: toFormatted });
            if (
              closeOnSelect &&
              selectedRange?.from &&
              selectedRange?.to &&
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
          {range?.from && (
            <TimePicker
              value={dfFormat(range.from, timeFormat)}
              onChange={handleTimeChangeFrom}
              format={timeFormat}
              showHours
              showMinutes
              showSeconds={timeFormat === "HH:mm:ss"}
            />
          )}
          {range?.to && (
            <>
              <div className="border-l border-border" />
              <TimePicker
                value={dfFormat(range.to, timeFormat)}
                onChange={handleTimeChangeTo}
                format={timeFormat}
                showHours
                showMinutes
                showSeconds={timeFormat === "HH:mm:ss"}
              />
            </>
          )}
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
        id={inputId}
        size={
          props.isFloatLabel ? (props.size ? props.size : "xl") : props.size
        }
        className={cn(
          props.className,
          "relative peer border-0 focus:ring-0 rounded-none hover:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:border-0",
          isFrom ? "pr-0" : ""
        )}
        label={props.isFloatLabel && Array.isArray(label) ? label[isFrom ? 0 : 1] : ""}
        placeholder={
          Array.isArray(placeholder) ? placeholder[isFrom ? 0 : 1] : placeholder
        }
        clearable={!isFrom}
        value={inputValue}
        mask={maskToUse}
        onChange={(e) => {
          setInputValue(e.target.value);
          const date = parseDate(e.target.value, inputFormat);
          const newRange: DateRange = isFrom
            ? { from: date, to: range?.to }
            : { from: range?.from, to: date };

          if (date) {
            setRange(newRange);
            if (isFrom) setMonth(date);
            const fromFormatted = formatDate(
              isFrom ? date : range?.from,
              outputFormat,
              _locale
            );
            const toFormatted = formatDate(
              isFrom ? range?.to : date,
              outputFormat,
              _locale
            );
            onSelect?.(newRange, { from: fromFormatted, to: toFormatted });
            onChange?.(newRange, { from: fromFormatted, to: toFormatted });
          } else {
            onSelect?.(newRange, {
              from: formatDate(range?.from, outputFormat, _locale),
              to: isFrom
                ? formatDate(range?.to, outputFormat, _locale)
                : undefined,
            });
            onChange?.(newRange, {
              from: formatDate(range?.from, outputFormat, _locale),
              to: isFrom
                ? formatDate(range?.to, outputFormat, _locale)
                : undefined,
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
          const parsedDate = parseDate(inputValue, inputFormat);
          if (!parsedDate) {
            setInputValue("");
            const newRange: DateRange = isFrom
              ? { from: undefined, to: range?.to }
              : { from: range?.from, to: undefined };
            setRange(newRange);
            onSelect?.(newRange, {
              from: formatDate(range?.from, outputFormat, _locale),
              to: isFrom
                ? formatDate(range?.to, outputFormat, _locale)
                : undefined,
            });
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
    <div className="group relative flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-background transition-[color,box-shadow]">
      {renderRangeInput("from", fromInputValue, setFromInputValue)}
      <span className="text-muted-foreground select-none pl-2">
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
