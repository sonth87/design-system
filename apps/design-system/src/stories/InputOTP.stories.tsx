import type { Meta, StoryObj } from "@storybook/react";
import InputOTP from "../components/InputOTP/InputOTP";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof InputOTP> = {
  title: "Form Components/InputOTP",
  component: InputOTP,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: i18n.t("stories.inputotp.argTypes.label.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    length: {
      control: { type: "number" },
      defaultValue: 4,
      description: i18n.t("stories.inputotp.argTypes.length.description"),
      table: {
        category: i18n.t("stories.category.basic"),
      },
    },
    inputType: {
      control: { type: "select" },
      options: ["digits", "chars", "digits-and-chars"],
      defaultValue: "digits",
      description: i18n.t("stories.inputotp.argTypes.inputType.description"),
      table: {
        category: i18n.t("stories.category.validation"),
      },
    },
    regexPattern: {
      control: { type: "text" },
      description: i18n.t("stories.inputotp.argTypes.regexPattern.description"),
      table: {
        category: i18n.t("stories.category.validation"),
      },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "normal", "lg", "xl"],
      defaultValue: "normal",
      description: i18n.t("stories.inputotp.argTypes.size.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    gapSize: {
      control: { type: "number" },
      description: i18n.t("stories.inputotp.argTypes.gapSize.description"),
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    state: {
      control: { type: "select" },
      options: ["default", "success", "error", "warning"],
      defaultValue: "default",
      description: i18n.t("stories.inputotp.argTypes.state.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    variant: {
      control: { type: "select" },
      options: ["outlined", "underlined"],
      defaultValue: "outlined",
      description: i18n.t("stories.inputotp.argTypes.variant.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    helperText: {
      control: { type: "text" },
      description: i18n.t("stories.inputotp.argTypes.helperText.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
  args: {
    label: "Enter OTP Code",
    length: 4,
    variant: "outlined",
    inputType: "digits",
  },
};

export const LengthAndGap: Story = {
  args: {
    label: "Enter Serial Code",
    length: 10,
    variant: "outlined",
    inputType: "digits-and-chars",
    gapSize: 16,
  },
};

export const Underlined: Story = {
  args: {
    length: 6,
    variant: "underlined",
    inputType: "digits-and-chars",
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <InputOTP size="xs" />
      <InputOTP size="sm" />
      <InputOTP size="normal" />
      <InputOTP size="lg" />
      <InputOTP size="xl" />
    </div>
  ),
};

export const CustomColorVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <InputOTP size="normal" childClassName="border-red-500 text-red-500" />
      <InputOTP
        size="normal"
        childClassName="border-purple-500 text-purple-500"
      />
      <InputOTP size="normal" childClassName="border-blue-500 text-blue-500" />
      <InputOTP
        size="normal"
        childClassName="border-green-500 text-green-500"
      />
      <InputOTP
        size="normal"
        className="[&>div:first-child]:border-red-500 [&>div:nth-child(2)]:border-green-500  [&>div:nth-child(3)]:border-blue-500 [&>div:nth-child(4)]:border-yellow-500 [&>div:nth-child(5)]:border-purple-500"
      />
      <InputOTP
        size="normal"
        className="[&>div]:border-none text-white [&>div:first-child]:bg-red-500 [&>div:nth-child(2)]:bg-green-500  [&>div:nth-child(3)]:bg-blue-500 [&>div:nth-child(4)]:bg-yellow-500 [&>div:nth-child(5)]:bg-purple-500"
      />
    </div>
  ),
};

export const CustomPattern: Story = {
  args: {
    length: 5,
    regexPattern: "^[A-Z]+$",
    inputType: "chars",
    helperText: "Only uppercase letters are allowed.",
  },
};
