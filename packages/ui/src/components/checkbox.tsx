"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    default:
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
    outline:
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  },
  secondary: {
    default:
      "data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground",
    outline:
      "data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground",
  },
  accent: {
    default:
      "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
    outline:
      "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
  },
  destructive: {
    default:
      "data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground",
    outline:
      "data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground",
  },
  muted: {
    default:
      "data-[state=checked]:bg-muted data-[state=checked]:text-muted-foreground",
    outline:
      "data-[state=checked]:bg-muted data-[state=checked]:text-muted-foreground",
  },
  success: {
    default:
      "data-[state=checked]:bg-success data-[state=checked]:text-success-foreground",
    outline:
      "data-[state=checked]:bg-success data-[state=checked]:text-success-foreground",
  },
  error: {
    default:
      "data-[state=checked]:bg-error data-[state=checked]:text-error-foreground",
    outline:
      "data-[state=checked]:bg-error data-[state=checked]:text-error-foreground",
  },
  warning: {
    default:
      "data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground",
    outline:
      "data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground",
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

const checkboxVariants = cva(
  "peer border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
      },
      size: {
        default: "size-4",
        sm: "size-3",
        lg: "size-5",
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
  }
);

function Checkbox({
  className,
  variant,
  size,
  color,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ variant, size, color, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
