import type { Meta } from "@storybook/react";
import { useState } from "react";

import Checkbox, { type CheckboxProps } from "./Checkbox";
import { Angry, Heart, Star } from "lucide-react";

const meta: Meta<CheckboxProps> = {
  title: "Base/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Checkbox label text" },
    infoTooltip: {
      control: "text",
      description: "Info tooltip content displayed next to the label",
    },
    labelPosition: {
      control: "select",
      options: ["top", "left", "right", "bottom"],
      description: "Position of the label relative to the checkbox",
      table: {
        defaultValue: { summary: "top" },
      },
    },
    labelAlignment: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment of the label text",
      table: {
        defaultValue: { summary: "start" },
      },
    },
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
    checked: {
      control: "select",
      options: [false, true, "indeterminate"],
      description: "Checked state",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the checkbox",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the checkbox",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "The visual state of the checkbox",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    icon: {
      control: "object",
      description: "Custom icon for checked/indeterminate state",
    },
    className: { control: "text", description: "Additional CSS classes" },
    onCheckedChange: { action: "checked changed" },
    animation: {
      control: "select",
      options: ["confetti", undefined],
      description: "Animation effect when checkbox is checked",
    },
  },
  args: {
    variant: "default",
    size: "default",
  },
};

export default meta;

export const Default = (args: CheckboxProps) => {
  return <Checkbox {...args} />;
};

export const CheckedType = (args: CheckboxProps) => {
  return (
    <div className="flex flex-row gap-4">
      <Checkbox {...args} checked={false} label="Unchecked" />
      <Checkbox {...args} checked label="Checked" />
      <Checkbox {...args} checked="indeterminate" label="Indeterminate" />
    </div>
  );
};

export const Sizes = (args: CheckboxProps) => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <Checkbox {...args} size="sm" checked />
      <Checkbox {...args} size="default" checked />
      <Checkbox {...args} size="lg" checked />
    </div>
  );
};

export const Colors = (args: CheckboxProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        Default colors:
        <Checkbox {...args} color="primary" checked />
        <Checkbox {...args} color="secondary" checked />
        <Checkbox {...args} color="accent" checked />
        <Checkbox {...args} color="destructive" checked />
        <Checkbox {...args} color="success" checked />
        <Checkbox {...args} color="error" checked />
        <Checkbox {...args} color="warning" checked />
      </div>
      <div className="flex flex-row gap-4">
        Custom colors:
        <Checkbox
          {...args}
          checked
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-pink-400 hover:border-blue-200 hover:bg-pink-200"
        />
        <Checkbox
          {...args}
          checked
          className="data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500"
        />
        <Checkbox
          {...args}
          checked
          className="data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500"
        />
        <Checkbox
          {...args}
          checked
          className="data-[state=checked]:border-[#00d9b9] data-[state=checked]:bg-[#00d9b9] [&_svg]:text-red-500"
        />
        <Checkbox
          {...args}
          checked
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-transparent [&_svg]:text-purple-500"
        />
      </div>
    </div>
  );
};

export const CustomIcons = (args: CheckboxProps) => {
  return (
    <div className="flex flex-row gap-4">
      <Checkbox {...args} color="primary" icon={<Heart />} />
      <Checkbox {...args} color="success" icon={<Star />} />
      <Checkbox
        {...args}
        icon={
          <Angry className="stroke-1 size-8 group-data-[state=checked]:stroke-white group-data-[state=checked]:fill-red-500" />
        }
      />
      <Checkbox
        {...args}
        icon={
          <Star className="stroke-1 size-10 group-data-[state=checked]:stroke-fuchsia-500 group-data-[state=checked]:fill-fuchsia-500" />
        }
      />
    </div>
  );
};

export const SelectAllExample = (args: CheckboxProps) => {
  const [items, setItems] = useState([false, false, false]);
  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean);
  const masterChecked = allChecked
    ? true
    : someChecked
      ? "indeterminate"
      : false;

  const handleMasterChange = (checkedState: boolean | "indeterminate") => {
    const newValue = checkedState === true;
    setItems([newValue, newValue, newValue]);
  };

  const handleItemChange =
    (index: number) => (checkedState: boolean | "indeterminate") => {
      const newItems = [...items];
      newItems[index] = checkedState === true;
      setItems(newItems);
    };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          {...args}
          checked={masterChecked}
          onCheckedChange={handleMasterChange}
          label="Select All"
        />
      </div>
      <div className="ml-6 space-y-2">
        {items.map((checked, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              {...args}
              checked={checked}
              onCheckedChange={handleItemChange(index)}
              label={`Item ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const CustomLabel = (args: CheckboxProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        {...args}
        label={
          <span>
            I agree to the{" "}
            <a href="#" className="text-primary underline">
              Terms and Conditions
            </a>
          </span>
        }
        checked
      />

      <label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <Checkbox
          id="toggle-2"
          defaultChecked
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700 hover:border-blue-600 dark:hover:border-blue-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">
            Enable notifications
          </p>
          <p className="text-muted-foreground text-sm">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </label>
    </div>
  );
};
