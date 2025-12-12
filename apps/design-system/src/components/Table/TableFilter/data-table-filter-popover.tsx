"use client";

import type { Column } from "@tanstack/react-table";
import { X } from "lucide-react";
import * as React from "react";

import { Popover } from "../../Popover";
import { Input } from "../../Input";
import { Checkbox } from "../../Checkbox";
import Radio from "../../Radio";
import { DataTableSliderFilter } from "./data-table-slider-filter";
import { DataTableDateFilter } from "./data-table-date-filter";
import Separator from "@/components/Separator";
import Button from "@/components/Button";

interface DataTableFilterPopoverProps<TData> {
  column: Column<TData>;
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function DataTableFilterPopover<TData>({
  column,
  trigger,
  open,
  onOpenChange,
}: DataTableFilterPopoverProps<TData>) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const columnMeta = column.columnDef.meta;

  const renderFilterContent = () => {
    if (!columnMeta?.variant) return <div>No filter available</div>;

    switch (columnMeta.variant) {
      case "text":
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

      case "number":
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

      case "date":
      case "dateRange":
        return (
          <DataTableDateFilter
            column={column}
            title={columnMeta.label ?? column.id}
            multiple={columnMeta.variant === "dateRange"}
          />
        );

      case "range":
        return (
          <DataTableSliderFilter
            column={column}
            title={columnMeta.label ?? column.id}
          />
        );

      case "select":
      case "multiSelect": {
        const options = columnMeta.options || [];
        const multiple = columnMeta.variant === "multiSelect";

        if (multiple) {
          const currentValues = (column.getFilterValue() as string[]) || [];
          return (
            <>
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
              {/* <Separator className="my-2" /> */}
              {/* <div className="flex justify-center gap-0 mt-2">
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.setFilterValue(options.map((o) => o.value))
                  }
                >
                  Check All
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => column.setFilterValue(undefined)}
                >
                  <X className="size-3" />
                  Clear Filter
                </Button>
              </div> */}
            </>
          );
        } else {
          const currentValue = column.getFilterValue() as string;
          return (
            <Radio
              value={currentValue}
              onValueChange={(value) => column.setFilterValue(value)}
              options={options.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
              className="p-1"
            />
          );
        }
      }

      default:
        return <div>No filter available</div>;
    }
  };

  const hasFilterValue = column.getFilterValue() != null;

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={trigger}
      content={
        <div className="p-2 min-w-32">
          {renderFilterContent()}
          {hasFilterValue && (
            <>
              <Separator className="mt-3 mb-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => column.setFilterValue(undefined)}
              >
                <X className="size-3" />
                Clear Filter
              </Button>
            </>
          )}
        </div>
      }
      contentClassName="p-0"
    />
  );
}
