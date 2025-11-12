"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    option:
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:border-primary transition-colors",
    "button-group":
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground hover:border-primary transition-colors",
  },
  secondary: {
    option:
      "data-[state=checked]:border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground hover:border-secondary transition-colors",
    "button-group":
      "data-[state=checked]:border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground hover:border-secondary transition-colors",
  },
  accent: {
    option:
      "data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground hover:border-accent transition-colors",
    "button-group":
      "data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground hover:border-accent transition-colors",
  },
  destructive: {
    option:
      "data-[state=checked]:border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground hover:border-destructive transition-colors",
    "button-group":
      "data-[state=checked]:border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground hover:border-destructive transition-colors",
  },
  muted: {
    option:
      "data-[state=checked]:border-muted data-[state=checked]:bg-muted data-[state=checked]:text-muted-foreground hover:border-muted transition-colors",
    "button-group":
      "data-[state=checked]:border-muted data-[state=checked]:bg-muted data-[state=checked]:text-muted-foreground hover:border-muted transition-colors",
  },
  success: {
    option:
      "data-[state=checked]:border-success data-[state=checked]:bg-success data-[state=checked]:text-success-foreground hover:border-success transition-colors",
    "button-group":
      "data-[state=checked]:border-success data-[state=checked]:bg-success data-[state=checked]:text-success-foreground hover:border-success transition-colors",
  },
  error: {
    option:
      "data-[state=checked]:border-error data-[state=checked]:bg-error data-[state=checked]:text-error-foreground hover:border-error transition-colors",
    "button-group":
      "data-[state=checked]:border-error data-[state=checked]:bg-error data-[state=checked]:text-error-foreground hover:border-error transition-colors",
  },
  warning: {
    option:
      "data-[state=checked]:border-warning data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground hover:border-warning transition-colors",
    "button-group":
      "data-[state=checked]:border-warning data-[state=checked]:bg-warning data-[state=checked]:text-warning-foreground hover:border-warning transition-colors",
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

const radioGroupItemVariants = cva(
  "border border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-input disabled:border-input",
  {
    variants: {
      variant: {
        option: "",
        "button-group":
          "border-0 bg-transparent aspect-auto size-auto rounded-none first:rounded-l-md last:rounded-r-md border border-input hover:bg-accent hover:text-accent-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=checked]:shadow-sm focus-visible:ring-0 px-3 py-2 text-sm font-medium",
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
      variant: "option",
      size: "default",
      color: null,
    },
  },
);

const radioGroupVariants = cva("grid gap-3", {
  variants: {
    variant: {
      option: "",
      "button-group": "flex flex-row gap-0",
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
        radioGroupItemVariants({ variant, size, color, className }),
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        {variant === "button-group" ? (
          <CircleIcon className="fill-current size-2" />
        ) : (
          <CircleIcon className="fill-current absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
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
