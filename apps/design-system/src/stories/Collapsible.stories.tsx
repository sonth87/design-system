"use client";

import type { Meta, StoryObj } from "@storybook/react";
import Collapsible, {
  CollapsibleContent,
  CollapsibleTrigger,
  type CollapsibleProps,
} from "../components/Collapsible/Collapsible";
import { ChevronRight, Info, Settings, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@dsui/ui/index";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Collapsible> = {
  title: "Layout/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      control: false,
      description: i18n.t("stories.collapsible.argTypes.trigger.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    content: {
      control: false,
      description: i18n.t("stories.collapsible.argTypes.content.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    showIcon: {
      control: "boolean",
      description: i18n.t("stories.collapsible.argTypes.showIcon.description"),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.ui"),
      },
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: i18n.t(
        "stories.collapsible.argTypes.iconPosition.description",
      ),
      table: {
        defaultValue: { summary: "right" },
        category: i18n.t("stories.category.layout"),
      },
    },
    iconRotation: {
      control: "boolean",
      description: i18n.t(
        "stories.collapsible.argTypes.iconRotation.description",
      ),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.ui"),
      },
    },
    variant: {
      control: "select",
      options: ["default", "bordered", "ghost"],
      description: i18n.t("stories.collapsible.argTypes.variant.description"),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    open: {
      control: "boolean",
      description: i18n.t("stories.collapsible.argTypes.open.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    defaultOpen: {
      control: "boolean",
      description: i18n.t(
        "stories.collapsible.argTypes.defaultOpen.description",
      ),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    disabled: {
      control: "boolean",
      description: i18n.t("stories.collapsible.argTypes.disabled.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.collapsible.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    onOpenChange: {
      action: "open changed",
      description: i18n.t(
        "stories.collapsible.argTypes.onOpenChange.description",
      ),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
  },
  args: {
    variant: "default",
    showIcon: true,
    iconPosition: "right",
    iconRotation: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = (args: CollapsibleProps) => {
  return (
    <div className="w-[400px]">
      <Collapsible
        {...args}
        trigger="Can I use this in my project?"
        content="Yes. Free to use for personal and commercial projects. No attribution required."
      />
    </div>
  );
};

const VariantsComponent = () => {
  return (
    <div className="w-[400px] space-y-4">
      <Collapsible
        variant="default"
        trigger="Default Variant"
        content="This is the default variant with a border and card background."
      />
      <Collapsible
        variant="bordered"
        trigger="Bordered Variant"
        content="This variant has a thicker border and bold trigger text."
      />
      <Collapsible
        variant="ghost"
        trigger="Ghost Variant"
        content="This variant has minimal styling with no border."
      />
    </div>
  );
};

const IconPositionComponent = () => {
  return (
    <div className="w-[400px] space-y-4">
      <Collapsible
        iconPosition="left"
        trigger="Icon on Left"
        content="The chevron icon is positioned on the left side."
      />
      <Collapsible
        iconPosition="right"
        trigger="Icon on Right"
        content="The chevron icon is positioned on the right side."
      />
      <Collapsible
        showIcon={false}
        trigger="No Icon"
        content="This collapsible has no icon."
      />
    </div>
  );
};

const CustomContentComponent = () => {
  return (
    <div className="w-[400px] space-y-4">
      <Collapsible
        trigger={
          <div className="flex items-center gap-2">
            <Settings className="size-4" />
            <span className="font-semibold">Advanced Settings</span>
          </div>
        }
        content={
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable notifications</span>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark mode</span>
              <input type="checkbox" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-save</span>
              <input type="checkbox" defaultChecked />
            </div>
          </div>
        }
      />

      <Collapsible
        trigger={
          <div className="flex items-center gap-2">
            <User className="size-4" />
            <span className="font-semibold">User Profile</span>
          </div>
        }
        content={
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

const ControlledComponent = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const expandAll = () => {
    setOpen1(true);
    setOpen2(true);
    setOpen3(true);
  };

  const collapseAll = () => {
    setOpen1(false);
    setOpen2(false);
    setOpen3(false);
  };

  return (
    <div className="w-[400px] space-y-4">
      <div className="flex gap-2">
        <button
          onClick={expandAll}
          className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground"
        >
          Expand All
        </button>
        <button
          onClick={collapseAll}
          className="rounded bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
        >
          Collapse All
        </button>
      </div>

      <Collapsible
        open={open1}
        onOpenChange={setOpen1}
        trigger="Section 1"
        content="Content for section 1. This is controlled externally."
      />
      <Collapsible
        open={open2}
        onOpenChange={setOpen2}
        trigger="Section 2"
        content="Content for section 2. This is controlled externally."
      />
      <Collapsible
        open={open3}
        onOpenChange={setOpen3}
        trigger="Section 3"
        content="Content for section 3. This is controlled externally."
      />
    </div>
  );
};

const AccordionStyleComponent = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleOpenChange = (item: string) => (isOpen: boolean) => {
    setOpenItem(isOpen ? item : null);
  };

  return (
    <div className="w-[400px] space-y-2">
      <Collapsible
        open={openItem === "item1"}
        onOpenChange={handleOpenChange("item1")}
        trigger="What is your return policy?"
        content="We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, you can return it within 30 days for a full refund."
      />
      <Collapsible
        open={openItem === "item2"}
        onOpenChange={handleOpenChange("item2")}
        trigger="How long does shipping take?"
        content="Standard shipping takes 5-7 business days. Express shipping is available and takes 2-3 business days."
      />
      <Collapsible
        open={openItem === "item3"}
        onOpenChange={handleOpenChange("item3")}
        trigger="Do you ship internationally?"
        content="Yes, we ship to over 100 countries worldwide. International shipping rates vary by destination."
      />
    </div>
  );
};

const CustomImplementationComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[400px]">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} variant="ghost">
        <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-white transition-all hover:from-purple-600 hover:to-pink-600">
          <span className="font-semibold">Custom Styled Collapsible</span>
          <ChevronRight
            className={cn(
              "size-4 transition-transform duration-300",
              isOpen && "rotate-90",
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 dark:from-purple-950 dark:to-pink-950">
          <p className="text-sm">
            This is a completely custom implementation using the base
            components. You have full control over the styling and behavior.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

const NestedCollapsibleComponent = () => {
  return (
    <div className="w-[400px]">
      <Collapsible
        trigger="Parent Collapsible"
        content={
          <div className="space-y-2">
            <p className="text-sm">This is the parent content.</p>
            <Collapsible
              variant="bordered"
              trigger="Nested Collapsible 1"
              content="This is nested content inside the parent."
            />
            <Collapsible
              variant="bordered"
              trigger="Nested Collapsible 2"
              content="This is another nested item."
            />
          </div>
        }
      />
    </div>
  );
};

const DisabledStateComponent = () => {
  return (
    <div className="w-[400px] space-y-4">
      <Collapsible
        disabled
        trigger="Disabled Collapsible (Closed)"
        content="This content cannot be shown."
      />
      <Collapsible
        disabled
        defaultOpen
        trigger="Disabled Collapsible (Open)"
        content="This collapsible is disabled but was opened by default."
      />
    </div>
  );
};

const WithRichContentComponent = () => {
  return (
    <div className="w-[500px] space-y-4">
      <Collapsible
        trigger={
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-5 text-blue-500" />
            <div>
              <div className="font-semibold">Important Information</div>
              <div className="text-muted-foreground text-xs">
                Click to expand details
              </div>
            </div>
          </div>
        }
        content={
          <div className="space-y-3">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm">
              <li>Feature one with detailed description</li>
              <li>Feature two with additional context</li>
              <li>Feature three with more information</li>
            </ul>
            <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                💡 Pro tip: This is an example of rich content within a
                collapsible component.
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
};

export const Default: Story = {
  render: DefaultComponent,
};

export const Variants: Story = {
  render: () => <VariantsComponent />,
};

export const IconPosition: Story = {
  render: () => <IconPositionComponent />,
};

export const CustomContent: Story = {
  render: () => <CustomContentComponent />,
};

export const Controlled: Story = {
  render: () => <ControlledComponent />,
};

export const AccordionStyle: Story = {
  render: () => <AccordionStyleComponent />,
  parameters: {
    docs: {
      description: {
        story:
          "An accordion-like behavior where only one item can be open at a time.",
      },
    },
  },
};

export const CustomImplementation: Story = {
  render: () => <CustomImplementationComponent />,
  parameters: {
    docs: {
      description: {
        story:
          "Using the base components (CollapsibleTrigger and CollapsibleContent) for complete customization.",
      },
    },
  },
};

export const NestedCollapsible: Story = {
  render: () => <NestedCollapsibleComponent />,
};

export const DisabledState: Story = {
  render: () => <DisabledStateComponent />,
};

export const WithRichContent: Story = {
  render: () => <WithRichContentComponent />,
};
