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
      <div className="ds:space-y-6">
        {/* Page Header */}
        <div className="ds:flex ds:items-center ds:justify-between">
          <div>
            <h1 className="ds:text-3xl ds:font-bold ds:tracking-tight">Reports</h1>
            <p className="ds:text-muted-foreground">
              Generate and manage your business reports
            </p>
          </div>
          <Button>
            <FileText className="ds:mr-2 ds:h-4 ds:w-4" />
            Generate Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="ds:grid ds:gap-4 ds:md:grid-cols-3">
          <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
            <div className="ds:flex ds:items-center ds:justify-between">
              <p className="ds:text-sm ds:font-medium ds:text-muted-foreground">
                Total Reports
              </p>
              <FileText className="ds:h-4 ds:w-4 ds:text-muted-foreground" />
            </div>
            <div className="ds:mt-3">
              <p className="ds:text-2xl ds:font-bold">{reports.length}</p>
              <p className="ds:text-sm ds:text-green-600 ds:mt-1">+3 this month</p>
            </div>
          </div>

          <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
            <div className="ds:flex ds:items-center ds:justify-between">
              <p className="ds:text-sm ds:font-medium ds:text-muted-foreground">
                Total Views
              </p>
              <Eye className="ds:h-4 ds:w-4 ds:text-muted-foreground" />
            </div>
            <div className="ds:mt-3">
              <p className="ds:text-2xl ds:font-bold">
                {reports.reduce((sum, r) => sum + r.views, 0)}
              </p>
              <p className="ds:text-sm ds:text-green-600 ds:mt-1">+12% from last week</p>
            </div>
          </div>

          <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
            <div className="ds:flex ds:items-center ds:justify-between">
              <p className="ds:text-sm ds:font-medium ds:text-muted-foreground">
                In Progress
              </p>
              <TrendingUp className="ds:h-4 ds:w-4 ds:text-muted-foreground" />
            </div>
            <div className="ds:mt-3">
              <p className="ds:text-2xl ds:font-bold">
                {reports.filter((r) => r.status === "processing").length}
              </p>
              <p className="ds:text-sm ds:text-muted-foreground ds:mt-1">
                Currently processing
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultActiveKey="all"
          className="ds:space-y-4"
          items={[
            {
              key: "all",
              label: "All Reports",
              children: (
                <div className="ds:space-y-4">
                  {/* Filters */}
                  <div className="ds:flex ds:flex-col ds:gap-4 ds:md:flex-row ds:md:items-center ds:md:justify-between">
                    <div className="ds:relative ds:flex-1 ds:max-w-md">
                      <Filter className="ds:absolute ds:left-3 ds:top-1/2 ds:h-4 ds:w-4 ds:-translate-y-1/2 ds:text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search reports..."
                        className="ds:pl-9"
                      />
                    </div>
                    <div className="ds:flex ds:gap-2">
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
                        <Calendar className="ds:h-4 ds:w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Reports Grid */}
                  <div className="ds:grid ds:gap-4 ds:md:grid-cols-2 ds:lg:grid-cols-3">
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className="ds:group ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm ds:transition-all ds:hover:shadow-md"
                      >
                        <div className="ds:flex ds:items-start ds:justify-between ds:mb-3">
                          <div className="ds:flex ds:items-center ds:gap-2">
                            <div className="ds:flex ds:h-10 ds:w-10 ds:items-center ds:justify-center ds:rounded-lg ds:bg-primary/10">
                              <FileText className="ds:h-5 ds:w-5 ds:text-primary" />
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
                            className="ds:opacity-0 ds:group-hover:opacity-100 ds:transition-opacity"
                          >
                            <MoreVertical className="ds:h-4 ds:w-4" />
                          </Button>
                        </div>

                        <h3 className="ds:font-semibold ds:mb-1">{report.title}</h3>
                        <p className="ds:text-sm ds:text-muted-foreground ds:mb-4 ds:line-clamp-2">
                          {report.description}
                        </p>

                        <div className="ds:flex ds:items-center ds:justify-between ds:text-sm ds:text-muted-foreground ds:mb-4">
                          <span>{report.category}</span>
                          <span>{report.format}</span>
                        </div>

                        <div className="ds:flex ds:items-center ds:justify-between ds:pt-4 ds:border-t">
                          <div className="ds:flex ds:items-center ds:gap-4 ds:text-sm ds:text-muted-foreground">
                            <div className="ds:flex ds:items-center ds:gap-1">
                              <Eye className="ds:h-3 ds:w-3" />
                              {report.views}
                            </div>
                            <span>{report.date}</span>
                          </div>
                          <div className="ds:flex ds:gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="ds:h-4 ds:w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="ds:h-4 ds:w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Share2 className="ds:h-4 ds:w-4" />
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
                <div className="ds:rounded-lg ds:border ds:bg-card ds:shadow-sm">
                  <div className="ds:p-6">
                    <h3 className="ds:text-lg ds:font-semibold ds:mb-4">
                      Recent Activity
                    </h3>
                    <div className="ds:space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div
                          key={index}
                          className="ds:flex ds:items-center ds:justify-between ds:py-3 ds:border-b ds:last:border-0"
                        >
                          <div className="ds:flex ds:items-center ds:gap-3">
                            <div className="ds:flex ds:h-10 ds:w-10 ds:items-center ds:justify-center ds:rounded-full ds:bg-primary/10">
                              <FileText className="ds:h-4 ds:w-4 ds:text-primary" />
                            </div>
                            <div>
                              <p className="ds:text-sm">
                                <span className="ds:font-medium">
                                  {activity.user}
                                </span>{" "}
                                {activity.action}{" "}
                                <span className="ds:font-medium">
                                  {activity.report}
                                </span>
                              </p>
                              <p className="ds:text-xs ds:text-muted-foreground">
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
                <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                  <div className="h-[400px] ds:flex ds:items-center ds:justify-center ds:border-2 ds:border-dashed ds:rounded-lg">
                    <div className="ds:text-center ds:text-muted-foreground">
                      <Calendar className="ds:h-12 ds:w-12 ds:mx-auto ds:mb-2 ds:opacity-50" />
                      <p className="ds:font-medium">No Scheduled Reports</p>
                      <p className="ds:text-sm ds:mt-1">
                        Schedule reports to run automatically
                      </p>
                      <Button variant="outline" className="ds:mt-4">
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
