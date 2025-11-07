import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./TimePicker";
import { useState } from "react";
import { format } from "date-fns";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Basic Input Props
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
      description: "Disable the time picker",
    },

    // Display Mode
    mode: {
      control: { type: "select" },
      options: ["wheel", "select", "compact"],
      description: "Display mode: wheel, select, or compact",
    },
    desktopMode: {
      control: { type: "select" },
      options: [undefined, "popover", "drawer"],
      description:
        "Desktop mode for standalone TimePicker: popover or drawer (default: popover)",
    },
    mobileMode: {
      control: { type: "select" },
      options: [undefined, "popover", "drawer"],
      description:
        "Mobile mode for standalone TimePicker: popover or drawer (default: drawer)",
    },

    // Time Units Visibility
    showHours: {
      control: { type: "boolean" },
      description: "Show hours column",
    },
    showMinutes: {
      control: { type: "boolean" },
      description: "Show minutes column",
    },
    showSeconds: {
      control: { type: "boolean" },
      description: "Show seconds column",
    },
    timeLabel: {
      control: { type: "boolean" },
      description: "Label for the time picker",
    },

    // Intervals
    hourInterval: {
      control: { type: "number" },
      description: "Hour interval (e.g., 1, 2, 3)",
    },
    minuteInterval: {
      control: { type: "number" },
      description: "Minute interval (e.g., 5, 10, 15, 30)",
    },
    secondInterval: {
      control: { type: "number" },
      description: "Second interval (e.g., 5, 10, 15, 30)",
    },

    // Disabled Times
    disabledTimes: {
      control: { type: "object" },
      description: "Array of specific times to disable (format: 'HH:mm')",
    },
    disabledTimeRanges: {
      control: { type: "object" },
      description:
        "Array of time ranges to disable Array<{ from: 'HH:mm', to: 'HH:mm' }>",
    },

    // Now Button
    showNowButton: {
      control: { type: "boolean" },
      description: "Show 'Now' button to select current time",
    },
    nowButtonLabel: {
      control: { type: "text" },
      description: "Label for the 'Now' button",
    },

    // Format & Mask
    format: {
      control: { type: "object" },
      description:
        "Date format: string (e.g., 'HH:mm:ss') or object { input: string, output: string }. For more: <a href='https://date-fns.org/v4.1.0/docs/format'>https://date-fns.org/v4.1.0/docs/format</a>",
    },
    mask: {
      control: { type: "text" },
      description:
        "Input mask for the date picker. True means auto-generated, String means custom. Eg: '99:99'",
    },
  },
  args: {
    // Basic Input Props
    label: undefined,
    helperText: undefined,
    isFloatLabel: undefined,
    state: undefined,
    size: undefined,
    disabled: false,

    // Display Mode
    mode: "wheel",
    desktopMode: undefined,
    mobileMode: undefined,

    // Time Units Visibility
    showHours: true,
    showMinutes: true,
    showSeconds: false,
    timeLabel: undefined,

    // Intervals
    hourInterval: 1,
    minuteInterval: 1,
    secondInterval: 1,

    // Disabled Times
    disabledTimes: undefined,
    disabledTimeRanges: undefined,

    // Now Button
    showNowButton: false,
    nowButtonLabel: undefined,

    // Format & Mask
    format: undefined,
    mask: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Value String: <strong>{value || "N/A"}</strong>
        </p>
        <TimePicker
          {...args}
          value={value}
          onSelect={(date, newValue) => {
            console.log("onSelect:", { date, newValue });
            if (newValue) setValue(newValue);
          }}
          onChange={(event, newValue, date) => {
            console.log("onChange:", { event, newValue, date });
            if (newValue) setValue(newValue);
          }}
        />
      </div>
    );
  },
  args: {},
};

export const wheelMode: Story = {
  render: function WheelModeComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <TimePicker
          {...args}
          mode="wheel"
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
        />
      </div>
    );
  },
  args: {},
};

