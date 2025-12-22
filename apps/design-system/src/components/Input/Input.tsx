import React from "react";
import {
  Input as SInput,
  type InputProps as SInputProps,
} from "@dsui/ui/components/input";
import { cn } from "@dsui/ui/lib/utils";
import { FloatingLabel } from "@/components/FloatLabel";
import { Eye, EyeOff, ChevronDown, ChevronUp, Info, X } from "lucide-react";
import { withMask, type Options } from "use-mask-input";
import { Tooltip } from "../Tooltip/Tooltip";
import { Label } from "../Label";

// Re-export base input props to avoid external dependency issues
export type BaseInputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: "normal" | "sm" | "xs" | "lg" | "xl";
  state?: "default" | "success" | "error" | "warning";
};

export type InputProps = BaseInputProps & {
  label?: string;
  helperText?: React.ReactNode;
  isFloatLabel?: boolean;
  mask?: string;
  maskOptions?: {
    placeholder?: string;
    inputFormat?: string;
    outputFormat?: string;
    showMaskOnHover?: boolean;
    showMaskOnFocus?: boolean;
    separate?: boolean;
  } & Options;
  maxLength?: number;
  showCharCount?: boolean;
  infoTooltip?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      state,
      size,
      isFloatLabel,
      type,
      mask,
      maskOptions,
      maxLength,
      showCharCount,
      infoTooltip,
      clearable,
      onClear,
      prefixIcon,
      suffixIcon,
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

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length);
      if (props.onChange) props.onChange(e);
    };

    const handleClear = () => {
      if (innerRef.current) {
        innerRef.current.value = "";
        setCharCount(0);
        const event = {
          target: innerRef.current,
          currentTarget: innerRef.current,
        } as React.ChangeEvent<HTMLInputElement>;
        props.onChange?.(event);
        if (onClear) onClear();
      }
    };

    const inputId = React.useId();
    const innerRef = React.useRef<HTMLInputElement>(null);

    // Combine refs
    const combinedRef = React.useCallback(
      (element: HTMLInputElement | null) => {
        // Set innerRef
        if (innerRef) {
          (
            innerRef as React.MutableRefObject<HTMLInputElement | null>
          ).current = element;
        }

        // Apply mask if provided
        if (mask && element) {
          const maskRefCallback = withMask(mask, maskOptions);
          if (typeof maskRefCallback === "function") {
            maskRefCallback(element);
          }
        }
      },
      [mask, maskOptions]
    );

    // Expose ref to parent
    React.useImperativeHandle(ref, () => innerRef.current!);

    const [showPassword, setShowPassword] = React.useState(false);

    // State
    const helperTextStyles = {
      default: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
    };

    // Calculate current size
    const currentSize = isFloatLabel
      ? size === "xl" || size === "lg"
        ? size
        : "xl"
      : size || "normal";

    // Calculate padding based on size and icons
    const getPadding = () => {
      const sizeMap = {
        xs: { prefix: "pl-8", suffix: "pr-8" },
        sm: { prefix: "pl-9", suffix: "pr-9" },
        normal: { prefix: "pl-10", suffix: "pr-10" },
        lg: { prefix: "pl-11", suffix: "pr-11" },
        xl: { prefix: "pl-12", suffix: "pr-12" },
      };

      return sizeMap[currentSize as keyof typeof sizeMap] || sizeMap.normal;
    };

    const padding = getPadding();

    // Get icon size class based on current size
    const getIconSizeClass = () => {
      const sizeMap = {
        xs: "size-3",
        sm: "size-3.5",
        normal: "size-4",
        lg: "size-4",
        xl: "size-4",
      };
      return sizeMap[currentSize as keyof typeof sizeMap] || "size-4";
    };

    const iconSizeClass = getIconSizeClass();

    // Calculate right padding considering built-in icons
    const getRightPadding = () => {
      const hasBuiltInSuffix =
        type === "number" ||
        type === "password" ||
        type === "datetime" ||
        (clearable && (charCount > 0 || props?.value));

      if (hasBuiltInSuffix && suffixIcon) {
        return type === "password" &&
          clearable &&
          (charCount > 0 || props?.value)
          ? "pr-20" // password + clear + custom icon
          : "pr-16"; // one built-in + custom icon
      }

      if (hasBuiltInSuffix) {
        return type === "password" &&
          clearable &&
          (charCount > 0 || props?.value)
          ? "pr-16" // password + clear
          : "pr-10"; // single built-in icon
      }

      if (suffixIcon) {
        return padding.suffix;
      }

      return "";
    };

    // Icon position calculations
    const getIconPosition = () => {
      const sizeMap = {
        xs: { left: "left-2.5", right: "right-2.5" },
        sm: { left: "left-3", right: "right-3" },
        normal: { left: "left-3", right: "right-3" },
        lg: { left: "left-3.5", right: "right-3.5" },
        xl: { left: "left-4", right: "right-4" },
      };

      return sizeMap[currentSize as keyof typeof sizeMap] || sizeMap.normal;
    };

    const iconPosition = getIconPosition();

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
      <div className={className}>
        <div
          className={cn("flex flex-col gap-1.5 relative flex-auto", {
            "floating-label relative": isFloatLabel,
          })}
        >
          {!isFloatLabel && label && (
            <Label
              htmlFor={inputId}
              className="flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
              {infoTooltip && (
                <Tooltip content={infoTooltip}>
                  <Info className="size-3.5 min-w-3.5" />
                </Tooltip>
              )}
            </Label>
          )}

          <div className="relative">
            {/* Prefix Icon */}
            {prefixIcon && (
              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-muted-foreground leading-0",
                  iconPosition.left
                )}
              >
                {React.isValidElement(prefixIcon)
                  ? React.cloneElement(prefixIcon, {
                      className: cn(
                        iconSizeClass,
                        (prefixIcon.props as any)?.className
                      ),
                    } as Partial<unknown>)
                  : prefixIcon}
              </div>
            )}

            <SInput
              ref={combinedRef}
              id={inputId}
              className={cn(
                "peer",
                {
                  "pt-5 pb-1": isFloatLabel && size !== "lg",
                  "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] pr-8":
                    type === "number",
                  // "[-webkit-text-fill-color:var(--foreground)]": mask,
                },
                prefixIcon && padding.prefix,
                mask && "placeholder:text-slate-400 placeholder:opacity-100",
                getRightPadding()
                // className,
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
                type === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              placeholder={placeholder}
              maxLength={maxLength}
              onChange={handleInput}
              {...props}
            />
            {isFloatLabel && (
              <FloatingLabel
                htmlFor={inputId}
                size={size}
                infoTooltip={infoTooltip}
              >
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

            {/* Clear Button */}
            {clearable &&
              (charCount > 0 || props?.value) &&
              !props.disabled &&
              type !== "number" && (
                <button
                  type="button"
                  tabIndex={-1}
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2 p-1 rounded hover:bg-accent transition-colors cursor-pointer",
                    type === "password"
                      ? suffixIcon
                        ? "right-14"
                        : "right-10"
                      : suffixIcon
                        ? "right-10"
                        : "right-2"
                  )}
                  onClick={handleClear}
                  disabled={props.disabled}
                >
                  <X className="size-4" />
                </button>
              )}

            {/* Show/Hide Password Button */}
            {type === "password" && (
              <button
                type="button"
                tabIndex={-1}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 p-1 rounded hover:bg-accent transition-colors",
                  suffixIcon ? "right-10" : "right-2"
                )}
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

            {/* Suffix Icon */}
            {suffixIcon && (
              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2 text-muted-foreground leading-0",
                  iconPosition.right
                )}
              >
                {React.isValidElement(suffixIcon)
                  ? React.cloneElement(suffixIcon, {
                      className: cn(
                        iconSizeClass,
                        (suffixIcon.props as any)?.className
                      ),
                    } as Partial<unknown>)
                  : suffixIcon}
              </div>
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
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
