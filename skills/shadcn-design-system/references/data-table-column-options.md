# DataTable Column Options

Use this reference when editing DataTable column visibility, draggable column ordering, `DataTableViewOptions`, or `DataTableToolbar` column option APIs.

## Core Files

- `apps/design-system/src/components/Table/data-table-view-options.tsx`
- `apps/design-system/src/components/Table/data-table-toolbar.tsx`
- `apps/design-system/src/hooks/use-data-table.ts`
- `apps/design-system/src/stories/Table/Table.stories.tsx`

## Current Pattern

- Keep the old command/search UI as the default: `variant = "command"`.
- Enable the draggable UI only through `columnVisibilityOptions={{ variant: "draggable" }}`.
- Route toolbar customization through `columnVisibilityOptions`, passing props down to `DataTableViewOptions`.
- Manage table order through TanStack Table state:
  - `state.columnOrder`
  - `onColumnOrderChange`
  - `table.setColumnOrder(...)`
  - `table.resetColumnOrder()`

## Required `useDataTable` Support

When adding or maintaining reorder behavior, ensure `useDataTable` owns `columnOrder`:

```tsx
const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
  initialState?.columnOrder ?? []
);

const table = useReactTable({
  state: {
    ...,
    columnOrder,
  },
  onColumnOrderChange: setColumnOrder,
});
```

Without this, TanStack may update internally in some usage modes, but the design-system hook will not reliably re-render consumers with the new order.

## Draggable List Ordering

Do not render the draggable list from `table.getAllColumns()` alone. That returns the declaration order and causes the popover list to snap back after dragging.

Use a helper that merges:

- `table.getState().columnOrder`
- all leaf column IDs as fallback
- `table.getState().columnPinning`

The rendered option list must match the table's current effective order, not the original column definition order.

## Pinned Columns

Pinned columns are rendered in left/center/right regions. Reordering only `columnOrder` cannot move a pinned column like `title` into the center region.

When the user drags hideable columns in the column options UI:

- Build the new `columnOrder` from the current effective table order.
- Remove the draggable option IDs from `columnPinning.left` and `columnPinning.right`.
- Keep non-option columns such as `select` and `actions` pinned.
- Apply both updates:

```tsx
table.setColumnOrder(nextColumnOrder);
table.setColumnPinning(nextColumnPinning);
```

On reset, reset the related states together:

```tsx
table.resetColumnVisibility();
table.resetColumnOrder();
table.resetColumnPinning();
```

## Crash-Safe Guards

`DataTableViewOptions` may receive a table created outside `useDataTable`. Guard optional table state:

```tsx
const currentColumnPinning = table.getState().columnPinning;

const nextColumnPinning = {
  ...currentColumnPinning,
  left: currentColumnPinning?.left?.filter(...),
  right: currentColumnPinning?.right?.filter(...),
};

const pinning = columnPinning ?? {};
```

Also tolerate:

- Empty `columnOrder`
- Stale IDs in `columnOrder`
- No hideable/accessor columns
- Hidden columns being reordered
- Custom `trigger` or `content` passed by the consumer

## Customization API

Expose customization through `columnVisibilityOptions` on `DataTableToolbar`:

```tsx
<DataTableToolbar
  table={table}
  showColumnVisibilityToggle
  columnVisibilityOptions={{
    variant: "draggable",
    labels: {
      trigger: "Cột",
      selectAll: "Chọn tất cả",
      reset: "Khôi phục",
      searchPlaceholder: "Tìm cột...",
    },
    triggerIcon: <Columns3 className="text-muted-foreground" />,
    contentClassName: "w-80",
  }}
/>
```

`DataTableToolbarProps["columnVisibilityOptions"]` should be typed from `DataTableViewOptionsProps`, omitting only props owned by the toolbar:

```tsx
columnVisibilityOptions?: Omit<
  DataTableViewOptionsProps<TData>,
  "table" | "align"
>;
```

Use `triggerIcon` when consumers only need to replace the default `Settings2` icon while keeping the built-in trigger button. Use `trigger` when consumers need a completely custom trigger element.

## Validation

After changes, run focused checks first:

```bash
pnpm --filter @sth87/shadcn-design-system exec tsc --project tsconfig.build.json --noEmit
pnpm --filter @sth87/shadcn-design-system exec eslint src/components/Table/data-table-view-options.tsx src/components/Table/data-table-toolbar.tsx src/hooks/use-data-table.ts
```

If full repo lint fails, inspect whether the failures are pre-existing and outside the changed files before reporting.
