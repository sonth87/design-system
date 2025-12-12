"use client";

import { AdminLayout } from "@/components/admin-layout";
import {
  Download,
  FileText,
  TrendingUp,
  Calendar,
  Filter,
  MoreVertical,
  Eye,
  Share2,
} from "lucide-react";
import Button from "@sth87/shadcn-design-system/button";
import Badge from "@sth87/shadcn-design-system/badge";
import Tabs from "@sth87/shadcn-design-system/tabs";
import Select from "@sth87/shadcn-design-system/select";
import Input from "@sth87/shadcn-design-system/input";

const reports = [
  {
    id: 1,
    title: "Monthly Revenue Report",
    description: "Detailed analysis of revenue streams and growth metrics",
    category: "Financial",
    status: "completed",
    date: "2024-11-10",
    author: "John Smith",
    views: 245,
    format: "PDF",
  },
  {
    id: 2,
    title: "User Engagement Analysis",
    description: "User behavior patterns and engagement metrics",
    category: "Analytics",
    status: "completed",
    date: "2024-11-08",
    author: "Sarah Johnson",
    views: 189,
    format: "Excel",
  },
  {
    id: 3,
    title: "Q4 Performance Summary",
    description: "Quarterly performance review and KPI analysis",
    category: "Performance",
    status: "processing",
    date: "2024-11-12",
    author: "Mike Chen",
    views: 67,
    format: "PDF",
  },
  {
    id: 4,
    title: "Security Audit Report",
    description: "System security assessment and recommendations",
    category: "Security",
    status: "completed",
    date: "2024-11-05",
    author: "Emily Davis",
    views: 412,
    format: "PDF",
  },
  {
    id: 5,
    title: "Marketing Campaign Results",
    description: "ROI analysis for recent marketing initiatives",
    category: "Marketing",
    status: "completed",
    date: "2024-11-01",
    author: "David Wilson",
    views: 321,
    format: "PowerPoint",
  },
  {
    id: 6,
    title: "Customer Satisfaction Survey",
    description: "Analysis of customer feedback and satisfaction scores",
    category: "Customer",
    status: "draft",
    date: "2024-11-14",
    author: "Lisa Anderson",
    views: 23,
    format: "Excel",
  },
];

const recentActivity = [
  {
    user: "John Smith",
    action: "generated",
    report: "Monthly Revenue Report",
    time: "2 hours ago",
  },
  {
    user: "Sarah Johnson",
    action: "downloaded",
    report: "User Engagement Analysis",
    time: "5 hours ago",
  },
  {
    user: "Mike Chen",
    action: "shared",
    report: "Q4 Performance Summary",
    time: "1 day ago",
  },
  {
    user: "Emily Davis",
    action: "viewed",
    report: "Security Audit Report",
    time: "2 days ago",
  },
];

export default function ReportsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Generate and manage your business reports
            </p>
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Total Reports
              </p>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{reports.length}</p>
              <p className="text-sm text-green-600 mt-1">+3 this month</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Total Views
              </p>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">
                {reports.reduce((sum, r) => sum + r.views, 0)}
              </p>
              <p className="text-sm text-green-600 mt-1">+12% from last week</p>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                In Progress
              </p>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">
                {reports.filter((r) => r.status === "processing").length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Currently processing
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultActiveKey="all"
          className="space-y-4"
          items={[
            {
              key: "all",
              label: "All Reports",
              children: (
                <div className="space-y-4">
                  {/* Filters */}
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search reports..."
                        className="pl-9"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select
                        options={[
                          { value: "all", label: "All Categories" },
                          { value: "financial", label: "Financial" },
                          { value: "analytics", label: "Analytics" },
                          { value: "performance", label: "Performance" },
                          { value: "security", label: "Security" },
                          { value: "marketing", label: "Marketing" },
                        ]}
                        defaultValue="all"
                        placeholder="Category"
                      />
                      <Select
                        options={[
                          { value: "all", label: "All Status" },
                          { value: "completed", label: "Completed" },
                          { value: "processing", label: "Processing" },
                          { value: "draft", label: "Draft" },
                        ]}
                        defaultValue="all"
                        placeholder="Status"
                      />
                      <Button variant="outline" size="icon">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Reports Grid */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <Badge
                              variant={
                                report.status === "completed"
                                  ? "solid"
                                  : report.status === "processing"
                                    ? "light"
                                    : "outline"
                              }
                            >
                              {report.status}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>

                        <h3 className="font-semibold mb-1">{report.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {report.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span>{report.category}</span>
                          <span>{report.format}</span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {report.views}
                            </div>
                            <span>{report.date}</span>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              key: "recent",
              label: "Recent Activity",
              children: (
                <div className="rounded-lg border bg-card shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-3 border-b last:border-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm">
                                <span className="font-medium">
                                  {activity.user}
                                </span>{" "}
                                {activity.action}{" "}
                                <span className="font-medium">
                                  {activity.report}
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {activity.time}
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
              key: "scheduled",
              label: "Scheduled",
              children: (
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="font-medium">No Scheduled Reports</p>
                      <p className="text-sm mt-1">
                        Schedule reports to run automatically
                      </p>
                      <Button variant="outline" className="mt-4">
                        Schedule Report
                      </Button>
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
