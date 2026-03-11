# Components Reference — A to L
## @sth87/shadcn-design-system

---

## 4.1 Accordion

Vertically stacked, collapsible content sections built on Radix UI.

**Import:**
```tsx
import { Accordion } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface AccordionProps {
  items: Array<{
    value: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
  }>;
  type?: "single" | "multiple";   // default "single"
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: "default" | "bordered" | "separated" | "ghost";
  color?: BasicColor;
  collapsible?: boolean;           // for type="single", default true
  className?: string;
}
```

**Examples:**
```tsx
// Basic single accordion
<Accordion
  items={[
    { value: "a", trigger: "What is this?", content: <p>A design system.</p> },
    { value: "b", trigger: "How do I use it?", content: <p>Import and render.</p> },
  ]}
/>

// Multiple open sections
<Accordion
  type="multiple"
  defaultValue={["a", "b"]}
  items={items}
/>

// Bordered variant
<Accordion variant="bordered" items={items} />

// Custom icons
<Accordion
  items={[{
    value: "1",
    trigger: "Account",
    icon: <UserIcon className="w-4 h-4" />,
    content: "Account settings go here.",
  }]}
/>
```

---

## 4.2 Avatar

User photo or initials display with fallback behavior.

**Import:**
```tsx
import { Avatar } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;        // text shown when image fails (initials)
  size?: "xs" | "sm" | "md" | "lg" | "xl";  // px: 24/32/40/48/64
  color?: BasicColor;       // background color of fallback
  shape?: "circle" | "square";
  animation?: BasicAnimation | "none";
  badge?: React.ReactNode;  // overlay badge (notification dot etc.)
  className?: string;
  onClick?: () => void;
}
```

**Examples:**
```tsx
// Image avatar
<Avatar src="/photo.jpg" alt="John Doe" size="md" />

// Initials fallback
<Avatar fallback="JD" color="primary" size="lg" />

// With notification badge
<Avatar
  src="/photo.jpg"
  badge={<span className="w-3 h-3 rounded-full bg-success border-2 border-background" />}
/>

// Clickable with animation
<Avatar src="/user.jpg" animation="heartbeat" onClick={() => openProfile()} />
```

---

## 4.3 Badge

Small status indicator or label.

**Import:**
```tsx
import { Badge } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface BadgeProps {
  children: React.ReactNode;
  color?: BasicColor;
  variant?: "solid" | "outline" | "soft";
  size?: "xs" | "sm" | "normal" | "lg";
  animation?: BadgeAnimation;   // "heartbeat" | "pulse" | "bounce" | "none"
  dot?: boolean;                // show indicator dot left of text
  dotColor?: BasicColor;
  icon?: React.ReactNode;
  className?: string;
}
```

**Examples:**
```tsx
<Badge color="primary">New</Badge>
<Badge color="success" variant="soft">Active</Badge>
<Badge color="destructive" variant="outline">Error</Badge>
<Badge color="warning" dot animation="pulse">Live</Badge>
<Badge color="secondary" icon={<StarIcon className="w-3 h-3" />}>Premium</Badge>
```

---

## 4.4 Breadcrumb

Navigation trail showing current location in hierarchy.

**Import:**
```tsx
import { Breadcrumb } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface BreadcrumbProps {
  items: Array<{
    label?: React.ReactNode;
    href?: string;
    icon?: React.ReactNode;
  }>;
  separator?: React.ReactNode;   // default "/"
  variant?: "default" | "compact" | "badge" | "bordered";
  maxItems?: number;             // collapse middle items beyond this
  className?: string;
}
```

**Examples:**
```tsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Detail" },
  ]}
/>

// With icons
<Breadcrumb
  items={[
    { icon: <HomeIcon className="w-4 h-4" />, href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings" },
  ]}
  variant="bordered"
/>

// Collapsed on long path
<Breadcrumb items={longPathItems} maxItems={3} />
```

---

## 4.5 Button

Primary interactive action element.

**Import:**
```tsx
import { Button, ButtonGroup } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  color?: BasicColor;
  size?: "xs" | "sm" | "normal" | "lg" | "xl" | "icon";
  animation?: ButtonAnimation;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;   // render as child (Radix Slot)
}

interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  className?: string;
}
```

