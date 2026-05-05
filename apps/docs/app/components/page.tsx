"use client";

import { AdminLayout } from "@/components/admin-layout";
import {
  Button,
  Badge,
  Avatar,
  Label,
  Checkbox,
  Switch,
  Textarea,
  Slider,
  Calendar,
  Skeleton,
  Input,
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
} from "@sth87/shadcn-design-system";
import { AlertCircle, CheckCircle, Home, Inbox, Settings } from "lucide-react";

export default function ComponentsPage() {
  return (
    <AdminLayout>
      <div className="ds:p-6 ds:space-y-8">
        <div>
          <h1 className="ds:text-3xl ds:font-bold">Design System Components</h1>
          <p className="ds:text-muted-foreground ds:mt-2">
            Explore all available components from our design system, organized
            by category.
          </p>
        </div>

        {/* Form Components */}
        <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
          <div className="ds:p-6">
            <h3 className="ds:text-lg ds:font-semibold">Form Components</h3>
            <p className="ds:text-sm ds:text-muted-foreground">
              Input controls and form components
            </p>
          </div>
          <div className="ds:p-6 ds:space-y-6">
            <div className="ds:grid ds:grid-cols-1 ds:md:grid-cols-2 ds:gap-6">
              <div className="ds:space-y-2">
                <Label htmlFor="input">Input</Label>
                <Input id="input" placeholder="Enter text..." />
              </div>
              <div className="ds:space-y-2">
                <Label htmlFor="select">Select</Label>
                <Select>
                  <option value="">Select option</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </div>
            </div>

            <div className="ds:space-y-2">
              <Label>Radio Group</Label>
              <div className="ds:space-y-2">
                <Radio
                  color="primary"
                  options={[
                    { label: "Option 1", value: "option1" },
                    {
                      label: "Option disabled",
                      value: "option2",
                      disabled: true,
                    },
                    { label: "Option 3", value: "option3" },
                  ]}
                />
              </div>
            </div>

            <div className="ds:flex ds:items-center ds:space-x-2">
              <Checkbox
                id="checkbox"
                variant="default"
                color="primary"
                label="Accept terms"
              />
            </div>

            <div className="ds:flex ds:items-center ds:space-x-2">
              <Switch id="switch" />
              <Label htmlFor="switch">Enable notifications</Label>
            </div>

            <div className="ds:flex ds:items-center ds:space-x-2">
              <Toggle />
              <Label>Toggle Button</Label>
            </div>

            <div className="ds:space-y-2">
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Enter your message..." />
            </div>

            <div className="ds:space-y-2">
              <Label>Slider</Label>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                className="ds:w-full"
              />
            </div>

            <div className="ds:space-y-2">
              <Label>Input OTP</Label>
              <InputOTP />
            </div>

            <div className="ds:space-y-2">
              <Label>Date Picker</Label>
              <DatePicker />
            </div>

            <div className="ds:space-y-2">
              <Label>Button Variants</Label>
              <div className="ds:flex ds:gap-2 ds:flex-wrap">
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
        <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
          <div className="ds:p-6">
            <h3 className="ds:text-lg ds:font-semibold">Data Display</h3>
            <p className="ds:text-sm ds:text-muted-foreground">
              Components for displaying data
            </p>
          </div>
          <div className="ds:p-6 ds:space-y-6">
            <div className="ds:flex ds:items-center ds:space-x-4">
              <Avatar />
              <div>
                <p className="ds:font-medium">Avatar Component</p>
                <p className="ds:text-sm ds:text-muted-foreground">
                  With image and fallback
                </p>
              </div>
            </div>

            <div className="ds:flex ds:flex-wrap ds:gap-2">
              <Badge>Default</Badge>
              <Badge variant="outline">Secondary</Badge>
              <Badge variant="solid">Destructive</Badge>
            </div>

            <div className="ds:space-y-2">
              <Label>Skeleton</Label>
              <div className="ds:space-y-2">
                <Skeleton className="ds:h-4 ds:w-[250px]" />
                <Skeleton className="ds:h-4 ds:w-[200px]" />
              </div>
            </div>

            <div className="ds:space-y-2">
              <Label>Calendar</Label>
              <Calendar mode="single" className="ds:rounded-md ds:border" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
          <div className="ds:p-6">
            <h3 className="ds:text-lg ds:font-semibold">Navigation</h3>
            <p className="ds:text-sm ds:text-muted-foreground">
              Menus, trees, and navigation elements
            </p>
          </div>
          <div className="ds:p-6 ds:space-y-6">
            <div className="ds:space-y-2">
              <Label>Breadcrumb</Label>
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Components", href: "/components" },
                  { label: "Navigation" },
                ]}
              />
            </div>

            <div className="ds:space-y-2">
              <Label>Pagination</Label>
              <div className="ds:flex ds:space-x-2">
                <button className="ds:px-3 ds:py-1 ds:border ds:rounded">1</button>
                <button className="ds:px-3 ds:py-1 ds:border ds:rounded ds:bg-blue-500 ds:text-white">
                  2
                </button>
                <button className="ds:px-3 ds:py-1 ds:border ds:rounded">3</button>
              </div>
            </div>

            <div className="ds:space-y-2">
              <Label>Tabs</Label>
              <div className="ds:border ds:rounded-md ds:p-4">
                <p>Tabs component demo - requires items prop</p>
              </div>
            </div>

            <div className="ds:space-y-2">
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
        <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
          <div className="ds:p-6">
            <h3 className="ds:text-lg ds:font-semibold">Layout</h3>
            <p className="ds:text-sm ds:text-muted-foreground">
              Dialogs, sheets, and overlays
            </p>
          </div>
          <div className="ds:p-6 ds:space-y-6">
            <div className="ds:space-y-2">
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

            <div className="ds:space-y-2">
              <Label>Collapsible</Label>
              <div className="ds:border ds:rounded ds:p-4">
                <p>Collapsible component demo</p>
              </div>
            </div>

            <div className="ds:flex ds:gap-2">
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

            <div className="ds:space-y-2">
              <Label>Sidebar</Label>
              <div className="ds:w-64 ds:border ds:rounded-lg ds:p-4">
                <div className="ds:space-y-2">
                  <div className="ds:flex ds:items-center ds:space-x-2">
                    <Home className="ds:h-4 ds:w-4" />
                    <span>Home</span>
                  </div>
                  <div className="ds:flex ds:items-center ds:space-x-2">
                    <Inbox className="ds:h-4 ds:w-4" />
                    <span>Inbox</span>
                  </div>
                  <div className="ds:flex ds:items-center ds:space-x-2">
                    <Settings className="ds:h-4 ds:w-4" />
                    <span>Settings</span>
                  </div>
                </div>
                <div className="ds:mt-4 ds:p-4 ds:border-t">
                  <p>Main content area</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="ds:space-y-2">
              <Label>Resizable Panels</Label>
              <Resizable.PanelGroup direction="horizontal">
                <Resizable.Panel>Panel 1</Resizable.Panel>
                <Resizable.Handle />
                <Resizable.Panel>Panel 2</Resizable.Panel>
              </Resizable.PanelGroup>
            </div>

            <div className="ds:space-y-2">
              <Label>Scroll Area</Label>
              <div className="ds:h-32 ds:w-full ds:border ds:rounded ds:p-4 ds:overflow-auto">
                <p>Scrollable content...</p>
                <p>More content...</p>
                <p>Even more content...</p>
              </div>
            </div>

            <div className="ds:space-y-2">
              <Label>Masonry</Label>
              <div className="ds:grid ds:grid-cols-3 ds:gap-2">
                <div className="ds:bg-muted ds:p-4 ds:rounded">Item 1</div>
                <div className="ds:bg-muted ds:p-4 ds:rounded">Item 2</div>
                <div className="ds:bg-muted ds:p-4 ds:rounded">Item 3</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
          <div className="ds:p-6">
            <h3 className="ds:text-lg ds:font-semibold">Feedback</h3>
            <p className="ds:text-sm ds:text-muted-foreground">
              Alerts, toasts, and notifications
            </p>
          </div>
          <div className="ds:p-6 ds:space-y-6">
            <div className="ds:flex ds:items-start ds:space-x-3 ds:p-4 ds:border ds:border-yellow-200 ds:bg-yellow-50 ds:rounded-md">
              <AlertCircle className="ds:h-4 ds:w-4 ds:text-yellow-600 ds:mt-0.5" />
              <div>
                <h4 className="ds:font-medium ds:text-yellow-800">Warning</h4>
                <p className="ds:text-sm ds:text-yellow-700">
                  This is a warning alert with an icon.
                </p>
              </div>
            </div>

            <div className="ds:flex ds:items-start ds:space-x-3 ds:p-4 ds:border ds:border-green-200 ds:bg-green-50 ds:rounded-md">
              <CheckCircle className="ds:h-4 ds:w-4 ds:text-green-600 ds:mt-0.5" />
              <div>
                <h4 className="ds:font-medium ds:text-green-800">Success</h4>
                <p className="ds:text-sm ds:text-green-700">
                  This is a success alert.
                </p>
              </div>
            </div>

            <div className="ds:space-y-2">
              <Label>Tooltip</Label>
              <Button title="This is a tooltip">Hover me</Button>
            </div>

            <div className="ds:space-y-2">
              <Label>Tour</Label>
              <Button onClick={() => alert("Tour would start here!")}>
                Start Tour
              </Button>
            </div>
          </div>
        </div>

        {/* Menus */}
        <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
          <div className="ds:p-6">
            <h3 className="ds:text-lg ds:font-semibold">Menus</h3>
            <p className="ds:text-sm ds:text-muted-foreground">
              Dropdown menus and context menus
            </p>
          </div>
          <div className="ds:p-6 ds:space-y-6">
            <div className="ds:flex ds:gap-2">
              <div className="ds:border ds:rounded ds:p-4">
                <p>DropdownMenu component demo</p>
              </div>
              <div className="ds:border ds:rounded ds:p-4">
                <p>ContextMenu component demo</p>
              </div>
              <div className="ds:border ds:rounded ds:p-4">
                <p>Popover component demo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Utility */}
        <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
          <div className="ds:p-6">
            <h3 className="ds:text-lg ds:font-semibold">Utility</h3>
            <p className="ds:text-sm ds:text-muted-foreground">
              Specialized utility components
            </p>
          </div>
          <div className="ds:p-6 ds:space-y-6">
            <div className="ds:space-y-2">
              <Label>Glass Effect</Label>
              <Glass className="ds:p-4">
                <p>This is a glass effect component.</p>
              </Glass>
            </div>

            <div className="ds:space-y-2">
              <Label>Marquee</Label>
              <Marquee className="ds:bg-muted ds:p-2 ds:rounded">
                Scrolling text • Another scrolling text •
              </Marquee>
            </div>

            <div className="ds:space-y-2">
              <Label>Cropper</Label>
              <div className="ds:w-32 ds:h-32 ds:bg-gray-100 ds:border ds:rounded ds:flex ds:items-center ds:justify-center ds:text-gray-500 ds:text-sm">
                Cropper Placeholder
              </div>
            </div>

            <div className="ds:space-y-2">
              <Label>Upload</Label>
              <div className="ds:border ds:rounded ds:p-4">
                <p>Upload component demo</p>
              </div>
            </div>

            <div className="ds:space-y-2">
              <Label>Stepper</Label>
              <div className="ds:flex ds:space-x-4">
                <div className="ds:flex ds:flex-col ds:items-center">
                  <div className="ds:w-8 ds:h-8 ds:bg-blue-500 ds:rounded-full ds:flex ds:items-center ds:justify-center ds:text-white ds:text-sm">
                    1
                  </div>
                  <div className="ds:text-xs ds:mt-1">Step 1</div>
                </div>
                <div className="ds:flex ds:flex-col ds:items-center">
                  <div className="ds:w-8 ds:h-8 ds:bg-gray-300 ds:rounded-full ds:flex ds:items-center ds:justify-center ds:text-gray-600 ds:text-sm">
                    2
                  </div>
                  <div className="ds:text-xs ds:mt-1">Step 2</div>
                </div>
                <div className="ds:flex ds:flex-col ds:items-center">
                  <div className="ds:w-8 ds:h-8 ds:bg-gray-300 ds:rounded-full ds:flex ds:items-center ds:justify-center ds:text-gray-600 ds:text-sm">
                    3
                  </div>
                  <div className="ds:text-xs ds:mt-1">Step 3</div>
                </div>
              </div>
            </div>

            <div className="ds:space-y-2">
              <Label>Floating Label</Label>
              <FloatingLabel>
                <Input placeholder="Floating label input" />
              </FloatingLabel>
            </div>

            <div className="ds:space-y-2">
              <Label>Time Grid View</Label>
              <div className="ds:border ds:rounded ds:p-4">
                <p>Time Grid View component demo</p>
              </div>
            </div>

            <div className="ds:space-y-2">
              <Label>Wheel Column</Label>
              <div className="ds:border ds:rounded ds:p-4">
                <p>Wheel Column component demo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
