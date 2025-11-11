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
type LabelPosition = "top" | "bottom" | "left" | "right";

export type SliderProps = React.ComponentProps<typeof SSlider> & {
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
      // If custom colors are provided, use them
      if (sliderColor || thumbBorderColor) {
        return {
          range: sliderColor || "bg-primary",
          thumb: thumbBorderColor || "border-primary/50",
        };
      }

      // Otherwise use predefined colors
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
    }, [color, sliderColor, thumbBorderColor]);

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
      // If custom label colors are provided, use them
      if (labelColor || labelTextColor) {
        return cn(labelColor, labelTextColor);
      }

      const orientation = props.orientation || "horizontal";
      let arrowDirection = "t"; // default top

      if (orientation === "horizontal") {
        if (labelPosition === "bottom") arrowDirection = "b";
        else if (labelPosition === "left") arrowDirection = "l";
        else if (labelPosition === "right") arrowDirection = "r";
        else arrowDirection = "t";
      } else {
        if (labelPosition === "right") arrowDirection = "r";
        else if (labelPosition === "top") arrowDirection = "t";
        else if (labelPosition === "bottom") arrowDirection = "b";
        else arrowDirection = "l";
      }

      switch (color) {
        case "primary":
          return `bg-primary text-primary-foreground [&>div.arrow]:border-${arrowDirection}-primary`;
        case "secondary":
          return `bg-secondary text-secondary-foreground [&>div.arrow]:border-${arrowDirection}-secondary`;
        case "success":
          return `bg-success text-success-foreground [&>div.arrow]:border-${arrowDirection}-success`;
        case "warning":
          return `bg-warning text-warning-foreground [&>div.arrow]:border-${arrowDirection}-warning`;
        case "error":
          return `bg-error text-error-foreground [&>div.arrow]:border-${arrowDirection}-error`;
        case "glass":
          return `bg-white/15 text-foreground backdrop-blur-sm shadow-lg [&>div.arrow]:border-${arrowDirection}-white/15`;
        case "muted":
          return `bg-muted text-muted-foreground [&>div.arrow]:border-${arrowDirection}-muted`;
        case "accent":
          return `bg-accent text-accent-foreground [&>div.arrow]:border-${arrowDirection}-accent`;
        default:
          return `bg-primary text-primary-foreground [&>div.arrow]:border-${arrowDirection}-primary`;
      }
    }, [color, labelPosition, props.orientation, labelColor, labelTextColor]);

    const arrowColorClass = useMemo(() => {
      // If custom arrow color is provided, use it
      if (labelArrowColor) {
        return labelArrowColor;
      }

      const orientation = props.orientation || "horizontal";

      // Create complete class strings for Tailwind
      const getArrowClasses = (
        direction: "top" | "bottom" | "left" | "right"
      ) => {
        const colorClasses: Record<
          SliderColor,
          Record<"top" | "bottom" | "left" | "right", string>
        > = {
          primary: {
            top: "border-t-primary",
            bottom: "border-b-primary",
            left: "border-l-primary",
            right: "border-r-primary",
          },
          secondary: {
            top: "border-t-secondary",
            bottom: "border-b-secondary",
            left: "border-l-secondary",
            right: "border-r-secondary",
          },
          success: {
            top: "border-t-success",
            bottom: "border-b-success",
            left: "border-l-success",
            right: "border-r-success",
          },
          warning: {
            top: "border-t-warning",
            bottom: "border-b-warning",
            left: "border-l-warning",
            right: "border-r-warning",
          },
          error: {
            top: "border-t-error",
            bottom: "border-b-error",
            left: "border-l-error",
            right: "border-r-error",
          },
          glass: {
            top: "border-t-white/15",
            bottom: "border-b-white/15",
            left: "border-l-white/15",
            right: "border-r-white/15",
          },
          muted: {
            top: "border-t-muted",
            bottom: "border-b-muted",
            left: "border-l-muted",
            right: "border-r-muted",
          },
          accent: {
            top: "border-t-accent",
            bottom: "border-b-accent",
            left: "border-l-accent",
            right: "border-r-accent",
          },
        };

        return (
          colorClasses[color]?.[direction] || colorClasses.primary[direction]
        );
      };

      // For horizontal orientation
      if (orientation === "horizontal") {
        if (labelPosition === "bottom") {
          return getArrowClasses("bottom");
        } else if (labelPosition === "left") {
          return getArrowClasses("left");
        } else if (labelPosition === "right") {
          return getArrowClasses("right");
        }
        // Default: top
        return getArrowClasses("top");
      }

      // For vertical orientation
      if (labelPosition === "right") {
        return getArrowClasses("right");
      } else if (labelPosition === "top") {
        return getArrowClasses("top");
      } else if (labelPosition === "bottom") {
        return getArrowClasses("bottom");
      }
      // Default: left
      return getArrowClasses("left");
    }, [color, labelPosition, props.orientation, labelArrowColor]);

    const labelVisibilityClass = useMemo(() => {
      if (showLabel === "hover") {
        return "scale-0 group-hover:scale-100";
      }
      if (showLabel === "always") {
        return "scale-100";
      }
      return "hidden";
    }, [showLabel]);

    const labelPositionClass = useMemo(() => {
      const orientation = props.orientation || "horizontal";

      // For horizontal orientation
      if (orientation === "horizontal") {
        if (labelPosition === "bottom") {
          return {
            badge: "left-1/2 -translate-x-1/2 top-full translate-y-1/2",
            arrow:
              "bottom-full left-1/2 -translate-x-1/2 border-b-[6px] border-l-[6px] border-r-[6px] border-t-0 border-l-transparent border-r-transparent",
          };
        } else if (labelPosition === "left") {
          return {
            badge: "top-1/2 -translate-y-1/2 right-full -translate-x-1/2",
            arrow:
              "left-full top-1/2 -translate-y-1/2 border-l-[6px] border-t-[6px] border-b-[6px] border-r-0 border-t-transparent border-b-transparent",
          };
        } else if (labelPosition === "right") {
          return {
            badge: "top-1/2 -translate-y-1/2 left-full translate-x-1/2",
            arrow:
              "right-full top-1/2 -translate-y-1/2 border-r-[6px] border-t-[6px] border-b-[6px] border-l-0 border-t-transparent border-b-transparent",
          };
        }
        // Default: top
        return {
          badge: "left-1/2 -translate-x-1/2 bottom-full -translate-y-1/2",
          arrow:
            "top-full left-1/2 -translate-x-1/2 border-t-[6px] border-l-[6px] border-r-[6px] border-b-0 border-l-transparent border-r-transparent",
        };
      }

      // For vertical orientation
      if (labelPosition === "right") {
        return {
          badge: "top-1/2 -translate-y-1/2 left-full translate-x-1/2",
          arrow:
            "right-full top-1/2 -translate-y-1/2 border-r-[6px] border-t-[6px] border-b-[6px] border-l-0 border-t-transparent border-b-transparent",
        };
      } else if (labelPosition === "top") {
        return {
          badge: "left-1/2 -translate-x-1/2 bottom-full -translate-y-1/2",
          arrow:
            "top-full left-1/2 -translate-x-1/2 border-t-[6px] border-l-[6px] border-r-[6px] border-b-0 border-l-transparent border-r-transparent",
        };
      } else if (labelPosition === "bottom") {
        return {
          badge: "left-1/2 -translate-x-1/2 top-full translate-y-1/2",
          arrow:
            "bottom-full left-1/2 -translate-x-1/2 border-b-[6px] border-l-[6px] border-r-[6px] border-t-0 border-l-transparent border-r-transparent",
        };
      }
      // Default: left
      return {
        badge: "top-1/2 -translate-y-1/2 right-full -translate-x-1/2",
        arrow:
          "left-full top-1/2 -translate-y-1/2 border-l-[6px] border-t-[6px] border-b-[6px] border-r-0 border-t-transparent border-b-transparent",
      };
    }, [labelPosition, props.orientation]);

    const labelPositionClassSpec = useMemo(() => {
      const orientation = props.orientation || "horizontal";

      // For horizontal orientation
      if (orientation === "horizontal") {
        if (labelPosition === "bottom") {
          return "data-[orientation=horizontal]:top-full data-[orientation=horizontal]:left-1/2 data-[orientation=horizontal]:-translate-x-1/2 data-[orientation=horizontal]:translate-y-1/2";
        } else if (labelPosition === "left") {
          return "data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:right-full data-[orientation=horizontal]:-translate-y-1/2 data-[orientation=horizontal]:-translate-x-1/2";
        } else if (labelPosition === "right") {
          return "data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:left-full data-[orientation=horizontal]:-translate-y-1/2 data-[orientation=horizontal]:translate-x-1/2";
        }
        // Default: top
        return "data-[orientation=horizontal]:bottom-full data-[orientation=horizontal]:left-1/2 data-[orientation=horizontal]:-translate-x-1/2 data-[orientation=horizontal]:-translate-y-1/2";
      }

      // For vertical orientation
      if (labelPosition === "right") {
        return "data-[orientation=vertical]:left-full data-[orientation=vertical]:top-1/2 data-[orientation=vertical]:translate-x-1/2 data-[orientation=vertical]:-translate-y-1/2";
      } else if (labelPosition === "top") {
        return "data-[orientation=vertical]:bottom-full data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:-translate-y-1/2";
      } else if (labelPosition === "bottom") {
        return "data-[orientation=vertical]:top-full data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:translate-y-1/2";
      }
      // Default: left
      return "data-[orientation=vertical]:right-full data-[orientation=vertical]:top-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:-translate-y-1/2";
    }, [labelPosition, props.orientation]);

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
                  "pointer-events-none absolute z-50 flex flex-col items-center justify-center rounded-md px-3 py-1.5 text-xs shadow-xl",
                  labelPositionClassSpec,
                  // Apply custom colors if provided, otherwise use labelColorClass
                  labelColor && labelColor,
                  labelTextColor && labelTextColor,
                  !labelColor && !labelTextColor && labelColorClass
                )}
                data-orientation={props.orientation || "horizontal"}
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
                // If custom colors are provided, use "custom" to avoid Badge's default colors
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
                // Apply custom colors if provided
                labelColor && labelColor,
                labelTextColor && labelTextColor,
                // Glass effect only if no custom colors
                !labelColor &&
                  !labelTextColor &&
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
                    "arrow absolute border-transparent",
                    labelPositionClass.arrow,
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
