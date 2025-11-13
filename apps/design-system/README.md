# @dsui/design-system

A modern, fully-typed React design system built on top of **shadcn/ui** with enhanced features, TypeScript, TailwindCSS, and Radix UI primitives.

[![npm version](https://img.shields.io/npm/v/@dsui/design-system.svg)](https://www.npmjs.com/package/@dsui/design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📦 Installation

DSUI bundles all its dependencies for easy installation:

```bash
# npm
npm install dsui react react-dom

# yarn
yarn add dsui react react-dom

# pnpm
pnpm add dsui react react-dom
```

That's it! All other dependencies (motion, date-fns, lucide-react, tailwindcss, etc.) are automatically installed.

See [INSTALLATION.md](./INSTALLATION.md) for detailed installation guide.

## 🚀 Quick Start

### 1. Import CSS

Import the design system CSS in your app entry point:

```tsx
// main.tsx or App.tsx
import "dsui/theme.css";
import "dsui/index.css";
import "dsui/animation.css";
```

### 2. Configure TailwindCSS

Add the design system to your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/dsui/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};
```

### 3. Use Components

```tsx
import { Button, Dialog } from "@dsui/design-system";

function App() {
  const [open, setOpen] = useState(false);
  
  return (
    <div>
      <Button variant="default">Click me</Button>
      
      {/* Dialog with trigger prop */}
      <Dialog
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

### Full Import

Import all components from the main entry:

```tsx
import {
  Avatar,
  Badge,
  Button,
  Calendar,
  Checkbox,
  Dialog,
  Input,
  Select,
  Tabs,
  Toast,
} from "@dsui/design-system";
```

### Tree-shakeable Imports

Import individual components for optimal bundle size:

```tsx
import { Button } from "@dsui/design-system/button";
import { Dialog } from "@dsui/design-system/dialog";
import { DatePicker } from "@dsui/design-system/datepicker";
import { Input } from "@dsui/design-system/input";
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
import { Button } from "@dsui/design-system";

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
import { Dialog, Button } from "@dsui/design-system";
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
          <Button onClick={() => setOpen(false)}>
            Save Changes
          </Button>
        </div>
      }
    >
      <p className="text-sm text-muted-foreground">
        Dialog content goes here
      </p>
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
import { DatePicker } from "@dsui/design-system";
import { useState } from "react";

function MyComponent() {
  const [date, setDate] = useState<Date>();

  return (
    <DatePicker
      selected={date}
      onSelect={setDate}
      placeholder="Pick a date"
    />
  );
}
```

### Toast Notifications

```tsx
import { toast, Toaster } from "@dsui/design-system";

function App() {
  return (
    <>
      <Button onClick={() => toast.success("Success message!")}>
        Show Toast
      </Button>
      <Button onClick={() => toast.error("Error message!")}>
        Show Error
      </Button>
      <Button onClick={() => toast.info("Info message!")}>
        Show Info
      </Button>
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
  style={{ 
    '--primary': '200 100% 50%',
    '--primary-foreground': '0 0% 100%'
  } as React.CSSProperties}
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

For detailed documentation and interactive examples, visit our [Storybook](https://your-storybook-url.com).

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Your Name]

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
