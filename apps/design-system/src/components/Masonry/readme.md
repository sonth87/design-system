# Masonry Component

A high-performance, virtualized masonry grid layout component.

## Features

- ✅ **Virtualization** - Only renders items in viewport (toggleable)
- ✅ **Auto-resize** - Adjusts layout when item sizes change
- ✅ **Scroll optimization** - Throttled scroll handling
- ✅ **Two usage modes** - Data-driven and Declarative
- ✅ **Responsive** - Auto-calculates columns based on width
- ✅ **TypeScript** - Full type support

## Installation

```tsx
import { Masonry } from "@dsui/design-system";
```

## Quick Start

### Data-driven mode (recommended)

```tsx
<Masonry
  items={items}
  renderItem={(item) => <Card item={item} />}
  columnCount={3}
  gap={12}
/>
```

### Declarative mode

```tsx
<Masonry columnCount={3} gap={12}>
  {items.map((item) => (
    <Masonry.Item key={item.id}>
      <Card item={item} />
    </Masonry.Item>
  ))}
</Masonry>
```

## Props

| Prop             | Type                         | Default | Description                                    |
| ---------------- | ---------------------------- | ------- | ---------------------------------------------- |
| `items`          | `T[]`                        | -       | Array of items (data-driven mode)              |
| `renderItem`     | `(item, index) => ReactNode` | -       | Render function (data-driven mode)             |
| `children`       | `ReactNode`                  | -       | Children (declarative mode)                    |
| `columnCount`    | `number`                     | auto    | Fixed number of columns                        |
| `columnWidth`    | `number`                     | `200`   | Target column width (when columnCount not set) |
| `maxColumnCount` | `number`                     | -       | Maximum columns allowed                        |
| `gap`            | `number \| { column, row }`  | `0`     | Gap between items                              |
| `virtualize`     | `boolean`                    | `true`  | Enable/disable virtualization                  |
| `overscan`       | `number`                     | `2`     | Viewport heights to pre-render                 |
| `scrollFps`      | `number`                     | `12`    | Scroll event throttle rate                     |
| `linear`         | `boolean`                    | `false` | Sequential placement (left to right)           |
| `fallback`       | `ReactNode`                  | -       | Loading placeholder                            |
| `itemHeight`     | `number`                     | `300`   | Estimated item height (for initial layout)     |

## How It Works

### 1. Virtualization

```
┌─────────────────────────────────┐
│     Items NOT rendered          │  ← Above viewport
│     (saved in memory)           │
├─────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │  1  │ │  2  │ │  3  │        │  ← Viewport
│ └─────┘ │     │ └─────┘        │     (rendered)
│ ┌─────┐ └─────┘ ┌─────┐        │
│ │  4  │ ┌─────┐ │  5  │        │
│ └─────┘ │  6  │ └─────┘        │
├─────────────────────────────────┤
│     Items NOT rendered          │  ← Below viewport
│     (saved in memory)           │
└─────────────────────────────────┘
```

- Only items in viewport + overscan are rendered to DOM
- Reduces DOM nodes from 1000s to ~20-30
- Toggle with `virtualize={false}` for SEO/printing

### 2. ResizeObserver

```tsx
// When image loads and changes height:
<img onLoad={() => /* ResizeObserver detects change */} />

// Masonry automatically:
// 1. Detects height change via ResizeObserver
// 2. Updates item position in Interval Tree
// 3. Recalculates positions of items below
// 4. Re-renders affected items
```

### 3. Interval Tree (Red-Black Tree)

Used for O(log n) range queries to find visible items:

```
Query: "Which items are visible between scrollTop 500-1000?"

Interval Tree:
        [300-600, item2]
       /                \
[100-400, item1]    [700-1100, item3]
                          \
                      [900-1200, item4]

Result: item2, item3, item4 (in O(log n) time)
```

### 4. Scroll Throttling

```
Scroll events:  ●●●●●●●●●●●●●●●●●●●●  (60/s from browser)
                        ↓
Throttle (12 FPS):  ●    ●    ●    ●  (12/s processed)
                        ↓
Result: Smooth scrolling without jank
```

### 5. Column Placement

**Default mode (`linear={false}`):**

- Items fill the **shortest column** first
- Optimizes vertical space usage

**Linear mode (`linear={true}`):**

- Items placed **left to right** sequentially
- Maintains visual order

## When to Disable Virtualization

| Use Case                    | `virtualize`       |
| --------------------------- | ------------------ |
| Large lists (100+ items)    | `true` ✅          |
| SEO (crawlers need content) | `false`            |
| Print stylesheet            | `false`            |
| Small lists (< 50 items)    | `false` (optional) |
| Screenshot/export           | `false`            |

```tsx
// For SEO
<Masonry virtualize={false} items={items} renderItem={...} />
```

## Performance Tips

1. **Use `loading="lazy"` on images:**

   ```tsx
   <img src={url} loading="lazy" alt="..." />
   ```

2. **Provide stable keys:**

   ```tsx
   items = { items }; // Each item should have unique `id`
   ```

3. **Avoid inline functions in renderItem:**

   ```tsx
   // ❌ Bad - creates new function each render
   renderItem={(item) => <Card item={item} />}

   // ✅ Good - stable reference
   const renderItem = useCallback((item) => <Card item={item} />, []);
   ```

4. **Set appropriate `overscan`:**
   ```tsx
   overscan={2}  // Default, good for most cases
   overscan={1}  // Less pre-rendering, lower memory
   overscan={3}  // More pre-rendering, smoother scroll
   ```

## TypeScript

```tsx
interface MyItem {
  id: number;
  title: string;
  imageUrl: string;
}

<Masonry<MyItem>
  items={items}
  renderItem={(item) => (
    <div>
      <img src={item.imageUrl} alt={item.title} />
      <h3>{item.title}</h3>
    </div>
  )}
/>;
```

## Related Components

- `Masonry.Item` - Individual item wrapper (declarative mode)
- `Masonry.Root` - Low-level root component
