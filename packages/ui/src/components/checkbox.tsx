"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    default:
      "ds:data-[state=checked]:bg-primary ds:data-[state=checked]:border-primary ds:data-[state=checked]:text-primary-foreground ds:data-[state=indeterminate]:bg-primary ds:data-[state=indeterminate]:border-primary ds:data-[state=indeterminate]:text-primary-foreground ds:hover:border-primary ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-primary ds:data-[state=checked]:border-primary ds:data-[state=checked]:text-primary-foreground ds:data-[state=indeterminate]:bg-primary ds:data-[state=indeterminate]:border-primary ds:data-[state=indeterminate]:text-primary-foreground ds:hover:border-primary ds:transition-colors",
  },
  secondary: {
    default:
      "ds:data-[state=checked]:bg-secondary ds:data-[state=checked]:border-secondary ds:data-[state=checked]:text-secondary-foreground ds:data-[state=indeterminate]:bg-secondary ds:data-[state=indeterminate]:border-secondary ds:data-[state=indeterminate]:text-secondary-foreground ds:hover:border-primary ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-secondary ds:data-[state=checked]:border-secondary ds:data-[state=checked]:text-secondary-foreground ds:data-[state=indeterminate]:bg-secondary ds:data-[state=indeterminate]:border-secondary ds:data-[state=indeterminate]:text-secondary-foreground ds:hover:border-primary ds:transition-colors",
  },
  accent: {
    default:
      "ds:data-[state=checked]:bg-accent ds:data-[state=checked]:border-accent ds:data-[state=checked]:text-accent-foreground ds:data-[state=indeterminate]:bg-accent ds:data-[state=indeterminate]:border-accent ds:data-[state=indeterminate]:text-accent-foreground ds:hover:border-primary ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-accent ds:data-[state=checked]:border-accent ds:data-[state=checked]:text-accent-foreground ds:data-[state=indeterminate]:bg-accent ds:data-[state=indeterminate]:border-accent ds:data-[state=indeterminate]:text-accent-foreground ds:hover:border-primary ds:transition-colors",
  },
  destructive: {
    default:
      "ds:data-[state=checked]:bg-destructive ds:data-[state=checked]:border-destructive ds:data-[state=checked]:text-destructive-foreground ds:data-[state=indeterminate]:bg-destructive ds:data-[state=indeterminate]:border-destructive ds:data-[state=indeterminate]:text-destructive-foreground ds:hover:border-primary ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-destructive ds:data-[state=checked]:border-destructive ds:data-[state=checked]:text-destructive-foreground ds:data-[state=indeterminate]:bg-destructive ds:data-[state=indeterminate]:border-destructive ds:data-[state=indeterminate]:text-destructive-foreground ds:hover:border-primary ds:transition-colors",
  },
  muted: {
    default:
      "ds:data-[state=checked]:bg-muted ds:data-[state=checked]:border-muted ds:data-[state=checked]:text-muted-foreground ds:data-[state=indeterminate]:bg-muted ds:data-[state=indeterminate]:border-muted ds:data-[state=indeterminate]:text-muted-foreground ds:hover:border-primary ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-muted ds:data-[state=checked]:border-muted ds:data-[state=checked]:text-muted-foreground ds:data-[state=indeterminate]:bg-muted ds:data-[state=indeterminate]:border-muted ds:data-[state=indeterminate]:text-muted-foreground ds:hover:border-primary ds:transition-colors",
  },
  success: {
    default:
      "ds:data-[state=checked]:bg-success ds:data-[state=checked]:border-success ds:data-[state=checked]:text-success-foreground ds:data-[state=indeterminate]:bg-success ds:data-[state=indeterminate]:border-success ds:data-[state=indeterminate]:text-success-foreground ds:hover:border-primary ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-success ds:data-[state=checked]:border-success ds:data-[state=checked]:text-success-foreground ds:data-[state=indeterminate]:bg-success ds:data-[state=indeterminate]:border-success ds:data-[state=indeterminate]:text-success-foreground ds:hover:border-primary ds:transition-colors",
  },
  error: {
    default:
      "ds:data-[state=checked]:bg-error ds:data-[state=checked]:border-error ds:data-[state=checked]:text-error-foreground ds:data-[state=indeterminate]:bg-error ds:data-[state=indeterminate]:border-error ds:data-[state=indeterminate]:text-error-foreground ds:hover:border-primary ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-error ds:data-[state=checked]:border-error ds:data-[state=checked]:text-error-foreground ds:data-[state=indeterminate]:bg-error ds:data-[state=indeterminate]:border-error ds:data-[state=indeterminate]:text-error-foreground ds:hover:border-primary ds:transition-colors",
  },
  warning: {
    default:
      "ds:data-[state=checked]:bg-warning ds:data-[state=checked]:border-warning ds:data-[state=checked]:text-warning-foreground ds:data-[state=indeterminate]:bg-warning ds:data-[state=indeterminate]:border-warning ds:data-[state=indeterminate]:text-warning-foreground ds:hover:border-primary ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-warning ds:data-[state=checked]:border-warning ds:data-[state=checked]:text-warning-foreground ds:data-[state=indeterminate]:bg-warning ds:data-[state=indeterminate]:border-warning ds:data-[state=indeterminate]:text-warning-foreground ds:hover:border-primary ds:transition-colors",
  },
};

