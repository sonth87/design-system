"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    option:
      "ds:data-[state=checked]:border-primary ds:data-[state=checked]:bg-primary ds:data-[state=checked]:text-primary-foreground ds:hover:border-primary ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-primary ds:data-[state=checked]:bg-primary ds:data-[state=checked]:text-primary-foreground ds:hover:border-primary ds:transition-colors",
  },
  secondary: {
    option:
      "ds:data-[state=checked]:border-secondary ds:data-[state=checked]:bg-secondary ds:data-[state=checked]:text-secondary-foreground ds:hover:border-secondary ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-secondary ds:data-[state=checked]:bg-secondary ds:data-[state=checked]:text-secondary-foreground ds:hover:border-secondary ds:transition-colors",
  },
  accent: {
    option:
      "ds:data-[state=checked]:border-accent ds:data-[state=checked]:bg-accent ds:data-[state=checked]:text-accent-foreground ds:hover:border-accent ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-accent ds:data-[state=checked]:bg-accent ds:data-[state=checked]:text-accent-foreground ds:hover:border-accent ds:transition-colors",
  },
  destructive: {
    option:
      "ds:data-[state=checked]:border-destructive ds:data-[state=checked]:bg-destructive ds:data-[state=checked]:text-destructive-foreground ds:hover:border-destructive ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-destructive ds:data-[state=checked]:bg-destructive ds:data-[state=checked]:text-destructive-foreground ds:hover:border-destructive ds:transition-colors",
  },
  muted: {
    option:
      "ds:data-[state=checked]:border-muted ds:data-[state=checked]:bg-muted ds:data-[state=checked]:text-muted-foreground ds:hover:border-muted ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-muted ds:data-[state=checked]:bg-muted ds:data-[state=checked]:text-muted-foreground ds:hover:border-muted ds:transition-colors",
  },
  success: {
    option:
      "ds:data-[state=checked]:border-success ds:data-[state=checked]:bg-success ds:data-[state=checked]:text-success-foreground ds:hover:border-success ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-success ds:data-[state=checked]:bg-success ds:data-[state=checked]:text-success-foreground ds:hover:border-success ds:transition-colors",
  },
  error: {
    option:
      "ds:data-[state=checked]:border-error ds:data-[state=checked]:bg-error ds:data-[state=checked]:text-error-foreground ds:hover:border-error ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-error ds:data-[state=checked]:bg-error ds:data-[state=checked]:text-error-foreground ds:hover:border-error ds:transition-colors",
  },
  warning: {
    option:
      "ds:data-[state=checked]:border-warning ds:data-[state=checked]:bg-warning ds:data-[state=checked]:text-warning-foreground ds:hover:border-warning ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-warning ds:data-[state=checked]:bg-warning ds:data-[state=checked]:text-warning-foreground ds:hover:border-warning ds:transition-colors",
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

const radioGroupItemVariants = cva(
  "ds:border ds:border-input ds:text-primary ds:focus-visible:border-ring ds:focus-visible:ring-ring/50 ds:aria-invalid:ring-destructive/20 ds:dark:aria-invalid:ring-destructive/40 ds:aria-invalid:border-destructive ds:dark:bg-input/30 ds:aspect-square ds:size-4 ds:shrink-0 ds:rounded-full ds:shadow-xs ds:transition-[color,box-shadow] ds:outline-none ds:focus-visible:ring-[3px] ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:disabled:bg-input ds:disabled:border-input",
  {
    variants: {
      variant: {
        option: "",
        "button-group":
          "ds:border-0 ds:bg-transparent ds:aspect-auto ds:size-auto ds:rounded-none ds:first:rounded-l-md ds:last:rounded-r-md ds:border ds:border-input ds:hover:bg-accent ds:hover:text-accent-foreground ds:data-[state=checked]:bg-primary ds:data-[state=checked]:text-primary-foreground ds:data-[state=checked]:border-primary ds:data-[state=checked]:shadow-sm ds:focus-visible:ring-0 ds:px-3 ds:py-2 ds:text-sm ds:font-medium",
      },
      size: {
        default: "ds:size-4",
        sm: "ds:size-3",
        lg: "ds:size-5",
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
      variant: "option",
      size: "default",
      color: null,
    },
  }
);

const radioGroupVariants = cva("ds:grid ds:gap-3", {
  variants: {
    variant: {
      option: "",
      "button-group": "ds:flex ds:flex-row ds:gap-0",
    },
  },
  defaultVariants: {
    variant: "option",
  },
});

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root> &
  VariantProps<typeof radioGroupVariants>;

function RadioGroup({ className, variant, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(radioGroupVariants({ variant, className }))}
      {...props}
    />
  );
}

type RadioGroupItemProps = React.ComponentProps<
  typeof RadioGroupPrimitive.Item
> &
  VariantProps<typeof radioGroupItemVariants>;

function RadioGroupItem({
  className,
  variant,
  size,
  color,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        radioGroupItemVariants({ variant, size, color, className })
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="ds:relative ds:flex ds:items-center ds:justify-center"
      >
        {variant === "button-group" ? (
          <CircleIcon className="ds:fill-current ds:size-2" />
        ) : (
          <CircleIcon className="ds:fill-current ds:absolute ds:top-1/2 ds:left-1/2 ds:size-2 ds:-translate-x-1/2 ds:-translate-y-1/2" />
        )}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupProps,
  type RadioGroupItemProps,
};
