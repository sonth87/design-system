import React, { useMemo } from "react";
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
type LabelPosition = "top" | "bottom" | "left" | "right";

export type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  color?: SliderColor;
  size?: SliderSize;
  showLabel?: LabelDisplay;
  labelArrow?: boolean;
  labelAnimation?: LabelAnimation;
  labelFormatter?: (value: number) => string;
  labelPosition?: LabelPosition;
  labelColor?: string; // Custom label background color (e.g., "bg-yellow-500")
  labelTextColor?: string; // Custom label text color (e.g., "text-yellow-950")
  labelArrowColor?: string; // Custom label arrow color (e.g., "border-t-yellow-500")
  sliderColor?: string; // Custom slider track color (e.g., "bg-pink-500")
  thumbBorderColor?: string; // Custom thumb border color (e.g., "border-pink-500/50")
};

// Color mapping configuration
const COLOR_CONFIG: Record<
  SliderColor,
  {
    range: string;
    thumb: string;
    labelBg: string;
    labelText: string;
  }
> = {
  primary: {
    range: "bg-primary",
    thumb: "border-primary/50",
    labelBg: "bg-primary",
    labelText: "text-primary-foreground",
  },
  secondary: {
    range: "bg-secondary",
    thumb: "border-secondary/50",
    labelBg: "bg-secondary",
    labelText: "text-secondary-foreground",
  },
  success: {
    range: "bg-success",
    thumb: "border-success/50",
    labelBg: "bg-success",
    labelText: "text-success-foreground",
  },
  warning: {
    range: "bg-warning",
    thumb: "border-warning/50",
    labelBg: "bg-warning",
    labelText: "text-warning-foreground",
  },
  error: {
    range: "bg-error",
    thumb: "border-error/50",
    labelBg: "bg-error",
    labelText: "text-error-foreground",
  },
  glass: {
    range: "bg-white/30 backdrop-blur-sm",
    thumb: "border-white/30 backdrop-blur-sm",
    labelBg: "bg-white/15",
    labelText: "text-foreground",
  },
  muted: {
    range: "bg-muted-foreground",
    thumb: "border-muted-foreground/50",
    labelBg: "bg-muted",
    labelText: "text-muted-foreground",
  },
  accent: {
    range: "bg-accent",
    thumb: "border-accent/50",
    labelBg: "bg-accent",
    labelText: "text-accent-foreground",
  },
};

// Size configuration
const SIZE_CONFIG: Record<
  SliderSize,
  {
    track: string;
    thumb: string;
  }
> = {
  sm: {
    track: "data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
    thumb: "size-3",
  },
  md: {
    track:
      "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
    thumb: "size-4",
  },
  lg: {
    track: "data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2",
    thumb: "size-5",
  },
};

// Helper to get arrow direction based on orientation and position
const getArrowDirection = (
  orientation: "horizontal" | "vertical",
  position: LabelPosition,
): "top" | "bottom" | "left" | "right" => {
  if (orientation === "horizontal") {
    if (position === "bottom") return "bottom";
    if (position === "left") return "left";
    if (position === "right") return "right";
    return "top";
  }
  // vertical
  if (position === "right") return "right";
  if (position === "top") return "top";
  if (position === "bottom") return "bottom";
  return "left";
};

// Helper to get arrow color class
const getArrowColorClass = (
  color: SliderColor,
  direction: "top" | "bottom" | "left" | "right",
): string => {
  // Generate full border class (e.g., "border-t-primary")
  const prefix =
    direction === "top"
      ? "t"
      : direction === "bottom"
        ? "b"
        : direction === "left"
          ? "l"
          : "r";
  const colorMap: Record<SliderColor, string> = {
    primary: `border-${prefix}-primary`,
    secondary: `border-${prefix}-secondary`,
    success: `border-${prefix}-success`,
    warning: `border-${prefix}-warning`,
    error: `border-${prefix}-error`,
    glass: `border-${prefix}-white/15`,
    muted: `border-${prefix}-muted`,
    accent: `border-${prefix}-accent`,
  };

  return colorMap[color];
};

