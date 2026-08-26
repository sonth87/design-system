import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import type * as React from "react";

import { DataTablePagination } from "./data-table-pagination";
import { cn } from "@dsui/ui/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dsui/ui/components/table";
import { getCommonPinningStyles } from "@/utils/data-table";
import { DataTableColumnHeader } from "./data-table-column-header";

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
  bordered?: boolean;
  loading?: boolean;
  footer?: (currentPageData: TData[]) => React.ReactNode;
}

export function DataTable<TData>({
  table,
  actionBar,
  children,
  className,
  pagination = true,
  sticky = true,
  bordered,
  loading,
  footer,
  ...props
}: DataTableProps<TData>) {
  const stickyConfig = sticky
    ? {
        offsetHeader:
          typeof sticky === "object" ? (sticky.offsetHeader ?? 0) : 0,
        offsetScroll: typeof sticky === "object" ? sticky.offsetScroll : undefined,
      }
    : null;

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
        <div className="ds:absolute ds:inset-0 ds:bg-background/50 ds:flex ds:items-center ds:justify-center ds:z-20">
          Loading...
        </div>
      )}
      <Table
        containerClassName={cn(
          "ds:rounded-md ds:border ds:border-border",
          // Thin, unobtrusive scrollbar that darkens only when hovering the thumb itself
          "ds:[scrollbar-width:thin] ds:[scrollbar-color:var(--border)_transparent]",
          "ds:[&::-webkit-scrollbar]:h-1.5 ds:[&::-webkit-scrollbar]:w-1.5",
          "ds:[&::-webkit-scrollbar-track]:bg-transparent",
          "ds:[&::-webkit-scrollbar-thumb]:rounded-full ds:[&::-webkit-scrollbar-thumb]:bg-border",
          "ds:[&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground",
          loading && "ds:blur-sm"
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
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
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
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      ...getCommonPinningStyles({
                        column: cell.column,
                        withBorder: true,
                      }),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="ds:h-24 ds:text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {footer && (
          <tfoot>
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length}>
                {footer(table.getRowModel().rows.map((row) => row.original))}
              </TableCell>
            </TableRow>
          </tfoot>
        )}
      </Table>
      <div className="ds:flex ds:flex-col ds:gap-2.5">
        {pagination && (
          <DataTablePagination
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
