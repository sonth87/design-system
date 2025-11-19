import {
  CalendarDayButton as SCalendarDayButton,
  type CalendarDayButtonProps as SCalendarDayButtonProps,
  Calendar as SCalendar,
  type CalendarProps as SCalendarProps,
  type CalendarColor,
} from "@dsui/ui/components/calendar";
import { cn } from "@dsui/ui/index";
import { vi, enUS } from "date-fns/locale";

export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export type CalendarProps = SCalendarProps & {
  language?: "vi" | "en";
  variant?: "default" | "rounded";
  color?: CalendarColor;
};

export function Calendar({
  language = "vi",
  className,
  captionLayout = "dropdown",
  formatters,
  buttonVariant,
  locale,
  variant = "default",
  color = "primary",
  ...props
}: CalendarProps) {
  const _locale = locale ? locale : language === "en" ? enUS : vi;

  return (
    <SCalendar
      {...props}
      locale={_locale}
      buttonVariant={buttonVariant}
      captionLayout={captionLayout}
      variant={variant}
      color={color}
      formatters={{
        formatMonthDropdown: (date: Date) =>
          date.toLocaleString(_locale.code, { month: "short" }),
        ...formatters,
      }}
      className={cn(
        "mx-auto [--cell-size:clamp(0px,calc(100vw/7.5),40px)]",
        className,
      )}
    />
  );
}

export const CalendarDayButton = SCalendarDayButton;
export type CalendarDayButtonProps = SCalendarDayButtonProps;
export type { CalendarColor };
