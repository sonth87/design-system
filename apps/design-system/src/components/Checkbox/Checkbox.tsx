import React, { useState } from "react";
import { Checkbox as SCheckbox } from "@dsui/ui/components/checkbox";
import { cn } from "@dsui/ui/index";
import { Tooltip } from "../Tooltip/Tooltip";
import { Label } from "../Label";
import { Info } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { ConfettiPiece } from "@/utils/css";
import type { CheckedState } from "@radix-ui/react-checkbox";

export type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof SCheckbox>,
  "onCheckedChange" | "variant" | "size" | "color" | "icon"
> & {
  onCheckedChange?: (checked: CheckedState) => void;
  variant?: "default" | "circle";
  size?: "sm" | "default" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "muted"
    | "success"
    | "error"
    | "warning";
  icon?: React.ReactNode;
  label?: React.ReactNode;
  labelPosition?: "top" | "left" | "right" | "bottom";
  labelAlignment?: "start" | "center" | "end";
  infoTooltip?: React.ReactNode;
  helperText?: React.ReactNode;
  state?: "default" | "error" | "success" | "warning";
  animation?: "confetti" | undefined;
};

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => {
    const {
      label,
      infoTooltip,
      helperText,
      state,
      variant = "default",
      size = "default",
      color,
      labelPosition = "right",
      labelAlignment = "center",
      icon,
      animation,
      id,
      onCheckedChange,
      ...rest
    } = props;
    const [showConfetti, setShowConfetti] = useState(false);
    const generatedId = React.useId();
    const inputId = id || generatedId;

    // State
    const helperTextStyles = {
      default: "ds:text-muted-foreground",
      success: "ds:text-success",
      warning: "ds:text-warning",
      error: "ds:text-error",
    };

    const handleCheckedChange = (checked: CheckedState) => {
      if (checked) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 800);
      }
      onCheckedChange?.(checked);
    };

    const isVertical = labelPosition === "top" || labelPosition === "bottom";
    const flexDirection = isVertical ? "flex-col" : "ds:flex-row";
    const gapClass = isVertical ? "gap-1.5" : "ds:gap-2";

    const alignmentClass =
      labelAlignment === "start"
        ? "items-start"
        : labelAlignment === "center"
          ? "items-center"
          : "ds:items-end";

    const labelClass =
      "flex gap-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

    return (
      <div className={cn("ds:flex ds:flex-col ds:gap-1.5 ds:relative", {})}>
        <div className={cn("ds:flex", flexDirection, gapClass, alignmentClass)}>
          {(labelPosition === "top" || labelPosition === "left") && label && (
            <label htmlFor={inputId} className={labelClass}>
              {label}
              {infoTooltip && (
                <Tooltip content={infoTooltip}>
                  <Info className="ds:size-3.5 ds:min-w-3.5" />
                </Tooltip>
              )}
            </label>
          )}

          <div className="ds:relative ds:inline-flex">
            <SCheckbox
              ref={ref}
              id={inputId}
              {...rest}
              variant={variant}
              size={size}
              color={color}
              icon={icon}
              onCheckedChange={
                animation ? handleCheckedChange : onCheckedChange
              }
            />

            <AnimatePresence>
              {showConfetti && (
                <div className="ds:pointer-events-none ds:absolute ds:inset-0">
                  {[...Array(12)].map((_, i) => (
                    <ConfettiPiece key={i} index={i} />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {(labelPosition === "bottom" || labelPosition === "right") &&
            label && (
              <Label htmlFor={inputId} className={labelClass}>
                {label}
                {infoTooltip && (
                  <Tooltip content={infoTooltip}>
                    <Info className="ds:size-3.5 ds:min-w-3.5" />
                  </Tooltip>
                )}
              </Label>
            )}
        </div>

        {helperText && (
          <div className="ds:flex ds:items-center ds:justify-between ds:text-xs ds:gap-2">
            {helperText && (
              <p
                className={cn(
                  "ds:text-xs",
                  state ? helperTextStyles?.[state] : ""
                )}
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
