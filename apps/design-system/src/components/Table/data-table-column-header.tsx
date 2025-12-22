"use client";

import type { Column } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  EyeOff,
  Filter,
  X,
} from "lucide-react";

import { cn } from "@dsui/ui";
import DropdownMenu, {
  type DropdownMenuItem,
} from "../DropdownMenu/DropdownMenu";
import { DataTableFilterPopover } from "./TableFilter/data-table-filter-popover";
import { Button } from "../Button";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  label?: string;
  className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  label,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const displayLabel =
    label ||
    (typeof column.columnDef.header === "string"
      ? column.columnDef.header
      : null);

  const hasActions =
    column.getCanSort() || column.getCanHide() || column.getCanFilter();

  if (!hasActions) {
    return <div className={cn(className)}>{displayLabel}</div>;
  }

  const sortTrigger = (
    <button className="-ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring data-[state=open]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
      {displayLabel}
      {column.getCanSort() &&
        (column.getIsSorted() === "desc" ? (
          <ChevronDown />
        ) : column.getIsSorted() === "asc" ? (
          <ChevronUp />
        ) : (
          <ChevronsUpDown />
        ))}
    </button>
  );

  const filterButton =
    column.getCanFilter() && column.columnDef.meta?.variant ? (
      <DataTableFilterPopover
        column={column}
        trigger={
          <Button
            variant="ghost"
            className={cn(
              "hover:bg-accent rounded p-1",
              column.getFilterValue() ? "text-primary" : ""
            )}
          >
            <Filter className="size-4" />
          </Button>
        }
      />
    ) : null;

  const items: DropdownMenuItem[] = [];

  if (column.getCanSort()) {
    items.push({
      key: "asc",
      type: "checkbox",
      label: "Asc",
      icon: <ChevronUp />,
      checked: column.getIsSorted() === "asc",
      onClick: () => column.toggleSorting(false),
      className:
        "relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground",
    });
    items.push({
      key: "desc",
      type: "checkbox",
      label: "Desc",
      icon: <ChevronDown />,
      checked: column.getIsSorted() === "desc",
      onClick: () => column.toggleSorting(true),
      className:
        "relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground",
    });
    if (column.getIsSorted()) {
      items.push({
        key: "reset",
        type: "item",
        label: "Reset",
        icon: <X />,
        onClick: () => column.clearSorting(),
        className: "pl-2 [&_svg]:text-muted-foreground",
      });
    }
  }

  if (column.getCanHide()) {
    items.push({
      key: "hide",
      type: "checkbox",
      label: "Hide",
      icon: <EyeOff />,
      checked: !column.getIsVisible(),
      onClick: () => column.toggleVisibility(false),
      className:
        "relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground",
    });
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <DropdownMenu
        trigger={sortTrigger}
        items={items}
        align="start"
        contentClassName="w-28"
      />
      {filterButton}
    </div>
  );
}
