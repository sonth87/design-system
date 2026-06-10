# shadcn design-system

A modern, fully-typed React design system built on top of **shadcn/ui** with enhanced features, TypeScript, TailwindCSS, and Radix UI primitives.

[![npm version](https://img.shields.io/npm/v/@sth87/shadcn-design-system.svg)](https://www.npmjs.com/package/@sth87/shadcn-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📚 Documentation

- 📖 **[Storybook](https://design-system-sth-kappa.vercel.app)** - Interactive component documentation
- 📦 **[NPM Package](https://www.npmjs.com/package/@sth87/shadcn-design-system)** - Latest package on npm

## 🤖 AI Skills

Add this design system skill to your AI Agent so it can automatically recognize components, props, and usage patterns:

```bash
npx skills add https://github.com/sonth87/design-system/tree/main/skills/shadcn-design-system --skill shadcn-design-system
```

Once added, the AI Agent can:
- Know exactly how to import and use each component
- Generate code with correct props, types, and examples
- Understand design tokens, hooks, and utilities in this design system

> See full reference at [docs/SKILL.md](docs/SKILL.md)

---

## 📦 Installation

SDS bundles all its dependencies for easy installation:

```bash
# npm
npm install @sth87/shadcn-design-system

# yarn
yarn add @sth87/shadcn-design-system

# pnpm
pnpm add @sth87/shadcn-design-system
```

That's it! All other dependencies (motion, date-fns, lucide-react, tailwindcss, etc.) are automatically installed.

See [INSTALLATION.md](./INSTALLATION.md) for detailed installation guide.

## 🚀 Quick Start

### 1. Import CSS

Import the design system CSS in your app entry point:

```tsx
// main.tsx or App.tsx
import "@sth87/shadcn-design-system/theme.css";
import "@sth87/shadcn-design-system/index.css";
import "@sth87/shadcn-design-system/animation.css";
```

### 2. Use Components

```tsx
import { useState } from "react";
import Button from "@sth87/shadcn-design-system/button";
import Dialog from "@sth87/shadcn-design-system/dialog";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant="default">Click me</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Open Dialog</Button>}
        title="Welcome"
        description="This is an enhanced dialog component"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button>Confirm</Button>
          </div>
        }
      >
        <p>Dialog content goes here</p>
      </Dialog>
    </div>
  );
}
```

## 📚 Component Import

## Recommended Subpath Imports

Use subpath imports for all application code. The root package import is still supported for backward compatibility, but it is considered legacy because it can make Vite dev prebundles much heavier.

### Quick Examples

```tsx
import Button from "@sth87/shadcn-design-system/button";
import Dialog from "@sth87/shadcn-design-system/dialog";
import { DataTable } from "@sth87/shadcn-design-system/table";
import { Toaster, toast } from "@sth87/shadcn-design-system/toast";
```

### Component Import Matrix

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

### Text Animation, Hooks, Utilities

```tsx
import { BlurText, RotatingText, CircularText, FlipWords, GradientText, RollingText, ShimmeringText, SplittingText, TextGenerateEffect, TextHoverEffect, TextPressure, TypingText, WritingText } from "@sth87/shadcn-design-system/textanimation";
import { useDataTable } from "@sth87/shadcn-design-system/use-data-table";
import { cn } from "@sth87/shadcn-design-system/utils";
```

### Legacy Root Import

```tsx
// Legacy only. Prefer subpath imports in new code.
import { Button, Dialog, DataTable, Toaster } from "@sth87/shadcn-design-system";
```

## 🎨 Theme Configuration

### CSS Variables

The design system uses CSS variables for theming. Customize colors in your global CSS:

```css
:root {
  /* Light mode */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

.dark {
  /* Dark mode */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... other dark mode variables */
}
```

### Dark Mode

Toggle dark mode by adding/removing the `dark` class on the root element:

```tsx
// Toggle dark mode
document.documentElement.classList.toggle("dark");
```

## 🧩 Available Components

### Form Components

- **Button** - Primary, secondary, outline, ghost, and destructive variants
- **Input** - Text, password, email with label support
- **Checkbox** - Accessible checkbox with label
- **Radio** - Radio button groups
- **Switch** - Toggle switch component
- **Select** - Dropdown select with search
- **Textarea** - Multi-line text input
- **Slider** - Range slider component
- **InputOTP** - One-time password input

### Data Display

- **Avatar** - User profile pictures with fallback
- **Badge** - Status badges and labels
- **Calendar** - Date calendar picker
- **DatePicker** - Date selection with range support
- **Toast** - Notification toasts
- **Tooltip** - Hover tooltips
- **Skeleton** - Loading skeletons

### Layout & Navigation

- **Dialog** - Modal dialogs
- **Sheet** - Side sheet/drawer
- **Tabs** - Tab navigation
- **Sidebar** - Navigation sidebar
- **Breadcrumb** - Breadcrumb navigation
- **Separator** - Visual dividers
- **ScrollArea** - Custom scrollbars
- **Collapsible** - Expandable sections

### Overlay

- **Popover** - Floating popovers
- **Glass** - Glassmorphism effect component

### Utility

- **Theme** - Theme utilities and showcase
- **FloatLabel** - Floating label for inputs

## 🎯 Usage Examples

### Button Component

```tsx
import Button from "@sth87/shadcn-design-system/button";

<Button variant="default" size="md">
  Default Button
</Button>

<Button variant="outline" size="lg">
  Outline Button
</Button>

<Button variant="solid" color="destructive">
  Destructive Button
</Button>
```

### Dialog Component

The Dialog component is enhanced with additional features beyond shadcn/ui:

```tsx
import Dialog from "@sth87/shadcn-design-system/dialog";
import Button from "@sth87/shadcn-design-system/button";
import { useState } from "react";

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    // Simple dialog with trigger
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Open Dialog</Button>}
      title="Dialog Title"
      description="Dialog description"
      footer={
        <div className="flex gap-2 justify-end w-full">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </div>
      }
    >
      <p className="text-sm text-muted-foreground">Dialog content goes here</p>
    </Dialog>
  );
}
```

**Enhanced Dialog Features:**

- **Variants**: `dialog`, `confirm`, `alert`, `info`, `warning`
- **Sizes**: `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `full`
- **Positions**: `center`, `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`
- **Animations**: `bounce`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `zoom-in`, `zoom-out`, `flip`, `glow`, `spec`
- **Scroll Options**: `stickyHeader`, `stickyFooter`, `scrollable`

```tsx
// Confirm dialog variant
<Dialog
  variant="confirm"
  trigger={<Button>Confirm Action</Button>}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  onConfirm={() => console.log("Confirmed")}
  onCancel={() => console.log("Cancelled")}
/>

// Alert dialog variant
<Dialog
  variant="alert"
  trigger={<Button>Show Alert</Button>}
  title="Warning"
  description="This action cannot be undone"
  onConfirm={() => console.log("Acknowledged")}
  confirmText="I Understand"
/>

// Dialog with custom position and animation
<Dialog
  position="right"
  animation="slide-left"
  size="lg"
  trigger={<Button>Side Panel</Button>}
  title="Settings"
>
  <div className="space-y-4">
    {/* Settings content */}
  </div>
</Dialog>

// Scrollable dialog with sticky header/footer
<Dialog
  stickyHeader
  stickyFooter
  trigger={<Button>Long Content</Button>}
  title="Scrollable Dialog"
  footer={
    <div className="flex gap-2 justify-end w-full">
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </div>
  }
>
  <div className="space-y-4">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="p-4 border rounded">
        Section {i + 1}
      </div>
    ))}
  </div>
</Dialog>
```

**Standalone Usage (without trigger prop):**

```tsx
function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Standalone Dialog"
        description="Dialog without trigger prop"
      >
        <p>Content here</p>
      </Dialog>
    </>
  );
}
```

### DatePicker Component

Enhanced DatePicker with range and time selection:

```tsx
import { DatePicker } from "@sth87/shadcn-design-system/datepicker";
import { useState } from "react";