export const NormalMode: Story = {
  render: function NormalModeComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <TimePicker
          {...args}
          mode="select"
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
          timeLabel
        />
      </div>
    );
  },
  args: {},
};

export const GridMode: Story = {
  render: function GridModeComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Grid mode always displays time in HH:mm format (vertical list)
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
        />
      </div>
    );
  },
  args: {},
};

export const FiveMinuteIntervals: Story = {
  render: function FiveMinuteIntervalsComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Minutes: 00, 05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
        </p>
        <TimePicker
          {...args}
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
          minuteInterval={5}
        />
      </div>
    );
  },
  args: {},
};

export const FifteenMinuteIntervals: Story = {
  render: function FifteenMinuteIntervalsComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Grid mode with 15-minute intervals: 00:00, 00:15, 00:30, 00:45,
          01:00...
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
          minuteInterval={15}
        />
      </div>
    );
  },
  args: {},
};

export const CustomIntervals: Story = {
  render: function CustomIntervalsComponent(args) {
    const [value, setValue] = useState("14:30:00");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Hours: every 2 hours | Minutes: every 10 minutes | Seconds: every 15
          seconds
        </p>
        <TimePicker
          {...args}
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds
          hourInterval={2}
          minuteInterval={10}
          secondInterval={15}
        />
      </div>
    );
  },
  args: {},
};

export const DisabledSpecificTimes: Story = {
  render: function DisabledSpecificTimesComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Disabled times: 09:00, 12:00, 15:00, 18:00
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
          disabledTimes={["09:00", "12:00", "15:00", "18:00"]}
        />
      </div>
    );
  },
  args: {},
};

export const DisabledTimeRanges: Story = {
  render: function DisabledTimeRangesComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Disabled: 01:00-05:00 (night) and 12:00-13:00 (lunch break)
        </p>
        <TimePicker
          {...args}
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
          disabledTimeRanges={[
            { from: "01:00", to: "05:00" },
            { from: "12:00", to: "13:00" },
          ]}
        />
      </div>
    );
  },
  args: {},
};

export const WithNowButton: Story = {
  render: function WithNowButtonComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Current time: {format(new Date(), "HH:mm:ss")}
        </p>
        <TimePicker
          {...args}
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
          showNowButton
          nowButtonLabel="Set to Now"
        />
      </div>
    );
  },
  args: {},
};

export const NowButtonWithIntervals: Story = {
  render: function NowButtonWithIntervalsComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Current time: {format(new Date(), "HH:mm:ss")} | Minute interval: 5
          minutes
        </p>
        <p className="text-xs text-muted-foreground">
          Click "Now" to select the nearest available time
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
          minuteInterval={5}
          showNowButton
        />
      </div>
    );
  },
  args: {},
};

export const ComplexConfiguration: Story = {
  render: function ComplexConfigurationComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          • Grid mode with 30-minute intervals (00:00, 00:30, 01:00...)
          <br />
          • Disabled: 00:00-06:00 (night) and 22:00-23:30 (late night)
          <br />• "Now" button to select nearest time
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
          minuteInterval={30}
          disabledTimeRanges={[
            { from: "00:00", to: "06:00" },
            { from: "22:00", to: "23:30" },
          ]}
          showNowButton
          nowButtonLabel="Current Time"
        />
      </div>
    );
  },
  args: {},
};

export const HoursAndMinutes: Story = {
  render: function HoursAndMinutesComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <TimePicker
          {...args}
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds={false}
        />
      </div>
    );
  },
  args: {},
};

export const WithSeconds: Story = {
  render: function WithSecondsComponent(args) {
    const [value, setValue] = useState("14:30:45");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <TimePicker
          {...args}
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes
          showSeconds
        />
      </div>
    );
  },
  args: {},
};

export const HoursOnly: Story = {
  render: function HoursOnlyComponent(args) {
    const [value, setValue] = useState("14:00");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <TimePicker
          {...args}
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          showHours
          showMinutes={false}
          showSeconds={false}
        />
      </div>
    );
  },
  args: {},
};

