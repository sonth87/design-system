import {
  CalendarDayButton as SCalendarDayButton,
  type CalendarDayButtonProps as SCalendarDayButtonProps,
  Calendar as SCalendar,
  type CalendarProps as SCalendarProps,
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
};

export function Calendar({
  language = "vi",
  className,
  captionLayout = "dropdown",
  formatters,
  buttonVariant,
  locale,
  variant = "default",
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
