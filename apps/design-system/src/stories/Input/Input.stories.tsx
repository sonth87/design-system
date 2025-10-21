import type { Meta } from "@storybook/react";

import Input, { type InputProps } from "./Input";
import { Mail, Search, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<InputProps> = {
  title: "Base/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      description: "The type of the input",
      table: {
        defaultValue: { summary: "text" },
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    size: {
      control: "select",
      options: ["normal", "sm", "xs", "lg", "xl"],
      description: "The size of the input",
      table: {
        defaultValue: { summary: "normal" },
      },
    },
    isFloatLabel: {
      control: "boolean",
      description: "Enable floating label behavior",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    label: {
      control: "text",
      description: "Label for the input",
    },
    state: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: "Type of helper text (default, success, warning, error)",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    helperText: {
      control: "text",
      description: "Helper text to display below the input",
    },
    mask: {
      control: "text",
      description: "Input mask pattern. E.g., 'datetime', '+1 (999) 999-9999'",
    },
    maskOptions: {
      control: "object",
      description: "Options for input masking",
    },
    className: { control: "text", description: "Additional CSS classes" },
  },
  // Use `fn` to spy on the onChange arg, which will appear in the actions panel once invoked
  args: {
    type: "text",
    label: "Label",
    placeholder: "Enter text...",
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = (args: InputProps) => <Input {...args} />;

export const WithLabel = (args: InputProps) => (
  <div className="flex flex-col gap-4 w-80">
    <Input
      {...args}
      label="Label normal"
      type="email"
      value="email@example.com"
      placeholder="Enter your email"
    />
    <Input
      {...args}
      isFloatLabel
      size="lg"
      label="Label with Large size"
      type="email"
      value="email@example.com"
      placeholder="Enter your email"
    />
    <Input
      {...args}
      isFloatLabel
      label="Label with Extra Large size"
      type="email"
      value="email@example.com"
      placeholder="Enter your email"
    />
  </div>
);

export const WithHelperText = (args: InputProps) => (
  <div className="w-80">
    <Input
      {...args}
      label="Username"
      placeholder="Enter your username"
      helperText="Choose a unique username for your account"
    />
  </div>
);

export const WithMask = (args: InputProps) => (
  <div className="flex flex-col gap-4 w-80">
    <Input
      {...args}
      mask="datetime"
      label="Date Time"
      maskOptions={{
        placeholder: "_",
        inputFormat: "HH:MM:ss",
        outputFormat: "HH:MM:ss",
        showMaskOnHover: false,
      }}
    />
    <Input
      mask="+1 (999) 999-9999"
      maskOptions={{
        placeholder: "_",
      }}
      size="xl"
      isFloatLabel
      label="Phone Number"
    />
  </div>
);

export const WithError = (args: InputProps) => (
  <div className="w-80">
    <Input
      {...args}
      label="Email"
      type="email"
      placeholder="Enter your email"
      helperText="Please enter a valid email address"
      state="error"
      defaultValue="invalid-email"
    />
  </div>
);

export const HelperTextStates = () => (
  <div className="flex flex-col gap-4 w-80">
    <Input
      label="Default Helper"
      placeholder="Enter text"
      helperText="This is a default helper text"
      state="default"
    />
    <Input
      label="Success"
      placeholder="Enter text"
      helperText="Input is valid and accepted"
      state="success"
      defaultValue="valid@email.com"
    />
    <Input
      label="Warning"
      placeholder="Enter text"
      helperText="This might cause issues, please review"
      state="warning"
      defaultValue="admin"
    />
    <Input
      label="Error"
      placeholder="Enter text"
      helperText="This field is required"
      state="error"
    />
  </div>
);

export const Disabled = (args: InputProps) => (
  <div className="w-80">
    <Input
      {...args}
      label="Disabled Input"
      placeholder="This input is disabled"
      disabled
      defaultValue="Disabled value"
    />
  </div>
);

export const Types = () => (
  <div className="flex flex-col gap-4 w-80">
    <Input label="Text" type="text" placeholder="Enter text" />
    <Input label="Email" type="email" placeholder="Enter email" />
    <Input label="Password" type="password" placeholder="Enter password" />
    <Input label="Number" type="number" placeholder="Enter number" />
    <Input label="Search" type="search" placeholder="Search..." />
    <Input label="Tel" type="tel" placeholder="Enter phone number" />
    <Input label="URL" type="url" placeholder="Enter URL" />
  </div>
);

export const WithIcons = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-80">
      <div className="relative">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          className="pl-10"
        />
        <Mail className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
      </div>

      <div className="relative">
        <Input
          label="Search"
          type="search"
          placeholder="Search..."
          className="pl-10"
        />
        <Search className="absolute left-3 top-[34px] h-4 w-4 text-muted-foreground" />
      </div>

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[34px] text-muted-foreground hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export const Sizes = () => (
  <div className="flex flex-col gap-4 w-80">
    <Input label="Extra Small" placeholder="XS input" size="xs" />
    <Input label="Small" placeholder="Small input" size="sm" />
    <Input label="Default" placeholder="Default input" size="normal" />
    <Input label="Large" placeholder="Large input" size="lg" />
    <Input label="Extra Large" placeholder="XL input" size="xl" />
  </div>
);

export const FileUpload = () => (
  <div className="w-80">
    <Input label="Upload File" type="file" />
  </div>
);

export const FloatLabel = () => (
  <div className="flex flex-col gap-4 w-80">
    <Input label="Email Address" type="email" isFloatLabel />
    <Input label="Full Name" type="text" isFloatLabel defaultValue="John Doe" />
    <Input
      label="Phone Number"
      type="tel"
      isFloatLabel
      helperText="Enter your phone number with country code"
    />
    <Input
      label="Password"
      type="password"
      isFloatLabel
      state="error"
      helperText="Password must be at least 8 characters"
    />
  </div>
);