const iconColorVariants = {
  primary: {
    default:
      "ds:group-data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-black/30 ds:group-data-[state=unchecked]:fill-transparent ds:hover:stroke-primary ds:hover:fill-primary/20 ds:dark:hover:fill-primary/20 ds:group-data-[state=checked]:fill-primary ds:group-data-[state=checked]:hover:fill-primary ds:group-data-[state=checked]:stroke-primary ds:stroke-1 ds:dark:fill-primary ds:dark:stroke-primary",
  },
  secondary: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-black/30 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-secondary ds:hover:fill-secondary/20 ds:dark:hover:fill-secondary/20 ds:group-data-[state=checked]:fill-secondary ds:group-data-[state=checked]:hover:fill-secondary ds:group-data-[state=checked]:stroke-secondary ds:stroke-1 ds:dark:fill-secondary ds:dark:stroke-secondary",
  },
  accent: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-black/30 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-accent ds:hover:fill-accent/20 ds:dark:hover:fill-accent/20 ds:group-data-[state=checked]:fill-accent ds:group-data-[state=checked]:hover:fill-accent ds:group-data-[state=checked]:stroke-accent ds:stroke-1 ds:dark:fill-accent ds:dark:stroke-accent",
  },
  destructive: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-black/30 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-destructive ds:hover:fill-destructive/20 ds:dark:hover:fill-destructive/20 ds:group-data-[state=checked]:fill-destructive ds:group-data-[state=checked]:hover:fill-destructive ds:group-data-[state=checked]:stroke-destructive ds:stroke-1 ds:dark:fill-destructive ds:dark:stroke-destructive",
  },
  muted: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-black/30 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-muted ds:hover:fill-muted/20 ds:dark:hover:fill-muted/20 ds:group-data-[state=checked]:fill-muted ds:group-data-[state=checked]:hover:fill-muted ds:group-data-[state=checked]:stroke-muted ds:stroke-1 ds:dark:fill-muted ds:dark:stroke-muted",
  },
  success: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-black/30 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-success ds:hover:fill-success/20 ds:dark:hover:fill-success/20 ds:group-data-[state=checked]:fill-success ds:group-data-[state=checked]:hover:fill-success ds:group-data-[state=checked]:stroke-success ds:stroke-1 ds:dark:fill-success ds:dark:stroke-success",
  },
  error: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-black/30 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-error ds:hover:fill-error/20 ds:dark:hover:fill-error/20 ds:group-data-[state=checked]:fill-error ds:group-data-[state=checked]:hover:fill-error ds:group-data-[state=checked]:stroke-error ds:stroke-1 ds:dark:fill-error ds:dark:stroke-error",
  },
  warning: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-black/30 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-warning ds:hover:fill-warning/20 ds:dark:hover:fill-warning/20 ds:group-data-[state=checked]:fill-warning ds:group-data-[state=checked]:hover:fill-warning ds:group-data-[state=checked]:stroke-warning ds:stroke-1 ds:dark:fill-warning ds:dark:stroke-warning",
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
  "ds:peer ds:border-input ds:dark:bg-input/30 ds:focus-visible:border-ring ds:focus-visible:ring-ring/50 ds:aria-invalid:ring-destructive/20 ds:dark:aria-invalid:ring-destructive/40 ds:aria-invalid:border-destructive ds:shrink-0 ds:rounded-[4px] ds:border ds:shadow-xs ds:transition-shadow ds:outline-none ds:focus-visible:ring-[3px] ds:disabled:cursor-not-allowed ds:disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        circle: "ds:border-2",
      },
      size: {
        sm: "ds:min-w-4 ds:min-h-4 ds:[&_svg]:min-w-3 ds:[&_svg]:min-h-3",
        default: "ds:min-w-5 ds:min-h-5 ds:[&_svg]:min-w-4 ds:[&_svg]:min-h-4",
        lg: "ds:min-w-6 ds:min-h-6 ds:[&_svg]:min-w-5 ds:[&_svg]:min-h-5",
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
  }
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
          "ds:group ds:focus-visible:ring-ring/50 ds:outline-none ds:focus-visible:ring-3 ds:!border-none ds:!bg-transparent ds:shadow-none":
            icon,
        }
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
                iconSizeClass
              ),
            }
          )
        ) : (
          icon
        )
      ) : (
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="ds:grid ds:place-content-center ds:text-current ds:transition-none"
        >
          {props.checked === "indeterminate" ? (
            <MinusIcon className="ds:size-3.5" />
          ) : (
            <CheckIcon className="ds:size-3.5" />
          )}
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
