import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Popover, type PopoverProps } from "../components/Popover";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { Settings, User, Info } from "lucide-react";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Popover> = {
  title: "Overlays/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: i18n.t("stories.popover.argTypes.open.description"),
      table: {
        type: { summary: "boolean" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    defaultOpen: {
      control: "boolean",
      description: i18n.t("stories.popover.argTypes.defaultOpen.description"),
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    onOpenChange: {
      description: i18n.t("stories.popover.argTypes.onOpenChange.description"),
      table: {
        type: { summary: "(open: boolean) => void" },
        category: i18n.t("stories.category.events"),
      },
    },
    modal: {
      control: "boolean",
      description: i18n.t("stories.popover.argTypes.modal.description"),
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    trigger: {
      description: i18n.t("stories.popover.argTypes.trigger.description"),
      table: {
        type: { summary: "React.ReactNode" },
        category: i18n.t("stories.category.content"),
      },
    },
    children: {
      description: i18n.t("stories.popover.argTypes.children.description"),
      table: {
        type: { summary: "React.ReactNode" },
        category: i18n.t("stories.category.content"),
      },
    },
    content: {
      description: i18n.t("stories.popover.argTypes.content.description"),
      table: {
        type: { summary: "React.ReactNode" },
        category: i18n.t("stories.category.content"),
      },
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: i18n.t("stories.popover.argTypes.side.description"),
      table: {
        type: { summary: "enum" },
        defaultValue: { summary: "bottom" },
        category: i18n.t("stories.category.layout"),
      },
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: i18n.t("stories.popover.argTypes.align.description"),
      table: {
        type: { summary: "enum" },
        defaultValue: { summary: "center" },
        category: i18n.t("stories.category.layout"),
      },
    },
    sideOffset: {
      control: "number",
      description: i18n.t("stories.popover.argTypes.sideOffset.description"),
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "4" },
        category: i18n.t("stories.category.layout"),
      },
    },
    alignOffset: {
      control: "number",
      description: i18n.t("stories.popover.argTypes.alignOffset.description"),
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
        category: i18n.t("stories.category.layout"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.popover.argTypes.className.description"),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.advanced"),
      },
    },
    contentClassName: {
      control: "text",
      description: i18n.t(
        "stories.popover.argTypes.contentClassName.description",
      ),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.advanced"),
      },
    },
    triggerClassName: {
      control: "text",
      description: i18n.t(
        "stories.popover.argTypes.triggerClassName.description",
      ),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.advanced"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<PopoverProps>;

// Default popover
export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { open, ...restArgs } = args;
    return (
      <Popover
        {...restArgs}
        trigger={<Button variant="outline">Open Popover</Button>}
        content={
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
        }
      />
    );
  },
};

// With form inputs
export const WithForm: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="outline">Edit Profile</Button>}
      contentClassName="w-80"
      content={
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Profile Settings</h4>
            <p className="text-sm text-muted-foreground">
              Update your profile information.
            </p>
          </div>
          <div className="space-y-2">
            <Input label="Name" placeholder="Enter your name" />
            <Input label="Email" type="email" placeholder="Enter your email" />
            <Input
              label="Username"
              placeholder="@username"
              helperText="This is your public username."
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
      }
    />
  ),
};

// Different sides
export const Sides: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover
        trigger={<Button variant="outline">Top</Button>}
        side="top"
        content={<p className="text-sm">Popover on top</p>}
      />

      <Popover
        trigger={<Button variant="outline">Right</Button>}
        side="right"
        content={<p className="text-sm">Popover on right</p>}
      />

      <Popover
        trigger={<Button variant="outline">Bottom</Button>}
        side="bottom"
        content={<p className="text-sm">Popover on bottom</p>}
      />

      <Popover
        trigger={<Button variant="outline">Left</Button>}
        side="left"
        content={<p className="text-sm">Popover on left</p>}
      />
    </div>
  ),
};

