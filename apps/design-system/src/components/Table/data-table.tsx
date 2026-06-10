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
  sticky,
  bordered,
  loading,
  footer,
  ...props
}: DataTableProps<TData>) {
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
      <div
        className={cn(
          "ds:overflow-auto ds:rounded-md ds:border ds:border-border",
          loading && "ds:blur-sm"
        )}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      ...getCommonPinningStyles({ column: header.column }),
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
                        ...getCommonPinningStyles({ column: cell.column }),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
      </div>
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
