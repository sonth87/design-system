# Hooks Reference
## @sth87/shadcn-design-system

All hooks are named exports from the package root:
```tsx
import { useCallbackRef, useDebouncedCallback, useDataTable, ... } from "@sth87/shadcn-design-system";
```

---

## `useCallbackRef`

Returns a stable function reference that always delegates to the latest callback. Prevents stale closures without needing to add the callback to effect dependency arrays.

```tsx
import { useCallbackRef } from "@sth87/shadcn-design-system";

function Component({ onSelect }: { onSelect: (id: string) => void }) {
  // stableHandler has a stable identity but always calls the current onSelect
  const stableHandler = useCallbackRef(onSelect);

  useEffect(() => {
    // Safe to use stableHandler without listing onSelect as dependency
    const cleanup = subscribe(stableHandler);
    return cleanup;
  }, [stableHandler]);
}
```

---

## `useDebouncedCallback`

Debounces a callback by `delay` ms. The returned function has a stable identity.

```tsx
import { useDebouncedCallback } from "@sth87/shadcn-design-system";

function SearchInput() {
  const debouncedSearch = useDebouncedCallback((query: string) => {
    fetchResults(query);
  }, 400);

  return <Input onChange={(e) => debouncedSearch(e.target.value)} placeholder="Search…" />;
}

// Cancel pending invocation
const debouncedFn = useDebouncedCallback(fn, 300);
debouncedFn.cancel();
```

---

## `useDebounceValue`

Debounces a state value. Returns `[debouncedValue, updater]`. The `debouncedValue` only updates after the delay has elapsed since the last `updater` call.

```tsx
import { useDebounceValue } from "@sth87/shadcn-design-system";

function SearchPage() {
  const [debouncedQuery, setQuery] = useDebounceValue("", 400);

  // Only fires when user stops typing for 400ms
  useEffect(() => {
    if (debouncedQuery) search(debouncedQuery);
  }, [debouncedQuery]);

  return <Input onChange={(e) => setQuery(e.target.value)} placeholder="Search…" />;
}
```

---

## `useEventListener`

Type-safe event listener with automatic cleanup. Supports `Window`, `Document`, `HTMLElement`, and `MediaQueryList` targets.

```tsx
import { useEventListener } from "@sth87/shadcn-design-system";

// Global window event
useEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Escape") closeModal();
});

// On a specific element via ref
const buttonRef = useRef<HTMLButtonElement>(null);
useEventListener("click", handleClick, buttonRef);

// On document
useEventListener("visibilitychange", () => {
  if (document.hidden) pauseVideo();
}, document);

// With options
useEventListener("scroll", handleScroll, window, { passive: true });
useEventListener("click", handleOnce, window, { once: true, capture: true });
```

---

## `useIntersectionObserver`

Reactive IntersectionObserver hook. Returns `[ref, isIntersecting, entry]`.

```tsx
import { useIntersectionObserver } from "@sth87/shadcn-design-system";

// Lazy-load content
function LazySection() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true, // stop observing after first intersection
  });

  return (
    <section ref={ref} className={cn("transition-opacity duration-700", isVisible ? "opacity-100" : "opacity-0")}>
      {isVisible ? <HeavyContent /> : <Skeleton className="h-64 w-full" />}
    </section>
  );
}

// With callback
const [ref, isVisible, entry] = useIntersectionObserver({
  threshold: 0.5,
  onChange: (isIntersecting, entry) => {
    if (isIntersecting) trackImpression(entry.target.id);
  },
});

// Infinite scroll trigger
const [loadMoreRef, shouldLoadMore] = useIntersectionObserver({ threshold: 0 });
useEffect(() => {
  if (shouldLoadMore && hasNextPage) fetchNextPage();
}, [shouldLoadMore]);
```

---

## `useIsomorphicLayoutEffect`

`useLayoutEffect` on the client, `useEffect` on the server. Use this instead of `useLayoutEffect` in SSR/Next.js environments to avoid hydration warnings.

```tsx
import { useIsomorphicLayoutEffect } from "@sth87/shadcn-design-system";

function Tooltip({ children }) {
  const ref = useRef<HTMLDivElement>(null);

  // Safe in SSR — won't throw "useLayoutEffect does nothing on server" warning
  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      const bounds = ref.current.getBoundingClientRect();
      setPosition(bounds);
    }
  }, []);

  return <div ref={ref}>{children}</div>;
}
```

---

## `useMediaQuery`

Reactive CSS media query matcher. Returns `true` when the query matches.

```tsx
import { useMediaQuery } from "@sth87/shadcn-design-system";

function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (isMobile) return <MobileView />;
  return <DesktopView />;
}
```

---

## `useMousePosition`

Tracks global mouse coordinates and position relative to a ref element.

```tsx
import { useMousePosition } from "@sth87/shadcn-design-system";

function ParallaxCard() {
  const [position, ref] = useMousePosition<HTMLDivElement>();
  // position.x, position.y           — viewport-relative coordinates
  // position.elementX, position.elementY — coordinates relative to ref element

  const rotateX = ((position.elementY ?? 0) / 300) * 20 - 10;
  const rotateY = ((position.elementX ?? 0) / 400) * 20 - 10;

  return (
    <div
      ref={ref}
      style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
      className="w-64 h-40 bg-card rounded-xl"
    >
      Card content
    </div>
  );
}

// Global cursor tracker
function CursorDot() {
  const [{ x, y }] = useMousePosition();
  return (
    <div
      className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    />
  );
}
```

