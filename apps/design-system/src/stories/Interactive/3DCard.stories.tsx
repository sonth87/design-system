import type { Meta, StoryObj } from "@storybook/react";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "../../components/Interactive/3DCard";
import i18n from "../../../.storybook/i18n";

const meta: Meta<typeof CardContainer | typeof CardBody | typeof CardItem> = {
  title: "Interactive/3DCard",
  component: CardContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // CardContainer Props
    containerClassName: {
      control: "text",
      description: i18n.t(
        "stories.3dcard.argTypes.containerClassName.description",
      ),
      table: {
        category: "CardContainer",
      },
    },

    // CardBody Props
    className: {
      control: "text",
      description: i18n.t("stories.3dcard.argTypes.className.description"),
      table: {
        category: "CardBody",
      },
    },

    // CardItem Props
    as: {
      control: "text",
      description: i18n.t("stories.3dcard.argTypes.as.description"),
      table: {
        defaultValue: { summary: "div" },
        category: "CardItem",
      },
    },
    children: {
      control: false,
      description: i18n.t("stories.3dcard.argTypes.children.description"),
      table: {
        category: "CardItem",
      },
    },

    // Transform Props - Translation
    translateX: {
      control: { type: "number" },
      description: i18n.t("stories.3dcard.argTypes.translateX.description"),
      table: {
        defaultValue: { summary: "0" },
        category: "CardItem - Transform",
      },
    },
    translateY: {
      control: { type: "number" },
      description: i18n.t("stories.3dcard.argTypes.translateY.description"),
      table: {
        defaultValue: { summary: "0" },
        category: "CardItem - Transform",
      },
    },
    translateZ: {
      control: { type: "number" },
      description: i18n.t("stories.3dcard.argTypes.translateZ.description"),
      table: {
        defaultValue: { summary: "0" },
        category: "CardItem - Transform",
      },
    },

    // Transform Props - Rotation
    rotateX: {
      control: { type: "number" },
      description: i18n.t("stories.3dcard.argTypes.rotateX.description"),
      table: {
        defaultValue: { summary: "0" },
        category: "CardItem - Transform",
      },
    },
    rotateY: {
      control: { type: "number" },
      description: i18n.t("stories.3dcard.argTypes.rotateY.description"),
      table: {
        defaultValue: { summary: "0" },
        category: "CardItem - Transform",
      },
    },
    rotateZ: {
      control: { type: "number" },
      description: i18n.t("stories.3dcard.argTypes.rotateZ.description"),
      table: {
        defaultValue: { summary: "0" },
        category: "CardItem - Transform",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardContainer | typeof CardBody | typeof CardItem>;

export const Default: Story = {
  render: () => (
    <CardContainer className="inter-var" containerClassName="py-8">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[24rem] h-auto rounded-xl p-4 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-16">
          <CardItem
            translateZ={20}
            as="a"
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <CardContainer className="inter-var" containerClassName="py-8">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[24rem] h-auto rounded-xl p-4 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Interactive 3D Card
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Experience smooth transforms with enhanced rotations and translations
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-16">
          <CardItem
            translateZ={20}
            translateX={-40}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  ),
};
