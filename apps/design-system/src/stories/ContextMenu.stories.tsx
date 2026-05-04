import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ContextMenu, type ContextMenuProps } from "../components/ContextMenu";
import {
  User,
  Settings,
  Copy,
  Edit,
  Trash2,
  Share,
  Download,
  Upload,
  Mail,
  MessageSquare,
  PlusCircle,
  Cloud,
  Github,
  Keyboard,
  CreditCard,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import i18n from "../../.storybook/i18n";
import type { ContextMenuItem } from "@/components/ContextMenu/ContextMenu";

const meta: Meta<typeof ContextMenu> = {
  title: "Overlays/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onOpenChange: {
      description: i18n.t(
        "stories.contextmenu.argTypes.onOpenChange.description"
      ),
      table: {
        type: { summary: "(open: boolean) => void" },
        category: i18n.t("stories.category.events"),
      },
    },
    modal: {
      control: "boolean",
      description: i18n.t("stories.contextmenu.argTypes.modal.description"),
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    trigger: {
      description: i18n.t("stories.contextmenu.argTypes.trigger.description"),
      table: {
        type: { summary: "React.ReactNode" },
        category: i18n.t("stories.category.content"),
      },
    },
    children: {
      description: i18n.t("stories.contextmenu.argTypes.children.description"),
      table: {
        type: { summary: "React.ReactNode" },
        category: i18n.t("stories.category.content"),
      },
    },
    content: {
      description: i18n.t("stories.contextmenu.argTypes.content.description"),
      table: {
        type: { summary: "React.ReactNode" },
        category: i18n.t("stories.category.content"),
      },
    },
    items: {
      description: i18n.t("stories.contextmenu.argTypes.items.description"),
      table: {
        type: { summary: "ContextMenuItem[]" },
        category: i18n.t("stories.category.content"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.contextmenu.argTypes.className.description"),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.advanced"),
      },
    },
    contentClassName: {
      control: "text",
      description: i18n.t(
        "stories.contextmenu.argTypes.contentClassName.description"
      ),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.advanced"),
      },
    },
    triggerClassName: {
      control: "text",
      description: i18n.t(
        "stories.contextmenu.argTypes.triggerClassName.description"
      ),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<ContextMenuProps>;

// Basic context menu with items prop
export const Default: Story = {
  render: () => {
    const menuItems: ContextMenuItem[] = [
      {
        key: "back",
        label: "Back",
        shortcut: "⌘[",
        onClick: () => console.log("Back clicked"),
      },
      {
        key: "forward",
        label: "Forward",
        shortcut: "⌘]",
        disabled: true,
        onClick: () => console.log("Forward clicked"),
      },
      {
        key: "reload",
        label: "Reload",
        shortcut: "⌘R",
        onClick: () => console.log("Reload clicked"),
      },
      {
        key: "separator1",
        type: "separator",
      },
      {
        key: "save",
        label: "Save Page As...",
        shortcut: "⌘S",
        onClick: () => console.log("Save clicked"),
      },
      {
        key: "print",
        label: "Print...",
        shortcut: "⌘P",
        onClick: () => console.log("Print clicked"),
      },
    ];

    return (
      <ContextMenu
        trigger={
          <div className="ds:flex h-[200px] w-[300px] ds:items-center ds:justify-center ds:rounded-md ds:border ds:border-dashed ds:text-sm">
            {"Right click here"}
          </div>
        }
        items={menuItems}
      />
    );
  },
};

// With item types (checkbox, radio, separator, group)
export const WithItemTypes: Story = {
  render: () => {
    const WithItemTypesExample = () => {
      const [showBookmarks, setShowBookmarks] = useState(true);
      const [showUrls, setShowUrls] = useState(false);

      const menuItems: ContextMenuItem[] = [
        {
          key: "label1",
          type: "label",
          label: "My Account",
          inset: true,
        },
        {
          key: "profile",
          label: "Profile",
          icon: <User className="ds:h-4 ds:w-4" />,
          shortcut: "⇧⌘P",
          onClick: () => console.log("Profile clicked"),
        },
        {
          key: "settings",
          label: "Settings",
          icon: <Settings className="ds:h-4 ds:w-4" />,
          shortcut: "⌘,",
          onClick: () => console.log("Settings clicked"),
        },
        {
          key: "separator1",
          type: "separator",
        },
        {
          key: "bookmarks",
          type: "checkbox",
          label: "Show Bookmarks",
          shortcut: "⌘B",
          checked: showBookmarks,
          onCheckedChange: setShowBookmarks,
        },
        {
          key: "urls",
          type: "checkbox",
          label: "Show Full URLs",
          checked: showUrls,
          onCheckedChange: setShowUrls,
        },
        {
          key: "separator2",
          type: "separator",
        },
        {
          key: "delete",
          label: "Delete",
          icon: <Trash2 className="ds:h-4 ds:w-4" />,
          variant: "destructive",
          shortcut: "⌘⌫",
          onClick: () => console.log("Delete clicked"),
        },
      ];

      return (
        <ContextMenu
          trigger={
            <div className="ds:flex h-[200px] w-[300px] ds:items-center ds:justify-center ds:rounded-md ds:border ds:border-dashed ds:text-sm">
              Right click to see checkboxes
            </div>
          }
          items={menuItems}
        />
      );
    };
    return <WithItemTypesExample />;
  },
};

// With submenus
export const WithSubmenu: Story = {
  render: () => {
    const menuItems: ContextMenuItem[] = [
      {
        key: "new-tab",
        label: "New Tab",
        shortcut: "⌘T",
      },
      {
        key: "new-window",
        label: "New Window",
        shortcut: "⌘N",
      },
      {
        key: "separator1",
        type: "separator",
      },
      {
        key: "share",
        label: "Share",
        icon: <Share className="ds:h-4 ds:w-4" />,
        children: [
          {
            key: "email",
            label: "Email Link",
            icon: <Mail className="ds:h-4 ds:w-4" />,
            onClick: () => console.log("Email clicked"),
          },
          {
            key: "messages",
            label: "Messages",
            icon: <MessageSquare className="ds:h-4 ds:w-4" />,
            onClick: () => console.log("Messages clicked"),
          },
          {
            key: "separator-sub",
            type: "separator",
          },
          {
            key: "notes",
            label: "Notes",
            onClick: () => console.log("Notes clicked"),
          },
        ],
      },
      {
        key: "more-tools",
        label: "More Tools",
        children: [
          {
            key: "save-page",
            label: "Save Page As...",
            shortcut: "⌘S",
          },
          {
            key: "create-shortcut",
            label: "Create Shortcut...",
          },
          {
            key: "developer",
            label: "Developer Tools",
            children: [
              { key: "inspect", label: "Inspect Element" },
              { key: "console", label: "Console" },
              { key: "network", label: "Network" },
            ],
          },
        ],
      },
      {
        key: "separator2",
        type: "separator",
      },
      {
        key: "print",
        label: "Print",
        shortcut: "⌘P",
      },
    ];

    return (
      <ContextMenu
        trigger={
          <div className="ds:flex h-[200px] w-[300px] ds:items-center ds:justify-center ds:rounded-md ds:border ds:border-dashed ds:text-sm">
            Right click to see submenus
          </div>
        }
        items={menuItems}
      />
    );
  },
};

// With groups
export const WithGroups: Story = {
  render: () => {
    const menuItems: ContextMenuItem[] = [
      {
        key: "group-actions",
        type: "group",
        label: "Actions",
        children: [
          {
            key: "copy",
            label: "Copy",
            icon: <Copy className="ds:h-4 ds:w-4" />,
            shortcut: "⌘C",
          },
          {
            key: "edit",
            label: "Edit",
            icon: <Edit className="ds:h-4 ds:w-4" />,
            shortcut: "⌘E",
          },
        ],
      },
      {
        key: "separator1",
        type: "separator",
      },
      {
        key: "group-files",
        type: "group",
        label: "Files",
        children: [
          {
            key: "download",
            label: "Download",
            icon: <Download className="ds:h-4 ds:w-4" />,
            shortcut: "⌘D",
          },
          {
            key: "upload",
            label: "Upload",
            icon: <Upload className="ds:h-4 ds:w-4" />,
            shortcut: "⌘U",
          },
        ],
      },
      {
        key: "separator2",
        type: "separator",
      },
      {
        key: "delete",
        label: "Delete",
        icon: <Trash2 className="ds:h-4 ds:w-4" />,
        variant: "destructive",
        shortcut: "⌘⌫",
      },
    ];

    return (
      <ContextMenu
        trigger={
          <div className="ds:flex h-[200px] w-[300px] ds:items-center ds:justify-center ds:rounded-md ds:border ds:border-dashed ds:text-sm">
            Right click to see groups
          </div>
        }
        items={menuItems}
      />
    );
  },
};

// Compound pattern usage
export const Primitive: Story = {
  name: "Primitive (Manual Composition)",
  render: () => {
    const PrimitiveExample = () => {
      const [theme, setTheme] = useState("system");

      return (
        <ContextMenu>
          <ContextMenu.Trigger asChild>
            <div className="ds:flex h-[200px] w-[300px] ds:items-center ds:justify-center ds:rounded-md ds:border ds:border-dashed ds:text-sm">
              Right click (Compound Pattern)
            </div>
          </ContextMenu.Trigger>
          <ContextMenu.Content className="ds:w-64">
            <ContextMenu.Item>
              <User className="ds:h-4 ds:w-4" />
              Profile
              <ContextMenu.Shortcut>⇧⌘P</ContextMenu.Shortcut>
            </ContextMenu.Item>
            <ContextMenu.Item>
              <CreditCard className="ds:h-4 ds:w-4" />
              Billing
              <ContextMenu.Shortcut>⌘B</ContextMenu.Shortcut>
            </ContextMenu.Item>
            <ContextMenu.Item>
              <Settings className="ds:h-4 ds:w-4" />
              Settings
              <ContextMenu.Shortcut>⌘,</ContextMenu.Shortcut>
            </ContextMenu.Item>
            <ContextMenu.Item>
              <Keyboard className="ds:h-4 ds:w-4" />
              Keyboard shortcuts
              <ContextMenu.Shortcut>⌘K</ContextMenu.Shortcut>
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Group>
              <ContextMenu.Label>Team</ContextMenu.Label>
              <ContextMenu.Item>
                <PlusCircle className="ds:h-4 ds:w-4" />
                Invite users
              </ContextMenu.Item>
            </ContextMenu.Group>
            <ContextMenu.Separator />
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger>
                <Cloud className="ds:h-4 ds:w-4" />
                Theme
              </ContextMenu.SubTrigger>
              <ContextMenu.SubContent>
                <ContextMenu.RadioGroup value={theme} onValueChange={setTheme}>
                  <ContextMenu.RadioItem value="light">
                    Light
                  </ContextMenu.RadioItem>
                  <ContextMenu.RadioItem value="dark">
                    Dark
                  </ContextMenu.RadioItem>
                  <ContextMenu.RadioItem value="system">
                    System
                  </ContextMenu.RadioItem>
                </ContextMenu.RadioGroup>
              </ContextMenu.SubContent>
            </ContextMenu.Sub>
            <ContextMenu.Separator />
            <ContextMenu.Item>
              <Github className="ds:h-4 ds:w-4" />
              GitHub
            </ContextMenu.Item>
            <ContextMenu.Item>
              <LifeBuoy className="ds:h-4 ds:w-4" />
              Support
            </ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item variant="destructive">
              <LogOut className="ds:h-4 ds:w-4" />
              Log out
              <ContextMenu.Shortcut>⇧⌘Q</ContextMenu.Shortcut>
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu>
      );
    };
    return <PrimitiveExample />;
  },
};

// With radio group
export const WithRadioGroup: Story = {
  render: () => {
    const RadioGroupExample = () => {
      const [person, setPerson] = useState("pedro");
      return (
        <ContextMenu>
          <ContextMenu.Trigger asChild>
            <div className="ds:flex h-[200px] w-[300px] ds:items-center ds:justify-center ds:rounded-md ds:border ds:border-dashed ds:text-sm">
              Right click to select person
            </div>
          </ContextMenu.Trigger>
          <ContextMenu.Content className="ds:w-48">
            <ContextMenu.Label>People</ContextMenu.Label>
            <ContextMenu.RadioGroup value={person} onValueChange={setPerson}>
              <ContextMenu.RadioItem value="pedro">
                Pedro Duarte
              </ContextMenu.RadioItem>
              <ContextMenu.RadioItem value="colm">
                Colm Tuite
              </ContextMenu.RadioItem>
              <ContextMenu.RadioItem value="tim">
                Tim Neutkens
              </ContextMenu.RadioItem>
            </ContextMenu.RadioGroup>
          </ContextMenu.Content>
        </ContextMenu>
      );
    };
    return <RadioGroupExample />;
  },
};

// File manager style context menu
export const FileManagerExample: Story = {
  render: () => {
    const menuItems: ContextMenuItem[] = [
      {
        key: "open",
        label: "Open",
        shortcut: "Enter",
      },
      {
        key: "open-with",
        label: "Open with...",
        children: [
          { key: "vscode", label: "Visual Studio Code" },
          { key: "sublime", label: "Sublime Text" },
          { key: "notepad", label: "Notepad" },
          { key: "separator", type: "separator" },
          { key: "choose", label: "Choose another app..." },
        ],
      },
      {
        key: "separator1",
        type: "separator",
      },
      {
        key: "cut",
        label: "Cut",
        shortcut: "⌘X",
      },
      {
        key: "copy",
        label: "Copy",
        shortcut: "⌘C",
      },
      {
        key: "paste",
        label: "Paste",
        shortcut: "⌘V",
        disabled: true,
      },
      {
        key: "separator2",
        type: "separator",
      },
      {
        key: "rename",
        label: "Rename",
        shortcut: "F2",
      },
      {
        key: "delete",
        label: "Move to Trash",
        variant: "destructive",
        shortcut: "⌘⌫",
      },
      {
        key: "separator3",
        type: "separator",
      },
      {
        key: "properties",
        label: "Get Info",
        shortcut: "⌘I",
      },
    ];

    return (
      <div className="ds:flex h-[200px] w-[300px] ds:items-center ds:justify-center ds:rounded-md ds:border ds:bg-muted/50">
        <ContextMenu
          trigger={
            <div className="ds:flex ds:flex-col ds:items-center ds:gap-2 ds:text-muted-foreground">
              <div className="ds:h-16 ds:w-14 ds:rounded ds:border ds:bg-background ds:flex ds:items-center ds:justify-center">
                📄
              </div>
              <span className="ds:text-sm">document.txt</span>
            </div>
          }
          items={menuItems}
        />
      </div>
    );
  },
};

// Disabled items example
export const WithDisabledItems: Story = {
  render: () => {
    const menuItems: ContextMenuItem[] = [
      {
        key: "enabled-item",
        label: "Enabled Item",
        icon: <User className="ds:h-4 ds:w-4" />,
        onClick: () => console.log("Enabled item clicked"),
      },
      {
        key: "disabled-item",
        label: "Disabled Item",
        icon: <Settings className="ds:h-4 ds:w-4" />,
        disabled: true,
      },
      {
        key: "separator1",
        type: "separator",
      },
      {
        key: "checkbox-disabled",
        type: "checkbox",
        label: "Disabled Checkbox",
        checked: false,
        disabled: true,
      },
      {
        key: "checkbox-enabled",
        type: "checkbox",
        label: "Enabled Checkbox",
        checked: true,
      },
      {
        key: "separator2",
        type: "separator",
      },
      {
        key: "submenu-disabled",
        label: "Disabled Submenu",
        disabled: true,
        children: [
          { key: "sub1", label: "Sub Item 1" },
          { key: "sub2", label: "Sub Item 2" },
        ],
      },
      {
        key: "submenu-enabled",
        label: "Enabled Submenu",
        children: [
          { key: "sub3", label: "Sub Item 1" },
          { key: "sub4", label: "Sub Item 2" },
        ],
      },
    ];

    return (
      <ContextMenu
        trigger={
          <div className="ds:flex h-[200px] w-[300px] ds:items-center ds:justify-center ds:rounded-md ds:border ds:border-dashed ds:text-sm">
            Right click to see disabled states
          </div>
        }
        items={menuItems}
      />
    );
  },
};
