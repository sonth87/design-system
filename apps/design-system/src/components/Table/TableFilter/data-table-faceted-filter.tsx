"use client";

import type { Column } from "@tanstack/react-table";
import { PlusCircle, XCircle } from "lucide-react";
import * as React from "react";

import type { Option } from "@/types/data-table";
import { Popover } from "../../Popover";
import Button from "../../Button";
import Separator from "../../Separator";
import Badge from "../../Badge";
import Radio from "../../Radio";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
  multiple?: boolean;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);

  const columnFilterValue = column?.getFilterValue();
  const selectedValues = React.useMemo(
    () => new Set(Array.isArray(columnFilterValue) ? columnFilterValue : []),
    [columnFilterValue]
  );

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      column?.setFilterValue(undefined);
    },
    [column]
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      className="p-2"
      content={
        <Radio
          value={
            selectedValues.size > 0 ? Array.from(selectedValues)[0] : undefined
          }
          onValueChange={(value) => {
            if (!column) return;
            column.setFilterValue(value ? [value] : undefined);
            setOpen(false);
          }}
          className="p-1"
          options={options.map((option) => ({
            label: (
              <div className="flex justify-between w-full">
                <span className="truncate">{option.label}</span>
                {option.count && (
                  <span className="font-mono text-xs">{option.count}</span>
                )}
              </div>
            ),
            value: option.value,
          }))}
        >
          {selectedValues.size > 0 && (
            <>
              <Separator />
              <Button onClick={onReset} className="justify-center text-center">
                Clear filters
              </Button>
            </>
          )}
        </Radio>
      }
    >
      <Button variant="outline" size="sm" className="border-dashed font-normal">
        {selectedValues?.size > 0 ? (
          <div
            role="button"
            aria-label={`Clear ${title} filter`}
            tabIndex={0}
            className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onClick={onReset}
          >
            <XCircle />
          </div>
        ) : (
          <PlusCircle />
        )}
        {title}
        {selectedValues?.size > 0 && (
          <>
            <Separator
              orientation="vertical"
              className="mx-0.5 data-[orientation=vertical]:h-4"
            />
            <Badge
              color="secondary"
              className="rounded-sm px-1 font-normal lg:hidden"
            >
              {selectedValues.size}
            </Badge>
            <div className="hidden items-center gap-1 lg:flex">
              {selectedValues.size > 2 ? (
                <Badge
                  color="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedValues.size} selected
                </Badge>
              ) : (
                options
                  .filter((option) => selectedValues.has(option.value))
                  .map((option) => (
                    <Badge
                      color="secondary"
                      key={option.value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {option.label}
                    </Badge>
                  ))
              )}
            </div>
          </>
        )}
      </Button>
    </Popover>
  );
}
