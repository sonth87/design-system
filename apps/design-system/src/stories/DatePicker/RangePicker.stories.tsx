import type { Meta, StoryObj } from "@storybook/react";
import { RangePicker, type DateRange } from "./RangePicker";
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
    fromInputProps: {
      control: { type: "object" },
      description: "Props for the 'from' date input",
    },
    toInputProps: {
      control: { type: "object" },
      description: "Props for the 'to' date input",
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultComponent(args) {
    const [range, setRange] = useState<DateRange | undefined>();
    const handleSelect = (r: DateRange | undefined) => setRange(r);

    return (
      <RangePicker
        {...args}
        fromValue={range?.from ? format(range.from, DATE_FORMAT) : ""}
        toValue={range?.to ? format(range.to, DATE_FORMAT) : ""}
        onSelect={handleSelect}
      />
    );
  },
  args: {},
};

export const DefaultWithValue: Story = {
  render: function DefaultComponent(args) {
    return (
      <RangePicker
        {...args}
        fromValue="20/10/1991"
        toValue="29/08/2017"
        format="dd/MM/yyyy"
      />
    );
  },
  args: {},
};

export const WithLabel: Story = {
  render: function WithLabelComponent(args) {
    return (
      <div className="flex flex-col gap-4">
        <RangePicker
          {...args}
          fromValue="01/01/2024"
          toValue="31/12/2024"
          fromInputProps={{
            label: "Từ ngày",
            helperText: "Chọn ngày bắt đầu",
          }}
          toInputProps={{
            label: "Đến ngày",
            helperText: "Chọn ngày kết thúc",
          }}
        />
        <RangePicker
          {...args}
          fromValue="01/06/2024"
          toValue="30/06/2024"
          fromInputProps={{
            label: "Start Date",
            isFloatLabel: true,
            size: "lg",
          }}
          toInputProps={{
            label: "End Date",
            isFloatLabel: true,
            size: "lg",
          }}
        />
      </div>
    );
  },
  args: {},
};

export const WithState: Story = {
  render: function WithStateComponent(args) {
    const [range, setRange] = useState<DateRange | undefined>();
    const handleSelect = (r: DateRange | undefined) => setRange(r);

    return (
      <RangePicker
        {...args}
        fromValue={range?.from ? format(range.from, DATE_FORMAT) : ""}
        toValue={range?.to ? format(range.to, DATE_FORMAT) : ""}
        onSelect={handleSelect}
        fromInputProps={{
          label: "From Date",
          state: "error",
          helperText: "This field is required",
        }}
        toInputProps={{
          label: "To Date",
          state: "error",
          helperText: "This field is required",
        }}
      />
    );
  },
  args: {},
};

export const Disabled: Story = {
  render: function DisabledComponent(args) {
    const [range, setRange] = useState<DateRange>({
      from: new Date(2024, 0, 1),
      to: new Date(2024, 11, 31),
    });
    const handleSelect = (r: DateRange | undefined) => r && setRange(r);

    return (
      <RangePicker
        {...args}
        fromValue={range?.from ? format(range.from, DATE_FORMAT) : ""}
        toValue={range?.to ? format(range.to, DATE_FORMAT) : ""}
        onSelect={handleSelect}
        fromInputProps={{ disabled: true }}
        toInputProps={{ disabled: true }}
      />
    );
  },
  args: {},
};

export const WithMask: Story = {
  render: function WithMaskComponent(args) {
    const [range, setRange] = useState<DateRange | undefined>();
    const handleSelect = (r: DateRange | undefined) => setRange(r);

    return (
      <>
        {range?.from && range?.to && (
          <div className="mb-4 text-sm">
            Selected range: {format(range.from, DATE_FORMAT)} ~{" "}
            {format(range.to, DATE_FORMAT)}
          </div>
        )}
        <RangePicker
          {...args}
          fromValue={range?.from ? format(range.from, DATE_FORMAT) : ""}
          toValue={range?.to ? format(range.to, DATE_FORMAT) : ""}
          onSelect={handleSelect}
          fromInputProps={{
            label: "From Date",
            placeholder: "DD/MM/YYYY",
          }}
          toInputProps={{
            label: "To Date",
            placeholder: "DD/MM/YYYY",
          }}
        />
      </>
    );
  },
  args: {
    mask: "99/99/9999",
  },
};

