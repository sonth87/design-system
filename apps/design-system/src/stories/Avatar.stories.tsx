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
    <div className="ds:flex ds:items-center ds:gap-4">
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
    <div className="ds:flex ds:items-center ds:gap-4">
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
    <div className="ds:flex ds:flex-col ds:gap-4">
      <div className="ds:flex ds:items-center ds:gap-4">
        Default colors:
        <Avatar {...args} color="primary" fallback="P" />
        <Avatar {...args} color="secondary" fallback="S" />
        <Avatar {...args} color="success" fallback="SU" />
        <Avatar {...args} color="warning" fallback="W" />
        <Avatar {...args} color="error" fallback="E" />
      </div>

      <div className="ds:flex ds:items-center ds:gap-4">
        Custom colors:
        <Avatar {...args} fallback="P" className="ds:bg-purple-400 ds:text-white" />
        <Avatar {...args} fallback="S" className="ds:bg-blue-100 ds:text-blue-500" />
        <Avatar
          {...args}
          fallback={<Angry />}
          className="ds:bg-pink-200 ds:text-red-500"
        />
        <Avatar
          {...args}
          fallback={<AlarmClock />}
          className="ds:bg-green-100 ds:text-green-500"
        />
        <Avatar
          {...args}
          fallback={<Baby />}
          className="ds:bg-yellow-400 ds:text-white"
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
    <div className="ds:flex ds:items-center ds:gap-4">
      <div className="ds:relative ds:w-fit">
        <Avatar {...args} />
        <span className="ds:border-background ds:bg-destructive ds:absolute ds:-right-0.5 ds:-bottom-0.5 ds:size-3 ds:rounded-full ds:border-2">
          <span className="ds:sr-only">Busy</span>
        </span>
      </div>

      <div className="ds:relative ds:w-fit">
        <Avatar
          {...args}
          className="ds:ring-offset-background ds:ring-2 ds:ring-green-600 ds:ring-offset-2 ds:dark:ring-green-400"
        />
        <span className="ds:absolute ds:-right-1.5 ds:-bottom-1.5 ds:rounded-full ds:bg-green-600 ds:dark:bg-green-400">
          <CheckIcon className="ds:size-4 ds:text-white" />
        </span>
      </div>

      <div className="ds:relative ds:w-fit">
        <Avatar {...args} variant="square" />
        <span className="ds:absolute ds:-top-2.5 ds:-right-1.5">
          <Badge color="warning" size="sm" border />
        </span>
      </div>

      <div className="ds:relative ds:w-fit">
        <Avatar {...args} />
        <Badge className="ds:absolute ds:-top-1.5 ds:-right-2.5 ds:h-5 ds:min-w-5 ds:rounded-full ds:bg-red-500 ds:px-1 ds:border ds:border-white">
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
    <div className="ds:flex ds:flex-col ds:gap-4">
      <div className="ds:flex ds:items-center ds:-space-x-3 ds:hover:space-x-1">
        {avatars.map((avatar, index) => (
          <Avatar key={index} {...avatar} />
        ))}
      </div>

      <div className="ds:flex ds:items-center ds:-space-x-3 ds:hover:space-x-1">
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
