import type { Meta } from "@storybook/react";
import { useState } from "react";

import Radio, { type RadioProps } from "./Radio";
import { RadioGroup } from "@dsui/ui/components/radio-group";

const meta: Meta<RadioProps> = {
  title: "Base/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "The visual style variant of the radio",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the radio",
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
      description: "The color theme of the radio",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the radio",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    value: {
      control: "text",
      description: "The value of the radio",
    },
    className: { control: "text", description: "Additional CSS classes" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    value: "option1",
    variant: "default",
    color: "primary",
    size: "default",
  },
};

export default meta;

export const Default = (args: RadioProps) => {
  const [value, setValue] = useState("option1");
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <Radio {...args} />
    </RadioGroup>
  );
};

export const Variants = (args: RadioProps) => {
  const [value, setValue] = useState("option1");
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex flex-row gap-4">
        <Radio {...args} value="option1" />
        <Radio {...args} variant="outline" value="option2" />
      </div>
    </RadioGroup>
  );
};

export const Sizes = (args: RadioProps) => {
  const [value, setValue] = useState("option1");
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex flex-row gap-4 items-center">
        <Radio {...args} size="sm" value="option1" />
        <Radio {...args} size="default" value="option2" />
        <Radio {...args} size="lg" value="option3" />
      </div>
    </RadioGroup>
  );
};

export const Colors = (args: RadioProps) => {
  const [value, setValue] = useState("option1");
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex flex-row gap-4">
        <Radio {...args} color="primary" value="primary" />
        <Radio {...args} color="secondary" value="secondary" />
        <Radio {...args} color="accent" value="accent" />
        <Radio {...args} color="destructive" value="destructive" />
        <Radio {...args} color="success" value="success" />
        <Radio {...args} color="error" value="error" />
        <Radio {...args} color="warning" value="warning" />
      </div>
    </RadioGroup>
  );
};

export const GroupExample = (args: RadioProps) => {
  const [value, setValue] = useState("option1");
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center space-x-2">
          <Radio {...args} value="option1" />
          <label htmlFor="option1">Option 1</label>
        </div>
        <div className="flex items-center space-x-2">
          <Radio {...args} value="option2" />
          <label htmlFor="option2">Option 2</label>
        </div>
        <div className="flex items-center space-x-2">
          <Radio {...args} value="option3" />
          <label htmlFor="option3">Option 3</label>
        </div>
      </div>
    </RadioGroup>
  );
};

export const DisabledState = (args: RadioProps) => {
  const [value, setValue] = useState("option1");
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <Radio {...args} disabled />
    </RadioGroup>
  );
};
