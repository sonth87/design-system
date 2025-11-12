import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Tabs, { type TabsProps } from "../components/Tabs/Tabs";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { User, Settings, Bell, Mail, Home } from "lucide-react";

const meta: Meta<TabsProps> = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "Array of tab items",
    },
    defaultActiveKey: {
      control: "text",
      description: "Default active tab key (uncontrolled)",
    },
    activeKey: {
      control: "text",
      description: "Controlled active tab key",
    },
    tabPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Position of the tabs",
      table: {
        defaultValue: { summary: "top" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the tabs",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    alignment: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alignment of the tabs",
      table: {
        defaultValue: { summary: "start" },
      },
    },
    variant: {
      control: "select",
      options: [
        "solid",
        "bordered",
        "pills",
        "pill-stroke",
        "text",
        "outline",
        "underlined",
        "enclosed",
        "enclosed-fill",
      ],
      description: "Visual style variant of the tabs",
      table: {
        defaultValue: { summary: "solid" },
      },
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "muted",
        "accent",
        "destructive",
        "success",
        "warning",
      ],
      description: "Color theme for active tab",
      table: {
        defaultValue: { summary: "muted" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Make tabs full width",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<TabsProps>;

const defaultItems: TabsProps["items"] = [
  {
    key: "account",
    label: "Account",
    children: (
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Account</h3>
        <p className="text-sm text-muted-foreground">
          Make changes to your account here. Click save when you're done.
        </p>
        <Input label="Name" placeholder="Enter your name" />
        <Input label="Username" placeholder="@username" />
        <Button>Save changes</Button>
      </div>
    ),
  },
  {
    key: "password",
    label: "Password",
    children: (
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Password</h3>
        <p className="text-sm text-muted-foreground">
          Change your password here. After saving, you'll be logged out.
        </p>
        <Input label="Current password" type="password" />
        <Input label="New password" type="password" />
        <Button>Save password</Button>
      </div>
    ),
  },
];

// Default tabs
export const Default: Story = {
  args: {
    defaultActiveKey: "account",
    tabPosition: "top",
    size: "md",
    alignment: "start",
    className: "w-[400px]",
  },
  render: (args) => <Tabs {...args} items={defaultItems} />,
};

// With icons
export const WithIcons: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "overview",
        label: "Overview",
        icon: <Home className="size-4" />,
        children: (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Overview</h3>
            <p className="text-sm text-muted-foreground">
              Dashboard overview with key metrics and statistics.
            </p>
          </div>
        ),
      },
      {
        key: "profile",
        label: "Profile",
        icon: <User className="size-4" />,
        children: (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Profile</h3>
            <p className="text-sm text-muted-foreground">
              Manage your profile information and preferences.
            </p>
          </div>
        ),
      },
      {
        key: "settings",
        label: "Settings",
        icon: <Settings className="size-4" />,
        children: (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure your application settings and preferences.
            </p>
          </div>
        ),
      },
      {
        key: "notifications",
        label: "Notifications",
        icon: <Bell className="size-4" />,
        children: (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Manage your notification preferences and alerts.
            </p>
          </div>
        ),
      },
    ];

    return (
      <Tabs
        defaultActiveKey="overview"
        items={items}
        className="w-[500px]"
        fullWidth
      />
    );
  },
};

// Full width tabs
export const FullWidth: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "all",
        label: "All",
        children: (
          <div className="p-4 border rounded-lg">
            <div className="space-y-2">
              <h3 className="font-semibold">All Messages</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-3 rounded-md border hover:bg-accent cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Message {i}</span>
                      <span className="text-xs text-muted-foreground">
                        2 hours ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Preview of the message content...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "unread",
        label: "Unread",
        children: (
          <div className="p-4 border rounded-lg">
            <div className="space-y-2">
              <h3 className="font-semibold">Unread Messages</h3>
              <p className="text-sm text-muted-foreground">
                You have 2 unread messages.
              </p>
            </div>
          </div>
        ),
      },
      {
        key: "archived",
        label: "Archived",
        children: (
          <div className="p-4 border rounded-lg">
            <div className="space-y-2">
              <h3 className="font-semibold">Archived Messages</h3>
              <p className="text-sm text-muted-foreground">
                No archived messages yet.
              </p>
            </div>
          </div>
        ),
      },
    ];

    return (
      <Tabs
        defaultActiveKey="all"
        items={items}
        className="w-[600px]"
        fullWidth
      />
    );
  },
};

