import React, { useMemo } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@dsui/ui/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import NumberFlow from "@number-flow/react";
import type { BasicColor } from "@/types/variables";
import { Badge } from "../Badge";

type LabelAnimation = "number-flow" | "spec" | "none";
type LabelDisplay = false | "hover" | "always";
type SliderColor = BasicColor | "muted" | "accent";
type SliderSize = "sm" | "md" | "lg";
type LabelPosition = "top" | "bottom" | "left" | "right";

export type SliderProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  "color" | "defaultValue" | "value" | "min" | "max"
> & {
  color?: SliderColor;
  size?: SliderSize;
  showLabel?: LabelDisplay;
  labelArrow?: boolean;
  labelAnimation?: LabelAnimation;
  labelFormatter?: (value: number) => string;
  labelPosition?: LabelPosition;
  labelColor?: string;
  labelTextColor?: string;
  labelArrowColor?: string;
  sliderColor?: string;
  thumbBorderColor?: string;
  defaultValue?: number[];
  value?: number[];
  min?: number;
  max?: number;
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
    range: "ds:bg-primary",
    thumb: "ds:border-primary/50",
    labelBg: "ds:bg-primary",
    labelText: "ds:text-primary-foreground",
  },
  secondary: {
    range: "ds:bg-secondary",
    thumb: "ds:border-secondary/50",
    labelBg: "ds:bg-secondary",
    labelText: "ds:text-secondary-foreground",
  },
  success: {
    range: "ds:bg-success",
    thumb: "ds:border-success/50",
    labelBg: "ds:bg-success",
    labelText: "ds:text-success-foreground",
  },
  warning: {
    range: "ds:bg-warning",
    thumb: "ds:border-warning/50",
    labelBg: "ds:bg-warning",
    labelText: "ds:text-warning-foreground",
  },
  error: {
    range: "ds:bg-error",
    thumb: "ds:border-error/50",
    labelBg: "ds:bg-error",
    labelText: "ds:text-error-foreground",
  },
  glass: {
    range: "ds:bg-white/30 ds:backdrop-blur-sm",
    thumb: "ds:border-white/30 ds:backdrop-blur-sm",
    labelBg: "ds:bg-white/15",
    labelText: "ds:text-foreground",
  },
  muted: {
    range: "ds:bg-muted-foreground",
    thumb: "ds:border-muted-foreground/50",
    labelBg: "ds:bg-muted",
    labelText: "ds:text-muted-foreground",
  },
  accent: {
    range: "ds:bg-accent",
    thumb: "ds:border-accent/50",
    labelBg: "ds:bg-accent",
    labelText: "ds:text-accent-foreground",
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
    track: "ds:data-[orientation=horizontal]:h-1 ds:data-[orientation=vertical]:w-1",
    thumb: "ds:size-3",
  },
  md: {
    track: "ds:data-[orientation=horizontal]:h-1.5 ds:data-[orientation=vertical]:w-1.5",
    thumb: "ds:size-4",
  },
  lg: {
    track: "ds:data-[orientation=horizontal]:h-2 ds:data-[orientation=vertical]:w-2",
    thumb: "ds:size-5",
  },
};

// Helper to get arrow direction based on orientation and position
const getArrowDirection = (
  orientation: "horizontal" | "vertical",
  position: LabelPosition
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
  direction: "top" | "bottom" | "left" | "right"
): string => {
  // Generate full border class (e.g., "ds:border-t-primary")
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
  position: LabelPosition
): { badge: string; arrow: string } => {
  const positions: Record<string, { badge: string; arrow: string }> = {
    "horizontal-top": {
      badge: "ds:left-1/2 ds:-translate-x-1/2 ds:bottom-full ds:-translate-y-1/2",
      arrow: "ds:top-full ds:left-1/2 ds:-translate-x-1/2 ds:border-t-[6px] ds:border-l-[6px] ds:border-r-[6px] ds:border-b-0 ds:border-l-transparent ds:border-r-transparent",
    }, "ds:horizontal-bottom": {
      badge: "ds:left-1/2 ds:-translate-x-1/2 ds:top-full ds:translate-y-1/2",
      arrow: "ds:bottom-full ds:left-1/2 ds:-translate-x-1/2 ds:border-b-[6px] ds:border-l-[6px] ds:border-r-[6px] ds:border-t-0 ds:border-l-transparent ds:border-r-transparent",
    }, "ds:horizontal-left": {
      badge: "ds:top-1/2 ds:-translate-y-1/2 ds:right-full ds:-translate-x-1/2",
      arrow: "ds:left-full ds:top-1/2 ds:-translate-y-1/2 ds:border-l-[6px] ds:border-t-[6px] ds:border-b-[6px] ds:border-r-0 ds:border-t-transparent ds:border-b-transparent",
    }, "ds:horizontal-right": {
      badge: "ds:top-1/2 ds:-translate-y-1/2 ds:left-full ds:translate-x-1/2",
      arrow: "ds:right-full ds:top-1/2 ds:-translate-y-1/2 ds:border-r-[6px] ds:border-t-[6px] ds:border-b-[6px] ds:border-l-0 ds:border-t-transparent ds:border-b-transparent",
    }, "ds:vertical-left": {
      badge: "ds:top-1/2 ds:-translate-y-1/2 ds:right-full ds:-translate-x-1/2",
      arrow: "ds:left-full ds:top-1/2 ds:-translate-y-1/2 ds:border-l-[6px] ds:border-t-[6px] ds:border-b-[6px] ds:border-r-0 ds:border-t-transparent ds:border-b-transparent",
    }, "ds:vertical-right": {
      badge: "ds:top-1/2 ds:-translate-y-1/2 ds:left-full ds:translate-x-1/2",
      arrow: "ds:right-full ds:top-1/2 ds:-translate-y-1/2 ds:border-r-[6px] ds:border-t-[6px] ds:border-b-[6px] ds:border-l-0 ds:border-t-transparent ds:border-b-transparent",
    }, "ds:vertical-top": {
      badge: "ds:left-1/2 ds:-translate-x-1/2 ds:bottom-full ds:-translate-y-1/2",
      arrow: "ds:top-full ds:left-1/2 ds:-translate-x-1/2 ds:border-t-[6px] ds:border-l-[6px] ds:border-r-[6px] ds:border-b-0 ds:border-l-transparent ds:border-r-transparent",
    }, "ds:vertical-bottom": {
      badge: "ds:left-1/2 ds:-translate-x-1/2 ds:top-full ds:translate-y-1/2",
      arrow: "ds:bottom-full ds:left-1/2 ds:-translate-x-1/2 ds:border-b-[6px] ds:border-l-[6px] ds:border-r-[6px] ds:border-t-0 ds:border-l-transparent ds:border-r-transparent",
    },
  };

  return positions[`${orientation}-${position}`];
};

