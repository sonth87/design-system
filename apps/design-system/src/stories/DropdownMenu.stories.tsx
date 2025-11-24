import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  DropdownMenu,
  type DropdownMenuProps,
} from "../components/DropdownMenu";
import Button from "../components/Button/Button";
import {
  Settings,
  User,
  Info,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Share,
  Download,
  Upload,
  Check,
  Circle,
} from "lucide-react";
import i18n from "../../.storybook/i18n";
import { fn } from "storybook/test";
import type { DropdownMenuItem } from "@/components/DropdownMenu/DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Overlays/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: i18n.t("stories.dropdownmenu.argTypes.open.description"),
      table: {
        type: { summary: "boolean" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    defaultOpen: {
      control: "boolean",
      description: i18n.t(
        "stories.dropdownmenu.argTypes.defaultOpen.description",
      ),
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    onOpenChange: {
      description: i18n.t(
        "stories.dropdownmenu.argTypes.onOpenChange.description",
      ),
      table: {
        type: { summary: "(open: boolean) => void" },
        category: i18n.t("stories.category.events"),
      },
    },
    modal: {
      control: "boolean",
      description: i18n.t("stories.dropdownmenu.argTypes.modal.description"),
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    trigger: {
      description: i18n.t("stories.dropdownmenu.argTypes.trigger.description"),
      table: {
        type: { summary: "React.ReactNode" },
        category: i18n.t("stories.category.content"),
      },
    },
    children: {
      description: i18n.t("stories.dropdownmenu.argTypes.children.description"),
      table: {
        type: { summary: "React.ReactNode" },
        category: i18n.t("stories.category.content"),
      },
    },
    content: {
      description: i18n.t("stories.dropdownmenu.argTypes.content.description"),
      table: {
        type: { summary: "React.ReactNode" },
        category: i18n.t("stories.category.content"),
      },
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: i18n.t("stories.dropdownmenu.argTypes.side.description"),
      table: {
        type: { summary: "enum" },
        defaultValue: { summary: "bottom" },
        category: i18n.t("stories.category.layout"),
      },
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: i18n.t("stories.dropdownmenu.argTypes.align.description"),
      table: {
        type: { summary: "enum" },
        defaultValue: { summary: "start" },
        category: i18n.t("stories.category.layout"),
      },
    },
    sideOffset: {
      control: "number",
      description: i18n.t(
        "stories.dropdownmenu.argTypes.sideOffset.description",
      ),
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "4" },
        category: i18n.t("stories.category.layout"),
      },
    },
    alignOffset: {
      control: "number",
      description: i18n.t(
        "stories.dropdownmenu.argTypes.alignOffset.description",
      ),
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
        category: i18n.t("stories.category.layout"),
      },
    },
    portal: {
      control: "boolean",
      description: i18n.t("stories.dropdownmenu.argTypes.portal.description"),
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    className: {
      control: "text",
      description: i18n.t(
        "stories.dropdownmenu.argTypes.className.description",
      ),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.advanced"),
      },
    },
    contentClassName: {
      control: "text",
      description: i18n.t(
        "stories.dropdownmenu.argTypes.contentClassName.description",
      ),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.advanced"),
      },
    },
    triggerClassName: {
      control: "text",
      description: i18n.t(
        "stories.dropdownmenu.argTypes.triggerClassName.description",
      ),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.advanced"),
      },
    },
    items: {
      description: "Array of menu items for simplified API",
      table: {
        type: { summary: "DropdownMenuItem[]" },
        category: i18n.t("stories.category.content"),
      },
    },
    contextMenu: {
      control: "boolean",
      description: "Enable context menu mode (right-click to open)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<DropdownMenuProps>;

// Basic dropdown menu
export const Default: Story = {
  render: () => {
    const menuItems: DropdownMenuItem[] = [
      {
        key: "enabled-item",
        label: "Enabled Item",
        icon: <User className="h-4 w-4" />,
        onClick: () => console.log("Enabled item clicked"),
      },
      {
        key: "disabled-item",
        label: "Disabled Item",
        icon: <Settings className="h-4 w-4" />,
        disabled: true,
        onClick: () => console.log("This should not be called"),
      },
      {
        key: "separator1",
        type: "separator",
      },
      {
        key: "group1",
        type: "group",
        label: "Actions",
        children: [
          {
            key: "copy",
            label: "Copy",
            icon: <Copy className="h-4 w-4" />,
            onClick: fn(),
          },
          {
            key: "edit-disabled",
            label: "Edit (Disabled)",
            icon: <Edit className="h-4 w-4" />,
            disabled: true,
            onClick: () => console.log("Edit disabled clicked"),
          },
        ],
      },
      {
        key: "separator2",
        type: "separator",
      },
      {
        key: "checkbox-disabled",
        label: "Disabled Checkbox",
        type: "checkbox",
        checked: false,
        disabled: true,
      },
      {
        key: "radio-disabled",
        label: "Disabled Radio",
        type: "radio",
        group: "test",
        disabled: true,
      },
      {
        key: "submenu",
        label: "Submenu",
        children: [
          {
            key: "submenu-item",
            label: "Submenu Item",
            onClick: () => console.log("Submenu item clicked"),
          },
        ],
      },
      {
        key: "submenu-disabled",
        label: "Disabled Submenu",
        disabled: true,
        children: [
          {
            key: "submenu-item1",
            label: "Submenu Item",
            onClick: () => console.log("Submenu item clicked"),
          },
        ],
      },
    ];

    return (
      <DropdownMenu
        trigger={
          <Button variant="outline">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
        items={menuItems}
      />
    );
  },
};

// With different item types
export const WithItemTypes: Story = {
  render: () => (
    <DropdownMenu
      trigger={
        <Button variant="outline">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      }
      content={
        <div className="w-48">
          <DropdownMenu.Item>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem checked={true}>
            <Check className="mr-2 h-4 w-4" />
            Show notifications
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem checked={false}>
            <Circle className="mr-2 h-4 w-4" />
            Auto-save
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.Separator />
          <DropdownMenu.Item variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenu.Item>
        </div>
      }
    />
  ),
};

// With radio group
export const WithRadioGroup: Story = {
  render: () => {
    const RadioGroupExample = () => {
      const [theme, setTheme] = useState("light");
      return (
        <DropdownMenu
          trigger={<Button variant="outline">Theme: {theme}</Button>}
          content={
            <div className="w-48">
              <DropdownMenu.Label>Theme</DropdownMenu.Label>
              <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenu.RadioItem value="light">
                  Light
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="dark">
                  Dark
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="system">
                  System
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </div>
          }
        />
      );
    };
    return <RadioGroupExample />;
  },
};

// With submenus
export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu
      trigger={
        <Button variant="outline">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      }
      content={
        <div className="w-48">
          <DropdownMenu.Item>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Share className="mr-2 h-4 w-4" />
            Share
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Download className="mr-2 h-4 w-4" />
              Export
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>PDF</DropdownMenu.Item>
              <DropdownMenu.Item>PNG</DropdownMenu.Item>
              <DropdownMenu.Item>SVG</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item>From file</DropdownMenu.Item>
              <DropdownMenu.Item>From URL</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </div>
      }
    />
  ),
};