// Controlled tabs
export const Controlled: Story = {
  render: function ControlledTabs() {
    const [activeTab, setActiveTab] = React.useState("tab1");

    const items: TabsProps["items"] = [
      {
        key: "tab1",
        label: "Tab 1",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content for Tab 1</p>
            <p className="text-xs text-muted-foreground mt-2">
              Current tab: {activeTab}
            </p>
          </div>
        ),
      },
      {
        key: "tab2",
        label: "Tab 2",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content for Tab 2</p>
            <p className="text-xs text-muted-foreground mt-2">
              Current tab: {activeTab}
            </p>
          </div>
        ),
      },
      {
        key: "tab3",
        label: "Tab 3",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content for Tab 3</p>
            <p className="text-xs text-muted-foreground mt-2">
              Current tab: {activeTab}
            </p>
          </div>
        ),
      },
    ];

    return (
      <div className="w-[400px] space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setActiveTab("tab1")}
            variant="outline"
            size="sm"
          >
            Go to Tab 1
          </Button>
          <Button
            onClick={() => setActiveTab("tab2")}
            variant="outline"
            size="sm"
          >
            Go to Tab 2
          </Button>
          <Button
            onClick={() => setActiveTab("tab3")}
            variant="outline"
            size="sm"
          >
            Go to Tab 3
          </Button>
        </div>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          fullWidth
        />
      </div>
    );
  },
};

// Card style tabs
export const CardStyle: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "pricing",
        label: "Pricing",
        children: (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {["Basic", "Pro"].map((plan) => (
              <div key={plan} className="p-6 border rounded-lg space-y-4">
                <h3 className="text-xl font-bold">{plan}</h3>
                <div className="text-3xl font-bold">
                  ${plan === "Basic" ? "9" : "29"}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>✓ Feature 1</li>
                  <li>✓ Feature 2</li>
                  <li>✓ Feature 3</li>
                  {plan === "Pro" && <li>✓ Premium Feature</li>}
                </ul>
                <Button className="w-full">Choose {plan}</Button>
              </div>
            ))}
          </div>
        ),
      },
      {
        key: "features",
        label: "Features",
        children: (
          <div className="p-6 border rounded-lg mt-4">
            <h3 className="font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2 text-sm">
              <li>• Advanced analytics dashboard</li>
              <li>• Real-time collaboration</li>
              <li>• Unlimited storage</li>
              <li>• Priority support</li>
            </ul>
          </div>
        ),
      },
      {
        key: "faq",
        label: "FAQ",
        children: (
          <div className="p-6 border rounded-lg mt-4">
            <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-sm">
                  Can I change my plan later?
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Yes, you can upgrade or downgrade at any time.
                </p>
              </div>
              <div>
                <p className="font-medium text-sm">Is there a free trial?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  We offer a 14-day free trial for all plans.
                </p>
              </div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <Tabs defaultActiveKey="pricing" items={items} className="w-[500px]" />
    );
  },
};

// Minimal tabs
export const Minimal: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "today",
        label: "Today",
        children: (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Tasks completed</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Hours worked</span>
              <span className="font-semibold">6.5</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Meetings</span>
              <span className="font-semibold">3</span>
            </div>
          </div>
        ),
      },
      {
        key: "week",
        label: "This Week",
        children: (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Tasks completed</span>
              <span className="font-semibold">58</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Hours worked</span>
              <span className="font-semibold">32.5</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Meetings</span>
              <span className="font-semibold">14</span>
            </div>
          </div>
        ),
      },
      {
        key: "month",
        label: "This Month",
        children: (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Tasks completed</span>
              <span className="font-semibold">234</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Hours worked</span>
              <span className="font-semibold">152</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Meetings</span>
              <span className="font-semibold">47</span>
            </div>
          </div>
        ),
      },
    ];

    return (
      <Tabs defaultActiveKey="today" items={items} className="w-[400px]" />
    );
  },
};

// With badges
export const WithBadges: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "inbox",
        label: (
          <>
            Inbox
            <span className="ml-2 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs font-semibold">
              5
            </span>
          </>
        ),
        icon: <Mail className="size-4" />,
        children: (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Inbox (5)</h3>
            <p className="text-sm text-muted-foreground">
              You have 5 unread messages in your inbox.
            </p>
          </div>
        ),
      },
      {
        key: "sent",
        label: "Sent",
        children: (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Sent Messages</h3>
            <p className="text-sm text-muted-foreground">
              View all your sent messages here.
            </p>
          </div>
        ),
      },
      {
        key: "drafts",
        label: (
          <>
            Drafts
            <span className="ml-2 rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-xs">
              2
            </span>
          </>
        ),
        children: (
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Drafts (2)</h3>
            <p className="text-sm text-muted-foreground">
              You have 2 draft messages.
            </p>
          </div>
        ),
      },
    ];

    return (
      <Tabs defaultActiveKey="inbox" items={items} className="w-[500px]" />
    );
  },
};

