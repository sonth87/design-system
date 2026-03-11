# Components Reference — M to Z
## @sth87/shadcn-design-system

---

## 4.24 Marquee

Auto-scrolling content belt. Supports horizontal/vertical direction, hover-pause, and RTL.

**Import:**
```tsx
import { Marquee } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  speed?: number;            // pixels per second (or use duration)
  duration?: string;         // CSS duration override, e.g. "20s"
  gap?: number;              // px gap between items
  pauseOnHover?: boolean;    // default true
  reverse?: boolean;         // reverse scroll direction
  repeat?: number;           // how many times to duplicate content
  vertical?: boolean;        // shorthand for direction="up"
  color?: BasicColor;
  className?: string;
  itemClassName?: string;
}
```

**Examples:**
```tsx
// Logo strip
<Marquee gap={40} pauseOnHover>
  {logos.map((logo) => (
    <img key={logo.id} src={logo.src} className="h-10 opacity-60" />
  ))}
</Marquee>

// Bidirectional rows
<>
  <Marquee direction="left" duration="25s">
    {cards.slice(0, 5).map((c) => <TestimonialCard key={c.id} {...c} />)}
  </Marquee>
  <Marquee direction="right" duration="25s">
    {cards.slice(5).map((c) => <TestimonialCard key={c.id} {...c} />)}
  </Marquee>
</>

// Vertical ticker
<Marquee vertical duration="15s" className="h-32">
  {news.map((item) => <p key={item.id} className="py-1">{item.title}</p>)}
</Marquee>
```

---

## 4.25 Masonry

Responsive Pinterest-style masonry layout using CSS columns.

**Import:**
```tsx
import { Masonry } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface MasonryProps {
  items: React.ReactNode[];
  columns?: number | Record<number, number>;  // fixed or breakpoint map { 0: 1, 640: 2, 1024: 3 }
  gap?: number;                               // px gap, default 16
  className?: string;
}
```

**Examples:**
```tsx
// 3-column photo wall
<Masonry
  columns={3}
  gap={12}
  items={photos.map((p) => (
    <img key={p.id} src={p.src} className="w-full rounded-lg" />
  ))}
/>

// Responsive columns
<Masonry
  columns={{ 0: 1, 640: 2, 1024: 3, 1280: 4 }}
  gap={16}
  items={cards}
/>
```

---

## 4.26 Pagination

Page navigation control.

**Import:**
```tsx
import { Pagination } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;            // pages shown on each side of active
  boundaries?: number;          // pages shown at start and end
  color?: BasicColor;
  size?: "xs" | "sm" | "normal" | "lg";
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  className?: string;
}
```

**Examples:**
```tsx
const [page, setPage] = useState(1);
<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  color="primary"
  siblings={1}
/>

// Large pagination
<Pagination
  currentPage={page}
  totalPages={50}
  onPageChange={setPage}
  size="lg"
  showFirstLast
  boundaries={2}
/>
```

---

## 4.27 Popover

Non-modal floating content panel.

**Import:**
```tsx
import { Popover } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
  contentClassName?: string;
}
```

**Examples:**
```tsx
<Popover trigger={<Button variant="outline">Filter options</Button>} side="bottom" align="end">
  <div className="p-4 space-y-2 w-64">
    <p className="font-medium text-sm">Filter by status</p>
    <Checkbox label="Active" />
    <Checkbox label="Inactive" />
    <Button size="sm" className="w-full mt-2">Apply</Button>
  </div>
</Popover>

// Controlled
<Popover
  trigger={<Button>Info</Button>}
  open={popoverOpen}
  onOpenChange={setPopoverOpen}
>
  <InfoContent />
</Popover>
```

---

## 4.28 QrCode

QR code generator from string data.

**Import:**
```tsx
import { QrCode } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface QrCodeProps {
  value: string;                              // URL or text to encode
  size?: number;                              // px, default 160
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";  // default "M"
  color?: { foreground?: string; background?: string };
  logo?: string;                              // center logo URL
  logoSize?: number;                          // px
  className?: string;
}
```

