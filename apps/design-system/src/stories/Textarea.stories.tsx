import type { Meta } from "@storybook/react";

import Textarea, { type TextareaProps } from "../components/Textarea/Textarea";
import i18n from "../../.storybook/i18n";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Textarea> = {
  title: "Form Components/Textarea",
  component: Textarea,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    placeholder: {
      control: "text",
      description: i18n.t("stories.textarea.argTypes.placeholder.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "normal", "lg", "xl"],
      description: i18n.t("stories.textarea.argTypes.size.description"),
      table: {
        defaultValue: { summary: "normal" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    isFloatLabel: {
      control: "boolean",
      description: i18n.t("stories.textarea.argTypes.isFloatLabel.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.ui"),
      },
    },
    disabled: {
      control: "boolean",
      description: i18n.t("stories.textarea.argTypes.disabled.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    label: {
      control: "text",
      description: i18n.t("stories.textarea.argTypes.label.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    state: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: i18n.t("stories.textarea.argTypes.state.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.validation"),
      },
    },
    helperText: {
      control: "text",
      description: i18n.t("stories.textarea.argTypes.helperText.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    infoTooltip: {
      control: "text",
      description: i18n.t("stories.textarea.argTypes.infoTooltip.description"),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    maxLength: {
      control: "number",
      description: i18n.t("stories.textarea.argTypes.maxLength.description"),
      table: {
        category: i18n.t("stories.category.validation"),
      },
    },
    showCharCount: {
      control: "boolean",
      description: i18n.t(
        "stories.textarea.argTypes.showCharCount.description"
      ),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.ui"),
      },
    },
    clearable: {
      control: "boolean",
      description: i18n.t("stories.textarea.argTypes.clearable.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.ui"),
      },
    },
    onClear: {
      action: "cleared",
      description: i18n.t("stories.textarea.argTypes.onClear.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    rows: {
      control: "number",
      description: "Number of visible text lines",
      table: {
        category: i18n.t("stories.category.basic"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.textarea.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
  // Use `fn` to spy on the onChange arg, which will appear in the actions panel once invoked
  args: {
    label: "Label",
    placeholder: "Enter text...",
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = (args: TextareaProps) => (
  <div className="w-96">
    <Textarea {...args} />
  </div>
);

export const WithLabel = (args: TextareaProps) => (
  <div className="flex flex-col gap-4 w-[500px]">
    <Textarea
      {...args}
      label="Description"
      placeholder="Enter your description..."
    />
    <Textarea
      {...args}
      label="Comments"
      placeholder="Add your comments here..."
      defaultValue="This is a sample comment"
      size="lg"
      isFloatLabel
    />
    <Textarea
      {...args}
      label="Comments"
      placeholder="Add your comments here..."
      defaultValue="This is a sample comment"
      size="xl"
      isFloatLabel
    />
  </div>
);

export const FloatingLabel = () => (
  <div className="flex flex-col gap-4 w-[500px]">
    <Textarea
      label="Bio"
      isFloatLabel
      size="lg"
      placeholder=""
      defaultValue="Software Engineer with 5+ years of experience"
    />
    <Textarea
      label="Notes"
      isFloatLabel
      size="xl"
      placeholder=""
      defaultValue="These are my notes"
    />
  </div>
);

export const WithHelperText = (args: TextareaProps) => (
  <div className="w-[500px]">
    <Textarea
      {...args}
      label="Bio"
      placeholder="Tell us about yourself..."
      helperText="Write a brief description about yourself (max 500 characters)"
    />
  </div>
);

export const WithMaxLengthAndCharCount = (args: TextareaProps) => (
  <div className="flex flex-col gap-4 w-[500px]">
    <Textarea
      {...args}
      label="Description"
      placeholder="Enter description..."
      maxLength={500}
      helperText="Max 500 characters"
      showCharCount
      isFloatLabel
    />
  </div>
);

export const WithInfoTooltip = (args: TextareaProps) => (
  <div className="w-[500px] flex flex-col gap-4">
    <Textarea
      {...args}
      label="Message"
      placeholder="Type your message..."
      infoTooltip="Your message will be sent to the support team within 24 hours."
    />
    <Textarea
      {...args}
      label="Bio"
      isFloatLabel
      placeholder=""
      infoTooltip="This information will be displayed on your public profile."
    />
  </div>
);

export const HelperTextStates = () => (
  <div className="flex flex-col gap-4 w-[500px]">
    <Textarea
      label="Default Helper"
      placeholder="Enter text..."
      helperText="This is a default helper text"
      state="default"
    />
    <Textarea
      label="Success"
      placeholder="Enter text..."
      helperText="Your message has been saved successfully"
      state="success"
      defaultValue="Great work!"
    />
    <Textarea
      label="Warning"
      placeholder="Enter text..."
      helperText="This message might be too long for some platforms"
      state="warning"
      defaultValue="This is a very long message that might exceed the limit on certain platforms..."
    />
    <Textarea
      label="Error"
      placeholder="Enter text..."
      helperText="This field is required"
      state="error"
    />
  </div>
);

export const Disabled = (args: TextareaProps) => (
  <div className="w-[500px]">
    <Textarea
      {...args}
      label="Disabled Textarea"
      placeholder="This textarea is disabled"
      disabled
      defaultValue="This content cannot be edited"
    />
  </div>
);

export const CompleteExample = () => (
  <div className="flex flex-col gap-6 w-[600px]">
    <Textarea
      label="Feedback"
      placeholder=""
      helperText="Share your thoughts and suggestions"
      maxLength={500}
      showCharCount
      infoTooltip="Your feedback helps us improve our services."
      size="normal"
    />

    <Textarea
      label="Project Description"
      placeholder="Describe your project..."
      helperText="Provide a detailed description of your project goals and objectives"
      maxLength={1000}
      showCharCount
      infoTooltip="This description will be visible to all team members and stakeholders."
      size="lg"
      isFloatLabel
    />

    <Textarea
      label="Error Example"
      placeholder="Required field..."
      state="error"
      helperText="Please provide a valid response with at least 20 characters"
      maxLength={200}
      showCharCount
      infoTooltip="This field must be completed before submission."
    />
  </div>
);
