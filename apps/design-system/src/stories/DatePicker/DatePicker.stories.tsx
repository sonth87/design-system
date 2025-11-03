import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { DATE_FORMAT } from "@/constants/common";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
    },
    helperText: {
      control: { type: "text" },
    },
    isFloatLabel: {
      control: { type: "boolean" },
    },
    state: {
      control: { type: "select" },
      options: [undefined, "default", "success", "warning", "error"],
    },
    size: {
      control: { type: "select" },
      options: [undefined, "xs", "sm", "select", "lg", "xl"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    placeholder: {
      control: { type: "text" },
    },
    mask: {
      control: { type: "text" },
      description:
        "Input mask for the date picker. True means auto-generated, String means custom. Eg: '99/99/9999'",
    },
    format: {
      control: { type: "object" },
      description:
        "Date format: string (e.g., 'dd/MM/yyyy') or object { input: string, output: string }. For more: <a href='https://date-fns.org/v4.1.0/docs/format'>https://date-fns.org/v4.1.0/docs/format</a>",
    },
    infoTooltip: {
      control: { type: "text" },
    },
    clearable: {
      control: { type: "boolean" },
    },
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    language: {
      control: { type: "select" },
      options: ["vi", "en"],
      description:
        "Language for the date picker calendar. 'vi', 'en' or date-fns/locale",
    },
    onChange: {
      description:
        "Called when date value changes. Receives the new value and date. Example: onChange(event, newValue, newDate)",
    },
    onSelect: {
      description:
        "Called when a date is selected. Receives the new value and date. Example: onSelect(newDate, newValue)",
    },
    closeOnSelect: {
      control: { type: "boolean" },
    },
    desktopMode: {
      control: { type: "select" },
      options: ["popover", "drawer"],
      description: "Display mode for desktop devices",
    },
    mobileMode: {
      control: { type: "select" },
      options: ["popover", "drawer"],
      description: "Display mode for mobile devices",
    },
    showOutsideDays: {
      control: { type: "boolean" },
    },
    calendarConfig: {
      control: { type: "object" },
      description: "Additional configuration props for the Calendar component",
    },
    showTime: {
      control: { type: "boolean" },
      description: "Show time picker alongside date picker",
    },
    timeFormat: {
      control: { type: "select" },
      options: ["HH:mm", "HH:mm:ss"],
      description: "Time format: HH:mm or HH:mm:ss",
    },
    hideDate: {
      control: { type: "boolean" },
      description: "Hide date picker and show only time picker",
    },
    timePickerMode: {
      control: { type: "select" },
      options: ["wheel", "select", "compact"],
      description:
        "Display mode for time picker: iOS wheel, normal dropdown, or grid selection",
    },
    hourInterval: {
      control: { type: "number" },
      description: "Hour interval (e.g., 1, 2, 3) - defaults to 1",
    },
    minuteInterval: {
      control: { type: "number" },
      description: "Minute interval (e.g., 5, 10, 15, 30) - defaults to 1",
    },
    secondInterval: {
      control: { type: "number" },
      description: "Second interval (e.g., 5, 10, 15, 30) - defaults to 1",
    },
    disabledTimes: {
      control: { type: "object" },
      description:
        "Array of disabled times in 'HH:mm' format (e.g., ['09:00', '12:00'])",
    },
    disabledTimeRanges: {
      control: { type: "object" },
      description:
        "Array of disabled time ranges (e.g., [{ from: '01:00', to: '05:00' }])",
    },
    showNowButton: {
      control: { type: "boolean" },
      description:
        "Show 'Now' button to select current time or nearest available time",
    },
    nowButtonLabel: {
      control: { type: "text" },
      description: "Label for 'Now' button (defaults to 'Now')",
    },
    timePickerLabel: {
      control: { type: "object" },
      description:
        "Labels for time picker columns (e.g., { hours: 'Hour', minutes: 'Minute' })",
    },
  },
  args: {
    language: "vi",
    format: "dd/MM/yyyy",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <DatePicker
        {...args}
        value={date ? format(date, DATE_FORMAT) : ""}
        onSelect={handleSelect}
      />
    );
  },
  args: {},
};

export const DefaultWithValue: Story = {
  render: function DefaultComponent(args) {
    return <DatePicker {...args} value="20/10/1991" format="dd/MM/yyyy" />;
  },
  args: {},
};

export const WithLabel: Story = {
  render: function WithLabelComponent(args) {
    return (
      <div className="flex flex-col gap-4">
        <DatePicker {...args} value="20/10/1991" />
        <DatePicker isFloatLabel size="lg" {...args} value="29/08/2017" />
        <DatePicker isFloatLabel {...args} value="26/02/2020" />
      </div>
    );
  },
  args: {
    label: "Select Date",
    helperText: "Choose a date from the calendar",
  },
};

