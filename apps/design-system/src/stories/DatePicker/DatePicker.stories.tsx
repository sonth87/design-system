import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { useState } from "react";

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
    },
    maxLength: {
      control: { type: "number" },
    },
    showCharCount: {
      control: { type: "boolean" },
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultComponent(args) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const handleSelect = (d: Date | undefined) => setDate(d);
    return <DatePicker {...args} selected={date} onSelect={handleSelect} />;
  },
  args: {},
};

export const WithLabel: Story = {
  render: function WithLabelComponent(args) {
    const [date, setDate] = useState<Date | undefined>();
    const handleSelect = (d: Date | undefined) => setDate(d);
    return <DatePicker {...args} selected={date} onSelect={handleSelect} />;
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
    return <DatePicker {...args} selected={date} onSelect={handleSelect} />;
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
    return <DatePicker {...args} selected={date} onSelect={handleSelect} />;
  },
  args: {
    disabled: true,
  },
};

export const WithFloatLabel: Story = {
  render: function WithFloatLabelComponent(args) {
    const [date, setDate] = useState<Date | undefined>();
    const handleSelect = (d: Date | undefined) => setDate(d);
    return <DatePicker {...args} selected={date} onSelect={handleSelect} />;
  },
  args: {
    label: "Floating Label Date",
    isFloatLabel: true,
    placeholder: "Select date",
  },
};

export const WithMask: Story = {
  render: function WithMaskComponent(args) {
    const [date, setDate] = useState<Date | undefined>();
    const handleSelect = (d: Date | undefined) => setDate(d);

    return (
      <DatePicker {...args} selected={date} onSelect={(d) => handleSelect(d)} />
    );
  },
  args: {
    label: "Masked Date Input",
    mask: "99/99/9999",
    placeholder: "MM/DD/YYYY",
  },
};
