import React, { useMemo } from "react";
import { Slider as SSlider } from "@dsui/ui/components/slider";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@dsui/ui/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import NumberFlow from "@number-flow/react";
import type { BasicColor } from "@/types/variables";
import Badge from "../Badge/Badge";

type LabelAnimation = "number-flow" | "spec" | "none";
type LabelDisplay = false | "hover" | "always";
type SliderColor = BasicColor | "muted" | "accent";
type SliderSize = "sm" | "md" | "lg";

export type SliderProps = React.ComponentProps<typeof SSlider> & {
  color?: SliderColor;
  size?: SliderSize;
  showLabel?: LabelDisplay;
  labelArrow?: boolean;
  labelAnimation?: LabelAnimation;
  labelFormatter?: (value: number) => string;
};

const Slider = React.forwardRef<HTMLSpanElement, SliderProps>(
  (
    {
      className,
      color = "primary",
      size = "md",
      showLabel = false,
      labelArrow = false,
      labelAnimation = "none",
      labelFormatter = (value) => `${value}`,
      defaultValue,
      value,
      min = 0,
      max = 100,
      ...props
    },
    ref
  ) => {
    const _values = React.useMemo(
      () =>
        Array.isArray(value)
          ? value
          : Array.isArray(defaultValue)
            ? defaultValue
            : [min, max],
      [value, defaultValue, min, max]
    );

    // Validate values
    React.useEffect(() => {
      if (value !== undefined && !Array.isArray(value)) {
        console.error(
          "[Slider] value prop must be an array of numbers, e.g., [50] or [25, 75]"
        );
      }
      if (defaultValue !== undefined && !Array.isArray(defaultValue)) {
        console.error(
          "[Slider] defaultValue prop must be an array of numbers, e.g., [50] or [25, 75]"
        );
      }
    }, [value, defaultValue]);

    // For spec animation
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0);
    const rotate = useSpring(
      useTransform(x, [-100, 100], [-45, 45]),
      springConfig
    );
    const translateX = useSpring(
      useTransform(x, [-100, 100], [-50, 50]),
      springConfig
    );

    const handleMouseMove = React.useCallback(
      (event: React.MouseEvent) => {
        if (labelAnimation === "spec") {
          const halfWidth = (event.target as HTMLElement).offsetWidth / 2;
          x.set(event.nativeEvent.offsetX - halfWidth);
        }
      },
      [labelAnimation, x]
    );

    const sliderColorClass = useMemo(() => {
      const rangeColors = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
        glass: "bg-white/30 backdrop-blur-sm",
        muted: "bg-muted-foreground",
        accent: "bg-accent",
      };

      const thumbColors = {
        primary: "border-primary/50",
        secondary: "border-secondary/50",
        success: "border-success/50",
        warning: "border-warning/50",
        error: "border-error/50",
        glass: "border-white/30 backdrop-blur-sm",
        muted: "border-muted-foreground/50",
        accent: "border-accent/50",
      };

      return {
        range: rangeColors[color],
        thumb: thumbColors[color],
      };
    }, [color]);

    const sliderSizeClass = useMemo(() => {
      const trackSizes = {
        sm: "data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
        md: "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
        lg: "data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2",
      };

      const thumbSizes = {
        sm: "size-3",
        md: "size-4",
        lg: "size-5",
      };

      return {
        track: trackSizes[size],
        thumb: thumbSizes[size],
      };
    }, [size]);

    const labelColorClass = useMemo(() => {
      switch (color) {
        case "primary":
          return "bg-primary text-primary-foreground [&>div.arrow]:border-t-primary";
        case "secondary":
          return "bg-secondary text-secondary-foreground [&>div.arrow]:border-t-secondary";
        case "success":
          return "bg-success text-success-foreground [&>div.arrow]:border-t-success";
        case "warning":
          return "bg-warning text-warning-foreground [&>div.arrow]:border-t-warning";
        case "error":
          return "bg-error text-error-foreground [&>div.arrow]:border-t-error";
        case "glass":
          return "bg-white/15 text-foreground backdrop-blur-sm shadow-lg [&>div.arrow]:border-t-white/15";
        case "muted":
          return "bg-muted text-muted-foreground [&>div.arrow]:border-t-muted";
        case "accent":
          return "bg-accent text-accent-foreground [&>div.arrow]:border-t-accent";
        default:
          return "bg-primary text-primary-foreground [&>div.arrow]:border-t-primary";
      }
    }, [color]);

    const arrowColorClass = useMemo(() => {
      switch (color) {
        case "primary":
          return "border-t-primary";
        case "secondary":
          return "border-t-secondary";
        case "success":
          return "border-t-success";
        case "warning":
          return "border-t-warning";
        case "error":
          return "border-t-error";
        case "glass":
          return "border-t-white/15";
        case "muted":
          return "border-t-muted";
        case "accent":
          return "border-t-accent";
        default:
          return "border-t-primary";
      }
    }, [color]);

    const labelVisibilityClass = useMemo(() => {
      if (showLabel === "hover") {
        return "scale-0 group-hover:scale-100";
      }
      if (showLabel === "always") {
        return "scale-100";
      }
      return "hidden";
    }, [showLabel]);

    // Render without label - use custom slider with color
    if (!showLabel) {
      return (
        <SliderPrimitive.Root
          ref={ref}
          data-slot="slider"
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          className={cn(
            "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
              sliderSizeClass.track
            )}
          >
            <SliderPrimitive.Range
              data-slot="slider-range"
              className={cn(
                "absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
                sliderColorClass.range
              )}
            />
          </SliderPrimitive.Track>
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              data-slot="slider-thumb"
              className={cn(
                "block shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 ring-ring/50",
                sliderColorClass.thumb,
                sliderSizeClass.thumb
              )}
            />
          ))}
        </SliderPrimitive.Root>
      );
    }

    // Render with sticky label
    if (labelAnimation === "spec") {
      return (
        <SliderPrimitive.Root
          ref={ref}
          data-slot="slider"
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          className={cn(
            "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
              sliderSizeClass.track
            )}
          >
            <SliderPrimitive.Range
              data-slot="slider-range"
              className={cn(
                "absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
                sliderColorClass.range
              )}
            />
          </SliderPrimitive.Track>
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              data-slot="slider-thumb"
              className={cn(
                "group block shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 ring-ring/50",
                sliderColorClass.thumb,
                sliderSizeClass.thumb
              )}
              onMouseMove={handleMouseMove}
            >
              <motion.div
                className={cn(
                  "pointer-events-none absolute -top-2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-full flex-col items-center justify-center rounded-md px-3 py-1.5 text-xs shadow-xl",
                  labelColorClass
                )}
                initial={{ opacity: 0, y: 20, scale: 0 }}
                whileHover={{
                  opacity: 1,
                  y: -5,
                  scale: 1,
                }}
                transition={{
                  type: "tween",
                  duration: 0.2,
                  ease: "easeOut",
                }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
              >
                <div className="relative z-1">
                  {labelFormatter(_values[index])}
                </div>
              </motion.div>
            </SliderPrimitive.Thumb>
          ))}
        </SliderPrimitive.Root>
      );
    }

    // Standard or number-flow animation
    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(
          "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
            sliderSizeClass.track
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
              sliderColorClass.range
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            data-slot="slider-thumb"
            className={cn(
              "group block shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 ring-ring/50",
              sliderColorClass.thumb,
              sliderSizeClass.thumb
            )}
          >
            <Badge
              size="lg"
              color={
                color === "glass"
                  ? "custom"
                  : color === "muted"
                    ? "muted"
                    : color === "accent"
                      ? "accent"
                      : color
              }
              variant="solid"
              className={cn(
                "transition-transform absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 rounded-md",
                labelArrow ? "-top-5 overflow-visible" : "-top-4",
                labelVisibilityClass,
                color === "glass" &&
                  "bg-white/15 text-foreground backdrop-blur-sm shadow-lg [&>div.arrow]:border-t-white/15"
              )}
            >
              {labelAnimation === "number-flow" ? (
                <NumberFlow
                  value={_values[index]}
                  format={{ notation: "standard" }}
                />
              ) : (
                <span>{labelFormatter(_values[index])}</span>
              )}
              {labelArrow && (
                <div
                  className={cn(
                    "arrow absolute border-[6px] left-1/2 -translate-x-1/2 border-transparent top-full",
                    arrowColorClass
                  )}
                />
              )}
            </Badge>
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
