"use client";

import { AdminLayout } from "@/components/admin-layout";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Button from "@dsui/design-system/button";
import Badge from "@dsui/design-system/badge";
import { Avatar } from "@dsui/design-system/avatar";
import Tabs from "@dsui/design-system/tabs";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-4.3%",
    trend: "down",
    icon: TrendingUp,
  },
];

const recentUsers = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    status: "active",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jackson",
    status: "inactive",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
    status: "active",
  },
  {
    name: "William Kim",
    email: "william.kim@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=William",
    status: "active",
  },
];

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your business.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Download</Button>
            <Button>Create Report</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon =
              stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

            return (
              <div
                key={stat.title}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <TrendIcon
                      className={`h-3 w-3 ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    />
                    <span
                      className={
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground">
                      from last month
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Tabs */}
        <Tabs
          items={[
            {
              key: "overview",
              label: "Overview",
              children: (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Recent Activity */}
                    <div className="col-span-4 rounded-lg border bg-card p-6 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          Recent Activity
                        </h3>
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                New order from customer #{1000 + i}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {i} hours ago
                              </p>
                            </div>
                            <Badge variant="outline">Pending</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Users */}
                    <div className="col-span-3 rounded-lg border bg-card p-6 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Recent Users</h3>
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {recentUsers.map((user) => (
                          <div
                            key={user.email}
                            className="flex items-center gap-3"
                          >
                            <Avatar
                              src={user.avatar}
                              alt={user.name}
                              fallback={user.name.charAt(0)}
                              animation="none"
                              color="default"
                              className=""
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                            <Badge
                              variant={
                                user.status === "active" ? "solid" : "outline"
                              }
                            >
                              {user.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "analytics",
              label: "Analytics",
              children: (
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">
                    Analytics Overview
                  </h3>
                  <p className="text-muted-foreground">
                    Analytics data will be displayed here...
                  </p>
                </div>
              ),
            },
            {
              key: "reports",
              label: "Reports",
              children: (
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Reports</h3>
                  <p className="text-muted-foreground">
                    Reports will be displayed here...
                  </p>
                </div>
              ),
            },
          ]}
          className="space-y-4"
        />
      </div>
    </AdminLayout>
  );
}
