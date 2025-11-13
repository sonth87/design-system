import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "../components/DatePicker/DatePicker";
import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { DATE_FORMAT } from "@/constants/common";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof DatePicker> = {
  title: "Date & Time/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Basic Input Props
    label: {
      control: { type: "text" },
      description: i18n.t("stories.datepicker.argTypes.label.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    helperText: {
      control: { type: "text" },
      description: i18n.t("stories.datepicker.argTypes.helperText.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    isFloatLabel: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.datepicker.argTypes.isFloatLabel.description",
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
      description: i18n.t("stories.datepicker.argTypes.state.description"),
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.validation"),
      },
    },
    size: {
      control: { type: "select" },
      options: ["", "xs", "sm", "normal", "lg", "xl"],
      description: i18n.t("stories.datepicker.argTypes.size.description"),
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: i18n.t("stories.datepicker.argTypes.disabled.description"),
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    placeholder: {
      control: { type: "text" },
      description: i18n.t(
        "stories.datepicker.argTypes.placeholder.description",
      ),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },

    // Format & Mask
    mask: {
      control: { type: "text" },
      description: i18n.t("stories.datepicker.argTypes.mask.description"),
      table: {
        category: i18n.t("stories.category.formatting"),
      },
    },
    format: {
      control: { type: "object" },
      description: i18n.t("stories.datepicker.argTypes.format.description"),
      table: {
        category: i18n.t("stories.category.formatting"),
      },
    },

    // UI/UX
    infoTooltip: {
      control: { type: "text" },
      description: i18n.t(
        "stories.datepicker.argTypes.infoTooltip.description",
      ),
      table: {
        type: { summary: "ReactNode" },
        category: i18n.t("stories.category.ui"),
      },
    },
    clearable: {
      control: { type: "boolean" },
      description: i18n.t("stories.datepicker.argTypes.clearable.description"),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    side: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
      description: i18n.t("stories.datepicker.argTypes.side.description"),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
      description: i18n.t("stories.datepicker.argTypes.align.description"),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },

    // Language
    language: {
      control: { type: "select" },
      options: ["vi", "en"],
      description: i18n.t("stories.datepicker.argTypes.language.description"),
      table: {
        category: i18n.t("stories.category.language"),
      },
    },

    // Events
    onChange: {
      description: i18n.t("stories.datepicker.argTypes.onChange.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onSelect: {
      description: i18n.t("stories.datepicker.argTypes.onSelect.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },

    // Calendar Behavior
    closeOnSelect: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.datepicker.argTypes.closeOnSelect.description",
      ),
      table: {
        category: i18n.t("stories.category.calendar"),
      },
    },
    desktopMode: {
      control: { type: "select" },
      options: ["popover", "drawer"],
      description: i18n.t(
        "stories.datepicker.argTypes.desktopMode.description",
      ),
      table: {
        category: i18n.t("stories.category.calendar"),
      },
    },
    mobileMode: {
      control: { type: "select" },
      options: ["popover", "drawer"],
      description: i18n.t("stories.datepicker.argTypes.mobileMode.description"),
      table: {
        category: i18n.t("stories.category.calendar"),
      },
    },
    showOutsideDays: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.datepicker.argTypes.showOutsideDays.description",
      ),
      table: {
        category: i18n.t("stories.category.calendar"),
      },
    },
    numberOfMonths: {
      control: { type: "number" },
      description: i18n.t(
        "stories.datepicker.argTypes.numberOfMonths.description",
      ),
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
        category: i18n.t("stories.category.calendar"),
      },
    },
    calendarConfig: {
      control: { type: "object" },
      description: i18n.t(
        "stories.datepicker.argTypes.calendarConfig.description",
      ),
      table: {
        category: i18n.t("stories.category.calendar"),
      },
    },

    // Time Picker
    showTime: {
      control: { type: "boolean" },
      description: i18n.t("stories.datepicker.argTypes.showTime.description"),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    hideDate: {
      control: { type: "boolean" },
      description: i18n.t("stories.datepicker.argTypes.hideDate.description"),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    timePickerMode: {
      control: { type: "select" },
      options: ["wheel", "select", "compact"],
      description: i18n.t(
        "stories.datepicker.argTypes.timePickerMode.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    hourInterval: {
      control: { type: "number" },
      description: i18n.t(
        "stories.datepicker.argTypes.hourInterval.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    minuteInterval: {
      control: { type: "number" },
      description: i18n.t(
        "stories.datepicker.argTypes.minuteInterval.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    secondInterval: {
      control: { type: "number" },
      description: i18n.t(
        "stories.datepicker.argTypes.secondInterval.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    disabledTimes: {
      control: { type: "object" },
      description: i18n.t(
        "stories.datepicker.argTypes.disabledTimes.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    disabledTimeRanges: {
      control: { type: "object" },
      description: i18n.t(
        "stories.datepicker.argTypes.disabledTimeRanges.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    showNowButton: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.datepicker.argTypes.showNowButton.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    nowButtonLabel: {
      control: { type: "text" },
      description: i18n.t(
        "stories.datepicker.argTypes.nowButtonLabel.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
    timePickerLabel: {
      control: { type: "object" },
      description: i18n.t(
        "stories.datepicker.argTypes.timePickerLabel.description",
      ),
      table: {
        category: i18n.t("stories.category.time"),
      },
    },
  },
  args: {
    // Basic Input Props
    label: "",
    helperText: "",
    isFloatLabel: false,
    state: "default",
    size: "normal",
    disabled: false,
    placeholder: "",

    // Format & Mask
    mask: "",
    format: "dd/MM/yyyy",

    // UI/UX
    infoTooltip: "",
    clearable: false,
    side: "top",
    align: "center",

    // Language
    language: "vi",

    // Events
    onChange: undefined,
    onSelect: undefined,

    // Calendar Behavior
    closeOnSelect: undefined,
    desktopMode: "popover",
    mobileMode: "drawer",
    showOutsideDays: true,
    calendarConfig: undefined,

    // Time Picker
    showTime: false,
    hideDate: false,
    timePickerMode: "wheel",
    hourInterval: 1,
    minuteInterval: 5,
    secondInterval: undefined,
    disabledTimes: undefined,
    disabledTimeRanges: undefined,
    showNowButton: false,
    nowButtonLabel: "",
    timePickerLabel: undefined,
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
