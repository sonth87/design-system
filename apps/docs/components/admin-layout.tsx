'use client';

import { ReactNode } from 'react';
import { Menu, Home, Users, Settings, BarChart3, FileText, Bell, Search } from 'lucide-react';
import { Button } from 'dsui/button';
import { Avatar } from 'dsui/avatar';
import { Input } from 'dsui/input';
import { Badge } from 'dsui/badge';
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
} from 'dsui/sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/', badge: null },
  { icon: Users, label: 'Users', href: '/users', badge: '12' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', badge: null },
  { icon: FileText, label: 'Reports', href: '/reports', badge: '3' },
  { icon: Settings, label: 'Settings', href: '/settings', badge: null },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
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
                            <Badge variant="secondary" className="ml-auto">
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
              />
              <div className="flex-1 text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@dsui.com</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
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
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                </Button>
                <Avatar
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  alt="Admin User"
                  fallback="AD"
                />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
