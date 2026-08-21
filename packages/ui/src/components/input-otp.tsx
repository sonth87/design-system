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
  "ds:border-border ds:relative ds:flex ds:items-center ds:justify-center ds:data-[active=true]:border-ink500 ds:data-[active=true]:ring-ink500/50 ds:data-[active=true]:aria-invalid:ring-red600/20 ds:dark:data-[active=true]:aria-invalid:ring-red600/40 ds:aria-invalid:border-red600 ds:data-[active=true]:aria-invalid:border-red600 ds:dark:bg-border/30",
  {
    variants: {
      variant: {
        outlined:
          "ds:border-y ds:border-r ds:text-sm ds:shadow-xs ds:transition-all ds:outline-none ds:first:rounded-l-md ds:first:border-l ds:last:rounded-r-md ds:data-[active=true]:z-10 ds:data-[active=true]:ring-[3px]",
        underlined: "ds:border-b-2",
      },
      size: {
        xs: "ds:h-6 ds:w-6 ds:text-xs",
        sm: "ds:h-8 ds:w-8 ds:text-sm",
        normal: "ds:h-9 ds:w-9",
        lg: "ds:h-11 ds:w-11 ds:text-base",
        xl: "ds:h-14 ds:w-14 ds:text-lg",
      },
      state: {
        default: "",
        success:
          "ds:border-green500 ds:ring-green500/30 ds:data-[active=true]:border-green500 ds:data-[active=true]:ring-green500/50",
        error:
          "ds:border-red600 ds:ring-red600/30 ds:data-[active=true]:border-red600 ds:data-[active=true]:ring-red600/50",
        warning:
          "ds:border-orange500 ds:ring-orange500/30 ds:data-[active=true]:border-orange500 ds:data-[active=true]:ring-orange500/50",
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
      className={cn("ds:disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("ds:flex ds:items-center", className)}
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
        <div className="ds:pointer-events-none ds:absolute ds:inset-0 ds:flex ds:items-center ds:justify-center">
          <div className="ds:animate-caret-blink ds:bg-ink800 ds:h-4 ds:w-px ds:duration-1000" />
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
