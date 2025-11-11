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

const meta: Meta<SidebarProps> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
      description: "Side where the sidebar appears",
      table: {
        defaultValue: { summary: "left" },
      },
    },
    variant: {
      control: "select",
      options: ["sidebar", "floating", "inset"],
      description: "Visual variant of the sidebar",
      table: {
        defaultValue: { summary: "sidebar" },
      },
    },
    collapsible: {
      control: "select",
      options: ["offcanvas", "icon", "none"],
      description: "Collapsible behavior",
      table: {
        defaultValue: { summary: "offcanvas" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<SidebarProps>;

// Default sidebar
export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="px-2 py-2">
            <h2 className="text-lg font-semibold">My App</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home className="size-4" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Inbox className="size-4" />
                    <span>Inbox</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Calendar className="size-4" />
                    <span>Calendar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Search className="size-4" />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings className="size-4" />
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
                <User className="size-4" />
                <span>Account</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-video rounded-xl bg-muted/50" />
            ))}
          </div>
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 p-4">
            <p className="text-muted-foreground">Main content area</p>
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
            <div className="px-2 py-2">
              <h2 className="text-lg font-semibold">My App</h2>
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
                        <item.icon className="size-4" />
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
          <header className="flex h-16 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold capitalize">{active}</h1>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-screen flex-1 rounded-xl bg-muted/50 p-4">
              <p className="text-muted-foreground">
                Content for {active} page
              </p>
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
          <div className="px-2 py-2">
            <h2 className="text-lg font-semibold">Floating Sidebar</h2>
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
                      <item.icon className="size-4" />
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
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Floating Variant</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 p-4">
            <p className="text-muted-foreground">
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
          <div className="px-2 py-2">
            <h2 className="text-lg font-semibold">Inset Sidebar</h2>
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
                      <item.icon className="size-4" />
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
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Inset Variant</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 p-4">
            <p className="text-muted-foreground">
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
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <h1 className="text-lg font-semibold flex-1">Dashboard</h1>
          <SidebarTrigger />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 p-4">
            <p className="text-muted-foreground">
              Sidebar appears on the right side
            </p>
          </div>
        </div>
      </SidebarInset>
      <Sidebar side="right">
        <SidebarHeader>
          <div className="px-2 py-2">
            <h2 className="text-lg font-semibold">Right Sidebar</h2>
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
                        <ChevronRight className="size-4" />
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
          <div className="px-2 py-2">
            <h2 className="text-lg font-semibold">App</h2>
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
                      <item.icon className="size-4" />
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
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Icon Collapsible</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 p-4">
            <p className="text-muted-foreground">
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
          <div className="px-2 py-2">
            <h2 className="text-lg font-semibold">Dashboard</h2>
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
                      <item.icon className="size-4" />
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
                      <item.icon className="size-4" />
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
                    <Settings className="size-4" />
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
                <User className="size-4" />
                <span>Profile</span>
                <MoreHorizontal className="ml-auto size-4" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Multiple Groups</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 p-4">
            <p className="text-muted-foreground">
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
      <div className="space-y-4">
        <div className="flex gap-2 p-4 border-b">
          <Button onClick={() => setOpen(true)} variant="outline" size="sm">
            Open Sidebar
          </Button>
          <Button onClick={() => setOpen(false)} variant="outline" size="sm">
            Close Sidebar
          </Button>
          <span className="ml-4 text-sm text-muted-foreground">
            State: {open ? "Open" : "Closed"}
          </span>
        </div>
        <SidebarProvider open={open} onOpenChange={setOpen}>
          <Sidebar>
            <SidebarHeader>
              <div className="px-2 py-2">
                <h2 className="text-lg font-semibold">Controlled</h2>
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
                          <item.icon className="size-4" />
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
            <header className="flex h-16 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">Controlled Sidebar</h1>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-4">
                <p className="text-muted-foreground">
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
