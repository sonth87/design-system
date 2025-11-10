import type { Meta, StoryObj } from "@storybook/react";
import { RangePicker, type DateRange, type DateRangeText } from "./RangePicker";
import { useState } from "react";

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
        "Label for the range picker. `string` or `{ from: string; to: string }`",
    },
    helperText: {
      control: { type: "text" },
      description: "Helper text displayed below the input field",
    },
    isFloatLabel: {
      control: { type: "boolean" },
      description: "Enable floating label that moves when input has value",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    state: {
      control: { type: "select" },
      options: ["", "default", "success", "warning", "error"],
      description: "Visual state of the input field",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["", "xs", "sm", "normal", "lg", "xl"],
      description: "Size variant of the input field",
      table: { type: { summary: "string" }, defaultValue: { summary: "md" } },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the date picker input",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      control: { type: "text" },
      description:
        "Placeholder for the inputs. `string` or `{ from: string; to: string }`",
    },
    value: {
      control: { type: "object" },
      description:
        "Controlled date range value. `{ from: string; to: string }`",
    },

    // Format & Mask
    mask: {
      control: { type: "text" },
      description:
        "Input mask for date input. True for auto-generated mask, or custom string like '99/99/9999'",
    },
    format: {
      control: { type: "object" },
      description:
        "Date format: string (e.g., 'dd/MM/yyyy') or object { input: string, output: string }. For more: <a href='https://date-fns.org/v4.1.0/docs/format'>https://date-fns.org/v4.1.0/docs/format</a>",
    },

    // UI/UX
    infoTooltip: {
      control: { type: "text" },
      description: "Tooltip text displayed when hovering over the info icon",
      table: { type: { summary: "ReactNode" } },
    },
    clearable: {
      control: "boolean",
      description: "Show clear button when input has value",
      table: {
        defaultValue: { summary: "false" },
      },
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
    label: { from: "From", to: "To" },
    isFloatLabel: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultComponent(args) {
    const [range, setRange] = useState<DateRangeText | undefined>();
    const handleSelect = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRange(t);

    return (
      <div>
        <span className="mb-4 block">
          Selected date: {range?.from} - {range?.to}
        </span>
        <RangePicker {...args} value={range} onSelect={handleSelect} />
      </div>
    );
  },
  args: {},
};

export const States: Story = {
  render: function StatesComponent(args) {
    const [rangeDefault, setRangeDefault] = useState<
      DateRangeText | undefined
    >();
    const [rangeSuccess, setRangeSuccess] = useState<
      DateRangeText | undefined
    >();
    const [rangeWarning, setRangeWarning] = useState<
      DateRangeText | undefined
    >();
    const [rangeError, setRangeError] = useState<DateRangeText | undefined>();

    const handleSelectDefault = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeDefault(t);
    const handleSelectSuccess = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeSuccess(t);
    const handleSelectWarning = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeWarning(t);
    const handleSelectError = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeError(t);

    return (
      <div className="space-y-4">
        <div>
          <label>Default</label>
          <RangePicker
            {...args}
            state="default"
            value={rangeDefault}
            onSelect={handleSelectDefault}
          />
        </div>
        <div>
          <label>Success</label>
          <RangePicker
            {...args}
            state="success"
            value={rangeSuccess}
            onSelect={handleSelectSuccess}
          />
        </div>
        <div>
          <label>Warning</label>
          <RangePicker
            {...args}
            state="warning"
            value={rangeWarning}
            onSelect={handleSelectWarning}
          />
        </div>
        <div>
          <label>Error</label>
          <RangePicker
            {...args}
            state="error"
            value={rangeError}
            onSelect={handleSelectError}
          />
        </div>
      </div>
    );
  },
  args: {},
};

export const Sizes: Story = {
  render: function SizesComponent(args) {
    const [rangeXs, setRangeXs] = useState<DateRangeText | undefined>();
    const [rangeSm, setRangeSm] = useState<DateRangeText | undefined>();
    const [rangeNormal, setRangeNormal] = useState<DateRangeText | undefined>();
    const [rangeLg, setRangeLg] = useState<DateRangeText | undefined>();
    const [rangeXl, setRangeXl] = useState<DateRangeText | undefined>();

    const handleSelectXs = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeXs(t);
    const handleSelectSm = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeSm(t);
    const handleSelectNormal = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeNormal(t);
    const handleSelectLg = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeLg(t);
    const handleSelectXl = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeXl(t);

    return (
      <div className="space-y-4">
        <div>
          <label>Extra Small</label>
          <RangePicker
            {...args}
            size="xs"
            value={rangeXs}
            onSelect={handleSelectXs}
          />
        </div>
        <div>
          <label>Small</label>
          <RangePicker
            {...args}
            size="sm"
            value={rangeSm}
            onSelect={handleSelectSm}
          />
        </div>
        <div>
          <label>Normal</label>
          <RangePicker
            {...args}
            size="normal"
            value={rangeNormal}
            onSelect={handleSelectNormal}
          />
        </div>
        <div>
          <label>Large</label>
          <RangePicker
            {...args}
            size="lg"
            value={rangeLg}
            onSelect={handleSelectLg}
          />
        </div>
        <div>
          <label>Extra Large</label>
          <RangePicker
            {...args}
            size="xl"
            value={rangeXl}
            onSelect={handleSelectXl}
          />
        </div>
        <div>
          <label>Large with Float label</label>
          <RangePicker
            {...args}
            size="lg"
            value={rangeLg}
            onSelect={handleSelectLg}
            isFloatLabel
          />
        </div>
        <div>
          <label>Extra Large with Float label</label>
          <RangePicker
            {...args}
            size="xl"
            value={rangeXl}
            onSelect={handleSelectXl}
            isFloatLabel
          />
        </div>
      </div>
    );
  },
  args: {},
};

export const WithTime: Story = {
  render: function WithTimeComponent(args) {
    const [rangeHHmm, setRangeHHmm] = useState<DateRangeText | undefined>();
    const [rangeHHmmss, setRangeHHmmss] = useState<DateRangeText | undefined>();

    const handleSelectHHmm = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeHHmm(t);
    const handleSelectHHmmss = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRangeHHmmss(t);

    return (
      <div className="space-y-4">
        <div>
          <label>Time Format HH:mm</label>
          <RangePicker
            {...args}
            showTime
            timeFormat="HH:mm"
            value={rangeHHmm}
            onSelect={handleSelectHHmm}
            timeConfig={[{ timeLabel: "From" }, { timeLabel: "To" }]}
          />
        </div>
        <div>
          <label>Time Format HH:mm:ss</label>
          <RangePicker
            {...args}
            showTime
            timeFormat="HH:mm:ss"
            value={rangeHHmmss}
            onSelect={handleSelectHHmmss}
            timeConfig={[{ timeLabel: "From" }, { timeLabel: "To" }]}
          />
        </div>
        <div>
          <label>Time picker mode</label>
          <RangePicker
            {...args}
            showTime
            value={rangeHHmmss}
            onSelect={handleSelectHHmmss}
            timeConfig={[
              { timeLabel: "From", mode: "select" },
              { timeLabel: "To", mode: "select" },
            ]}
          />
        </div>
      </div>
    );
  },
  args: {},
};

export const Disabled: Story = {
  render: function DisabledComponent(args) {
    return <RangePicker {...args} disabled />;
  },
  args: {},
};

export const Clearable: Story = {
  render: function ClearableComponent(args) {
    const [range, setRange] = useState<DateRangeText | undefined>();
    const handleSelect = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined
    ) => setRange(t);

    return (
      <div>
        <span className="mb-4 block">
          Selected date: {range?.from} - {range?.to}
        </span>
        <RangePicker
          {...args}
          clearable
          value={range}
          onSelect={handleSelect}
        />
      </div>
    );
  },
  args: {},
};
