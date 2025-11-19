import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "../components/DatePicker/TimePicker";
import { useState } from "react";
import { format } from "date-fns";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof TimePicker> = {
  title: "Date & Time/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Basic Input Props
    label: {
      control: { type: "text" },
      description: i18n.t("stories.timepicker.argTypes.label.description"),
      table: {
        category: i18n.t("stories.category.basic"),
      },
    },
    helperText: {
      control: { type: "text" },
      description: i18n.t("stories.timepicker.argTypes.helperText.description"),
      table: {
        category: i18n.t("stories.category.basic"),
      },
    },
    isFloatLabel: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.timepicker.argTypes.isFloatLabel.description",
      ),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    state: {
      control: { type: "select" },
      options: [undefined, "default", "success", "warning", "error"],
      description: i18n.t("stories.timepicker.argTypes.state.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    size: {
      control: { type: "select" },
      options: [undefined, "xs", "sm", "normal", "lg", "xl"],
      description: i18n.t("stories.timepicker.argTypes.size.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: i18n.t("stories.timepicker.argTypes.disabled.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },

    // Display Mode
    mode: {
      control: { type: "select" },
      options: ["wheel", "select", "compact"],
      description: i18n.t("stories.timepicker.argTypes.mode.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    desktopMode: {
      control: { type: "select" },
      options: [undefined, "popover", "drawer"],
      description: i18n.t(
        "stories.timepicker.argTypes.desktopMode.description",
      ),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    mobileMode: {
      control: { type: "select" },
      options: [undefined, "popover", "drawer"],
      description: i18n.t("stories.timepicker.argTypes.mobileMode.description"),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "accent",
        "destructive",
        "muted",
        "success",
        "error",
        "warning",
        "foreground",
      ],
      description: i18n.t("stories.calendar.argTypes.color.description"),
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
        category: i18n.t("stories.category.appearance"),
      },
    },

    // Time Units Visibility
    showHours: {
      control: { type: "boolean" },
      description: i18n.t("stories.timepicker.argTypes.showHours.description"),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    showMinutes: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.timepicker.argTypes.showMinutes.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    showSeconds: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.timepicker.argTypes.showSeconds.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    timeLabel: {
      control: { type: "boolean" },
      description: i18n.t("stories.timepicker.argTypes.timeLabel.description"),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },

    // Intervals
    hourInterval: {
      control: { type: "number" },
      description: i18n.t(
        "stories.timepicker.argTypes.hourInterval.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    minuteInterval: {
      control: { type: "number" },
      description: i18n.t(
        "stories.timepicker.argTypes.minuteInterval.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    secondInterval: {
      control: { type: "number" },
      description: i18n.t(
        "stories.timepicker.argTypes.secondInterval.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },

    // Disabled Times
    disabledTimes: {
      control: { type: "object" },
      description: i18n.t(
        "stories.timepicker.argTypes.disabledTimes.description",
      ),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    disabledTimeRanges: {
      control: { type: "object" },
      description: i18n.t(
        "stories.timepicker.argTypes.disabledTimeRanges.description",
      ),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },

    // Now Button
    showNowButton: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.timepicker.argTypes.showNowButton.description",
      ),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    nowButtonLabel: {
      control: { type: "text" },
      description: i18n.t(
        "stories.timepicker.argTypes.nowButtonLabel.description",
      ),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },

    // Format & Mask
    format: {
      control: { type: "object" },
      description: i18n.t("stories.timepicker.argTypes.format.description"),
      table: {
        category: i18n.t("stories.category.formatting"),
      },
    },
    mask: {
      control: { type: "text" },
      description: i18n.t("stories.timepicker.argTypes.mask.description"),
      table: {
        category: i18n.t("stories.category.formatting"),
      },
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
    const [value, setValue] = useState<string | undefined>("14:30");

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
            setValue(newValue);
          }}
          onChange={(event, newValue, date) => {
            console.log("onChange:", { event, newValue, date });
            setValue(newValue);
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

export const TimeLabels: Story = {
  render: function TimeLabelsComponent(args) {
    const [value1, setValue1] = useState("14:30:45");
    const [value2, setValue2] = useState("14:30:45");
    const [value3, setValue3] = useState("14:30:45");
    const [value4, setValue4] = useState("14:30:45");

    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Boolean Labels (Default)</h3>
          <p className="text-sm text-muted-foreground">
            timeLabel=true shows default labels: "Hour", "Minute", "Second"
          </p>
          <p className="text-sm">
            Selected: <strong>{value1}</strong>
          </p>
          <TimePicker
            {...args}
            value={value1}
            onSelect={(_date, newValue) => newValue && setValue1(newValue)}
            showHours
            showMinutes
            showSeconds
            timeLabel={true}
            mode="wheel"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">String Label (Same for All)</h3>
          <p className="text-sm text-muted-foreground">
            timeLabel="Time" shows the same label for all columns
          </p>
          <p className="text-sm">
            Selected: <strong>{value2}</strong>
          </p>
          <TimePicker
            {...args}
            value={value2}
            onSelect={(_date, newValue) => newValue && setValue2(newValue)}
            showHours
            showMinutes
            showSeconds
            timeLabel="Time"
            mode="wheel"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Custom Labels (Object)</h3>
          <p className="text-sm text-muted-foreground">
            timeLabel=&#123;&#123; hours: "Giờ", minutes: "Phút", seconds:
            "Giây" &#125;&#125; shows custom labels for each column
          </p>
          <p className="text-sm">
            Selected: <strong>{value3}</strong>
          </p>
          <TimePicker
            {...args}
            value={value3}
            onSelect={(_date, newValue) => newValue && setValue3(newValue)}
            showHours
            showMinutes
            showSeconds
            timeLabel={{ hours: "Giờ", minutes: "Phút", seconds: "Giây" }}
            mode="wheel"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Partial Custom Labels</h3>
          <p className="text-sm text-muted-foreground">
            timeLabel=&#123;&#123; hours: "Hour", seconds: "Second" &#125;&#125;
            uses custom labels where provided, defaults otherwise
          </p>
          <p className="text-sm">
            Selected: <strong>{value4}</strong>
          </p>
          <TimePicker
            {...args}
            value={value4}
            onSelect={(_date, newValue) => newValue && setValue4(newValue)}
            showHours
            showMinutes
            showSeconds
            timeLabel={{ hours: "Hour", seconds: "Second" }}
            mode="wheel"
          />
        </div>
      </div>
    );
  },
  args: {},
};
