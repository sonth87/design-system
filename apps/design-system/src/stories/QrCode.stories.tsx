import type { Meta, StoryObj } from "@storybook/react";

import * as QRCode from "../components/QrCode/QrCode";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof QRCode.Root> = {
  title: "Media/QRCode",
  component: QRCode.Root,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: i18n.t("stories.qrcode.argTypes.value.description"),
      control: "text",
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    size: {
      description: i18n.t("stories.qrcode.argTypes.size.description"),
      control: { type: "number", min: 50, max: 500 },
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    level: {
      description: i18n.t("stories.qrcode.argTypes.level.description"),
      control: { type: "select" },
      options: ["L", "M", "Q", "H"],
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    margin: {
      description: i18n.t("stories.qrcode.argTypes.margin.description"),
      control: { type: "number", min: 0, max: 10 },
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    quality: {
      description: i18n.t("stories.qrcode.argTypes.quality.description"),
      control: { type: "number", min: 0, max: 1, step: 0.1 },
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    backgroundColor: {
      description: i18n.t(
        "stories.qrcode.argTypes.backgroundColor.description"
      ),
      control: "color",
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    foregroundColor: {
      description: i18n.t(
        "stories.qrcode.argTypes.foregroundColor.description"
      ),
      control: "color",
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    onError: {
      description: i18n.t("stories.qrcode.argTypes.onError.description"),
      action: "onError",
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    onGenerated: {
      description: i18n.t("stories.qrcode.argTypes.onGenerated.description"),
      action: "onGenerated",
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    asChild: {
      description: i18n.t("stories.qrcode.argTypes.asChild.description"),
      control: "boolean",
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "https://example.com",
  },
  render: (args) => (
    <QRCode.Root {...args}>
      <QRCode.Canvas />
    </QRCode.Root>
  ),
};

export const WithOverlay: Story = {
  render: () => (
    <QRCode.Root value="https://example.com">
      <QRCode.Canvas />
      <QRCode.Overlay>
        <span>Scan me!</span>
      </QRCode.Overlay>
    </QRCode.Root>
  ),
};
