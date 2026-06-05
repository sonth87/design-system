"use client";

import { AdminLayout } from "@/components/admin-layout";
import { Save } from "lucide-react";
import Button from "@sth87/shadcn-design-system/button";
import Input from "@sth87/shadcn-design-system/input";
import Textarea from "@sth87/shadcn-design-system/textarea";
import Switch from "@sth87/shadcn-design-system/switch";
import Separator from "@sth87/shadcn-design-system/separator";
import Tabs from "@sth87/shadcn-design-system/tabs";
import Select from "@sth87/shadcn-design-system/select";

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="ds:space-y-6">
        {/* Page Header */}
        <div className="ds:flex ds:items-center ds:justify-between">
          <div>
            <h1 className="ds:text-3xl ds:font-bold ds:tracking-tight">Settings</h1>
            <p className="ds:text-muted-foreground">
              Manage your application settings and preferences
            </p>
          </div>
          <Button>
            <Save className="ds:mr-2 ds:h-4 ds:w-4" />
            Save Changes
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs
          defaultActiveKey="general"
          className="ds:space-y-6"
          items={[
            {
              key: "general",
              label: "General",
              children: (
                <div className="ds:space-y-6">
                  <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                    <h3 className="ds:text-lg ds:font-semibold ds:mb-4">
                      General Settings
                    </h3>
                    <div className="ds:space-y-4">
                      <div className="ds:grid ds:gap-2">
                        <label className="ds:text-sm ds:font-medium">Site Name</label>
                        <Input defaultValue="DSUI Admin Dashboard" />
                        <p className="ds:text-xs ds:text-muted-foreground">
                          The name of your application
                        </p>
                      </div>

                      <div className="ds:grid ds:gap-2">
                        <label className="ds:text-sm ds:font-medium">
                          Site Description
                        </label>
                        <Textarea
                          defaultValue="A modern admin dashboard built with DSUI design system"
                          rows={3}
                        />
                        <p className="ds:text-xs ds:text-muted-foreground">
                          A brief description of your application
                        </p>
                      </div>

                      <div className="ds:grid ds:gap-2">
                        <label className="ds:text-sm ds:font-medium">Language</label>
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

                      <div className="ds:grid ds:gap-2">
                        <label className="ds:text-sm ds:font-medium">Timezone</label>
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
                <div className="ds:space-y-6">
                  <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                    <h3 className="ds:text-lg ds:font-semibold ds:mb-4">
                      Security Settings
                    </h3>
                    <div className="ds:space-y-6">
                      <div className="ds:flex ds:items-center ds:justify-between">
                        <div className="ds:space-y-0.5">
                          <label className="ds:text-sm ds:font-medium">
                            Two-Factor Authentication
                          </label>
                          <p className="ds:text-xs ds:text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <Separator />

                      <div className="ds:flex ds:items-center ds:justify-between">
                        <div className="ds:space-y-0.5">
                          <label className="ds:text-sm ds:font-medium">
                            Session Timeout
                          </label>
                          <p className="ds:text-xs ds:text-muted-foreground">
                            Automatically log out after inactivity
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="ds:space-y-4">
                        <h4 className="ds:text-sm ds:font-medium">Change Password</h4>
                        <div className="ds:space-y-3">
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
                <div className="ds:space-y-6">
                  <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                    <h3 className="ds:text-lg ds:font-semibold ds:mb-4">
                      Notification Preferences
                    </h3>
                    <div className="ds:space-y-6">
                      <div className="ds:flex ds:items-center ds:justify-between">
                        <div className="ds:space-y-0.5">
                          <label className="ds:text-sm ds:font-medium">
                            Email Notifications
                          </label>
                          <p className="ds:text-xs ds:text-muted-foreground">
                            Receive email updates about your account
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="ds:flex ds:items-center ds:justify-between">
                        <div className="ds:space-y-0.5">
                          <label className="ds:text-sm ds:font-medium">
                            Push Notifications
                          </label>
                          <p className="ds:text-xs ds:text-muted-foreground">
                            Receive push notifications in your browser
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <Separator />

                      <div className="ds:flex ds:items-center ds:justify-between">
                        <div className="ds:space-y-0.5">
                          <label className="ds:text-sm ds:font-medium">
                            Marketing Emails
                          </label>
                          <p className="ds:text-xs ds:text-muted-foreground">
                            Receive emails about new features and updates
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <Separator />

                      <div className="ds:flex ds:items-center ds:justify-between">
                        <div className="ds:space-y-0.5">
                          <label className="ds:text-sm ds:font-medium">
                            Security Alerts
                          </label>
                          <p className="ds:text-xs ds:text-muted-foreground">
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
                <div className="ds:space-y-6">
                  <div className="ds:rounded-lg ds:border ds:bg-card ds:p-6 ds:shadow-sm">
                    <h3 className="ds:text-lg ds:font-semibold ds:mb-4">
                      Appearance Settings
                    </h3>
                    <div className="ds:space-y-6">
                      <div className="ds:grid ds:gap-2">
                        <label className="ds:text-sm ds:font-medium">Theme</label>
                        <Select
                          options={[
                            { value: "light", label: "Light" },
                            { value: "dark", label: "Dark" },
                            { value: "system", label: "System" },
                          ]}
                          defaultValue="system"
                          placeholder="Select theme"
                        />
                        <p className="ds:text-xs ds:text-muted-foreground">
                          Choose your preferred theme
                        </p>
                      </div>

                      <Separator />

                      <div className="ds:flex ds:items-center ds:justify-between">
                        <div className="ds:space-y-0.5">
                          <label className="ds:text-sm ds:font-medium">
                            Compact Mode
                          </label>
                          <p className="ds:text-xs ds:text-muted-foreground">
                            Use a more compact layout
                          </p>
                        </div>
                        <Switch />
                      </div>

                      <Separator />

                      <div className="ds:flex ds:items-center ds:justify-between">
                        <div className="ds:space-y-0.5">
                          <label className="ds:text-sm ds:font-medium">
                            Show Animations
                          </label>
                          <p className="ds:text-xs ds:text-muted-foreground">
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