// Tab positions
export const TabPositions: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Tab 1",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content of Tab Pane 1</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "Tab 2",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content of Tab Pane 2</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "Tab 3",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content of Tab Pane 3</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-4">Top (Default)</h3>
          <Tabs defaultActiveKey="1" items={items} tabPosition="top" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Bottom</h3>
          <Tabs defaultActiveKey="1" items={items} tabPosition="bottom" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Left</h3>
          <Tabs defaultActiveKey="1" items={items} tabPosition="left" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Right</h3>
          <Tabs defaultActiveKey="1" items={items} tabPosition="right" />
        </div>
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Tab 1",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content of Tab Pane 1</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "Tab 2",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content of Tab Pane 2</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "Tab 3",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content of Tab Pane 3</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-4">Small</h3>
          <Tabs defaultActiveKey="1" items={items} size="sm" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Medium (Default)</h3>
          <Tabs defaultActiveKey="1" items={items} size="md" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Large</h3>
          <Tabs defaultActiveKey="1" items={items} size="lg" />
        </div>
      </div>
    );
  },
};

// Disabled tabs
export const DisabledTabs: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Tab 1",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content of Tab Pane 1</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "Tab 2 (Disabled)",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content of Tab Pane 2</p>
          </div>
        ),
        disabled: true,
      },
      {
        key: "3",
        label: "Tab 3",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content of Tab Pane 3</p>
          </div>
        ),
      },
    ];

    return <Tabs defaultActiveKey="1" items={items} className="w-[400px]" />;
  },
};

// Solid variant - Default style with muted background
export const SolidVariant: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Overview",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Default variant with muted background</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "Analytics",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Active tab has white background</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "Reports",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Shadow on active state</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-4">Horizontal</h3>
          <Tabs defaultActiveKey="1" items={items} variant="solid" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Vertical</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="solid"
            tabPosition="left"
          />
        </div>
      </div>
    );
  },
};

// Variant 2 - With border and colored background
export const BorderedVariant: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Primary",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">
              Variant 2 with border on group and colored active background
            </p>
          </div>
        ),
      },
      {
        key: "2",
        label: "Secondary",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Active tab uses the selected color</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "Success",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Gap between tabs</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-4">
            Primary Color - Horizontal
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="bordered"
            color="primary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">
            Success Color - Horizontal
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="bordered"
            color="success"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">
            Primary Color - Vertical
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="bordered"
            color="primary"
            tabPosition="left"
          />
        </div>
      </div>
    );
  },
};

// Variant 3.5 - Pill stroke style
export const PillStrokeVariant: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Dashboard",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Pill-style with stroke border</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "Analytics",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Stronger border radius than pills</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "Reports",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Active has border color, no background</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-4">Primary Color</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="pill-stroke"
            color="primary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Secondary Color</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="pill-stroke"
            color="secondary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">
            Warning Color - Vertical
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="pill-stroke"
            color="warning"
            tabPosition="left"
          />
        </div>
      </div>
    );
  },
};

// Variant 4 - Text color only
export const TextVariant: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Home",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Only text color changes on active</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "Products",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">No background or border</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "Services",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Minimal text-only variant</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-4">Primary Color</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="text"
            color="primary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Destructive Color</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="text"
            color="destructive"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">
            Success Color - Vertical
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="text"
            color="success"
            tabPosition="left"
          />
        </div>
      </div>
    );
  },
};

// Variant 5 - Border (stroke) only
export const OutlineVariant: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Overview",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Border outline on active tab</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "Details",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Stroke style variant</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "Settings",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Clean outlined tabs</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-4">Primary Border</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="outline"
            color="primary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Success Border</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="outline"
            color="success"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">
            Secondary Border - Vertical
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="outline"
            color="secondary"
            tabPosition="left"
          />
        </div>
      </div>
    );
  },
};

// Variant 6 - Underline style
export const UnderlinedVariant: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Home",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Underline style tabs</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "About",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Active tab has colored underline</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "Contact",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Clean modern style</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-4">Primary Underline</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="underlined"
            color="primary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">Warning Underline</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="underlined"
            color="warning"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">
            Success Side-line - Vertical
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="underlined"
            color="success"
            tabPosition="left"
          />
        </div>
      </div>
    );
  },
};

// Variant 7 - Browser tab style
export const EnclosedVariant: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "index.html",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Browser-like tab style</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "styles.css",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Active tab connects to content</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "script.js",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Classic tab appearance</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-4">Primary Border</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="enclosed"
            color="primary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">
            Secondary Border - Vertical
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="enclosed"
            color="secondary"
            tabPosition="left"
          />
        </div>
      </div>
    );
  },
};

