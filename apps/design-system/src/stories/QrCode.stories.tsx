import type { Meta, StoryObj } from "@storybook/react";

import { QRCode, Canvas, Overlay } from "../components/QrCode/QrCode";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof QRCode> = {
  title: "Media/QRCode",
  component: QRCode,
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
  render: (args) => <QRCode {...args} />,
};

export const Colorful: Story = {
  render: () => (
    <div className="flex gap-2">
      <QRCode
        value="https://example.com"
        size={100}
        foregroundColor="#3b82f6"
        backgroundColor="#f1f5f9"
      >
        <Canvas />
      </QRCode>
      <QRCode
        value="https://example.com"
        size={100}
        foregroundColor="#ffb9fd"
        backgroundColor="#ff00ee"
      >
        <Canvas />
      </QRCode>
      <QRCode
        value="https://example.com"
        size={100}
        foregroundColor="#fff200"
        backgroundColor="#b3f4bc"
      >
        <Canvas />
      </QRCode>
    </div>
  ),
};

export const WithOverlay: Story = {
  render: () => (
    <QRCode value="https://example.com">
      <Canvas />
      <Overlay className="rounded-full border-2 border-white bg-linear-to-br from-primary to-secondary p-2 text-white">
        <span>Hi!</span>
      </Overlay>
    </QRCode>
  ),
};