**Examples:**
```tsx
// Basic URL QR
<QrCode value="https://example.com" size={200} />

// With branding
<QrCode
  value="https://myapp.io/download"
  size={220}
  logo="/icon.png"
  logoSize={40}
  errorCorrectionLevel="H"
/>

// Custom colors
<QrCode value={paymentUrl} color={{ foreground: "#213f99", background: "#ffffff" }} />
```

---

## 4.29 Radio

Radio button input. Supports single-button and button-group variants.

**Import:**
```tsx
import { Radio } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: Array<{
    value: string;
    label: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
  }>;
  variant?: "option" | "button-group";
  color?: BasicColor;
  orientation?: "horizontal" | "vertical";
  className?: string;
}
```

**Examples:**
```tsx
// Vertical radio group
<Radio
  options={[
    { value: "monthly", label: "Monthly", description: "$9/mo" },
    { value: "yearly", label: "Yearly", description: "$89/yr — save 17%" },
  ]}
  defaultValue="monthly"
  onValueChange={(v) => setPlan(v)}
/>

// Button group style
<Radio
  variant="button-group"
  options={[
    { value: "sm", label: "S" },
    { value: "md", label: "M" },
    { value: "lg", label: "L" },
    { value: "xl", label: "XL" },
  ]}
  value={size}
  onValueChange={setSize}
  color="primary"
/>
```

---

## 4.30 Rate

Star (or custom icon) rating input.

**Import:**
```tsx
import { Rate } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface RateProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  count?: number;               // total stars, default 5
  allowHalf?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  color?: BasicColor;
  size?: "small" | "middle" | "large";
  character?: React.ReactNode;  // custom icon
  className?: string;
}
```

**Examples:**
```tsx
<Rate defaultValue={3} onChange={(v) => setRating(v)} />
<Rate value={4.5} allowHalf readonly />
<Rate count={10} defaultValue={7} color="secondary" size="large" />

// Heart icons
<Rate character={<HeartIcon />} defaultValue={3} color="error" />
```

---

## 4.31 Resizable

Drag-to-resize panels (horizontal or vertical split).

**Import:**
```tsx
import { Resizable } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface ResizableProps {
  panels: ResizablePanelConfig[];
  direction?: "horizontal" | "vertical";
  className?: string;
  handleClassName?: string;
}

interface ResizablePanelConfig {
  id?: string;
  defaultSize?: number;    // percentage
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
  className?: string;
  children?: React.ReactNode;
  order?: number;          // for reordering
}
```

**Examples:**
```tsx
// Code editor layout
<Resizable
  direction="horizontal"
  panels={[
    { id: "sidebar", defaultSize: 25, minSize: 15, maxSize: 40, children: <Sidebar /> },
    { id: "editor", defaultSize: 75, children: <Editor /> },
  ]}
/>

// Three-pane layout
<Resizable
  direction="horizontal"
  panels={[
    { id: "left", defaultSize: 20, minSize: 10, collapsible: true, children: <FileTree /> },
    { id: "main", defaultSize: 60, children: <MainContent /> },
    { id: "right", defaultSize: 20, minSize: 10, collapsible: true, children: <Properties /> },
  ]}
/>
```

---

## 4.32 ScrollArea

Custom-styled scrollable container.

**Import:**
```tsx
import { ScrollArea } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  orientation?: "vertical" | "horizontal" | "both";
  scrollHideDelay?: number;    // ms before scrollbar hides, default 600
  type?: "auto" | "always" | "scroll" | "hover";
}
```

**Examples:**
```tsx
<ScrollArea className="h-72 w-64 rounded-md border">
  {longList.map((item) => <div key={item.id} className="px-4 py-2">{item.label}</div>)}
</ScrollArea>

// Horizontal scroll
<ScrollArea orientation="horizontal" className="w-full">
  <div className="flex gap-4 p-4" style={{ width: "max-content" }}>
    {cards.map((card) => <Card key={card.id} className="w-40 shrink-0" />)}
  </div>
</ScrollArea>
```