---

## `useOnClickOutside`

Fires a handler when a click occurs outside of one or multiple ref elements. Useful for closing dropdowns, modals, and popovers.

```tsx
import { useOnClickOutside } from "@sth87/shadcn-design-system";

// Single ref
function Dropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref}>
      <Button onClick={() => setOpen(true)}>Open</Button>
      {open && <DropdownPanel />}
    </div>
  );
}

// Multiple refs (click outside ALL of them to trigger)
function ComboWidget() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([triggerRef, panelRef], () => setOpen(false));

  return (
    <>
      <button ref={triggerRef}>Trigger</button>
      <div ref={panelRef}>Panel</div>
    </>
  );
}

// Custom event type
useOnClickOutside(ref, handler, "mousedown");
useOnClickOutside(ref, handler, "touchstart");
```

---

## `useScript`

Dynamically injects an external `<script>` tag and tracks load status. Caches results so the same script is never loaded twice.

```tsx
import { useScript } from "@sth87/shadcn-design-system";
// Returns: "idle" | "loading" | "ready" | "error"

// Load Google Maps
function MapComponent() {
  const status = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`,
    { removeOnUnmount: false }
  );

  if (status === "loading") return <Skeleton className="h-64 w-full" />;
  if (status === "error") return <p>Failed to load maps.</p>;
  if (status === "ready") {
    return <GoogleMap />;
  }
  return null;
}

// With id attribute
const status = useScript("https://cdn.example.com/widget.js", {
  id: "my-widget-script",
  removeOnUnmount: true,
  onReady: () => window.Widget?.init(),
});
```

---

## `useScrollLock`

Locks body (or a specific element) scroll. Compensates for scrollbar width to prevent layout shift.

```tsx
import { useScrollLock } from "@sth87/shadcn-design-system";

// Auto-lock: lock immediately when component mounts
function Modal() {
  const { isLocked, unlock } = useScrollLock({ autoLock: true });

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="bg-background rounded-xl p-6">
        <p>Scroll is locked</p>
        <Button onClick={unlock}>Close</Button>
      </div>
    </div>
  );
}

// Manual control
function App() {
  const { isLocked, lock, unlock } = useScrollLock({ autoLock: false });

  return (
    <>
      <Button onClick={lock}>Open Modal</Button>
      <Button onClick={unlock} disabled={!isLocked}>Close Modal</Button>
      <p>Locked: {String(isLocked)}</p>
    </>
  );
}

// Lock a specific element instead of body
const containerRef = useRef<HTMLDivElement>(null);
const { lock } = useScrollLock({
  autoLock: false,
  lockTarget: containerRef.current,
});
```

---

## `useDataTable`

Creates a fully-configured TanStack Table v8 instance with optional URL state synchronization via `nuqs`. The most comprehensive integration hook.

```tsx
import { useDataTable } from "@sth87/shadcn-design-system";
import type { ColumnDef } from "@tanstack/react-table";

// Signature
function useDataTable<TData>(props: {
  data: TData[];                    // row data array
  columns: ColumnDef<TData>[];      // TanStack column definitions
  pageCount?: number;               // total pages (for server-side pagination)
  initialState?: Partial<TableState>;
  enableSorting?: boolean;          // default true
  enableFiltering?: boolean;        // default false
  enableColumnVisibility?: boolean; // default false
  enableRowSelection?: boolean;     // default false
  enablePagination?: boolean;       // default true
  syncWithUrl?: boolean;            // serialize state to URL params via nuqs
  defaultPerPage?: number;          // default 10
  defaultSort?: { id: string; desc: boolean }[];
}): Table<TData>;
```

**Basic usage:**
```tsx
function UsersTable({ data }: { data: User[] }) {
  const columns: ColumnDef<User>[] = [
    { accessorKey: "name", header: ({ column }) => <DataTableColumnHeader column={column} title="Name" /> },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu
          trigger={<Button size="icon" variant="ghost"><MoreHorizontal /></Button>}
          items={[
            { type: "item", label: "Edit", onClick: () => editUser(row.original.id) },
            { type: "item", label: "Delete", onClick: () => deleteUser(row.original.id) },
          ]}
        />
      ),
    },
  ];

  const table = useDataTable({ data, columns });

  return <DataTable table={table} pagination sticky loading={isLoading} />;
}
```

**Server-side with URL state:**
```tsx
// Requires: npm install nuqs
// Wrap app in <NuqsAdapter> from nuqs

function UsersPage() {
  // pageCount comes from server (totalItems / perPage)
  const { data, pageCount, isLoading } = useUsersQuery();

  const table = useDataTable({
    data: data ?? [],
    columns,
    pageCount,
    syncWithUrl: true,             // sort/filter/page reflected in URL ?sort=...&filter=...
    defaultPerPage: 20,
    defaultSort: [{ id: "createdAt", desc: true }],
    enableSorting: true,
    enableFiltering: true,
    enableColumnVisibility: true,
    enableRowSelection: true,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table}>
        <TableFilter table={table} column="role" title="Role" options={roleOptions} />
        <TableFilter table={table} column="status" title="Status" options={statusOptions} />
        <DataTableViewOptions table={table} />
      </DataTableToolbar>
      <DataTable table={table} pagination={{ pageSizeOptions: [10, 20, 50] }} sticky bordered loading={isLoading} />
    </div>
  );
}
```
