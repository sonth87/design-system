import type { Meta, StoryObj } from "@storybook/react";
import {
  CalendarDayButton,
  Calendar,
  type DateRange,
  type CalendarProps,
} from "./Calendar";
import { useState } from "react";
import { format } from "date-fns";
import { enUS, es, vi, ja, ko } from "date-fns/locale";
import Select from "../Select/Select";
import Button from "../Button/Button";

const meta: Meta<CalendarProps> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["single", "multiple", "range"],
      description: "Selection mode for the calendar",
    },
    language: {
      control: { type: "select" },
      options: ["vi", "en"],
      description: "Language for month/day names",
    },
    captionLayout: {
      control: { type: "select" },
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
      description: "Layout of the month/year navigation",
    },
    showOutsideDays: {
      control: { type: "boolean" },
      description: "Show days from previous/next months",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the entire calendar",
    },
    numberOfMonths: {
      control: { type: "number" },
      description: "Number of months to display",
    },
    month: {
      control: { type: "date" },
      description: "The month to display initially",
    },
    onMonthChange: {
      action: "month changed",
      description: "Callback when the month is changed",
    },
    selected: {
      control: false,
      description: "The selected date(s) in the calendar",
    },
    onSelect: {
      action: "date selected",
      description: "Callback when a date is selected",
    },
    defaultMonth: {
      control: { type: "date" },
      description: "The default month to display",
    },
    locale: {
      control: false,
      description: "Locale object for localization",
    },
    showWeekNumber: {
      control: { type: "boolean" },
      description: "Show week numbers in the calendar",
    },
    className: { control: "text", description: "Additional CSS classes" },
    classNames: {
      control: false,
      description:
        "Override default class names. {range_start: string, range_end: string, day_button: string, today: string}",
    },
  },
  args: {
    language: "vi",
    captionLayout: "dropdown",
    showOutsideDays: true,
  },
};

export default meta;
type Story = StoryObj<CalendarProps>;

export const SingleMode: Story = {
  render: function SingleModeComponent(args: CalendarProps) {
    const [date, setDate] = useState<Date>();

    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy")}</strong>
          </p>
        )}
        <Calendar {...args} mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
  args: {},
};

export const SingleModeWithValue: Story = {
  render: function SingleModeWithValueComponent(args: CalendarProps) {
    const [date, setDate] = useState<Date>(new Date(2024, 5, 15));

    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy")}</strong>
          </p>
        )}
        {/* @ts-expect-error - React day picker union type */}
        <Calendar {...args} mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
  args: {},
};

export const MultipleMode: Story = {
  render: function MultipleModeComponent(args: CalendarProps) {
    const [dates, setDates] = useState<Date[]>([]);

    return (
      <div className="flex flex-col gap-4">
        {dates.length > 0 && (
          <div className="text-sm">
            <strong>Selected dates:</strong>
            <ul className="list-disc list-inside mt-1">
              {dates.map((date, i) => (
                <li key={i}>{format(date, "dd/MM/yyyy")}</li>
              ))}
            </ul>
          </div>
        )}
        <Calendar
          {...args}
          mode="multiple"
          selected={dates as any}
          onSelect={setDates as any}
        />
      </div>
    );
  },
  args: {},
};

export const RangeMode: Story = {
  render: function RangeModeComponent(args: CalendarProps) {
    const [range, setRange] = useState<DateRange | undefined>();

    return (
      <div className="flex flex-col gap-4">
        {range?.from && (
          <div className="text-sm">
            <strong>Selected range:</strong>
            <p>
              From: {format(range.from, "dd/MM/yyyy")}
              {range.to && ` ~ To: ${format(range.to, "dd/MM/yyyy")}`}
            </p>
          </div>
        )}
        <Calendar {...args} mode="range" selected={range} onSelect={setRange} />
      </div>
    );
  },
  args: {},
};

