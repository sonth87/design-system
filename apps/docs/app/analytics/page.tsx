"use client";

import { AdminLayout } from "@/components/admin-layout";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  DollarSign,
} from "lucide-react";
import Button from "@sth87/shadcn-design-system/button";
import Badge from "@sth87/shadcn-design-system/badge";
import Tabs from "@sth87/shadcn-design-system/tabs";
import Select from "@sth87/shadcn-design-system/select";

const metrics = [
  {
    label: "Total Revenue",
    value: "$45,231",
    change: "+12.5%",
    trend: "up",
  },
  {
    label: "Active Users",
    value: "2,350",
    change: "+8.2%",
    trend: "up",
  },
  {
    label: "Conversion Rate",
    value: "3.2%",
    change: "-2.1%",
    trend: "down",
  },
  {
    label: "Avg. Session",
    value: "4m 32s",
    change: "+5.7%",
    trend: "up",
  },
];

const topPages = [
  { page: "/dashboard", views: 4521, bounce: "32.5%" },
  { page: "/products", views: 3842, bounce: "28.1%" },
  { page: "/pricing", views: 2917, bounce: "41.2%" },
  { page: "/about", views: 1834, bounce: "35.8%" },
  { page: "/contact", views: 1256, bounce: "52.3%" },
];

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="ds:space-y-6">
        {/* Page Header */}
        <div className="ds:flex ds:items-center ds:justify-between">
          <div>
            <h1 className="ds:text-3xl ds:font-bold ds:tracking-tight">Analytics</h1>
            <p className="ds:text-muted-foreground">
              Track your performance and insights
            </p>
          </div>
          <div className="ds:flex ds:gap-2">
            <Select
              options={[
                { value: "7d", label: "Last 7 days" },
                { value: "30d", label: "Last 30 days" },
                { value: "90d", label: "Last 90 days" },
                { value: "1y", label: "Last year" },
              ]}
              defaultValue="7d"
              placeholder="Select period"
            />
            <Button variant="outline">Export</Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="ds:grid ds:gap-4 ds:md:grid-cols-2 ds:lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm"
            >
              <div className="ds:flex ds:items-center ds:justify-between">
                <p className="ds:text-sm ds:font-medium ds:text-muted-foreground">
                  {metric.label}
                </p>
                {metric.trend === "up" ? (
                  <TrendingUp className="ds:h-4 ds:w-4 ds:text-green-600" />
                ) : (
                  <TrendingDown className="ds:h-4 ds:w-4 ds:text-red-600" />
                )}
              </div>
              <div className="ds:mt-3">
                <p className="ds:text-2xl ds:font-bold">{metric.value}</p>
                <p
                  className={`ds:mt-1 ds:text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                >
                  {metric.change} from last period
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs
          defaultActiveKey="overview"
          className="ds:space-y-4"
          items={[
            {
              key: "overview",
              label: "Overview",
              children: (
                <div className="ds:space-y-4">
                  <div className="ds:grid ds:gap-4 ds:md:grid-cols-2">
                    {/* Chart Placeholder 1 */}
                    <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                      <div className="ds:mb-4 ds:flex ds:items-center ds:justify-between">
                        <h3 className="ds:text-lg ds:font-semibold">Revenue Trend</h3>
                        <Activity className="ds:h-5 ds:w-5 ds:text-muted-foreground" />
                      </div>
                      <div className="ds:h-[300px] ds:flex ds:items-center ds:justify-center ds:border-2 ds:border-dashed ds:rounded-lg">
                        <div className="ds:text-center ds:text-muted-foreground">
                          <DollarSign className="ds:h-12 ds:w-12 ds:mx-auto ds:mb-2 ds:opacity-50" />
                          <p>Revenue chart would be displayed here</p>
                        </div>
                      </div>
                    </div>

                    {/* Chart Placeholder 2 */}
                    <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                      <div className="ds:mb-4 ds:flex ds:items-center ds:justify-between">
                        <h3 className="ds:text-lg ds:font-semibold">User Growth</h3>
                        <Users className="ds:h-5 ds:w-5 ds:text-muted-foreground" />
                      </div>
                      <div className="ds:h-[300px] ds:flex ds:items-center ds:justify-center ds:border-2 ds:border-dashed ds:rounded-lg">
                        <div className="ds:text-center ds:text-muted-foreground">
                          <Users className="ds:h-12 ds:w-12 ds:mx-auto ds:mb-2 ds:opacity-50" />
                          <p>User growth chart would be displayed here</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Top Pages */}
                  <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                    <h3 className="ds:text-lg ds:font-semibold ds:mb-4">Top Pages</h3>
                    <div className="ds:space-y-4">
                      {topPages.map((page, index) => (
                        <div
                          key={page.page}
                          className="ds:flex ds:items-center ds:justify-between ds:py-2"
                        >
                          <div className="ds:flex ds:items-center ds:gap-3">
                            <Badge
                              variant="outline"
                              className="ds:w-8 ds:justify-center"
                            >
                              {index + 1}
                            </Badge>
                            <code className="ds:text-sm ds:font-mono">
                              {page.page}
                            </code>
                          </div>
                          <div className="ds:flex ds:items-center ds:gap-6">
                            <div className="ds:text-right">
                              <p className="ds:text-sm ds:font-medium">
                                {page.views}
                              </p>
                              <p className="ds:text-xs ds:text-muted-foreground">
                                views
                              </p>
                            </div>
                            <div className="ds:text-right">
                              <p className="ds:text-sm ds:font-medium">
                                {page.bounce}
                              </p>
                              <p className="ds:text-xs ds:text-muted-foreground">
                                bounce
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "traffic",
              label: "Traffic",
              children: (
                <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                  <h3 className="ds:text-lg ds:font-semibold ds:mb-4">
                    Traffic Sources
                  </h3>
                  <div className="ds:h-[400px] ds:flex ds:items-center ds:justify-center ds:border-2 ds:border-dashed ds:rounded-lg">
                    <div className="ds:text-center ds:text-muted-foreground">
                      <Activity className="ds:h-12 ds:w-12 ds:mx-auto ds:mb-2 ds:opacity-50" />
                      <p>Traffic analytics would be displayed here</p>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "engagement",
              label: "Engagement",
              children: (
                <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                  <h3 className="ds:text-lg ds:font-semibold ds:mb-4">
                    User Engagement
                  </h3>
                  <div className="ds:h-[400px] ds:flex ds:items-center ds:justify-center ds:border-2 ds:border-dashed ds:rounded-lg">
                    <div className="ds:text-center ds:text-muted-foreground">
                      <Users className="ds:h-12 ds:w-12 ds:mx-auto ds:mb-2 ds:opacity-50" />
                      <p>Engagement metrics would be displayed here</p>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "conversions",
              label: "Conversions",
              children: (
                <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                  <h3 className="ds:text-lg ds:font-semibold ds:mb-4">
                    Conversion Funnel
                  </h3>
                  <div className="ds:h-[400px] ds:flex ds:items-center ds:justify-center ds:border-2 ds:border-dashed ds:rounded-lg">
                    <div className="ds:text-center ds:text-muted-foreground">
                      <TrendingUp className="ds:h-12 ds:w-12 ds:mx-auto ds:mb-2 ds:opacity-50" />
                      <p>Conversion funnel would be displayed here</p>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
}