export const WithState: Story = {
  render: function WithStateComponent(args) {
    const [date, setDate] = useState<Date | undefined>();
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <DatePicker
        {...args}
        value={date ? format(date, DATE_FORMAT) : ""}
        onSelect={handleSelect}
      />
    );
  },
  args: {
    label: "Error Date",
    state: "error",
    helperText: "This field is required",
  },
};

export const Disabled: Story = {
  render: function DisabledComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <DatePicker
        {...args}
        value={date ? format(date, DATE_FORMAT) : ""}
        onSelect={handleSelect}
      />
    );
  },
  args: {
    disabled: true,
  },
};

export const WithMask: Story = {
  render: function WithMaskComponent(args) {
    const [date, setDate] = useState<Date | undefined>();
    const handleSelect = (d: Date | undefined) => setDate(d);

    return (
      <>
        {date && <span>Selected date: {format(date, DATE_FORMAT)}</span>}
        <DatePicker
          {...args}
          value={date ? format(date, DATE_FORMAT) : ""}
          onSelect={(d) => handleSelect(d)}
        />
      </>
    );
  },
  args: {
    label: "Masked Date Input",
    mask: "99/99/9999",
    placeholder: "MM/DD/YYYY",
  },
};

export const WithAutoMask: Story = {
  render: function WithMaskComponent(args) {
    const [date, setDate] = useState<string | undefined>();
    const handleSelect = (d: string | undefined) => setDate(d);

    return (
      <>
        {date && <span>Selected date: {date}</span>}
        <DatePicker
          {...args}
          value={date}
          onSelect={(_, d) => handleSelect(d)}
        />
      </>
    );
  },
  args: {
    label: "Masked Date Input",
    mask: true,
    format: "yyyy.MM.dd",
  },
};

export const WithDifferentFormats: Story = {
  render: function WithDifferentFormats(args) {
    return (
      <div className="flex flex-col gap-4">
        <DatePicker {...args} label="yyyy-MM-DD" format="yyyy-MM-dd" />
        <DatePicker {...args} label="MM.yyyy" format="MM.yyyy" />
        <DatePicker
          {...args}
          label="yyyy"
          format="yyyy"
          value={new Date().getFullYear().toString()}
        />
        <DatePicker
          {...args}
          label="EEEE, dd MMM yyyy"
          format="EEEE, dd MMM yyyy"
        />
        <DatePicker {...args} label="MMMM, yyyy" format="MMMM, yyyy" />
      </div>
    );
  },
};

export const CustomWithChildren: Story = {
  render: function CustomWithChildrenComponent(args) {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Custom trigger with children render prop
        </p>
        <DatePicker
          {...args}
          value={date ? format(date, DATE_FORMAT) : ""}
          onSelect={(d) => setDate(d)}
        >
          {({ value, date: currentDate }) => (
            <button
              className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => {
                console.log("Current value:", value);
                console.log("Current date:", currentDate);
              }}
            >
              {value || "Chọn ngày tháng"}
            </button>
          )}
        </DatePicker>
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, DATE_FORMAT)}</strong>
          </p>
        )}
      </div>
    );
  },
  args: {
    format: "dd/MM/yyyy",
    language: "vi",
  },
};

export const CustomWithCard: Story = {
  render: function CustomWithCardComponent(args) {
    const [date, setDate] = useState<Date | undefined>();

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Custom card-style trigger
        </p>
        <DatePicker
          {...args}
          value={date ? format(date, DATE_FORMAT) : ""}
          onSelect={(d) => setDate(d)}
        >
          {({ value, date: currentDate }) => (
            <div className="p-4 rounded-lg border border-input bg-card hover:bg-accent transition-colors cursor-pointer min-w-[200px]">
              <div className="text-xs text-muted-foreground mb-1">
                Ngày sinh
              </div>
              <div className="text-lg font-semibold">
                {value || "Chưa chọn"}
              </div>
              {currentDate && (
                <div className="text-xs text-muted-foreground mt-1">
                  {format(currentDate, "EEEE, dd MMMM yyyy", { locale: vi })}
                </div>
              )}
            </div>
          )}
        </DatePicker>
      </div>
    );
  },
  args: {
    format: "dd/MM/yyyy",
    language: "vi",
  },
};

