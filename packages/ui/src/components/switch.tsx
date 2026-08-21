"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    checked: "ds:data-[state=checked]:bg-primaryA-500",
    unchecked:
      "ds:data-[state=unchecked]:bg-border ds:dark:data-[state=unchecked]:bg-border/80",
  },
  secondary: {
    checked: "ds:data-[state=checked]:bg-primaryC-500",
    unchecked:
      "ds:data-[state=unchecked]:bg-primaryC-500/30 ds:dark:data-[state=unchecked]:bg-primaryC-500/20",
  },
  accent: {
    checked: "ds:data-[state=checked]:bg-ink200",
    unchecked:
      "ds:data-[state=unchecked]:bg-ink200/30 ds:dark:data-[state=unchecked]:bg-ink200/20",
  },
  destructive: {
    checked: "ds:data-[state=checked]:bg-red600",
    unchecked:
      "ds:data-[state=unchecked]:bg-red600/30 ds:dark:data-[state=unchecked]:bg-red600/20",
  },
  muted: {
    checked: "ds:data-[state=checked]:bg-ink200",
    unchecked:
      "ds:data-[state=unchecked]:bg-ink200 ds:dark:data-[state=unchecked]:bg-ink200/80",
  },
  success: {
    checked: "ds:data-[state=checked]:bg-green500",
    unchecked:
      "ds:data-[state=unchecked]:bg-green500/30 ds:dark:data-[state=unchecked]:bg-green500/20",
  },
  error: {
    checked: "ds:data-[state=checked]:bg-red500",
    unchecked:
      "ds:data-[state=unchecked]:bg-red500/30 ds:dark:data-[state=unchecked]:bg-red500/20",
  },
  warning: {
    checked: "ds:data-[state=checked]:bg-orange500",
    unchecked:
      "ds:data-[state=unchecked]:bg-orange500/30 ds:dark:data-[state=unchecked]:bg-orange500/20",
  },
};

const switchVariants = cva(
  "ds:peer ds:outline-none ds:focus-visible:border-ink500 ds:focus-visible:ring-ink500/50 ds:inline-flex ds:shrink-0 ds:items-center ds:border-2 ds:border-transparent ds:shadow-xs ds:transition-all ds:focus-visible:ring-[3px] ds:disabled:cursor-not-allowed ds:disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "ds:rounded-full",
        square1: "ds:rounded-sm",
        square2: "ds:rounded-none",
        mini: "ds:rounded-sm ds:[&_span]:border-border ds:!h-3 ds:!w-8 ds:border-none ds:[&_span]:size-4.5 ds:[&_span]:border",
      },
      size: {
        xs: "ds:h-4 ds:w-7",
        sm: "ds:h-5 ds:w-9",
        normal: "ds:h-6 ds:w-11",
        lg: "ds:h-7 ds:w-12",
        xl: "ds:h-8 ds:w-14",
      },
      color: {
        primary: "",
        secondary: "",
        accent: "",
        destructive: "",
        muted: "",
        success: "",
        error: "",
        warning: "",
      },
    },
    compoundVariants: Object.entries(colorVariants).flatMap(([color, styles]) =>
      Object.entries(styles).map(([, className]) => ({
        color: color as keyof typeof colorVariants,
        className: className,
      }))
    ),
    defaultVariants: {
      variant: "default",
      size: "normal",
      color: "primary",
    },
  }
);

const thumbVariants = cva(
  "ds:bg-white ds:dark:data-[state=unchecked]:bg-ink800 ds:pointer-events-none ds:block ds:ring-0 ds:transition-transform ds:data-[state=unchecked]:translate-x-0",
  {
    variants: {
      variant: {
        default: "ds:rounded-full",
        square1: "ds:rounded-sm",
        square2: "ds:rounded-none",
        mini: "ds:rounded-full ds:data-[state=checked]:!translate-x-[calc(100%-2px)]",
      },
      size: {
        xs: "ds:size-3",
        sm: "ds:size-4",
        normal: "ds:size-5",
        lg: "ds:size-6",
        xl: "ds:size-7",
      },
      color: {
        primary: "ds:dark:data-[state=checked]:bg-white",
        secondary: "ds:dark:data-[state=checked]:bg-white",
        accent: "ds:dark:data-[state=checked]:bg-ink900",
        destructive: "ds:dark:data-[state=checked]:bg-white",
        muted: "ds:dark:data-[state=checked]:bg-ink700",
        success: "ds:dark:data-[state=checked]:bg-white",
        error: "ds:dark:data-[state=checked]:bg-white",
        warning: "ds:dark:data-[state=checked]:bg-white",
      },
    },
    compoundVariants: [
      {
        size: "xs",
        className: "ds:data-[state=checked]:translate-x-[0.75rem]",
      },
      {
        size: "sm",
        className: "ds:data-[state=checked]:translate-x-[1rem]",
      },
      {
        size: "normal",
        className: "ds:data-[state=checked]:translate-x-[1.25rem]",
      },
      {
        size: "lg",
        className: "ds:data-[state=checked]:translate-x-[1.25rem]",
      },
      {
        size: "xl",
        className: "ds:data-[state=checked]:translate-x-[1.45rem]",
      },
    ],
    defaultVariants: {
      size: "normal",
      color: "primary",
    },
  }
);

type SwitchVariant = VariantProps<typeof switchVariants>;

function Switch(
  props: React.ComponentProps<typeof SwitchPrimitive.Root> &
    VariantProps<typeof switchVariants> & {
      thumbClassName?: string;
    }
) {
  const { className, thumbClassName, variant, size, color, ...rest } = props;

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ variant, size, color, className }))}
      {...rest}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(thumbClassName, thumbVariants({ variant, size, color }))}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch, switchVariants, type SwitchVariant };
