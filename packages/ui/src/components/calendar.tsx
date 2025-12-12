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
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          variant === "rounded"
            ? `${colorClasses.rangeBg} rounded-l-full`
            : "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          variant === "rounded" ? "rounded-none" : "rounded-none",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          variant === "rounded"
            ? `${colorClasses.rangeBg} rounded-r-full`
            : "rounded-r-md bg-accent",
          defaultClassNames.range_end
        ),
        today: cn(
          variant === "rounded"
            ? `rounded-full bg-accent data-[selected=true]:rounded-l-none data-[selected=true]:${colorClasses.rangeBg} [&_button[data-range-middle=true]]:bg-transparent`
            : "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
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
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },
        DayButton: (props) => (
          <CalendarDayButton {...props} variant={variant} color={color} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
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
      selected: "bg-primary text-primary-foreground",
      selectedHover: "hover:bg-primary/90",
      rangeBg: "bg-primary/20 dark:bg-primary/10",
      focusRing: "ring-primary/20 dark:ring-primary/40",
    },
    secondary: {
      selected: "bg-secondary text-secondary-foreground",
      selectedHover: "hover:bg-secondary/90",
      rangeBg: "bg-secondary/20 dark:bg-secondary/10",
      focusRing: "ring-secondary/20 dark:ring-secondary/40",
    },
    accent: {
      selected: "bg-accent text-accent-foreground",
      selectedHover: "hover:bg-accent/90",
      rangeBg: "bg-accent/20 dark:bg-accent/10",
      focusRing: "ring-accent/20 dark:ring-accent/40",
    },
    destructive: {
      selected: "bg-destructive text-destructive-foreground",
      selectedHover: "hover:bg-destructive/90",
      rangeBg: "bg-destructive/20 dark:bg-destructive/10",
      focusRing: "ring-destructive/20 dark:ring-destructive/40",
    },
    muted: {
      selected: "bg-muted text-muted-foreground",
      selectedHover: "hover:bg-muted/90",
      rangeBg: "bg-muted/30 dark:bg-muted/20",
      focusRing: "ring-muted/20 dark:ring-muted/40",
    },
    success: {
      selected: "bg-success text-success-foreground",
      selectedHover: "hover:bg-success/90",
      rangeBg: "bg-success/20 dark:bg-success/10",
      focusRing: "ring-success/20 dark:ring-success/40",
    },
    error: {
      selected: "bg-error text-error-foreground",
      selectedHover: "hover:bg-error/90",
      rangeBg: "bg-error/20 dark:bg-error/10",
      focusRing: "ring-error/20 dark:ring-error/40",
    },
    warning: {
      selected: "bg-warning text-warning-foreground",
      selectedHover: "hover:bg-warning/90",
      rangeBg: "bg-warning/20 dark:bg-warning/10",
      focusRing: "ring-warning/20 dark:ring-warning/40",
    },
    foreground: {
      selected: "bg-foreground text-background",
      selectedHover: "hover:bg-foreground/90",
      rangeBg: "bg-foreground/10 dark:bg-foreground/5",
      focusRing: "ring-foreground/20 dark:ring-foreground/40",
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
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50",
        "[&>span]:text-xs [&>span]:opacity-70",
        // Hover effect chỉ khi chưa selected
        !modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle &&
          "hover:bg-accent hover:text-accent-foreground dark:hover:text-accent-foreground",
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
          `${colorClasses.rangeBg} text-accent-foreground`,
        variant === "default" && [
          "data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md",
          "data-[range-middle=true]:rounded-none",
          "data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md",
        ],
        variant === "rounded" && [
          "data-[selected-single=true]:rounded-full",
          "data-[range-end=true]:rounded-full",
          "data-[range-start=true]:rounded-full",
          modifiers.range_start &&
            `group-data-[focused=true]/day:${colorClasses.focusRing}`,
          modifiers.range_end &&
            `group-data-[focused=true]/day:${colorClasses.focusRing}`,
          modifiers.range_middle && "rounded-none",
          // Chỉ hover:rounded-full khi chưa selected
          !modifiers.selected &&
            !modifiers.range_start &&
            !modifiers.range_end &&
            !modifiers.range_middle &&
            "hover:rounded-full",
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
