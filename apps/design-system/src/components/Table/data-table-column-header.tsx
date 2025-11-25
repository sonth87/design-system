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
import { Popover } from "../Popover";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";
import React from "react";

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

  const [filterOpen, setFilterOpen] = React.useState(false);

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
      <Popover
        open={filterOpen}
        onOpenChange={setFilterOpen}
        trigger={
          <button
            className={cn(
              "hover:bg-accent rounded p-1",
              column.getFilterValue() ? "text-primary" : ""
            )}
            onClick={(e) => {
              e.stopPropagation();
              setFilterOpen(!filterOpen);
            }}
          >
            <Filter className="size-4" />
          </button>
        }
        content={
          <div className="p-2 min-w-36">
            {(() => {
              const columnMeta = column.columnDef.meta;
              if (columnMeta?.variant === "text") {
                return (
                  <Input
                    placeholder={columnMeta.placeholder ?? columnMeta.label}
                    value={(column.getFilterValue() as string) ?? ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      column.setFilterValue(event.target.value)
                    }
                    className="h-8 w-full"
                  />
                );
              }
              if (columnMeta?.variant === "number") {
                return (
                  <Input
                    type="number"
                    placeholder={columnMeta.placeholder ?? columnMeta.label}
                    value={(column.getFilterValue() as string) ?? ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      column.setFilterValue(event.target.value)
                    }
                    className="h-8 w-full"
                  />
                );
              }
              if (columnMeta?.variant === "date") {
                return (
                  <Input
                    type="date"
                    placeholder={columnMeta.placeholder ?? columnMeta.label}
                    value={(column.getFilterValue() as string) ?? ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      column.setFilterValue(event.target.value)
                    }
                    className="h-8 w-full"
                  />
                );
              }
              if (columnMeta?.variant === "range") {
                return (
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={
                        (column.getFilterValue() as [number, number])?.[0] ?? ""
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const current = (column.getFilterValue() as [
                          number,
                          number,
                        ]) || [0, 100];
                        column.setFilterValue([
                          Number(event.target.value),
                          current[1],
                        ]);
                      }}
                      className="h-8 w-20"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={
                        (column.getFilterValue() as [number, number])?.[1] ?? ""
                      }
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const current = (column.getFilterValue() as [
                          number,
                          number,
                        ]) || [0, 100];
                        column.setFilterValue([
                          current[0],
                          Number(event.target.value),
                        ]);
                      }}
                      className="h-8 w-20"
                    />
                  </div>
                );
              }
              if (columnMeta?.variant === "select") {
                const options = columnMeta.options || [];
                const currentValue = column.getFilterValue() as string;
                return (
                  <DropdownMenu
                    trigger={
                      <button className="flex h-8 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        {options.find((opt) => opt.value === currentValue)
                          ?.label || columnMeta.label}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                    }
                    items={options.map((option) => ({
                      key: option.value,
                      label: option.label,
                      onClick: () =>
                        column.setFilterValue(
                          option.value === currentValue
                            ? undefined
                            : option.value
                        ),
                      type: "checkbox" as const,
                      checked: currentValue === option.value,
                    }))}
                    align="start"
                    contentClassName="w-48"
                  />
                );
              }
              if (columnMeta?.variant === "multiSelect") {
                const options = columnMeta.options || [];
                const currentValues =
                  (column.getFilterValue() as string[]) || [];
                return (
                  <div className="space-y-2 max-h-48 overflow-y-auto text-sm">
                    {options.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={currentValues.includes(option.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              column.setFilterValue([
                                ...currentValues,
                                option.value,
                              ]);
                            } else {
                              column.setFilterValue(
                                currentValues.filter((v) => v !== option.value)
                              );
                            }
                          }}
                          label={option.label}
                        />
                      </div>
                    ))}
                  </div>
                );
              }
              return <div>No filter available</div>;
            })()}
            {column.getFilterValue() != null && (
              <button
                className="mt-2 w-full flex items-center justify-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded"
                onClick={() => column.setFilterValue(undefined)}
              >
                <X className="size-3" />
                Clear Filter
              </button>
            )}
          </div>
        }
        contentClassName="p-0"
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
