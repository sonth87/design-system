import React, { useState } from "react";
import { Checkbox as SCheckbox } from "@dsui/ui/components/checkbox";
import { cn } from "@dsui/ui/index";
import { Tooltip } from "../Tooltip/Tooltip";
import { Label } from "../Label";
import { Info } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { ConfettiPiece } from "@/utils/css";

export type CheckboxProps = React.ComponentProps<typeof SCheckbox> & {
  label?: React.ReactNode;
  labelPosition?: "top" | "left" | "right" | "bottom";
  labelAlignment?: "start" | "center" | "end";
  infoTooltip?: React.ReactNode;
  helperText?: React.ReactNode;
  state?: "default" | "error" | "success" | "warning";
  icon?: React.ReactNode;
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
      ...rest
    } = props;
    const [showConfetti, setShowConfetti] = useState(false);
    const generatedId = React.useId();
    const inputId = id || generatedId;

    // State
    const helperTextStyles = {
      default: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
    };

    const handleCheckedChange = (checked: boolean) => {
      if (checked) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 800);
      }
    };

    const isVertical = labelPosition === "top" || labelPosition === "bottom";
    const flexDirection = isVertical ? "flex-col" : "flex-row";
    const gapClass = isVertical ? "gap-1.5" : "gap-2";

    const alignmentClass =
      labelAlignment === "start"
        ? "items-start"
        : labelAlignment === "center"
          ? "items-center"
          : "items-end";

    const labelClass =
      "flex gap-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

    return (
      <div className={cn("flex flex-col gap-1.5 relative", {})}>
        <div className={cn("flex", flexDirection, gapClass, alignmentClass)}>
          {(labelPosition === "top" || labelPosition === "left") && label && (
            <label htmlFor={inputId} className={labelClass}>
              {label}
              {infoTooltip && (
                <Tooltip content={infoTooltip}>
                  <Info className="size-3.5 min-w-3.5" />
                </Tooltip>
              )}
            </label>
          )}

          <div className="relative inline-flex">
            <SCheckbox
              ref={ref}
              id={inputId}
              {...rest}
              variant={variant}
              size={size}
              color={color}
              icon={icon}
              onCheckedChange={(checked) => {
                if (animation) handleCheckedChange(!!checked);
                rest?.onCheckedChange?.(checked);
              }}
            />

            <AnimatePresence>
              {showConfetti && (
                <div className="pointer-events-none absolute inset-0">
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
                    <Info className="size-3.5 min-w-3.5" />
                  </Tooltip>
                )}
              </Label>
            )}
        </div>

        {helperText && (
          <div className="flex items-center justify-between text-xs gap-2">
            {helperText && (
              <p
                className={cn(
                  "text-xs",
                  state ? helperTextStyles?.[state] : "",
                )}
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
