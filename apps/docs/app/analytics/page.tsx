'use client';

import { AdminLayout } from '@/components/admin-layout';
import { TrendingUp, TrendingDown, Activity, Users, DollarSign } from 'lucide-react';
import { Button } from 'dsui/button';
import { Badge } from 'dsui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'dsui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'dsui/select';

const metrics = [
  {
    label: 'Total Revenue',
    value: '$45,231',
    change: '+12.5%',
    trend: 'up',
  },
  {
    label: 'Active Users',
    value: '2,350',
    change: '+8.2%',
    trend: 'up',
  },
  {
    label: 'Conversion Rate',
    value: '3.2%',
    change: '-2.1%',
    trend: 'down',
  },
  {
    label: 'Avg. Session',
    value: '4m 32s',
    change: '+5.7%',
    trend: 'up',
  },
];

const topPages = [
  { page: '/dashboard', views: 4521, bounce: '32.5%' },
  { page: '/products', views: 3842, bounce: '28.1%' },
  { page: '/pricing', views: 2917, bounce: '41.2%' },
  { page: '/about', views: 1834, bounce: '35.8%' },
  { page: '/contact', views: 1256, bounce: '52.3%' },
];

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">
              Track your performance and insights
            </p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="7d">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export</Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </p>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p
                  className={`mt-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {metric.change} from last period
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Chart Placeholder 1 */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Revenue Trend</h3>
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Revenue chart would be displayed here</p>
                  </div>
                </div>
              </div>

              {/* Chart Placeholder 2 */}
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">User Growth</h3>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>User growth chart would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Pages */}
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div
                    key={page.page}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 justify-center">
                        {index + 1}
                      </Badge>
                      <code className="text-sm font-mono">{page.page}</code>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium">{page.views}</p>
                        <p className="text-xs text-muted-foreground">views</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{page.bounce}</p>
                        <p className="text-xs text-muted-foreground">bounce</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="traffic">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Traffic analytics would be displayed here</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Engagement metrics would be displayed here</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conversions">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Conversion funnel would be displayed here</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