// Different sides
export const Sides: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <DropdownMenu
        trigger={<Button variant="outline">Bottom</Button>}
        side="bottom"
        content={
          <div className="w-32">
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          </div>
        }
      />

      <DropdownMenu
        trigger={<Button variant="outline">Top</Button>}
        side="top"
        content={
          <div className="w-32">
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          </div>
        }
      />

      <DropdownMenu
        trigger={<Button variant="outline">Right</Button>}
        side="right"
        content={
          <div className="w-32">
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          </div>
        }
      />

      <DropdownMenu
        trigger={<Button variant="outline">Left</Button>}
        side="left"
        content={
          <div className="w-32">
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          </div>
        }
      />
    </div>
  ),
};

// Different alignments
export const Alignments: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <DropdownMenu
        trigger={<Button variant="outline">Start</Button>}
        align="start"
        content={
          <div className="w-32">
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          </div>
        }
      />

      <DropdownMenu
        trigger={<Button variant="outline">Center</Button>}
        align="center"
        content={
          <div className="w-32">
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          </div>
        }
      />

      <DropdownMenu
        trigger={<Button variant="outline">End</Button>}
        align="end"
        content={
          <div className="w-32">
            <DropdownMenu.Item>Item 1</DropdownMenu.Item>
            <DropdownMenu.Item>Item 2</DropdownMenu.Item>
          </div>
        }
      />
    </div>
  ),
};

