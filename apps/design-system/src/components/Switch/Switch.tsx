import React, { useMemo } from "react";
import {
  Switch as SSwitch,
  switchVariants,
  type SwitchVariant,
} from "@dsui/ui/components/switch";
import { cn } from "@dsui/ui/lib/utils";
import type { SwitchAnimation } from "@/types/variables";
import { animationEffect } from "@/utils/animations";
import { Glass } from "../Glass";

export type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<typeof SSwitch>,
  "onCheckedChange" | "variant" | "size" | "color"
> & {
  onCheckedChange?: (checked: boolean) => void;
  variant?: "default" | "square1" | "square2" | "mini";
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "muted"
    | "success"
    | "error"
    | "warning";
  animation?: SwitchAnimation;
  label?: React.ReactNode;
  labelPosition?: "left" | "right" | "top" | "bottom";
  offLabel?: React.ReactNode;
  onLabel?: React.ReactNode;
  showLabels?: "outside" | "inside" | "none";
};

type AnimResult = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  variant?: SwitchVariant["variant"];
  isGlass?: boolean; // Flag for glass effect
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (props, ref) => {
    const {
      animation,
      label,
      labelPosition = "right",
      offLabel,
      onLabel,
      showLabels = "none",
      checked = false,
      onCheckedChange,
      className,
      variant = "default",
      size = "normal",
      color,
      ...rest
    } = props;
    const id = React.useId();

    const [isChecked, setIsChecked] = React.useState(checked);

    React.useEffect(() => {
      setIsChecked(checked as boolean);
    }, [checked]);

    const handleCheckedChange = (newChecked: boolean) => {
      setIsChecked(newChecked);
      onCheckedChange?.(newChecked);
    };

    const switchAnimation = useMemo<AnimResult | null>(() => {
      if (!animation) return null;

      // Handle glass animation separately for Switch (don't affect other components)
      if (animation === "glass") {
        return {
          className: "!bg-transparent !shadow-none !border-none",
          isGlass: true, // Custom flag for glass effect
          variant: "default",
        };
      }

      return animationEffect<SwitchAnimation, SwitchVariant["variant"]>({
        animation,
        children: null,
        className,
        rootClassName: switchVariants({
          variant: variant,
          size: size,
          color: color,
        }),
        variantType: variant,
      });
    }, [animation, className, variant, size, color]);

    const switchElement = (switchClassName?: string) => {
      const baseSwitchElement = (
        <SSwitch
          ref={ref}
          id={id}
          checked={isChecked}
          onCheckedChange={handleCheckedChange}
          className={cn(className, switchClassName, switchAnimation?.className)}
          variant={variant}
          size={size}
          color={color}
          style={{ ...(rest.style || {}), ...(switchAnimation?.style || {}) }}
          {...rest}
        />
      );

      // If animation is glass effect, wrap the switch in Glass component
      if (animation === "glass" && switchAnimation?.isGlass) {
        const roundedMatches = switchVariants({
          variant: variant,
          size: size,
          color: color,
        })?.match(/((?:!)?rounded-\S+)/g);
        const roundedClass = roundedMatches
          ? roundedMatches[roundedMatches.length - 1]
          : "rounded-full";

        return (
          <Glass
            className={cn("ds:hover:scale-110 [&_span]:opacity-80", roundedClass)}
          >
            {baseSwitchElement}
          </Glass>
        );
      }

      // If animation returns children wrapper, use it
      if (
        switchAnimation?.children &&
        React.isValidElement(switchAnimation.children)
      ) {
        return React.cloneElement(switchAnimation.children, baseSwitchElement);
      }

      return baseSwitchElement;
    };

    // Render with inside labels (icons inside thumb position)
    if (showLabels === "inside" && (offLabel || onLabel)) {
      return (
        <div className="ds:relative ds:inline-grid ds:h-7 ds:w-fit grid-cols-[1fr_1fr] ds:items-center ds:text-sm ds:font-medium">
          {switchElement(
            "peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-14 [&_span]:z-10 [&_span]:size-6.5 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-7 [&_span]:data-[state=checked]:rtl:-translate-x-7"
          )}
          <span className="ds:pointer-events-none ds:relative ds:ml-0.5 ds:flex ds:min-w-8 ds:items-center ds:justify-center ds:text-center ds:transition-transform ds:duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-6 peer-data-[state=unchecked]:rtl:-translate-x-6">
            {offLabel}
          </span>
          <span className="peer-data-[state=checked]:text-background ds:pointer-events-none ds:relative ds:flex ds:min-w-8 ds:items-center ds:justify-center ds:text-center ds:transition-transform ds:duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
            {onLabel}
          </span>
        </div>
      );
    }

    // Render with outside labels
    if (showLabels === "outside" && (offLabel || onLabel)) {
      return (
        <div
          className="ds:group ds:inline-flex ds:items-center ds:gap-2"
          data-state={isChecked ? "checked" : "unchecked"}
        >
          {offLabel && (
            <span
              className="ds:flex-1 cursor-pointer ds:text-sm ds:font-medium group-data-[state=checked]:text-muted-foreground/70"
              onClick={() => handleCheckedChange(false)}
            >
              {offLabel}
            </span>
          )}
          {switchElement()}
          {onLabel && (
            <span
              className="ds:flex-1 cursor-pointer ds:text-sm ds:font-medium group-data-[state=unchecked]:text-muted-foreground/70"
              onClick={() => handleCheckedChange(true)}
            >
              {onLabel}
            </span>
          )}
        </div>
      );
    }

    // Render with label (outside wrap)
    if (label) {
      const isVertical = labelPosition === "top" || labelPosition === "bottom";
      const flexDirection = isVertical ? "flex-col" : "flex-row";
      const alignItems = isVertical ? "items-start" : "items-center";
      const labelFirst = labelPosition === "left" || labelPosition === "top";

      return (
        <div className={cn("ds:flex ds:gap-2", flexDirection, alignItems)}>
          {labelFirst && <label htmlFor={id}>{label}</label>}
          {switchElement()}
          {!labelFirst && <label htmlFor={id}>{label}</label>}
        </div>
      );
    }

    // Default render
    return switchElement();
  }
);

Switch.displayName = "Switch";
export default Switch;
