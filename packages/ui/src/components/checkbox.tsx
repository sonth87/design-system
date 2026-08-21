"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: {
    default:
      "ds:data-[state=checked]:bg-primaryA-500 ds:data-[state=checked]:border-primaryA-500 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-primaryA-500 ds:data-[state=indeterminate]:border-primaryA-500 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-primaryA-500 ds:data-[state=checked]:border-primaryA-500 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-primaryA-500 ds:data-[state=indeterminate]:border-primaryA-500 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
  },
  secondary: {
    default:
      "ds:data-[state=checked]:bg-primaryC-500 ds:data-[state=checked]:border-primaryC-500 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-primaryC-500 ds:data-[state=indeterminate]:border-primaryC-500 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-primaryC-500 ds:data-[state=checked]:border-primaryC-500 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-primaryC-500 ds:data-[state=indeterminate]:border-primaryC-500 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
  },
  accent: {
    default:
      "ds:data-[state=checked]:bg-ink200 ds:data-[state=checked]:border-ink200 ds:data-[state=checked]:text-ink900 ds:data-[state=indeterminate]:bg-ink200 ds:data-[state=indeterminate]:border-ink200 ds:data-[state=indeterminate]:text-ink900 ds:hover:border-primaryA-500 ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-ink200 ds:data-[state=checked]:border-ink200 ds:data-[state=checked]:text-ink900 ds:data-[state=indeterminate]:bg-ink200 ds:data-[state=indeterminate]:border-ink200 ds:data-[state=indeterminate]:text-ink900 ds:hover:border-primaryA-500 ds:transition-colors",
  },
  destructive: {
    default:
      "ds:data-[state=checked]:bg-red600 ds:data-[state=checked]:border-red600 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-red600 ds:data-[state=indeterminate]:border-red600 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-red600 ds:data-[state=checked]:border-red600 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-red600 ds:data-[state=indeterminate]:border-red600 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
  },
  muted: {
    default:
      "ds:data-[state=checked]:bg-ink200 ds:data-[state=checked]:border-ink200 ds:data-[state=checked]:text-ink700 ds:data-[state=indeterminate]:bg-ink200 ds:data-[state=indeterminate]:border-ink200 ds:data-[state=indeterminate]:text-ink700 ds:hover:border-primaryA-500 ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-ink200 ds:data-[state=checked]:border-ink200 ds:data-[state=checked]:text-ink700 ds:data-[state=indeterminate]:bg-ink200 ds:data-[state=indeterminate]:border-ink200 ds:data-[state=indeterminate]:text-ink700 ds:hover:border-primaryA-500 ds:transition-colors",
  },
  success: {
    default:
      "ds:data-[state=checked]:bg-green500 ds:data-[state=checked]:border-green500 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-green500 ds:data-[state=indeterminate]:border-green500 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-green500 ds:data-[state=checked]:border-green500 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-green500 ds:data-[state=indeterminate]:border-green500 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
  },
  error: {
    default:
      "ds:data-[state=checked]:bg-red500 ds:data-[state=checked]:border-red500 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-red500 ds:data-[state=indeterminate]:border-red500 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-red500 ds:data-[state=checked]:border-red500 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-red500 ds:data-[state=indeterminate]:border-red500 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
  },
  warning: {
    default:
      "ds:data-[state=checked]:bg-orange500 ds:data-[state=checked]:border-orange500 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-orange500 ds:data-[state=indeterminate]:border-orange500 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
    circle:
      "ds:rounded-full ds:data-[state=checked]:bg-orange500 ds:data-[state=checked]:border-orange500 ds:data-[state=checked]:text-white ds:data-[state=indeterminate]:bg-orange500 ds:data-[state=indeterminate]:border-orange500 ds:data-[state=indeterminate]:text-white ds:hover:border-primaryA-500 ds:transition-colors",
  },
};

