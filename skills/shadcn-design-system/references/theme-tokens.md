# Theme Tokens & Animation Reference
## @sth87/shadcn-design-system

---

## Design Tokens (`theme.css`)

All tokens are CSS custom properties injected when you import `theme.css`. Components automatically use them via Tailwind's `@theme inline` block.

### Core Color Tokens

| Token | Light value | Dark value | Usage |
|---|---|---|---|
| `--background` | `#ffffff` | `#303841` | Page background |
| `--foreground` | `#2e3a5b` | `#94a0ad` | Default text |
| `--muted-foreground` | `#58617c` | `#eaebef` | Subdued text |
| `--subtle-foreground` | `#777f94` | `#f5f5f7` | Placeholder text |
| `--card` | `#ffffff` | `#36404a` | Card background |
| `--card-foreground` | `#2e3a5b` | `#94a0ad` | Text on card |
| `--popover` | `#ffffff` | `#0a0a0a` | Floating surfaces |
| `--popover-foreground` | `#2e3a5b` | `#94a0ad` | Text on popover |
| `--primary` | `#f37320` | `#f37320` | Brand orange |
| `--primary-foreground` | `#ffffff` | `#ffffff` | Text on primary |
| `--secondary` | `#213f99` | `#213f99` | Brand blue |
| `--secondary-foreground` | `#ffffff` | `#ffffff` | Text on secondary |
| `--muted` | `#f5f5f5` | `#36404a` | Subtle backgrounds |
| `--muted-foreground` | `#58617c` | `#eaebef` | Text on muted |
| `--accent` | `#f5f5f5` | `#262626` | Hover/selected bg |
| `--accent-foreground` | `#2e3a5b` | `#94a0ad` | Text on accent |
| `--destructive` | `#e7000b` | `#82181a` | Error/danger actions |
| `--destructive-foreground` | `#ffffff` | `#ffffff` | Text on destructive |
| `--success` | `#39cc7e` | `#39cc7e` | Success state |
| `--error` | `#ff6262` | `#ff6262` | Error state |
| `--warning` | `#ff9d57` | `#ff9d57` | Warning state |
| `--border` | `#e5e5e5` | `#262626` | All borders |
| `--input` | `#e5e5e5` | `#262626` | Input borders |
| `--ring` | `#a1a1a1` | `#737373` | Focus ring |
| `--radius` | `0.625rem` | — | Border radius base |
| `--sidebar` | `#f1f5f9` | `#37424c` | Sidebar background |
| `--sidebar-foreground` | `#2e3a5b` | `#94a0ad` | Text in sidebar |
| `--chart-1` … `--chart-5` | Various | Various | Chart series colors |

### Using Tokens Directly in CSS / Tailwind

```css
/* In plain CSS */
.my-card {
  background-color: var(--card);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
```

```tsx
/* In Tailwind className (tokens are mapped to color-* utilities) */
<div className="bg-background text-foreground border border-border rounded-md">
<div className="bg-primary text-primary-foreground">
<div className="bg-muted text-muted-foreground">
```

### Switching Themes at Runtime

Apply a `data-theme` attribute on any ancestor element to override the entire token set:

```html
<!-- Theme: "rose" -->
<div data-theme="rose">
  <!-- All CSS custom properties inside this element use the "rose" palette -->
</div>
```

```tsx
// In React
<div data-theme="rose">
  <Button color="primary">This uses rose-themed primary</Button>
</div>

// Toggle theme programmatically
document.documentElement.setAttribute("data-theme", "rose");
document.documentElement.removeAttribute("data-theme"); // reset to default
```

### Dark Mode

