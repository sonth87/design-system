"use client";

import { ReactNode } from "react";
import {
  Menu,
  Home,
  Users,
  Settings,
  BarChart3,
  FileText,
  Bell,
  Search,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  MessageSquare,
  Palette,
  Library,
  Webhook,
} from "lucide-react";
import Button from "@sth87/shadcn-design-system/button";
import { Avatar } from "@sth87/shadcn-design-system/avatar";
import Input from "@sth87/shadcn-design-system/input";
import Badge from "@sth87/shadcn-design-system/badge";
import Popover from "@sth87/shadcn-design-system/popover";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@sth87/shadcn-design-system/sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/", badge: null },
  { icon: Palette, label: "Components", href: "/components", badge: null },
  { icon: Library, label: "Libraries", href: "/lib", badge: null },
  { icon: Webhook, label: "Hooks", href: "/hooks", badge: null },
  { icon: Users, label: "Users", href: "/users", badge: "12" },
  { icon: BarChart3, label: "Analytics", href: "/analytics", badge: null },
  { icon: FileText, label: "Reports", href: "/reports", badge: "3" },
  { icon: Settings, label: "Settings", href: "/settings", badge: null },
];

const notifications = [
  {
    id: 1,
    type: "success",
    icon: CheckCircle2,
    title: "Report generated successfully",
    description: "Monthly revenue report is ready to download",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "info",
    icon: UserPlus,
    title: "New user registered",
    description: "Olivia Martin joined the platform",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    type: "warning",
    icon: AlertCircle,
    title: "System update required",
    description: "Security patch available for installation",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 4,
    type: "info",
    icon: MessageSquare,
    title: "New comment on report",
    description: "Sarah Johnson commented on Q4 Performance",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 5,
    type: "success",
    icon: CheckCircle2,
    title: "Backup completed",
    description: "Database backup finished successfully",
    time: "5 hours ago",
    unread: false,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">DS</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold">DSUI Admin</h2>
              <p className="text-xs text-muted-foreground">Design System</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild>
                      <a href={item.href} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="solid" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt="Admin User"
              fallback="AD"
              animation="none"
              color="default"
              className=""
            />
            <div className="flex-1 text-sm">
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@dsui.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Header */}
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center gap-4 px-6">
            <SidebarTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SidebarTrigger>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="pl-9" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <Popover
                side="bottom"
                align="end"
                sideOffset={8}
                trigger={
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.filter((n) => n.unread).length > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </Button>
                }
                content={
                  <div className="w-[320px]">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 py-3 border-b">
                      <div>
                        <h3 className="font-semibold">Notifications</h3>
                        <p className="text-xs text-muted-foreground">
                          You have{" "}
                          {notifications.filter((n) => n.unread).length} unread
                          messages
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Mark all read
                      </Button>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex gap-3 px-4 py-3 border-b last:border-0 hover:bg-accent/50 cursor-pointer transition-colors ${
                            notification.unread ? "bg-accent/20" : ""
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                              notification.type === "success"
                                ? "bg-green-100 text-green-600"
                                : notification.type === "warning"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            <notification.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium">
                                {notification.title}
                              </p>
                              {notification.unread && (
                                <span className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 border-t">
                      <Button variant="ghost" className="w-full">
                        View all notifications
                      </Button>
                    </div>
                  </div>
                }
              />
              <Avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="Admin User"
                fallback="AD"
                animation="none"
                color="default"
                className=""
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