export const RangeModeWithValue: Story = {
  render: function RangeModeWithValueComponent(args: CalendarProps) {
    const [range, setRange] = useState<DateRange>({
      from: new Date(2024, 5, 1),
      to: new Date(2024, 5, 15),
    });

    return (
      <div className="flex flex-col gap-4">
        {range?.from && (
          <div className="text-sm">
            <strong>Selected range:</strong>
            <p>
              From: {format(range.from, "dd/MM/yyyy")}
              {range.to && ` ~ To: ${format(range.to, "dd/MM/yyyy")}`}
            </p>
          </div>
        )}
        {/* @ts-expect-error - React day picker union type */}
        <Calendar {...args} mode="range" selected={range} onSelect={setRange} />
      </div>
    );
  },
  args: {},
};

export const VietnameseLocale: Story = {
  render: function VietnameseLocaleComponent(args: CalendarProps) {
    const [date, setDate] = useState<Date>();

    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Đã chọn:{" "}
            <strong>
              {format(date, "EEEE, dd MMMM yyyy", { locale: vi })}
            </strong>
          </p>
        )}
        <Calendar {...args} mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
  args: {
    language: "vi",
  },
};

export const EnglishLocale: Story = {
  render: function EnglishLocaleComponent(args: CalendarProps) {
    const [date, setDate] = useState<Date>();

    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "EEEE, MMMM dd, yyyy")}</strong>
          </p>
        )}
        <Calendar {...args} mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
  args: {
    language: "en",
  },
};

export const WithMultipleMonths: Story = {
  render: function WithMultipleMonthsComponent(args: CalendarProps) {
    const [range, setRange] = useState<DateRange | undefined>();

    return (
      <div className="flex flex-col gap-4">
        {range?.from && (
          <div className="text-sm">
            <strong>Selected range:</strong>
            <p>
              From: {format(range.from, "dd/MM/yyyy")}
              {range.to && ` ~ To: ${format(range.to, "dd/MM/yyyy")}`}
            </p>
          </div>
        )}
        <Calendar {...args} mode="range" selected={range} onSelect={setRange} />
      </div>
    );
  },
  args: {
    numberOfMonths: 2,
  },
};

export const WithDisabledDates: Story = {
  render: function WithDisabledDatesComponent(args: CalendarProps) {
    const [date, setDate] = useState<Date>();

    // Disable weekends
    const disabledDays = [
      { dayOfWeek: [0, 6] }, // Sunday and Saturday
    ];

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Weekends are disabled</p>
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy")}</strong>
          </p>
        )}
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
        />
      </div>
    );
  },
  args: {},
};

export const WithMinMaxDates: Story = {
  render: function WithMinMaxDatesComponent(args: CalendarProps) {
    const [date, setDate] = useState<Date>();

    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Only dates in the current month are selectable
        </p>
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy")}</strong>
          </p>
        )}
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={[
            { before: new Date(today.getFullYear(), today.getMonth(), 1) },
            { after: nextMonth },
          ]}
        />
      </div>
    );
  },
  args: {},
};

export const WithDefaultMonth: Story = {
  render: function WithDefaultMonthComponent(args: CalendarProps) {
    const [date, setDate] = useState<Date>();

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Calendar opens to December 2025
        </p>
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy")}</strong>
          </p>
        )}
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={new Date(2025, 11, 1)}
        />
      </div>
    );
  },
  args: {},
};

export const WithWeekNumbers: Story = {
  render: function WithWeekNumbersComponent(args: CalendarProps) {
    const [date, setDate] = useState<Date>();

    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy")}</strong>
          </p>
        )}
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          showWeekNumber
        />
      </div>
    );
  },
  args: {},
};

export const UnavailableDates: Story = {
  render: function UnavailableDatesComponent(args: CalendarProps) {
    const [date, setDate] = useState<Date>();

    const bookedDates = [
      {
        from: new Date(2025, 9, 10),
        to: new Date(2025, 9, 15),
      },
      {
        from: new Date(2025, 9, 20),
        to: new Date(2025, 9, 22),
      },
    ];

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Unavailable dates are styled differently
        </p>
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy")}</strong>
          </p>
        )}
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={new Date(2025, 9, 1)}
          disabled={bookedDates}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
        />
      </div>
    );
  },
  args: {},
};

