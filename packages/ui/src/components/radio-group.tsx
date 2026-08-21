"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    option:
      "ds:data-[state=checked]:border-primaryA-500 ds:data-[state=checked]:bg-primaryA-500 ds:data-[state=checked]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-primaryA-500 ds:data-[state=checked]:bg-primaryA-500 ds:data-[state=checked]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
  },
  secondary: {
    option:
      "ds:data-[state=checked]:border-primaryC-500 ds:data-[state=checked]:bg-primaryC-500 ds:data-[state=checked]:text-white ds:hover:border-primaryC-500 ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-primaryC-500 ds:data-[state=checked]:bg-primaryC-500 ds:data-[state=checked]:text-white ds:hover:border-primaryC-500 ds:transition-colors",
  },
  accent: {
    option:
      "ds:data-[state=checked]:border-ink200 ds:data-[state=checked]:bg-ink200 ds:data-[state=checked]:text-ink900 ds:hover:border-ink200 ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-ink200 ds:data-[state=checked]:bg-ink200 ds:data-[state=checked]:text-ink900 ds:hover:border-ink200 ds:transition-colors",
  },
  destructive: {
    option:
      "ds:data-[state=checked]:border-red600 ds:data-[state=checked]:bg-red600 ds:data-[state=checked]:text-white ds:hover:border-red600 ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-red600 ds:data-[state=checked]:bg-red600 ds:data-[state=checked]:text-white ds:hover:border-red600 ds:transition-colors",
  },
  muted: {
    option:
      "ds:data-[state=checked]:border-ink200 ds:data-[state=checked]:bg-ink200 ds:data-[state=checked]:text-ink700 ds:hover:border-ink200 ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-ink200 ds:data-[state=checked]:bg-ink200 ds:data-[state=checked]:text-ink700 ds:hover:border-ink200 ds:transition-colors",
  },
  success: {
    option:
      "ds:data-[state=checked]:border-green500 ds:data-[state=checked]:bg-green500 ds:data-[state=checked]:text-white ds:hover:border-green500 ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-green500 ds:data-[state=checked]:bg-green500 ds:data-[state=checked]:text-white ds:hover:border-green500 ds:transition-colors",
  },
  error: {
    option:
      "ds:data-[state=checked]:border-red500 ds:data-[state=checked]:bg-red500 ds:data-[state=checked]:text-white ds:hover:border-red500 ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-red500 ds:data-[state=checked]:bg-red500 ds:data-[state=checked]:text-white ds:hover:border-red500 ds:transition-colors",
  },
  warning: {
    option:
      "ds:data-[state=checked]:border-orange500 ds:data-[state=checked]:bg-orange500 ds:data-[state=checked]:text-white ds:hover:border-orange500 ds:transition-colors",
    "button-group":
      "ds:data-[state=checked]:border-orange500 ds:data-[state=checked]:bg-orange500 ds:data-[state=checked]:text-white ds:hover:border-orange500 ds:transition-colors",
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
  "ds:border ds:border-border ds:text-primaryA-500 ds:focus-visible:border-ink500 ds:focus-visible:ring-ink500/50 ds:aria-invalid:ring-red600/20 ds:dark:aria-invalid:ring-red600/40 ds:aria-invalid:border-red600 ds:dark:bg-border/30 ds:aspect-square ds:size-4 ds:shrink-0 ds:rounded-full ds:shadow-xs ds:transition-[color,box-shadow] ds:outline-none ds:focus-visible:ring-[3px] ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:disabled:bg-border ds:disabled:border-border",
  {
    variants: {
      variant: {
        option: "",
        "button-group":
          "ds:border-0 ds:bg-transparent ds:aspect-auto ds:size-auto ds:rounded-none ds:first:rounded-l-md ds:last:rounded-r-md ds:border ds:border-border ds:hover:bg-ink200 ds:hover:text-ink900 ds:data-[state=checked]:bg-primaryA-500 ds:data-[state=checked]:text-white ds:data-[state=checked]:border-primaryA-500 ds:data-[state=checked]:shadow-sm ds:focus-visible:ring-0 ds:px-3 ds:py-2 ds:text-sm ds:font-medium",
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
