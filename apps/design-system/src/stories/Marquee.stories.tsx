import type { Meta, StoryObj } from "@storybook/react";
import { Marquee } from "../components/Marquee";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Marquee> = {
  title: "Interactive/Marquee",
  component: Marquee,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: i18n.t("stories.marquee.argTypes.children.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    items: {
      control: false,
      description: i18n.t("stories.marquee.argTypes.items.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    fade: {
      control: { type: "boolean" },
      description: i18n.t("stories.marquee.argTypes.fade.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    side: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"],
      description: i18n.t("stories.marquee.argTypes.side.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    speed: {
      control: { type: "number" },
      description: i18n.t("stories.marquee.argTypes.speed.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    delay: {
      control: { type: "number" },
      description: i18n.t("stories.marquee.argTypes.delay.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    loopCount: {
      control: { type: "number" },
      description: i18n.t("stories.marquee.argTypes.loopCount.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    gap: {
      control: { type: "text" },
      description: i18n.t("stories.marquee.argTypes.gap.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    autoFill: {
      control: { type: "boolean" },
      description: i18n.t("stories.marquee.argTypes.autoFill.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
    pauseOnHover: {
      control: { type: "boolean" },
      description: i18n.t("stories.marquee.argTypes.pauseOnHover.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    pauseOnKeyboard: {
      control: { type: "boolean" },
      description: i18n.t(
        "stories.marquee.argTypes.pauseOnKeyboard.description",
      ),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    reverse: {
      control: { type: "boolean" },
      description: i18n.t("stories.marquee.argTypes.reverse.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Marquee>;

const tricks = [
  {
    title: "Kickflip",
    description:
      "A kickflip is a trick where you kick the board forward while jumping, and then land on the board with the other foot.",
  },
  {
    title: "Heelflip",
    description:
      "A heelflip is a trick where you flip the board backwards while jumping, and then land on the board with the other foot.",
  },
  {
    title: "Tre Flip",
    description:
      "A tre flip is a trick where you flip the board sideways while jumping, and then land on the board with the other foot.",
  },
  {
    title: "FS 540",
    description:
      "A fs 540 is a trick where you flip the board 540 degrees while jumping, and then land on the board with the other foot.",
  },
  {
    title: "360 Varial McTwist",
    description:
      "A 360 varial mc twist is a trick where you flip the board 360 degrees while jumping, and then land on the board with the other foot.",
  },
];

export const Default = (args: typeof Marquee) => {
  const items = tricks.map((trick) => (
    <div className="flex w-[260px] flex-col gap-1 rounded-md border bg-card p-4 text-card-foreground shadow-sm">
      <div className="font-medium text-sm leading-tight sm:text-base">
        {trick.title}
      </div>
      <span className="line-clamp-2 text-muted-foreground text-sm">
        {trick.description}
      </span>
    </div>
  ));

  return (
    <Marquee
      aria-label="Skateboard tricks showcase with items"
      items={items}
      className="max-h-[200px]"
      {...args}
    />
  );
};

export const Manual = (args: typeof Marquee) => {
  const items = tricks.map((trick, index) => (
    <Marquee.Item key={index}>
      <div className="flex w-[260px] flex-col gap-1 rounded-md border bg-card p-4 text-card-foreground shadow-sm">
        <div className="font-medium text-sm leading-tight sm:text-base">
          {trick.title}
        </div>
        <span className="line-clamp-2 text-muted-foreground text-sm">
          {trick.description}
        </span>
      </div>
    </Marquee.Item>
  ));

  return (
    <Marquee aria-label="Skateboard tricks showcase manual">
      <Marquee.Content>{items}</Marquee.Content>
    </Marquee>
  );
};
