"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@dsui/ui/lib/utils";
import { Button, buttonVariants } from "@dsui/ui/components/button";

type CalendarColor =
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "muted"
  | "success"
  | "error"
  | "warning"
  | "foreground";

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  variant?: "default" | "rounded";
  color?: CalendarColor;
};
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  variant = "default",
  color = "primary",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();
  const colorClasses = getColorClasses(color);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "ds:bg-white ds:group/calendar ds:p-3 ds:[--cell-size:--ds-spacing(8)] ds:[[data-slot=card-content]_&]:bg-transparent ds:[[data-slot=popover-content]_&]:bg-transparent",
        String.raw`ds:rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`ds:rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("ds:w-fit", defaultClassNames.root),
        months: cn(
          "ds:flex ds:gap-4 ds:flex-col ds:md:flex-row ds:relative",
          defaultClassNames.months
        ),
        month: cn("ds:flex ds:flex-col ds:w-full ds:gap-4", defaultClassNames.month),
        nav: cn(
          "ds:flex ds:items-center ds:gap-1 ds:w-full ds:absolute ds:top-0 ds:inset-x-0 ds:justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "ds:size-(--cell-size) ds:aria-disabled:opacity-50 ds:p-0 ds:select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "ds:size-(--cell-size) ds:aria-disabled:opacity-50 ds:p-0 ds:select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "ds:flex ds:items-center ds:justify-center ds:h-(--cell-size) ds:w-full ds:px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "ds:w-full ds:flex ds:items-center ds:text-sm ds:font-medium ds:justify-center ds:h-(--cell-size) ds:gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "ds:relative ds:has-focus:border-ink500 ds:border ds:border-border ds:shadow-xs ds:has-focus:ring-ink500/50 ds:has-focus:ring-[3px] ds:rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "ds:absolute ds:bg-white ds:inset-0 ds:opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "ds:select-none ds:font-medium",
          captionLayout === "label"
            ? "ds:text-sm"
            : "ds:rounded-md ds:pl-2 ds:pr-1 ds:flex ds:items-center ds:gap-1 ds:text-sm ds:h-8 ds:[&>svg]:text-ink700 ds:[&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "ds:w-full ds:border-collapse",
        weekdays: cn("ds:flex", defaultClassNames.weekdays),
        weekday: cn(
          "ds:text-ink700 ds:rounded-md ds:flex-1 ds:font-normal ds:text-[0.8rem] ds:select-none",
          defaultClassNames.weekday
        ),
        week: cn("ds:flex ds:w-full ds:mt-2", defaultClassNames.week),
        week_number_header: cn(
          "ds:select-none ds:w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "ds:text-[0.8rem] ds:select-none ds:text-ink700",
          defaultClassNames.week_number
        ),
        day: cn(
          "ds:relative ds:w-full ds:h-full ds:p-0 ds:text-center ds:[&:last-child[data-selected=true]_button]:rounded-r-md ds:group/day ds:aspect-square ds:select-none",
          props.showWeekNumber
            ? "ds:[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "ds:[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          variant === "rounded"
            ? `${colorClasses.rangeBg} ds:rounded-l-full`
            : "ds:rounded-l-md ds:bg-ink200",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          variant === "rounded" ? "ds:rounded-none" : "ds:rounded-none",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          variant === "rounded"
            ? `${colorClasses.rangeBg} ds:rounded-r-full`
            : "ds:rounded-r-md ds:bg-ink200",
          defaultClassNames.range_end
        ),
        today: cn(
          variant === "rounded"
            ? `ds:rounded-full ds:bg-ink200 ds:data-[selected=true]:rounded-l-none ds:data-[selected=true]:${colorClasses.rangeBg} ds:[&_button[data-range-middle=true]]:bg-transparent`
            : "ds:bg-ink200 ds:text-ink900 ds:rounded-md ds:data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "ds:text-ink700 ds:aria-selected:text-ink700",
          defaultClassNames.outside
        ),
        disabled: cn(
          "ds:text-ink700 ds:opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("ds:invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("ds:size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("ds:size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("ds:size-4", className)} {...props} />
          );
        },
        DayButton: (props) => (
          <CalendarDayButton {...props} variant={variant} color={color} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="ds:flex ds:size-(--cell-size) ds:items-center ds:justify-center ds:text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

type CalendarDayButtonProps = Omit<
  React.ComponentProps<typeof DayButton>,
  "color"
> & {
  variant?: "default" | "rounded";
  color?: CalendarColor;
};

// Color variants for calendar day buttons
const getColorClasses = (color: CalendarColor = "foreground") => {
  const colorMap = {
    primary: {
      selected: "ds:bg-primaryA-500 ds:text-white",
      selectedHover: "ds:hover:bg-primaryA-500/90",
      rangeBg: "ds:bg-primaryA-500/20 dark:ds:bg-primaryA-500/10",
      focusRing: "ds:ring-primaryA-500/20 dark:ds:ring-primaryA-500/40",
    },
    secondary: {
      selected: "ds:bg-primaryC-500 ds:text-white",
      selectedHover: "ds:hover:bg-primaryC-500/90",
      rangeBg: "ds:bg-primaryC-500/20 dark:ds:bg-primaryC-500/10",
      focusRing: "ds:ring-primaryC-500/20 dark:ds:ring-primaryC-500/40",
    },
    accent: {
      selected: "ds:bg-ink200 ds:text-ink900",
      selectedHover: "ds:hover:bg-ink200/90",
      rangeBg: "ds:bg-ink200/20 dark:ds:bg-ink200/10",
      focusRing: "ds:ring-ink200/20 dark:ds:ring-ink200/40",
    },
    destructive: {
      selected: "ds:bg-red600 ds:text-white",
      selectedHover: "ds:hover:bg-red600/90",
      rangeBg: "ds:bg-red600/20 dark:ds:bg-red600/10",
      focusRing: "ds:ring-red600/20 dark:ds:ring-red600/40",
    },
    muted: {
      selected: "ds:bg-ink200 ds:text-ink700",
      selectedHover: "ds:hover:bg-ink200/90",
      rangeBg: "ds:bg-ink200/30 dark:ds:bg-ink200/20",
      focusRing: "ds:ring-ink200/20 dark:ds:ring-ink200/40",
    },
    success: {
      selected: "ds:bg-green500 ds:text-white",
      selectedHover: "ds:hover:bg-green500/90",
      rangeBg: "ds:bg-green500/20 dark:ds:bg-green500/10",
      focusRing: "ds:ring-green500/20 dark:ds:ring-green500/40",
    },
    error: {
      selected: "ds:bg-red500 ds:text-white",
      selectedHover: "ds:hover:bg-red500/90",
      rangeBg: "ds:bg-red500/20 dark:ds:bg-red500/10",
      focusRing: "ds:ring-red500/20 dark:ds:ring-red500/40",
    },
    warning: {
      selected: "ds:bg-orange500 ds:text-white",
      selectedHover: "ds:hover:bg-orange500/90",
      rangeBg: "ds:bg-orange500/20 dark:ds:bg-orange500/10",
      focusRing: "ds:ring-orange500/20 dark:ds:ring-orange500/40",
    },
    foreground: {
      selected: "ds:bg-ink800 ds:text-white",
      selectedHover: "ds:hover:bg-ink800/90",
      rangeBg: "ds:bg-ink800/10 dark:ds:bg-ink800/5",
      focusRing: "ds:ring-ink800/20 dark:ds:ring-ink800/40",
    },
  };

  return colorMap[color];
};

function CalendarDayButton({
  className,
  day,
  modifiers,
  variant = "default",
  color = "foreground",
  ...props
}: CalendarDayButtonProps) {
  const defaultClassNames = getDefaultClassNames();
  const colorClasses = getColorClasses(color);

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "ds:flex ds:aspect-square ds:size-auto ds:w-full ds:min-w-(--cell-size) ds:flex-col ds:gap-1 ds:leading-none ds:font-normal",
        "ds:group-data-[focused=true]/day:relative ds:group-data-[focused=true]/day:z-10 ds:group-data-[focused=true]/day:ring-[3px]",
        "ds:group-data-[focused=true]/day:border-ink500 ds:group-data-[focused=true]/day:ring-ink500/50",
        "ds:[&>span]:text-xs ds:[&>span]:opacity-70",
        // Hover effect chỉ khi chưa selected
        !modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle &&
          "ds:hover:bg-ink200 ds:hover:text-ink900 ds:dark:hover:text-ink900",
        // Selected single day - chỉ apply color khi selected
        modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle &&
          colorClasses.selected,
        // Range start/end - chỉ apply color khi là range start/end
        modifiers.range_start && colorClasses.selected,
        modifiers.range_end && colorClasses.selected,
        // Range middle - apply rangeBg nhưng giữ text color mặc định
        modifiers.range_middle &&
          `${colorClasses.rangeBg} ds:text-ink900`,
        variant === "default" && [
          "ds:data-[range-end=true]:rounded-md ds:data-[range-end=true]:rounded-r-md",
          "ds:data-[range-middle=true]:rounded-none",
          "ds:data-[range-start=true]:rounded-md ds:data-[range-start=true]:rounded-l-md",
        ],
        variant === "rounded" && [
          "ds:data-[selected-single=true]:rounded-full",
          "ds:data-[range-end=true]:rounded-full",
          "ds:data-[range-start=true]:rounded-full",
          modifiers.range_start &&
            `ds:group-data-[focused=true]/day:${colorClasses.focusRing}`,
          modifiers.range_end &&
            `ds:group-data-[focused=true]/day:${colorClasses.focusRing}`,
          modifiers.range_middle && "ds:rounded-none",
          // Chỉ hover:rounded-full khi chưa selected
          !modifiers.selected &&
            !modifiers.range_start &&
            !modifiers.range_end &&
            !modifiers.range_middle &&
            "ds:hover:rounded-full",
        ],
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export {
  Calendar,
  CalendarDayButton,
  type CalendarProps,
  type CalendarDayButtonProps,
  type CalendarColor,
};
