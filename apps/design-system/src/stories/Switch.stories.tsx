"use client";

import type { Meta, StoryObj } from "@storybook/react";
import Switch, { type SwitchProps } from "../components/Switch/Switch";
import { Moon, Sun, Zap, Heart } from "lucide-react";
import { useState } from "react";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Switch> = {
  title: "Form Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "square1", "square2", "mini"],
      description: i18n.t("stories.switch.argTypes.variant.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "normal", "lg", "xl"],
      description: i18n.t("stories.switch.argTypes.size.description"),
      table: {
        defaultValue: { summary: "normal" },
        category: i18n.t("stories.category.appearance"),
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
      description: i18n.t("stories.switch.argTypes.color.description"),
      table: {
        defaultValue: { summary: "primary" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    disabled: {
      control: "boolean",
      description: i18n.t("stories.switch.argTypes.disabled.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
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
      description: i18n.t("stories.switch.argTypes.animation.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    label: {
      control: "text",
      description: i18n.t("stories.switch.argTypes.label.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    labelPosition: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: i18n.t("stories.switch.argTypes.labelPosition.description"),
      table: {
        defaultValue: { summary: "right" },
        category: i18n.t("stories.category.layout"),
      },
    },
    showLabels: {
      control: "select",
      options: ["none", "inside", "outside"],
      description: i18n.t("stories.switch.argTypes.showLabels.description"),
      table: {
        defaultValue: { summary: "none" },
        category: i18n.t("stories.category.ui"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.switch.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
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
    <div className="ds:flex ds:flex-col ds:gap-6">
      <div className="ds:flex ds:items-center ds:gap-4">
        <span className="ds:min-w-20 ds:text-sm ds:font-medium">Default:</span>
        <Switch
          {...args}
          variant="default"
          checked={checked1}
          onCheckedChange={setChecked1}
        />
      </div>
      <div className="ds:flex ds:items-center ds:gap-4">
        <span className="ds:min-w-20 ds:text-sm ds:font-medium">Square 1:</span>
        <Switch
          {...args}
          variant="square1"
          checked={checked2}
          onCheckedChange={setChecked2}
        />
      </div>
      <div className="ds:flex ds:items-center ds:gap-4">
        <span className="ds:min-w-20 ds:text-sm ds:font-medium">Square 2:</span>
        <Switch
          {...args}
          variant="square2"
          checked={checked3}
          onCheckedChange={setChecked3}
        />
      </div>
      <div className="ds:flex ds:items-center ds:gap-4">
        <span className="ds:min-w-20 ds:text-sm ds:font-medium">Mini:</span>
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
    <div className="ds:flex ds:flex-col ds:gap-4">
      {colors.map((color) => (
        <div key={color} className="ds:flex ds:items-center ds:gap-4">
          <span className="ds:min-w-20 ds:capitalize ds:text-sm ds:font-medium">
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
    <div className="ds:flex ds:items-center ds:gap-4">
      {sizes.map((size) => (
        <div key={size} className="ds:flex ds:flex-col ds:items-center ds:gap-2">
          <Switch
            size={size}
            checked={states[size] || false}
            onCheckedChange={() => updateState(size)}
          />
          <span className="ds:capitalize ds:text-xs ds:font-medium">{size}</span>
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
    <div className="ds:flex ds:flex-col ds:items-center ds:gap-8">
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
    <div className="ds:flex ds:flex-col ds:gap-6">
      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">With Icons (Inside):</span>
        <Switch
          size="lg"
          showLabels="inside"
          offLabel={<Moon size={14} />}
          onLabel={<Sun size={14} />}
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>

      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">With Text (Inside):</span>
        <Switch
          size="xl"
          showLabels="inside"
          offLabel={<span className="ds:text-xs">Off</span>}
          onLabel={<span className="ds:text-xs">On</span>}
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
    <div className="ds:flex ds:flex-col ds:gap-6">
      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Theme Switcher:</span>
        <Switch
          size="lg"
          showLabels="outside"
          offLabel={<Moon size={16} />}
          onLabel={<Sun size={16} />}
          checked={states.theme}
          onCheckedChange={() => updateState("theme")}
        />
      </div>

      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">With Text Labels:</span>
        <Switch
          size="lg"
          showLabels="outside"
          offLabel="Off"
          onLabel="On"
          checked={states.notifications}
          onCheckedChange={() => updateState("notifications")}
        />
      </div>

      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Power Toggle:</span>
        <Switch
          size="lg"
          showLabels="outside"
          offLabel={<Zap size={16} className="ds:rotate-45 ds:opacity-50" />}
          onLabel={<Zap size={16} />}
          checked={states.power}
          onCheckedChange={() => updateState("power")}
        />
      </div>

      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Favorite Toggle:</span>
        <Switch
          size="lg"
          showLabels="outside"
          offLabel={<Heart size={16} className="ds:opacity-50" />}
          onLabel={<Heart size={16} className="ds:fill-current" />}
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
    <div className="ds:flex ds:flex-col ds:gap-6">
      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Heartbeat</span>
        <Switch
          animation="heartbeat"
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>

      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Glow</span>
        <Switch
          animation="glow"
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>

      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Shine</span>
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
    <div className="ds:flex ds:flex-col ds:gap-6">
      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Custom Purple Switch:</span>
        <Switch className="ds:data-[state=checked]:bg-purple-500 ds:data-[state=unchecked]:bg-purple-200" />
      </div>

      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Custom Gradient Switch:</span>
        <Switch className="ds:data-[state=checked]:bg-gradient-to-r ds:data-[state=checked]:from-pink-500 ds:data-[state=checked]:to-violet-500 ds:data-[state=unchecked]:bg-gray-300 ds:border-none" />
      </div>

      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Custom Orange Switch:</span>
        <Switch className="ds:data-[state=checked]:bg-orange-500 ds:data-[state=unchecked]:bg-orange-200 ds:[&_[data-slot=switch-thumb]]:data-[state=checked]:bg-orange-100" />
      </div>

      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Custom Teal Switch:</span>
        <Switch className="ds:data-[state=checked]:bg-teal-500 ds:data-[state=unchecked]:bg-teal-200 ds:[&_[data-slot=switch-thumb]]:data-[state=checked]:bg-teal-100" />
      </div>

      <div className="ds:flex ds:flex-col ds:gap-2">
        <span className="ds:text-sm ds:font-medium">Custom Thumb Color:</span>
        <Switch className="ds:data-[state=checked]:bg-pink-400 ds:data-[state=unchecked]:!bg-pink-800 ds:[&_[data-slot=switch-thumb]]:data-[state=checked]:bg-yellow-500" />
      </div>
    </div>
  );
};

const DisabledStateComponent = () => (
  <div className="ds:flex ds:flex-col ds:gap-4">
    <div className="ds:flex ds:items-center ds:gap-4">
      <span className="ds:text-sm ds:font-medium">Disabled (Off):</span>
      <Switch checked={false} disabled />
    </div>
    <div className="ds:flex ds:items-center ds:gap-4">
      <span className="ds:text-sm ds:font-medium">Disabled (On):</span>
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
  const variants: SwitchProps["variant"][] = ["ds:default", "ds:square1", "ds:square2"];
  const sizes: SwitchProps["size"][] = ["xs", "sm", "normal", "lg", "xl"];

  return (
    <div className="ds:flex ds:flex-col ds:gap-8">
      <div>
        <h3 className="ds:mb-4 ds:text-lg ds:font-semibold">All Variants</h3>
        <div className="ds:flex ds:flex-wrap ds:gap-4">
          {variants.map((variant) => (
            <div key={variant} className="ds:flex ds:flex-col ds:items-center ds:gap-2">
              <Switch
                variant={variant}
                checked={states[`variant-${variant}`] || false}
                onCheckedChange={(v) => setState(`variant-${variant}`, v)}
              />
              <span className="ds:capitalize ds:text-xs ds:font-medium">{variant}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="ds:mb-4 ds:text-lg ds:font-semibold">All Sizes</h3>
        <div className="ds:flex ds:items-center ds:gap-4">
          {sizes.map((size) => (
            <div key={size} className="ds:flex ds:flex-col ds:items-center ds:gap-2">
              <Switch
                size={size}
                checked={states[`size-${size}`] || false}
                onCheckedChange={(v) => setState(`size-${size}`, v)}
              />
              <span className="ds:capitalize ds:text-xs ds:font-medium">{size}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="ds:mb-4 ds:text-lg ds:font-semibold">All Colors</h3>
        <div className="ds:flex ds:flex-wrap ds:gap-6">
          {colors.map((color) => (
            <div key={color} className="ds:flex ds:flex-col ds:items-center ds:gap-2">
              <Switch
                color={color}
                checked={states[`color-${color}`] || false}
                onCheckedChange={(v) => setState(`color-${color}`, v)}
              />
              <span className="ds:capitalize ds:text-xs ds:font-medium">{color}</span>
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
    <div className="ds:border-input ds:has-data-[state=checked]:border-primary/50 ds:relative ds:flex ds:w-full ds:items-start ds:gap-2 ds:rounded-md ds:border ds:p-4 ds:shadow-xs ds:outline-none">
      <div className="ds:flex ds:grow ds:items-center ds:gap-3">
        <img
          src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/github-icon.png?width=20&height=20&format=auto"
          alt="GitHub Icon"
          className="ds:size-5"
        />
        <label className="ds:grid ds:grow ds:gap-2" htmlFor={id}>
          <span>Connect with GitHub</span>
          <p id={`${id}-description`} className="ds:text-muted-foreground ds:text-xs">
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
