import type { Meta } from "@storybook/react";

import Input, { type InputProps } from "../components/Input/Input";
import { Mail, Search, Eye } from "lucide-react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<InputProps> = {
  title: "Form Components/Input",
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
    infoTooltip: {
      control: "text",
      description: "Tooltip info icon next to the label",
    },
    mask: {
      control: "text",
      description:
        "Input mask pattern. E.g., 'currency', 'url', 'ip', '+1 (999) 999-9999'... For more info: <a href='https://www.npmjs.com/package/use-mask-input'>use-mask-input</a>",
    },
    maskOptions: {
      control: "object",
      description: "Options for input masking",
    },
    maxLength: {
      control: "number",
      description: "Maximum number of characters allowed",
    },
    showCharCount: {
      control: "boolean",
      description: "Show character count below the input",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    clearable: {
      control: "boolean",
      description: "Show clear button when input has value",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onClear: {
      action: "cleared",
      description: "Callback function when clear button is clicked",
    },
    prefixIcon: {
      control: false,
      description: "Icon to display at the start of the input",
    },
    suffixIcon: {
      control: false,
      description: "Icon to display at the end of the input",
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

export const WithMaxLengthAndCharCount = (args: InputProps) => (
  <div className="w-80">
    <Input
      {...args}
      label="Full Name"
      placeholder="Enter your name..."
      maxLength={50}
      showCharCount
      helperText="Max 50 characters"
    />
  </div>
);

export const WithInfo = (args: InputProps) => (
  <div className="w-80 flex flex-col gap-4">
    <Input
      {...args}
      label="Email"
      type="email"
      infoTooltip="We'll never share your email with anyone else."
    />
    <Input
      {...args}
      label="Email"
      type="email"
      isFloatLabel
      infoTooltip="We'll never share your email with anyone else."
      placeholder=""
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
  return (
    <div className="flex flex-col gap-4 w-80">
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        isFloatLabel
        prefixIcon={<Mail />}
      />

      <Input
        label="Search"
        type="search"
        placeholder="Search..."
        prefixIcon={<Search />}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        prefixIcon={<Eye />}
      />

      <Input
        label="Email with suffix"
        type="email"
        placeholder="Enter your email"
        suffixIcon={<Mail />}
      />

      <Input
        label="Both prefix and suffix"
        type="text"
        placeholder="Enter text..."
        prefixIcon={<Search />}
        suffixIcon={<Mail />}
      />
    </div>
  );
};

export const IconsWithSizes = () => (
  <div className="flex flex-col gap-4 w-80">
    <Input
      label="Extra Small with icon"
      placeholder="XS input"
      size="xs"
      prefixIcon={<Search />}
    />
    <Input
      label="Small with icon"
      placeholder="Small input"
      size="sm"
      prefixIcon={<Search />}
    />
    <Input
      label="Default with icon"
      placeholder="Default input"
      size="normal"
      prefixIcon={<Search />}
    />
    <Input
      label="Large with icon"
      placeholder="Large input"
      size="lg"
      prefixIcon={<Search />}
    />
    <Input
      label="Extra Large with icon"
      placeholder="XL input"
      size="xl"
      prefixIcon={<Search />}
    />
  </div>
);

export const IconsWithBuiltInFeatures = () => (
  <div className="flex flex-col gap-4 w-80">
    <Input
      label="Email with prefix icon and clearable"
      type="email"
      placeholder="Enter your email"
      prefixIcon={<Mail />}
      clearable
      defaultValue="example@email.com"
      helperText="Prefix icon + clearable button"
    />

    <Input
      label="Password with prefix icon"
      type="password"
      placeholder="Enter password"
      prefixIcon={<Eye />}
      defaultValue="mypassword"
      helperText="Prefix icon + password toggle"
    />

    <Input
      label="Password with prefix and clearable"
      type="password"
      placeholder="Enter password"
      prefixIcon={<Eye />}
      clearable
      defaultValue="mypassword"
      helperText="Prefix icon + password toggle + clearable"
    />

    <Input
      label="Search with suffix and clearable"
      type="search"
      placeholder="Search..."
      suffixIcon={<Search />}
      clearable
      defaultValue="search term"
      helperText="Suffix icon + clearable button"
    />

    <Input
      label="Both icons with clearable"
      type="text"
      placeholder="Enter text..."
      prefixIcon={<Mail />}
      suffixIcon={<Search />}
      clearable
      defaultValue="Some text"
      helperText="Both icons + clearable button"
    />
  </div>
);

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

export const Clearable = () => (
  <div className="flex flex-col gap-4 w-80">
    <Input
      label="Search"
      placeholder="Type to search..."
      clearable
      onClear={() => console.log("Input cleared")}
    />
    <Input
      label="Email"
      type="email"
      placeholder="Enter your email"
      defaultValue="example@email.com"
      clearable
      helperText="Click X to clear the input"
    />
    <Input
      label="Password"
      type="password"
      defaultValue="mypassword123"
      clearable
      helperText="Clear button appears before the eye icon"
      onClear={() => console.log("Password cleared")}
    />
    <Input
      label="Username"
      isFloatLabel
      defaultValue="johndoe"
      clearable
      onClear={() => console.log("Username cleared")}
    />
  </div>
);
