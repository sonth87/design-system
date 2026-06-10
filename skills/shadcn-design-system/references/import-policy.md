# Import Policy

Use subpath imports for all new code. Root imports are kept only for backward compatibility and should be treated as legacy.

## Rules

- Generate component, hook, utility, and text animation imports from subpaths.
- Do not generate new component code from the root package.
- Keep CSS imports as package CSS subpaths.
- Root import remains supported for older apps, but it can make Vite dev prebundles much heavier.

## CSS

```tsx
import "@sth87/shadcn-design-system/theme.css";
import "@sth87/shadcn-design-system/index.css";
import "@sth87/shadcn-design-system/animation.css";
```

## Components And Component Helpers

| Subpath | Public exports | Canonical import |
|---|---|---|
| `accordion` | Accordion | `import Accordion from "@sth87/shadcn-design-system/accordion";` |
| `avatar` | Avatar | `import { Avatar } from "@sth87/shadcn-design-system/avatar";` |
| `badge` | Badge | `import Badge from "@sth87/shadcn-design-system/badge";` |
| `breadcrumb` | Breadcrumb | `import Breadcrumb from "@sth87/shadcn-design-system/breadcrumb";` |
| `button` | Button, ButtonGroup | `import Button, { ButtonGroup } from "@sth87/shadcn-design-system/button";` |
| `calendar` | Calendar, CalendarDayButton | `import { Calendar, CalendarDayButton } from "@sth87/shadcn-design-system/calendar";` |
| `carousel` | Carousel, CarouselSlide | `import { Carousel, CarouselSlide } from "@sth87/shadcn-design-system/carousel";` |
| `checkbox` | Checkbox | `import Checkbox from "@sth87/shadcn-design-system/checkbox";` |
| `collapsible` | Collapsible | `import Collapsible from "@sth87/shadcn-design-system/collapsible";` |
| `command` | Command | `import { Command } from "@sth87/shadcn-design-system/command";` |
| `contextmenu` | ContextMenu | `import { ContextMenu } from "@sth87/shadcn-design-system/contextmenu";` |
| `cropper` | Cropper, CropperTool, useCropper, useCropperTool | `import { Cropper, CropperTool, useCropper } from "@sth87/shadcn-design-system/cropper";` |
| `datepicker` | DatePicker, RangePicker, TimePicker | `import { DatePicker, RangePicker, TimePicker } from "@sth87/shadcn-design-system/datepicker";` |
| `dialog` | Dialog | `import Dialog from "@sth87/shadcn-design-system/dialog";` |
| `dropdownmenu` | DropdownMenu | `import { DropdownMenu } from "@sth87/shadcn-design-system/dropdownmenu";` |
| `floatlabel` | FloatingLabel | `import { FloatingLabel } from "@sth87/shadcn-design-system/floatlabel";` |
| `glass` | Glass | `import Glass from "@sth87/shadcn-design-system/glass";` |
| `imageviewer` | ImageViewer, ImageViewerImage, ImageViewerGroup | `import ImageViewer, { ImageViewerImage, ImageViewerGroup } from "@sth87/shadcn-design-system/imageviewer";` |
| `input` | Input | `import Input from "@sth87/shadcn-design-system/input";` |
| `inputotp` | InputOTP | `import InputOTP from "@sth87/shadcn-design-system/inputotp";` |
| `interactive` | Cursor, CursorFollow, CursorProvider | `import { Cursor, CursorFollow, CursorProvider } from "@sth87/shadcn-design-system/interactive";` |
| `label` | Label | `import { Label } from "@sth87/shadcn-design-system/label";` |
| `marquee` | Marquee | `import { Marquee } from "@sth87/shadcn-design-system/marquee";` |
| `masonry` | Masonry, MasonryComponent, MasonryRoot | `import { Masonry, MasonryComponent, MasonryRoot } from "@sth87/shadcn-design-system/masonry";` |
| `pagination` | Pagination | `import { Pagination } from "@sth87/shadcn-design-system/pagination";` |
| `popover` | Popover | `import Popover from "@sth87/shadcn-design-system/popover";` |
| `qrcode` | QRCode, QrCode, useQRCode | `import { QRCode, QrCode, useQRCode } from "@sth87/shadcn-design-system/qrcode";` |
| `radio` | Radio | `import Radio from "@sth87/shadcn-design-system/radio";` |
| `rate` | Rate | `import Rate from "@sth87/shadcn-design-system/rate";` |
| `resizable` | Resizable, ResizablePanelGroup, ResizablePanel | `import Resizable, { ResizablePanelGroup, ResizablePanel } from "@sth87/shadcn-design-system/resizable";` |
| `scrollarea` | ScrollArea | `import ScrollArea from "@sth87/shadcn-design-system/scrollarea";` |
| `select` | Select | `import Select from "@sth87/shadcn-design-system/select";` |
| `separator` | Separator | `import Separator from "@sth87/shadcn-design-system/separator";` |
| `sheet` | Sheet | `import Sheet from "@sth87/shadcn-design-system/sheet";` |
| `sidebar` | Sidebar, SidebarProvider, useSidebar | `import Sidebar, { SidebarProvider, useSidebar } from "@sth87/shadcn-design-system/sidebar";` |
| `skeleton` | Skeleton | `import Skeleton from "@sth87/shadcn-design-system/skeleton";` |
| `slider` | Slider | `import Slider from "@sth87/shadcn-design-system/slider";` |
| `stepper` | Stepper, useStepper | `import { Stepper, useStepper } from "@sth87/shadcn-design-system/stepper";` |
| `switch` | Switch | `import Switch from "@sth87/shadcn-design-system/switch";` |
| `table` | DataTable, DataTableColumnHeader, DataTablePagination | `import { DataTable, DataTableColumnHeader, DataTablePagination } from "@sth87/shadcn-design-system/table";` |
| `tabs` | Tabs | `import Tabs from "@sth87/shadcn-design-system/tabs";` |
| `textarea` | Textarea | `import Textarea from "@sth87/shadcn-design-system/textarea";` |
| `timegridview` | TimeGridView | `import { TimeGridView } from "@sth87/shadcn-design-system/timegridview";` |
| `toast` | Toaster, toast, Toast | `import { Toaster, toast, Toast } from "@sth87/shadcn-design-system/toast";` |
| `toggle` | Toggle | `import Toggle from "@sth87/shadcn-design-system/toggle";` |
| `tooltip` | Tooltip | `import { Tooltip } from "@sth87/shadcn-design-system/tooltip";` |
| `tour` | Tour | `import { Tour } from "@sth87/shadcn-design-system/tour";` |
| `treeselect` | TreeSelect, TreeView | `import { TreeSelect, TreeView } from "@sth87/shadcn-design-system/treeselect";` |
| `upload` | Upload | `import { Upload } from "@sth87/shadcn-design-system/upload";` |
| `wheelcolumn` | WheelColumn | `import { WheelColumn } from "@sth87/shadcn-design-system/wheelcolumn";` |

