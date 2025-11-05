import React, { useMemo } from "react";
import { Switch as SSwitch } from "@dsui/ui/components/switch";
import { cn } from "@dsui/ui/lib/utils";
import type { BasicAnimation } from "@/types/variables";
import { animationEffect } from "@/utils/css";

export type SwitchProps = React.ComponentProps<typeof SSwitch> & {
  animation?: BasicAnimation;
  label?: React.ReactNode;
  labelPosition?: "left" | "right" | "top" | "bottom";
  offLabel?: React.ReactNode;
  onLabel?: React.ReactNode;
  showLabels?: "outside" | "inside" | "none";
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

    const switchAnimation = useMemo<{
      className?: string;
      style?: React.CSSProperties;
      children?: React.ReactNode;
    } | null>(() => {
      if (!animation) return null;
      return animationEffect({
        animation,
        className,
      });
    }, [animation, className]);

    const switchElement = (switchClassName?: string) => (
      <SSwitch
        ref={ref}
        id={id}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        className={cn(className, switchClassName, switchAnimation?.className)}
        // thumbClassName={cn(switchAnimation?.className)}
        {...rest}
      />
    );

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
          {labelFirst && (
            <label className="text-sm font-medium cursor-pointer" htmlFor={id}>
              {label}
            </label>
          )}
          {switchElement()}
          {!labelFirst && (
            <label className="text-sm font-medium cursor-pointer" htmlFor={id}>
              {label}
            </label>
          )}
        </div>
      );
    }

    // Default render
    return switchElement();
  }
);

Switch.displayName = "Switch";
export default Switch;
