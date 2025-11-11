"use client";

import type { Meta, StoryObj } from "@storybook/react";
import Switch, { type SwitchProps } from "../components/Switch/Switch";
import { Moon, Sun, Zap, Heart } from "lucide-react";
import { useState } from "react";

const meta: Meta<SwitchProps> = {
  title: "Base/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "square1", "square2", "mini"],
      description: "The visual style variant of the switch",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "normal", "lg", "xl"],
      description: "The size of the switch",
      table: {
        defaultValue: { summary: "normal" },
      },
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "accent",
        "destructive",
        "muted",
        "success",
        "error",
        "warning",
      ],
      description: "The color theme of the switch",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the switch",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    animation: {
      control: "select",
      options: [
        " ",
        "heartbeat",
        "shine",
        // "glass",
        "glow",
        "loading",
      ],
      description: "Animation effect for the switch",
    },
    label: {
      control: "text",
      description: "Label text for the switch",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: "Position of the label relative to the switch",
      table: {
        defaultValue: { summary: "right" },
      },
    },
    showLabels: {
      control: "select",
      options: ["none", "inside", "outside"],
      description: "Show labels inside or outside the switch",
      table: {
        defaultValue: { summary: "none" },
      },
    },
    className: { control: "text", description: "Additional CSS classes" },
    onCheckedChange: { action: "checked" },
  },
  args: {
    variant: "default",
    size: "normal",
    color: "primary",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = (args: SwitchProps) => {
  const [checked, setChecked] = useState(false);
  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
};

const VariantsComponent = (args: SwitchProps) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="min-w-20 text-sm font-medium">Default:</span>
        <Switch
          {...args}
          variant="default"
          checked={checked1}
          onCheckedChange={setChecked1}
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="min-w-20 text-sm font-medium">Square 1:</span>
        <Switch
          {...args}
          variant="square1"
          checked={checked2}
          onCheckedChange={setChecked2}
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="min-w-20 text-sm font-medium">Square 2:</span>
        <Switch
          {...args}
          variant="square2"
          checked={checked3}
          onCheckedChange={setChecked3}
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="min-w-20 text-sm font-medium">Mini:</span>
        <Switch
          {...args}
          variant="mini"
          checked={checked4}
          onCheckedChange={setChecked4}
        />
      </div>
    </div>
  );
};

const ColorsComponent = () => {
  const colors = [
    "primary",
    "secondary",
    "accent",
    "destructive",
    "muted",
    "success",
    "error",
    "warning",
  ] as const;

  const [states, setStates] = useState(
    Object.fromEntries(colors.map((c) => [c, false])) as Record<
      (typeof colors)[number],
      boolean
    >
  );

  const updateState = (key: (typeof colors)[number]) => {
    setStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-4">
      {colors.map((color) => (
        <div key={color} className="flex items-center gap-4">
          <span className="min-w-20 capitalize text-sm font-medium">
            {color}:
          </span>
          <Switch
            color={color}
            checked={states[color] || false}
            onCheckedChange={() => updateState(color)}
          />
        </div>
      ))}
    </div>
  );
};

const SizesComponent = () => {
  const sizes = ["xs", "sm", "normal", "lg", "xl"] as const;

  const [states, setStates] = useState(
    Object.fromEntries(sizes.map((s) => [s, false])) as Record<
      (typeof sizes)[number],
      boolean
    >
  );

  const updateState = (key: (typeof sizes)[number]) => {
    setStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex items-center gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Switch
            size={size}
            checked={states[size] || false}
            onCheckedChange={() => updateState(size)}
          />
          <span className="capitalize text-xs font-medium">{size}</span>
        </div>
      ))}
    </div>
  );
};

const WithLabelComponent = () => {
  const [checkedLeft, setCheckedLeft] = useState(false);
  const [checkedRight, setCheckedRight] = useState(false);
  const [checkedTop, setCheckedTop] = useState(false);
  const [checkedBottom, setCheckedBottom] = useState(false);
  return (
    <div className="flex flex-col items-center gap-8">
      <Switch
        label="Top Label"
        labelPosition="top"
        checked={checkedTop}
        onCheckedChange={setCheckedTop}
      />
      <Switch
        label="Bottom Label"
        labelPosition="bottom"
        checked={checkedBottom}
        onCheckedChange={setCheckedBottom}
      />

      <Switch
        label="Left Label"
        labelPosition="left"
        checked={checkedLeft}
        onCheckedChange={setCheckedLeft}
      />
      <Switch
        label="Right Label"
        labelPosition="right"
        checked={checkedRight}
        onCheckedChange={setCheckedRight}
      />
    </div>
  );
};

const WithInsideLabelsComponent = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">With Icons (Inside):</span>
        <Switch
          size="lg"
          showLabels="inside"
          offLabel={<Moon size={14} />}
          onLabel={<Sun size={14} />}
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">With Text (Inside):</span>
        <Switch
          size="xl"
          showLabels="inside"
          offLabel={<span className="text-xs">Off</span>}
          onLabel={<span className="text-xs">On</span>}
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>
    </div>
  );
};