**Examples:**
```tsx
<Button>Click me</Button>
<Button variant="outline" color="primary">Outline</Button>
<Button variant="ghost" color="secondary">Ghost</Button>
<Button variant="destructive" color="destructive">Delete</Button>
<Button variant="link">Link style</Button>

// Loading state
<Button isLoading loadingText="Saving...">Save</Button>

// With icons
<Button leftIcon={<PlusIcon className="w-4 h-4" />} color="primary">Add Item</Button>
<Button rightIcon={<ArrowRightIcon className="w-4 h-4" />} variant="ghost">Next</Button>

// Icon-only
<Button size="icon" variant="ghost"><SearchIcon className="w-5 h-5" /></Button>

// Animated
<Button animation="shine" color="primary">Shine Effect</Button>
<Button animation="rainbow">Rainbow</Button>

// As router link
<Button asChild><a href="/dashboard">Dashboard</a></Button>

// Grouped
<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>
```

---

## 4.6 Calendar

Full-featured calendar component with date selection, events, and views.

**Import:**
```tsx
import { Calendar } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface CalendarProps {
  value?: Date | Date[] | [Date, Date];
  defaultValue?: Date | Date[] | [Date, Date];
  onChange?: (date: Date | Date[] | [Date, Date] | null) => void;
  mode?: "single" | "multiple" | "range";
  color?: CalendarColor;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[] | ((date: Date) => boolean);
  events?: Array<{ date: Date; color?: CalendarColor; title?: string }>;
  className?: string;
  locale?: string;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
```

**Examples:**
```tsx
// Controlled single date
const [date, setDate] = useState<Date>();
<Calendar value={date} onChange={(d) => setDate(d as Date)} />

// Range selection
const [range, setRange] = useState<[Date, Date]>();
<Calendar mode="range" value={range} onChange={(r) => setRange(r as [Date, Date])} />

// With events
<Calendar
  events={[
    { date: new Date("2026-01-15"), color: "primary", title: "Meeting" },
    { date: new Date("2026-01-20"), color: "success", title: "Launch" },
  ]}
/>

// Constrained range
<Calendar
  minDate={new Date()}
  maxDate={addMonths(new Date(), 3)}
  disabledDates={(date) => isWeekend(date)}
/>
```

---

## 4.7 Carousel + CarouselSlide

Touch-friendly, responsive slider built on Swiper.js.

**Import:**
```tsx
import { Carousel, CarouselSlide } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface CarouselProps {
  children: React.ReactNode;
  effect?: "slide" | "fade" | "cube" | "coverflow" | "flip" | "cards";
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean | AutoplayOptions;
  navigation?: boolean | NavigationOptions;
  pagination?: boolean | PaginationOptions;
  centeredSlides?: boolean;
  breakpoints?: Record<number, BreakpointOptions>;
  className?: string;
  onSlideChange?: (swiper: Swiper) => void;
}

interface CarouselSlideProps {
  children: React.ReactNode;
  className?: string;
}
```

**Examples:**
```tsx
// Basic image carousel
<Carousel loop autoplay={{ delay: 3000, pauseOnMouseEnter: true }} navigation pagination>
  {images.map((src) => (
    <CarouselSlide key={src}>
      <img src={src} className="w-full h-64 object-cover rounded-lg" />
    </CarouselSlide>
  ))}
</Carousel>

// Multi-slide with breakpoints
<Carousel
  slidesPerView={1}
  spaceBetween={16}
  breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
  pagination={{ type: "bullets", clickable: true }}
>
  {cards.map((card) => (
    <CarouselSlide key={card.id}><Card {...card} /></CarouselSlide>
  ))}
</Carousel>

// Coverflow effect
<Carousel effect="coverflow" centeredSlides slidesPerView={3}>
  {slides.map((s) => <CarouselSlide key={s.id}>{s.content}</CarouselSlide>)}
</Carousel>
```

---

## 4.8 Checkbox

Toggleable selection input.

**Import:**
```tsx
import { Checkbox } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  color?: BasicColor;
  variant?: "default" | "circle";
  size?: "sm" | "default" | "lg";
  indeterminate?: boolean;
  className?: string;
}
```

