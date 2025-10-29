import type { Meta } from "@storybook/react";

import Separator from "./Separator";
import { a } from "motion/react-client";

type SeparatorProps = React.ComponentProps<typeof Separator>;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<SeparatorProps> = {
  title: "Base/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is decorative",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    textPosition: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Position of the text when children are provided",
      table: {
        defaultValue: { summary: "center" },
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
      description: "Color variant of the separator",
    },
    children: {
      control: "text",
      description: "Text content to display in the separator",
    },
    className: { control: "text", description: "Additional CSS classes" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    orientation: "horizontal",
    decorative: true,
  },
};

export default meta;

export const Default = (args: SeparatorProps) => (
  <div className="w-64 h-48 flex items-center justify-center">
    <Separator {...args} className="w-full h-full">{args?.children}</Separator>
  </div>
);

export const Horizontal = (args: SeparatorProps) => (
  <div className="w-64 space-y-4">
    <div>Content above</div>
    <Separator {...args} orientation="horizontal" />
    <div>Content below</div>
  </div>
);

export const VerticalWithText = (args: SeparatorProps) => (
  <div className="flex h-64 items-center space-x-4">
    <div>Left content</div>
    <Separator {...args} orientation="vertical" textPosition="center">
      Or
    </Separator>
    <div>Right content</div>
  </div>
);

export const Decorative = (args: SeparatorProps) => (
  <div className="w-64 space-y-4">
    <div>Section 1</div>
    <Separator {...args} decorative />
    <div>Section 2</div>
  </div>
);

export const WithTextCenter = (args: SeparatorProps) => (
  <div className="w-64 space-y-4">
    <div>Content above</div>
    <Separator {...args} textPosition="center">
      Or
    </Separator>
    <div>Content below</div>
  </div>
);

export const WithTextStart = (args: SeparatorProps) => (
  <div className="w-64 space-y-4">
    <div>Content above</div>
    <Separator {...args} textPosition="start">
      Section
    </Separator>
    <div>Content below</div>
  </div>
);

export const WithTextStartVertical = (args: SeparatorProps) => (
  <div className="flex h-64 items-center space-x-4">
    <div>Left content</div>
    <Separator {...args} orientation="vertical" textPosition="start">
      Section
    </Separator>
    <div>Right content</div>
  </div>
);

export const WithTextCenterVertical = (args: SeparatorProps) => (
  <div className="flex h-64 items-center space-x-4">
    <div>Left content</div>
    <Separator {...args} orientation="vertical" textPosition="center">
      Or
    </Separator>
    <div>Right content</div>
  </div>
);

export const WithTextEndVertical = (args: SeparatorProps) => (
  <div className="flex h-64 items-center space-x-4">
    <div>Left content</div>
    <Separator {...args} orientation="vertical" textPosition="end">
      Continue
    </Separator>
    <div>Right content</div>
  </div>
);
