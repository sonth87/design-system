"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    default:
      "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
    outline:
      "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
  },
  secondary: {
    default:
      "data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground",
    outline:
      "data-[state=on]:bg-secondary data-[state=on]:text-secondary-foreground",
  },
  accent: {
    default: "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    outline: "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  },
  destructive: {
    default:
      "data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground",
    outline:
      "data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground",
  },
  muted: {
    default: "data-[state=on]:bg-muted data-[state=on]:text-muted-foreground",
    outline: "data-[state=on]:bg-muted data-[state=on]:text-muted-foreground",
  },
  success: {
    default:
      "data-[state=on]:bg-success data-[state=on]:text-success-foreground",
    outline:
      "data-[state=on]:bg-success data-[state=on]:text-success-foreground",
  },
  error: {
    default: "data-[state=on]:bg-error data-[state=on]:text-error-foreground",
    outline: "data-[state=on]:bg-error data-[state=on]:text-error-foreground",
  },
  warning: {
    default:
      "data-[state=on]:bg-warning data-[state=on]:text-warning-foreground",
    outline:
      "data-[state=on]:bg-warning data-[state=on]:text-warning-foreground",
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
    },
  );

  return variants;
};

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
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
      color: "primary",
    },
  },
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
