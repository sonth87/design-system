import type { Meta } from "@storybook/react";
import { useState } from "react";

import Checkbox, { type CheckboxProps } from "../components/Checkbox/Checkbox";
import { Angry, Heart, Star } from "lucide-react";
import i18n from "../../.storybook/i18n";

const meta: Meta<CheckboxProps> = {
  title: "Form Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: i18n.t("stories.checkbox.argTypes.label.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    infoTooltip: {
      control: "text",
      description: i18n.t("stories.checkbox.argTypes.infoTooltip.description"),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    labelPosition: {
      control: "select",
      options: ["top", "left", "right", "bottom"],
      description: i18n.t(
        "stories.checkbox.argTypes.labelPosition.description"
      ),
      table: {
        defaultValue: { summary: "top" },
        category: i18n.t("stories.category.layout"),
      },
    },
    labelAlignment: {
      control: "select",
      options: ["start", "center", "end"],
      description: i18n.t(
        "stories.checkbox.argTypes.labelAlignment.description"
      ),
      table: {
        defaultValue: { summary: "start" },
        category: i18n.t("stories.category.layout"),
      },
    },
    variant: {
      control: "select",
      options: ["default", "circle"],
      description: i18n.t("stories.checkbox.argTypes.variant.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: i18n.t("stories.checkbox.argTypes.size.description"),
      table: {
        defaultValue: { summary: "default" },
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
      description: i18n.t("stories.checkbox.argTypes.color.description"),
      table: {
        defaultValue: { summary: "primary" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    checked: {
      control: "select",
      options: [false, true, "indeterminate"],
      description: i18n.t("stories.checkbox.argTypes.checked.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    disabled: {
      control: "boolean",
      description: i18n.t("stories.checkbox.argTypes.disabled.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    helperText: {
      control: "text",
      description: i18n.t("stories.checkbox.argTypes.helperText.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: i18n.t("stories.checkbox.argTypes.state.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.validation"),
      },
    },
    icon: {
      control: "object",
      description: i18n.t("stories.checkbox.argTypes.icon.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.checkbox.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    onCheckedChange: {
      action: "checked changed",
      description: i18n.t("stories.checkbox.argTypes.onCheckedChange.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    animation: {
      control: "select",
      options: ["confetti", undefined],
      description: i18n.t("stories.checkbox.argTypes.animation.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
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

export const WithLabel = (args: CheckboxProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox {...args} label="Checkbox Label" />
      <Checkbox
        {...args}
        label="This is a longer checkbox label to demonstrate text wrapping."
      />
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