function MyComponent() {
  const [date, setDate] = useState<Date>();

  return (
    <DatePicker selected={date} onSelect={setDate} placeholder="Pick a date" />
  );
}
```

### Toast Notifications

```tsx
import { toast, Toaster } from "@sth87/shadcn-design-system/toast";

function App() {
  return (
    <>
      <Button onClick={() => toast.success("Success message!")}>
        Show Toast
      </Button>
      <Button onClick={() => toast.error("Error message!")}>Show Error</Button>
      <Button onClick={() => toast.info("Info message!")}>Show Info</Button>
      <Toaster />
    </>
  );
}
```

## 🎨 Styling & Customization

### Using CSS Variables

```tsx
// Override specific component styles
<Button
  style={
    {
      "--primary": "200 100% 50%",
      "--primary-foreground": "0 0% 100%",
    } as React.CSSProperties
  }
>
  Custom Styled Button
</Button>
```

### Class Names

All components accept `className` prop for custom styling:

```tsx
<Button className="custom-button-class">
  Styled Button
</Button>

<Dialog
  className="custom-dialog-class"
  headerClassName="custom-header"
  contentClassName="custom-content"
  footerClassName="custom-footer"
  trigger={<Button>Custom Styled Dialog</Button>}
  title="Custom Dialog"
>
  <p>Content with custom styling</p>
</Dialog>
```

### Variants with CVA

Components use `class-variance-authority` for variant management:

```tsx
<Button variant="outline" size="lg" className="w-full">
  Full Width Button
</Button>
```

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Start Storybook
pnpm dev

# Build library
pnpm build

# Run linting
pnpm lint
```

## 📖 Documentation

For detailed documentation and interactive examples, visit our [Storybook](https://design-system-sth-kappa.vercel.app/).

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © Skyline

## 🙏 Credits

This design system is built on top of [shadcn/ui](https://ui.shadcn.com/), enhancing it with:

- Additional component variants and sizes
- Enhanced animation support with Motion
- Extended theming capabilities
- Custom components like DatePicker with range/time support
- Improved Dialog with positions, animations, and scroll options

Built with:

- [shadcn/ui](https://ui.shadcn.com/) - Base component library
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible primitives
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Motion](https://motion.dev/) - Animation library
- [date-fns](https://date-fns.org/) - Date utility library
- [Lucide React](https://lucide.dev/) - Beautiful icon set
- [React Day Picker](https://react-day-picker.js.org/) - Date picker component
