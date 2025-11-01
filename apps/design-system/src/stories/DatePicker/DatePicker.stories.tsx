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
      options: [undefined, "xs", "sm", "normal", "lg", "xl"],
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
    },
    onChange: {
      action: "changed",
      description:
        "Called when date value changes. Receives the new value and date. Example: onChange(event, newValue, newDate)",
    },
    onSelect: {
      action: "selected",
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

export const WithDifferentFormats = () => {
  return (
    <div className="flex flex-col gap-4">
      <DatePicker label="yyyy-MM-DD" format="yyyy-MM-dd" />
      <DatePicker label="MM.yyyy" format="MM.yyyy" />
      <DatePicker
        label="yyyy"
        format="yyyy"
        value={new Date().getFullYear().toString()}
      />
      <DatePicker label="EEEE, dd MMM yyyy" format="EEEE, dd MMM yyyy" />
      <DatePicker label="MMMM, yyyy" format="MMMM, yyyy" />
    </div>
  );
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
                // Example: You can open a modal or do custom logic here
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
