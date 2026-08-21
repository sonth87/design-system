"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    default:
      "ds:data-[state=on]:bg-primaryA-500 ds:data-[state=on]:text-white",
    outline:
      "ds:data-[state=on]:bg-primaryA-500 ds:data-[state=on]:text-white",
  },
  secondary: {
    default:
      "ds:data-[state=on]:bg-primaryC-500 ds:data-[state=on]:text-white",
    outline:
      "ds:data-[state=on]:bg-primaryC-500 ds:data-[state=on]:text-white",
  },
  accent: {
    default: "ds:data-[state=on]:bg-ink200 ds:data-[state=on]:text-ink900",
    outline: "ds:data-[state=on]:bg-ink200 ds:data-[state=on]:text-ink900",
  },
  destructive: {
    default:
      "ds:data-[state=on]:bg-red600 ds:data-[state=on]:text-white",
    outline:
      "ds:data-[state=on]:bg-red600 ds:data-[state=on]:text-white",
  },
  muted: {
    default: "ds:data-[state=on]:bg-ink200 ds:data-[state=on]:text-ink700",
    outline: "ds:data-[state=on]:bg-ink200 ds:data-[state=on]:text-ink700",
  },
  success: {
    default:
      "ds:data-[state=on]:bg-green500 ds:data-[state=on]:text-white",
    outline:
      "ds:data-[state=on]:bg-green500 ds:data-[state=on]:text-white",
  },
  error: {
    default: "ds:data-[state=on]:bg-red500 ds:data-[state=on]:text-white",
    outline: "ds:data-[state=on]:bg-red500 ds:data-[state=on]:text-white",
  },
  warning: {
    default:
      "ds:data-[state=on]:bg-orange500 ds:data-[state=on]:text-white",
    outline:
      "ds:data-[state=on]:bg-orange500 ds:data-[state=on]:text-white",
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
  "ds:inline-flex ds:items-center ds:justify-center ds:gap-2 ds:rounded-md ds:text-sm ds:font-medium ds:hover:bg-ink200 ds:hover:text-ink700 ds:disabled:pointer-events-none ds:disabled:opacity-50 ds:[&_svg]:pointer-events-none ds:[&_svg:not([class*='size-'])]:size-4 ds:[&_svg]:shrink-0 ds:focus-visible:border-ink500 ds:focus-visible:ring-ink500/50 ds:focus-visible:ring-[3px] ds:outline-none ds:transition-[color,box-shadow] ds:aria-invalid:ring-red600/20 ds:dark:aria-invalid:ring-red600/40 ds:aria-invalid:border-red600 ds:whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "ds:bg-transparent",
        outline:
          "ds:border ds:border-border ds:bg-transparent ds:shadow-xs ds:hover:bg-ink200 ds:hover:text-ink900",
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