## Text Animation

```tsx
import { BlurText, RotatingText, CircularText, FlipWords, GradientText, RollingText, ShimmeringText, SplittingText, TextGenerateEffect, TextHoverEffect, TextPressure, TypingText, WritingText } from "@sth87/shadcn-design-system/textanimation";
```

## Hooks

| Hook | Canonical import |
|---|---|
| `useCallbackRef` | `import { useCallbackRef } from "@sth87/shadcn-design-system/use-callback-ref";` |
| `useDebouncedCallback` | `import { useDebouncedCallback } from "@sth87/shadcn-design-system/use-debounced-callback";` |
| `useDebounceValue` | `import { useDebounceValue } from "@sth87/shadcn-design-system/use-debounced-value";` |
| `useEventListener` | `import { useEventListener } from "@sth87/shadcn-design-system/use-event-listener";` |
| `useIntersectionObserver` | `import { useIntersectionObserver } from "@sth87/shadcn-design-system/use-intersection-observer";` |
| `useIsomorphicLayoutEffect` | `import { useIsomorphicLayoutEffect } from "@sth87/shadcn-design-system/use-isomorphic-layout-effect";` |
| `useMediaQuery` | `import { useMediaQuery } from "@sth87/shadcn-design-system/use-media-query";` |
| `useMousePosition` | `import { useMousePosition } from "@sth87/shadcn-design-system/use-mouse-position";` |
| `useOnClickOutside` | `import { useOnClickOutside } from "@sth87/shadcn-design-system/use-on-click-outside";` |
| `useScript` | `import { useScript } from "@sth87/shadcn-design-system/use-script";` |
| `useScrollLock` | `import { useScrollLock } from "@sth87/shadcn-design-system/use-scroll-lock";` |
| `useDataTable` | `import { useDataTable } from "@sth87/shadcn-design-system/use-data-table";` |

## Utilities

```tsx
import { cn } from "@sth87/shadcn-design-system/utils";
```

## Legacy Root Import

```tsx
// Legacy only. Do not generate new code with this form.
import { Button, Dialog, DataTable, Toaster } from "@sth87/shadcn-design-system";
```
