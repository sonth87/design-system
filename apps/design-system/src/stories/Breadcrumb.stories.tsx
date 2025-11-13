import type { Meta, StoryObj } from "@storybook/react";

import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import { Home, Settings, User, Slash, Star } from "lucide-react";
import i18n from "../../.storybook/i18n";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Breadcrumb> = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "badge", "bordered"],
      description: i18n.t("stories.breadcrumb.argTypes.variant.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "accent",
        "destructive",
        "muted",
        "success",
        "error",
        "warning",
      ],
      description: i18n.t("stories.breadcrumb.argTypes.color.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    maxItems: {
      control: "number",
      description: i18n.t("stories.breadcrumb.argTypes.maxItems.description"),
      table: {
        defaultValue: { summary: "undefined" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    showEllipsis: {
      control: "boolean",
      description: i18n.t("stories.breadcrumb.argTypes.ellipsis.description"),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    showHome: {
      control: "select",
      options: [true, "label", "icon", "both", false],
      description: "Show home item with label, icon, both, or custom ReactNode",
      table: {
        defaultValue: { summary: "label" },
        category: i18n.t("stories.category.content"),
      },
    },
    showPopoverOnEllipsis: {
      control: "boolean",
      description: "Show popover with hidden items when ellipsis is clicked",
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    items: {
      control: "object",
      description: i18n.t("stories.breadcrumb.argTypes.items.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.breadcrumb.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    variant: "default",
    color: "default",
    showEllipsis: true,
    showHome: "label",
    items: [
      {
        label: "Settings",
        href: "/settings",
        icon: <Settings className="size-4" />,
      },
      { label: "Profile", icon: <User className="size-4" /> },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    showHome: false,
    items: [
      { label: "Home", href: "/", icon: <Home className="size-4" /> },
      {
        label: "Settings",
        href: "/settings",
        icon: <Settings className="size-4" />,
      },
      { label: "Profile", icon: <User className="size-4" /> },
    ],
  },
};

export const IconOnly: Story = {
  args: {
    showHome: false,
    items: [
      { icon: <Home className="size-4" />, href: "/" },
      { icon: <Settings className="size-4" />, href: "/settings" },
      { icon: <User className="size-4" /> },
    ],
  },
};

export const WithEllipsis: Story = {
  args: {
    maxItems: 2,
    showHome: true,
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Category", href: "/products/category" },
      { label: "Settings", href: "/settings" },
      { label: "Profile" },
    ],
  },
};

export const WithPopoverOnEllipsis: Story = {
  args: {
    maxItems: 2,
    showHome: true,
    showPopoverOnEllipsis: true,
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Category", href: "/products/category" },
      { label: "Settings", href: "/settings" },
      { label: "Profile" },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: <Slash />,
    showHome: "label",
    items: [{ label: "Settings", href: "/settings" }, { label: "Profile" }],
  },
};

export const WithoutHome: Story = {
  args: {
    showHome: false,
    items: [
      { label: "Home", href: "/" },
      { label: "Settings", href: "/settings" },
      { label: "Profile" },
    ],
  },
};

export const HomeWithIcon: Story = {
  args: {
    showHome: "icon",
    items: [{ label: "Settings", href: "/settings" }, { label: "Profile" }],
  },
};

export const HomeWithBoth: Story = {
  args: {
    showHome: "both",
    items: [{ label: "Settings", href: "/settings" }, { label: "Profile" }],
  },
};

export const HomeCustomLabel: Story = {
  args: {
    showHome: <span style={{ color: "blue" }}>🏠</span>,
    items: [{ label: "Settings", href: "/settings" }, { label: "Profile" }],
  },
};

export const HomeCustomObject: Story = {
  args: {
    showHome: {
      label: "🏠 Custom Home",
      icon: <Star className="size-4" />,
      href: "/custom-home",
    },
    items: [{ label: "Settings", href: "/settings" }, { label: "Profile" }],
  },
};

export const WithReactNodeLabels: Story = {
  args: {
    showHome: false,
    items: [
      { label: <span style={{ color: "red" }}>Home</span>, href: "/" },
      { label: <strong>Settings</strong>, href: "/settings" },
      { label: "Profile" },
    ],
  },
};

export const MaxItemsZero: Story = {
  args: {
    maxItems: 0,
    showHome: "label",
    items: [
      { label: "Products", href: "/products" },
      { label: "Category", href: "/products/category" },
      { label: "Settings", href: "/settings" },
      { label: "Profile" },
    ],
  },
};

export const MaxItemsOneWithHome: Story = {
  args: {
    maxItems: 1,
    showHome: "label",
    items: [
      { label: "Products", href: "/products" },
      { label: "Category", href: "/products/category" },
      { label: "Settings", href: "/settings" },
      { label: "Profile" },
    ],
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Default Variant</h3>
        <Breadcrumb {...args} variant="default" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3">Compact Variant</h3>
        <Breadcrumb {...args} variant="compact" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3">Badge Variant</h3>
        <Breadcrumb {...args} variant="badge" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3">Bordered Variant</h3>
        <Breadcrumb {...args} variant="bordered" />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Default</h3>
        <Breadcrumb {...args} color="default" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3">Primary</h3>
        <Breadcrumb {...args} color="primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3">Secondary</h3>
        <Breadcrumb {...args} color="secondary" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3">Success</h3>
        <Breadcrumb {...args} color="success" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3">Warning</h3>
        <Breadcrumb {...args} color="warning" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3">Error</h3>
        <Breadcrumb {...args} color="error" />
      </div>
    </div>
  ),
};
