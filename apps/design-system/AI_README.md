# AI Agent Guide for @sth87/shadcn-design-system

## Introduction
This is a React Component Library based on Shadcn UI and Radix UI, styled with Tailwind CSS. It is designed to be easily consumed by AI Agents generating UI code.

## Configuration

### 1. Tailwind Config
Ensure your `tailwind.config.js` includes the following content glob and theme extension (standard shadcn setup):

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@sth87/shadcn-design-system/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... map other standard shadcn variables
      }
    }
  }
}
```

### 2. Global CSS
You must import the library's CSS in your root entry file (e.g., `main.tsx` or `App.tsx`):

```tsx
import "@sth87/shadcn-design-system/index.css";
import "@sth87/shadcn-design-system/animation.css";
```

## Component Usage
- **Context:** A detailed list of components and their props is available in `AI_CONTEXT.md` in the `dist/` folder of this package.
- **Imports:** Import components directly from `@sth87/shadcn-design-system/<component-name>` (lowercase).
  - Example: `import { Button } from "@sth87/shadcn-design-system/button"`
- **Styling:** Use `className` to override styles. The library uses `tailwind-merge` internally.

## Best Practices for AI Code Generation
1. **Always check `AI_CONTEXT.md`** for the specific props of a component. Some components (like `Button`) have extended props (`animation`, `isLoading`) not found in the base shadcn library.
2. **Use the `cn()` utility** if you are merging classes in your own components, but for library components, just pass `className`.
3. **Icons:** The library uses `lucide-react`.

## Example
```tsx
import { Button } from "@sth87/shadcn-design-system/button";
import { LoaderCircle } from "lucide-react";

export default function MyComponent() {
  return (
    <Button variant="solid" color="primary" animation="pulse">
      Click Me
    </Button>
  );
}
```
