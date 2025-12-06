import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, type AvatarProps } from "../components/Avatar/Avatar";
import { AlarmClock, Angry, Baby, CheckIcon } from "lucide-react";
import Badge from "../components/Badge/Badge";
import { Tooltip } from "../components/Tooltip/Tooltip";
import i18n from "../../.storybook/i18n";

const meta: Meta<AvatarProps> = {
  title: "Data Display/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: i18n.t("stories.avatar.argTypes.size.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    variant: {
      control: "select",
      options: ["circle", "square"],
      description: i18n.t("stories.avatar.argTypes.variant.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    color: {
      control: "select",
      options: [
        "",
        "primary",
        "secondary",
        "dark",
        "light",
        "inverted",
        "success",
        "warning",
        "error",
        "glass",
      ],
      description: i18n.t("stories.avatar.argTypes.color.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    animation: {
      control: "select",
      description: i18n.t("stories.avatar.argTypes.animation.description"),
      options: [
        "bounce",
        "slide-up",
        "slide-down",
        "slide-left",
        "slide-right",
        "zoom-in",
        "zoom-out",
        "skewed",
        "shake",
        "flip",
        "gradient-outline",
      ],
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    src: {
      control: "text",
      description: i18n.t("stories.avatar.argTypes.src.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    alt: {
      control: "text",
      description: i18n.t("stories.avatar.argTypes.alt.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    fallback: {
      control: "text",
      description: i18n.t("stories.avatar.argTypes.fallback.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.avatar.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
  args: {
    src: "https://github.com/sonth87.png",
    alt: "Avatar",
    fallback: "ST",
    size: "md",
    variant: "circle",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => <Avatar {...args} />,
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} variant="circle" />
      <Avatar {...args} variant="square" />
    </div>
  ),
};

export const Colors: Story = {
  args: {
    src: "broken-image-url",
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        Default colors:
        <Avatar {...args} color="primary" fallback="P" />
        <Avatar {...args} color="secondary" fallback="S" />
        <Avatar {...args} color="success" fallback="SU" />
        <Avatar {...args} color="warning" fallback="W" />
        <Avatar {...args} color="error" fallback="E" />
      </div>

      <div className="flex items-center gap-4">
        Custom colors:
        <Avatar {...args} fallback="P" className="bg-purple-400 text-white" />
        <Avatar {...args} fallback="S" className="bg-blue-100 text-blue-500" />
        <Avatar
          {...args}
          fallback={<Angry />}
          className="bg-pink-200 text-red-500"
        />
        <Avatar
          {...args}
          fallback={<AlarmClock />}
          className="bg-green-100 text-green-500"
        />
        <Avatar
          {...args}
          fallback={<Baby />}
          className="bg-yellow-400 text-white"
        />
      </div>
    </div>
  ),
};

export const WithFallback: Story = {
  args: {
    src: "", // No image, show fallback
    fallback: "AB",
  },
  render: (args) => <Avatar {...args} />,
};

export const WithStatus: Story = {
  args: {},
  render: (args) => (
    <div className="flex items-center gap-4">
      <div className="relative w-fit">
        <Avatar {...args} />
        <span className="border-background bg-destructive absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2">
          <span className="sr-only">Busy</span>
        </span>
      </div>

      <div className="relative w-fit">
        <Avatar
          {...args}
          className="ring-offset-background ring-2 ring-green-600 ring-offset-2 dark:ring-green-400"
        />
        <span className="absolute -right-1.5 -bottom-1.5 rounded-full bg-green-600 dark:bg-green-400">
          <CheckIcon className="size-4 text-white" />
        </span>
      </div>

      <div className="relative w-fit">
        <Avatar {...args} variant="square" />
        <span className="absolute -top-2.5 -right-1.5">
          <Badge color="warning" size="sm" border />
        </span>
      </div>

      <div className="relative w-fit">
        <Avatar {...args} />
        <Badge className="absolute -top-1.5 -right-2.5 h-5 min-w-5 rounded-full bg-red-500 px-1 border border-white">
          +99
        </Badge>
      </div>
    </div>
  ),
};

export const AvatarGroup = (args: AvatarProps) => {
  const avatars = [
    { ...args },
    { src: "https://randomuser.me/api/portraits/women/60.jpg" },
    { src: "https://randomuser.me/api/portraits/women/67.jpg" },
    { src: "https://randomuser.me/api/portraits/women/66.jpg" },
    { fallback: "+9", className: "bg-gray-300 text-gray-700 static text-sm" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center -space-x-3 hover:space-x-1">
        {avatars.map((avatar, index) => (
          <Avatar key={index} {...avatar} />
        ))}
      </div>

      <div className="flex items-center -space-x-3 hover:space-x-1">
        {avatars.map((avatar, index) => (
          <Tooltip
            key={index}
            content={avatar.alt || avatar.fallback || "Avatar"}
            animation="spec"
          >
            <Avatar key={index} {...avatar} />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