const WithOutsideLabelsComponent = () => {
  const [states, setStates] = useState({
    theme: false,
    notifications: false,
    power: false,
    favorite: false,
  });

  const updateState = (key: keyof typeof states) => {
    setStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Theme Switcher:</span>
        <Switch
          size="lg"
          showLabels="outside"
          offLabel={<Moon size={16} />}
          onLabel={<Sun size={16} />}
          checked={states.theme}
          onCheckedChange={() => updateState("theme")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">With Text Labels:</span>
        <Switch
          size="lg"
          showLabels="outside"
          offLabel="Off"
          onLabel="On"
          checked={states.notifications}
          onCheckedChange={() => updateState("notifications")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Power Toggle:</span>
        <Switch
          size="lg"
          showLabels="outside"
          offLabel={<Zap size={16} className="rotate-45 opacity-50" />}
          onLabel={<Zap size={16} />}
          checked={states.power}
          onCheckedChange={() => updateState("power")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Favorite Toggle:</span>
        <Switch
          size="lg"
          showLabels="outside"
          offLabel={<Heart size={16} className="opacity-50" />}
          onLabel={<Heart size={16} className="fill-current" />}
          checked={states.favorite}
          onCheckedChange={() => updateState("favorite")}
        />
      </div>
    </div>
  );
};

const WithAnimationComponent = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Heartbeat</span>
        <Switch
          animation="heartbeat"
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Glow</span>
        <Switch
          animation="glow"
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Shine</span>
        <Switch
          animation="shine"
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>
    </div>
  );
};

// export const GlassEffect: Story = {
//   render: () => <GlassEffectComponent />,
// };

const CustomColorComponent = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Custom Purple Switch:</span>
        <Switch className="data-[state=checked]:bg-purple-500 data-[state=unchecked]:bg-purple-200" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Custom Gradient Switch:</span>
        <Switch className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-pink-500 data-[state=checked]:to-violet-500 data-[state=unchecked]:bg-gray-300 border-none" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Custom Orange Switch:</span>
        <Switch className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-orange-200 [&_[data-slot=switch-thumb]]:data-[state=checked]:bg-orange-100" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Custom Teal Switch:</span>
        <Switch className="data-[state=checked]:bg-teal-500 data-[state=unchecked]:bg-teal-200 [&_[data-slot=switch-thumb]]:data-[state=checked]:bg-teal-100" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Custom Thumb Color:</span>
        <Switch className="data-[state=checked]:bg-pink-400 data-[state=unchecked]:!bg-pink-800 [&_[data-slot=switch-thumb]]:data-[state=checked]:bg-yellow-500" />
      </div>
    </div>
  );
};

const DisabledStateComponent = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Disabled (Off):</span>
      <Switch checked={false} disabled />
    </div>
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium">Disabled (On):</span>
      <Switch checked={true} disabled />
    </div>
  </div>
);

const AllVariantsShowcaseComponent = () => {
  const [states, setStates] = useState<Record<string, boolean>>({});

  const setState = (key: string, value: boolean) => {
    setStates((prev) => ({ ...prev, [key]: value }));
  };

  const colors: SwitchProps["color"][] = [
    "primary",
    "secondary",
    "accent",
    "destructive",
    "muted",
    "success",
    "error",
    "warning",
  ];
  const variants: SwitchProps["variant"][] = ["default", "square1", "square2"];
  const sizes: SwitchProps["size"][] = ["xs", "sm", "normal", "lg", "xl"];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">All Variants</h3>
        <div className="flex flex-wrap gap-4">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-2">
              <Switch
                variant={variant}
                checked={states[`variant-${variant}`] || false}
                onCheckedChange={(v) => setState(`variant-${variant}`, v)}
              />
              <span className="capitalize text-xs font-medium">{variant}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">All Sizes</h3>
        <div className="flex items-center gap-4">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Switch
                size={size}
                checked={states[`size-${size}`] || false}
                onCheckedChange={(v) => setState(`size-${size}`, v)}
              />
              <span className="capitalize text-xs font-medium">{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">All Colors</h3>
        <div className="flex flex-wrap gap-6">
          {colors.map((color) => (
            <div key={color} className="flex flex-col items-center gap-2">
              <Switch
                color={color}
                checked={states[`color-${color}`] || false}
                onCheckedChange={(v) => setState(`color-${color}`, v)}
              />
              <span className="capitalize text-xs font-medium">{color}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomSwitchComponent = () => {
  const id = "custom-switch-example";
  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <div className="flex grow items-center gap-3">
        <img
          src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/github-icon.png?width=20&height=20&format=auto"
          alt="GitHub Icon"
          className="size-5"
        />
        <label className="grid grow gap-2" htmlFor={id}>
          <span>Connect with GitHub</span>
          <p id={`${id}-description`} className="text-muted-foreground text-xs">
            Access your projects direct from GitHub.
          </p>
        </label>
      </div>
      <Switch id={id} />
    </div>
  );
};

export const Default: Story = {
  render: DefaultComponent,
};

export const Variants: Story = {
  render: VariantsComponent,
};

export const Colors: Story = {
  render: () => <ColorsComponent />,
};

export const Sizes: Story = {
  render: () => <SizesComponent />,
};

export const WithLabel: Story = {
  render: () => <WithLabelComponent />,
};

export const WithInsideLabels: Story = {
  render: () => <WithInsideLabelsComponent />,
};

export const WithOutsideLabels: Story = {
  render: () => <WithOutsideLabelsComponent />,
};

export const WithAnimation: Story = {
  render: () => <WithAnimationComponent />,
};

// export const GlassEffect: Story = {
//   render: () => <GlassEffectComponent />,
// };

export const CustomColor: Story = {
  render: () => <CustomColorComponent />,
};

export const DisabledState: Story = {
  render: () => <DisabledStateComponent />,
};

export const AllVariantsShowcase: Story = {
  render: () => <AllVariantsShowcaseComponent />,
};

export const CustomSwitch: Story = {
  args: {},
  render: (args: SwitchProps) => <CustomSwitchComponent {...args} />,
};
