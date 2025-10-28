import type { Meta } from "@storybook/react";
import { useState } from "react";

import Radio, { type RadioProps } from "./Radio";
import { Angry, Annoyed } from "lucide-react";
import Badge from "../Badge/Badge";

const meta: Meta<RadioProps> = {
  title: "Base/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Group label text" },
    helperText: {
      control: "text",
      description: "Helper text displayed below the radio group",
    },
    variant: {
      control: "select",
      options: ["option", "button-group"],
      description: "The visual style variant of the radio group",
      table: {
        defaultValue: { summary: "option" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the radio items",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    color: {
      control: "select",
      options: [
        "",
        "primary",
        "secondary",
        "accent",
        "destructive",
        "muted",
        "success",
        "error",
        "warning",
      ],
      description: "The color theme of the radio items",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    options: {
      control: "object",
      description: "Array of options for auto-generating radio items",
    },
    value: {
      control: "text",
      description: "The selected value",
    },
    onValueChange: { action: "value changed" },
    className: { control: "text", description: "Additional CSS classes" },
    disabled: {
      control: "boolean",
      description: "Disable the entire radio group",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    variant: "option",
    size: "default",
    color: "primary",
  },
};

export default meta;

export const Default = (args: RadioProps) => {
  return (
    <Radio
      {...args}
      options={[
        { label: "Option 1", value: "option1" },
        { label: "Option disabled", value: "option2", disabled: true },
        { label: "Option 3", value: "option3" },
      ]}
    />
  );
};

export const Sizes = (args: RadioProps) => {
  const option = [
    { label: "Small", value: "sm" },
    { label: "Default", value: "default" },
    { label: "Large", value: "lg" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Radio {...args} size="sm" options={option} className="flex gap-2" />
      <Radio {...args} size="default" options={option} className="flex gap-2" />
      <Radio {...args} size="lg" options={option} className="flex gap-2" />
    </div>
  );
};

export const Colors = (args: RadioProps) => {
  const option = [
    { label: "Primary", value: "primary" },
    { label: "Secondary", value: "secondary" },
    { label: "Accent", value: "accent" },
    { label: "Destructive", value: "destructive" },
    { label: "Success", value: "success" },
    { label: "Error", value: "error" },
    { label: "Warning", value: "warning" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <Radio.Group {...args} className="flex gap-2">
        {option.map((opt) => (
          <Radio.Item
            key={opt.value}
            value={opt.value}
            label={opt.label}
            color={opt.value as RadioProps["color"]}
          />
        ))}
      </Radio.Group>

      <Radio.Group {...args} className="flex gap-2">
        <Radio.Item
          value="option1"
          label="Purple"
          className="border-purple-500 text-purple-500"
        />
        <Radio.Item
          value="option2"
          label="Yellow"
          className="border-yellow-500 text-yellow-500"
        />
        <Radio.Item
          value="option3"
          label="Green"
          className="border-green-500 bg-green-500 text-white"
        />
        <Radio.Item
          value="option4"
          label="Pink"
          className="border-pink-500 bg-pink-500 text-white"
        />
        <Radio.Item
          value="option5"
          label="Blue"
          className="hover:border-blue-500 text-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
        />
        <Radio.Item
          value="option6"
          label="Lime"
          className="border-lime-400 text-white data-[state=checked]:border-lime-400 data-[state=checked]:bg-lime-400"
        />
        <Radio.Item
          value="option7"
          label="Square"
          className="rounded-none border-red-400 text-white data-[state=checked]:border-red-400 data-[state=checked]:bg-red-400"
        />
        <Radio.Item
          value="option8"
          label="Square"
          className="rounded-none border-teal-300 text-white data-[state=checked]:border-teal-300 data-[state=checked]:bg-teal-300"
        />
      </Radio.Group>
    </div>
  );
};

export const WithLabelAndHelper = (args: RadioProps) => {
  const [value, setValue] = useState("option1");
  return (
    <Radio
      {...args}
      label="Choose an option"
      helperText="This is a helper text"
      value={value}
      onValueChange={setValue}
      className="flex flex-row gap-4"
      options={[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ]}
    />
  );
};

export const DisabledGroup = (args: RadioProps) => {
  const [value, setValue] = useState("option1");
  return (
    <Radio
      {...args}
      disabled
      value={value}
      onValueChange={setValue}
      options={[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ]}
    />
  );
};

export const CustomGroupStyles = (args: RadioProps) => {
  const items = [
    { value: "1", label: "Pro", price: "$39/mo" },
    { value: "2", label: "Team", price: "$69/mo" },
    { value: "3", label: "Enterprise", price: "Custom" },
  ];

  return (
    <Radio.Group
      className="w-full max-w-96 min-w-80 gap-0 -space-y-px rounded-md shadow-xs"
      defaultValue="2"
    >
      {items.map((item, idx) => (
        <div
          key={`${idx}-${item.value}`}
          className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex flex-col gap-4 border p-4 outline-none first:rounded-t-md last:rounded-b-md has-data-[state=checked]:z-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio.Item
                id={`${idx}-${item.value}`}
                value={item.value}
                className="after:absolute after:inset-0"
                color="primary"
              />
              <label
                className="inline-flex items-center"
                htmlFor={`${idx}-${item.value}`}
              >
                {item.label}
                {item.value === "2" && (
                  <Badge className="px-1.5 py-px text-xs ml-2">
                    Best Seller
                  </Badge>
                )}
              </label>
            </div>
            <div
              id={`${`${idx}-${item.value}`}-price`}
              className="text-muted-foreground text-xs leading-[inherit]"
            >
              {item.price}
            </div>
          </div>
        </div>
      ))}
    </Radio.Group>
  );
};

export const CustomGroupStyles2 = (args: RadioProps) => {
  const items = [
    { value: "1", label: "Angry", icon: "😡" },
    { value: "2", label: "Annoyed", icon: "😠", disabled: true },
    { value: "3", label: "Sad", icon: "😢" },
    { value: "4", label: "Happy", icon: "😄" },
    { value: "5", label: "Surprised", icon: "😲", disabled: true },
    { value: "6", label: "Confused", icon: "😕" },
  ];

  return (
    <fieldset className="w-full space-y-4">
      <legend className="text-foreground text-sm leading-none font-medium">
        Select your mood
      </legend>
      <Radio.Group className="grid grid-cols-6 gap-2" defaultValue="1">
        {items.map((item, idx) => (
          <label
            key={`${idx}-${item.value}`}
            className="border-input has-data-[state=checked]:border-secondary/80 has-data-[state=checked]:bg-secondary/20 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-2 rounded-md border px-2 py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50"
          >
            <Radio.Item
              id={`${idx}-${item.value}`}
              value={item.value}
              rootClassName="sr-only after:absolute after:inset-0"
              aria-label={`size-radio-${item.value}`}
              disabled={item?.disabled}
              color="secondary"
            />
            <span className="text-2xl">{item.icon}</span>
            <p className="text-foreground text-sm leading-none font-medium">
              {item.label}
            </p>
          </label>
        ))}
      </Radio.Group>
    </fieldset>
  );
};

export const CustomChildren = () => {
  const [value, setValue] = useState("option1");
  return (
    <div className="flex items-center space-x-2">
      <Radio.Group value={value} onValueChange={setValue}>
        <div className="flex items-center space-x-2">
          <Radio.Item value="option1" id="option1" />
          <label htmlFor="option1" className="flex flex-col items-center gap-2">
            <Angry />
            Option 1
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Radio.Item value="option2" id="option2" />
          <label htmlFor="option2" className="flex flex-col items-center gap-2">
            <Annoyed />
            Option 2
          </label>
        </div>
      </Radio.Group>
    </div>
  );
};
