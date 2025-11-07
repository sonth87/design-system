import type { Meta, StoryObj } from "@storybook/react";
import { RangePicker, type DateRange, type DateRangeText } from "./RangePicker";
import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { DATE_FORMAT } from "@/constants/common";

const meta: Meta<typeof RangePicker> = {
  title: "Components/RangePicker",
  component: RangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description:
        "Label for the range picker. `string` or `[fromLabel, toLabel]`",
    },
    value: {
      control: { type: "object" },
      description: "Controlled date range value. `[fromDate, toDate]`",
    },
    placeholder: {
      control: { type: "text" },
      description:
        "Placeholder for the inputs. `string` or `[fromPlaceholder, toPlaceholder]`",
    },
    mask: {
      control: { type: "text" },
      description:
        "Input mask for the date picker. True means auto-generated, String means custom. Eg: '99/99/9999'",
    },
    format: {
      control: { type: "object" },
      description:
        "Date format: string (e.g., 'dd/MM/yyyy') or object { input: string, output: string }",
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
      description:
        "Called when date range changes. Receives fromValue, toValue, and range. Example: onChange(fromValue, toValue, range)",
    },
    onSelect: {
      description:
        "Called when a date range is selected. Receives range, fromValue, and toValue. Example: onSelect(range, fromValue, toValue)",
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
    separator: {
      control: { type: "text" },
      description: "Separator between from and to inputs",
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
  },
  args: {
    language: "vi",
    format: "dd/MM/yyyy",
    separator: "~",
    isFloatLabel: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultComponent(args) {
    const [range, setRange] = useState<DateRangeText | undefined>();
    const handleSelect = (
      r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRange(t);

    return <RangePicker {...args} value={range} onSelect={handleSelect} />;
  },
  args: {},
};
