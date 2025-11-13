import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Slider, { type SliderProps } from "../components/Slider/Slider";
import i18n from "../../.storybook/i18n";

const meta: Meta<SliderProps> = {
  title: "Form Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: "number",
      description: i18n.t("stories.slider.argTypes.min.description"),
      table: {
        defaultValue: { summary: "0" },
        category: i18n.t("stories.category.basic"),
      },
    },
    max: {
      control: "number",
      description: i18n.t("stories.slider.argTypes.max.description"),
      table: {
        defaultValue: { summary: "100" },
        category: i18n.t("stories.category.basic"),
      },
    },
    step: {
      control: "number",
      description: i18n.t("stories.slider.argTypes.step.description"),
      table: {
        defaultValue: { summary: "1" },
        category: i18n.t("stories.category.basic"),
      },
    },
    defaultValue: {
      control: "object",
      description: i18n.t("stories.slider.argTypes.defaultValue.description"),
      table: {
        type: { summary: "number[]" },
        defaultValue: { summary: "[50]" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    value: {
      control: "object",
      description: i18n.t("stories.slider.argTypes.value.description"),
      table: {
        type: { summary: "number[]" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    disabled: {
      control: "boolean",
      description: i18n.t("stories.slider.argTypes.disabled.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: i18n.t("stories.slider.argTypes.orientation.description"),
      table: {
        defaultValue: { summary: "horizontal" },
        category: i18n.t("stories.category.layout"),
      },
    },
    showLabel: {
      control: "select",
      options: [false, "hover", "always"],
      description: i18n.t("stories.slider.argTypes.showLabel.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.ui"),
      },
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
        "neutral",
        "accent",
      ],
      description: i18n.t("stories.slider.argTypes.color.description"),
      table: {
        defaultValue: { summary: "primary" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    onValueChange: {
      action: "valueChanged",
      description: i18n.t("stories.slider.argTypes.onValueChange.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onValueCommit: {
      action: "valueCommitted",
      description: i18n.t("stories.slider.argTypes.onValueCommit.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: i18n.t("stories.slider.argTypes.size.description"),
      table: {
        defaultValue: { summary: "md" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    labelArrow: {
      control: "boolean",
      description: i18n.t("stories.slider.argTypes.labelArrow.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.ui"),
      },
    },
    labelAnimation: {
      control: "select",
      options: ["none", "number-flow", "spec"],
      description: i18n.t("stories.slider.argTypes.labelAnimation.description"),
      table: {
        defaultValue: { summary: "none" },
        category: i18n.t("stories.category.ui"),
      },
    },
    labelPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: i18n.t("stories.slider.argTypes.labelPosition.description"),
      table: {
        defaultValue: { summary: "top" },
        category: i18n.t("stories.category.ui"),
      },
    },
    labelFormatter: {
      control: "text",
      description: i18n.t("stories.slider.argTypes.labelFormatter.description"),
      table: {
        type: { summary: "(value: number) => string" },
        defaultValue: { summary: "(value) => `${value}`" },
        category: i18n.t("stories.category.formatting"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.slider.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
        type: { summary: "string" },
      },
    },
    labelColor: {
      control: "text",
      description: i18n.t("stories.slider.argTypes.labelColor.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    labelArrowColor: {
      control: "text",
      description: i18n.t(
        "stories.slider.argTypes.labelArrowColor.description",
      ),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    labelTextColor: {
      control: "text",
      description: i18n.t("stories.slider.argTypes.labelTextColor.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    sliderColor: {
      control: "text",
      description: i18n.t("stories.slider.argTypes.sliderColor.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    thumbBorderColor: {
      control: "text",
      description: i18n.t(
        "stories.slider.argTypes.thumbBorderColor.description",
      ),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: [50],
    showLabel: false,
    labelArrow: false,
    color: "primary",
    size: "md",
    labelAnimation: "none",
  },
};

export default meta;
type Story = StoryObj<SliderProps>;

// Default slider
export const Default: Story = {
  render: function DefaultSlider(args) {
    const [value, setValue] = React.useState(
      args.value || args.defaultValue || [50],
    );

    return (
      <div className="w-80">
        <Slider {...args} value={value} onValueChange={setValue} />
      </div>
    );
  },
};

// With label and value display
export const WithValue: Story = {
  render: function WithValueSlider() {
    const [value, setValue] = React.useState([50]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Volume</label>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    );
  },
};

// Range slider (two thumbs)
export const Range: Story = {
  render: function RangeSlider() {
    const [value, setValue] = React.useState([25, 75]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Price Range</label>
          <span className="text-sm text-muted-foreground">
            ${value[0]} - ${value[1]}
          </span>
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
      </div>
    );
  },
};

// Different steps
export const Marks: Story = {
  render: () => (
    <div className="w-80 space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Memory:</label>
        <Slider defaultValue={[1]} max={2} step={1} />
        <div className="mt-2 -mx-1.5 flex items-center justify-between text-muted-foreground text-xs">
          {["4GB", "6GB", "8GB"].map((expansion) => (
            <span key={expansion}>{expansion}</span>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Vertical orientation
export const Vertical: Story = {
  render: function VerticalSlider() {
    const [value, setValue] = React.useState([50]);

    return (
      <div className="flex gap-8 h-64">
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
          <Slider
            value={value}
            onValueChange={setValue}
            orientation="vertical"
            className="h-full"
          />
          <label className="text-sm font-medium">Volume</label>
        </div>
      </div>
    );
  },
};

// Multiple vertical sliders (equalizer)
export const Equalizer: Story = {
  render: function EqualizerSliders() {
    const [bass, setBass] = React.useState([60]);
    const [mid, setMid] = React.useState([50]);
    const [treble, setTreble] = React.useState([70]);

    return (
      <div className="flex gap-8 h-64 items-end">
        <div className="flex flex-col items-center gap-4">
          <Slider
            value={bass}
            onValueChange={setBass}
            orientation="vertical"
            className="h-48"
          />
          <label className="text-sm font-medium">Bass</label>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Slider
            value={mid}
            onValueChange={setMid}
            orientation="vertical"
            className="h-48"
          />
          <label className="text-sm font-medium">Mid</label>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Slider
            value={treble}
            onValueChange={setTreble}
            orientation="vertical"
            className="h-48"
          />
          <label className="text-sm font-medium">Treble</label>
        </div>
      </div>
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="w-80 space-y-8">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Disabled Single
        </label>
        <Slider defaultValue={[50]} disabled />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Disabled Range
        </label>
        <Slider defaultValue={[25, 75]} disabled />
      </div>
    </div>
  ),
};

// Interactive examples
export const VolumeControl: Story = {
  render: function VolumeControl() {
    const [volume, setVolume] = React.useState([75]);

    return (
      <div className="w-80 space-y-4 p-6 rounded-lg border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Volume Control</h3>
            <p className="text-sm text-muted-foreground">
              Adjust the system volume
            </p>
          </div>
          <span className="text-2xl font-bold">{volume[0]}%</span>
        </div>
        <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Muted</span>
          <span>Max</span>
        </div>
      </div>
    );
  },
};

// Temperature control
export const Temperature: Story = {
  render: function TemperatureControl() {
    const [temp, setTemp] = React.useState([22]);

    const getTempColor = (temperature: number) => {
      if (temperature < 18) return "text-blue-500";
      if (temperature > 24) return "text-red-500";
      return "text-green-500";
    };

    return (
      <div className="w-80 space-y-4 p-6 rounded-lg border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Temperature</h3>
            <p className="text-sm text-muted-foreground">
              Set your preferred temperature
            </p>
          </div>
          <span className={`text-3xl font-bold ${getTempColor(temp[0])}`}>
            {temp[0]}°C
          </span>
        </div>
        <Slider
          value={temp}
          onValueChange={setTemp}
          min={16}
          max={30}
          step={0.5}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>16°C</span>
          <span>30°C</span>
        </div>
      </div>
    );
  },
};

// Brightness control
export const Brightness: Story = {
  render: function BrightnessControl() {
    const [brightness, setBrightness] = React.useState([80]);

    return (
      <div className="w-80 space-y-4 p-6 rounded-lg border bg-card">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Brightness</h3>
          <span className="text-sm font-medium">{brightness[0]}%</span>
        </div>
        <div
          className="h-32 rounded-lg transition-opacity"
          style={{
            opacity: brightness[0] / 100,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        />
        <Slider
          value={brightness}
          onValueChange={setBrightness}
          max={100}
          step={5}
        />
      </div>
    );
  },
};

// === STICKY LABEL EXAMPLES ===

// Different slider colors (without labels)
export const SliderColors: Story = {
  render: function SliderColorsDemo() {
    const [primary, setPrimary] = React.useState([50]);
    const [secondary, setSecondary] = React.useState([60]);
    const [success, setSuccess] = React.useState([70]);
    const [warning, setWarning] = React.useState([80]);
    const [error, setError] = React.useState([40]);
    const [accent, setAccent] = React.useState([55]);
    const [glass, setGlass] = React.useState([65]);

    return (
      <div className="w-80 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Primary</label>
          <Slider value={primary} onValueChange={setPrimary} color="primary" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Secondary</label>
          <Slider
            value={secondary}
            onValueChange={setSecondary}
            color="secondary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Success</label>
          <Slider value={success} onValueChange={setSuccess} color="success" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Warning</label>
          <Slider value={warning} onValueChange={setWarning} color="warning" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Error</label>
          <Slider value={error} onValueChange={setError} color="error" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Accent</label>
          <Slider value={accent} onValueChange={setAccent} color="accent" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Glass</label>
          <Slider value={glass} onValueChange={setGlass} color="glass" />
        </div>
      </div>
    );
  },
};

// === STICKY LABEL EXAMPLES ===

// Different slider sizes
export const SliderSizes: Story = {
  render: function SliderSizesDemo() {
    const [small, setSmall] = React.useState([50]);
    const [medium, setMedium] = React.useState([60]);
    const [large, setLarge] = React.useState([70]);

    return (
      <div className="w-80 space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">Small</label>
          <Slider value={small} onValueChange={setSmall} size="sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Medium (Default)</label>
          <Slider value={medium} onValueChange={setMedium} size="md" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Large</label>
          <Slider value={large} onValueChange={setLarge} size="lg" />
        </div>
      </div>
    );
  },
};

// Sizes with labels
export const SliderSizesWithLabels: Story = {
  render: function SliderSizesWithLabelsDemo() {
    const [small, setSmall] = React.useState([50]);
    const [medium, setMedium] = React.useState([60]);
    const [large, setLarge] = React.useState([70]);

    return (
      <div className="w-80 space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">Small slider + label</label>
          <Slider
            value={small}
            onValueChange={setSmall}
            size="sm"
            showLabel="always"
            labelArrow
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Medium slider + label</label>
          <Slider
            value={medium}
            onValueChange={setMedium}
            size="md"
            showLabel="always"
            labelArrow
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Large slider + label</label>
          <Slider
            value={large}
            onValueChange={setLarge}
            size="lg"
            showLabel="always"
            labelArrow
          />
        </div>
      </div>
    );
  },
};

// Hover to show label
export const LabelOnHover: Story = {
  render: function LabelOnHoverSlider() {
    const [value, setValue] = React.useState([50]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Hover to see value</label>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider value={value} onValueChange={setValue} showLabel="hover" />
      </div>
    );
  },
};

// Always show label
export const LabelAlwaysVisible: Story = {
  render: function LabelAlwaysVisibleSlider() {
    const [value, setValue] = React.useState([75]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Label always visible</label>
        </div>
        <Slider value={value} onValueChange={setValue} showLabel="always" />
      </div>
    );
  },
};

// Label with arrow
export const LabelWithArrow: Story = {
  render: function LabelWithArrowSlider() {
    const [value, setValue] = React.useState([60]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Label with arrow</label>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          showLabel="always"
          labelArrow
        />
      </div>
    );
  },
};

// Different label colors
export const LabelColors: Story = {
  render: function LabelColorsSlider() {
    const [primary, setPrimary] = React.useState([50]);
    const [success, setSuccess] = React.useState([70]);
    const [warning, setWarning] = React.useState([85]);
    const [error, setError] = React.useState([30]);
    const [glass, setGlass] = React.useState([60]);

    return (
      <div className="w-80 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Primary (slider + label)
          </label>
          <Slider
            value={primary}
            onValueChange={setPrimary}
            showLabel="always"
            color="primary"
            labelArrow
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Success</label>
          <Slider
            value={success}
            onValueChange={setSuccess}
            showLabel="always"
            color="success"
            labelArrow
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Warning</label>
          <Slider
            value={warning}
            onValueChange={setWarning}
            showLabel="always"
            color="warning"
            labelArrow
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Error</label>
          <Slider
            value={error}
            onValueChange={setError}
            showLabel="always"
            color="error"
            labelArrow
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Glass</label>
          <Slider
            value={glass}
            onValueChange={setGlass}
            showLabel="always"
            color="glass"
            labelArrow
          />
        </div>
      </div>
    );
  },
};

// Number flow animation
export const NumberFlowAnimation: Story = {
  render: function NumberFlowAnimationSlider() {
    const [value, setValue] = React.useState([50]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Number Flow Animation</label>
          <span className="text-sm text-muted-foreground">
            Drag to see animation
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          showLabel="always"
          labelAnimation="number-flow"
          labelArrow
        />
      </div>
    );
  },
};

// Spec animation (like Tooltip)
export const SpecAnimation: Story = {
  render: function SpecAnimationSlider() {
    const [value, setValue] = React.useState([50]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Spec Animation</label>
          <span className="text-sm text-muted-foreground">
            Hover and move mouse
          </span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          showLabel="hover"
          labelAnimation="spec"
          color="primary"
        />
      </div>
    );
  },
};

// Custom formatter
export const CustomFormatter: Story = {
  render: function CustomFormatterSlider() {
    const [temperature, setTemperature] = React.useState([22]);
    const [price, setPrice] = React.useState([5000]);
    const [percentage, setPercentage] = React.useState([0.75]);
    const [fileSize, setFileSize] = React.useState([2048]); // KB
    const [rating, setRating] = React.useState([4.5]);
    const [duration, setDuration] = React.useState([90]); // seconds

    const formatFileSize = (kb: number) => {
      if (kb < 1024) return `${kb} KB`;
      if (kb < 1024 * 1024) return `${(kb / 1024).toFixed(1)} MB`;
      return `${(kb / (1024 * 1024)).toFixed(1)} GB`;
    };

    const formatRating = (value: number) => {
      return `${value.toFixed(1)} ★`;
    };

    const formatDuration = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
      <div className="w-80 space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">Temperature (°C)</label>
          <Slider
            value={temperature}
            onValueChange={setTemperature}
            min={16}
            max={30}
            step={0.5}
            showLabel="always"
            labelFormatter={(v) => `${v}°C`}
            labelArrow
            color="warning"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Price</label>
          <Slider
            value={price}
            onValueChange={setPrice}
            min={1000}
            max={10000}
            step={100}
            showLabel="always"
            labelFormatter={(v) => `$${v.toLocaleString()}`}
            labelArrow
            color="success"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Progress</label>
          <Slider
            value={percentage}
            onValueChange={setPercentage}
            min={0}
            max={1}
            step={0.01}
            showLabel="always"
            labelFormatter={(v) => `${Math.round(v * 100)}%`}
            labelArrow
            color="primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">File Size</label>
          <Slider
            value={fileSize}
            onValueChange={setFileSize}
            min={100}
            max={1024 * 1024} // 1GB in KB
            step={100}
            showLabel="always"
            labelFormatter={formatFileSize}
            labelArrow
            color="accent"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>
          <Slider
            value={rating}
            onValueChange={setRating}
            min={1}
            max={5}
            step={0.1}
            showLabel="always"
            labelFormatter={formatRating}
            labelArrow
            color="warning"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Duration</label>
          <Slider
            value={duration}
            onValueChange={setDuration}
            min={30}
            max={300}
            step={5}
            showLabel="always"
            labelFormatter={formatDuration}
            labelArrow
            color="glass"
          />
        </div>
      </div>
    );
  },
};

// Range slider with labels
export const RangeWithLabels: Story = {
  render: function RangeWithLabelsSlider() {
    const [range, setRange] = React.useState([25, 75]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Price Range</label>
          <span className="text-sm text-muted-foreground">
            ${range[0]} - ${range[1]}
          </span>
        </div>
        <Slider
          value={range}
          onValueChange={setRange}
          showLabel="always"
          labelFormatter={(v) => `$${v}`}
          labelArrow
          color="success"
        />
      </div>
    );
  },
};

// Interactive volume with label
export const VolumeWithLabel: Story = {
  render: function VolumeWithLabelSlider() {
    const [volume, setVolume] = React.useState([75]);

    const getVolumeColor = (vol: number) => {
      if (vol === 0) return "muted";
      if (vol < 30) return "success";
      if (vol < 70) return "warning";
      return "error";
    };

    return (
      <div className="w-80 space-y-4 p-6 rounded-lg border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Volume Control</h3>
            <p className="text-sm text-muted-foreground">
              Drag to adjust volume
            </p>
          </div>
          <span className="text-2xl font-bold">{volume[0]}%</span>
        </div>
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          showLabel="hover"
          labelAnimation="number-flow"
          color={getVolumeColor(volume[0])}
          labelArrow
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Muted</span>
          <span>Max</span>
        </div>
      </div>
    );
  },
};

// Spec animation with different positions
export const SpecAnimationPositions: Story = {
  render: function SpecAnimationPositionsDemo() {
    const [topValue, setTopValue] = React.useState([50]);
    const [bottomValue, setBottomValue] = React.useState([60]);

    return (
      <div className="w-80 space-y-12">
        <div className="space-y-4">
          <label className="text-sm font-medium">Spec Animation - Top</label>
          <p className="text-xs text-muted-foreground">Hover and move mouse</p>
          <Slider
            value={topValue}
            onValueChange={setTopValue}
            showLabel="always"
            labelAnimation="spec"
            labelPosition="top"
            color="primary"
          />
        </div>
        <div className="space-y-4">
          <label className="text-sm font-medium">Spec Animation - Bottom</label>
          <p className="text-xs text-muted-foreground">Hover and move mouse</p>
          <Slider
            value={bottomValue}
            onValueChange={setBottomValue}
            showLabel="always"
            labelAnimation="spec"
            labelPosition="bottom"
            color="secondary"
          />
        </div>
      </div>
    );
  },
};

// All horizontal positions test
export const AllHorizontalPositions: Story = {
  render: function AllHorizontalPositionsDemo() {
    const [topValue, setTopValue] = React.useState([50]);
    const [bottomValue, setBottomValue] = React.useState([60]);
    const [leftValue, setLeftValue] = React.useState([40]);
    const [rightValue, setRightValue] = React.useState([70]);

    return (
      <div className="w-96 space-y-16 p-8">
        <div className="space-y-4">
          <label className="text-sm font-medium">Horizontal - Label Top</label>
          <Slider
            value={topValue}
            onValueChange={setTopValue}
            showLabel="always"
            labelPosition="top"
            labelArrow
            color="primary"
          />
        </div>
        <div className="space-y-4">
          <label className="text-sm font-medium">
            Horizontal - Label Bottom
          </label>
          <Slider
            value={bottomValue}
            onValueChange={setBottomValue}
            showLabel="always"
            labelPosition="bottom"
            labelArrow
            color="secondary"
          />
        </div>
        <div className="space-y-4">
          <label className="text-sm font-medium">Horizontal - Label Left</label>
          <Slider
            value={leftValue}
            onValueChange={setLeftValue}
            showLabel="always"
            labelPosition="left"
            labelArrow
            color="success"
          />
        </div>
        <div className="space-y-4">
          <label className="text-sm font-medium">
            Horizontal - Label Right
          </label>
          <Slider
            value={rightValue}
            onValueChange={setRightValue}
            showLabel="always"
            labelPosition="right"
            labelArrow
            color="warning"
          />
        </div>
      </div>
    );
  },
};

// All vertical positions test
export const AllVerticalPositions: Story = {
  render: function AllVerticalPositionsDemo() {
    const [topValue, setTopValue] = React.useState([50]);
    const [bottomValue, setBottomValue] = React.useState([60]);
    const [leftValue, setLeftValue] = React.useState([40]);
    const [rightValue, setRightValue] = React.useState([70]);

    return (
      <div className="flex gap-12 h-96 items-center p-8">
        <div className="flex flex-col items-center gap-4">
          <Slider
            value={topValue}
            onValueChange={setTopValue}
            orientation="vertical"
            showLabel="always"
            labelPosition="top"
            labelArrow
            color="primary"
            className="h-64"
          />
          <label className="text-sm font-medium">Label Top</label>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Slider
            value={bottomValue}
            onValueChange={setBottomValue}
            orientation="vertical"
            showLabel="always"
            labelPosition="bottom"
            labelArrow
            color="secondary"
            className="h-64"
          />
          <label className="text-sm font-medium">Label Bottom</label>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Slider
            value={leftValue}
            onValueChange={setLeftValue}
            orientation="vertical"
            showLabel="always"
            labelPosition="left"
            labelArrow
            color="success"
            className="h-64"
          />
          <label className="text-sm font-medium">Label Left</label>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Slider
            value={rightValue}
            onValueChange={setRightValue}
            orientation="vertical"
            showLabel="always"
            labelPosition="right"
            labelArrow
            color="warning"
            className="h-64"
          />
          <label className="text-sm font-medium">Label Right</label>
        </div>
      </div>
    );
  },
};

// === CUSTOM COLOR COMBINATIONS ===

// Pink slider with yellow label
export const CustomColorPinkYellow: Story = {
  render: function CustomColorPinkYellowSlider() {
    const [value, setValue] = React.useState([50]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">
            Pink Slider + Yellow Label
          </label>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          showLabel="always"
          labelArrow
          sliderColor="bg-pink-500"
          thumbBorderColor="border-pink-500/50"
          labelColor="bg-yellow-500"
          labelTextColor="text-yellow-950"
          labelArrowColor="border-t-yellow-500"
        />
      </div>
    );
  },
};

// Purple slider with brown label
export const CustomColorPurpleBrown: Story = {
  render: function CustomColorPurpleBrownSlider() {
    const [value, setValue] = React.useState([60]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">
            Purple Slider + Brown Label
          </label>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          showLabel="always"
          labelArrow
          sliderColor="bg-purple-600"
          thumbBorderColor="border-purple-600/50"
          labelColor="bg-amber-800"
          labelTextColor="text-amber-50"
          labelArrowColor="border-t-amber-800"
        />
      </div>
    );
  },
};

// Blue slider with orange label
export const CustomColorBlueOrange: Story = {
  render: function CustomColorBlueOrangeSlider() {
    const [value, setValue] = React.useState([70]);

    return (
      <div className="w-80 space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">
            Blue Slider + Orange Label
          </label>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          showLabel="always"
          labelArrow
          sliderColor="bg-blue-600"
          thumbBorderColor="border-blue-600/50"
          labelColor="bg-orange-500"
          labelTextColor="text-orange-950"
          labelArrowColor="border-t-orange-500"
        />
      </div>
    );
  },
};

// All custom colors together
export const CustomColorsShowcase: Story = {
  render: function CustomColorsShowcaseSlider() {
    const [pink, setPink] = React.useState([50]);
    const [purple, setPurple] = React.useState([60]);
    const [blue, setBlue] = React.useState([70]);

    return (
      <div className="w-80 space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Pink Slider + Yellow Label
          </label>
          <Slider
            value={pink}
            onValueChange={setPink}
            showLabel="always"
            labelArrow
            sliderColor="bg-pink-500"
            thumbBorderColor="border-pink-500/50"
            labelColor="bg-yellow-200"
            labelTextColor="text-yellow-500"
            labelArrowColor="border-t-yellow-200"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Purple Slider + Brown Label
          </label>
          <Slider
            value={purple}
            onValueChange={setPurple}
            showLabel="always"
            labelArrow
            sliderColor="bg-purple-600"
            thumbBorderColor="border-purple-600/50"
            labelColor="bg-amber-800"
            labelTextColor="text-amber-50"
            labelArrowColor="border-t-amber-800"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Blue Slider + Orange Label
          </label>
          <Slider
            value={blue}
            onValueChange={setBlue}
            showLabel="always"
            labelArrow
            sliderColor="bg-blue-600"
            thumbBorderColor="border-blue-600/50"
            labelColor="bg-red-500"
            labelTextColor="text-red-950"
            labelArrowColor="border-t-red-500"
          />
        </div>
      </div>
    );
  },
};
