import React, { useMemo } from "react";
import {
  Switch as SSwitch,
  switchVariants,
  type SwitchVariant,
} from "@dsui/ui/components/switch";
import { cn } from "@dsui/ui/lib/utils";
import type { SwitchAnimation } from "@/types/variables";
import { animationEffect } from "@/utils/animations";
import Glass from "../Glass/Glass";

export type SwitchProps = React.ComponentProps<typeof SSwitch> & {
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
            className={cn("hover:scale-110 [&_span]:opacity-80", roundedClass)}
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
        <div className="relative inline-grid h-7 w-fit grid-cols-[1fr_1fr] items-center text-sm font-medium">
          {switchElement(
            "peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-14 [&_span]:z-10 [&_span]:size-6.5 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-7 [&_span]:data-[state=checked]:rtl:-translate-x-7"
          )}
          <span className="pointer-events-none relative ml-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-6 peer-data-[state=unchecked]:rtl:-translate-x-6">
            {offLabel}
          </span>
          <span className="peer-data-[state=checked]:text-background pointer-events-none relative flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
            {onLabel}
          </span>
        </div>
      );
    }

    // Render with outside labels
    if (showLabels === "outside" && (offLabel || onLabel)) {
      return (
        <div
          className="group inline-flex items-center gap-2"
          data-state={isChecked ? "checked" : "unchecked"}
        >
          {offLabel && (
            <span
              className="flex-1 cursor-pointer text-sm font-medium group-data-[state=checked]:text-muted-foreground/70"
              onClick={() => handleCheckedChange(false)}
            >
              {offLabel}
            </span>
          )}
          {switchElement()}
          {onLabel && (
            <span
              className="flex-1 cursor-pointer text-sm font-medium group-data-[state=unchecked]:text-muted-foreground/70"
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
        <div className={cn("flex gap-2", flexDirection, alignItems)}>
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
