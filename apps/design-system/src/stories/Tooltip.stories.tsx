import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, type TooltipProps } from "../components/Tooltip/Tooltip";
import Button from "../components/Button/Button";
import { Info } from "lucide-react";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Tooltip> = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
      description: i18n.t("stories.tooltip.argTypes.content.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    sideOffset: {
      control: "number",
      description: i18n.t("stories.tooltip.argTypes.sideOffset.description"),
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    position: {
      control: "select",
      description: i18n.t("stories.tooltip.argTypes.position.description"),
      options: ["top", "right", "bottom", "left"],
      table: {
        category: i18n.t("stories.category.layout"),
      },
    },
    noArrow: {
      control: "boolean",
      description: i18n.t("stories.tooltip.argTypes.noArrow.description"),
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
      description: i18n.t("stories.tooltip.argTypes.color.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    animation: {
      control: "select",
      description: i18n.t("stories.tooltip.argTypes.animation.description"),
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
        "spec",
      ],
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    delayDuration: {
      control: "number",
      description: i18n.t("stories.tooltip.argTypes.delayDuration.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.tooltip.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    children: {
      control: false,
      description: i18n.t("stories.tooltip.argTypes.children.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
  },
  args: {
    content: "Tooltip text",
    sideOffset: 4,
    delayDuration: 0,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Position = (args: TooltipProps) => {
  const content = (pos: string) => {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold flex items-center gap-2">
          <Info className="size-4" /> {pos} Tooltip
        </h2>
        <div>Additional content</div>
      </div>
    );
  };

  return (
    <div className="w-60 h-40 relative mx-auto [&_button]:absolute">
      <Tooltip {...args} position="top" content={content("Top")}>
        <Button variant="outline" className="top-0 left-1/2 -translate-x-1/2">
          Top
        </Button>
      </Tooltip>
      <Tooltip {...args} position="right" content={content("Right")}>
        <Button variant="outline" className="top-1/2 right-0 -translate-y-1/2">
          Right
        </Button>
      </Tooltip>
      <Tooltip {...args} position="bottom" content={content("Bottom")}>
        <Button
          variant="outline"
          className="bottom-0 left-1/2 -translate-x-1/2"
        >
          Bottom
        </Button>
      </Tooltip>
      <Tooltip {...args} position="left" content={content("Left")}>
        <Button variant="outline" className="top-1/2 left-0 -translate-y-1/2">
          Left
        </Button>
      </Tooltip>
    </div>
  );
};

export const CustomOffset: Story = {
  args: {
    content: "Offset 16px from trigger",
    sideOffset: 16,
  },
  render: (args) => (
    <Tooltip {...args}>
      <span className="underline cursor-pointer">Hover for offset</span>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  args: {
    content: "Appears after 500ms",
    delayDuration: 500,
  },
  render: (args) => (
    <Tooltip {...args}>
      <span className="underline cursor-pointer">Hover with delay</span>
    </Tooltip>
  ),
};
