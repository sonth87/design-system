import React from "react";
import {
  Input as SInput,
  type InputProps as SInputProps,
} from "@dsui/ui/components/input";
import { cn } from "@dsui/ui/lib/utils";
import { FloatingLabel } from "./FloatLabel";
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";

export type InputProps = SInputProps & {
  label?: string;
  helperText?: string;
  isFloatLabel?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, helperText, state, size, isFloatLabel, type, ...props },
    ref
  ) => {
    const inputId = React.useId();
    const innerRef = React.useRef<HTMLInputElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => innerRef.current!);

    const [showPassword, setShowPassword] = React.useState(false);

    // State
    const helperTextStyles = {
      default: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
    };

    /* Spinner Button Handlers */
    const handleIncrement = () => {
      if (innerRef.current) {
        const step = Number(props.step || 1);
        const max = props.max ? Number(props.max) : Infinity;
        const currentValue = Number(innerRef.current.value || 0);
        const newValue = Math.min(currentValue + step, max);

        innerRef.current.value = String(newValue);
        const event = new Event("input", { bubbles: true });
        innerRef.current.dispatchEvent(event);
      }
    };

    const handleDecrement = () => {
      if (innerRef.current) {
        const step = Number(props.step || 1);
        const min = props.min ? Number(props.min) : -Infinity;
        const currentValue = Number(innerRef.current.value || 0);
        const newValue = Math.max(currentValue - step, min);

        innerRef.current.value = String(newValue);
        const event = new Event("input", { bubbles: true });
        innerRef.current.dispatchEvent(event);
      }
    };
    /* End Spinner Button Handlers */

    return (
      <div
        className={cn("flex w-full flex-col gap-1.5 relative", {
          "floating-label": isFloatLabel,
        })}
      >
        {!isFloatLabel && label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <SInput
            ref={innerRef}
            id={inputId}
            className={cn(
              "peer",
              {
                "pt-5 pb-1": isFloatLabel && (!size || size === "xl"),
                "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] pr-8":
                  type === "number",
                "pr-10": type === "password",
              },
              className
            )}
            state={state}
            size={
              isFloatLabel
                ? size === "xl" || size === "lg"
                  ? size
                  : "xl"
                : size
            }
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            {...props}
          />
          {isFloatLabel && (
            <FloatingLabel htmlFor={inputId} size={size}>
              {label}
            </FloatingLabel>
          )}

          {/* Spinner Buttons */}
          {type === "number" && (
            <div className="absolute right-1 top-0 h-full flex flex-col gap-0.5">
              <button
                type="button"
                onClick={handleIncrement}
                disabled={props.disabled}
                className={cn(
                  "h-1/2 w-6 flex items-center justify-center rounded cursor-pointer hover:scale-150 transition-transform",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                )}
                tabIndex={-1}
              >
                <ChevronUp className="size-3" />
              </button>
              <button
                type="button"
                onClick={handleDecrement}
                disabled={props.disabled}
                className={cn(
                  "h-1/2 w-6 flex items-center justify-center rounded cursor-pointer hover:scale-150 transition-transform",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                )}
                tabIndex={-1}
              >
                <ChevronDown className="size-3" />
              </button>
            </div>
          )}

          {/* Show/Hide Password Button */}
          {type === "password" && (
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-accent transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={props.disabled}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          )}
        </div>

        {helperText && (
          <p className={cn("text-xs", state ? helperTextStyles?.[state] : "")}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
