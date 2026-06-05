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
import Button from "@sth87/shadcn-design-system/button";
import Badge from "@sth87/shadcn-design-system/badge";
import { Avatar } from "@sth87/shadcn-design-system/avatar";
import Tabs from "@sth87/shadcn-design-system/tabs";

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
      <div className="ds:space-y-6">
        {/* Page Header */}
        <div className="ds:flex ds:items-center ds:justify-between">
          <div>
            <h1 className="ds:text-3xl ds:font-bold ds:tracking-tight">Dashboard</h1>
            <p className="ds:text-muted-foreground">
              Welcome back! Here&apos;s what&apos;s happening with your business.
            </p>
          </div>
          <div className="ds:flex ds:gap-2">
            <Button variant="outline">Download</Button>
            <Button>Create Report</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="ds:grid ds:gap-4 ds:md:grid-cols-2 ds:lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon =
              stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

            return (
              <div
                key={stat.title}
                className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm"
              >
                <div className="ds:flex ds:items-center ds:justify-between">
                  <p className="ds:text-sm ds:font-medium ds:text-muted-foreground">
                    {stat.title}
                  </p>
                  <Icon className="ds:h-4 ds:w-4 ds:text-muted-foreground" />
                </div>
                <div className="ds:mt-3">
                  <p className="ds:text-2xl ds:font-bold">{stat.value}</p>
                  <div className="ds:mt-1 ds:flex ds:items-center ds:gap-1 ds:text-xs">
                    <TrendIcon
                      className={`ds:h-3 ds:w-3 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    />
                    <span
                      className={
                        stat.trend === "up" ? "ds:text-green-600" : "ds:text-red-600"
                      }
                    >
                      {stat.change}
                    </span>
                    <span className="ds:text-muted-foreground">
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
                <div className="ds:space-y-4">
                  <div className="ds:grid ds:gap-4 ds:md:grid-cols-2 ds:lg:grid-cols-7">
                    {/* Recent Activity */}
                    <div className="ds:col-span-4 ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                      <div className="ds:mb-4 ds:flex ds:items-center ds:justify-between">
                        <h3 className="ds:text-lg ds:font-semibold">
                          Recent Activity
                        </h3>
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </div>
                      <div className="ds:space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="ds:flex ds:items-center ds:gap-4">
                            <div className="ds:h-2 ds:w-2 ds:rounded-full ds:bg-blue-500" />
                            <div className="ds:flex-1">
                              <p className="ds:text-sm ds:font-medium">
                                New order from customer #{1000 + i}
                              </p>
                              <p className="ds:text-xs ds:text-muted-foreground">
                                {i} hours ago
                              </p>
                            </div>
                            <Badge variant="outline">Pending</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Users */}
                    <div className="ds:col-span-3 ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                      <div className="ds:mb-4 ds:flex ds:items-center ds:justify-between">
                        <h3 className="ds:text-lg ds:font-semibold">Recent Users</h3>
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </div>
                      <div className="ds:space-y-4">
                        {recentUsers.map((user) => (
                          <div
                            key={user.email}
                            className="ds:flex ds:items-center ds:gap-3"
                          >
                            <Avatar
                              src={user.avatar}
                              alt={user.name}
                              fallback={user.name.charAt(0)}
                              color="default"
                              className=""
                            />
                            <div className="ds:flex-1">
                              <p className="ds:text-sm ds:font-medium">{user.name}</p>
                              <p className="ds:text-xs ds:text-muted-foreground">
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
                <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                  <h3 className="ds:text-lg ds:font-semibold ds:mb-4">
                    Analytics Overview
                  </h3>
                  <p className="ds:text-muted-foreground">
                    Analytics data will be displayed here...
                  </p>
                </div>
              ),
            },
            {
              key: "reports",
              label: "Reports",
              children: (
                <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                  <h3 className="ds:text-lg ds:font-semibold ds:mb-4">Reports</h3>
                  <p className="ds:text-muted-foreground">
                    Reports will be displayed here...
                  </p>
                </div>
              ),
            },
          ]}
          className="ds:space-y-4"
        />
      </div>
    </AdminLayout>
  );
}