---

## 4.33 Select

Dropdown value selector with search capability.

**Import:**
```tsx
import { Select } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface SelectProps {
  options: SelectOption[];      // { label, value, disabled?, icon? }
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  label?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
}
```

**Examples:**
```tsx
<Select
  options={[
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
  ]}
  placeholder="Select role..."
  onValueChange={(v) => setRole(v)}
/>

// With search and clearable
<Select
  options={countryOptions}
  searchable
  clearable
  placeholder="Select country..."
  value={country}
  onValueChange={setCountry}
/>
```

---

## 4.34 Separator

Horizontal or vertical divider line.

**Import:**
```tsx
import { Separator } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  label?: React.ReactNode;     // optional centered label
  className?: string;
}
```

**Examples:**
```tsx
<Separator />
<Separator orientation="vertical" className="h-6" />
<Separator label="OR" className="my-4" />
<Separator label={<span className="text-xs text-muted-foreground">Continue with</span>} />
```

---

## 4.35 Sheet

Side drawer panel (like a Dialog but anchored to a viewport edge).

**Import:**
```tsx
import { Sheet } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "top" | "right" | "bottom" | "left";
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "normal" | "lg" | "xl" | "full";
  animation?: BasicAnimation;
  showClose?: boolean;
  className?: string;
}
```

**Examples:**
```tsx
// Mobile navigation drawer
<Sheet open={navOpen} onOpenChange={setNavOpen} side="left" title="Navigation">
  <nav className="space-y-2 p-4">
    <NavLink href="/">Home</NavLink>
    <NavLink href="/products">Products</NavLink>
  </nav>
</Sheet>

// Filter sheet (right)
<Sheet
  open={filterOpen}
  onOpenChange={setFilterOpen}
  side="right"
  title="Filters"
  size="lg"
  footer={
    <div className="flex gap-2">
      <Button variant="outline" onClick={clearFilters}>Clear</Button>
      <Button onClick={applyFilters}>Apply Filters</Button>
    </div>
  }
>
  <FilterForm />
</Sheet>
```

---

## 4.36 Sidebar

Full-featured collapsible application sidebar with groups, links, tooltips, and keyboard shortcuts.

**Import:**
```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@sth87/shadcn-design-system";
```

**Full Usage:**
```tsx
// app-sidebar.tsx
function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <img src="/logo.svg" className="h-8 w-8" />
                <span className="font-semibold">My App</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                    <a href={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// layout.tsx
export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 px-4 items-center gap-4 border-b">
          <SidebarTrigger />
          <h1>Dashboard</h1>
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

// useSidebar hook (inside SidebarProvider)
const { open, setOpen, toggleSidebar, state, isMobile } = useSidebar();
// state: "expanded" | "collapsed"
```

---

## 4.37 Skeleton

Loading placeholder with shimmer animation.

**Import:**
```tsx
import { Skeleton } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface SkeletonProps {
  className?: string;     // use h-* and w-* / rounded-* to shape
}
```

**Examples:**
```tsx
// Text lines
<div className="space-y-2">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>

// Card skeleton
<div className="space-y-3">
  <Skeleton className="h-40 w-full rounded-xl" />
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
</div>

// Avatar + text skeleton
<div className="flex gap-3 items-center">
  <Skeleton className="h-10 w-10 rounded-full" />
  <div className="space-y-1">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-3 w-40" />
  </div>
</div>
```

---

## 4.38 Slider

Range input for selecting numeric values.

**Import:**
```tsx
import { Slider } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface SliderProps {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onValueChange?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  color?: BasicColor;
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  disabled?: boolean;
  showTooltip?: boolean;
  marks?: boolean | Array<{ value: number; label?: string }>;
  className?: string;
}
```

