"use client";

import { AdminLayout } from "@/components/admin-layout";
import Button from "@dsui/design-system/button";
import Input from "@dsui/design-system/input";
import {
  Badge,
  Avatar,
  Label,
  Checkbox,
  Switch,
  Textarea,
  Slider,
  Calendar,
  Skeleton,
  InputOTP,
  Radio,
  Select,
  DatePicker,
  Toggle,
  Breadcrumb,
  Command,
  Accordion,
  Separator,
  Resizable,
  Glass,
  Marquee,
  FloatingLabel,
} from "@dsui/design-system";
import { AlertCircle, CheckCircle, Home, Inbox, Settings } from "lucide-react";

export default function ComponentsPage() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Design System Components</h1>
          <p className="text-muted-foreground mt-2">
            Explore all available components from our design system, organized
            by category.
          </p>
        </div>

        {/* Form Components */}
        <div className="bg-card border rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Form Components</h3>
            <p className="text-sm text-muted-foreground">
              Input controls and form components
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="input">Input</Label>
                <Input id="input" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="select">Select</Label>
                <Select>
                  <option value="">Select option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Radio Group</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Radio name="radio" value="option1" id="r1" defaultChecked />
                  <Label htmlFor="r1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Radio name="radio" value="option2" id="r2" />
                  <Label htmlFor="r2">Option 2</Label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox" />
              <Label htmlFor="checkbox">Accept terms</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="switch" />
              <Label htmlFor="switch">Enable notifications</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Toggle />
              <Label>Toggle Button</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Enter your message..." />
            </div>

            <div className="space-y-2">
              <Label>Slider</Label>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Input OTP</Label>
              <InputOTP />
            </div>

            <div className="space-y-2">
              <Label>Date Picker</Label>
              <DatePicker />
            </div>

            <div className="space-y-2">
              <Label>Button Variants</Label>
              <div className="flex gap-2 flex-wrap">
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="solid">Solid</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Display */}
        <div className="bg-card border rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Data Display</h3>
            <p className="text-sm text-muted-foreground">
              Components for displaying data
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar />
              <div>
                <p className="font-medium">Avatar Component</p>
                <p className="text-sm text-muted-foreground">
                  With image and fallback
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="outline">Secondary</Badge>
              <Badge variant="solid">Destructive</Badge>
            </div>

            <div className="space-y-2">
              <Label>Skeleton</Label>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Calendar</Label>
              <Calendar mode="single" className="rounded-md border" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-card border rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <p className="text-sm text-muted-foreground">
              Menus, trees, and navigation elements
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Breadcrumb</Label>
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Components", href: "/components" },
                  { label: "Navigation" },
                ]}
              />
            </div>

            <div className="space-y-2">
              <Label>Pagination</Label>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded">1</button>
                <button className="px-3 py-1 border rounded bg-blue-500 text-white">
                  2
                </button>
                <button className="px-3 py-1 border rounded">3</button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tabs</Label>
              <div className="border rounded-md p-4">
                <p>Tabs component demo - requires items prop</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Command Palette</Label>
              <Command>
                <Command.Input placeholder="Type a command..." />
                <Command.List>
                  <Command.Item>Search</Command.Item>
                  <Command.Item>Settings</Command.Item>
                </Command.List>
              </Command>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="bg-card border rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Layout</h3>
            <p className="text-sm text-muted-foreground">
              Dialogs, sheets, and overlays
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Accordion</Label>
              <Accordion type="single" collapsible>
                <Accordion.Item value="item1">
                  <Accordion.Trigger>Accordion Item 1</Accordion.Trigger>
                  <Accordion.Content>
                    Content for accordion item 1.
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item value="item2">
                  <Accordion.Trigger>Accordion Item 2</Accordion.Trigger>
                  <Accordion.Content>
                    Content for accordion item 2.
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="space-y-2">
              <Label>Collapsible</Label>
              <div className="border rounded p-4">
                <p>Collapsible component demo</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => alert("Dialog would open here!")}>
                Open Dialog
              </Button>
              <Button
                variant="outline"
                onClick={() => alert("Sheet would open here!")}
              >
                Open Sheet
              </Button>
              <Button
                variant="outline"
                onClick={() => alert("Popover would open here!")}
              >
                Open Popover
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Sidebar</Label>
              <div className="w-64 border rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Inbox className="h-4 w-4" />
                    <span>Inbox</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </div>
                <div className="mt-4 p-4 border-t">
                  <p>Main content area</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Resizable Panels</Label>
              <Resizable.PanelGroup direction="horizontal">
                <Resizable.Panel>Panel 1</Resizable.Panel>
                <Resizable.Handle />
                <Resizable.Panel>Panel 2</Resizable.Panel>
              </Resizable.PanelGroup>
            </div>

            <div className="space-y-2">
              <Label>Scroll Area</Label>
              <div className="h-32 w-full border rounded p-4 overflow-auto">
                <p>Scrollable content...</p>
                <p>More content...</p>
                <p>Even more content...</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Masonry</Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-muted p-4 rounded">Item 1</div>
                <div className="bg-muted p-4 rounded">Item 2</div>
                <div className="bg-muted p-4 rounded">Item 3</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-card border rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Feedback</h3>
            <p className="text-sm text-muted-foreground">
              Alerts, toasts, and notifications
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-start space-x-3 p-4 border border-yellow-200 bg-yellow-50 rounded-md">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Warning</h4>
                <p className="text-sm text-yellow-700">
                  This is a warning alert with an icon.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border border-green-200 bg-green-50 rounded-md">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">Success</h4>
                <p className="text-sm text-green-700">
                  This is a success alert.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tooltip</Label>
              <Button title="This is a tooltip">Hover me</Button>
            </div>

            <div className="space-y-2">
              <Label>Tour</Label>
              <Button onClick={() => alert("Tour would start here!")}>
                Start Tour
              </Button>
            </div>
          </div>
        </div>

        {/* Menus */}
        <div className="bg-card border rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Menus</h3>
            <p className="text-sm text-muted-foreground">
              Dropdown menus and context menus
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex gap-2">
              <div className="border rounded p-4">
                <p>DropdownMenu component demo</p>
              </div>
              <div className="border rounded p-4">
                <p>ContextMenu component demo</p>
              </div>
              <div className="border rounded p-4">
                <p>Popover component demo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Utility */}
        <div className="bg-card border rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Utility</h3>
            <p className="text-sm text-muted-foreground">
              Specialized utility components
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Glass Effect</Label>
              <Glass className="p-4">
                <p>This is a glass effect component.</p>
              </Glass>
            </div>

            <div className="space-y-2">
              <Label>Marquee</Label>
              <Marquee className="bg-muted p-2 rounded">
                Scrolling text • Another scrolling text •
              </Marquee>
            </div>

            <div className="space-y-2">
              <Label>Cropper</Label>
              <div className="w-32 h-32 bg-gray-100 border rounded flex items-center justify-center text-gray-500 text-sm">
                Cropper Placeholder
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload</Label>
              <div className="border rounded p-4">
                <p>Upload component demo</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Stepper</Label>
              <div className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    1
                  </div>
                  <div className="text-xs mt-1">Step 1</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm">
                    2
                  </div>
                  <div className="text-xs mt-1">Step 2</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm">
                    3
                  </div>
                  <div className="text-xs mt-1">Step 3</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Floating Label</Label>
              <FloatingLabel>
                <Input placeholder="Floating label input" />
              </FloatingLabel>
            </div>

            <div className="space-y-2">
              <Label>Time Grid View</Label>
              <div className="border rounded p-4">
                <p>Time Grid View component demo</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Wheel Column</Label>
              <div className="border rounded p-4">
                <p>Wheel Column component demo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
