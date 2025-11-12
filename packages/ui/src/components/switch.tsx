"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    checked: "data-[state=checked]:bg-primary",
    unchecked:
      "data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
  },
  secondary: {
    checked: "data-[state=checked]:bg-secondary",
    unchecked:
      "data-[state=unchecked]:bg-secondary/30 dark:data-[state=unchecked]:bg-secondary/20",
  },
  accent: {
    checked: "data-[state=checked]:bg-accent",
    unchecked:
      "data-[state=unchecked]:bg-accent/30 dark:data-[state=unchecked]:bg-accent/20",
  },
  destructive: {
    checked: "data-[state=checked]:bg-destructive",
    unchecked:
      "data-[state=unchecked]:bg-destructive/30 dark:data-[state=unchecked]:bg-destructive/20",
  },
  muted: {
    checked: "data-[state=checked]:bg-muted",
    unchecked:
      "data-[state=unchecked]:bg-muted dark:data-[state=unchecked]:bg-muted/80",
  },
  success: {
    checked: "data-[state=checked]:bg-success",
    unchecked:
      "data-[state=unchecked]:bg-success/30 dark:data-[state=unchecked]:bg-success/20",
  },
  error: {
    checked: "data-[state=checked]:bg-error",
    unchecked:
      "data-[state=unchecked]:bg-error/30 dark:data-[state=unchecked]:bg-error/20",
  },
  warning: {
    checked: "data-[state=checked]:bg-warning",
    unchecked:
      "data-[state=unchecked]:bg-warning/30 dark:data-[state=unchecked]:bg-warning/20",
  },
};

const switchVariants = cva(
  "peer outline-none focus-visible:border-ring focus-visible:ring-ring/50 inline-flex shrink-0 items-center border-2 border-transparent shadow-xs transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-full",
        square1: "rounded-sm",
        square2: "rounded-none",
        mini: "rounded-sm [&_span]:border-input !h-3 !w-8 border-none [&_span]:size-4.5 [&_span]:border",
      },
      size: {
        xs: "h-4 w-7",
        sm: "h-5 w-9",
        normal: "h-6 w-11",
        lg: "h-7 w-12",
        xl: "h-8 w-14",
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
      })),
    ),
    defaultVariants: {
      variant: "default",
      size: "normal",
      color: "primary",
    },
  },
);

const thumbVariants = cva(
  "bg-background dark:data-[state=unchecked]:bg-foreground pointer-events-none block ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      variant: {
        default: "rounded-full",
        square1: "rounded-sm",
        square2: "rounded-none",
        mini: "rounded-full data-[state=checked]:!translate-x-[calc(100%-2px)]",
      },
      size: {
        xs: "size-3",
        sm: "size-4",
        normal: "size-5",
        lg: "size-6",
        xl: "size-7",
      },
      color: {
        primary: "dark:data-[state=checked]:bg-primary-foreground",
        secondary: "dark:data-[state=checked]:bg-secondary-foreground",
        accent: "dark:data-[state=checked]:bg-accent-foreground",
        destructive: "dark:data-[state=checked]:bg-destructive-foreground",
        muted: "dark:data-[state=checked]:bg-muted-foreground",
        success: "dark:data-[state=checked]:bg-success-foreground",
        error: "dark:data-[state=checked]:bg-error-foreground",
        warning: "dark:data-[state=checked]:bg-warning-foreground",
      },
    },
    compoundVariants: [
      {
        size: "xs",
        className: "data-[state=checked]:translate-x-[0.75rem]",
      },
      {
        size: "sm",
        className: "data-[state=checked]:translate-x-[1rem]",
      },
      {
        size: "normal",
        className: "data-[state=checked]:translate-x-[1.25rem]",
      },
      {
        size: "lg",
        className: "data-[state=checked]:translate-x-[1.25rem]",
      },
      {
        size: "xl",
        className: "data-[state=checked]:translate-x-[1.45rem]",
      },
    ],
    defaultVariants: {
      size: "normal",
      color: "primary",
    },
  },
);

type SwitchVariant = VariantProps<typeof switchVariants>;

function Switch(
  props: React.ComponentProps<typeof SwitchPrimitive.Root> &
    VariantProps<typeof switchVariants> & {
      thumbClassName?: string;
    },
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
