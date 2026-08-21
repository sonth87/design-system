"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@dsui/ui/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "ds:relative ds:flex ds:w-full ds:touch-none ds:items-center ds:select-none ds:data-[disabled]:opacity-50 ds:data-[orientation=vertical]:h-full ds:data-[orientation=vertical]:min-h-44 ds:data-[orientation=vertical]:w-auto ds:data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "ds:bg-ink200 ds:relative ds:grow ds:overflow-hidden ds:rounded-full ds:data-[orientation=horizontal]:h-1.5 ds:data-[orientation=horizontal]:w-full ds:data-[orientation=vertical]:h-full ds:data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "ds:bg-primaryA-500 ds:absolute ds:data-[orientation=horizontal]:h-full ds:data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="ds:border-primaryA-500 ds:ring-ink500/50 ds:block ds:size-4 ds:shrink-0 ds:rounded-full ds:border ds:bg-white ds:shadow-sm ds:transition-[color,box-shadow] ds:hover:ring-4 ds:focus-visible:ring-4 ds:focus-visible:outline-hidden ds:disabled:pointer-events-none ds:disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
