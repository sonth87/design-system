import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const colorVariants = {
  primary: {
    solid: "ds:bg-primaryA-500 ds:text-white",
    light: "ds:bg-primaryA-500/30 ds:text-primaryA-500 ds:dark:bg-primaryA-500/30",
    outline: "ds:border-primaryA-500 ds:text-primaryA-500 ds:bg-transparent",
  },
  secondary: {
    solid: "ds:bg-primaryC-500 ds:text-white",
    light: "ds:bg-primaryC-500/30 ds:text-primaryC-500 ds:dark:bg-primaryC-500/30",
    outline: "ds:border-primaryC-500 ds:text-primaryC-500 ds:bg-transparent",
  },
  accent: {
    solid: "ds:bg-ink200 ds:text-ink900",
    light: "ds:bg-ink200/30 ds:text-ink200 ds:dark:bg-ink200/30",
    outline: "ds:border-ink200 ds:text-ink200 ds:bg-transparent",
  },
  destructive: {
    solid: "ds:bg-red600 ds:text-white ds:dark:bg-red600/60",
    light: "ds:bg-red600/30 ds:text-red600 ds:dark:bg-red600/30",
    outline: "ds:border-red600 ds:text-red600 ds:bg-transparent",
  },
  muted: {
    solid: "ds:bg-ink200 ds:text-ink700",
    light: "ds:bg-ink200/30 ds:text-ink700 ds:dark:bg-ink200/30",
    outline: "ds:border-border ds:text-ink700 ds:bg-transparent",
  },
  success: {
    solid: "ds:bg-green500 ds:text-white ds:dark:bg-green500/60",
    light: "ds:bg-green500/30 ds:text-green500 ds:dark:bg-green500/30",
    outline: "ds:border-green500 ds:text-green500 ds:bg-transparent",
  },
  error: {
    solid: "ds:bg-red500 ds:text-white ds:dark:bg-red500/60",
    light: "ds:bg-red500/30 ds:text-red500 ds:dark:bg-red500/30",
    outline: "ds:border-red500 ds:text-red500 ds:bg-transparent",
  },
  warning: {
    solid: "ds:bg-orange500 ds:text-white ds:dark:bg-orange500/60",
    light: "ds:bg-orange500/30 ds:text-orange500 ds:dark:bg-orange500/30",
    outline: "ds:border-orange500 ds:text-orange500 ds:bg-transparent",
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

const badgeVariants = cva(
  "ds:inline-flex ds:items-center ds:justify-center ds:rounded-full ds:w-fit ds:whitespace-nowrap ds:shrink-0 ds:[&>svg]:pointer-events-none ds:transition-[color,box-shadow] ds:font-medium",
  {
    variants: {
      variant: {
        solid: "",
        light: "",
        outline: "ds:border",
      },
      size: {
        dot: "ds:size-1.5 ds:text-[0px] ds:leading-0 ds:[&>svg]:size-2",
        xs: "ds:h-4 ds:min-w-4 ds:text-[8px] ds:leading-0 ds:px-1 ds:[&>svg]:size-2",
        sm: "ds:h-5 ds:min-w-5 ds:text-[10px] ds:leading-0 ds:px-1 ds:[&>svg]:size-3",
        normal: "ds:h-6 ds:min-w-6 ds:text-[10px] ds:leading-0 ds:px-1.25 ds:[&>svg]:size-3.5",
        lg: "ds:h-7 ds:min-w-7 ds:text-xs ds:leading-0 ds:px-1.25 ds:[&>svg]:size-4",
        xl: "ds:h-8 ds:min-w-8 ds:text-sm ds:leading-0 ds:px-1.5 ds:[&>svg]:size-5",
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
        custom: "",
      },
      border: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      ...generateCompoundVariants(),
      {
        border: true,
        size: "dot",
        className: "ds:border ds:border-white",
      },
      {
        border: true,
        size: "xs",
        className: "ds:border ds:border-white",
      },
      {
        border: true,
        size: "sm",
        className: "ds:border ds:border-white",
      },
      {
        border: true,
        size: "normal",
        className: "ds:border ds:border-white",
      },
      {
        border: true,
        size: "lg",
        className: "ds:border-[2px] ds:border-white",
      },
      {
        border: true,
        size: "xl",
        className: "ds:border-[2px] ds:border-white",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "normal",
      color: "primary",
      border: false,
    },
  }
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant, size, color, border, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(
          badgeVariants({ variant, size, color, border }),
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, type BadgeProps };