export const CustomDaysAndFormatters: Story = {
  render: function CustomDaysAndFormattersComponent(args: CalendarProps) {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(2025, 5, 12),
      to: new Date(2025, 5, 17),
    });

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          mode="range"
          defaultMonth={range?.from}
          selected={range}
          onSelect={setRange}
          numberOfMonths={1}
          captionLayout="dropdown"
          className="rounded-lg border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]"
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString("default", { month: "long" });
            },
          }}
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const isWeekend =
                day.date.getDay() === 0 || day.date.getDay() === 6;
              return (
                <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                  {children}
                  {!modifiers.outside && (
                    <span>{isWeekend ? "$220" : "$100"}</span>
                  )}
                </CalendarDayButton>
              );
            },
          }}
        />
      </div>
    );
  },
  args: {},
};

export const CustomStyle: Story = {
  render: function CustomDaysAndFormattersComponent(args: CalendarProps) {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(2025, 5, 12),
      to: new Date(2025, 5, 17),
    });

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          {...args}
          mode="range"
          selected={range}
          onSelect={setRange}
          classNames={{
            range_start: "bg-sky-600/20 dark:bg-sky-400/10 rounded-l-full",
            range_end: "bg-sky-600/20 dark:bg-sky-400/10 rounded-r-full",
            day_button:
              "data-[range-end=true]:rounded-full! data-[range-start=true]:rounded-full! data-[range-start=true]:bg-sky-600! data-[range-start=true]:text-white! data-[range-start=true]:dark:bg-sky-400! data-[range-start=true]:group-data-[focused=true]/day:ring-sky-600/20 data-[range-start=true]:dark:group-data-[focused=true]/day:ring-sky-400/40 data-[range-end=true]:bg-sky-600! data-[range-end=true]:text-white! data-[range-end=true]:dark:bg-sky-400! data-[range-end=true]:group-data-[focused=true]/day:ring-sky-600/20 data-[range-end=true]:dark:group-data-[focused=true]/day:ring-sky-400/40 data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-sky-600/20 data-[range-middle=true]:dark:bg-sky-400/10",
            today:
              "data-[selected=true]:rounded-l-none! bg-accent! data-[selected=true]:bg-sky-600/20! dark:data-[selected=true]:bg-sky-400/10! [&_button[data-range-middle=true]]:bg-transparent!",
          }}
        />
      </div>
    );
  },
  args: {},
};

export const WithHomeButton: Story = {
  render: function WithHomeButtonComponent(args: CalendarProps) {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 15));
    const [month, setMonth] = useState<Date | undefined>(new Date());

    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy")}</strong>
          </p>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setMonth(new Date());
            setDate(new Date());
          }}
        >
          Today
        </Button>
        <Calendar
          {...args}
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={date}
          onSelect={setDate}
        />
      </div>
    );
  },
  args: {},
};

export const LocalizedCalendar: Story = {
  render: function LocalizedCalendarComponent(args: CalendarProps) {
    const [locale, setLocale] = useState<string>("es");

    const localeMap = {
      en: { label: "English", locale: enUS },
      es: { label: "Español", locale: es },
      vi: { label: "Tiếng Việt", locale: vi },
      ja: { label: "日本語", locale: ja },
      ko: { label: "한국어", locale: ko },
    };

    return (
      <div className="flex flex-col gap-4">
        <Select
          value={locale}
          onValueChange={(value) => setLocale(value)}
          clearable={false}
          options={Object.entries(localeMap).map(([value, { label }]) => ({
            label,
            value,
          }))}
          className="w-fit"
        />
        <Calendar
          mode="single"
          locale={localeMap[locale as keyof typeof localeMap].locale}
        />
      </div>
    );
  },
  args: {},
};