**Examples:**
```tsx
<Checkbox label="Accept terms and conditions" />
<Checkbox label="Enable notifications" description="Get email alerts" defaultChecked />
<Checkbox color="primary" variant="circle" label="Circle style" />
<Checkbox indeterminate label="Select all" />

// Controlled
const [checked, setChecked] = useState(false);
<Checkbox checked={checked} onCheckedChange={(v) => setChecked(v as boolean)} label="Opt in" />
```

---

## 4.9 Collapsible

Single expandable/collapsible section.

**Import:**
```tsx
import { Collapsible } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface CollapsibleProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "default" | "bordered" | "ghost";
  className?: string;
}
```

**Examples:**
```tsx
<Collapsible trigger="Advanced Options" defaultOpen={false}>
  <div className="space-y-2">
    <Input label="API Key" />
    <Checkbox label="Enable debug mode" />
  </div>
</Collapsible>

// Controlled
const [open, setOpen] = useState(false);
<Collapsible
  trigger={<span>Filters <ChevronDown /></span>}
  open={open}
  onOpenChange={setOpen}
  variant="bordered"
>
  <FilterForm />
</Collapsible>
```

---

## 4.10 Command

Command palette / combobox / spotlight search.

**Import:**
```tsx
import { Command } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface CommandProps {
  placeholder?: string;
  emptyText?: string;
  groups: Array<{
    heading?: string;
    items: Array<{
      value: string;
      label: React.ReactNode;
      icon?: React.ReactNode;
      shortcut?: string;
      disabled?: boolean;
      onSelect?: () => void;
    }>;
  }>;
  className?: string;
}

// Dialog wrapper
interface CommandDialogProps extends CommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}
```

**Examples:**
```tsx
// Inline command palette
<Command
  placeholder="Search commands..."
  groups={[
    {
      heading: "Navigation",
      items: [
        { value: "home", label: "Home", icon: <HomeIcon />, onSelect: () => navigate("/") },
        { value: "settings", label: "Settings", icon: <SettingsIcon />, shortcut: "⌘," },
      ],
    },
  ]}
/>

// Keyboard-activated dialog
const [open, setOpen] = useState(false);
useEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "k") setOpen(true);
});
<CommandDialog open={open} onOpenChange={setOpen} groups={commandGroups} placeholder="Type a command..." />
```

---

## 4.11 ContextMenu

Right-click context menu.

**Import:**
```tsx
import { ContextMenu } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
type ContextMenuItem =
  | { type: "item"; label: React.ReactNode; icon?: React.ReactNode; shortcut?: string; disabled?: boolean; onClick?: () => void; }
  | { type: "separator" }
  | { type: "label"; label: string }
  | { type: "submenu"; label: string; icon?: React.ReactNode; items: ContextMenuItem[] }
  | { type: "checkbox"; label: string; checked?: boolean; onCheckedChange?: (checked: boolean) => void }
  | { type: "radio"; value: string; label: string };

interface ContextMenuProps {
  children: React.ReactNode;   // the trigger area (right-click here)
  items: ContextMenuItem[];
  className?: string;
}
```

**Examples:**
```tsx
<ContextMenu
  items={[
    { type: "item", label: "Open", icon: <FolderOpenIcon className="w-4 h-4" />, onClick: handleOpen },
    { type: "item", label: "Rename", onClick: handleRename },
    { type: "separator" },
    { type: "item", label: "Delete", icon: <TrashIcon className="w-4 h-4" />, onClick: handleDelete },
    { type: "submenu", label: "Share", items: [
      { type: "item", label: "Copy link", onClick: copyLink },
      { type: "item", label: "Email", onClick: sendEmail },
    ]},
  ]}
>
  <div className="p-4 border rounded-lg">Right-click me</div>
</ContextMenu>
```

---

## 4.12 Cropper

Image crop with zoom, rotation, and aspect ratio control. Built on `react-advanced-cropper`.

**Import:**
```tsx
import { Cropper } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface CropperProps {
  src: string;                    // image URL to crop
  onCrop: (canvas: HTMLCanvasElement) => void;
  aspectRatio?: number;           // e.g. 1 for square, 16/9 for widescreen, undefined for free
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
  previewClassName?: string;
  showGrid?: boolean;
  circularMask?: boolean;         // show circular crop mask
}
```

