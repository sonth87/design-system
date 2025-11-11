import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Tabs, {
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
} from "../components/Tabs/Tabs";
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
    defaultValue: {
      control: "text",
      description: "Default active tab (uncontrolled)",
    },
    value: {
      control: "text",
      description: "Controlled active tab value",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the tabs",
      table: {
        defaultValue: { summary: "horizontal" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  args: {
    defaultValue: "tab1",
  },
};

export default meta;
type Story = StoryObj<TabsProps>;

// Default tabs
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">Account</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here. Click save when you're done.
          </p>
          <Input label="Name" placeholder="Enter your name" />
          <Input label="Username" placeholder="@username" />
          <Button>Save changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">Password</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
          <Input label="Current password" type="password" />
          <Input label="New password" type="password" />
          <Button>Save password</Button>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">
          <Home className="mr-2 size-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="profile">
          <User className="mr-2 size-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="mr-2 size-4" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell className="mr-2 size-4" />
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4 border rounded-lg mt-2">
        <h3 className="font-semibold mb-2">Overview</h3>
        <p className="text-sm text-muted-foreground">
          Dashboard overview with key metrics and statistics.
        </p>
      </TabsContent>
      <TabsContent value="profile" className="p-4 border rounded-lg mt-2">
        <h3 className="font-semibold mb-2">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your profile information and preferences.
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4 border rounded-lg mt-2">
        <h3 className="font-semibold mb-2">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your application settings and preferences.
        </p>
      </TabsContent>
      <TabsContent value="notifications" className="p-4 border rounded-lg mt-2">
        <h3 className="font-semibold mb-2">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Manage your notification preferences and alerts.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

// Full width tabs
export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="unread">Unread</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="p-4 border rounded-lg mt-2">
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
      </TabsContent>
      <TabsContent value="unread" className="p-4 border rounded-lg mt-2">
        <div className="space-y-2">
          <h3 className="font-semibold">Unread Messages</h3>
          <p className="text-sm text-muted-foreground">
            You have 2 unread messages.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="archived" className="p-4 border rounded-lg mt-2">
        <div className="space-y-2">
          <h3 className="font-semibold">Archived Messages</h3>
          <p className="text-sm text-muted-foreground">
            No archived messages yet.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// Controlled tabs
export const Controlled: Story = {
  render: function ControlledTabs() {
    const [activeTab, setActiveTab] = React.useState("tab1");

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
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4 border rounded-lg mt-2">
            <p className="text-sm">Content for Tab 1</p>
            <p className="text-xs text-muted-foreground mt-2">
              Current tab: {activeTab}
            </p>
          </TabsContent>
          <TabsContent value="tab2" className="p-4 border rounded-lg mt-2">
            <p className="text-sm">Content for Tab 2</p>
            <p className="text-xs text-muted-foreground mt-2">
              Current tab: {activeTab}
            </p>
          </TabsContent>
          <TabsContent value="tab3" className="p-4 border rounded-lg mt-2">
            <p className="text-sm">Content for Tab 3</p>
            <p className="text-xs text-muted-foreground mt-2">
              Current tab: {activeTab}
            </p>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

// Card style tabs
export const CardStyle: Story = {
  render: () => (
    <Tabs defaultValue="pricing" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="pricing">Pricing</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
      </TabsList>
      <TabsContent value="pricing">
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
      </TabsContent>
      <TabsContent value="features" className="p-6 border rounded-lg mt-4">
        <h3 className="font-semibold mb-4">Key Features</h3>
        <ul className="space-y-2 text-sm">
          <li>• Advanced analytics dashboard</li>
          <li>• Real-time collaboration</li>
          <li>• Unlimited storage</li>
          <li>• Priority support</li>
        </ul>
      </TabsContent>
      <TabsContent value="faq" className="p-6 border rounded-lg mt-4">
        <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-sm">Can I change my plan later?</p>
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
      </TabsContent>
    </Tabs>
  ),
};

// Minimal tabs
export const Minimal: Story = {
  render: () => (
    <Tabs defaultValue="today" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="week">This Week</TabsTrigger>
        <TabsTrigger value="month">This Month</TabsTrigger>
      </TabsList>
      <TabsContent value="today" className="mt-4">
        <div className="space-y-2">
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
      </TabsContent>
      <TabsContent value="week" className="mt-4">
        <div className="space-y-2">
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
      </TabsContent>
      <TabsContent value="month" className="mt-4">
        <div className="space-y-2">
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
      </TabsContent>
    </Tabs>
  ),
};

// With badges
export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="inbox" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="inbox" className="relative">
          <Mail className="mr-2 size-4" />
          Inbox
          <span className="ml-2 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs font-semibold">
            5
          </span>
        </TabsTrigger>
        <TabsTrigger value="sent">
          Sent
        </TabsTrigger>
        <TabsTrigger value="drafts" className="relative">
          Drafts
          <span className="ml-2 rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-xs">
            2
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="inbox" className="p-4 border rounded-lg mt-2">
        <h3 className="font-semibold mb-2">Inbox (5)</h3>
        <p className="text-sm text-muted-foreground">
          You have 5 unread messages in your inbox.
        </p>
      </TabsContent>
      <TabsContent value="sent" className="p-4 border rounded-lg mt-2">
        <h3 className="font-semibold mb-2">Sent Messages</h3>
        <p className="text-sm text-muted-foreground">
          View all your sent messages here.
        </p>
      </TabsContent>
      <TabsContent value="drafts" className="p-4 border rounded-lg mt-2">
        <h3 className="font-semibold mb-2">Drafts (2)</h3>
        <p className="text-sm text-muted-foreground">
          You have 2 draft messages.
        </p>
      </TabsContent>
    </Tabs>
  ),
};
