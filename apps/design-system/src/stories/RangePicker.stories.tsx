import type { Meta, StoryObj } from "@storybook/react";
import {
  RangePicker,
  type DateRange,
  type DateRangeText,
} from "../components/DatePicker/RangePicker";
import { useState } from "react";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof RangePicker> = {
  title: "Date & Time/RangePicker",
  component: RangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: i18n.t("stories.rangepicker.argTypes.label.description"),
      table: {
        category: i18n.t("stories.category.basic"),
      },
    },
    helperText: {
      control: { type: "text" },
      description: i18n.t(
        "stories.rangepicker.argTypes.helperText.description",
      ),
      table: {
        category: i18n.t("stories.category.basic"),
      },
    },
    isFloatLabel: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.rangepicker.argTypes.isFloatLabel.description",
      ),
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
        category: i18n.t("stories.category.ui"),
      },
    },
    state: {
      control: { type: "select" },
      options: ["", "default", "success", "warning", "error"],
      description: i18n.t("stories.rangepicker.argTypes.state.description"),
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    size: {
      control: { type: "select" },
      options: ["", "xs", "sm", "normal", "lg", "xl"],
      description: i18n.t("stories.rangepicker.argTypes.size.description"),
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: i18n.t("stories.rangepicker.argTypes.disabled.description"),
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    placeholder: {
      control: { type: "text" },
      description: i18n.t(
        "stories.rangepicker.argTypes.placeholder.description",
      ),
      table: {
        category: i18n.t("stories.category.basic"),
      },
    },
    value: {
      control: { type: "object" },
      description: i18n.t("stories.rangepicker.argTypes.value.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },

    // Format & Mask
    mask: {
      control: { type: "text" },
      description: i18n.t("stories.rangepicker.argTypes.mask.description"),
      table: {
        category: i18n.t("stories.category.formatting"),
      },
    },
    format: {
      control: { type: "object" },
      description: i18n.t("stories.rangepicker.argTypes.format.description"),
      table: {
        category: i18n.t("stories.category.formatting"),
      },
    },

    // UI/UX
    infoTooltip: {
      control: { type: "text" },
      description: i18n.t(
        "stories.rangepicker.argTypes.infoTooltip.description",
      ),
      table: {
        type: { summary: "ReactNode" },
        category: i18n.t("stories.category.ui"),
      },
    },
    clearable: {
      control: "boolean",
      description: i18n.t("stories.rangepicker.argTypes.clearable.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.ui"),
      },
    },
    numberOfMonths: {
      control: { type: "number" },
      description: i18n.t(
        "stories.rangepicker.argTypes.numberOfMonths.description",
      ),
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
        category: i18n.t("stories.category.calendar"),
      },
    },
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
      description: i18n.t("stories.rangepicker.argTypes.side.description"),
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
      description: i18n.t("stories.rangepicker.argTypes.align.description"),
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    language: {
      control: { type: "select" },
      options: ["vi", "en"],
      description: i18n.t("stories.rangepicker.argTypes.language.description"),
      table: {
        category: i18n.t("stories.category.language"),
      },
    },
    onChange: {
      description: i18n.t("stories.rangepicker.argTypes.onChange.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onSelect: {
      description: i18n.t("stories.rangepicker.argTypes.onSelect.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    closeOnSelect: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.rangepicker.argTypes.closeOnSelect.description",
      ),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    desktopMode: {
      control: { type: "select" },
      options: ["popover", "drawer"],
      description: i18n.t(
        "stories.rangepicker.argTypes.desktopMode.description",
      ),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    mobileMode: {
      control: { type: "select" },
      options: ["popover", "drawer"],
      description: i18n.t(
        "stories.rangepicker.argTypes.mobileMode.description",
      ),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    separator: {
      control: { type: "text" },
      description: i18n.t("stories.rangepicker.argTypes.separator.description"),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    showTime: {
      control: { type: "boolean" },
      description: i18n.t("stories.rangepicker.argTypes.showTime.description"),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    timeFormat: {
      control: { type: "select" },
      options: ["HH:mm", "HH:mm:ss"],
      description: i18n.t(
        "stories.rangepicker.argTypes.timeFormat.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    hideDate: {
      control: { type: "boolean" },
      description: i18n.t("stories.rangepicker.argTypes.hideDate.description"),
      table: {
        category: i18n.t("stories.category.calendar"),
      },
    },
  },
  args: {
    language: "vi",
    format: "dd/MM/yyyy",
    mask: "99/99/9999",
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
      t: DateRangeText | undefined,
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
      t: DateRangeText | undefined,
    ) => setRangeDefault(t);
    const handleSelectSuccess = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined,
    ) => setRangeSuccess(t);
    const handleSelectWarning = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined,
    ) => setRangeWarning(t);
    const handleSelectError = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined,
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
      t: DateRangeText | undefined,
    ) => setRangeXs(t);
    const handleSelectSm = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined,
    ) => setRangeSm(t);
    const handleSelectNormal = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined,
    ) => setRangeNormal(t);
    const handleSelectLg = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined,
    ) => setRangeLg(t);
    const handleSelectXl = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined,
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
      t: DateRangeText | undefined,
    ) => setRangeHHmm(t);
    const handleSelectHHmmss = (
      _r: DateRange | undefined,
      t: DateRangeText | undefined,
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
      t: DateRangeText | undefined,
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