**Examples:**
```tsx
// Square avatar crop
<Cropper
  src={uploadedImageUrl}
  aspectRatio={1}
  circularMask
  onCrop={(canvas) => {
    canvas.toBlob((blob) => uploadAvatar(blob!));
  }}
/>

// Banner crop (16:9)
<Cropper
  src={imageUrl}
  aspectRatio={16 / 9}
  onCrop={(canvas) => {
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setPreview(dataUrl);
  }}
/>

// Free crop
<Cropper src={imageUrl} onCrop={handleCrop} />
```

---

## 4.13 DatePicker / RangePicker / TimePicker

Date/time selection inputs with calendar popover.

**Import:**
```tsx
import { DatePicker, RangePicker, TimePicker } from "@sth87/shadcn-design-system";
```

**DatePicker Props:**
```ts
interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  format?: FormatType;          // "dd/MM/yyyy" | { input: "dd/MM/yyyy", output: "yyyy-MM-dd" }
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[] | ((date: Date) => boolean);
  color?: CalendarColor;
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
  popoverProps?: PopoverProps;
}

interface RangePickerProps extends Omit<DatePickerProps, "value" | "onChange"> {
  value?: [Date | null, Date | null];
  onChange?: (range: [Date | null, Date | null]) => void;
}

interface TimePickerProps {
  value?: string;               // "HH:mm" format
  onChange?: (time: string | null) => void;
  format?: string;              // "HH:mm" | "hh:mm a"
  minuteStep?: number;          // default 1
  disabledHours?: number[];
  disabledMinutes?: number[];
  disabledTimeRange?: DisabledTimeRange;
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}
```

**Examples:**
```tsx
// Basic date picker
const [date, setDate] = useState<Date | null>(null);
<DatePicker value={date} onChange={setDate} placeholder="Select date" />

// With date constraints
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}
  maxDate={addMonths(new Date(), 6)}
  disabledDates={(d) => isSunday(d)}
  format="dd/MM/yyyy"
/>

// Date range picker
const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
<RangePicker value={range} onChange={setRange} placeholder="Start → End" />

// Time picker
const [time, setTime] = useState<string>("");
<TimePicker value={time} onChange={(t) => setTime(t ?? "")} minuteStep={15} />

// Disabled time range
<TimePicker
  value={time}
  onChange={setTime}
  disabledTimeRange={{ from: "00:00", to: "08:00" }}
/>
```

---

## 4.14 Dialog

Modal overlay with customizable header, footer, and action buttons.

**Import:**
```tsx
import { Dialog } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  okButton?: DialogButtonConfig | false;
  cancelButton?: DialogButtonConfig | false;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  animation?: BasicAnimation;
  size?: "xs" | "sm" | "normal" | "lg" | "xl" | "full";
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}
```

**Examples:**
```tsx
// Confirm dialog
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Delete Item"
  description="Are you sure? This action cannot be undone."
  onOk={handleDelete}
  okButton={{ label: "Delete", variant: "destructive", color: "destructive" }}
/>

// Form dialog
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Edit Profile"
  onOk={handleSubmit}
  okButton={{ label: "Save Changes", isLoading: isSaving }}
>
  <div className="space-y-4">
    <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
    <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
  </div>
</Dialog>

// No action buttons, custom footer
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Preview"
  okButton={false}
  cancelButton={false}
  footer={<Button onClick={() => setOpen(false)}>Close</Button>}
  size="xl"
>
  <ImageViewer src={previewUrl} />
</Dialog>
```

---

## 4.15 DropdownMenu

Contextual action menu triggered by a button/element.

**Import:**
```tsx
import { DropdownMenu } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
type DropdownMenuItem =
  | { type: "item"; label: React.ReactNode; icon?: React.ReactNode; shortcut?: string; disabled?: boolean; onClick?: () => void; }
  | { type: "separator" }
  | { type: "label"; label: string }
  | { type: "submenu"; label: string; icon?: React.ReactNode; items: DropdownMenuItem[] }
  | { type: "checkbox"; label: string; checked?: boolean; onCheckedChange?: (v: boolean) => void }
  | { type: "radio"; value: string; label: string };

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  contentClassName?: string;
}
```

