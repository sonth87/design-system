"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    default: "ds:data-[state=on]:bg-primary ds:data-[state=on]:text-primary-foreground",
    outline: "ds:data-[state=on]:bg-primary ds:data-[state=on]:text-primary-foreground",
  },
  secondary: {
    default: "ds:data-[state=on]:bg-secondary ds:data-[state=on]:text-secondary-foreground",
    outline: "ds:data-[state=on]:bg-secondary ds:data-[state=on]:text-secondary-foreground",
  },
  accent: {
    default: "ds:data-[state=on]:bg-accent ds:data-[state=on]:text-accent-foreground",
    outline: "ds:data-[state=on]:bg-accent ds:data-[state=on]:text-accent-foreground",
  },
  destructive: {
    default: "ds:data-[state=on]:bg-destructive ds:data-[state=on]:text-destructive-foreground",
    outline: "ds:data-[state=on]:bg-destructive ds:data-[state=on]:text-destructive-foreground",
  },
  muted: {
    default: "ds:data-[state=on]:bg-muted ds:data-[state=on]:text-muted-foreground",
    outline: "ds:data-[state=on]:bg-muted ds:data-[state=on]:text-muted-foreground",
  },
  success: {
    default: "ds:data-[state=on]:bg-success ds:data-[state=on]:text-success-foreground",
    outline: "ds:data-[state=on]:bg-success ds:data-[state=on]:text-success-foreground",
  },
  error: {
    default: "ds:data-[state=on]:bg-error ds:data-[state=on]:text-error-foreground",
    outline: "ds:data-[state=on]:bg-error ds:data-[state=on]:text-error-foreground",
  },
  warning: {
    default: "ds:data-[state=on]:bg-warning ds:data-[state=on]:text-warning-foreground",
    outline: "ds:data-[state=on]:bg-warning ds:data-[state=on]:text-warning-foreground",
  },
};

const generateCompoundVariants = () => {
  const variants: Array<{
    variant: keyof typeof colorVariants.primary;
    color: keyof typeof colorVariants;
    className: string;
  }> = [];

  (Object.keys(colorVariants) as Array<keyof typeof colorVariants>).forEach(
    (color) => {
      (
        Object.keys(colorVariants[color]) as Array<
          keyof typeof colorVariants.primary
        >
      ).forEach((variant) => {
        variants.push({
          variant,
          color,
          className: colorVariants[color][variant],
        });
      });
    }
  );

  return variants;
};

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "ds:bg-transparent",
        outline: "ds:border ds:border-input ds:bg-transparent ds:shadow-xs ds:hover:bg-accent ds:hover:text-accent-foreground",
      },
      size: {
        default: "ds:h-9 ds:px-2 ds:min-w-9",
        sm: "ds:h-8 ds:px-1.5 ds:min-w-8",
        lg: "ds:h-10 ds:px-2.5 ds:min-w-10",
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
    compoundVariants: generateCompoundVariants(),
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "muted",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  color,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, color, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