**Examples:**
```tsx
// Single value
const [vol, setVol] = useState(50);
<Slider value={vol} onValueChange={(v) => setVol(v as number)} max={100} color="primary" />

// Range slider
const [range, setRange] = useState<[number, number]>([20, 80]);
<Slider value={range} onValueChange={(v) => setRange(v as [number, number])} max={100} />

// With marks
<Slider
  defaultValue={50}
  marks={[{ value: 0, label: "Min" }, { value: 50, label: "Mid" }, { value: 100, label: "Max" }]}
  showTooltip
/>
```

---

## 4.39 Stepper

Multi-step process indicator with navigation.

**Import:**
```tsx
import { Stepper } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface StepperProps {
  steps: StepperStep[];
  activeStep: number;
  onStepChange?: (step: number) => void;
  variant?: "default" | "dot" | "outline" | "ghost" | "circle";
  orientation?: "horizontal" | "vertical";
  color?: BasicColor;
  size?: "sm" | "md" | "lg";
  linear?: boolean;          // prevent skipping steps
  className?: string;
}

type StepperStep = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
};
```

**Examples:**
```tsx
const [step, setStep] = useState(0);
<Stepper
  steps={[
    { title: "Account", description: "Create account", content: <AccountForm /> },
    { title: "Profile", description: "Setup profile", content: <ProfileForm /> },
    { title: "Review", description: "Confirm details", content: <ReviewForm /> },
  ]}
  activeStep={step}
  onStepChange={setStep}
  color="primary"
/>
<div className="mt-8 flex gap-2">
  <Button variant="outline" onClick={() => setStep(s => Math.max(0, s - 1))}>Back</Button>
  <Button onClick={() => setStep(s => Math.min(2, s + 1))}>Next</Button>
</div>
```

---

## 4.40 Switch

Toggle switch control.

**Import:**
```tsx
import { Switch } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  color?: BasicColor;
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  variant?: "default" | "square1" | "square2" | "mini";
  animation?: SwitchAnimation;  // "heartbeat" | "bounce" | "glass" | "none"
  disabled?: boolean;
  className?: string;
}
```

**Examples:**
```tsx
<Switch label="Enable notifications" />
<Switch
  checked={darkMode}
  onCheckedChange={setDarkMode}
  label="Dark mode"
  color="primary"
  size="lg"
/>
<Switch variant="square1" animation="bounce" label="Bouncy switch" />
```

---

## 4.41 DataTable

Full-featured data table with TanStack Table v8. See `useDataTable` in hooks reference for setup.

**Import:**
```tsx
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableToolbar,
  DataTableViewOptions,
} from "@sth87/shadcn-design-system";
import type { Table } from "@tanstack/react-table";
```

**DataTable Props:**
```ts
interface DataTableProps<TData> {
  table: Table<TData>;            // from useDataTable()
  pagination?: boolean | { pageSizeOptions?: number[]; showRowCount?: boolean };
  sticky?: boolean;               // sticky header
  bordered?: boolean;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

// Column header with sort button
interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}
```

**Examples:**
```tsx
// Minimal table
const table = useDataTable({ data, columns });
<DataTable table={table} />

// Full-featured table
const table = useDataTable({
  data, columns, pageCount,
  enableSorting: true,
  enableFiltering: true,
  enableColumnVisibility: true,
  enableRowSelection: true,
  syncWithUrl: true,
});
<div className="space-y-4">
  <DataTableToolbar table={table}>
    <DataTableViewOptions table={table} />
  </DataTableToolbar>
  <DataTable table={table} pagination={{ pageSizeOptions: [10, 25, 50] }} sticky bordered loading={isLoading} />
</div>

// Column definition with header
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => (
      <Badge color={row.getValue("status") === "active" ? "success" : "muted"}>
        {row.getValue("status")}
      </Badge>
    ),
    filterFn: "equals",
  },
];
```

---

## 4.42 Tabs

Switchable tab panels.

