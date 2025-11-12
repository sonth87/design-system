"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    default:
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground hover:border-primary transition-colors",
    circle:
      "rounded-full data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground hover:border-primary transition-colors",
  },
  secondary: {
    default:
      "data-[state=checked]:bg-secondary data-[state=checked]:border-secondary data-[state=checked]:text-secondary-foreground data-[state=indeterminate]:bg-secondary data-[state=indeterminate]:border-secondary data-[state=indeterminate]:text-secondary-foreground hover:border-primary transition-colors",
    circle:
      "rounded-full data-[state=checked]:bg-secondary data-[state=checked]:border-secondary data-[state=checked]:text-secondary-foreground data-[state=indeterminate]:bg-secondary data-[state=indeterminate]:border-secondary data-[state=indeterminate]:text-secondary-foreground hover:border-primary transition-colors",
  },
  accent: {
    default:
      "data-[state=checked]:bg-accent data-[state=checked]:border-accent data-[state=checked]:text-accent-foreground data-[state=indeterminate]:bg-accent data-[state=indeterminate]:border-accent data-[state=indeterminate]:text-accent-foreground hover:border-primary transition-colors",
    circle:
      "rounded-full data-[state=checked]:bg-accent data-[state=checked]:border-accent data-[state=checked]:text-accent-foreground data-[state=indeterminate]:bg-accent data-[state=indeterminate]:border-accent data-[state=indeterminate]:text-accent-foreground hover:border-primary transition-colors",
  },
  destructive: {
    default:
      "data-[state=checked]:bg-destructive data-[state=checked]:border-destructive data-[state=checked]:text-destructive-foreground data-[state=indeterminate]:bg-destructive data-[state=indeterminate]:border-destructive data-[state=indeterminate]:text-destructive-foreground hover:border-primary transition-colors",
    circle:
      "rounded-full data-[state=checked]:bg-destructive data-[state=checked]:border-destructive data-[state=checked]:text-destructive-foreground data-[state=indeterminate]:bg-destructive data-[state=indeterminate]:border-destructive data-[state=indeterminate]:text-destructive-foreground hover:border-primary transition-colors",
  },
  muted: {
    default:
      "data-[state=checked]:bg-muted data-[state=checked]:border-muted data-[state=checked]:text-muted-foreground data-[state=indeterminate]:bg-muted data-[state=indeterminate]:border-muted data-[state=indeterminate]:text-muted-foreground hover:border-primary transition-colors",
    circle:
      "rounded-full data-[state=checked]:bg-muted data-[state=checked]:border-muted data-[state=checked]:text-muted-foreground data-[state=indeterminate]:bg-muted data-[state=indeterminate]:border-muted data-[state=indeterminate]:text-muted-foreground hover:border-primary transition-colors",
  },
  success: {
    default:
      "data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=checked]:text-success-foreground data-[state=indeterminate]:bg-success data-[state=indeterminate]:border-success data-[state=indeterminate]:text-success-foreground hover:border-primary transition-colors",
    circle:
      "rounded-full data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=checked]:text-success-foreground data-[state=indeterminate]:bg-success data-[state=indeterminate]:border-success data-[state=indeterminate]:text-success-foreground hover:border-primary transition-colors",
  },
  error: {
    default:
      "data-[state=checked]:bg-error data-[state=checked]:border-error data-[state=checked]:text-error-foreground data-[state=indeterminate]:bg-error data-[state=indeterminate]:border-error data-[state=indeterminate]:text-error-foreground hover:border-primary transition-colors",
    circle:
      "rounded-full data-[state=checked]:bg-error data-[state=checked]:border-error data-[state=checked]:text-error-foreground data-[state=indeterminate]:bg-error data-[state=indeterminate]:border-error data-[state=indeterminate]:text-error-foreground hover:border-primary transition-colors",
  },
  warning: {
    default:
      "data-[state=checked]:bg-warning data-[state=checked]:border-warning data-[state=checked]:text-warning-foreground data-[state=indeterminate]:bg-warning data-[state=indeterminate]:border-warning data-[state=indeterminate]:text-warning-foreground hover:border-primary transition-colors",
    circle:
      "rounded-full data-[state=checked]:bg-warning data-[state=checked]:border-warning data-[state=checked]:text-warning-foreground data-[state=indeterminate]:bg-warning data-[state=indeterminate]:border-warning data-[state=indeterminate]:text-warning-foreground hover:border-primary transition-colors",
  },
};

