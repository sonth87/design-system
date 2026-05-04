import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  type SidebarProps,
} from "../components/Sidebar/Sidebar";
import Button from "../components/Button/Button";
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  User,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Sidebar> = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
      description: i18n.t("stories.sidebar.argTypes.side.description"),
      table: {
        defaultValue: { summary: "left" },
        category: i18n.t("stories.category.layout"),
      },
    },
    variant: {
      control: "select",
      options: ["sidebar", "floating", "inset", "tilt", "depth"],
      description: i18n.t("stories.sidebar.argTypes.variant.description"),
      table: {
        defaultValue: { summary: "sidebar" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    collapsible: {
      control: "select",
      options: ["offcanvas", "icon", "none"],
      description: i18n.t("stories.sidebar.argTypes.collapsible.description"),
      table: {
        defaultValue: { summary: "offcanvas" },
        category: i18n.t("stories.category.behavior"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<SidebarProps>;

// Default sidebar
export const Default: Story = {
  render: (args) => (
    <SidebarProvider>
      <Sidebar {...args}>
        <SidebarHeader>
          <div className="ds:px-2 ds:py-2">
            <h2 className="ds:text-lg ds:font-semibold">My App</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home className="ds:size-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Inbox className="ds:size-4" />
                    <span>Inbox</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Calendar className="ds:size-4" />
                    <span>Calendar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Search className="ds:size-4" />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings className="ds:size-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User className="ds:size-4" />
                <span>Account</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="ds:flex ds:h-16 ds:items-center ds:gap-2 ds:border-b ds:px-4">
          <SidebarTrigger />
          <h1 className="ds:text-lg ds:font-semibold">Dashboard</h1>
        </header>
        <div className="ds:flex ds:flex-1 ds:flex-col ds:gap-4 ds:p-4">
          <div className="ds:grid auto-rows-min ds:gap-4 ds:md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="ds:aspect-video ds:rounded-xl ds:bg-muted/50" />
            ))}
          </div>
          <div className="ds:flex-1 ds:rounded-xl ds:bg-muted/50 ds:p-4">
            <p className="ds:text-muted-foreground">Main content area</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

// With active states
export const WithActiveStates: Story = {
  render: function WithActiveStatesExample() {
    const [active, setActive] = React.useState("home");

    const menuItems = [
      { id: "home", label: "Home", icon: Home },
      { id: "inbox", label: "Inbox", icon: Inbox },
      { id: "calendar", label: "Calendar", icon: Calendar },
      { id: "search", label: "Search", icon: Search },
      { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="ds:px-2 ds:py-2">
              <h2 className="ds:text-lg ds:font-semibold">My App</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={active === item.id}
                        onClick={() => setActive(item.id)}
                      >
                        <item.icon className="ds:size-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="ds:flex ds:h-16 ds:items-center ds:gap-2 ds:border-b ds:px-4">
            <SidebarTrigger />
            <h1 className="ds:text-lg ds:font-semibold capitalize">{active}</h1>
          </header>
          <div className="ds:flex ds:flex-1 ds:flex-col ds:gap-4 ds:p-4">
            <div className="ds:min-h-screen ds:flex-1 ds:rounded-xl ds:bg-muted/50 ds:p-4">
              <p className="ds:text-muted-foreground">Content for {active} page</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  },
};

// Floating variant
export const Floating: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar variant="floating">
        <SidebarHeader>
          <div className="ds:px-2 ds:py-2">
            <h2 className="ds:text-lg ds:font-semibold">Floating Sidebar</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { icon: Home, label: "Home" },
                  { icon: Inbox, label: "Inbox" },
                  { icon: Calendar, label: "Calendar" },
                  { icon: Settings, label: "Settings" },
                ].map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton>
                      <item.icon className="ds:size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="ds:flex ds:h-16 ds:items-center ds:gap-2 ds:border-b ds:px-4">
          <SidebarTrigger />
          <h1 className="ds:text-lg ds:font-semibold">Floating Variant</h1>
        </header>
        <div className="ds:flex ds:flex-1 ds:flex-col ds:gap-4 ds:p-4">
          <div className="ds:min-h-screen ds:flex-1 ds:rounded-xl ds:bg-muted/50 ds:p-4">
            <p className="ds:text-muted-foreground">
              The sidebar floats with padding and rounded corners
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

// Inset variant
export const Inset: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader>
          <div className="ds:px-2 ds:py-2">
            <h2 className="ds:text-lg ds:font-semibold">Inset Sidebar</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { icon: Home, label: "Home" },
                  { icon: Inbox, label: "Inbox" },
                  { icon: Calendar, label: "Calendar" },
                  { icon: Settings, label: "Settings" },
                ].map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton>
                      <item.icon className="ds:size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="ds:flex ds:h-16 ds:items-center ds:gap-2 ds:border-b ds:px-4">
          <SidebarTrigger />
          <h1 className="ds:text-lg ds:font-semibold">Inset Variant</h1>
        </header>
        <div className="ds:flex ds:flex-1 ds:flex-col ds:gap-4 ds:p-4">
          <div className="ds:min-h-screen ds:flex-1 ds:rounded-xl ds:bg-muted/50 ds:p-4">
            <p className="ds:text-muted-foreground">
              The sidebar is inset with padding and rounded content area
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

// Right side
export const RightSide: Story = {
  render: () => (
    <SidebarProvider>
      <SidebarInset>
        <header className="ds:flex ds:h-16 ds:items-center ds:gap-2 ds:border-b ds:px-4">
          <h1 className="ds:text-lg ds:font-semibold ds:flex-1">Dashboard</h1>
          <SidebarTrigger />
        </header>
        <div className="ds:flex ds:flex-1 ds:flex-col ds:gap-4 ds:p-4">
          <div className="ds:min-h-screen ds:flex-1 ds:rounded-xl ds:bg-muted/50 ds:p-4">
            <p className="ds:text-muted-foreground">
              Sidebar appears on the right side
            </p>
          </div>
        </div>
      </SidebarInset>
      <Sidebar side="right">
        <SidebarHeader>
          <div className="ds:px-2 ds:py-2">
            <h2 className="ds:text-lg ds:font-semibold">Right Sidebar</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {["Action 1", "Action 2", "Action 3", "Action 4"].map(
                  (item, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuButton>
                        <ChevronRight className="ds:size-4" />
                        <span>{item}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};

// Icon collapsible
export const IconCollapsible: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="ds:px-2 ds:py-2">
            <h2 className="ds:text-lg ds:font-semibold">App</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { icon: Home, label: "Home" },
                  { icon: Inbox, label: "Inbox" },
                  { icon: Calendar, label: "Calendar" },
                  { icon: Search, label: "Search" },
                  { icon: Settings, label: "Settings" },
                ].map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton tooltip={item.label}>
                      <item.icon className="ds:size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="ds:flex ds:h-16 ds:items-center ds:gap-2 ds:border-b ds:px-4">
          <SidebarTrigger />
          <h1 className="ds:text-lg ds:font-semibold">Icon Collapsible</h1>
        </header>
        <div className="ds:flex ds:flex-1 ds:flex-col ds:gap-4 ds:p-4">
          <div className="ds:flex-1 ds:rounded-xl ds:bg-muted/50 ds:p-4">
            <p className="ds:text-muted-foreground">
              Click the trigger to collapse to icon-only mode
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

// Multiple groups
export const MultipleGroups: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="ds:px-2 ds:py-2">
            <h2 className="ds:text-lg ds:font-semibold">Dashboard</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { icon: Home, label: "Home" },
                  { icon: Inbox, label: "Inbox" },
                ].map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton>
                      <item.icon className="ds:size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[
                  { icon: Calendar, label: "Calendar" },
                  { icon: Search, label: "Search" },
                ].map((item, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuButton>
                      <item.icon className="ds:size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings className="ds:size-4" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User className="ds:size-4" />
                <span>Profile</span>
                <MoreHorizontal className="ds:ml-auto ds:size-4" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="ds:flex ds:h-16 ds:items-center ds:gap-2 ds:border-b ds:px-4">
          <SidebarTrigger />
          <h1 className="ds:text-lg ds:font-semibold">Multiple Groups</h1>
        </header>
        <div className="ds:flex ds:flex-1 ds:flex-col ds:gap-4 ds:p-4">
          <div className="ds:flex-1 ds:rounded-xl ds:bg-muted/50 ds:p-4">
            <p className="ds:text-muted-foreground">
              Sidebar with multiple grouped sections
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

// Controlled sidebar
export const Controlled: Story = {
  render: function ControlledExample() {
    const [open, setOpen] = React.useState(true);

    return (
      <div className="ds:space-y-4">
        <SidebarProvider open={open} onOpenChange={setOpen}>
          <Sidebar>
            <SidebarHeader>
              <div className="ds:px-2 ds:py-2">
                <h2 className="ds:text-lg ds:font-semibold">Controlled</h2>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {[
                      { icon: Home, label: "Home" },
                      { icon: Settings, label: "Settings" },
                    ].map((item, i) => (
                      <SidebarMenuItem key={i}>
                        <SidebarMenuButton>
                          <item.icon className="ds:size-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="ds:flex ds:h-16 ds:items-center ds:gap-2 ds:border-b ds:px-4">
              <SidebarTrigger />
              <h1 className="ds:text-lg ds:font-semibold">Controlled Sidebar</h1>
            </header>
            <div className="ds:flex ds:flex-1 ds:flex-col ds:gap-4 ds:p-4">
              <div className="ds:flex ds:gap-2 ds:p-4 ds:border-b">
                <Button
                  onClick={() => setOpen(true)}
                  variant="outline"
                  size="sm"
                >
                  Open Sidebar
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  size="sm"
                >
                  Close Sidebar
                </Button>
                <span className="ds:ml-4 ds:text-sm ds:text-muted-foreground">
                  State: {open ? "Open" : "Closed"}
                </span>
              </div>
              <div className="ds:flex-1 ds:rounded-xl ds:bg-muted/50 ds:p-4">
                <p className="ds:text-muted-foreground">
                  Use the buttons above to control the sidebar state
                </p>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    );
  },
};
