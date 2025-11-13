'use client';

import { AdminLayout } from '@/components/admin-layout';
import { Save } from 'lucide-react';
import { Button } from 'dsui/button';
import { Input } from 'dsui/input';
import { Textarea } from 'dsui/textarea';
import { Switch } from 'dsui/switch';
import { Separator } from 'dsui/separator';
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

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your application settings and preferences
            </p>
          </div>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">General Settings</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Site Name</label>
                  <Input defaultValue="DSUI Admin Dashboard" />
                  <p className="text-xs text-muted-foreground">
                    The name of your application
                  </p>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Site Description</label>
                  <Textarea
                    defaultValue="A modern admin dashboard built with DSUI design system"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    A brief description of your application
                  </p>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="vi">Tiếng Việt</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Timezone</label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="jst">Japan Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Two-Factor Authentication</label>
                    <p className="text-xs text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Session Timeout</label>
                    <p className="text-xs text-muted-foreground">
                      Automatically log out after inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Change Password</h4>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <Button variant="outline">Update Password</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Email Notifications</label>
                    <p className="text-xs text-muted-foreground">
                      Receive email updates about your account
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Push Notifications</label>
                    <p className="text-xs text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Marketing Emails</label>
                    <p className="text-xs text-muted-foreground">
                      Receive emails about new features and updates
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Security Alerts</label>
                    <p className="text-xs text-muted-foreground">
                      Get notified about security events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Appearance Settings</h3>
              <div className="space-y-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Theme</label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Choose your preferred theme
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Compact Mode</label>
                    <p className="text-xs text-muted-foreground">
                      Use a more compact layout
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Show Animations</label>
                    <p className="text-xs text-muted-foreground">
                      Enable interface animations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
