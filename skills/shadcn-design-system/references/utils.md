# Utilities Reference
## @sth87/shadcn-design-system

All utilities are named exports from the package root:
```tsx
import { cn, animationClass, animationEffect, formatDate, dataTableConfig, ... } from "@sth87/shadcn-design-system";
```

---

## `cn` — Class Name Merging

Re-exported from `@dsui/ui`. Combines `clsx` and `tailwind-merge` to safely merge Tailwind classes without conflicts.

```tsx
import { cn } from "@sth87/shadcn-design-system";

// Merge conditional classes
const cls = cn("px-4 py-2 rounded", isActive && "bg-primary text-white", className);

// Resolve Tailwind conflicts (last one wins)
cn("text-red-500", "text-blue-500")  // → "text-blue-500"
cn("p-4", "px-8")                    // → "p-4 px-8" ← twMerge keeps both (different axes)
cn("p-4", "p-8")                     // → "p-8"      ← conflict resolved

// Arrays and objects
cn(["flex items-center", { "gap-2": hasItems }], additionalClass)
```

---

## `animationClass` — CSS Animation Mapper

Maps a `BasicAnimation` string to the corresponding Tailwind `animate-*` class string. Used internally by components and available for custom wrappers.

```tsx
import { animationClass } from "@sth87/shadcn-design-system";

// Returns a CSS class string
animationClass("heartbeat")              // → "animate-[heartbeat]"
animationClass("slide-in-from-bottom")   // → "animate-[slide-in-from-bottom]"
animationClass("rainbow")                // → "animate-[rainbow]"

// With additional classes
animationClass("bounce", "my-button")    // → "animate-[bounce] my-button"

// Use in custom components
function AnimatedBox({ animation, className, children }) {
  return (
    <div className={cn(animationClass(animation), className)}>
      {children}
    </div>
  );
}
```

---

## `animationEffect` — Motion Animation Descriptor

Returns a descriptor object `{ className?, style?, children?, variant? }` for complex animations that require Framer Motion (`motion/react`) wrappers or special DOM structure (e.g., shine overlay, liquid ripple, glass filter). Used internally by `Button`, `Badge`, `Switch`, etc.

```tsx
import { animationEffect } from "@sth87/shadcn-design-system";

const result = animationEffect({
  animation: "shine",
  children: <span>Label</span>,
  className: "relative overflow-hidden",
  variantType?: "button" | "badge" | "switch",
});

// result.className  — classes to add to the element
// result.style      — inline styles (if needed)
// result.children   — potentially wrapped children (e.g., adds shine overlay)
// result.variant    — motion variant preset (if animation uses Framer Motion)

// Example: wrapping a custom component
function MyAnimatedButton({ animation, children, className }) {
  const { className: animCls, children: wrappedChildren } = animationEffect({
    animation,
    children,
    className,
  });
  return <button className={cn(animCls)}>{wrappedChildren}</button>;
}
```

**Available animations via `animationEffect`:**
- `"shine"` — sweeping highlight overlay on hover
- `"rainbow"` — background-position gradient sweep
- `"heartbeat"` — box-shadow + scale pulse loop
- `"bounce"` — spring bounce via Framer Motion
- `"tap"` — scale down on press
- `"glass"` — wraps in `<Glass>` frosted distortion filter
- `"glow"` — neon glow background animation
- `"liquid"` — ripple/liquid background on click
- `"pulse"` — opacity pulse loop
- `"gradient-outline"` — animated gradient border

---

## `formatDate`

Wraps `Intl.DateTimeFormat` with sensible defaults (long month, numeric day/year in the system locale).

```tsx
import { formatDate } from "@sth87/shadcn-design-system";

// Default format
formatDate(new Date())                          // → "March 11, 2026"
formatDate(new Date("2026-01-01"))              // → "January 1, 2026"

// Custom Intl.DateTimeFormatOptions
formatDate(new Date(), { month: "short", day: "numeric" })       // → "Mar 11"
formatDate(new Date(), { year: "numeric", month: "2-digit", day: "2-digit" }) // → "03/11/2026"

// With locale
formatDate(new Date(), { month: "long", day: "numeric" }, "vi-VN") // → "11 tháng 3 năm 2026"
```

---

## DataTable Utilities

### `getCommonPinningStyles`

Computes `React.CSSProperties` for sticky (pinned) columns in TanStack Table. Handles `position`, `left`/`right`, `z-index`, and `box-shadow`.

```tsx
import { getCommonPinningStyles } from "@sth87/shadcn-design-system";
import type { Column } from "@tanstack/react-table";

// Use inside a cell or header renderer
function MyCell({ column }: { column: Column<any> }) {
  const style = getCommonPinningStyles({ column });
  // style → { position: "sticky", left: "0px", zIndex: 1, boxShadow: "..." } or {}

  return <td style={style}>...</td>;
}

// With visible shadow separator
const style = getCommonPinningStyles({ column, withBorder: true });
```

### `getFilterOperators`

Returns the array of valid filter operators for a given filter variant.