**Import:**
```tsx
import { Tabs } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface TabsProps {
  items: Array<{
    value: string;
    label: React.ReactNode;
    content: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    badge?: React.ReactNode;
  }>;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: "solid" | "bordered" | "pills" | "pill-stroke" | "text" | "outline" | "underlined" | "enclosed" | "enclosed-fill";
  color?: BasicColor;
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  className?: string;
}
```

**Examples:**
```tsx
<Tabs
  defaultValue="overview"
  items={[
    { value: "overview", label: "Overview", content: <OverviewPanel /> },
    { value: "analytics", label: "Analytics", content: <AnalyticsPanel /> },
    { value: "reports", label: "Reports", content: <ReportsPanel />, badge: <Badge color="primary" size="xs">3</Badge> },
  ]}
/>

// Pill style
<Tabs variant="pills" color="primary" items={tabItems} />

// Vertical tabs
<Tabs orientation="vertical" variant="enclosed" items={settingsTabs} />
```

---

## 4.43 Textarea

Multi-line text input.

**Import:**
```tsx
import { Textarea } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  autoResize?: boolean;         // grow with content
  maxHeight?: number;           // px limit when autoResize is on
  showCount?: boolean;          // show character count
  maxLength?: number;
  clearable?: boolean;
  className?: string;
}
```

**Examples:**
```tsx
<Textarea label="Notes" placeholder="Add notes..." rows={4} />
<Textarea
  label="Bio"
  description="Tell us about yourself"
  maxLength={280}
  showCount
  autoResize
/>
<Textarea label="Feedback" error="Required" />
```

---

## 4.44 Toast / Toaster

Notification toasts via Sonner.

**Import:**
```tsx
import { Toaster, toast } from "@sth87/shadcn-design-system";
```

**Setup:**
```tsx
// Add once in your root layout
<Toaster position="bottom-right" />
```

**Usage:**
```tsx
// Trigger from anywhere
toast("File saved");
toast.success("Profile updated!");
toast.error("Failed to save changes.");
toast.warning("Your session will expire soon.");
toast.info("New version available.");

// With description
toast("Event created", {
  description: "Monday, January 3rd at 6:00pm",
});

// With action
toast.success("Item deleted", {
  action: {
    label: "Undo",
    onClick: () => restoreItem(),
  },
});

// Loading → success flow
const toastId = toast.loading("Uploading...");
await uploadFile(file);
toast.success("Upload complete!", { id: toastId });

// Custom duration
toast("Auto-dismisses in 10s", { duration: 10000 });
toast.error("Stays until dismissed", { duration: Infinity });

// Dismiss programmatically
toast.dismiss(toastId);
toast.dismiss(); // dismiss all
```

---

## 4.45 Toggle

Two-state toggled button.

**Import:**
```tsx
import { Toggle } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  color?: BasicColor;
  children?: React.ReactNode;
}
```

**Examples:**
```tsx
// Bold button
const [bold, setBold] = useState(false);
<Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">
  <BoldIcon className="w-4 h-4" />
</Toggle>

// Toolbar row
<div className="flex gap-1">
  <Toggle variant="outline" aria-label="Bold"><BoldIcon className="w-4 h-4" /></Toggle>
  <Toggle variant="outline" aria-label="Italic"><ItalicIcon className="w-4 h-4" /></Toggle>
  <Toggle variant="outline" aria-label="Underline"><UnderlineIcon className="w-4 h-4" /></Toggle>
</div>
```

---

## 4.46 Tooltip

Hover information popup.

**Import:**
```tsx
import { Tooltip } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface TooltipProps {
  children: React.ReactNode;    // trigger element
  content: React.ReactNode;     // tooltip content
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  delayDuration?: number;       // ms before open
  animation?: BasicAnimation;
  className?: string;
  contentClassName?: string;
}
```

**Examples:**
```tsx
<Tooltip content="Copy to clipboard">
  <Button size="icon" variant="ghost"><CopyIcon className="w-4 h-4" /></Button>
</Tooltip>

<Tooltip content={<span>Formatted <strong>HTML</strong> tooltip</span>} side="right">
  <InfoCircleIcon className="text-muted-foreground" />
</Tooltip>

// Animated tooltip
<Tooltip content="With animation" animation="zoom-in">
  <Button>Hover me</Button>
</Tooltip>
```

