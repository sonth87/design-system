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
        "ds:bg-background ds:group/calendar ds:p-3 ds:[--cell-size:--spacing(8)] ds:[[data-slot=card-content]_&]:bg-transparent ds:[[data-slot=popover-content]_&]:bg-transparent",
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
          "ds:relative ds:has-focus:border-ring ds:border ds:border-input ds:shadow-xs ds:has-focus:ring-ring/50 ds:has-focus:ring-[3px] ds:rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "ds:absolute ds:bg-popover ds:inset-0 ds:opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "ds:select-none ds:font-medium",
          captionLayout === "label"
            ? "ds:text-sm"
            : "ds:rounded-md ds:pl-2 ds:pr-1 ds:flex ds:items-center ds:gap-1 ds:text-sm ds:h-8 ds:[&>svg]:text-muted-foreground ds:[&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "ds:w-full ds:border-collapse",
        weekdays: cn("ds:flex", defaultClassNames.weekdays),
        weekday: cn(
          "ds:text-muted-foreground ds:rounded-md ds:flex-1 ds:font-normal ds:text-[0.8rem] ds:select-none",
          defaultClassNames.weekday
        ),
        week: cn("ds:flex ds:w-full ds:mt-2", defaultClassNames.week),
        week_number_header: cn(
          "ds:select-none ds:w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "ds:text-[0.8rem] ds:select-none ds:text-muted-foreground",
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
            : "ds:rounded-l-md ds:bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          variant === "rounded" ? "ds:rounded-none" : "ds:rounded-none",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          variant === "rounded"
            ? `${colorClasses.rangeBg} ds:rounded-r-full`
            : "ds:rounded-r-md ds:bg-accent",
          defaultClassNames.range_end
        ),
        today: cn(
          variant === "rounded"
            ? `ds:rounded-full ds:bg-accent ds:data-[selected=true]:rounded-l-none ds:data-[selected=true]:${colorClasses.rangeBg} ds:[&_button[data-range-middle=true]]:bg-transparent`
            : "ds:bg-accent ds:text-accent-foreground ds:rounded-md ds:data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "ds:text-muted-foreground ds:aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "ds:text-muted-foreground ds:opacity-50",
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
      selected: "ds:bg-primary ds:text-primary-foreground",
      selectedHover: "ds:hover:bg-primary/90",
      rangeBg: "ds:bg-primary/20 dark:ds:bg-primary/10",
      focusRing: "ds:ring-primary/20 dark:ds:ring-primary/40",
    },
    secondary: {
      selected: "ds:bg-secondary ds:text-secondary-foreground",
      selectedHover: "ds:hover:bg-secondary/90",
      rangeBg: "ds:bg-secondary/20 dark:ds:bg-secondary/10",
      focusRing: "ds:ring-secondary/20 dark:ds:ring-secondary/40",
    },
    accent: {
      selected: "ds:bg-accent ds:text-accent-foreground",
      selectedHover: "ds:hover:bg-accent/90",
      rangeBg: "ds:bg-accent/20 dark:ds:bg-accent/10",
      focusRing: "ds:ring-accent/20 dark:ds:ring-accent/40",
    },
    destructive: {
      selected: "ds:bg-destructive ds:text-destructive-foreground",
      selectedHover: "ds:hover:bg-destructive/90",
      rangeBg: "ds:bg-destructive/20 dark:ds:bg-destructive/10",
      focusRing: "ds:ring-destructive/20 dark:ds:ring-destructive/40",
    },
    muted: {
      selected: "ds:bg-muted ds:text-muted-foreground",
      selectedHover: "ds:hover:bg-muted/90",
      rangeBg: "ds:bg-muted/30 dark:ds:bg-muted/20",
      focusRing: "ds:ring-muted/20 dark:ds:ring-muted/40",
    },
    success: {
      selected: "ds:bg-success ds:text-success-foreground",
      selectedHover: "ds:hover:bg-success/90",
      rangeBg: "ds:bg-success/20 dark:ds:bg-success/10",
      focusRing: "ds:ring-success/20 dark:ds:ring-success/40",
    },
    error: {
      selected: "ds:bg-error ds:text-error-foreground",
      selectedHover: "ds:hover:bg-error/90",
      rangeBg: "ds:bg-error/20 dark:ds:bg-error/10",
      focusRing: "ds:ring-error/20 dark:ds:ring-error/40",
    },
    warning: {
      selected: "ds:bg-warning ds:text-warning-foreground",
      selectedHover: "ds:hover:bg-warning/90",
      rangeBg: "ds:bg-warning/20 dark:ds:bg-warning/10",
      focusRing: "ds:ring-warning/20 dark:ds:ring-warning/40",
    },
    foreground: {
      selected: "ds:bg-foreground ds:text-background",
      selectedHover: "ds:hover:bg-foreground/90",
      rangeBg: "ds:bg-foreground/10 dark:ds:bg-foreground/5",
      focusRing: "ds:ring-foreground/20 dark:ds:ring-foreground/40",
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
        "ds:group-data-[focused=true]/day:border-ring ds:group-data-[focused=true]/day:ring-ring/50",
        "ds:[&>span]:text-xs ds:[&>span]:opacity-70",
        // Hover effect chỉ khi chưa selected
        !modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle &&
          "ds:hover:bg-accent ds:hover:text-accent-foreground ds:dark:hover:text-accent-foreground",
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
          `${colorClasses.rangeBg} ds:text-accent-foreground`,
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