// With icon trigger
export const IconTrigger: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover
        trigger={
          <Button variant="ghost" size="icon">
            <User className="size-4" />
          </Button>
        }
        content={
          <div className="space-y-2">
            <h4 className="font-medium">User Profile</h4>
            <p className="text-sm text-muted-foreground">
              View and edit your profile
            </p>
          </div>
        }
      />

      <Popover
        trigger={
          <Button variant="ghost" size="icon">
            <Settings className="size-4" />
          </Button>
        }
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your preferences
            </p>
          </div>
        }
      />

      <Popover
        trigger={
          <Button variant="ghost" size="icon">
            <Info className="size-4" />
          </Button>
        }
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Information</h4>
            <p className="text-sm text-muted-foreground">
              Learn more about this feature
            </p>
          </div>
        }
      />
    </div>
  ),
};

// Menu-like popover
export const MenuLike: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="outline">Options</Button>}
      contentClassName="w-48 p-2"
      content={
        <div className="space-y-1">
          {["Profile", "Settings", "Keyboard shortcuts", "Team", "Logout"].map(
            (item) => (
              <button
                key={item}
                className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent hover:text-accent-foreground"
              >
                {item}
              </button>
            ),
          )}
        </div>
      }
    />
  ),
};

// Color picker
export const ColorPicker: Story = {
  render: () => (
    <Popover
      trigger={
        <Button variant="outline">
          <div className="size-4 rounded mr-2 bg-primary" />
          Pick Color
        </Button>
      }
      contentClassName="w-64"
      content={
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Pick a color</h4>
          <div className="grid grid-cols-6 gap-2">
            {[
              "#ef4444",
              "#f97316",
              "#f59e0b",
              "#84cc16",
              "#10b981",
              "#14b8a6",
              "#06b6d4",
              "#3b82f6",
              "#6366f1",
              "#8b5cf6",
              "#a855f7",
              "#d946ef",
              "#ec4899",
              "#f43f5e",
              "#64748b",
              "#71717a",
              "#737373",
              "#78716c",
            ].map((color) => (
              <button
                key={color}
                className="size-8 rounded border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                aria-label={`Select ${color}`}
              />
            ))}
          </div>
        </div>
      }
    />
  ),
};

// Nested popovers
export const Nested: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="outline">Open First</Button>}
      content={
        <div className="space-y-3">
          <h4 className="font-medium">First Popover</h4>
          <p className="text-sm text-muted-foreground">
            This popover contains another popover
          </p>
          <Popover
            trigger={
              <Button variant="outline" size="sm">
                Open Second
              </Button>
            }
            side="right"
            content={<p className="text-sm">Nested Popover Content</p>}
          />
        </div>
      }
    />
  ),
};

// With custom styling
export const CustomStyled: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="outline">Styled Popover</Button>}
      contentClassName="w-80 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800"
      content={
        <div className="space-y-3">
          <h4 className="font-bold text-purple-900 dark:text-purple-100">
            Custom Styled Popover
          </h4>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            This popover has custom gradient background and styling.
          </p>
          <Button className="w-full" variant="outline">
            Action
          </Button>
        </div>
      }
    />
  ),
};

// Controlled popover
export const Controlled: Story = {
  render: function ControlledPopover() {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)} variant="outline" size="sm">
            Open
          </Button>
          <Button onClick={() => setOpen(false)} variant="outline" size="sm">
            Close
          </Button>
        </div>
        <Popover
          open={open}
          onOpenChange={setOpen}
          trigger={<Button variant="outline">Controlled Trigger</Button>}
          content={
            <div className="space-y-2">
              <h4 className="font-medium">Controlled Popover</h4>
              <p className="text-sm text-muted-foreground">
                This popover's state is controlled externally.
              </p>
              <Button onClick={() => setOpen(false)} size="sm">
                Close from inside
              </Button>
            </div>
          }
        />
      </div>
    );
  },
};

// Using children as trigger
export const ChildrenAsTrigger: Story = {
  render: () => (
    <Popover
      content={
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Quick Info</h4>
          <p className="text-sm text-muted-foreground">
            You can use children as trigger instead of the trigger prop.
          </p>
        </div>
      }
    >
      <Button variant="outline">Children as Trigger</Button>
    </Popover>
  ),
};
