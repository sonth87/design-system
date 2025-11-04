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
    disabled: {
      control: { type: "boolean" },
      description: "Disable the time picker",
    },
    mode: {
      control: { type: "select" },
      options: ["wheel", "select", "compact"],
      description: "Display mode: wheel, select, or compact",
    },
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
    showNowButton: {
      control: { type: "boolean" },
      description: "Show 'Now' button to select current time",
    },
    timeLabel: {
      control: { type: "boolean" },
      description: "Label for the time picker",
    },
    disabledTimes: {
      control: { type: "object" },
      description: "Array of specific times to disable (format: 'HH:mm')",
    },
    disabledTimeRanges: {
      control: { type: "object" },
      description:
        "Array of time ranges to disable Array<{ from: 'HH:mm', to: 'HH:mm' }>",
    },
    nowButtonLabel: {
      control: { type: "text" },
      description: "Label for the 'Now' button",
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
  },
  args: {
    showHours: true,
    showMinutes: true,
    showSeconds: false,
    disabled: false,
    mode: "wheel",
    hourInterval: 1,
    minuteInterval: 1,
    secondInterval: 1,
    showNowButton: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultComponent(args) {
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm:ss")}</strong>
        </p>
        <TimePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
  args: {},
};

export const wheelMode: Story = {
  render: function wheelModeComponent(args) {
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <TimePicker
          {...args}
          mode="wheel"
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <TimePicker
          {...args}
          mode="select"
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Grid mode always displays time in HH:mm format (vertical list)
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={date}
          onChange={setDate}
          showHours
          showMinutes
          showSeconds={false}
        />
      </div>
    );
  },
  args: {},
};

export const GridModeWithIntervals: Story = {
  render: function GridModeWithIntervalsComponent(args) {
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Grid mode with 10-minute intervals (00:00, 00:10, 00:20...)
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={date}
          onChange={setDate}
          showHours
          showMinutes
          minuteInterval={10}
        />
      </div>
    );
  },
  args: {},
};

export const FiveMinuteIntervals: Story = {
  render: function FiveMinuteIntervalsComponent(args) {
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Minutes: 00, 05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
        </p>
        <TimePicker
          {...args}
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Grid mode with 15-minute intervals: 00:00, 00:15, 00:30, 00:45, 01:00...
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm:ss")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Hours: every 2 hours | Minutes: every 10 minutes | Seconds: every 15 seconds
        </p>
        <TimePicker
          {...args}
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Disabled times: 09:00, 12:00, 15:00, 18:00
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Disabled: 01:00-05:00 (night) and 12:00-13:00 (lunch break)
        </p>
        <TimePicker
          {...args}
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Current time: {format(new Date(), "HH:mm:ss")}
        </p>
        <TimePicker
          {...args}
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Current time: {format(new Date(), "HH:mm:ss")} | Minute interval: 5 minutes
        </p>
        <p className="text-xs text-muted-foreground">
          Click "Now" to select the nearest available time
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          • Grid mode with 30-minute intervals (00:00, 00:30, 01:00...)<br />
          • Disabled: 00:00-06:00 (night) and 22:00-23:30 (late night)<br />
          • "Now" button to select nearest time
        </p>
        <TimePicker
          {...args}
          mode="compact"
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <TimePicker
          {...args}
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm:ss")}</strong>
        </p>
        <TimePicker
          {...args}
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH")}</strong>
        </p>
        <TimePicker
          {...args}
          value={date}
          onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <TimePicker
          {...args}
          value={date}
          onChange={setDate}
          disabled
          showHours
          showMinutes
        />
      </div>
    );
  },
  args: {},
};

export const StandaloneMode: Story = {
  render: function StandaloneModeComponent(args) {
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Standalone mode: TimePicker displays as Input with clock icon (like DatePicker)
        </p>
        <div className="w-48">
          <TimePicker
            {...args}
            value={date}
            onChange={setDate}
            standalone={true}
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

export const StandaloneWithDrawer: Story = {
  render: function StandaloneWithDrawerComponent(args) {
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Standalone mode (force drawer): Always shows as drawer on desktop
        </p>
        <div className="w-48">
          <TimePicker
            {...args}
            value={date}
            onChange={setDate}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Integrated mode: TimePicker renders inline (used inside DatePicker)
        </p>
        <div className="border border-border rounded p-4">
          <TimePicker
            {...args}
            value={date}
            onChange={setDate}
            standalone={false}
            showHours
            showMinutes
            showSeconds={false}
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
    const [date, setDate] = useState(new Date());

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm">
          Selected: <strong>{format(date, "HH:mm:ss")}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          Integrated mode with wheel picker (e.g., inside DatePicker)
        </p>
        <div className="border border-border rounded p-4 overflow-auto">
          <TimePicker
            {...args}
            value={date}
            onChange={setDate}
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