// Helper to get label position classes
const getLabelPositionClasses = (
  orientation: "horizontal" | "vertical",
  position: LabelPosition,
): { badge: string; arrow: string } => {
  const positions: Record<string, { badge: string; arrow: string }> = {
    "horizontal-top": {
      badge: "left-1/2 -translate-x-1/2 bottom-full -translate-y-1/2",
      arrow:
        "top-full left-1/2 -translate-x-1/2 border-t-[6px] border-l-[6px] border-r-[6px] border-b-0 border-l-transparent border-r-transparent",
    },
    "horizontal-bottom": {
      badge: "left-1/2 -translate-x-1/2 top-full translate-y-1/2",
      arrow:
        "bottom-full left-1/2 -translate-x-1/2 border-b-[6px] border-l-[6px] border-r-[6px] border-t-0 border-l-transparent border-r-transparent",
    },
    "horizontal-left": {
      badge: "top-1/2 -translate-y-1/2 right-full -translate-x-1/2",
      arrow:
        "left-full top-1/2 -translate-y-1/2 border-l-[6px] border-t-[6px] border-b-[6px] border-r-0 border-t-transparent border-b-transparent",
    },
    "horizontal-right": {
      badge: "top-1/2 -translate-y-1/2 left-full translate-x-1/2",
      arrow:
        "right-full top-1/2 -translate-y-1/2 border-r-[6px] border-t-[6px] border-b-[6px] border-l-0 border-t-transparent border-b-transparent",
    },
    "vertical-left": {
      badge: "top-1/2 -translate-y-1/2 right-full -translate-x-1/2",
      arrow:
        "left-full top-1/2 -translate-y-1/2 border-l-[6px] border-t-[6px] border-b-[6px] border-r-0 border-t-transparent border-b-transparent",
    },
    "vertical-right": {
      badge: "top-1/2 -translate-y-1/2 left-full translate-x-1/2",
      arrow:
        "right-full top-1/2 -translate-y-1/2 border-r-[6px] border-t-[6px] border-b-[6px] border-l-0 border-t-transparent border-b-transparent",
    },
    "vertical-top": {
      badge: "left-1/2 -translate-x-1/2 bottom-full -translate-y-1/2",
      arrow:
        "top-full left-1/2 -translate-x-1/2 border-t-[6px] border-l-[6px] border-r-[6px] border-b-0 border-l-transparent border-r-transparent",
    },
    "vertical-bottom": {
      badge: "left-1/2 -translate-x-1/2 top-full translate-y-1/2",
      arrow:
        "bottom-full left-1/2 -translate-x-1/2 border-b-[6px] border-l-[6px] border-r-[6px] border-t-0 border-l-transparent border-r-transparent",
    },
  };

  return positions[`${orientation}-${position}`];
};

