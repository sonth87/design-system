import type { Meta } from "@storybook/react";

import Separator from "../components/Separator/Separator";
import i18n from "../../.storybook/i18n";

type SeparatorProps = React.ComponentProps<typeof Separator>;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<SeparatorProps> = {
  title: "Layout/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: i18n.t("stories.separator.argTypes.orientation.description"),
      table: {
        defaultValue: { summary: "horizontal" },
        category: i18n.t("stories.category.layout"),
      },
    },
    decorative: {
      control: "boolean",
      description: i18n.t("stories.separator.argTypes.decorative.description"),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    textPosition: {
      control: "select",
      options: ["start", "center", "end"],
      description: i18n.t(
        "stories.separator.argTypes.textPosition.description",
      ),
      table: {
        defaultValue: { summary: "center" },
        category: i18n.t("stories.category.layout"),
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
      description: i18n.t("stories.separator.argTypes.color.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    children: {
      control: "text",
      description: i18n.t("stories.separator.argTypes.children.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.separator.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    orientation: "horizontal",
    decorative: true,
  },
};

export default meta;

export const Default = (args: SeparatorProps) => (
  <div
    className={`w-64 h-48 flex items-center justify-center ${args.orientation === "vertical" ? "flex-row" : "flex-col"}`}
  >
    <div className="p-4">Content 1</div>
    <Separator {...args} className="w-full h-full">
      {args?.children}
    </Separator>
    <div className="p-4">Content 2</div>
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