export const WithAutoMask: Story = {
  render: function WithAutoMaskComponent(args) {
    const [fromValue, setFromValue] = useState<string>();
    const [toValue, setToValue] = useState<string>();

    return (
      <>
        {fromValue && toValue && (
          <div className="mb-4 text-sm">
            Selected range: {fromValue} ~ {toValue}
          </div>
        )}
        <RangePicker
          {...args}
          fromValue={fromValue}
          toValue={toValue}
          onSelect={(_, from, to) => {
            setFromValue(from);
            setToValue(to);
          }}
          fromInputProps={{
            label: "From Date",
          }}
          toInputProps={{
            label: "To Date",
          }}
        />
      </>
    );
  },
  args: {
    mask: true,
    format: "yyyy.MM.dd",
  },
};

export const WithDifferentFormats: Story = {
  render: function WithDifferentFormats(args) {
    return (
      <div className="flex flex-col gap-4">
        <RangePicker
          {...args}
          format="yyyy-MM-dd"
          fromInputProps={{ label: "From (yyyy-MM-dd)" }}
          toInputProps={{ label: "To (yyyy-MM-dd)" }}
        />
        <RangePicker
          {...args}
          format="MM.yyyy"
          fromInputProps={{ label: "From (MM.yyyy)" }}
          toInputProps={{ label: "To (MM.yyyy)" }}
        />
        <RangePicker
          {...args}
          format="MMMM, yyyy"
          fromInputProps={{ label: "From (MMMM, yyyy)" }}
          toInputProps={{ label: "To (MMMM, yyyy)" }}
        />
      </div>
    );
  },
};

export const CustomWithChildren: Story = {
  render: function CustomWithChildrenComponent(args) {
    const [range, setRange] = useState<DateRange | undefined>();

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Custom trigger with children render prop
        </p>
        <RangePicker
          {...args}
          fromValue={range?.from ? format(range.from, DATE_FORMAT) : ""}
          toValue={range?.to ? format(range.to, DATE_FORMAT) : ""}
          onSelect={(r) => setRange(r)}
        >
          {({ fromValue, toValue, range: currentRange }) => (
            <button
              className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors min-w-[280px]"
              onClick={() => {
                console.log("Current from:", fromValue);
                console.log("Current to:", toValue);
                console.log("Current range:", currentRange);
              }}
            >
              {fromValue && toValue
                ? `${fromValue} ~ ${toValue}`
                : "Chọn khoảng thời gian"}
            </button>
          )}
        </RangePicker>
        {range?.from && range?.to && (
          <p className="text-sm">
            Selected:{" "}
            <strong>
              {format(range.from, DATE_FORMAT)} ~ {format(range.to, DATE_FORMAT)}
            </strong>
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
    const [range, setRange] = useState<DateRange | undefined>();

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Custom card-style trigger
        </p>
        <RangePicker
          {...args}
          fromValue={range?.from ? format(range.from, DATE_FORMAT) : ""}
          toValue={range?.to ? format(range.to, DATE_FORMAT) : ""}
          onSelect={(r) => setRange(r)}
        >
          {({ fromValue, toValue, range: currentRange }) => (
            <div className="p-4 rounded-lg border border-input bg-card hover:bg-accent transition-colors cursor-pointer min-w-[280px]">
              <div className="text-xs text-muted-foreground mb-1">
                Khoảng thời gian
              </div>
              <div className="text-lg font-semibold">
                {fromValue && toValue
                  ? `${fromValue} ~ ${toValue}`
                  : "Chưa chọn"}
              </div>
              {currentRange?.from && currentRange?.to && (
                <div className="text-xs text-muted-foreground mt-1">
                  {format(currentRange.from, "dd MMMM", { locale: vi })} ~{" "}
                  {format(currentRange.to, "dd MMMM yyyy", { locale: vi })}
                </div>
              )}
            </div>
          )}
        </RangePicker>
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
    const [range, setRange] = useState<DateRange | undefined>();
    const handleSelect = (r: DateRange | undefined) => setRange(r);

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Desktop mode set to drawer (default is popover)
        </p>
        <RangePicker
          {...args}
          fromValue={range?.from ? format(range.from, DATE_FORMAT) : ""}
          toValue={range?.to ? format(range.to, DATE_FORMAT) : ""}
          onSelect={handleSelect}
          fromInputProps={{ label: "From Date" }}
          toInputProps={{ label: "To Date" }}
        />
      </div>
    );
  },
  args: {
    desktopMode: "drawer",
    mobileMode: "drawer",
  },
};

export const CloseOnSelect: Story = {
  render: function CloseOnSelectComponent(args) {
    const [range, setRange] = useState<DateRange | undefined>();
    const handleSelect = (r: DateRange | undefined) => setRange(r);

    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Calendar closes automatically when both dates are selected
        </p>
        <RangePicker
          {...args}
          fromValue={range?.from ? format(range.from, DATE_FORMAT) : ""}
          toValue={range?.to ? format(range.to, DATE_FORMAT) : ""}
          onSelect={handleSelect}
          fromInputProps={{ label: "From Date" }}
          toInputProps={{ label: "To Date" }}
        />
      </div>
    );
  },
  args: {
    closeOnSelect: true,
  },
};