// Helper to get spec label position classes
const getSpecLabelPositionClass = (
  orientation: "horizontal" | "vertical",
  position: LabelPosition,
): string => {
  const positions: Record<string, string> = {
    "horizontal-top":
      "data-[orientation=horizontal]:bottom-full data-[orientation=horizontal]:left-1/2 data-[orientation=horizontal]:-translate-x-1/2 data-[orientation=horizontal]:-translate-y-1/2",
    "horizontal-bottom":
      "data-[orientation=horizontal]:top-full data-[orientation=horizontal]:left-1/2 data-[orientation=horizontal]:-translate-x-1/2 data-[orientation=horizontal]:translate-y-1/2",
    "horizontal-left":
      "data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:right-full data-[orientation=horizontal]:-translate-y-1/2 data-[orientation=horizontal]:-translate-x-1/2",
    "horizontal-right":
      "data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:left-full data-[orientation=horizontal]:-translate-y-1/2 data-[orientation=horizontal]:translate-x-1/2",
    "vertical-left":
      "data-[orientation=vertical]:right-full data-[orientation=vertical]:top-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:-translate-y-1/2",
    "vertical-right":
      "data-[orientation=vertical]:left-full data-[orientation=vertical]:top-1/2 data-[orientation=vertical]:translate-x-1/2 data-[orientation=vertical]:-translate-y-1/2",
    "vertical-top":
      "data-[orientation=vertical]:bottom-full data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:-translate-y-1/2",
    "vertical-bottom":
      "data-[orientation=vertical]:top-full data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:translate-y-1/2",
  };

  return positions[`${orientation}-${position}`];
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
      labelPosition = "top",
      labelColor,
      labelTextColor,
      labelArrowColor,
      sliderColor,
      thumbBorderColor,
      defaultValue,
      value,
      min = 0,
      max = 100,
      ...props
    },
    ref,
  ) => {
    const _values = React.useMemo(
      () =>
        Array.isArray(value)
          ? value
          : Array.isArray(defaultValue)
            ? defaultValue
            : [min, max],
      [value, defaultValue, min, max],
    );

    // Validate values
    React.useEffect(() => {
      if (value !== undefined && !Array.isArray(value)) {
        console.error(
          "[Slider] value prop must be an array of numbers, e.g., [50] or [25, 75]",
        );
      }
      if (defaultValue !== undefined && !Array.isArray(defaultValue)) {
        console.error(
          "[Slider] defaultValue prop must be an array of numbers, e.g., [50] or [25, 75]",
        );
      }
    }, [value, defaultValue]);

    const orientation = props.orientation || "horizontal";

    // For spec animation
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0);
    const rotate = useSpring(
      useTransform(x, [-100, 100], [-45, 45]),
      springConfig,
    );
    const translateX = useSpring(
      useTransform(x, [-100, 100], [-50, 50]),
      springConfig,
    );

    const handleMouseMove = React.useCallback(
      (event: React.MouseEvent) => {
        if (labelAnimation === "spec") {
          const halfWidth = (event.target as HTMLElement).offsetWidth / 2;
          x.set(event.nativeEvent.offsetX - halfWidth);
        }
      },
      [labelAnimation, x],
    );

    // Memoized computed values
    const sliderColorClass = useMemo(() => {
      if (sliderColor || thumbBorderColor) {
        return {
          range: sliderColor || "bg-primary",
          thumb: thumbBorderColor || "border-primary/50",
        };
      }
      const config = COLOR_CONFIG[color];
      return {
        range: config.range,
        thumb: config.thumb,
      };
    }, [color, sliderColor, thumbBorderColor]);

    const sliderSizeClass = useMemo(() => SIZE_CONFIG[size], [size]);

    const labelColorClass = useMemo(() => {
      if (labelColor || labelTextColor) {
        return cn(labelColor, labelTextColor);
      }

      const config = COLOR_CONFIG[color];
      const direction = getArrowDirection(orientation, labelPosition);
      const arrowColor = getArrowColorClass(color, direction);

      if (color === "glass") {
        return `${config.labelBg} ${config.labelText} backdrop-blur-sm shadow-lg [&>div.arrow]:${arrowColor}`;
      }

      return `${config.labelBg} ${config.labelText} [&>div.arrow]:${arrowColor}`;
    }, [color, labelPosition, orientation, labelColor, labelTextColor]);

    const arrowColorClass = useMemo(() => {
      if (labelArrowColor) return labelArrowColor;
      const direction = getArrowDirection(orientation, labelPosition);
      return getArrowColorClass(color, direction);
    }, [color, labelPosition, orientation, labelArrowColor]);

    const labelVisibilityClass = useMemo(() => {
      if (showLabel === "hover") return "scale-0 group-hover:scale-100";
      if (showLabel === "always") return "scale-100";
      return "hidden";
    }, [showLabel]);

    const labelPositionClass = useMemo(
      () => getLabelPositionClasses(orientation, labelPosition),
      [labelPosition, orientation],
    );

    const labelPositionClassSpec = useMemo(
      () => getSpecLabelPositionClass(orientation, labelPosition),
      [labelPosition, orientation],
    );

    // Render label based on animation type
    const renderLabel = React.useCallback(
      (index: number) => {
        if (labelAnimation === "spec") {
          return (
            <motion.div
              className={cn(
                "pointer-events-none absolute z-50 flex flex-col items-center justify-center rounded-md px-3 py-1.5 text-xs shadow-xl",
                labelPositionClassSpec,
                labelColor && labelColor,
                labelTextColor && labelTextColor,
                !labelColor && !labelTextColor && labelColorClass,
              )}
              data-orientation={orientation}
              initial={
                showLabel === "always"
                  ? { opacity: 1, y: -5, scale: 1 }
                  : { opacity: 0, y: 20, scale: 0 }
              }
              whileHover={
                showLabel === "hover" || showLabel === "always"
                  ? {
                      opacity: 1,
                      y: -5,
                      scale: 1,
                    }
                  : undefined
              }
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
          );
        }

        // Standard or number-flow animation
        return (
          <Badge
            size="lg"
            color={
              labelColor || labelTextColor
                ? "custom"
                : color === "glass"
                  ? "custom"
                  : color === "muted"
                    ? "muted"
                    : color === "accent"
                      ? "accent"
                      : color
            }
            variant="solid"
            className={cn(
              "transition-transform absolute px-3 rounded-md",
              labelPositionClass.badge,
              labelVisibilityClass,
              labelColor && labelColor,
              labelTextColor && labelTextColor,
              !labelColor &&
                !labelTextColor &&
                color === "glass" &&
                "bg-white/15 text-foreground backdrop-blur-sm shadow-lg [&>div.arrow]:border-t-white/15",
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
                  "arrow absolute border-transparent",
                  labelPositionClass.arrow,
                  arrowColorClass,
                )}
              />
            )}
          </Badge>
        );
      },
      [
        labelAnimation,
        labelPositionClassSpec,
        labelColor,
        labelTextColor,
        labelColorClass,
        orientation,
        showLabel,
        translateX,
        rotate,
        labelFormatter,
        _values,
        color,
        labelPositionClass,
        labelVisibilityClass,
        labelArrow,
        arrowColorClass,
      ],
    );

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
            className,
          )}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
              sliderSizeClass.track,
            )}
          >
            <SliderPrimitive.Range
              data-slot="slider-range"
              className={cn(
                "absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
                sliderColorClass.range,
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
                sliderSizeClass.thumb,
              )}
            />
          ))}
        </SliderPrimitive.Root>
      );
    }

    // Render with label (standard, number-flow, or spec animation)
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
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
            sliderSizeClass.track,
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
              sliderColorClass.range,
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
              sliderSizeClass.thumb,
            )}
            onMouseMove={
              labelAnimation === "spec" ? handleMouseMove : undefined
            }
          >
            {renderLabel(index)}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = "Slider";

export default Slider;
