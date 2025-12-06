import type { Meta } from "@storybook/react";

import ButtonGroup, {
  type ButtonGroupProps,
  ButtonGroupSeparator,
} from "../components/Button/ButtonGroup";
import Button from "../components/Button/Button";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  BottleWine,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from "lucide-react";
import i18n from "../../.storybook/i18n";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<ButtonGroupProps> = {
  title: "Navigation/ButtonGroup",
  component: ButtonGroup,
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
      options: ["solid", "mix", "light", "outline", "ghost", "link"],
      description: i18n.t("stories.buttongroup.argTypes.variant.description"),
      table: {
        defaultValue: { summary: "solid" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "xl",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
        "icon-xl",
        "circle-icon",
        "circle-icon-xs",
        "circle-icon-sm",
        "circle-icon-lg",
        "circle-icon-xl",
      ],
      description: i18n.t("stories.buttongroup.argTypes.size.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.appearance"),
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
      description: i18n.t("stories.buttongroup.argTypes.color.description"),
      table: {
        defaultValue: { summary: "primary" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    disabled: {
      control: "boolean",
      description: i18n.t("stories.buttongroup.argTypes.disabled.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    isLoading: {
      control: "boolean",
      description: i18n.t("stories.buttongroup.argTypes.isLoading.description"),
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
        "rainbow",
        "shine",
        "bounce",
        "tap",
        "glass",
        "glow",
        "liquid",
        "link-underline",
        "loading",
        "draw",
      ],
      description: i18n.t("stories.buttongroup.argTypes.animation.description"),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: i18n.t(
        "stories.buttongroup.argTypes.orientation.description",
      ),
      table: {
        defaultValue: { summary: "horizontal" },
        category: i18n.t("stories.category.layout"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.buttongroup.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
  args: {
    variant: "solid",
    size: "normal",
    orientation: "horizontal",
  },
};

export default meta;

export const Default = (args: ButtonGroupProps) => (
  <ButtonGroup {...args}>
    <Button>
      <ArrowLeft /> Left
    </Button>
    <Button>
      <BottleWine /> Bottle Wine
    </Button>
    <Button>
      <ArrowRight /> Right
    </Button>
  </ButtonGroup>
);

export const WithSeparator = (args: ButtonGroupProps) => (
  <ButtonGroup {...args}>
    <Button>Button 1</Button>
    <ButtonGroupSeparator />
    <Button>Button 2</Button>
    <ButtonGroupSeparator />
    <Button>Button 3</Button>
  </ButtonGroup>
);

export const Vertical = (args: ButtonGroupProps) => (
  <ButtonGroup {...args} orientation="vertical">
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </ButtonGroup>
);

export const Variants = (args: ButtonGroupProps) => (
  <div className="flex flex-col gap-4">
    <ButtonGroup {...args}>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </ButtonGroup>
    <ButtonGroup {...args}>
      <Button variant="solid" color="secondary">
        Solid
      </Button>
      <Button variant="outline" color="secondary">
        Outline
      </Button>
      <Button variant="ghost" color="secondary">
        Ghost
      </Button>
    </ButtonGroup>
  </div>
);

export const Sizes = (args: ButtonGroupProps) => (
  <div className="flex flex-col gap-4">
    <ButtonGroup {...args}>
      <Button size="sm">Small</Button>
      <Button size="normal">Normal</Button>
      <Button size="lg">Large</Button>
    </ButtonGroup>
    <ButtonGroup {...args}>
      <Button size="sm" variant="outline">
        Small
      </Button>
      <Button size="normal" variant="outline">
        Normal
      </Button>
      <Button size="lg" variant="outline">
        Large
      </Button>
    </ButtonGroup>
  </div>
);

export const LoadingState = (args: ButtonGroupProps) => (
  <ButtonGroup {...args}>
    <Button isLoading>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </ButtonGroup>
);

export const DisabledState = (args: ButtonGroupProps) => (
  <ButtonGroup {...args} disabled>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </ButtonGroup>
);

export const IconButtons = (args: ButtonGroupProps) => (
  <div className="flex flex-col gap-4">
    <ButtonGroup {...args}>
      <Button size="icon">
        <ArrowLeft />
      </Button>
      <Button size="icon">
        <ShoppingBag />
      </Button>
      <Button size="icon">
        <ArrowRight />
      </Button>
    </ButtonGroup>

    <ButtonGroup {...args}>
      <Button size="circle-icon">
        <BottleWine />
      </Button>
      <Button size="circle-icon">
        <ShoppingBag />
      </Button>
    </ButtonGroup>

    <ButtonGroup {...args}>
      <Button
        variant="outline"
        className="group w-20 justify-start gap-3 overflow-hidden rounded-none rounded-l-md shadow-none transition-all duration-200 not-hover:w-10 hover:bg-sky-500/10 hover:text-sky-500 focus-visible:z-10 dark:hover:bg-sky-400/10 dark:hover:text-sky-400"
      >
        <ThumbsUpIcon />
        Like
      </Button>
      <Button
        variant="outline"
        className="hover:bg-destructive/10! group hover:text-destructive w-24.5 justify-end gap-3 overflow-hidden rounded-none rounded-r-md shadow-none transition-all duration-200 not-hover:w-10 focus-visible:z-10"
      >
        Dislike
        <ThumbsDownIcon />
      </Button>
    </ButtonGroup>
  </div>
);

export const GlassEffect = (args: ButtonGroupProps) => (
  <div
    className="w-200 h-60 p-4 flex items-center justify-center bg-cover [animation:move-background_400s_linear_infinite] gap-4"
    style={{
      backgroundImage:
        "url('https://raw.githubusercontent.com/lucasromerodb/liquid-glass-effect-macos/refs/heads/main/assets/flowers.jpg')",
    }}
  >
    <ButtonGroup {...args} animation="glass">
      <Button size="xl">Button 1</Button>
      <Button size="xl">Button 2</Button>
    </ButtonGroup>
    <ButtonGroup {...args} animation="glass" orientation="vertical">
      <Button size="circle-icon-xl">
        <BottleWine />
      </Button>
      <Button size="circle-icon-xl">
        <ShoppingBag />
      </Button>
    </ButtonGroup>
  </div>
);
