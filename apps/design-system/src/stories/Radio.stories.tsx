import type { Meta } from "@storybook/react";
import { useState } from "react";

import Radio, { type RadioProps } from "../components/Radio/Radio";
import { Angry, Annoyed } from "lucide-react";
import Badge from "../components/Badge/Badge";
import i18n from "../../.storybook/i18n";

const meta: Meta<RadioProps> = {
  title: "Form Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: i18n.t("stories.radio.argTypes.label.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    helperText: {
      control: "text",
      description: i18n.t("stories.radio.argTypes.helperText.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    variant: {
      control: "select",
      options: ["option", "button-group"],
      description: i18n.t("stories.radio.argTypes.variant.description"),
      table: {
        defaultValue: { summary: "option" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: i18n.t("stories.radio.argTypes.size.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.appearance"),
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
      description: i18n.t("stories.radio.argTypes.color.description"),
      table: {
        defaultValue: { summary: "primary" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    options: {
      control: "object",
      description: i18n.t("stories.radio.argTypes.options.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    value: {
      control: "text",
      description: i18n.t("stories.radio.argTypes.value.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    onValueChange: { action: "value changed" },
    className: {
      control: "text",
      description: i18n.t("stories.radio.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    disabled: {
      control: "boolean",
      description: i18n.t("stories.radio.argTypes.disabled.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
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
    <div className="ds:flex ds:flex-col ds:gap-4">
      <Radio {...args} size="sm" options={option} className="ds:flex ds:gap-2" />
      <Radio {...args} size="default" options={option} className="ds:flex ds:gap-2" />
      <Radio {...args} size="lg" options={option} className="ds:flex ds:gap-2" />
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
    <div className="ds:flex ds:flex-col ds:gap-4">
      <Radio.Group {...args} className="ds:flex ds:gap-2">
        {option.map((opt) => (
          <Radio.Item
            key={opt.value}
            value={opt.value}
            label={opt.label}
            color={opt.value as RadioProps["color"]}
          />
        ))}
      </Radio.Group>

      <Radio.Group {...args} className="ds:flex ds:gap-2">
        <Radio.Item
          value="option1"
          label="Purple"
          className="ds:border-purple-500 ds:text-purple-500"
        />
        <Radio.Item
          value="option2"
          label="Yellow"
          className="ds:border-yellow-500 ds:text-yellow-500"
        />
        <Radio.Item
          value="option3"
          label="Green"
          className="ds:border-green-500 ds:bg-green-500 ds:text-white"
        />
        <Radio.Item
          value="option4"
          label="Pink"
          className="ds:border-pink-500 ds:bg-pink-500 ds:text-white"
        />
        <Radio.Item
          value="option5"
          label="Blue"
          className="ds:hover:border-blue-500 ds:text-white data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
        />
        <Radio.Item
          value="option6"
          label="Lime"
          className="ds:border-lime-400 ds:text-white data-[state=checked]:border-lime-400 data-[state=checked]:bg-lime-400"
        />
        <Radio.Item
          value="option7"
          label="Square"
          className="ds:rounded-none ds:border-red-400 ds:text-white data-[state=checked]:border-red-400 data-[state=checked]:bg-red-400"
        />
        <Radio.Item
          value="option8"
          label="Square"
          className="ds:rounded-none ds:border-teal-300 ds:text-white data-[state=checked]:border-teal-300 data-[state=checked]:bg-teal-300"
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
      className="ds:flex ds:flex-row ds:gap-4"
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

export const CustomGroupStyles = () => {
  const items = [
    { value: "1", label: "Pro", price: "$39/mo" },
    { value: "2", label: "Team", price: "$69/mo" },
    { value: "3", label: "Enterprise", price: "Custom" },
  ];

  return (
    <Radio.Group
      className="ds:w-full ds:max-w-96 ds:min-w-80 ds:gap-0 -space-y-px ds:rounded-md ds:shadow-xs"
      defaultValue="2"
    >
      {items.map((item, idx) => (
        <div
          key={`${idx}-${item.value}`}
          className="ds:border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent ds:relative ds:flex ds:flex-col ds:gap-4 ds:border ds:p-4 ds:outline-none ds:first:rounded-t-md ds:last:rounded-b-md has-data-[state=checked]:z-10"
        >
          <div className="ds:flex ds:items-center ds:justify-between">
            <div className="ds:flex ds:items-center ds:gap-2">
              <Radio.Item
                id={`${idx}-${item.value}`}
                value={item.value}
                className="ds:after:absolute ds:after:inset-0"
                color="primary"
              />
              <label
                className="ds:inline-flex ds:items-center"
                htmlFor={`${idx}-${item.value}`}
              >
                {item.label}
                {item.value === "2" && (
                  <Badge className="ds:px-1.5 ds:py-px ds:text-xs ds:ml-2">
                    Best Seller
                  </Badge>
                )}
              </label>
            </div>
            <div
              id={`${`${idx}-${item.value}`}-price`}
              className="ds:text-muted-foreground ds:text-xs leading-[inherit]"
            >
              {item.price}
            </div>
          </div>
        </div>
      ))}
    </Radio.Group>
  );
};

export const CustomGroupStyles2 = () => {
  const items = [
    { value: "1", label: "Angry", icon: "😡" },
    { value: "2", label: "Annoyed", icon: "😠", disabled: true },
    { value: "3", label: "Sad", icon: "😢" },
    { value: "4", label: "Happy", icon: "😄" },
    { value: "5", label: "Surprised", icon: "😲", disabled: true },
    { value: "6", label: "Confused", icon: "😕" },
  ];

  return (
    <fieldset className="ds:w-full ds:space-y-4">
      <legend className="ds:text-foreground ds:text-sm ds:leading-none ds:font-medium">
        Select your mood
      </legend>
      <Radio.Group className="ds:grid ds:grid-cols-6 ds:gap-2" defaultValue="1">
        {items.map((item, idx) => (
          <label
            key={`${idx}-${item.value}`}
            className="ds:border-input has-data-[state=checked]:border-secondary/80 has-data-[state=checked]:bg-secondary/20 ds:has-focus-visible:border-ring ds:has-focus-visible:ring-ring/50 ds:relative ds:flex ds:flex-col ds:items-center ds:gap-2 ds:rounded-md ds:border ds:px-2 ds:py-3 ds:text-center ds:shadow-xs transition-[color,box-shadow] ds:outline-none has-focus-visible:ring-[3px] ds:has-data-disabled:cursor-not-allowed ds:has-data-disabled:opacity-50"
          >
            <Radio.Item
              id={`${idx}-${item.value}`}
              value={item.value}
              rootClassName="sr-only after:absolute after:inset-0"
              aria-label={`size-radio-${item.value}`}
              disabled={item?.disabled}
              color="secondary"
            />
            <span className="ds:text-2xl">{item.icon}</span>
            <p className="ds:text-foreground ds:text-sm ds:leading-none ds:font-medium">
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
    <div className="ds:flex ds:items-center ds:space-x-2">
      <Radio.Group value={value} onValueChange={setValue}>
        <div className="ds:flex ds:items-center ds:space-x-2">
          <Radio.Item value="option1" id="option1" />
          <label htmlFor="option1" className="ds:flex ds:flex-col ds:items-center ds:gap-2">
            <Angry />
            Option 1
          </label>
        </div>
        <div className="ds:flex ds:items-center ds:space-x-2">
          <Radio.Item value="option2" id="option2" />
          <label htmlFor="option2" className="ds:flex ds:flex-col ds:items-center ds:gap-2">
            <Annoyed />
            Option 2
          </label>
        </div>
      </Radio.Group>
    </div>
  );
};