Add the `dark` class to the `<html>` element (compatible with Tailwind's `darkMode: "class"` strategy):

```html
<html class="dark">
```

```tsx
// Next.js: use next-themes
import { ThemeProvider } from "next-themes";
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

---

## Date/Time Constants

```tsx
import { DATE_FORMAT, TIME_FORMAT, DATE_TIME_FORMAT } from "@sth87/shadcn-design-system";

DATE_FORMAT      // "dd/MM/yyyy"
TIME_FORMAT      // "HH:mm"
DATE_TIME_FORMAT // "dd/MM/yyyy HH:mm"
```

---

## Shared Type Unions

```ts
type BasicColor =
  | "primary" | "secondary" | "success" | "warning"
  | "error" | "glass" | "muted" | "accent" | "destructive";

type BasicAnimation =
  | "heartbeat" | "rainbow" | "shine" | "bounce" | "tap" | "glass"
  | "glow" | "liquid" | "pulse" | "gradient-outline"
  | "slide-in-from-bottom" | "slide-in-from-top"
  | "slide-in-from-left" | "slide-in-from-right"
  | "zoom-in" | "zoom-out" | "skewed-in"
  | "shake" | "flip-in" | "fade-in";

type ButtonAnimation = BasicAnimation | "none";
type BadgeAnimation = "heartbeat" | "pulse" | "bounce" | "none";
type SwitchAnimation = "heartbeat" | "bounce" | "glass" | "none";

type CalendarColor =
  | "primary" | "secondary" | "accent" | "destructive"
  | "muted" | "success" | "error" | "warning" | "foreground";
```

---

## Animation Tokens (`animation.css`)

All keyframes are registered as Tailwind `--animate-*` tokens. Use them via the `animation` prop on components, or directly with `className="animate-[token-name]"`.

### Core Entrance / Exit Animations

| Token name | Duration | Effect |
|---|---|---|
| `heartbeat` | 1.5s loop | Box-shadow pulse + scale |
| `rainbow` | 3s loop | Background-position sweep |
| `bounce` | 0.6s | Y-axis bounce with squash |
| `slide-in-from-bottom` | 0.3s | Fade + translate-Y up |
| `slide-in-from-top` | 0.3s | Fade + translate-Y down |
| `slide-in-from-left` | 0.3s | Fade + translate-X right |
| `slide-in-from-right` | 0.3s | Fade + translate-X left |
| `zoom-in` | 0.3s | Scale 0.95→1 + fade in |
| `zoom-out` | 0.3s | Scale 1→0.95 + fade out |
| `skewed-in` | 0.4s | Skew + scale entrance |
| `shake` | 0.82s | Lateral shake (error state) |
| `flip-in` | 0.5s | 3D Y-axis flip entrance |
| `glow` | 2s loop | Background position loop (neon glow) |
| `gradient-outline` | 10s+60s combo | Animated gradient border |
| `wiggle` | 0.5s | Small rotational wiggle |

### Directional Bounce Variants

| Token | Effect |
|---|---|
| `bounce-in-up` | Bounce entrance from below |
| `bounce-in-down` | Bounce entrance from above |
| `bounce-in-left` | Bounce entrance from left |
| `bounce-in-right` | Bounce entrance from right |
| `bounce-out-up` / `bounce-out-down` / `bounce-out-left` / `bounce-out-right` | Bounce exit variants |

### 3D Flip Variants

| Token | Effect |
|---|---|
| `flip-in-x` | Flip on X axis (horizontal axis) |
| `flip-in-y` | Flip on Y axis (vertical axis) |
| `flip-out-x` / `flip-out-y` | Flip exit variants |

### Animate.css-style Utilities

| Token | Effect |
|---|---|
| `flash` | Rapid opacity flash |
| `pulse` | Gentle opacity pulse |
| `rubber-band` | Elastic stretch effect |
| `swing` | Pendulum swing |
| `tada` | Scale + rotate tada |
| `wobble` | Side-to-side wobble |
| `jello` | Jello/stretch skew effect |
| `light-speed-in` / `light-speed-out` | Skewed fast slide |

### Marquee Tokens

| Token | Effect | Speed control |
|---|---|---|
| `marquee-left` | Scroll content rightward (RTL) | `--marquee-duration` CSS var |
| `marquee-right` | Scroll content leftward (LTR) | `--marquee-duration` CSS var |
| `marquee-up` | Scroll content upward | `--marquee-duration` CSS var |
| `marquee-down` | Scroll content downward | `--marquee-duration` CSS var |
| `marquee-left-rtl` / `marquee-right-rtl` | RTL direction variants | `--marquee-duration` CSS var |

**Marquee speed control:**
```tsx
// Set scroll speed via CSS variable (default: 20s)
<div style={{ "--marquee-duration": "30s" } as React.CSSProperties}>
  ...
</div>
```

### Using Animation Tokens Directly in className

```tsx
// Apply animation via Tailwind arbitrary value
<div className="animate-[heartbeat]">Pulsing element</div>
<div className="animate-[slide-in-from-bottom]">Slides in from below</div>
<div className="animate-[shake]">Shaking element</div>

// Combine with duration/iteration modifiers
<div className="animate-[bounce] animation-iteration-count-infinite">Infinite bounce</div>
```

### Using animation prop on Components

Components that accept `animation` prop (Button, Badge, Switch, Avatar, Tooltip, Dialog, Sheet, etc.):

```tsx
// Component-level animation
<Button animation="shine">Shine on hover</Button>
<Button animation="rainbow">Rainbow loop</Button>
<Button animation="glow">Glow effect</Button>
<Button animation="heartbeat">Heartbeat pulse</Button>
<Button animation="bounce">Bounce</Button>
<Button animation="liquid">Liquid ripple</Button>
<Button animation="tap">Tap scale</Button>
<Button animation="gradient-outline">Animated border</Button>

// Entrance animations (typically for dialogs, sheets)
<Dialog animation="zoom-in">...</Dialog>
<Dialog animation="slide-in-from-bottom">...</Dialog>
<Sheet animation="slide-in-from-right">...</Sheet>

// Tooltip animations
<Tooltip animation="zoom-in" content="Hello">...</Tooltip>
```
