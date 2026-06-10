/**
 * @sth87/shadcn-design-system
 * Root barrel entry point for the design system library.
 *
 * ⚠️ LEGACY / BACKWARD-COMPATIBLE ONLY.
 * This root barrel re-exports every public module and is kept only so existing
 * `import { Button } from "@sth87/shadcn-design-system"` code keeps working.
 * Do NOT use it for new code, and do NOT generate root imports from it.
 *
 * Canonical imports are subpaths (one entry per module), e.g.:
 *   import Button from "@sth87/shadcn-design-system/button";
 *   import Dialog from "@sth87/shadcn-design-system/dialog";
 *   import { DataTable } from "@sth87/shadcn-design-system/table";
 *   import { Toaster, toast } from "@sth87/shadcn-design-system/toast";
 *
 * CSS is imported separately:
 *   import "@sth87/shadcn-design-system/theme.css";
 *   import "@sth87/shadcn-design-system/index.css";
 *   import "@sth87/shadcn-design-system/animation.css";
 *
 * See AI_README.md and skills/shadcn-design-system/references/import-policy.md
 * for the full subpath matrix.
 */

// ============================================
// COMPONENTS
// ============================================

// Avatar
export * from "./components/Avatar";

// Badge
export * from "./components/Badge";

// Breadcrumb
export * from "./components/Breadcrumb";

// Button
export * from "./components/Button";

// Calendar
export * from "./components/Calendar";

// Checkbox
export * from "./components/Checkbox";

// Collapsible
export * from "./components/Collapsible";

// Command
export * from "./components/Command";

// DatePicker
export * from "./components/DatePicker";

// Dialog
export * from "./components/Dialog";

// Glass
export * from "./components/Glass";

// Input
export * from "./components/Input";

// InputOTP
export * from "./components/InputOTP";

// Label
export * from "./components/Label";

// Popover
export * from "./components/Popover";

// Radio
export * from "./components/Radio";

// ScrollArea
export * from "./components/ScrollArea";

// Select
export * from "./components/Select";

// Separator
export * from "./components/Separator";

// Sheet
export * from "./components/Sheet";

// Sidebar - Has its own index.ts with all exports
export * from "./components/Sidebar";

// Skeleton
export * from "./components/Skeleton";

// Slider
export * from "./components/Slider";

// Switch
export * from "./components/Switch";

// Tabs - Has its own index.ts with all exports
export * from "./components/Tabs";

// Textarea
export * from "./components/Textarea";

// Toast
export * from "./components/Toast";

// Toggle
export * from "./components/Toggle";

// Tooltip
export * from "./components/Tooltip";

// Upload
export * from "./components/Upload";

// Tour
export * from "./components/Tour";

// QR Code
export * from "./components/QrCode";

// Stepper
export * from "./components/Stepper";

// Pagination
export * from "./components/Pagination";

// DataTable
export * from "./components/Table";

// DropdownMenu
export * from "./components/DropdownMenu";

// ContextMenu
export * from "./components/ContextMenu";

// Rating
export * from "./components/Rate";

// TreeView
export * from "./components/TreeSelect";

// Upload
export * from "./components/Upload";

// Command
export * from "./components/Command";

// Resizable
export * from "./components/Resizable";

// Accordion
export * from "./components/Accordion";

// Image Viewer
export * from "./components/ImageViewer";

// Carousel
export * from "./components/Carousel";

// ============================================
// STANDALONE COMPONENTS
// ============================================

export { FloatingLabel } from "./components/FloatLabel";
export { TimeGridView } from "./components/TimeGridView";
export { TimeColumnwheel as WheelColumn } from "./components/WheelColumn";

// ============================================
// INTERACTIVE COMPONENTS
// ============================================

export * from "./components/Cropper";
export * from "./components/Interactive";
export * from "./components/Marquee";
export * from "./components/Masonry";

// ============================================
// TEXT ANIMATIONS COMPONENTS
// ============================================

export * from "./lib/TextAnimation";

// ============================================
// UTILS & HOOKS
// ============================================

export { cn } from "@dsui/ui/lib/utils";
export { useCallbackRef } from "@/hooks/use-callback-ref";
export { useDebouncedCallback } from "@/hooks/use-debounced-callback";
export { useDebounceValue } from "@/hooks/use-debounced-value";
export { useIntersectionObserver } from "@/hooks/use-intersection-observer";
export { useScript } from "@/hooks/use-script";
export { useScrollLock } from "@/hooks/use-scroll-lock";
export { useOnClickOutside } from "@/hooks/use-on-click-outside";
export { useEventListener } from "@/hooks/use-event-listener";
export { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout-effect";
export { useMousePosition } from "@/hooks/use-mouse-position";
export {
  useMediaQuery,
  type UseMediaQueryOptions,
} from "@/hooks/use-media-query";
export { useDataTable } from "@/hooks/use-data-table";

// ============================================
// CSS IMPORTS
// ============================================
// Users can import CSS files separately:
// import "@dsui/design-system/theme.css"
// import "@dsui/design-system/index.css"
// import "@dsui/design-system/animation.css"
