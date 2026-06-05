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
      <Sidebar className="ds:border-r">
        <SidebarHeader className="ds:border-b ds:p-4">
          <div className="ds:flex ds:items-center ds:gap-2">
            <div className="ds:flex ds:h-8 ds:w-8 ds:items-center ds:justify-center ds:rounded-lg ds:bg-primary ds:text-primary-foreground">
              <span className="ds:text-sm ds:font-bold">DS</span>
            </div>
            <div>
              <h2 className="ds:text-sm ds:font-semibold">DSUI Admin</h2>
              <p className="ds:text-xs ds:text-muted-foreground">Design System</p>
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
                      <a href={item.href} className="ds:flex ds:items-center ds:gap-3">
                        <item.icon className="ds:h-4 ds:w-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant="solid" className="ds:ml-auto">
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

        <SidebarFooter className="ds:border-t ds:p-4">
          <div className="ds:flex ds:items-center ds:gap-3">
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt="Admin User"
              fallback="AD"
              color="default"
              className=""
            />
            <div className="ds:flex-1 ds:text-sm">
              <p className="ds:font-medium">Admin User</p>
              <p className="ds:text-xs ds:text-muted-foreground">admin@dsui.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Header */}
        <header className="ds:sticky ds:top-0 ds:z-10 ds:border-b ds:bg-background/95 ds:backdrop-blur ds:supports-[backdrop-filter]:bg-background/60">
          <div className="ds:flex ds:h-16 ds:items-center ds:gap-4 ds:px-6">
            <SidebarTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="ds:h-5 ds:w-5" />
              </Button>
            </SidebarTrigger>

            {/* Search */}
            <div className="ds:flex-1 ds:max-w-md">
              <div className="ds:relative">
                <Search className="ds:absolute ds:left-3 ds:top-1/2 ds:h-4 ds:w-4 ds:-translate-y-1/2 ds:text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="ds:pl-9" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="ds:flex ds:items-center ds:gap-2 ds:ml-auto">
              <Popover
                side="bottom"
                align="end"
                sideOffset={8}
                trigger={
                  <Button variant="ghost" size="icon" className="ds:relative">
                    <Bell className="ds:h-5 ds:w-5" />
                    {notifications.filter((n) => n.unread).length > 0 && (
                      <span className="ds:absolute ds:top-1 ds:right-1 ds:h-2 ds:w-2 ds:rounded-full ds:bg-red-500" />
                    )}
                  </Button>
                }
                content={
                  <div className="ds:w-[320px]">
                    {/* Header */}
                    <div className="ds:flex ds:items-center ds:justify-between ds:p-4 ds:py-3 ds:border-b">
                      <div>
                        <h3 className="ds:font-semibold">Notifications</h3>
                        <p className="ds:text-xs ds:text-muted-foreground">
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
                    <div className="ds:max-h-[400px] ds:overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`ds:flex ds:gap-3 ds:px-4 ds:py-3 ds:border-b ds:last:border-0 ds:hover:bg-accent/50 ds:cursor-pointer ds:transition-colors ${notification.unread ? "bg-accent/20" : ""}`}
                        >
                          <div
                            className={`ds:flex ds:h-10 ds:w-10 ds:flex-shrink-0 ds:items-center ds:justify-center ds:rounded-full ${notification.type === "success"
                                                                  ? "bg-green-100 text-green-600"
                                                                  : notification.type === "warning"
                                                                    ? "bg-yellow-100 text-yellow-600"
                                                                    : "bg-blue-100 text-blue-600"}`}
                          >
                            <notification.icon className="ds:h-5 ds:w-5" />
                          </div>
                          <div className="ds:flex-1 ds:min-w-0">
                            <div className="ds:flex ds:items-start ds:justify-between ds:gap-2">
                              <p className="ds:text-sm ds:font-medium">
                                {notification.title}
                              </p>
                              {notification.unread && (
                                <span className="ds:h-2 ds:w-2 ds:rounded-full ds:bg-blue-600 ds:flex-shrink-0 ds:mt-1" />
                              )}
                            </div>
                            <p className="ds:text-sm ds:text-muted-foreground ds:line-clamp-2">
                              {notification.description}
                            </p>
                            <p className="ds:text-xs ds:text-muted-foreground ds:mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="ds:px-4 ds:py-3 ds:border-t">
                      <Button variant="ghost" className="ds:w-full">
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
                color="default"
                className=""
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="ds:flex-1 ds:overflow-auto ds:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
