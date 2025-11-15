"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Save } from "lucide-react";
import Button from "@dsui/design-system/button";
import Input from "@dsui/design-system/input";
import Textarea from "@dsui/design-system/textarea";
import Switch from "@dsui/design-system/switch";
import Separator from "@dsui/design-system/separator";
import Tabs from "@dsui/design-system/tabs";
import Select from "@dsui/design-system/select";

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
        <Tabs
          defaultActiveKey="general"
          className="space-y-6"
          items={[
            {
              key: "general",
              label: "General",
              children: (
                <div className="space-y-6">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">
                      General Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Site Name</label>
                        <Input defaultValue="DSUI Admin Dashboard" />
                        <p className="text-xs text-muted-foreground">
                          The name of your application
                        </p>
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">
                          Site Description
                        </label>
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
                        <Select
                          options={[
                            { value: "en", label: "English" },
                            { value: "vi", label: "Tiếng Việt" },
                            { value: "ja", label: "日本語" },
                          ]}
                          defaultValue="en"
                          placeholder="Select language"
                        />
                      </div>

                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Timezone</label>
                        <Select
                          options={[
                            { value: "utc", label: "UTC" },
                            { value: "est", label: "Eastern Time" },
                            { value: "pst", label: "Pacific Time" },
                            { value: "jst", label: "Japan Standard Time" },
                          ]}
                          defaultValue="utc"
                          placeholder="Select timezone"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "security",
              label: "Security",
              children: (
                <div className="space-y-6">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">
                      Security Settings
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">
                            Two-Factor Authentication
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">
                            Session Timeout
                          </label>
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
                          <Input
                            type="password"
                            placeholder="Current password"
                          />
                          <Input type="password" placeholder="New password" />
                          <Input
                            type="password"
                            placeholder="Confirm new password"
                          />
                          <Button variant="outline">Update Password</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "notifications",
              label: "Notifications",
              children: (
                <div className="space-y-6">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">
                      Notification Preferences
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">
                            Email Notifications
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Receive email updates about your account
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">
                            Push Notifications
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Receive push notifications in your browser
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">
                            Marketing Emails
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Receive emails about new features and updates
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">
                            Security Alerts
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Get notified about security events
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              key: "appearance",
              label: "Appearance",
              children: (
                <div className="space-y-6">
                  <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">
                      Appearance Settings
                    </h3>
                    <div className="space-y-6">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Theme</label>
                        <Select
                          options={[
                            { value: "light", label: "Light" },
                            { value: "dark", label: "Dark" },
                            { value: "system", label: "System" },
                          ]}
                          defaultValue="system"
                          placeholder="Select theme"
                        />
                        <p className="text-xs text-muted-foreground">
                          Choose your preferred theme
                        </p>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">
                            Compact Mode
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Use a more compact layout
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">
                            Show Animations
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Enable interface animations
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
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
