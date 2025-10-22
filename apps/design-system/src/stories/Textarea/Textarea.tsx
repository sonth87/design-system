import React from "react";
import { Textarea as STextarea } from "@dsui/ui/components/textarea";
import { cn } from "@dsui/ui/lib/utils";
import { Info } from "lucide-react";
import { Tooltip } from "../Tooltip/Tooltip";
import { FloatingLabel } from "../Input/FloatLabel";

export type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> & {
  label?: string;
  helperText?: string;
  isFloatLabel?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  infoTooltip?: React.ReactNode;
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  state?: "default" | "success" | "warning" | "error";
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      state,
      size = "normal",
      isFloatLabel,
      maxLength,
      showCharCount,
      infoTooltip,
      placeholder = " ",
      ...props
    },
    ref
  ) => {
    // Character count state
    const [charCount, setCharCount] = React.useState(() => {
      if (typeof props.value === "string") return props.value.length;
      if (typeof props.defaultValue === "string")
        return props.defaultValue.length;
      return 0;
    });

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (props.onChange) props.onChange(e);
    };

    const textareaId = React.useId();

    // State
    const helperTextStyles = {
      default: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
    };

    return (
      <div
        className={cn("flex flex-col gap-1.5 relative", {
          "floating-label": isFloatLabel,
        })}
      >
        {!isFloatLabel && label && (
          <label
            htmlFor={textareaId}
            className="flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {infoTooltip && (
              <Tooltip content={infoTooltip}>
                <Info className="size-3.5 min-w-3.5" />
              </Tooltip>
            )}
          </label>
        )}

        <div className="relative">
          <STextarea
            ref={ref}
            id={textareaId}
            className={cn(
              "peer resize-y",
              {
                "pt-6 pb-2": isFloatLabel && (size === "lg" || size === "xl"),
                "pt-6 pb-1": isFloatLabel && size !== "lg" && size !== "xl",
                "text-lg": (size === "xl" || size === "lg") && !isFloatLabel,
              },
              className
            )}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={handleInput}
            state={state}
            size={
              isFloatLabel
                ? size === "xl" || size === "lg"
                  ? size
                  : "xl"
                : size
            }
            {...props}
          />
          {isFloatLabel && (
            <FloatingLabel
              htmlFor={textareaId}
              size={size}
              infoTooltip={infoTooltip}
              className="peer-placeholder-shown:items-start"
            >
              {label}
            </FloatingLabel>
          )}
        </div>

        {(helperText || (showCharCount && typeof maxLength === "number")) && (
          <div className="flex items-center justify-between text-xs gap-2">
            {helperText && (
              <p
                className={cn(
                  "text-xs",
                  state ? helperTextStyles?.[state] : ""
                )}
              >
                {helperText}
              </p>
            )}
            {showCharCount && typeof maxLength === "number" && (
              <span className="ml-auto text-muted-foreground">
                {charCount} / {maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
