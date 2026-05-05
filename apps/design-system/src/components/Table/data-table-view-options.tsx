"use client";

import type { Table } from "@tanstack/react-table";
import { Check, Settings2 } from "lucide-react";
import * as React from "react";
import { Button } from "../Button";
import Command, { type CommandItemType } from "../Command/Command";
import { Popover } from "../Popover";
import { cn } from "@dsui/ui";

interface DataTableViewOptionsProps<TData>
  extends React.ComponentProps<typeof Popover> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
  ...props
}: DataTableViewOptionsProps<TData>) {
  const columns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        ),
    [table]
  );

  const items: CommandItemType[] = [
    {
      type: "group",
      heading: "",
      items: columns.map((column) => ({
        type: "item" as const,
        onClick: () => column.toggleVisibility(!column.getIsVisible()),
        children: (
          <>
            <span className="ds:truncate">
              {column.columnDef.meta?.label ??
                (typeof column.columnDef.header === "string"
                  ? column.columnDef.header
                  : column.id)}
            </span>
            <Check
              className={cn(
                "ds:ml-auto ds:size-4 ds:shrink-0",
                column.getIsVisible() ? "ds:opacity-100" : "ds:opacity-0"
              )}
            />
          </>
        ),
      })),
    },
  ];

  return (
    <Popover
      trigger={
        <Button
          aria-label="Toggle columns"
          role="combobox"
          variant="outline"
          size="sm"
          className="ds:ml-auto ds:h-8 ds:font-normal ds:lg:flex"
        >
          <Settings2 className="ds:text-muted-foreground" />
          View
        </Button>
      }
      content={<Command items={items} search="Search columns..." />}
      contentClassName="ds:w-44 ds:p-0"
      {...props}
    />
  );
}
