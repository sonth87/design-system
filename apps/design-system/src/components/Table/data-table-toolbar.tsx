"use client";

import type { Column, Table } from "@tanstack/react-table";
import { PlusCircle, X, XCircle } from "lucide-react";
import * as React from "react";

import { DataTableFilterPopover } from "./TableFilter/data-table-filter-popover";
import { DataTableViewOptions } from "./data-table-view-options";
import { Button } from "../Button";
import { cn } from "@dsui/ui";

interface DataTableToolbarProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  showColumnFilters?: boolean;
  showColumnVisibilityToggle?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  showColumnFilters = false,
  showColumnVisibilityToggle = false,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const onReset = React.useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-start justify-between gap-2 p-1",
        className
      )}
      {...props}
    >
      {showColumnFilters ? (
        <div className="flex flex-1 flex-wrap items-center justify-start gap-2">
          {columns.map((column) => (
            <DataTableToolbarFilter key={column.id} column={column} />
          ))}
          {isFiltered && (
            <Button
              aria-label="Reset filters"
              variant="outline"
              size="sm"
              className="border-dashed"
              onClick={onReset}
            >
              <X />
              Reset
            </Button>
          )}
        </div>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-2">
        {children}
        {showColumnVisibilityToggle && (
          <DataTableViewOptions table={table} align="end" />
        )}
      </div>
    </div>
  );
}
interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>;
}

function DataTableToolbarFilter<TData>({
  column,
}: DataTableToolbarFilterProps<TData>) {
  const columnMeta = column.columnDef.meta;

  if (!columnMeta?.variant) return null;

  const hasFilterValue = column.getFilterValue() != null;
  const icon = hasFilterValue ? <XCircle /> : <PlusCircle />;

  const getTriggerLabel = () => {
    return columnMeta.label ?? column.id;
  };

  return (
    <DataTableFilterPopover
      column={column}
      trigger={
        <Button variant="outline" size="sm" className="border-dashed">
          {icon}
          {getTriggerLabel()}
        </Button>
      }
    />
  );
}
