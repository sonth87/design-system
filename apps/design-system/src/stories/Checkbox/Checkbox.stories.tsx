import type { Meta } from "@storybook/react";
import { useState } from "react";

import Checkbox, { type CheckboxProps } from "./Checkbox";

const meta: Meta<CheckboxProps> = {
  title: "Base/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "The visual style variant of the checkbox",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the checkbox",
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
      description: "The color theme of the checkbox",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the checkbox",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    className: { control: "text", description: "Additional CSS classes" },
    onCheckedChange: { action: "checked changed" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    variant: "default",
    color: "primary",
    size: "default",
  },
};

export default meta;

export const Default = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  const handleCheckedChange = (checkedState: boolean | "indeterminate") => {
    setChecked(checkedState === true);
  };
  return <Checkbox {...args} checked={checked} onCheckedChange={handleCheckedChange} />;
};

export const Variants = (args: CheckboxProps) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const handleCheckedChange1 = (checkedState: boolean | "indeterminate") => {
    setChecked1(checkedState === true);
  };
  const handleCheckedChange2 = (checkedState: boolean | "indeterminate") => {
    setChecked2(checkedState === true);
  };
  return (
    <div className="flex flex-row gap-4">
      <Checkbox {...args} checked={checked1} onCheckedChange={handleCheckedChange1} />
      <Checkbox
        {...args}
        variant="outline"
        checked={checked2}
        onCheckedChange={handleCheckedChange2}
      />
    </div>
  );
};

export const Sizes = (args: CheckboxProps) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const handleCheckedChange1 = (checkedState: boolean | "indeterminate") => {
    setChecked1(checkedState === true);
  };
  const handleCheckedChange2 = (checkedState: boolean | "indeterminate") => {
    setChecked2(checkedState === true);
  };
  const handleCheckedChange3 = (checkedState: boolean | "indeterminate") => {
    setChecked3(checkedState === true);
  };
  return (
    <div className="flex flex-row gap-4 items-center">
      <Checkbox
        {...args}
        size="sm"
        checked={checked1}
        onCheckedChange={handleCheckedChange1}
      />
      <Checkbox
        {...args}
        size="default"
        checked={checked2}
        onCheckedChange={handleCheckedChange2}
      />
      <Checkbox
        {...args}
        size="lg"
        checked={checked3}
        onCheckedChange={handleCheckedChange3}
      />
    </div>
  );
};

export const Colors = (args: CheckboxProps) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const handleCheckedChange1 = (checkedState: boolean | "indeterminate") => {
    setChecked1(checkedState === true);
  };
  const handleCheckedChange2 = (checkedState: boolean | "indeterminate") => {
    setChecked2(checkedState === true);
  };
  const handleCheckedChange3 = (checkedState: boolean | "indeterminate") => {
    setChecked3(checkedState === true);
  };
  const handleCheckedChange4 = (checkedState: boolean | "indeterminate") => {
    setChecked4(checkedState === true);
  };
  const handleCheckedChange5 = (checkedState: boolean | "indeterminate") => {
    setChecked5(checkedState === true);
  };
  const handleCheckedChange6 = (checkedState: boolean | "indeterminate") => {
    setChecked6(checkedState === true);
  };
  const handleCheckedChange7 = (checkedState: boolean | "indeterminate") => {
    setChecked7(checkedState === true);
  };
  return (
    <div className="flex flex-row gap-4">
      <Checkbox
        {...args}
        color="primary"
        checked={checked1}
        onCheckedChange={handleCheckedChange1}
      />
      <Checkbox
        {...args}
        color="secondary"
        checked={checked2}
        onCheckedChange={handleCheckedChange2}
      />
      <Checkbox
        {...args}
        color="accent"
        checked={checked3}
        onCheckedChange={handleCheckedChange3}
      />
      <Checkbox
        {...args}
        color="destructive"
        checked={checked4}
        onCheckedChange={handleCheckedChange4}
      />
      <Checkbox
        {...args}
        color="success"
        checked={checked5}
        onCheckedChange={handleCheckedChange5}
      />
      <Checkbox
        {...args}
        color="error"
        checked={checked6}
        onCheckedChange={handleCheckedChange6}
      />
      <Checkbox
        {...args}
        color="warning"
        checked={checked7}
        onCheckedChange={handleCheckedChange7}
      />
    </div>
  );
};

export const CheckedState = (args: CheckboxProps) => (
  <Checkbox {...args} checked />
);

export const DisabledState = (args: CheckboxProps) => (
  <Checkbox {...args} disabled />
);
