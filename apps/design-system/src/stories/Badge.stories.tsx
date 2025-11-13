import type { Meta, StoryObj } from "@storybook/react";
import Badge from "../components/Badge/Badge";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Badge> = {
  title: "Feedback/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "light", "outline"],
      description: i18n.t("stories.badge.argTypes.variant.description"),
      table: {
        defaultValue: { summary: "solid" },
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
      description: i18n.t("stories.badge.argTypes.color.description"),
      table: {
        defaultValue: { summary: "primary" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "normal", "lg", "xl"],
      description: i18n.t("stories.badge.argTypes.size.description"),
      table: {
        defaultValue: { summary: "normal" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    border: {
      control: "boolean",
      description: i18n.t("stories.badge.argTypes.border.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    isLoading: {
      control: "boolean",
      description: i18n.t("stories.badge.argTypes.isLoading.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    animation: {
      control: "select",
      options: [
        " ",
        "heartbeat",
        "shine",
        "bounce",
        "tap",
        "glass",
        "glow",
        "liquid",
        "loading",
        "draw",
      ],
      description: i18n.t("stories.badge.argTypes.animation.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    children: {
      control: "text",
      description: i18n.t("stories.badge.argTypes.children.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.badge.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
  args: {
    children: "Badge",
    variant: "solid",
    color: "primary",
    size: "normal",
    border: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "9",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Badge size="xs">XS</Badge>
      <Badge size="sm">SM</Badge>
      <Badge size="normal">MD</Badge>
      <Badge size="lg">LG</Badge>
      <Badge size="xl">XL</Badge>
    </div>
  ),
};

export const SolidVariant: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge variant="solid" color="primary">
        Primary
      </Badge>
      <Badge variant="solid" color="secondary">
        Secondary
      </Badge>
      <Badge variant="solid" color="accent">
        Accent
      </Badge>
      <Badge variant="solid" color="success">
        Success
      </Badge>
      <Badge variant="solid" color="warning">
        Warning
      </Badge>
      <Badge variant="solid" color="error">
        Error
      </Badge>
      <Badge variant="solid" color="destructive">
        Destructive
      </Badge>
      <Badge variant="solid" color="muted">
        Muted
      </Badge>
    </div>
  ),
};

export const LightVariant: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge variant="light" color="primary">
        Primary
      </Badge>
      <Badge variant="light" color="secondary">
        Secondary
      </Badge>
      <Badge variant="light" color="accent">
        Accent
      </Badge>
      <Badge variant="light" color="success">
        Success
      </Badge>
      <Badge variant="light" color="warning">
        Warning
      </Badge>
      <Badge variant="light" color="error">
        Error
      </Badge>
      <Badge variant="light" color="destructive">
        Destructive
      </Badge>
      <Badge variant="light" color="muted">
        Muted
      </Badge>
    </div>
  ),
};

export const OutlineVariant: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Badge variant="outline" color="primary">
        Primary
      </Badge>
      <Badge variant="outline" color="secondary">
        Secondary
      </Badge>
      <Badge variant="outline" color="accent">
        Accent
      </Badge>
      <Badge variant="outline" color="success">
        Success
      </Badge>
      <Badge variant="outline" color="warning">
        Warning
      </Badge>
      <Badge variant="outline" color="error">
        Error
      </Badge>
      <Badge variant="outline" color="destructive">
        Destructive
      </Badge>
      <Badge variant="outline" color="muted">
        Muted
      </Badge>
    </div>
  ),
};

export const WithBorder: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <h4 style={{ marginBottom: 8 }}>Solid with Border</h4>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Badge variant="solid" color="primary" border>
            Primary
          </Badge>
          <Badge variant="solid" color="secondary" border>
            Secondary
          </Badge>
          <Badge variant="solid" color="success" border>
            Success
          </Badge>
          <Badge variant="solid" color="warning" border>
            Warning
          </Badge>
          <Badge variant="solid" color="error" border>
            Error
          </Badge>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 8 }}>Light with Border</h4>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Badge variant="light" color="primary" border>
            Primary
          </Badge>
          <Badge variant="light" color="secondary" border>
            Secondary
          </Badge>
          <Badge variant="light" color="success" border>
            Success
          </Badge>
          <Badge variant="light" color="warning" border>
            Warning
          </Badge>
          <Badge variant="light" color="error" border>
            Error
          </Badge>
        </div>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div className="flex flex-row gap-4 items-center">
      <Badge size="xl" className="bg-pink-500">
        99
      </Badge>
      <Badge size="xl" className="bg-purple-500">
        99
      </Badge>
      <Badge size="xl" className="bg-black">
        99
      </Badge>
      <Badge size="xl" className="bg-yellow-500">
        99
      </Badge>
      <Badge size="xl" className="bg-green-500">
        99
      </Badge>
      <Badge size="xl" className="bg-gray-500">
        99
      </Badge>
    </div>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {(["solid", "light", "outline"] as const).map((variant) => (
        <div key={variant}>
          <h3 style={{ marginBottom: 12, textTransform: "capitalize" }}>
            {variant}
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(
              ["primary", "secondary", "success", "warning", "error"] as const
            ).map((color) => (
              <div
                key={color}
                style={{ display: "flex", gap: 12, alignItems: "center" }}
              >
                <div style={{ width: 100, fontWeight: "500" }}>{color}:</div>
                <Badge size="xs" variant={variant} color={color}>
                  XS
                </Badge>
                <Badge size="sm" variant={variant} color={color}>
                  SM
                </Badge>
                <Badge size="normal" variant={variant} color={color}>
                  MD
                </Badge>
                <Badge size="lg" variant={variant} color={color}>
                  LG
                </Badge>
                <Badge size="xl" variant={variant} color={color}>
                  XL
                </Badge>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
