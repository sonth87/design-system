import {
  flexRender,
  type Cell,
  type Row,
  type Table as TanstackTable,
} from "@tanstack/react-table";
import { Fragment } from "react";
import type * as React from "react";

import { DataTablePagination } from "./data-table-pagination";
import { cn } from "@dsui/ui/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@dsui/ui/components/table";
import { getCommonPinningStyles } from "@/utils/data-table";
import { DataTableColumnHeader } from "./data-table-column-header";

/** Per-slot className overrides for full styling control without a prop per element. */
export interface DataTableClassNames {
  /** The scroll container wrapping the whole `<table>` (rounded corners, border, scrollbar all live here). */
  container?: string;
  /** The `<table>` element itself. */
  table?: string;
  headerRow?: string;
  headerCell?: string;
  body?: string;
  /** Static class applied to every body row; for per-row logic use `rowClassName`. */
  row?: string;
  cell?: string;
  footerRow?: string;
  footerCell?: string;
  emptyRow?: string;
  emptyCell?: string;
  loadingOverlay?: string;
}

export interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  pagination?:
    | boolean
    | Omit<React.ComponentProps<typeof DataTablePagination<TData>>, "table">;
  /**
   * Makes the table header stick to the top of its scroll container. Defaults to `true`; pass `false` to disable.
   * - `offsetHeader`: px offset from the top of the scroll container the header sticks at (e.g. below another sticky toolbar). Defaults to 0.
   * - `offsetScroll`: px to subtract from `100vh` when bounding the scroll container's height (accounts for page chrome above the table). Defaults to 0.
   */
  sticky?: boolean | { offsetHeader?: number; offsetScroll?: number };
  /**
   * Sticks the `footer` row to the bottom of the scroll container. Only relevant when `footer` is set.
   * Needs the container to actually be a bounded scroll area — in practice that means `sticky` (on by default) is also enabled.
   * Defaults to `false`.
   */
  stickyFooter?: boolean;
  /** Draws a border + rounded corners around the scroll container. Defaults to `true`. */
  bordered?: boolean;
  loading?: boolean;
  /** Replaces the default "Loading..." content shown while `loading` is true. */
  loadingIndicator?: React.ReactNode;
  footer?: (currentPageData: TData[]) => React.ReactNode;
  /** Replaces the default "No results." row shown when there's no data. */
  emptyState?: React.ReactNode;
  /** Called when a body row is clicked. */
  onRowClick?: (
    row: Row<TData>,
    event: React.MouseEvent<HTMLTableRowElement>
  ) => void;
  /** Extra class(es) for every body row. Pass a function for per-row logic (e.g. striping, disabled rows). */
  rowClassName?: string | ((row: Row<TData>) => string | undefined);
  /** Wraps/replaces the default rendering of a body row. Receives the already-built default `<TableRow>` as `children`. */
  renderRow?: (row: Row<TData>, children: React.ReactNode) => React.ReactNode;
  /** Wraps/replaces the default rendering of a body cell. Receives the already-built default `<TableCell>` as `children`. */
  renderCell?: (
    cell: Cell<TData, unknown>,
    children: React.ReactNode
  ) => React.ReactNode;
  /** Per-slot className overrides (header/body/footer/empty/loading). */
  classNames?: DataTableClassNames;
  /** Shorthand for `pagination.showTotalCount` — shown by default, this only needs to be set to override it. */
  showTotalCount?: boolean;
  /** Shorthand for `pagination.totalCount` (grand, unfiltered dataset total). Overridden by `pagination.totalCount` if that's also set. */
  totalCount?: number;
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  className,
  pagination = true,
  sticky = true,
  stickyFooter = false,
  bordered = true,
  loading,
  loadingIndicator,
  footer,
  emptyState,
  onRowClick,
  rowClassName,
  renderRow,
  renderCell,
  classNames,
  showTotalCount = true,
  totalCount,
  ...props
}: DataTableProps<TData>) {
  const stickyConfig = sticky
    ? {
        offsetHeader:
          typeof sticky === "object" ? (sticky.offsetHeader ?? 0) : 0,
        offsetScroll:
          typeof sticky === "object" ? sticky.offsetScroll : undefined,
      }
    : null;

  const visibleColumnCount = table.getVisibleLeafColumns().length;

  return (
    <div
      className={cn(
        "ds:flex ds:w-full ds:flex-col ds:gap-2.5 ds:relative",
        className
      )}
      {...props}
    >
      {children}
      {loading && (
        <div
          className={cn(
            "ds:absolute ds:inset-0 ds:bg-background/50 ds:flex ds:items-center ds:justify-center ds:z-20",
            classNames?.loadingOverlay
          )}
        >
          {loadingIndicator ?? "Loading..."}
        </div>
      )}
      <Table
        className={classNames?.table}
        containerClassName={cn(
          bordered && "ds:rounded-md ds:border ds:border-border",
          // Thin, unobtrusive scrollbar that darkens only when hovering the thumb itself
          "ds:[scrollbar-width:thin] ds:[scrollbar-color:var(--border)_transparent]",
          "ds:[&::-webkit-scrollbar]:h-1.5 ds:[&::-webkit-scrollbar]:w-1.5",
          "ds:[&::-webkit-scrollbar-track]:bg-transparent",
          "ds:[&::-webkit-scrollbar-thumb]:rounded-full ds:[&::-webkit-scrollbar-thumb]:bg-border",
          "ds:[&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground",
          loading && "ds:blur-sm",
          classNames?.container
        )}
        containerStyle={
          stickyConfig
            ? {
                maxHeight: `calc(100vh - ${stickyConfig.offsetScroll ?? 0}px)`,
              }
            : undefined
        }
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={classNames?.headerRow}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={cn(
                    classNames?.headerCell,
                    header.column.getIsPinned() && "ds:bg-background"
                  )}
                  style={{
                    ...getCommonPinningStyles({
                      column: header.column,
                      withBorder: true,
                    }),
                    ...(stickyConfig && {
                      position: "sticky" as const,
                      top: stickyConfig.offsetHeader,
                      zIndex: header.column.getIsPinned() ? 3 : 2,
                      background: "var(--background)",
                    }),
                  }}
                >
                  {header.isPlaceholder ? null : header.column.columnDef
                      .header ? (
                    typeof header.column.columnDef.header === "function" ? (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    ) : (
                      <DataTableColumnHeader column={header.column} />
                    )
                  ) : null}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={classNames?.body}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const resolvedRowClassName =
                typeof rowClassName === "function"
                  ? rowClassName(row)
                  : rowClassName;

              const rowNode = (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    classNames?.row,
                    resolvedRowClassName,
                    onRowClick && "ds:cursor-pointer"
                  )}
                  onClick={
                    onRowClick ? (event) => onRowClick(row, event) : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellNode = (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          classNames?.cell,
                          // Static background on purpose — see the comment on
                          // getCommonPinningStyles for why pinned cells must
                          // not change color on hover/select.
                          cell.column.getIsPinned() && "ds:bg-background"
                        )}
                        style={{
                          ...getCommonPinningStyles({
                            column: cell.column,
                            withBorder: true,
                          }),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );

                    return renderCell ? (
                      <Fragment key={cell.id}>
                        {renderCell(cell, cellNode)}
                      </Fragment>
                    ) : (
                      cellNode
                    );
                  })}
                </TableRow>
              );

              return renderRow ? (
                <Fragment key={row.id}>{renderRow(row, rowNode)}</Fragment>
              ) : (
                rowNode
              );
            })
          ) : (
            <TableRow className={classNames?.emptyRow}>
              <TableCell
                colSpan={visibleColumnCount}
                className={cn("ds:h-24 ds:text-center", classNames?.emptyCell)}
              >
                {emptyState ?? "No results."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {footer && (
          <TableFooter>
            <TableRow className={classNames?.footerRow}>
              <TableCell
                colSpan={visibleColumnCount}
                className={classNames?.footerCell}
                style={
                  stickyFooter
                    ? {
                        position: "sticky",
                        bottom: 0,
                        zIndex: 2,
                      }
                    : undefined
                }
              >
                {footer(table.getRowModel().rows.map((row) => row.original))}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
      <div className="ds:flex ds:flex-col ds:gap-2.5">
        {pagination && (
          <DataTablePagination
            showTotalCount={showTotalCount}
            totalCount={totalCount}
            showPageSizeOptions={true}
            showRowSelectionCount={true}
            className="ds:mt-2.5"
            table={table}
            {...(pagination === true ? {} : pagination)}
          />
        )}
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}