**Examples:**
```tsx
<DropdownMenu
  trigger={<Button variant="outline">Options <ChevronDownIcon className="w-4 h-4 ml-1" /></Button>}
  items={[
    { type: "item", label: "Edit", icon: <PencilIcon className="w-4 h-4" />, onClick: handleEdit },
    { type: "item", label: "Duplicate", onClick: handleDuplicate },
    { type: "separator" },
    { type: "item", label: "Delete", icon: <TrashIcon className="w-4 h-4" />, onClick: handleDelete },
  ]}
  align="end"
/>

// With checkbox items
<DropdownMenu
  trigger={<Button variant="ghost" size="icon"><MoreHorizontalIcon /></Button>}
  items={[
    { type: "label", label: "Columns" },
    { type: "checkbox", label: "Name", checked: showName, onCheckedChange: setShowName },
    { type: "checkbox", label: "Email", checked: showEmail, onCheckedChange: setShowEmail },
  ]}
/>
```

---

## 4.16 Glass

Frosted glass distortion filter effect. Wraps children to apply the SVG feTurbulence/feDisplacementMap filter.

**Import:**
```tsx
import { Glass } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface GlassProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;      // distortion strength, default 10
  blur?: number;           // backdrop blur in px, default 8
}
```

**Examples:**
```tsx
// Frosted card
<Glass className="p-6 rounded-2xl">
  <h2 className="text-xl font-semibold">Frosted Content</h2>
  <p className="text-muted-foreground">This has a glass distortion effect.</p>
</Glass>

// Navigation bar
<Glass className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
  <NavBar />
</Glass>

// Intense distortion
<Glass intensity={20} blur={12} className="p-4 rounded-xl">
  <Card />
</Glass>
```

---

## 4.17 ImageViewer

Lightbox viewer with zoom, pan, rotation, and thumbnail strip.

**Import:**
```tsx
import { ImageViewer } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface ImageViewerProps {
  images: string[] | Array<{ src: string; alt?: string; thumb?: string }>;
  initialIndex?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showThumbnails?: boolean;
  showToolbar?: boolean;
  className?: string;
}

// Trigger variant
interface ImageViewerTriggerProps {
  src: string;
  alt?: string;
  className?: string;
  images?: string[];             // open gallery at this image
}
```

**Examples:**
```tsx
// Gallery with lightbox trigger
<div className="grid grid-cols-3 gap-2">
  {photos.map((photo, i) => (
    <ImageViewer.Trigger key={i} src={photo.thumb} images={photos.map((p) => p.src)} />
  ))}
</div>

// Controlled lightbox
<ImageViewer
  images={album}
  open={lightboxOpen}
  onOpenChange={setLightboxOpen}
  initialIndex={selectedIndex}
  showThumbnails
/>
```

---

## 4.18 Input

Text input field with label, description, prefix/suffix, and validation state.

**Import:**
```tsx
import { Input } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  floatLabel?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  className?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}
```

**Examples:**
```tsx
<Input label="Username" placeholder="Enter username" />
<Input label="Email" type="email" description="We'll never share your email." />
<Input label="Password" type="password" error="Password must be at least 8 characters" />

// With prefix/suffix
<Input
  prefix={<SearchIcon className="w-4 h-4 text-muted-foreground" />}
  placeholder="Search..."
  clearable
/>
<Input
  label="Amount"
  prefix="$"
  suffix=".00"
  type="number"
/>

// Float label
<Input label="Full Name" floatLabel placeholder=" " />
```

---

## 4.19 InputOTP

One-time password / verification code input.

**Import:**
```tsx
import { InputOTP } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface InputOTPProps {
  length?: number;                         // number of cells, default 6
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;    // fires when all cells are filled
  variant?: "outlined" | "filled" | "underlined";
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  disabled?: boolean;
  separator?: React.ReactNode;             // element between cells
  separatorIndex?: number[];               // insert separator after these indexes
  pattern?: RegExp;                        // allowed characters
  className?: string;
}
```

