/**
 * @dsui/design-system
 * Main entry point for the design system library
 *
 * Import examples:
 * import { Button, Avatar, Dialog } from "@dsui/design-system"
 * import "@dsui/design-system/theme.css"
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

// Tour
export * from "./components/Tour";

// QR Code
export * from "./components/QrCode";

// Marquee
export * from "./components/Marquee";

// Stepper
export * from "./components/Stepper";

// Pagination
export * from "./components/Pagination";

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

// ============================================
// UTILS & HOOKS
// ============================================

export { cn } from "@dsui/ui";
export { useDebouncedCallback } from "@/hooks/use-debounced-callback";
export { useCallbackRef } from "@/hooks/use-callback-ref";

// ============================================
// CSS IMPORTS
// ============================================
// Users can import CSS files separately:
// import "@dsui/design-system/theme.css"
// import "@dsui/design-system/index.css"
// import "@dsui/design-system/animation.css"
