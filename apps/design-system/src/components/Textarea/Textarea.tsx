import React from "react";
import {
  Textarea as STextarea,
  type TextareaProps as STextareaProps,
} from "@dsui/ui/components/textarea";
import { cn } from "@dsui/ui/lib/utils";
import { Info, X } from "lucide-react";
import { Tooltip } from "../Tooltip/Tooltip";
import { FloatingLabel } from "@/components/FloatLabel";
import { Label } from "../Label";

export type TextareaProps = Omit<
  STextareaProps,
  "onChange" | "size" | "state"
> & {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  state?: "default" | "success" | "warning" | "error";
  label?: string;
  helperText?: React.ReactNode;
  isFloatLabel?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  infoTooltip?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  required?: boolean;
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
      clearable,
      onClear,
      placeholder = " ",
      onChange,
      required,
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
      onChange?.(e);
    };

    const textareaId = React.useId();
    const innerRef = React.useRef<HTMLTextAreaElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => innerRef.current!);

    const handleClear = () => {
      if (innerRef.current) {
        innerRef.current.value = "";
        setCharCount(0);
        const event = new Event("input", { bubbles: true });
        innerRef.current.dispatchEvent(event);
        if (onClear) onClear();
      }
    };

    // State
    const helperTextStyles = {
      default: "ds:text-ink700",
      success: "ds:text-green500",
      warning: "ds:text-orange500",
      error: "ds:text-red500",
    };

    return (
      <div className={className}>
        <div
          className={cn("ds:flex ds:flex-col ds:gap-1.5 ds:relative", {
            "ds:floating-label": isFloatLabel,
          })}
        >
          {!isFloatLabel && label && (
            <Label
              htmlFor={textareaId}
              className="ds:flex ds:gap-2 ds:text-sm ds:font-medium ds:leading-none ds:peer-disabled:cursor-not-allowed ds:peer-disabled:opacity-70"
            >
              <span>
                {label}
                {required && <span className="ds:text-red500 ds:ml-0.5">*</span>}
              </span>
              {infoTooltip && (
                <Tooltip content={infoTooltip}>
                  <Info className="ds:size-3.5 ds:min-w-3.5" />
                </Tooltip>
              )}
            </Label>
          )}

          <div className="ds:relative">
            <STextarea
              ref={innerRef}
              id={textareaId}
              className={cn(
                "ds:peer ds:resize-y",
                {
                  "ds:pt-6 ds:pb-2": isFloatLabel && (size === "lg" || size === "xl"),
                  "ds:pt-6 ds:pb-1": isFloatLabel && size !== "lg" && size !== "xl",
                  "ds:text-lg": (size === "xl" || size === "lg") && !isFloatLabel,
                },
                clearable && charCount > 0 && "ds:pr-10"
                // className
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
              required={required}
              {...props}
            />
            {isFloatLabel && (
              <FloatingLabel
                htmlFor={textareaId}
                size={size}
                infoTooltip={infoTooltip}
                required={required}
                className="ds:peer-placeholder-shown:items-start"
              >
                {label}
              </FloatingLabel>
            )}

            {/* Clear Button */}
            {clearable && charCount > 0 && (
              <button
                type="button"
                tabIndex={-1}
                className={cn(
                  "ds:absolute ds:top-2 ds:right-2 ds:p-1 ds:rounded ds:hover:bg-ink200 ds:transition-colors"
                )}
                onClick={handleClear}
                disabled={props.disabled}
              >
                <X className="ds:size-4" />
              </button>
            )}
          </div>

          {(helperText || (showCharCount && typeof maxLength === "number")) && (
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
              {showCharCount && typeof maxLength === "number" && (
                <span className="ds:ml-auto ds:text-ink700">
                  {charCount} / {maxLength}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
