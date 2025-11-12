import React, { useId } from "react";

import {
  InputOTP as SInputOTP,
  InputOTPGroup,
  InputOTPSlot,
  type InputOTPProps as SInputOTPProps,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
  inputOTPSlotVariants,
} from "@dsui/ui/components/input-otp";
import { Label } from "@dsui/ui/components/label";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@dsui/ui/index";

type InputOTPProps = Omit<SInputOTPProps, "size" | "render" | "maxLength"> & {
  label?: React.ReactNode;
  length?: number;
  inputType?: "digits" | "chars" | "digits-and-chars";
  size?: VariantProps<typeof inputOTPSlotVariants>["size"];
  state?: VariantProps<typeof inputOTPSlotVariants>["state"];
  variant?: VariantProps<typeof inputOTPSlotVariants>["variant"];
  regexPattern?: string;
  helperText?: React.ReactNode;
  gapSize?: number;
  className?: string;
  rootClassName?: string;
  childClassName?: string;
};

const InputOTP = React.forwardRef<
  React.ElementRef<typeof SInputOTP>,
  InputOTPProps
>(
  (
    {
      label,
      inputType = "digits",
      regexPattern,
      length,
      size = "normal",
      state = "default",
      helperText,
      gapSize = 4,
      variant = "outlined",
      className,
      rootClassName,
      childClassName,
      ...rest
    },
    ref,
  ) => {
    const id = useId();

    const pattern =
      inputType === "digits"
        ? REGEXP_ONLY_DIGITS
        : inputType === "chars"
          ? REGEXP_ONLY_CHARS
          : inputType === "digits-and-chars"
            ? REGEXP_ONLY_DIGITS_AND_CHARS
            : undefined;

    const helperTextStyles = {
      default: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
    };

    return (
      <div className={cn("flex flex-col gap-1.5 relative", rootClassName)}>
        <Label htmlFor={id}>{label}</Label>
        <SInputOTP
          id={id}
          maxLength={length ?? 4}
          pattern={regexPattern ?? pattern}
          ref={ref}
          {...rest}
        >
          <InputOTPGroup
            className={cn(
              {
                "gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border":
                  variant === "outlined" && gapSize > 0,
              },
              className,
            )}
            style={gapSize > 0 ? { gap: `${gapSize}px` } : undefined}
          >
            {Array.from({ length: length ?? 4 }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                size={size}
                state={state ?? undefined}
                variant={variant}
                className={childClassName}
              />
            ))}
          </InputOTPGroup>
        </SInputOTP>
        {helperText && (
          <p className={cn("text-xs", state ? helperTextStyles?.[state] : "")}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

export default InputOTP;
