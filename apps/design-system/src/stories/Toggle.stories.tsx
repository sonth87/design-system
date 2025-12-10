import type { Meta } from "@storybook/react";
import { useState } from "react";

import Toggle, { type ToggleProps } from "../components/Toggle/Toggle";
import { BookmarkIcon, HeartIcon, StarIcon } from "lucide-react";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Toggle> = {
  title: "Form Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    pressed: {
      control: "boolean",
      description: i18n.t("stories.toggle.argTypes.pressed.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: i18n.t("stories.toggle.argTypes.variant.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: i18n.t("stories.toggle.argTypes.size.description"),
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
      description: i18n.t("stories.toggle.argTypes.color.description"),
      table: {
        defaultValue: { summary: "primary" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    disabled: {
      control: "boolean",
      description: i18n.t("stories.toggle.argTypes.disabled.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.toggle.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    onPressedChange: {
      action: "pressed changed",
      description: i18n.t(
        "stories.toggle.argTypes.onPressedChange.description",
      ),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    children: {
      control: "text",
      description: i18n.t("stories.toggle.argTypes.children.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
  },
  args: {
    children: "Toggle",
    variant: "default",
    color: "muted",
    size: "default",
  },
};

export default meta;

export const Default = (args: ToggleProps) => {
  const [pressed, setPressed] = useState(false);
  return <Toggle {...args} pressed={pressed} onPressedChange={setPressed} />;
};

export const Variants = (args: ToggleProps) => {
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  return (
    <div className="flex flex-row gap-4">
      <Toggle {...args} pressed={pressed1} onPressedChange={setPressed1} />
      <Toggle
        {...args}
        variant="outline"
        pressed={pressed2}
        onPressedChange={setPressed2}
      />
    </div>
  );
};

export const ToggleWithIcon = (args: ToggleProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Toggle
        {...args}
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
      >
        <StarIcon />
        Star
      </Toggle>
      <Toggle
        {...args}
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
      >
        <HeartIcon />
        Heart
      </Toggle>
      <Toggle
        {...args}
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
      >
        <BookmarkIcon />
        Bookmark
      </Toggle>
    </div>
  );
};

export const Sizes = (args: ToggleProps) => {
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  const [pressed3, setPressed3] = useState(false);
  return (
    <div className="flex flex-row gap-4 items-center">
      <Toggle
        {...args}
        size="sm"
        pressed={pressed1}
        onPressedChange={setPressed1}
      />
      <Toggle
        {...args}
        size="default"
        pressed={pressed2}
        onPressedChange={setPressed2}
      />
      <Toggle
        {...args}
        size="lg"
        pressed={pressed3}
        onPressedChange={setPressed3}
      />
    </div>
  );
};

export const Colors = (args: ToggleProps) => {
  const [pressed1, setPressed1] = useState(true);
  const [pressed2, setPressed2] = useState(true);
  const [pressed3, setPressed3] = useState(true);
  const [pressed4, setPressed4] = useState(true);
  const [pressed5, setPressed5] = useState(true);
  const [pressed6, setPressed6] = useState(true);
  const [pressed7, setPressed7] = useState(true);
  return (
    <div className="flex flex-row gap-4">
      <Toggle
        {...args}
        color="primary"
        pressed={pressed1}
        onPressedChange={setPressed1}
      />
      <Toggle
        {...args}
        color="secondary"
        pressed={pressed2}
        onPressedChange={setPressed2}
      />
      <Toggle
        {...args}
        color="accent"
        pressed={pressed3}
        onPressedChange={setPressed3}
      />
      <Toggle
        {...args}
        color="destructive"
        pressed={pressed4}
        onPressedChange={setPressed4}
      />
      <Toggle
        {...args}
        color="success"
        pressed={pressed5}
        onPressedChange={setPressed5}
      />
      <Toggle
        {...args}
        color="error"
        pressed={pressed6}
        onPressedChange={setPressed6}
      />
      <Toggle
        {...args}
        color="warning"
        pressed={pressed7}
        onPressedChange={setPressed7}
      />
    </div>
  );
};

export const PressedState = (args: ToggleProps) => <Toggle {...args} pressed />;

export const DisabledState = (args: ToggleProps) => (
  <Toggle {...args} disabled />
);
