import type { Meta, StoryObj } from "@storybook/react";
import { Command, type CommandItemType } from "../components/Command";
import {
  Search,
  Calendar,
  Settings,
  User,
  Smile,
  Calculator,
  CreditCard,
} from "lucide-react";
import i18n from "../../.storybook/i18n";
import React from "react";

const meta: Meta<typeof Command> = {
  title: "Overlays/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: i18n.t("stories.command.argTypes.className.description"),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.advanced"),
      },
    },
    children: {
      description: i18n.t("stories.command.argTypes.children.description"),
      table: {
        type: { summary: "React.ReactNode" },
        category: i18n.t("stories.category.content"),
      },
    },
    items: {
      description: i18n.t("stories.command.argTypes.items.description"),
      table: {
        type: { summary: "CommandItemType[]" },
        category: i18n.t("stories.category.content"),
      },
    },
    search: {
      control: "text",
      description: i18n.t("stories.command.argTypes.search.description"),
      table: {
        type: { summary: "boolean | string" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    open: {
      control: "boolean",
      description: "Whether the command dialog is open",
      table: {
        type: { summary: "boolean" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the command dialog is open by default",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    onOpenChange: {
      description: "Callback when the command dialog open state changes",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: i18n.t("stories.category.events"),
      },
    },
    modal: {
      control: "boolean",
      description: "Whether the command dialog should be modal",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    title: {
      control: "text",
      description: "Title for the command dialog",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Command Palette"' },
        category: i18n.t("stories.category.content"),
      },
    },
    description: {
      control: "text",
      description: "Description for the command dialog",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Search for a command to run..."' },
        category: i18n.t("stories.category.content"),
      },
    },
    showCloseButton: {
      control: "boolean",
      description: "Whether to show the close button in the dialog",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.behavior"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

// Default command
export const Default: Story = {
  render: () => {
    const items = [
      {
        type: "group",
        heading: "Suggestions",
        items: [
          { type: "item", label: "Calendar", icon: Calendar },
          { type: "item", label: "Search Emoji", icon: Smile },
          {
            type: "item",
            label: "Calculator",
            icon: Calculator,
            disabled: true,
          },
        ],
      },
      { type: "separator" },
      {
        type: "group",
        heading: "Settings",
        items: [
          {
            type: "item",
            label: "Profile",
            icon: User,
            shortcut: "⌘P",
          },
          {
            type: "item",
            label: "Billing",
            icon: CreditCard,
            shortcut: "⌘B",
          },
          {
            type: "item",
            label: "Settings",
            icon: Settings,
            shortcut: "⌘S",
          },
        ],
      },
    ] satisfies CommandItemType[];

    return (
      <Command
        className="rounded-lg border shadow-md md:min-w-[450px]"
        items={items}
        search
      />
    );
  },
};

// With dialog
export const WithDialog = () => {
  const [open, setOpen] = React.useState(false);

  const items = [
    {
      type: "group",
      heading: "Suggestions",
      items: [
        { type: "item", label: "Calendar", icon: Calendar },
        { type: "item", label: "Search Emoji", icon: Smile },
        {
          type: "item",
          label: "Calculator",
          icon: Calculator,
          disabled: true,
        },
      ],
    },
    { type: "separator" },
    {
      type: "group",
      heading: "Settings",
      items: [
        {
          type: "item",
          label: "Profile",
          icon: User,
          shortcut: "⌘P",
        },
        {
          type: "item",
          label: "Billing",
          icon: CreditCard,
          shortcut: "⌘B",
        },
        {
          type: "item",
          label: "Settings",
          icon: Settings,
          shortcut: "⌘S",
        },
      ],
    },
  ] satisfies CommandItemType[];

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p
        className="text-muted-foreground text-sm"
        onClick={() => setOpen(true)}
      >
        Press{" "}
        <div className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>J
        </div>
      </p>
      <Command items={items} search open={open} onOpenChange={setOpen} modal />
    </>
  );
};

// With manual usage
export const Manual: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item>
            <Calendar />
            <span>Calendar</span>
          </Command.Item>
          <Command.Item>
            <Smile />
            <span>Search Emoji</span>
          </Command.Item>
          <Command.Item disabled>
            <Calculator />
            <span>Calculator</span>
          </Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Settings">
          <Command.Item>
            <User />
            <span>Profile</span>
            <Command.Shortcut>⌘P</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            <CreditCard />
            <span>Billing</span>
            <Command.Shortcut>⌘B</Command.Shortcut>
          </Command.Item>
          <Command.Item>
            <Settings />
            <span>Settings</span>
            <Command.Shortcut>⌘S</Command.Shortcut>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  ),
};

// Empty state
export const Empty: Story = {
  render: () => (
    <Command className="w-80">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
      </Command.List>
    </Command>
  ),
};

// Custom styled
export const CustomStyled: Story = {
  render: () => (
    <Command className="w-80 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Suggestions">
          <Command.Item>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </Command.Item>
          <Command.Item>
            <Search className="mr-2 h-4 w-4" />
            <span>Search</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command>
  ),
};
