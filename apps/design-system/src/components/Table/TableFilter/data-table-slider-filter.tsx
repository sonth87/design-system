"use client";

import type { Column } from "@tanstack/react-table";
import { PlusCircle, XCircle } from "lucide-react";
import * as React from "react";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Popover } from "../../Popover";
import { Separator } from "../../Separator";
import { Slider } from "../../Slider";
import { cn } from "@dsui/ui/lib/utils";

interface Range {
  min: number;
  max: number;
}

type RangeValue = [number, number];

function getIsValidRange(value: unknown): value is RangeValue {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
}

function parseValuesAsNumbers(value: unknown): RangeValue | undefined {
  if (
    Array.isArray(value) &&
    value.length === 2 &&
    value.every(
      (v) =>
        (typeof v === "string" || typeof v === "number") && !Number.isNaN(v)
    )
  ) {
    return [Number(value[0]), Number(value[1])];
  }

  return undefined;
}

export interface DataTableSliderFilterProps<TData> {
  column: Column<TData, unknown>;
  title?: string;
}

export function DataTableSliderFilter<TData>({
  column,
  title,
}: DataTableSliderFilterProps<TData>) {
  const id = React.useId();

  const columnFilterValue = parseValuesAsNumbers(column.getFilterValue());

  const defaultRange = column.columnDef.meta?.range;
  const unit = column.columnDef.meta?.unit;

  const { min, max, step } = React.useMemo<Range & { step: number }>(() => {
    let minValue = 0;
    let maxValue = 100;

    if (defaultRange && getIsValidRange(defaultRange)) {
      [minValue, maxValue] = defaultRange;
    } else {
      const values = column.getFacetedMinMaxValues();
      if (values && Array.isArray(values) && values.length === 2) {
        const [facetMinValue, facetMaxValue] = values;
        if (
          typeof facetMinValue === "number" &&
          typeof facetMaxValue === "number"
        ) {
          minValue = facetMinValue;
          maxValue = facetMaxValue;
        }
      }
    }

    const rangeSize = maxValue - minValue;
    const step =
      rangeSize <= 20
        ? 1
        : rangeSize <= 100
          ? Math.ceil(rangeSize / 20)
          : Math.ceil(rangeSize / 50);

    return { min: minValue, max: maxValue, step };
  }, [column, defaultRange]);

  const range = React.useMemo((): RangeValue => {
    return columnFilterValue ?? [min, max];
  }, [columnFilterValue, min, max]);

  const formatValue = React.useCallback((value: number) => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }, []);

  const onFromInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = Number(event.target.value);
      if (!Number.isNaN(numValue) && numValue >= min && numValue <= range[1]) {
        column.setFilterValue([numValue, range[1]]);
      }
    },
    [column, min, range]
  );

  const onToInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = Number(event.target.value);
      if (!Number.isNaN(numValue) && numValue <= max && numValue >= range[0]) {
        column.setFilterValue([range[0], numValue]);
      }
    },
    [column, max, range]
  );

  const onSliderValueChange = React.useCallback(
    (value: RangeValue) => {
      if (Array.isArray(value) && value.length === 2) {
        column.setFilterValue(value);
      }
    },
    [column]
  );

  const onReset = React.useCallback(
    (event: React.MouseEvent) => {
      if (event.target instanceof HTMLDivElement) {
        event.stopPropagation();
      }
      column.setFilterValue(undefined);
    },
    [column]
  );

  const PopContent = (
    <div className="ds:flex ds:w-auto ds:flex-col ds:gap-4">
      <div className="ds:flex ds:flex-col ds:gap-3">
        <p className="ds:font-medium ds:leading-none ds:peer-disabled:cursor-not-allowed ds:peer-disabled:opacity-70">
          {title}
        </p>
        <div className="ds:flex ds:items-center ds:gap-4">
          <label htmlFor={`${id}-from`} className="ds:sr-only">
            From
          </label>
          <div className="ds:relative">
            <Input
              id={`${id}-from`}
              type="number"
              aria-valuemin={min}
              aria-valuemax={max}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={min.toString()}
              min={min}
              max={max}
              value={range[0]?.toString()}
              onChange={onFromInputChange}
              className={cn("ds:h-8 ds:w-24", unit && "ds:pr-8")}
            />
            {unit && (
              <span className="ds:absolute ds:top-0 ds:right-0 ds:bottom-0 ds:flex ds:items-center ds:rounded-r-md ds:bg-accent ds:px-2 ds:text-muted-foreground ds:text-sm">
                {unit}
              </span>
            )}
          </div>
          <label htmlFor={`${id}-to`} className="ds:sr-only">
            to
          </label>
          <div className="ds:relative">
            <Input
              id={`${id}-to`}
              type="number"
              aria-valuemin={min}
              aria-valuemax={max}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={max.toString()}
              min={min}
              max={max}
              value={range[1]?.toString()}
              onChange={onToInputChange}
              className={cn("ds:h-8 ds:w-24", unit && "ds:pr-8")}
            />
            {unit && (
              <span className="ds:absolute ds:top-0 ds:right-0 ds:bottom-0 ds:flex ds:items-center ds:rounded-r-md ds:bg-accent ds:px-2 ds:text-muted-foreground ds:text-sm">
                {unit}
              </span>
            )}
          </div>
        </div>
        <label htmlFor={`${id}-slider`} className="ds:sr-only">
          {title} slider
        </label>
        <Slider
          id={`${id}-slider`}
          min={min}
          max={max}
          step={step}
          value={range}
          onValueChange={onSliderValueChange}
        />
      </div>
      <Button
        aria-label={`Clear ${title} filter`}
        variant="outline"
        size="sm"
        onClick={onReset}
      >
        Clear
      </Button>
    </div>
  );

  return (
    <Popover content={PopContent}>
      <Button variant="outline" size="sm" className="ds:border-dashed ds:font-normal">
        {columnFilterValue ? (
          <div
            role="button"
            aria-label={`Clear ${title} filter`}
            tabIndex={0}
            className="ds:rounded-sm ds:opacity-70 ds:transition-opacity ds:hover:opacity-100 ds:focus-visible:outline-none ds:focus-visible:ring-1 ds:focus-visible:ring-ring"
            onClick={onReset}
          >
            <XCircle />
          </div>
        ) : (
          <PlusCircle />
        )}
        <span>{title}</span>
        {columnFilterValue ? (
          <>
            <Separator
              orientation="vertical"
              className="ds:mx-0.5 ds:data-[orientation=vertical]:h-4"
            />
            {formatValue(columnFilterValue[0])} -{" "}
            {formatValue(columnFilterValue[1])}
            {unit ? ` ${unit}` : ""}
          </>
        ) : null}
      </Button>
    </Popover>
  );
}