const iconColorVariants = {
  primary: {
    default:
      "group-data-[state=unchecked]:stroke-1 group-data-[state=unchecked]:stroke-black/30 group-data-[state=unchecked]:fill-transparent hover:stroke-primary hover:fill-primary/20 dark:hover:fill-primary/20 group-data-[state=checked]:fill-primary group-data-[state=checked]:hover:fill-primary group-data-[state=checked]:stroke-primary stroke-1 dark:fill-primary dark:stroke-primary",
  },
  secondary: {
    default:
      "data-[state=unchecked]:stroke-1 group-data-[state=unchecked]:stroke-black/30 data-[state=unchecked]:fill-transparent hover:stroke-secondary hover:fill-secondary/20 dark:hover:fill-secondary/20 group-data-[state=checked]:fill-secondary group-data-[state=checked]:hover:fill-secondary group-data-[state=checked]:stroke-secondary stroke-1 dark:fill-secondary dark:stroke-secondary",
  },
  accent: {
    default:
      "data-[state=unchecked]:stroke-1 group-data-[state=unchecked]:stroke-black/30 data-[state=unchecked]:fill-transparent hover:stroke-accent hover:fill-accent/20 dark:hover:fill-accent/20 group-data-[state=checked]:fill-accent group-data-[state=checked]:hover:fill-accent group-data-[state=checked]:stroke-accent stroke-1 dark:fill-accent dark:stroke-accent",
  },
  destructive: {
    default:
      "data-[state=unchecked]:stroke-1 group-data-[state=unchecked]:stroke-black/30 data-[state=unchecked]:fill-transparent hover:stroke-destructive hover:fill-destructive/20 dark:hover:fill-destructive/20 group-data-[state=checked]:fill-destructive group-data-[state=checked]:hover:fill-destructive group-data-[state=checked]:stroke-destructive stroke-1 dark:fill-destructive dark:stroke-destructive",
  },
  muted: {
    default:
      "data-[state=unchecked]:stroke-1 group-data-[state=unchecked]:stroke-black/30 data-[state=unchecked]:fill-transparent hover:stroke-muted hover:fill-muted/20 dark:hover:fill-muted/20 group-data-[state=checked]:fill-muted group-data-[state=checked]:hover:fill-muted group-data-[state=checked]:stroke-muted stroke-1 dark:fill-muted dark:stroke-muted",
  },
  success: {
    default:
      "data-[state=unchecked]:stroke-1 group-data-[state=unchecked]:stroke-black/30 data-[state=unchecked]:fill-transparent hover:stroke-success hover:fill-success/20 dark:hover:fill-success/20 group-data-[state=checked]:fill-success group-data-[state=checked]:hover:fill-success group-data-[state=checked]:stroke-success stroke-1 dark:fill-success dark:stroke-success",
  },
  error: {
    default:
      "data-[state=unchecked]:stroke-1 group-data-[state=unchecked]:stroke-black/30 data-[state=unchecked]:fill-transparent hover:stroke-error hover:fill-error/20 dark:hover:fill-error/20 group-data-[state=checked]:fill-error group-data-[state=checked]:hover:fill-error group-data-[state=checked]:stroke-error stroke-1 dark:fill-error dark:stroke-error",
  },
  warning: {
    default:
      "data-[state=unchecked]:stroke-1 group-data-[state=unchecked]:stroke-black/30 data-[state=unchecked]:fill-transparent hover:stroke-warning hover:fill-warning/20 dark:hover:fill-warning/20 group-data-[state=checked]:fill-warning group-data-[state=checked]:hover:fill-warning group-data-[state=checked]:stroke-warning stroke-1 dark:fill-warning dark:stroke-warning",
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

const checkboxVariants = cva(
  "peer border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        circle: "border-2",
      },
      size: {
        sm: "min-w-4 min-h-4 [&_svg]:min-w-3 [&_svg]:min-h-3",
        default: "min-w-5 min-h-5 [&_svg]:min-w-4 [&_svg]:min-h-4",
        lg: "min-w-6 min-h-6 [&_svg]:min-w-5 [&_svg]:min-h-5",
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
      color: null,
    },
  },
);

function Checkbox({
  className,
  variant,
  size,
  color,
  icon,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants> & {
    icon?: React.ReactNode;
  }) {
  const iconClass = color ? iconColorVariants[color].default : "";
  const iconSizeClass = {
    sm: "min-w-5 min-h-5",
    default: "min-w-6 min-h-6",
    lg: "min-w-7 min-h-7",
  }[size || "default"];

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        checkboxVariants({
          variant,
          size,
          color,
          className,
        }),
        {
          "group focus-visible:ring-ring/50 outline-none focus-visible:ring-3 !border-none !bg-transparent shadow-none":
            icon,
        },
      )}
      {...props}
    >
      {icon ? (
        React.isValidElement(icon) ? (
          React.cloneElement(
            icon as React.ReactElement<{ className?: string }>,
            {
              className: cn(
                (icon as React.ReactElement<{ className?: string }>).props
                  .className,
                color ? iconClass : "",
                iconSizeClass,
              ),
            },
          )
        ) : (
          icon
        )
      ) : (
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center text-current transition-none"
        >
          {props.checked === "indeterminate" ? (
            <MinusIcon className="size-3.5" />
          ) : (
            <CheckIcon className="size-3.5" />
          )}
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
