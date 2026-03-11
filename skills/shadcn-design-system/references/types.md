# Type Reference
## @sth87/shadcn-design-system

Complete TypeScript type definitions for all shared types used across components.

---

## Color Types

```ts
/** Used by: Button, Badge, Avatar, Checkbox, Radio, Rate, Slider,
 *  Stepper, Switch, Toggle, Tooltip, Accordion, Marquee, Pagination */
type BasicColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "glass"
  | "muted"
  | "accent"
  | "destructive";

/** Used by: Calendar, DatePicker, TimePicker, RangePicker */
type CalendarColor =
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "muted"
  | "success"
  | "error"
  | "warning"
  | "foreground";
```

---

## Animation Types

```ts
/** All available animation values — used by most components via animation prop */
type BasicAnimation =
  | "heartbeat"
  | "rainbow"
  | "shine"
  | "bounce"
  | "tap"
  | "glass"
  | "glow"
  | "liquid"
  | "pulse"
  | "gradient-outline"
  | "slide-in-from-bottom"
  | "slide-in-from-top"
  | "slide-in-from-left"
  | "slide-in-from-right"
  | "zoom-in"
  | "zoom-out"
  | "skewed-in"
  | "shake"
  | "flip-in"
  | "fade-in";

/** Used by: Button, ButtonGroup */
type ButtonAnimation = BasicAnimation | "none";

/** Used by: Badge */
type BadgeAnimation = "heartbeat" | "pulse" | "bounce" | "none";

/** Used by: Switch */
type SwitchAnimation = "heartbeat" | "bounce" | "glass" | "none";
```

---

## DatePicker / TimePicker Types

```ts
/** Date/time format — can be a string pattern or separate input/output formats */
type FormatType = string | { input: string; output: string };

/** Time range to disable in TimePicker */
type DisabledTimeRange = { from: string; to: string };
```

---

## Upload Types

```ts
type UploadStatus = "uploading" | "done" | "error" | "removed";

interface UploadFile {
  uid: string;                 // unique identifier
  name: string;                // display name
  status?: UploadStatus;
  url?: string;                // final URL after upload
  thumbUrl?: string;           // thumbnail URL for preview
  size?: number;               // file size in bytes
  type?: string;               // MIME type
  percent?: number;            // upload progress 0–100
  error?: Error;               // error object if status === "error"
  response?: any;              // server response after successful upload
  originFileObj?: File;        // original File object from input
}
```

---

## TreeSelect / TreeView Types

```ts
type TreeDataItem = {
  id: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  selectedIcon?: React.ComponentType<{ className?: string }>;
  openIcon?: React.ComponentType<{ className?: string }>;
  children?: TreeDataItem[];
  actions?: React.ReactNode;
  onClick?: () => void;
};

type TreeViewProps = {
  data: TreeDataItem[];
  initialSelectedItemId?: string;
  onSelectChange?: (item: TreeDataItem | undefined) => void;
  expandAll?: boolean;
  defaultNodeIcon?: React.ComponentType<{ className?: string }>;
  defaultLeafIcon?: React.ComponentType<{ className?: string }>;
  className?: string;
};
```

---

## DataTable Types

```ts
/** All supported filter variant identifiers */
type FilterVariant =
  | "text"
  | "number"
  | "range"
  | "date"
  | "dateRange"
  | "boolean"
  | "select"
  | "multiSelect";

/** All supported filter operators */
type FilterOperator =
  | "iLike"           // case-insensitive LIKE (contains)
  | "notILike"        // NOT LIKE
  | "eq"              // equals
  | "ne"              // not equals
  | "lt"              // less than
  | "lte"             // less than or equal
  | "gt"              // greater than
  | "gte"             // greater than or equal
  | "isBetween"       // between two values
  | "isEmpty"         // value is null/empty
  | "isNotEmpty"      // value is not null/empty
  | "inArray"         // value in set (multi-select)
  | "notInArray"      // value NOT in set
  | "isRelativeToToday"; // date relative keyword

type JoinOperator = "and" | "or";

/** Extended column filter state used by useDataTable */
interface DataTableFilterState {
  id: string;                  // column accessorKey
  value: unknown;              // filter value
  operator: FilterOperator;
  variant?: FilterVariant;
}

/** Sorting state entry */
interface SortingState {
  id: string;
  desc: boolean;
}
```

