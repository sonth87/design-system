import React, { type ChangeEvent } from "react";
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
  required?: boolean;
  inputClassName?: string;
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
      required,
      inputClassName,
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
      default: "ds:text-muted-foreground",
      success: "ds:text-success",
      warning: "ds:text-warning",
      error: "ds:text-error",
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
        xs: { prefix: "ds:pl-8", suffix: "ds:pr-8" },
        sm: { prefix: "ds:pl-9", suffix: "ds:pr-9" },
        normal: { prefix: "ds:pl-10", suffix: "ds:pr-10" },
        lg: { prefix: "ds:pl-11", suffix: "ds:pr-11" },
        xl: { prefix: "ds:pl-12", suffix: "ds:pr-12" },
      };

      return sizeMap[currentSize as keyof typeof sizeMap] || sizeMap.normal;
    };

    const padding = getPadding();

    // Get icon size class based on current size
    const getIconSizeClass = () => {
      const sizeMap = {
        xs: "ds:size-3",
        sm: "ds:size-3.5",
        normal: "ds:size-4",
        lg: "ds:size-4",
        xl: "ds:size-4",
      };
      return sizeMap[currentSize as keyof typeof sizeMap] || "ds:size-4";
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
          ? "ds:pr-20" // password + clear + custom icon
          : "ds:pr-16"; // one built-in + custom icon
      }

      if (hasBuiltInSuffix) {
        return type === "password" &&
          clearable &&
          (charCount > 0 || props?.value)
          ? "ds:pr-16" // password + clear
          : "ds:pr-10"; // single built-in icon
      }

      if (suffixIcon) {
        return padding.suffix;
      }

      return "";
    };

    // Icon position calculations
    const getIconPosition = () => {
      const sizeMap = {
        xs: { left: "ds:left-2.5", right: "ds:right-2.5" },
        sm: { left: "ds:left-3", right: "ds:right-3" },
        normal: { left: "ds:left-3", right: "ds:right-3" },
        lg: { left: "ds:left-3.5", right: "ds:right-3.5" },
        xl: { left: "ds:left-4", right: "ds:right-4" },
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
        props.onChange?.(event as unknown as ChangeEvent<HTMLInputElement>);
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
        props.onChange?.(event as unknown as ChangeEvent<HTMLInputElement>);
      }
    };
    /* End Spinner Button Handlers */

    return (
      <div className={className}>
        <div
          className={cn("ds:flex ds:flex-col ds:gap-1.5 ds:relative ds:flex-auto", {
            "ds:floating-label ds:relative": isFloatLabel,
          })}
        >
          {!isFloatLabel && label && (
            <Label
              htmlFor={inputId}
              className="ds:flex ds:gap-2 ds:text-sm ds:font-medium ds:leading-none ds:peer-disabled:cursor-not-allowed ds:peer-disabled:opacity-70"
            >
              <span>
                {label}
                {required && <span className="ds:text-error ds:ml-0.5">*</span>}
              </span>
              {infoTooltip && (
                <Tooltip content={infoTooltip}>
                  <Info className="ds:size-3.5 ds:min-w-3.5" />
                </Tooltip>
              )}
            </Label>
          )}

          <div className="ds:relative">
            {/* Prefix Icon */}
            {prefixIcon && (
              <div
                className={cn(
                  "ds:absolute ds:top-1/2 ds:-translate-y-1/2 ds:text-muted-foreground ds:leading-0",
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
                "ds:peer",
                {
                  "ds:pt-5 ds:pb-1": isFloatLabel && size !== "lg",
                  "ds:[&::-webkit-outer-spin-button]:appearance-none ds:[&::-webkit-inner-spin-button]:appearance-none ds:[-moz-appearance:textfield] ds:pr-8":
                    type === "number",
                  // "[-webkit-text-fill-color:var(--foreground)]": mask,
                },
                prefixIcon && padding.prefix,
                mask && "ds:placeholder:text-slate-400 ds:placeholder:opacity-100",
                getRightPadding(),
                inputClassName,
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
              required={required}
              {...props}
            />
            {isFloatLabel && (
              <FloatingLabel
                htmlFor={inputId}
                size={size}
                infoTooltip={infoTooltip}
                required={required}
              >
                {label}
              </FloatingLabel>
            )}

            {/* Spinner Buttons */}
            {type === "number" && (
              <div className="ds:absolute ds:right-1 ds:top-0 ds:h-full ds:flex ds:flex-col ds:gap-0.5">
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={props.disabled}
                  className={cn(
                    "ds:h-1/2 ds:w-6 ds:flex ds:items-center ds:justify-center ds:rounded ds:cursor-pointer ds:hover:scale-150 ds:transition-transform",
                    "ds:disabled:opacity-50 ds:disabled:cursor-not-allowed ds:disabled:hover:bg-transparent"
                  )}
                  tabIndex={-1}
                >
                  <ChevronUp className="ds:size-3" />
                </button>
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={props.disabled}
                  className={cn(
                    "ds:h-1/2 ds:w-6 ds:flex ds:items-center ds:justify-center ds:rounded ds:cursor-pointer ds:hover:scale-150 ds:transition-transform",
                    "ds:disabled:opacity-50 ds:disabled:cursor-not-allowed ds:disabled:hover:bg-transparent"
                  )}
                  tabIndex={-1}
                >
                  <ChevronDown className="ds:size-3" />
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
                    "ds:absolute ds:top-1/2 ds:-translate-y-1/2 ds:p-1 ds:rounded ds:hover:bg-accent ds:transition-colors ds:cursor-pointer",
                    type === "password"
                      ? suffixIcon
                        ? "ds:right-14"
                        : "ds:right-10"
                      : suffixIcon
                        ? "ds:right-10"
                        : "ds:right-2"
                  )}
                  onClick={handleClear}
                  disabled={props.disabled}
                >
                  <X className="ds:size-4" />
                </button>
              )}

            {/* Show/Hide Password Button */}
            {type === "password" && (
              <button
                type="button"
                tabIndex={-1}
                className={cn(
                  "ds:absolute ds:top-1/2 ds:-translate-y-1/2 ds:p-1 ds:rounded ds:hover:bg-accent ds:transition-colors",
                  suffixIcon ? "ds:right-10" : "ds:right-2"
                )}
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={props.disabled}
              >
                {showPassword ? (
                  <EyeOff className="ds:size-4" />
                ) : (
                  <Eye className="ds:size-4" />
                )}
              </button>
            )}

            {/* Suffix Icon */}
            {suffixIcon && (
              <div
                className={cn(
                  "ds:absolute ds:top-1/2 ds:-translate-y-1/2 ds:text-muted-foreground ds:leading-0",
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
                <span className="ds:ml-auto ds:text-muted-foreground">
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
