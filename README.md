# Shadcn Design System

A modern, comprehensive React component library that extends [Shadcn UI](https://ui.shadcn.com/) with powerful features and enhancements.

[![npm version](https://img.shields.io/npm/v/@sth87/shadcn-design-system)](https://www.npmjs.com/package/@sth87/shadcn-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🌟 Features

- 🎨 **40+ High-quality Components** - Production-ready React components
- 🪝 **Custom React Hooks** - Utility hooks for common patterns
- ✨ **Beautiful Animations** - Pre-built animation components and utilities
- 🎭 **Tailwind CSS** - Utility-first styling with full customization
- 📦 **Tree-shakeable** - Import only what you need
- 🌙 **Dark Mode Support** - Built-in theme switching
- 📱 **Responsive** - Mobile-first design approach
- ♿ **Accessible** - ARIA compliant components
- 🔧 **TypeScript** - Full type safety
- 📖 **Well-documented** - Comprehensive examples and API docs

## 📚 Documentation

- 📖 **[Storybook](https://design-system-sth-kappa.vercel.app)** - Interactive component documentation
- 📦 **[NPM Package](https://www.npmjs.com/package/@sth87/shadcn-design-system)** - Latest package on npm

## 🚀 Installation

### Using npm

```bash
npm install @sth87/shadcn-design-system
```

### Using pnpm

```bash
pnpm add @sth87/shadcn-design-system
```

### Using yarn

```bash
yarn add @sth87/shadcn-design-system
```

## ⚙️ Setup

### 1. Install Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom tailwindcss
```

### 2. Import Styles

Import the CSS in your main application file (e.g., `main.tsx` or `App.tsx`):

```tsx
import '@sth87/shadcn-design-system/index.css';
```

```tsx
// animation
import '@sth87/shadcn-design-system/animation.css';
```

## 💻 Usage

### Basic Example

```tsx
import { Button, Input } from '@sth87/shadcn-design-system';

function App() {
  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      <Input placeholder="Enter your email" className="mb-4" />
      <Button variant="default" className="w-full">
        Get Started
      </Button>
    </div>
  );
}
```

### Using Hooks

```tsx
import { useDebounce } from '@sth87/shadcn-design-system';
import { useState, useEffect } from 'react';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // API call with debounced value
    if (debouncedSearch) {
      console.log('Searching for:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

## 📦 What's Included

### Components

<details>
<summary><b>Layout & Structure</b></summary>

- Card
- Separator
- ScrollArea
- Resizable
- Glass
- Sidebar

</details>

<details>
<summary><b>Form Controls</b></summary>

- Input
- Textarea
- Checkbox
- Radio
- Switch
- Select
- DatePicker
- TimePicker
- RangePicker
- Upload
- InputOTP

</details>

<details>
<summary><b>Navigation</b></summary>

- Breadcrumb
- Tabs
- Pagination
- Stepper
- Command

</details>

<details>
<summary><b>Feedback & Overlays</b></summary>

- Toast
- Dialog
- Sheet
- Popover
- Tooltip
- Alert

</details>

<details>
<summary><b>Data Display</b></summary>

- Table
- Badge
- Avatar
- Carousel
- ImageViewer
- QrCode
- Rate
- Skeleton

</details>

<details>
<summary><b>Animations</b></summary>

- Marquee
- TextAnimations
- Interactive Components

</details>

<details>
<summary><b>Advanced Components</b></summary>

- TreeSelect
- Tour
- Cropper
- ContextMenu
- DropdownMenu
- Masonry

</details>

### Custom Hooks

- `useDebounce` / `useDebouncedCallback` - Debounce values and callbacks
- `useIntersectionObserver` - Detect element visibility
- `useMediaQuery` - Responsive breakpoint detection
- `useMousePosition` - Track mouse coordinates
- `useOnClickOutside` - Detect clicks outside element
- `useScrollLock` - Lock/unlock body scroll
- `useEventListener` - Simplified event handling
- `useCallbackRef` - Stable callback references
- And more...

## 🎨 Customization

All components support the `className` prop for custom styling with Tailwind CSS:

```tsx
<Button 
  variant="outline" 
  size="lg"
  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
>
  Custom Gradient Button
</Button>
```

### Theme Customization

Override CSS variables for global theming:

```css
:root {
  --background: #ffffff;
  --foreground: #2e3a5b;
  --muted-foreground: #58617c;
  --subtle-foreground: #777f94;
  --card: #ffffff;
  --card-foreground: #0a0a0a;
  --popover: #ffffff;
  --popover-foreground: #0a0a0a;
  --primary: #f37320;
  --primary-foreground: #fafafa;
  --secondary: #213f99;
  --secondary-foreground: #fafafa;
  --muted: #f5f5f5;
  /* --muted-foreground: #737373; */
  --accent: #f5f5f5;
  --accent-foreground: #171717;
  --destructive: #e7000b;
  --destructive-foreground: #fafafa;
  /* state color */
  --success: #39cc7e;
  --success-foreground: #ffffff;
  --error: #ff6262;
  --error-foreground: #ffffff;
  --warning: #ff9d57;
  --warning-foreground: #ffffff;
  /* end state color */
  --border: #e5e5e5;
  --input: #e5e5e5;
  --ring: #a1a1a1;
  --chart-1: #f54a00;
  --chart-2: #009689;
  --chart-3: #104e64;
  --chart-4: #ffba00;
  --chart-5: #fd9a00;
  --radius: 0.625rem;
  --sidebar: #f1f5f9;
  --sidebar-foreground: #2e3a5b;
  --sidebar-primary: #171717;
  --sidebar-primary-foreground: #fafafa;
  --sidebar-accent: #f5f5f5;
  --sidebar-accent-foreground: #171717;
  --sidebar-border: #e5e5e5;
  --sidebar-ring: #a1a1a1;
}

.dark {
  --background: #303841;
  --foreground: #94a0ad;
  --muted-foreground: #eaebef;
  --subtle-foreground: #f5f5f7;
  --card: #36404a;
  --card-foreground: #94a0ad;
  --popover: #0a0a0a;
  --popover-foreground: #fafafa;
  --primary: #f37320;
  --primary-foreground: #fafafa;
  --secondary: #213f99;
  --secondary-foreground: #fafafa;
  --muted: #36404a;
  /* --muted-foreground: #a1a1a1; */
  --accent: #262626;
  --accent-foreground: #fafafa;
  --destructive: #82181a;
  --destructive-foreground: #fb2c36;
  /* state color */
  --success: #39cc7e;
  --success-foreground: #ffffff;
  --error: #ff6262;
  --error-foreground: #ffffff;
  --warning: #ff9d57;
  --warning-foreground: #ffffff;
  /* end state color */
  --border: #262626;
  --input: #262626;
  --ring: #737373;
  --chart-1: #1447e6;
  --chart-2: #00bc7d;
  --chart-3: #fd9a00;
  --chart-4: #ad46ff;
  --chart-5: #ff2056;
  --sidebar: #37424c;
  --sidebar-foreground: #94a0ad;
  --sidebar-primary: #1447e6;
  --sidebar-primary-foreground: #fafafa;
  --sidebar-accent: #262626;
  --sidebar-accent-foreground: #fafafa;
  --sidebar-border: #262626;
  --sidebar-ring: #525252;
}
```

## 🛠️ Development

This is a monorepo managed with pnpm workspaces and Turborepo.

### Prerequisites

- Node.js 18+
- pnpm 8+

### Install Dependencies

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Storybook

```bash
pnpm storybook
```

## 🤝 Contributing

Contributions are welcome! Please feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This project is built on top of:

- [Shadcn UI](https://ui.shadcn.com/) - Original component library
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://react.dev/) - UI library

---

Built with ❤️ by [Sonth87](https://github.com/sonth87)