---

## Dialog Types

```ts
type DialogButtonConfig = {
  label?: React.ReactNode;
  variant?: "solid" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  color?: BasicColor;
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
  className?: string;
};
```

---

## Carousel Types

```ts
type SliderEffect = "slide" | "fade" | "cube" | "coverflow" | "flip" | "cards";

interface NavigationOptions {
  prevEl?: string;
  nextEl?: string;
  hideOnClick?: boolean;
}

interface PaginationOptions {
  type?: "bullets" | "fraction" | "progressbar";
  clickable?: boolean;
}

interface AutoplayOptions {
  delay?: number;
  stopOnLastSlide?: boolean;
  disableOnInteraction?: boolean;
  pauseOnMouseEnter?: boolean;
}

interface BreakpointOptions {
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  slidesPerGroup?: number;
  centeredSlides?: boolean;
}
```

---

## Select Types

```ts
interface SelectOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}
```

---

## QRCode Types

```ts
type QRCodeErrorLevel = "L" | "M" | "Q" | "H";
// L = 7% error correction (smallest), H = 30% (most robust, largest)
```

---

## Stepper Types

```ts
type StepperStep = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
};

type StepperVariant = "default" | "dot" | "outline" | "ghost" | "circle";
```

---

## Tour Types

```ts
type TourStepConfig = {
  target: string;              // CSS selector ("#my-id") or element selector (".my-class")
  title?: React.ReactNode;
  description?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right" | "auto";
};
```

---

## Breadcrumb Types

```ts
type BreadcrumbItemType = {
  label?: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
};
```

---

## Resizable Types

```ts
interface ResizablePanelConfig {
  id?: string;
  defaultSize?: number;        // percentage
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
  onCollapse?: () => void;
  onExpand?: () => void;
  onResize?: (size: number) => void;
  className?: string;
  children?: React.ReactNode;
  order?: number;
}
```

---

## Component Size Scales

Most components use one of these size scales:

```ts
// Input, Select, Textarea, InputOTP, Switch, Pagination
type InputSize = "xs" | "sm" | "normal" | "lg" | "xl";

// Button
type ButtonSize = "xs" | "sm" | "normal" | "lg" | "xl" | "icon";

// Tabs, Stepper
type ComponentSize = "sm" | "md" | "lg";

// Avatar
type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
// Sizes in px: xs=24, sm=32, md=40, lg=48, xl=64

// Rate
type RateSize = "small" | "middle" | "large";

// Checkbox, Toggle
type SmallSize = "sm" | "default" | "lg";
```

---

## Component Variant Quick Reference

| Component | Variants |
|---|---|
| **Accordion** | `default`, `bordered`, `separated`, `ghost` |
| **Breadcrumb** | `default`, `compact`, `badge`, `bordered` |
| **Button** | `solid`, `outline`, `ghost`, `link`, `destructive`, `secondary` |
| **Checkbox** | `default`, `circle` |
| **Collapsible** | `default`, `bordered`, `ghost` |
| **InputOTP** | `outlined`, `filled`, `underlined` |
| **Radio** | `option`, `button-group` |
| **Sheet** | `top`, `right`, `bottom`, `left` (sides) |
| **Stepper** | `default`, `dot`, `outline`, `ghost`, `circle` |
| **Switch** | `default`, `square1`, `square2`, `mini` |
| **Tabs** | `solid`, `bordered`, `pills`, `pill-stroke`, `text`, `outline`, `underlined`, `enclosed`, `enclosed-fill` |
| **Toggle** | `default`, `outline` |
| **Upload** | `outline`, `primaryOutline`, `icon`, `avatar`, `avatarCircle`, `dropzone`, `primaryDropzone`, `secondaryDropzone` |
