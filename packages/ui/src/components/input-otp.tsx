"use client";

import * as React from "react";
import {
  OTPInput,
  OTPInputContext,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@dsui/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputOTPSlotVariants = cva(
  "border-input relative flex items-center justify-center data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30",
  {
    variants: {
      variant: {
        outlined:
          "border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        underlined: "border-b-2",
      },
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        normal: "h-9 w-9",
        lg: "h-11 w-11 text-base",
        xl: "h-14 w-14 text-lg",
      },
      state: {
        default: "",
        success:
          "border-success ring-success/30 data-[active=true]:border-success data-[active=true]:ring-success/50",
        error:
          "border-destructive ring-destructive/30 data-[active=true]:border-destructive data-[active=true]:ring-destructive/50",
        warning:
          "border-warning ring-warning/30 data-[active=true]:border-warning data-[active=true]:ring-warning/50",
      },
    },
    defaultVariants: {
      size: "normal",
      state: "default",
      variant: "outlined",
    },
  }
);

type InputOTPProps = React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
};

function InputOTP({ className, containerClassName, ...props }: InputOTPProps) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={containerClassName}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

type InputOTPSlotProps = React.ComponentProps<"div"> & {
  index: number;
} & VariantProps<typeof inputOTPSlotVariants>;

function InputOTPSlot({
  index,
  className,
  size = "normal",
  state = "default",
  variant = "outlined",
  ...props
}: InputOTPSlotProps) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(inputOTPSlotVariants({ size, state, variant }), className)}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  inputOTPSlotVariants,
  type InputOTPProps,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
};
