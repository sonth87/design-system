"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    checked: "ds:data-[state=checked]:bg-primary",
    unchecked: "ds:data-[state=unchecked]:bg-input ds:dark:data-[state=unchecked]:bg-input/80",
  },
  secondary: {
    checked: "ds:data-[state=checked]:bg-secondary",
    unchecked: "ds:data-[state=unchecked]:bg-secondary/30 ds:dark:data-[state=unchecked]:bg-secondary/20",
  },
  accent: {
    checked: "ds:data-[state=checked]:bg-accent",
    unchecked: "ds:data-[state=unchecked]:bg-accent/30 ds:dark:data-[state=unchecked]:bg-accent/20",
  },
  destructive: {
    checked: "ds:data-[state=checked]:bg-destructive",
    unchecked: "ds:data-[state=unchecked]:bg-destructive/30 ds:dark:data-[state=unchecked]:bg-destructive/20",
  },
  muted: {
    checked: "ds:data-[state=checked]:bg-muted",
    unchecked: "ds:data-[state=unchecked]:bg-muted ds:dark:data-[state=unchecked]:bg-muted/80",
  },
  success: {
    checked: "ds:data-[state=checked]:bg-success",
    unchecked: "ds:data-[state=unchecked]:bg-success/30 ds:dark:data-[state=unchecked]:bg-success/20",
  },
  error: {
    checked: "ds:data-[state=checked]:bg-error",
    unchecked: "ds:data-[state=unchecked]:bg-error/30 ds:dark:data-[state=unchecked]:bg-error/20",
  },
  warning: {
    checked: "ds:data-[state=checked]:bg-warning",
    unchecked: "ds:data-[state=unchecked]:bg-warning/30 ds:dark:data-[state=unchecked]:bg-warning/20",
  },
};

const switchVariants = cva(
  "peer outline-none focus-visible:border-ring focus-visible:ring-ring/50 inline-flex shrink-0 items-center border-2 border-transparent shadow-xs transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "ds:rounded-full",
        square1: "ds:rounded-sm",
        square2: "ds:rounded-none",
        mini: "ds:rounded-sm [&_span]:border-input ds:!h-3 ds:!w-8 ds:border-none [&_span]:size-4.5 [&_span]:border",
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
  "bg-background dark:data-[state=unchecked]:bg-foreground pointer-events-none block ring-0 transition-transform data-[state=unchecked]:translate-x-0",
  {
    variants: {
      variant: {
        default: "ds:rounded-full",
        square1: "ds:rounded-sm",
        square2: "ds:rounded-none",
        mini: "rounded-full data-[state=checked]:!translate-x-[calc(100%-2px)]",
      },
      size: {
        xs: "ds:size-3",
        sm: "ds:size-4",
        normal: "ds:size-5",
        lg: "ds:size-6",
        xl: "ds:size-7",
      },
      color: {
        primary: "ds:dark:data-[state=checked]:bg-primary-foreground",
        secondary: "ds:dark:data-[state=checked]:bg-secondary-foreground",
        accent: "ds:dark:data-[state=checked]:bg-accent-foreground",
        destructive: "ds:dark:data-[state=checked]:bg-destructive-foreground",
        muted: "ds:dark:data-[state=checked]:bg-muted-foreground",
        success: "ds:dark:data-[state=checked]:bg-success-foreground",
        error: "ds:dark:data-[state=checked]:bg-error-foreground",
        warning: "ds:dark:data-[state=checked]:bg-warning-foreground",
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
