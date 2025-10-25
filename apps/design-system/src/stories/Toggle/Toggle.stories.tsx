import type { Meta } from "@storybook/react";
import { useState } from "react";

import Toggle, { type ToggleProps } from "./Toggle";

const meta: Meta<ToggleProps> = {
  title: "Base/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "The visual style variant of the toggle",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the toggle",
      table: {
        defaultValue: { summary: "default" },
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
      description: "The color theme of the toggle",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the toggle",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    className: { control: "text", description: "Additional CSS classes" },
    onPressedChange: { action: "pressed changed" },
    children: { control: "text", description: "Toggle label text" },
  },
  args: {
    children: "Toggle",
    variant: "default",
    color: "primary",
    size: "default",
  },
};

export default meta;

export const Default = (args: ToggleProps) => {
  const [pressed, setPressed] = useState(false);
  return <Toggle {...args} pressed={pressed} onPressedChange={setPressed} />;
};

export const Variants = (args: ToggleProps) => {
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  return (
    <div className="flex flex-row gap-4">
      <Toggle {...args} pressed={pressed1} onPressedChange={setPressed1} />
      <Toggle
        {...args}
        variant="outline"
        pressed={pressed2}
        onPressedChange={setPressed2}
      />
    </div>
  );
};

export const Sizes = (args: ToggleProps) => {
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  const [pressed3, setPressed3] = useState(false);
  return (
    <div className="flex flex-row gap-4 items-center">
      <Toggle
        {...args}
        size="sm"
        pressed={pressed1}
        onPressedChange={setPressed1}
      />
      <Toggle
        {...args}
        size="default"
        pressed={pressed2}
        onPressedChange={setPressed2}
      />
      <Toggle
        {...args}
        size="lg"
        pressed={pressed3}
        onPressedChange={setPressed3}
      />
    </div>
  );
};

export const Colors = (args: ToggleProps) => {
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  const [pressed3, setPressed3] = useState(false);
  const [pressed4, setPressed4] = useState(false);
  const [pressed5, setPressed5] = useState(false);
  const [pressed6, setPressed6] = useState(false);
  const [pressed7, setPressed7] = useState(false);
  return (
    <div className="flex flex-row gap-4">
      <Toggle
        {...args}
        color="primary"
        pressed={pressed1}
        onPressedChange={setPressed1}
      />
      <Toggle
        {...args}
        color="secondary"
        pressed={pressed2}
        onPressedChange={setPressed2}
      />
      <Toggle
        {...args}
        color="accent"
        pressed={pressed3}
        onPressedChange={setPressed3}
      />
      <Toggle
        {...args}
        color="destructive"
        pressed={pressed4}
        onPressedChange={setPressed4}
      />
      <Toggle
        {...args}
        color="success"
        pressed={pressed5}
        onPressedChange={setPressed5}
      />
      <Toggle
        {...args}
        color="error"
        pressed={pressed6}
        onPressedChange={setPressed6}
      />
      <Toggle
        {...args}
        color="warning"
        pressed={pressed7}
        onPressedChange={setPressed7}
      />
    </div>
  );
};

export const PressedState = (args: ToggleProps) => <Toggle {...args} pressed />;

export const DisabledState = (args: ToggleProps) => (
  <Toggle {...args} disabled />
);