**Examples:**
```tsx
// 6-digit OTP
const [otp, setOtp] = useState("");
<InputOTP value={otp} onChange={setOtp} onComplete={(v) => verifyCode(v)} />

// 4-digit PIN
<InputOTP length={4} variant="filled" size="lg" />

// With separator at middle
<InputOTP length={6} separatorIndex={[2]} separator="-" />

// Pattern: letters only
<InputOTP length={5} pattern={/^[A-Z]+$/} />
```

---

## 4.20 Interactive 3DCard

Mouse-tracked 3D perspective tilt effect on a card.

**Import:**
```tsx
import { Interactive3DCard } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;      // tilt intensity, default 15 degrees
  glare?: boolean;         // show glare overlay on tilt
  scale?: number;          // scale on hover, default 1.05
  speed?: number;          // tilt follow speed in ms
}
```

**Examples:**
```tsx
<Interactive3DCard className="w-64 h-40 rounded-2xl bg-card p-6 shadow-xl" glare>
  <h3 className="text-lg font-bold">3D Card</h3>
  <p className="text-muted-foreground">Hover to tilt me!</p>
</Interactive3DCard>

// Product card
<Interactive3DCard className="rounded-3xl overflow-hidden" intensity={10} scale={1.03}>
  <img src={product.image} className="w-full h-48 object-cover" />
  <div className="p-4">
    <p className="font-semibold">{product.name}</p>
    <p className="text-primary">${product.price}</p>
  </div>
</Interactive3DCard>
```

---

## 4.21 Interactive3DMarquee

3D perspective grid of cards scrolling in multiple directions.

**Import:**
```tsx
import { Interactive3DMarquee } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface Interactive3DMarqueeProps {
  images?: string[];           // image URLs for the grid
  children?: React.ReactNode;  // custom grid content
  speed?: number;              // scroll speed multiplier
  className?: string;
  tiltEnabled?: boolean;       // enable mouse tilt on the grid
}
```

**Examples:**
```tsx
// Image grid marquee
<Interactive3DMarquee
  images={logoUrls}
  className="h-64"
  speed={1}
  tiltEnabled
/>

// Hero background
<div className="relative overflow-hidden h-screen">
  <Interactive3DMarquee images={bgImages} className="absolute inset-0 opacity-30" />
  <div className="relative z-10 flex items-center justify-center h-full">
    <h1 className="text-6xl font-black">Our Portfolio</h1>
  </div>
</div>
```

---

## 4.22 InteractiveCursorFollow

Custom cursor follow element or container that tracks pointer movement.

**Import:**
```tsx
import { InteractiveCursorFollow } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface InteractiveCursorFollowProps {
  children: React.ReactNode;
  cursor?: React.ReactNode;       // custom cursor element
  className?: string;
  offset?: { x?: number; y?: number };
  smoothing?: number;             // lerp factor 0-1, 1 = instant
  hideDefaultCursor?: boolean;
}
```

**Examples:**
```tsx
// Custom dot cursor
<InteractiveCursorFollow
  cursor={<div className="w-6 h-6 rounded-full bg-primary/80 pointer-events-none" />}
  hideDefaultCursor
>
  <div className="h-64 bg-muted rounded-xl flex items-center justify-center">
    Move your cursor here
  </div>
</InteractiveCursorFollow>

// Smooth trailing cursor
<InteractiveCursorFollow
  cursor={<div className="w-10 h-10 border-2 border-primary rounded-full" />}
  smoothing={0.15}
  hideDefaultCursor
>
  {children}
</InteractiveCursorFollow>
```

---

## 4.23 Label

Form field label with required indicator and compound layout helpers.

**Import:**
```tsx
import { Label } from "@sth87/shadcn-design-system";
```

**Props:**
```ts
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;       // appends red asterisk
  optional?: boolean;       // appends "(optional)" text
  tooltip?: React.ReactNode;
  className?: string;
}
```

**Examples:**
```tsx
<Label htmlFor="username">Username</Label>
<Label htmlFor="email" required>Email Address</Label>
<Label htmlFor="bio" optional>Bio</Label>
<Label htmlFor="api-key" tooltip="Find this in your account settings">API Key</Label>

// Used with inputs
<div className="space-y-1">
  <Label htmlFor="name" required>Full Name</Label>
  <Input id="name" placeholder="John Doe" />
</div>

// FloatLabel (via Input's floatLabel prop)
<Input label="Email" floatLabel />
```
