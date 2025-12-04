"use client";

import type { Meta, StoryObj } from "@storybook/react";
import Accordion, { type AccordionItemConfig } from "../components/Accordion";
import {
  Info,
  Settings,
  User,
  CreditCard,
  Bell,
  PackageIcon,
  RefreshCwIcon,
  HeadsetIcon,
} from "lucide-react";
import i18n from "../../.storybook/i18n";

// Use a simplified type for stories to avoid discriminated union issues
type AccordionStoryProps = {
  type: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  disabled?: boolean;
  variant?: "default" | "bordered" | "separated" | "ghost";
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "glass";
  items?: Array<{
    value: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  onValueChange?: (newValue: string | string[]) => void;
  children?: React.ReactNode;
};

const meta: Meta<AccordionStoryProps> = {
  title: "Layout/Accordion",
  component: Accordion as React.ComponentType<AccordionStoryProps>,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: i18n.t("stories.accordion.argTypes.type.description"),
      table: {
        defaultValue: { summary: "single" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    collapsible: {
      control: "boolean",
      description: i18n.t("stories.accordion.argTypes.collapsible.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
      if: { arg: "type", eq: "single" },
    },
    defaultValue: {
      control: "text",
      description: i18n.t(
        "stories.accordion.argTypes.defaultValue.description",
      ),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    value: {
      control: "text",
      description: i18n.t("stories.accordion.argTypes.value.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    disabled: {
      control: "boolean",
      description: i18n.t("stories.accordion.argTypes.disabled.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    variant: {
      control: "select",
      options: ["default", "bordered", "separated", "ghost"],
      description: i18n.t("stories.accordion.argTypes.variant.description"),
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
        "success",
        "warning",
        "error",
        "glass",
      ],
      description: i18n.t("stories.accordion.argTypes.color.description"),
      table: {
        defaultValue: { summary: "undefined" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    items: {
      control: false,
      description: i18n.t("stories.accordion.argTypes.items.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.accordion.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    itemClassName: {
      control: "text",
      description: i18n.t(
        "stories.accordion.argTypes.itemClassName.description",
      ),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    triggerClassName: {
      control: "text",
      description: i18n.t(
        "stories.accordion.argTypes.triggerClassName.description",
      ),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    contentClassName: {
      control: "text",
      description: i18n.t(
        "stories.accordion.argTypes.contentClassName.description",
      ),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    onValueChange: {
      action: "value changed",
      description: i18n.t(
        "stories.accordion.argTypes.onValueChange.description",
      ),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
  },
  args: {
    type: "single",
    collapsible: true,
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<AccordionStoryProps>;

const defaultItems = [
  {
    value: "item-1",
    trigger: "Is it accessible?",
    content:
      "Yes. It adheres to the WAI-ARIA design pattern. All components are designed with accessibility in mind.",
  },
  {
    value: "item-2",
    trigger: "Is it styled?",
    content:
      "Yes. It comes with default styles that match the other components' aesthetic. You can also customize it with your own styles.",
  },
  {
    value: "item-3",
    trigger: "Is it animated?",
    content:
      "Yes. It's animated by default, but you can disable it if you prefer. The animations are smooth and performant.",
  },
];

// Default story using wrapper mode
const DefaultComponent = (args: AccordionStoryProps) => {
  const accordionProps = args as Parameters<typeof Accordion>[0];
  return (
    <div className="w-[400px]">
      <Accordion {...accordionProps} items={defaultItems} />
    </div>
  );
};

export const Default: Story = {
  render: DefaultComponent,
  args: {
    type: "single",
    collapsible: true,
    variant: "default",
  },
};

// Variants story
const VariantsComponent = (args: AccordionStoryProps) => {
  return (
    <div className="w-[400px] space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <Accordion
          type="single"
          collapsible
          variant="default"
          items={defaultItems}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Bordered</h3>
        <Accordion
          type="single"
          collapsible
          variant="bordered"
          items={defaultItems}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Separated</h3>
        <Accordion
          type="single"
          collapsible
          variant="separated"
          items={defaultItems}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Ghost</h3>
        <Accordion
          type="single"
          collapsible
          variant="ghost"
          items={defaultItems}
        />
      </div>
    </div>
  );
};

export const Variants: Story = {
  render: VariantsComponent,
  args: {
    type: "single",
  },
  parameters: {
    controls: { disable: true },
  },
};

// Multiple selection story
const MultipleComponent = (args: AccordionStoryProps) => {
  return (
    <div className="w-[400px]">
      <Accordion
        type="multiple"
        defaultValue={["item-1", "item-2"]}
        items={defaultItems}
      />
    </div>
  );
};

export const Multiple: Story = {
  render: MultipleComponent,
  args: {
    type: "multiple",
  },
  parameters: {
    controls: { disable: true },
  },
};

// Primitive usage story
export const Primitive = () => {
  return (
    <div className="w-[400px]">
      <Accordion type="single" collapsible>
        <Accordion.Item value="account">
          <Accordion.Trigger>
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <span>Account Settings</span>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Manage your account settings and preferences.</p>
              <ul className="list-disc list-inside">
                <li>Profile information</li>
                <li>Email preferences</li>
                <li>Password settings</li>
              </ul>
            </div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="billing">
          <Accordion.Trigger>
            <div className="flex items-center gap-2">
              <CreditCard className="size-4" />
              <span>Billing Information</span>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>View and manage your billing details.</p>
              <ul className="list-disc list-inside">
                <li>Payment methods</li>
                <li>Billing history</li>
                <li>Invoices</li>
              </ul>
            </div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="notifications">
          <Accordion.Trigger>
            <div className="flex items-center gap-2">
              <Bell className="size-4" />
              <span>Notifications</span>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Configure your notification preferences.</p>
              <ul className="list-disc list-inside">
                <li>Email notifications</li>
                <li>Push notifications</li>
                <li>SMS alerts</li>
              </ul>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

// Custom content story
export const CustomContent = () => {
  const customItems = [
    {
      value: "settings",
      trigger: (
        <div className="flex items-center gap-2">
          <Settings className="size-4" />
          <span className="font-semibold">Settings</span>
        </div>
      ),
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Enable notifications</span>
            <input type="checkbox" className="size-4" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Dark mode</span>
            <input type="checkbox" className="size-4" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Auto-save</span>
            <input type="checkbox" className="size-4" defaultChecked />
          </div>
        </div>
      ),
    },
    {
      value: "info",
      trigger: (
        <div className="flex items-center gap-2">
          <Info className="size-4" />
          <span className="font-semibold">Information</span>
        </div>
      ),
      content: (
        <div className="space-y-2 text-sm">
          <p>Version: 1.0.0</p>
          <p>Last updated: December 3, 2025</p>
          <p>License: MIT</p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-[400px]">
      <Accordion
        type="single"
        collapsible
        variant="bordered"
        items={customItems}
      />
    </div>
  );
};

// Disabled items story
const DisabledItemsComponent = (args: AccordionStoryProps) => {
  const itemsWithDisabled = [
    {
      value: "item-1",
      trigger: "Available Item",
      content: "This item is available and can be expanded.",
    },
    {
      value: "item-2",
      trigger: "Disabled Item",
      content: "This content won't be visible because the item is disabled.",
      disabled: true,
    },
    {
      value: "item-3",
      trigger: "Another Available Item",
      content: "This item is also available and can be expanded.",
    },
  ];

  return (
    <div className="w-[400px]">
      <Accordion type="single" collapsible items={itemsWithDisabled} />
    </div>
  );
};

export const DisabledItems: Story = {
  render: DisabledItemsComponent,
  args: {
    type: "single",
  },
  parameters: {
    controls: { disable: true },
  },
};

// Default open story
const DefaultOpenComponent = (args: AccordionStoryProps) => {
  return (
    <div className="w-[400px]">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-2"
        items={defaultItems}
      />
    </div>
  );
};

export const DefaultOpen: Story = {
  render: DefaultOpenComponent,
  args: {
    type: "single",
  },
  parameters: {
    controls: { disable: true },
  },
};

// FAQ example
const FAQComponent = (args: AccordionStoryProps) => {
  const faqItems = [
    {
      value: "faq-1",
      trigger: "How do I install the design system?",
      content:
        "You can install the design system by running 'pnpm add @dsui/ui' in your project. Make sure you have the required peer dependencies installed.",
    },
    {
      value: "faq-2",
      trigger: "Can I customize the theme?",
      content:
        "Yes! The design system uses CSS variables for theming. You can customize colors, spacing, fonts, and more by overriding these variables in your global CSS.",
    },
    {
      value: "faq-3",
      trigger: "Is TypeScript supported?",
      content:
        "Absolutely! All components are written in TypeScript and include comprehensive type definitions. You'll get full IntelliSense and type checking out of the box.",
    },
    {
      value: "faq-4",
      trigger: "How do I report bugs or request features?",
      content:
        "You can create issues on our GitHub repository. Please provide detailed information including reproduction steps, expected behavior, and screenshots if applicable.",
    },
  ];

  return (
    <div className="w-[500px]">
      <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
      <Accordion
        type="single"
        collapsible
        variant="separated"
        items={faqItems}
      />
    </div>
  );
};

export const FAQ: Story = {
  render: FAQComponent,
  args: {
    type: "single",
  },
  parameters: {
    controls: { disable: true },
  },
};

// Colors story
const ColorsComponent = (args: AccordionStoryProps) => {
  return (
    <div className="w-[400px] space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Primary</h3>
        <Accordion
          type="single"
          collapsible
          variant="default"
          color="primary"
          items={defaultItems}
          defaultValue="item-1"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Secondary</h3>
        <Accordion
          type="single"
          collapsible
          variant="ghost"
          color="secondary"
          items={defaultItems}
          defaultValue="item-1"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Custom color</h3>
        <Accordion
          type="single"
          collapsible
          variant="separated"
          items={defaultItems}
          defaultValue="item-1"
          triggerClassName="data-[state=open]:bg-purple-500/10 data-[state=open]:text-purple-500 rounded-b-none"
          contentClassName="bg-purple-500/10 rounded-b-md"
        />
      </div>
    </div>
  );
};

export const Colors: Story = {
  render: ColorsComponent,
  args: {},
  parameters: {
    controls: { disable: true },
  },
};

export const Playground = () => {
  const trigger = (item: any) => {
    return (
      <span className="flex items-center gap-4">
        <item.icon className="size-4 shrink-0" />
        <span>{item.title}</span>
      </span>
    );
  };

  const content = (item: any) => {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">{item.content}</p>
        <img src={item.media} alt={item.title} className="w-full rounded-md" />
      </div>
    );
  };

  const items: AccordionItemConfig[] = [
    {
      value: "item-1",
      trigger: trigger({
        icon: PackageIcon,
        title: "How do I track my order?",
      }),
      content: content({
        content:
          "You'll receive tracking information via email once your order ships.",
        media:
          "https://cdn.shadcnstudio.com/ss-assets/components/accordion/image-1.jpg?width=520&format=auto",
      }),
    },
    {
      value: "item-2",
      trigger: trigger({
        icon: RefreshCwIcon,
        title: "What is your return policy?",
      }),
      content: content({
        content: "We offer a 30-day return policy for most items.",
        media:
          "https://cdn.shadcnstudio.com/ss-assets/components/accordion/image-2.jpg?width=520&format=auto",
        title: "What is your return policy?",
      }),
    },
    {
      value: "item-3",
      trigger: trigger({
        icon: HeadsetIcon,
        title: "How can I contact customer support?",
      }),
      content: content({
        content:
          "You can reach us via live chat, email at support@example.com, or by phone at 1-800-123-4567.",
        media:
          "https://cdn.shadcnstudio.com/ss-assets/components/accordion/image-3.jpg?width=520&format=auto",
        title: "How can I contact customer support?",
      }),
    },
  ];

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
      items={items}
    />
  );
};