// Variant 8 - Browser tab style with background on inactive tabs
export const EnclosedFillVariant: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "index.html",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Browser-like tab style with background</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "styles.css",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Inactive tabs have muted background</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "script.js",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Active tab connects to content</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-4">Primary Border</h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="enclosed-fill"
            color="primary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-4">
            Secondary Border - Vertical
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="enclosed-fill"
            color="secondary"
            tabPosition="left"
          />
        </div>
      </div>
    );
  },
};

// All Variants Comparison
export const AllVariants: Story = {
  render: () => {
    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Tab 1",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content 1</p>
          </div>
        ),
      },
      {
        key: "2",
        label: "Tab 2",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content 2</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "Tab 3",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Content 3</p>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-8 w-[600px]">
        <div>
          <h3 className="text-sm font-semibold mb-2">
            Solid - Default (Muted)
          </h3>
          <Tabs defaultActiveKey="1" items={items} variant="solid" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            Bordered - With Border (Primary)
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="bordered"
            color="primary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            Pills - Background Only (Secondary)
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="pills"
            color="secondary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            Pill Stroke - Border Only (Secondary)
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="pill-stroke"
            color="secondary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            Text - Text Color Only (Success)
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="text"
            color="success"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            Outline - Border Stroke (Warning)
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="outline"
            color="warning"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            Underlined - Bottom Line (Primary)
          </h3>
          <Tabs
            defaultActiveKey="1"
            items={items}
            variant="underlined"
            color="primary"
          />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            Enclosed - Browser Tab Style (Accent)
          </h3>
          <Tabs defaultActiveKey="1" items={items} variant="enclosed" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2">
            Enclosed Fill - Browser Tab with Background (Accent)
          </h3>
          <Tabs defaultActiveKey="1" items={items} variant="enclosed-fill" />
        </div>
      </div>
    );
  },
};

export const CustomColor: Story = {
  render: function CustomColorTabs() {
    const [customColor, setCustomColor] = React.useState("#ff6b6b");

    const items: TabsProps["items"] = [
      {
        key: "1",
        label: "Custom Red",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Using custom color: {customColor}</p>
            <p className="text-sm text-muted-foreground mt-2">
              You can customize the active tab color by overriding CSS variables
              or using custom classes.
            </p>
          </div>
        ),
      },
      {
        key: "2",
        label: "Tab 2",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Inactive tabs maintain default styling</p>
          </div>
        ),
      },
      {
        key: "3",
        label: "Tab 3",
        children: (
          <div className="p-4 border rounded-lg">
            <p className="text-sm">Custom color applied to active state only</p>
          </div>
        ),
      },
    ];

    return (
      <div className="w-[600px] space-y-4">
        <div className="flex items-center gap-4">
          <label htmlFor="custom-color" className="text-sm font-medium">
            Custom Color:
          </label>
          <input
            id="custom-color"
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-12 h-8 border rounded cursor-pointer"
          />
          <span className="text-sm text-muted-foreground">{customColor}</span>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-4">
              Pill Stroke Variant with Custom Color
            </h3>
            <div
              style={{ "--custom-color": customColor } as React.CSSProperties}
            >
              <Tabs
                defaultActiveKey="1"
                items={items}
                variant="pill-stroke"
                tabTriggerClassName="[&[data-state=active]]:border-[var(--custom-color)] [&[data-state=active]]:text-[var(--custom-color)]"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">
              Outline Variant with Custom Color
            </h3>
            <div
              style={{ "--custom-color": customColor } as React.CSSProperties}
            >
              <Tabs
                defaultActiveKey="1"
                items={items}
                variant="outline"
                tabTriggerClassName="[&[data-state=active]]:border-[var(--custom-color)] [&[data-state=active]]:text-[var(--custom-color)]"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">
              Text Variant with Custom Color
            </h3>
            <div
              style={{ "--custom-color": customColor } as React.CSSProperties}
            >
              <Tabs
                defaultActiveKey="1"
                items={items}
                variant="text"
                tabTriggerClassName="[&[data-state=active]]:text-[var(--custom-color)]"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="text-sm font-semibold mb-2">
            How to customize colors:
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              • Use <code>tabTriggerClassName</code> to override active state
              styles
            </li>
            <li>
              • Apply custom color via CSS custom properties (CSS variables)
            </li>
            <li>• Use Tailwind's arbitrary value syntax for dynamic colors</li>
            <li>• For more control, create custom variants in your theme</li>
          </ul>
        </div>
      </div>
    );
  },
};