export const WithTime: Story = {
  render: function WithTimeComponent(args) {
    const [range, setRange] = useState<DateRange | undefined>();
    const handleSelect = (r: DateRange | undefined) => setRange(r);

    return (
      <div className="flex flex-col gap-4">
        {range?.from && range?.to && (
          <p className="text-sm">
            Selected: <strong>{format(range.from, "dd/MM/yyyy HH:mm")} ~ {format(range.to, "dd/MM/yyyy HH:mm")}</strong>
          </p>
        )}
        <RangePicker
          {...args}
          fromValue={range?.from ? format(range.from, "dd/MM/yyyy HH:mm") : ""}
          toValue={range?.to ? format(range.to, "dd/MM/yyyy HH:mm") : ""}
          onSelect={handleSelect}
          fromInputProps={{ label: "From Date" }}
          toInputProps={{ label: "To Date" }}
        />
      </div>
    );
  },
  args: {
    showTime: true,
    timeFormat: "HH:mm",
  },
};

export const WithTimeAndSeconds: Story = {
  render: function WithTimeAndSecondsComponent(args) {
    const [range, setRange] = useState<DateRange | undefined>();
    const handleSelect = (r: DateRange | undefined) => setRange(r);

    return (
      <div className="flex flex-col gap-4">
        {range?.from && range?.to && (
          <p className="text-sm">
            Selected: <strong>{format(range.from, "dd/MM/yyyy HH:mm:ss")} ~ {format(range.to, "dd/MM/yyyy HH:mm:ss")}</strong>
          </p>
        )}
        <RangePicker
          {...args}
          fromValue={range?.from ? format(range.from, "dd/MM/yyyy HH:mm:ss") : ""}
          toValue={range?.to ? format(range.to, "dd/MM/yyyy HH:mm:ss") : ""}
          onSelect={handleSelect}
          fromInputProps={{ label: "From Date" }}
          toInputProps={{ label: "To Date" }}
        />
      </div>
    );
  },
  args: {
    showTime: true,
    timeFormat: "HH:mm:ss",
  },
};

export const TimeOnly: Story = {
  render: function TimeOnlyComponent(args) {
    const [range, setRange] = useState<DateRange | undefined>();
    const handleSelect = (r: DateRange | undefined) => setRange(r);

    return (
      <div className="flex flex-col gap-4">
        {range?.from && range?.to && (
          <p className="text-sm">
            Selected: <strong>{format(range.from, "HH:mm")} ~ {format(range.to, "HH:mm")}</strong>
          </p>
        )}
        <RangePicker
          {...args}
          fromValue={range?.from ? format(range.from, "HH:mm") : ""}
          toValue={range?.to ? format(range.to, "HH:mm") : ""}
          onSelect={handleSelect}
          fromInputProps={{ label: "From Time" }}
          toInputProps={{ label: "To Time" }}
        />
      </div>
    );
  },
  args: {
    showTime: true,
    hideDate: true,
    timeFormat: "HH:mm",
  },
};