export const Disabled: Story = {
  render: function DisabledComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <TimePicker
          {...args}
          value={value}
          onSelect={(_date, newValue) => newValue && setValue(newValue)}
          disabled
          showHours
          showMinutes
        />
      </div>
    );
  },
  args: {},
};

export const WithDrawer: Story = {
  render: function WithDrawerComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Standalone mode (force drawer): Always shows as drawer on desktop
        </p>
        <div className="w-48">
          <TimePicker
            {...args}
            value={value}
            onSelect={(_date, newValue) => newValue && setValue(newValue)}
            standalone={true}
            desktopMode="drawer"
            showHours
            showMinutes
            showSeconds={false}
            mode="wheel"
          />
        </div>
      </div>
    );
  },
  args: {},
};

export const IntegratedMode: Story = {
  render: function IntegratedModeComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Integrated mode: TimePicker renders inline (used inside DatePicker)
        </p>
        <div className="border border-border rounded p-4">
          <TimePicker
            {...args}
            value={value}
            onSelect={(_date, newValue) => newValue && setValue(newValue)}
            standalone={false}
            showHours
            showMinutes
            showSeconds={false}
            minuteInterval={10}
            mode="compact"
          />
        </div>
      </div>
    );
  },
  args: {},
};

export const IntegratedWithWheelMode: Story = {
  render: function IntegratedWithWheelModeComponent(args) {
    const [value, setValue] = useState("14:30:45");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{value}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Integrated mode with wheel picker (e.g., inside DatePicker)
        </p>
        <div className="border border-border rounded p-4 overflow-auto">
          <TimePicker
            {...args}
            value={value}
            onSelect={(_date, newValue) => newValue && setValue(newValue)}
            standalone={false}
            showHours
            showMinutes
            showSeconds
            mode="wheel"
          />
        </div>
      </div>
    );
  },
  args: {},
};

export const WithMask: Story = {
  render: function WithMaskComponent(args) {
    const [value, setValue] = useState("14:30:45");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Value String: <strong>{value || "N/A"}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Try typing time directly in the input (e.g., 14:30:45). The mask will
          auto-format as you type.
        </p>
        <TimePicker
          {...args}
          value={value}
          mask={true}
          showSeconds
          onSelect={(_date, newValue) => {
            if (newValue) setValue(newValue);
          }}
          onChange={(_event, newValue) => {
            console.log("onChange:", { newValue });
            if (newValue) setValue(newValue);
          }}
        />
      </div>
    );
  },
  args: {},
};

export const WithCustomMask: Story = {
  render: function WithCustomMaskComponent(args) {
    const [value, setValue] = useState("14:30");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Value String: <strong>{value || "N/A"}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Custom mask: "99:99" - Try typing time directly (e.g., 14:30)
        </p>
        <TimePicker
          {...args}
          value={value}
          mask="99:99"
          showSeconds={false}
          onSelect={(_date, newValue) => {
            if (newValue) setValue(newValue);
          }}
          onChange={(_event, newValue) => {
            console.log("onChange:", { newValue });
            if (newValue) setValue(newValue);
          }}
        />
      </div>
    );
  },
  args: {},
};

export const FormatInputOutputWithSeconds: Story = {
  render: function FormatInputOutputWithSecondsComponent(args) {
    const [value, setValue] = useState("14:30:45");

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Value String: <strong>{value || "N/A"}</strong>
        </p>
        <TimePicker
          {...args}
          value={value}
          format={{ input: "HH:mm:ss", output: "hh:mm:ss a" }}
          showSeconds
          mask={true}
          onSelect={(_date, newValue) => {
            if (newValue) setValue(newValue);
          }}
          onChange={(_event, newValue) => {
            console.log("onChange:", { newValue });
            if (newValue) setValue(newValue);
          }}
        />
      </div>
    );
  },
  args: {},
};