const iconColorVariants = {
  primary: {
    default:
      "ds:group-data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-blackOpacity400 ds:group-data-[state=unchecked]:fill-transparent ds:hover:stroke-primaryA-500 ds:hover:fill-primaryA-500/20 ds:dark:hover:fill-primaryA-500/20 ds:group-data-[state=checked]:fill-primaryA-500 ds:group-data-[state=checked]:hover:fill-primaryA-500 ds:group-data-[state=checked]:stroke-primaryA-500 ds:stroke-1 ds:dark:fill-primaryA-500 ds:dark:stroke-primaryA-500",
  },
  secondary: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-blackOpacity400 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-primaryC-500 ds:hover:fill-primaryC-500/20 ds:dark:hover:fill-primaryC-500/20 ds:group-data-[state=checked]:fill-primaryC-500 ds:group-data-[state=checked]:hover:fill-primaryC-500 ds:group-data-[state=checked]:stroke-primaryC-500 ds:stroke-1 ds:dark:fill-primaryC-500 ds:dark:stroke-primaryC-500",
  },
  accent: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-blackOpacity400 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-ink200 ds:hover:fill-ink200/20 ds:dark:hover:fill-ink200/20 ds:group-data-[state=checked]:fill-ink200 ds:group-data-[state=checked]:hover:fill-ink200 ds:group-data-[state=checked]:stroke-ink200 ds:stroke-1 ds:dark:fill-ink200 ds:dark:stroke-ink200",
  },
  destructive: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-blackOpacity400 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-red600 ds:hover:fill-red600/20 ds:dark:hover:fill-red600/20 ds:group-data-[state=checked]:fill-red600 ds:group-data-[state=checked]:hover:fill-red600 ds:group-data-[state=checked]:stroke-red600 ds:stroke-1 ds:dark:fill-red600 ds:dark:stroke-red600",
  },
  muted: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-blackOpacity400 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-ink200 ds:hover:fill-ink200/20 ds:dark:hover:fill-ink200/20 ds:group-data-[state=checked]:fill-ink200 ds:group-data-[state=checked]:hover:fill-ink200 ds:group-data-[state=checked]:stroke-ink200 ds:stroke-1 ds:dark:fill-ink200 ds:dark:stroke-ink200",
  },
  success: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-blackOpacity400 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-green500 ds:hover:fill-green500/20 ds:dark:hover:fill-green500/20 ds:group-data-[state=checked]:fill-green500 ds:group-data-[state=checked]:hover:fill-green500 ds:group-data-[state=checked]:stroke-green500 ds:stroke-1 ds:dark:fill-green500 ds:dark:stroke-green500",
  },
  error: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-blackOpacity400 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-red500 ds:hover:fill-red500/20 ds:dark:hover:fill-red500/20 ds:group-data-[state=checked]:fill-red500 ds:group-data-[state=checked]:hover:fill-red500 ds:group-data-[state=checked]:stroke-red500 ds:stroke-1 ds:dark:fill-red500 ds:dark:stroke-red500",
  },
  warning: {
    default:
      "ds:data-[state=unchecked]:stroke-1 ds:group-data-[state=unchecked]:stroke-blackOpacity400 ds:data-[state=unchecked]:fill-transparent ds:hover:stroke-orange500 ds:hover:fill-orange500/20 ds:dark:hover:fill-orange500/20 ds:group-data-[state=checked]:fill-orange500 ds:group-data-[state=checked]:hover:fill-orange500 ds:group-data-[state=checked]:stroke-orange500 ds:stroke-1 ds:dark:fill-orange500 ds:dark:stroke-orange500",
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
  "ds:peer ds:border-border ds:dark:bg-border/30 ds:focus-visible:border-ink500 ds:focus-visible:ring-ink500/50 ds:aria-invalid:ring-red600/20 ds:dark:aria-invalid:ring-red600/40 ds:aria-invalid:border-red600 ds:shrink-0 ds:rounded-[4px] ds:border ds:shadow-xs ds:transition-shadow ds:outline-none ds:focus-visible:ring-[3px] ds:disabled:cursor-not-allowed ds:disabled:opacity-50",
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
          "ds:group ds:focus-visible:ring-ink500/50 ds:outline-none ds:focus-visible:ring-3 ds:!border-none ds:!bg-transparent ds:shadow-none":
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