// Helper to get spec label position classes
const getSpecLabelPositionClass = (
  orientation: "horizontal" | "vertical",
  position: LabelPosition
): string => {
  const positions: Record<string, string> = {
    "horizontal-top": "ds:data-[orientation=horizontal]:bottom-full ds:data-[orientation=horizontal]:left-1/2 ds:data-[orientation=horizontal]:-translate-x-1/2 ds:data-[orientation=horizontal]:-translate-y-1/2", "ds:horizontal-bottom": "ds:data-[orientation=horizontal]:top-full ds:data-[orientation=horizontal]:left-1/2 ds:data-[orientation=horizontal]:-translate-x-1/2 ds:data-[orientation=horizontal]:translate-y-1/2", "ds:horizontal-left": "ds:data-[orientation=horizontal]:top-1/2 ds:data-[orientation=horizontal]:right-full ds:data-[orientation=horizontal]:-translate-y-1/2 ds:data-[orientation=horizontal]:-translate-x-1/2", "ds:horizontal-right": "ds:data-[orientation=horizontal]:top-1/2 ds:data-[orientation=horizontal]:left-full ds:data-[orientation=horizontal]:-translate-y-1/2 ds:data-[orientation=horizontal]:translate-x-1/2", "ds:vertical-left": "ds:data-[orientation=vertical]:right-full ds:data-[orientation=vertical]:top-1/2 ds:data-[orientation=vertical]:-translate-x-1/2 ds:data-[orientation=vertical]:-translate-y-1/2", "ds:vertical-right": "ds:data-[orientation=vertical]:left-full ds:data-[orientation=vertical]:top-1/2 ds:data-[orientation=vertical]:translate-x-1/2 ds:data-[orientation=vertical]:-translate-y-1/2", "ds:vertical-top": "ds:data-[orientation=vertical]:bottom-full ds:data-[orientation=vertical]:left-1/2 ds:data-[orientation=vertical]:-translate-x-1/2 ds:data-[orientation=vertical]:-translate-y-1/2", "ds:vertical-bottom": "ds:data-[orientation=vertical]:top-full ds:data-[orientation=vertical]:left-1/2 ds:data-[orientation=vertical]:-translate-x-1/2 ds:data-[orientation=vertical]:translate-y-1/2",
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

    // State for hover detection
    const [isHovered, setIsHovered] = React.useState(false);
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

    const orientation = props.orientation || "horizontal";

    // For spec animation - track thumb position and velocity
    const thumbPosition = useMotionValue(0);
    const thumbVelocity = useMotionValue(0);
    const prevThumbPosition = React.useRef(0);

    // Spring physics for label following effect - more dramatic
    const springConfig = { stiffness: 150, damping: 15, mass: 1 };
    const labelOffset = useSpring(0, springConfig);
    const labelRotate = useSpring(0, springConfig);

    // Track value changes to calculate velocity
    React.useEffect(() => {
      if (labelAnimation === "spec" && _values.length > 0) {
        const currentPos = _values[0];
        const velocity = currentPos - prevThumbPosition.current;

        // Cap velocity to prevent large jumps (e.g., on click or initial load)
        const maxVelocity = 5; // Maximum velocity threshold
        const cappedVelocity = Math.max(
          -maxVelocity,
          Math.min(maxVelocity, velocity)
        );

        // Update velocity and position
        thumbVelocity.set(cappedVelocity);
        thumbPosition.set(currentPos);

        // Calculate offset and rotation based on capped velocity
        // Negative velocity (moving left) -> positive offset (label lags behind to the right)
        const offsetAmount = -cappedVelocity * 12;
        const rotateAmount = -cappedVelocity * 20;

        labelOffset.set(offsetAmount);
        labelRotate.set(rotateAmount);

        // Reset to center when stopped
        setTimeout(() => {
          labelOffset.set(0);
          labelRotate.set(0);
        }, 100);

        prevThumbPosition.current = currentPos;
      }
    }, [
      _values,
      labelAnimation,
      thumbVelocity,
      thumbPosition,
      labelOffset,
      labelRotate,
    ]);

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
      [labelPosition, orientation]
    );

    const labelPositionClassSpec = useMemo(
      () => getSpecLabelPositionClass(orientation, labelPosition),
      [labelPosition, orientation]
    );

    // Render label based on animation type
    const renderLabel = React.useCallback(
      (index: number) => {
        if (labelAnimation === "spec") {
          return (
            <motion.div
              className={cn(
                "ds:pointer-events-none ds:absolute ds:z-50 ds:flex ds:flex-col ds:items-center ds:justify-center ds:rounded-md ds:px-3 ds:py-1.5 ds:text-xs ds:shadow-xl",
                labelPositionClassSpec,
                labelColor && labelColor,
                labelTextColor && labelTextColor,
                !labelColor && !labelTextColor && labelColorClass
              )}
              data-orientation={orientation}
              initial={
                showLabel === "always"
                  ? { opacity: 1, y: -5, scale: 1 }
                  : { opacity: 0, y: 20, scale: 0 }
              }
              animate={
                (isHovered && showLabel === "hover") || showLabel === "always"
                  ? {
                      opacity: 1,
                      y: -5,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      y: 20,
                      scale: 0,
                    }
              }
              transition={{
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              }}
              style={{
                x: labelOffset,
                rotate: labelRotate,
                whiteSpace: "nowrap",
              }}
            >
              <div className="ds:relative ds:z-1">
                <NumberFlow
                  value={_values[index]}
                  format={{ notation: "standard" }}
                  isolate
                />
              </div>
              {labelArrow && (
                <div
                  className={cn(
                    "arrow ds:absolute ds:border-transparent",
                    labelPositionClass.arrow,
                    arrowColorClass
                  )}
                />
              )}
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
              "ds:transition-transform ds:absolute ds:px-3 ds:rounded-md",
              labelPositionClass.badge,
              labelVisibilityClass,
              labelColor && labelColor,
              labelTextColor && labelTextColor,
              !labelColor &&
                !labelTextColor &&
                color === "glass" &&
                "ds:bg-white/15 ds:text-foreground ds:backdrop-blur-sm ds:shadow-lg [&>div.arrow]:border-t-white/15"
            )}
          >
            {labelAnimation === "number-flow" ? (
              <NumberFlow
                value={_values[index]}
                format={{ notation: "standard" }}
                isolate
              />
            ) : (
              <span>{labelFormatter(_values[index])}</span>
            )}
            {labelArrow && (
              <div
                className={cn(
                  "arrow ds:absolute ds:border-transparent",
                  labelPositionClass.arrow,
                  arrowColorClass
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
        labelOffset,
        labelRotate,
        labelFormatter,
        _values,
        color,
        labelPositionClass,
        labelVisibilityClass,
        labelArrow,
        arrowColorClass,
        isHovered,
      ]
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
            "ds:relative ds:flex ds:w-full touch-none ds:items-center select-none ds:data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              "ds:bg-muted ds:relative grow overflow-hidden ds:rounded-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
              sliderSizeClass.track
            )}
          >
            <SliderPrimitive.Range
              data-slot="slider-range"
              className={cn(
                "ds:absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
                sliderColorClass.range
              )}
            />
          </SliderPrimitive.Track>
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              data-slot="slider-thumb"
              className={cn(
                "ds:block ds:shrink-0 ds:rounded-full ds:border ds:bg-white ds:shadow-sm transition-[color,box-shadow] ds:hover:ring-4 ds:focus-visible:ring-4 ds:focus-visible:outline-hidden ds:disabled:pointer-events-none ds:disabled:opacity-50 ds:ring-ring/50",
                sliderColorClass.thumb,
                sliderSizeClass.thumb
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
          "ds:relative ds:flex ds:w-full touch-none ds:items-center select-none ds:data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "ds:bg-muted ds:relative grow overflow-hidden ds:rounded-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
            sliderSizeClass.track
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "ds:absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
              sliderColorClass.range
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            data-slot="slider-thumb"
            className={cn("ds:group ds:block ds:shrink-0 ds:rounded-full ds:border ds:bg-white ds:shadow-sm transition-[color,box-shadow] ds:hover:ring-4 ds:focus-visible:ring-4 ds:focus-visible:outline-hidden ds:disabled:pointer-events-none ds:disabled:opacity-50 ds:ring-ring/50",
              sliderColorClass.thumb,
              sliderSizeClass.thumb
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {renderLabel(index)}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