// Controlled dropdown menu
export const Controlled: Story = {
  render: function ControlledDropdownMenu() {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Menu</Button>
          <Button onClick={() => setOpen(false)}>Close Menu</Button>
        </div>
        <DropdownMenu
          open={open}
          onOpenChange={setOpen}
          trigger={<Button variant="outline">Controlled Menu</Button>}
          content={
            <div className="w-48">
              <DropdownMenu.Item>Item 1</DropdownMenu.Item>
              <DropdownMenu.Item>Item 2</DropdownMenu.Item>
              <DropdownMenu.Item>Item 3</DropdownMenu.Item>
            </div>
          }
        />
      </div>
    );
  },
};

// With custom styling
export const CustomStyled: Story = {
  render: () => (
    <DropdownMenu
      trigger={
        <Button variant="outline" className="bg-purple-50 hover:bg-purple-100">
          Custom Style
        </Button>
      }
      contentClassName="bg-purple-50 border-purple-200"
      content={
        <div className="w-48">
          <DropdownMenu.Item className="hover:bg-purple-100">
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item className="hover:bg-purple-100">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenu.Item>
        </div>
      }
    />
  ),
};

// Using items prop (simplified API)
export const WithItemsProp: Story = {
  render: () => {
    const menuItems: DropdownMenuItem[] = [
      {
        key: "profile",
        label: "Profile",
        icon: <User className="h-4 w-4" />,
        onClick: () => console.log("Profile clicked"),
      },
      {
        key: "settings",
        label: "Settings",
        icon: <Settings className="h-4 w-4" />,
        onClick: () => console.log("Settings clicked"),
      },
      {
        key: "separator1",
        type: "separator",
      },
      {
        key: "group1",
        type: "group",
        label: "Actions",
        children: [
          {
            key: "copy",
            label: "Copy",
            icon: <Copy className="h-4 w-4" />,
            onClick: () => console.log("Copy clicked"),
          },
          {
            key: "edit",
            label: "Edit",
            icon: <Edit className="h-4 w-4" />,
            onClick: () => console.log("Edit clicked"),
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
        icon: <Trash2 className="h-4 w-4" />,
        variant: "destructive" as const,
        onClick: () => console.log("Delete clicked"),
      },
    ];

    return (
      <DropdownMenu
        trigger={
          <Button variant="outline">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
        items={menuItems}
      />
    );
  },
};

// With checkbox and radio items using items prop
export const WithInteractiveItems: Story = {
  render: () => {
    const InteractiveItemsExample = () => {
      const [notifications, setNotifications] = useState(true);
      const [theme, setTheme] = useState("light");

      const menuItems: DropdownMenuItem[] = [
        {
          key: "notifications",
          label: "Show notifications",
          type: "checkbox",
          checked: notifications,
          onClick: () => setNotifications(!notifications),
        },
        {
          key: "theme-group",
          type: "group",
          label: "Theme",
          children: [
            {
              key: "light",
              label: "Light",
              type: "radio",
              group: "theme",
              checked: theme === "light",
              onClick: () => setTheme("light"),
            },
            {
              key: "dark",
              label: "Dark",
              type: "radio",
              group: "theme",
              checked: theme === "dark",
              onClick: () => setTheme("dark"),
            },
            {
              key: "system",
              label: "System",
              type: "radio",
              group: "theme",
              checked: theme === "system",
              onClick: () => setTheme("system"),
            },
          ],
        },
      ];

      return (
        <DropdownMenu
          trigger={<Button variant="outline">Interactive Items</Button>}
          items={menuItems}
        />
      );
    };

    return <InteractiveItemsExample />;
  },
};

// With submenus using items prop
export const WithSubmenusItems: Story = {
  render: () => {
    const menuItems = [
      {
        key: "file",
        label: "File",
        children: [
          {
            key: "new",
            label: "New",
            children: [
              { key: "new-file", label: "File" },
              { key: "new-folder", label: "Folder" },
            ],
          },
          {
            key: "open",
            label: "Open",
            onClick: () => console.log("Open clicked"),
          },
          { key: "separator", type: "separator" as const },
          {
            key: "save",
            label: "Save",
            onClick: () => console.log("Save clicked"),
          },
        ],
      },
      {
        key: "edit",
        label: "Edit",
        children: [
          {
            key: "undo",
            label: "Undo",
            onClick: () => console.log("Undo clicked"),
          },
          {
            key: "redo",
            label: "Redo",
            onClick: () => console.log("Redo clicked"),
          },
        ],
      },
    ];

    return (
      <DropdownMenu
        trigger={<Button variant="outline">Menu with Submenus</Button>}
        items={menuItems}
      />
    );
  },
};

// With disabled items using items prop
export const WithDisabledItems: Story = {
  render: () => {
    const menuItems: DropdownMenuItem[] = [
      {
        key: "enabled-item",
        label: "Enabled Item",
        icon: <User className="h-4 w-4" />,
        onClick: () => console.log("Enabled item clicked"),
      },
      {
        key: "disabled-item",
        label: "Disabled Item",
        icon: <Settings className="h-4 w-4" />,
        disabled: true,
        onClick: () => console.log("This should not be called"),
      },
      {
        key: "separator1",
        type: "separator",
      },
      {
        key: "group1",
        type: "group",
        label: "Actions",
        children: [
          {
            key: "copy",
            label: "Copy",
            icon: <Copy className="h-4 w-4" />,
            onClick: () => console.log("Copy clicked"),
          },
          {
            key: "edit-disabled",
            label: "Edit (Disabled)",
            icon: <Edit className="h-4 w-4" />,
            disabled: true,
            onClick: () => console.log("Edit disabled clicked"),
          },
        ],
      },
      {
        key: "separator2",
        type: "separator",
      },
      {
        key: "checkbox-disabled",
        label: "Disabled Checkbox",
        type: "checkbox",
        checked: false,
        disabled: true,
      },
      {
        key: "radio-disabled",
        label: "Disabled Radio",
        type: "radio",
        group: "test",
        disabled: true,
      },
      {
        key: "submenu-disabled",
        label: "Disabled Submenu",
        disabled: true,
        children: [
          {
            key: "submenu-item",
            label: "Submenu Item",
            onClick: () => console.log("Submenu item clicked"),
          },
        ],
      },
    ];

    return (
      <DropdownMenu
        trigger={
          <Button variant="outline">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
        items={menuItems}
      />
    );
  },
};

// Context menu example
export const ContextMenu: Story = {
  render: () => (
    <DropdownMenu
      contextMenu={true}
      trigger={
        <div className="size-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Right-click anywhere in this area</p>
        </div>
      }
      triggerClassName="hover:bg-red-100"
      items={[
        {
          key: "view",
          label: "View",
          icon: <Info className="h-4 w-4" />,
          onClick: () => console.log("View clicked"),
        },
        {
          key: "edit",
          label: "Edit",
          icon: <Edit className="h-4 w-4" />,
          onClick: () => console.log("Edit clicked"),
        },
        { key: "separator", type: "separator" as const },
        {
          key: "delete",
          label: "Delete",
          icon: <Trash2 className="h-4 w-4" />,
          variant: "destructive" as const,
          onClick: () => console.log("Delete clicked"),
        },
      ]}
    />
  ),
};
