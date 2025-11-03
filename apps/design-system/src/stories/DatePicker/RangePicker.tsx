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
import { CalendarIcon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { isMobile } from "react-device-detect";
import { format, parse, isValid, type Locale } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { DATE_FORMAT } from "@/constants/common";

export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

function formatDate(
  date: Date | undefined,
  outputFormat: string = DATE_FORMAT,
  locale?: Locale
) {
  if (!date) return "";

  return format(date, outputFormat, locale ? { locale } : undefined);
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

export type RangePickerProps = {
  fromValue?: string;
  toValue?: string;
  onChange?: (fromValue?: string, toValue?: string, range?: DateRange) => void;
  onSelect?: (range?: DateRange, fromValue?: string, toValue?: string) => void;
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
  fromInputProps?: Omit<InputProps, "value" | "onChange" | "mask">;
  toInputProps?: Omit<InputProps, "value" | "onChange" | "mask">;
  separator?: string;
};

export function RangePicker({
  fromValue,
  toValue,
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
  fromInputProps = {},
  toInputProps = {},
  separator = "~",
}: RangePickerProps) {
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

  const initialFromDate = fromValue
    ? parseDate(fromValue, inputFormat)
    : undefined;
  const initialToDate = toValue ? parseDate(toValue, inputFormat) : undefined;
  const initialRange: DateRange = {
    from: initialFromDate,
    to: initialToDate,
  };

  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(initialRange);
  const [month, setMonth] = React.useState<Date | undefined>(
    initialFromDate || new Date()
  );
  const [fromInputValue, setFromInputValue] = React.useState(fromValue || "");
  const [toInputValue, setToInputValue] = React.useState(toValue || "");

  const _locale: Locale = calendarConfig?.locale
    ? (calendarConfig?.locale as Locale)
    : language === "en"
      ? enUS
      : vi;

  // Helper functions for render props
  const handleSelectForRenderProp = (range?: DateRange) => {
    setRange(range);
    const fromFormatted = formatDate(range?.from, outputFormat, _locale);
    const toFormatted = formatDate(range?.to, outputFormat, _locale);
    setFromInputValue(fromFormatted);
    setToInputValue(toFormatted);
    onSelect?.(range, fromFormatted, toFormatted);
  };

  const handleFromChangeForRenderProp = (text: string) => {
    setFromInputValue(text);
    const parsedDate = parseDate(text, inputFormat);
    const newRange: DateRange = {
      from: parsedDate,
      to: range?.to,
    };
    if (parsedDate) {
      setRange(newRange);
      setMonth(parsedDate);
      onSelect?.(
        newRange,
        formatDate(parsedDate, outputFormat, _locale),
        formatDate(range?.to, outputFormat, _locale)
      );
    } else {
      setRange(newRange);
      onSelect?.(
        newRange,
        undefined,
        formatDate(range?.to, outputFormat, _locale)
      );
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
      onSelect?.(
        newRange,
        formatDate(range?.from, outputFormat, _locale),
        formatDate(parsedDate, outputFormat, _locale)
      );
    } else {
      setRange(newRange);
      onSelect?.(
        newRange,
        formatDate(range?.from, outputFormat, _locale),
        undefined
      );
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
      size={fromInputProps.size}
    >
      <CalendarIcon
        className={cn({
          "size-3":
            fromInputProps.size === "xs" || fromInputProps.size === "sm",
          "size-3.5": !fromInputProps.size || fromInputProps.size === "normal",
          "size-4":
            fromInputProps.size === "lg" || fromInputProps.size === "xl",
        })}
      />
      <span className="sr-only">Select date range</span>
    </Button>
  );

  const calendarSelection = (
    <Calendar
      {...calendarConfig}
      mode="range"
      selected={range}
      captionLayout="dropdown"
      month={month}
      onMonthChange={setMonth}
      onSelect={(selectedRange) => {
        setRange(selectedRange);
        const fromFormatted = formatDate(
          selectedRange?.from,
          outputFormat,
          _locale
        );
        const toFormatted = formatDate(
          selectedRange?.to,
          outputFormat,
          _locale
        );
        setFromInputValue(fromFormatted);
        setToInputValue(toFormatted);
        onSelect?.(selectedRange, fromFormatted, toFormatted);
        onChange?.(fromFormatted, toFormatted, selectedRange);
        if (closeOnSelect && selectedRange?.from && selectedRange?.to) {
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
  );

  const popPicker = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={fromInputProps.disabled}>
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
          "backdrop-blur bg-background/90"
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

  // Default input rendering with two inputs
  return (
    <div className="flex items-center gap-2">
      <Input
        {...fromInputProps}
        clearable
        value={fromInputValue}
        mask={maskToUse}
        onChange={(e) => {
          setFromInputValue(e.target.value);
          const date = parseDate(e.target.value, inputFormat);
          const newRange: DateRange = {
            from: date,
            to: range?.to,
          };
          if (date) {
            setRange(newRange);
            setMonth(date);
            const fromFormatted = formatDate(date, outputFormat, _locale);
            const toFormatted = formatDate(range?.to, outputFormat, _locale);
            onSelect?.(newRange, fromFormatted, toFormatted);
            onChange?.(fromFormatted, toFormatted, newRange);
          } else {
            onSelect?.(
              newRange,
              undefined,
              formatDate(range?.to, outputFormat, _locale)
            );
            onChange?.(
              undefined,
              formatDate(range?.to, outputFormat, _locale),
              newRange
            );
          }
        }}
        onBlur={() => {
          const parsedDate = parseDate(fromInputValue, inputFormat);
          if (!parsedDate) {
            setFromInputValue("");
            const newRange: DateRange = { from: undefined, to: range?.to };
            setRange(newRange);
            onSelect?.(
              newRange,
              undefined,
              formatDate(range?.to, outputFormat, _locale)
            );
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
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
      <span className="text-muted-foreground select-none">{separator}</span>
      <Input
        {...toInputProps}
        clearable
        value={toInputValue}
        mask={maskToUse}
        onChange={(e) => {
          setToInputValue(e.target.value);
          const date = parseDate(e.target.value, inputFormat);
          const newRange: DateRange = {
            from: range?.from,
            to: date,
          };
          if (date) {
            setRange(newRange);
            const fromFormatted = formatDate(
              range?.from,
              outputFormat,
              _locale
            );
            const toFormatted = formatDate(date, outputFormat, _locale);
            onSelect?.(newRange, fromFormatted, toFormatted);
            onChange?.(fromFormatted, toFormatted, newRange);
          } else {
            onSelect?.(
              newRange,
              formatDate(range?.from, outputFormat, _locale),
              undefined
            );
            onChange?.(
              formatDate(range?.from, outputFormat, _locale),
              undefined,
              newRange
            );
          }
        }}
        onBlur={() => {
          const parsedDate = parseDate(toInputValue, inputFormat);
          if (!parsedDate) {
            setToInputValue("");
            const newRange: DateRange = { from: range?.from, to: undefined };
            setRange(newRange);
            onSelect?.(
              newRange,
              formatDate(range?.from, outputFormat, _locale),
              undefined
            );
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
    </div>
  );
}

export const CalendarDayButton = SCalendarDayButton;
export type CalendarDayButtonProps = SCalendarDayButtonProps;
