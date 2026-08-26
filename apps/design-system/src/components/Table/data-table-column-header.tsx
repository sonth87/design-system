"use client";

import type { Column } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  EyeOff,
  Filter,
  Pin,
  PinOff,
  X,
} from "lucide-react";

import { cn } from "@dsui/ui/lib/utils";
import DropdownMenu, {
  type DropdownMenuItem,
} from "../DropdownMenu/DropdownMenu";
import { DataTableFilterPopover } from "./TableFilter/data-table-filter-popover";
import { Button } from "../Button";

export interface DataTableColumnHeaderProps<TData, TValue> {
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
    column.getCanSort() ||
    column.getCanHide() ||
    column.getCanFilter() ||
    column.getCanPin();

  if (!hasActions) {
    return <div className={cn(className)}>{displayLabel}</div>;
  }

  const sortTrigger = (
    <button className="ds:-ml-1.5 ds:flex ds:h-8 ds:items-center ds:gap-1.5 ds:rounded-md ds:px-2 ds:py-1.5 ds:hover:bg-accent ds:focus:outline-none ds:focus:ring-1 ds:focus:ring-ring ds:data-[state=open]:bg-accent ds:[&_svg]:size-4 ds:[&_svg]:shrink-0 ds:[&_svg]:text-muted-foreground">
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
              "ds:hover:bg-accent ds:rounded ds:p-1",
              column.getFilterValue() ? "ds:text-primary" : ""
            )}
          >
            <Filter className="ds:size-4" />
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
        "ds:relative ds:pr-8 ds:pl-2 ds:[&>span:first-child]:right-2 ds:[&>span:first-child]:left-auto ds:[&_svg]:text-muted-foreground",
    });
    items.push({
      key: "desc",
      type: "checkbox",
      label: "Desc",
      icon: <ChevronDown />,
      checked: column.getIsSorted() === "desc",
      onClick: () => column.toggleSorting(true),
      className:
        "ds:relative ds:pr-8 ds:pl-2 ds:[&>span:first-child]:right-2 ds:[&>span:first-child]:left-auto ds:[&_svg]:text-muted-foreground",
    });
    if (column.getIsSorted()) {
      items.push({
        key: "reset",
        type: "item",
        label: "Reset",
        icon: <X />,
        onClick: () => column.clearSorting(),
        className: "ds:pl-2 ds:[&_svg]:text-muted-foreground",
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
        "ds:relative ds:pr-8 ds:pl-2 ds:[&>span:first-child]:right-2 ds:[&>span:first-child]:left-auto ds:[&_svg]:text-muted-foreground",
    });
  }

  if (column.getCanPin()) {
    const isPinned = column.getIsPinned();

    if (items.length > 0) {
      items.push({ key: "pin-separator", type: "separator" });
    }

    if (isPinned !== "left") {
      items.push({
        key: "pin-left",
        type: "item",
        label: "Pin left",
        icon: <Pin />,
        onClick: () => column.pin("left"),
        className: "ds:pl-2 ds:[&_svg]:text-muted-foreground",
      });
    }
    if (isPinned !== "right") {
      items.push({
        key: "pin-right",
        type: "item",
        label: "Pin right",
        icon: <Pin />,
        onClick: () => column.pin("right"),
        className: "ds:pl-2 ds:[&_svg]:text-muted-foreground",
      });
    }
    if (isPinned) {
      items.push({
        key: "unpin",
        type: "item",
        label: "Unpin",
        icon: <PinOff />,
        onClick: () => column.pin(false),
        className: "ds:pl-2 ds:[&_svg]:text-muted-foreground",
      });
    }
  }

  return (
    <div className={cn("ds:flex ds:items-center ds:gap-1.5", className)}>
      <DropdownMenu
        trigger={sortTrigger}
        items={items}
        align="start"
        contentClassName="ds:w-36"
      />
      {filterButton}
    </div>
  );
}
