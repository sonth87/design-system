import * as React from "react";
import { Calendar } from "@dsui/ui/components/calendar";
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
import { format, parse, isValid } from "date-fns";
import { DATE_FORMAT } from "@/constants/common";

function formatDate(
  date: Date | undefined,
  outputFormat: string = DATE_FORMAT
) {
  if (!date) return "";

  return format(date, outputFormat);
}

const parseDate = (
  str: string,
  inputFormat: string = DATE_FORMAT
): Date | undefined => {
  const date = parse(str, inputFormat, new Date());
  return isValid(date) ? date : undefined;
};

export type FormatType = string | { input: string; output: string };

export type DatePickerProps = Omit<
  InputProps,
  "value" | "onChange" | "onSelect"
> & {
  value?: string;
  onChange?: (date?: Date, text?: string) => void;
  onSelect?: (date?: Date, text?: string) => void;
  calendarClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  size?: VariantProps<typeof Input>["size"];
  format?: FormatType;
};

export function DatePicker({
  value,
  onSelect,
  calendarClassName,
  side = "bottom",
  align = "start",
  format = DATE_FORMAT,
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

  const initialDate = value ? parseDate(value, inputFormat) : undefined;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [month, setMonth] = React.useState<Date | undefined>(initialDate);
  const [inputValue, setInputValue] = React.useState(value || "");

  const triggerComponent = (
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
    <Calendar
      mode="single"
      selected={date}
      captionLayout="dropdown"
      month={month}
      onMonthChange={setMonth}
      onSelect={(date) => {
        setDate(date);
        setInputValue(formatDate(date, outputFormat));
        setOpen(false);
        onSelect?.(date, formatDate(date, outputFormat));
      }}
      className={cn(
        "mx-auto",
        {
          "[--cell-size:clamp(0px,calc(100vw/7.5),52px)]": isMobile,
          "[--cell-size:clamp(0px,calc(100vw/7.5),34px)]": !isMobile,
        },
        calendarClassName
      )}
    />
  );

  const popPicker = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={props.disabled}>
        {triggerComponent}
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
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
      <DrawerContent className="w-auto overflow-hidden p-0">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Select date</DrawerTitle>
          <DrawerDescription>Set your date of birth</DrawerDescription>
        </DrawerHeader>
        {calendarSelection}
      </DrawerContent>
    </Drawer>
  );

  return (
    <Input
      {...props}
      clearable
      value={inputValue}
      onChange={(e) => {console.log('onChange called');
        setInputValue(e.target.value);
        const date = parseDate(e.target.value, inputFormat);
        if (date) {
          setDate(date);
          setMonth(date);
          onSelect?.(date, formatDate(date, outputFormat));
        } else {
          onSelect?.(undefined, "");
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true);
        }
      }}
      suffixIcon={isMobile ? drawPicker : popPicker}
    />
  );
}