export const WithDrawerMode: Story = {
  render: function WithDrawerModeComponent(args) {
    const [date, setDate] = useState<Date | undefined>();
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Desktop mode set to drawer (default is popover)
        </p>
        <DatePicker
          {...args}
          value={date ? format(date, DATE_FORMAT) : ""}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {
    label: "Date with Drawer Mode",
    desktopMode: "drawer",
    mobileMode: "drawer",
  },
};

export const WithTime: Story = {
  render: function WithTimeComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy HH:mm")}</strong>
          </p>
        )}
        <DatePicker
          {...args}
          value={date ? format(date, "dd/MM/yyyy HH:mm") : ""}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {
    label: "Date with Time",
    showTime: true,
    timeFormat: "HH:mm",
  },
};

export const WithTimeAndSeconds: Story = {
  render: function WithTimeAndSecondsComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy HH:mm:ss")}</strong>
          </p>
        )}
        <DatePicker
          {...args}
          value={date ? format(date, "dd/MM/yyyy HH:mm:ss") : ""}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {
    label: "Date with Time (HH:mm:ss)",
    showTime: true,
    timeFormat: "HH:mm:ss",
  },
};

export const TimeOnly: Story = {
  render: function TimeOnlyComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "HH:mm")}</strong>
          </p>
        )}
        <DatePicker
          {...args}
          value={date ? format(date, "HH:mm") : ""}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {
    label: "Time Only",
    showTime: true,
    hideDate: true,
    timeFormat: "HH:mm",
  },
};

export const WithTimePickerNormalMode: Story = {
  render: function WithTimePickerNormalModeComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy HH:mm")}</strong>
          </p>
        )}
        <DatePicker
          {...args}
          value={date ? format(date, "dd/MM/yyyy HH:mm") : ""}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {
    label: "Date with Time (Normal Mode)",
    showTime: true,
    timeFormat: "HH:mm",
    timePickerMode: "select",
    timePickerLabel: true,
  },
};

export const WithTimePickerGridMode: Story = {
  render: function WithTimePickerGridModeComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy HH:mm")}</strong>
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Grid mode displays time as a vertical list
        </p>
        <DatePicker
          {...args}
          value={date ? format(date, "dd/MM/yyyy HH:mm") : ""}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {
    label: "Date with Time (Grid Mode)",
    showTime: true,
    timeFormat: "HH:mm",
    timePickerMode: "compact",
  },
};

export const WithTimeIntervals: Story = {
  render: function WithTimeIntervalsComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy HH:mm")}</strong>
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          15-minute intervals: 00:00, 00:15, 00:30, 00:45...
        </p>
        <DatePicker
          {...args}
          value={date ? format(date, "dd/MM/yyyy HH:mm") : ""}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {
    label: "Date with Time (15-min intervals)",
    showTime: true,
    timeFormat: "HH:mm",
    timePickerMode: "compact",
    minuteInterval: 15,
  },
};

export const WithDisabledTimeRanges: Story = {
  render: function WithDisabledTimeRangesComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy HH:mm")}</strong>
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Disabled: 00:00-06:00 (night) and 12:00-13:00 (lunch break)
        </p>
        <DatePicker
          {...args}
          value={date ? format(date, "dd/MM/yyyy HH:mm") : ""}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {
    label: "Date with Disabled Time Ranges",
    showTime: true,
    timeFormat: "HH:mm",
    timePickerMode: "wheel",
    disabledTimeRanges: [
      { from: "00:00", to: "06:00" },
      { from: "12:00", to: "13:00" },
    ],
  },
};

export const WithNowButton: Story = {
  render: function WithNowButtonComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy HH:mm")}</strong>
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Click "Now" button to select current time or nearest available time
        </p>
        <DatePicker
          {...args}
          value={date ? format(date, "dd/MM/yyyy HH:mm") : ""}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {
    label: "Date with Now Button",
    showTime: true,
    timeFormat: "HH:mm",
    timePickerMode: "compact",
    minuteInterval: 5,
    showNowButton: true,
    nowButtonLabel: "Now",
  },
};

export const ComplexTimeConfiguration: Story = {
  render: function ComplexTimeConfigurationComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return (
      <div className="flex flex-col gap-4">
        {date && (
          <p className="text-sm">
            Selected: <strong>{format(date, "dd/MM/yyyy HH:mm")}</strong>
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          • Compact mode with 30-minute intervals
          <br />
          • Disabled: 22:00-23:30 (late night)
          <br />
          • "Now" button enabled
          <br />• Specific disabled times: 09:00, 12:00
        </p>
        <DatePicker
          {...args}
          value={date ? format(date, "dd/MM/yyyy HH:mm") : ""}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {
    label: "Date with Complex Time Config",
    showTime: true,
    timeFormat: "HH:mm",
    timePickerMode: "compact",
    minuteInterval: 30,
    disabledTimes: ["09:00", "12:00"],
    disabledTimeRanges: [{ from: "22:00", to: "23:30" }],
    showNowButton: true,
    nowButtonLabel: "Now",
  },
};
