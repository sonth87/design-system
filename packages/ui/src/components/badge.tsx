import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const colorVariants = {
  primary: {
    solid: "ds:bg-primary ds:text-primary-foreground",
    light: "ds:bg-primary/30 ds:text-primary ds:dark:bg-primary/30",
    outline: "ds:border-primary ds:text-primary ds:bg-transparent",
  },
  secondary: {
    solid: "ds:bg-secondary ds:text-secondary-foreground",
    light: "ds:bg-secondary/30 ds:text-secondary ds:dark:bg-secondary/30",
    outline: "ds:border-secondary ds:text-secondary ds:bg-transparent",
  },
  accent: {
    solid: "ds:bg-accent ds:text-accent-foreground",
    light: "ds:bg-accent/30 ds:text-accent ds:dark:bg-accent/30",
    outline: "ds:border-accent ds:text-accent ds:bg-transparent",
  },
  destructive: {
    solid: "ds:bg-destructive ds:text-destructive-foreground ds:dark:bg-destructive/60",
    light: "ds:bg-destructive/30 ds:text-destructive ds:dark:bg-destructive/30",
    outline: "ds:border-destructive ds:text-destructive ds:bg-transparent",
  },
  muted: {
    solid: "ds:bg-muted ds:text-muted-foreground",
    light: "ds:bg-muted/30 ds:text-muted-foreground ds:dark:bg-muted/30",
    outline: "ds:border-input ds:text-muted-foreground ds:bg-transparent",
  },
  success: {
    solid: "ds:bg-success ds:text-success-foreground ds:dark:bg-success/60",
    light: "ds:bg-success/30 ds:text-success ds:dark:bg-success/30",
    outline: "ds:border-success ds:text-success ds:bg-transparent",
  },
  error: {
    solid: "ds:bg-error ds:text-error-foreground ds:dark:bg-error/60",
    light: "ds:bg-error/30 ds:text-error ds:dark:bg-error/30",
    outline: "ds:border-error ds:text-error ds:bg-transparent",
  },
  warning: {
    solid: "ds:bg-warning ds:text-warning-foreground ds:dark:bg-warning/60",
    light: "ds:bg-warning/30 ds:text-warning ds:dark:bg-warning/30",
    outline: "ds:border-warning ds:text-warning ds:bg-transparent",
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
  "inline-flex items-center justify-center rounded-full w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none transition-[color,box-shadow] font-medium",
  {
    variants: {
      variant: {
        solid: "",
        light: "",
        outline: "ds:border",
      },
      size: {
        dot: "ds:size-1.5 ds:text-[0px] ds:leading-0 [&>svg]:size-2",
        xs: "ds:h-4 ds:min-w-4 ds:text-[8px] ds:leading-0 ds:px-1 [&>svg]:size-2",
        sm: "ds:h-5 ds:min-w-5 ds:text-[10px] ds:leading-0 ds:px-1 [&>svg]:size-3",
        normal: "ds:h-6 ds:min-w-6 ds:text-[10px] ds:leading-0 ds:px-1.25 [&>svg]:size-3.5",
        lg: "ds:h-7 ds:min-w-7 ds:text-xs ds:leading-0 ds:px-1.25 [&>svg]:size-4",
        xl: "ds:h-8 ds:min-w-8 ds:text-sm ds:leading-0 ds:px-1.5 [&>svg]:size-5",
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
        className: "ds:border ds:border-background",
      },
      {
        border: true,
        size: "xs",
        className: "ds:border ds:border-background",
      },
      {
        border: true,
        size: "sm",
        className: "ds:border ds:border-background",
      },
      {
        border: true,
        size: "normal",
        className: "ds:border ds:border-background",
      },
      {
        border: true,
        size: "lg",
        className: "ds:border-[2px] ds:border-background",
      },
      {
        border: true,
        size: "xl",
        className: "ds:border-[2px] ds:border-background",
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