---

## 4.47 Tour

Step-by-step feature walkthrough anchored to DOM elements.

**Import:**
```tsx
import { Tour } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface TourProps {
  steps: TourStepConfig[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFinish?: () => void;
  onSkip?: () => void;
  defaultStep?: number;
  mask?: boolean;              // overlay mask around target
  className?: string;
}

type TourStepConfig = {
  target: string;               // CSS selector for target element
  title?: React.ReactNode;
  description?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right" | "auto";
};
```

**Examples:**
```tsx
const [tourOpen, setTourOpen] = useState(false);
<Tour
  open={tourOpen}
  onOpenChange={setTourOpen}
  onFinish={() => localStorage.setItem("tour-done", "1")}
  steps={[
    { target: "#sidebar-toggle", title: "Toggle Sidebar", description: "Click here to expand or collapse the sidebar.", placement: "right" },
    { target: "#search-input", title: "Search", description: "Quickly find anything with the search bar.", placement: "bottom" },
    { target: "#notifications-btn", title: "Notifications", description: "View your latest notifications here.", placement: "bottom" },
  ]}
  mask
/>
<Button onClick={() => setTourOpen(true)}>Start Tour</Button>
```

---

## 4.48 TreeSelect

Hierarchical tree data selector with search.

**Import:**
```tsx
import { TreeSelect } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface TreeSelectProps {
  data: TreeDataItem[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  placeholder?: string;
  expandAll?: boolean;
  disabled?: boolean;
  className?: string;
  popoverProps?: PopoverProps;
}
```

**Examples:**
```tsx
const treeData: TreeDataItem[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: FolderIcon,
    children: [
      { id: "react", name: "React", icon: FileIcon },
      { id: "vue", name: "Vue", icon: FileIcon },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: FolderIcon,
    children: [
      { id: "node", name: "Node.js", icon: FileIcon },
    ],
  },
];

<TreeSelect
  data={treeData}
  placeholder="Select category..."
  searchable
  value={selected}
  onValueChange={setSelected}
/>

// Multi-select tree
<TreeSelect
  data={treeData}
  multiple
  searchable
  placeholder="Select multiple..."
/>
```

---

## 4.49 Upload

File uploader with preview, progress, and drag-and-drop.

**Import:**
```tsx
import { Upload } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface UploadProps {
  value?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  accept?: string;               // MIME types, e.g. "image/*,.pdf"
  multiple?: boolean;
  maxCount?: number;
  maxSize?: number;              // bytes
  disabled?: boolean;
  variant?: "outline" | "primaryOutline" | "icon" | "avatar" | "avatarCircle" | "dropzone" | "primaryDropzone" | "secondaryDropzone";
  listType?: "text" | "picture" | "picture-card";
  action?: string;               // upload endpoint URL
  customRequest?: (options: UploadRequestOption) => void;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  onRemove?: (file: UploadFile) => boolean | void;
  className?: string;
}
```

**Examples:**
```tsx
// Simple file upload
const [files, setFiles] = useState<UploadFile[]>([]);
<Upload
  value={files}
  onChange={setFiles}
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
/>

// Drag & drop
<Upload
  variant="dropzone"
  accept=".pdf,.doc,.docx"
  multiple
  value={files}
  onChange={setFiles}
  maxCount={10}
/>

// Avatar upload
<Upload
  variant="avatarCircle"
  accept="image/*"
  value={avatar}
  onChange={([f]) => setAvatar([f])}
/>

// Custom upload request
<Upload
  value={files}
  onChange={setFiles}
  customRequest={async ({ file, onSuccess, onError, onProgress }) => {
    try {
      const url = await uploadToS3(file as File, onProgress);
      onSuccess?.({ url });
    } catch (err) {
      onError?.(err as Error);
    }
  }}
  listType="picture-card"
/>
```