```tsx
import { getFilterOperators } from "@sth87/shadcn-design-system";

getFilterOperators("text")        // ["iLike", "notILike", "eq", "ne", "isEmpty", "isNotEmpty"]
getFilterOperators("numeric")     // ["eq", "ne", "lt", "lte", "gt", "gte", "isBetween", "isEmpty", "isNotEmpty"]
getFilterOperators("date")        // [...numeric ops + "isRelativeToToday"]
getFilterOperators("dateRange")   // ["isBetween", "isEmpty", "isNotEmpty"]
getFilterOperators("select")      // ["eq", "ne", "isEmpty", "isNotEmpty"]
getFilterOperators("multiSelect") // ["inArray", "notInArray", "isEmpty", "isNotEmpty"]
getFilterOperators("boolean")     // ["eq", "ne"]
```

### `getDefaultFilterOperator`

Returns the first/default operator for a given filter variant.

```tsx
import { getDefaultFilterOperator } from "@sth87/shadcn-design-system";

getDefaultFilterOperator("text")        // "iLike"
getDefaultFilterOperator("numeric")     // "eq"
getDefaultFilterOperator("select")      // "eq"
getDefaultFilterOperator("multiSelect") // "inArray"
```

### `getValidFilters`

Removes filter entries where the value is empty, null, or incomplete (e.g. `isBetween` with only one bound).

```tsx
import { getValidFilters } from "@sth87/shadcn-design-system";

const valid = getValidFilters(filters);
// Strips: filters where value === "" | null | undefined | []
// Strips: "isBetween" filters missing one of the bounds
```

---

## `dataTableConfig` — Filter Configuration Constants

Complete configuration object for all DataTable filter variants and operators.

```tsx
import { dataTableConfig } from "@sth87/shadcn-design-system";

dataTableConfig.textOperators
// ["iLike", "notILike", "eq", "ne", "isEmpty", "isNotEmpty"]

dataTableConfig.numericOperators
// ["eq", "ne", "lt", "lte", "gt", "gte", "isBetween", "isEmpty", "isNotEmpty"]

dataTableConfig.dateOperators
// ["eq", "ne", "lt", "lte", "gt", "gte", "isBetween", "isEmpty", "isNotEmpty", "isRelativeToToday"]

dataTableConfig.selectOperators
// ["eq", "ne", "isEmpty", "isNotEmpty"]

dataTableConfig.multiSelectOperators
// ["inArray", "notInArray", "isEmpty", "isNotEmpty"]

dataTableConfig.booleanOperators
// ["eq", "ne"]

dataTableConfig.filterVariants
// ["text", "number", "range", "date", "dateRange", "boolean", "select", "multiSelect"]

dataTableConfig.sortOrders
// ["asc", "desc"]

dataTableConfig.joinOperators
// ["and", "or"]

// Full operators union
dataTableConfig.operators
// all operator strings combined
```

**Operator semantics:**

| Operator | Meaning |
|---|---|
| `iLike` | Case-insensitive LIKE (contains) |
| `notILike` | Does NOT contain (case-insensitive) |
| `eq` | Equal to |
| `ne` | Not equal to |
| `lt` | Less than |
| `lte` | Less than or equal |
| `gt` | Greater than |
| `gte` | Greater than or equal |
| `isBetween` | Between two values (inclusive) |
| `isEmpty` | Value is null/empty |
| `isNotEmpty` | Value is not null/empty |
| `inArray` | Value is in selected set |
| `notInArray` | Value is NOT in selected set |
| `isRelativeToToday` | Date is relative to today (today, yesterday, last 7 days, etc.) |

---

## URL State Parsers (nuqs)

Used with `useDataTable` when `syncWithUrl: true`. Requires `nuqs` in your app.

```bash
npm install nuqs
```

```tsx
import { getSortingStateParser, getFiltersStateParser } from "@sth87/shadcn-design-system";
import { parseAsString, useQueryState } from "nuqs";

// Create a nuqs parser for TanStack Table sorting state
// Serializes to: ?sort=[{"id":"name","desc":false}]
const sortParser = getSortingStateParser();                       // all columns
const sortParser = getSortingStateParser(["name", "createdAt"]); // whitelist columns

// Create a nuqs parser for extended column filter state
// Serializes to: ?filters=[{"id":"status","value":"active","operator":"eq"}]
const filterParser = getFiltersStateParser();
const filterParser = getFiltersStateParser(["name", "status", "role"]);

// Direct usage with nuqs
const [sorting, setSorting] = useQueryState("sort", getSortingStateParser(["name", "createdAt"]));
const [filters, setFilters] = useQueryState("filters", getFiltersStateParser(["status"]));
```

**NuqsAdapter setup (required for URL state):**
```tsx
// Next.js (App Router)
import { NuqsAdapter } from "nuqs/adapters/next/app";
// layout.tsx
export default function RootLayout({ children }) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}

// Next.js (Pages Router)
import { NuqsAdapter } from "nuqs/adapters/next/pages";

// Vite / React Router
import { NuqsAdapter } from "nuqs/adapters/react-router/v6";
```
