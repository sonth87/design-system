import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const colorVariants = {
  primary: {
    solid: "bg-primary text-primary-foreground",
    light: "bg-primary/30 text-primary dark:bg-primary/30",
    outline: "border-primary text-primary bg-transparent",
  },
  secondary: {
    solid: "bg-secondary text-secondary-foreground",
    light: "bg-secondary/30 text-secondary dark:bg-secondary/30",
    outline: "border-secondary text-secondary bg-transparent",
  },
  accent: {
    solid: "bg-accent text-accent-foreground",
    light: "bg-accent/30 text-accent dark:bg-accent/30",
    outline: "border-accent text-accent bg-transparent",
  },
  destructive: {
    solid: "bg-destructive text-destructive-foreground dark:bg-destructive/60",
    light: "bg-destructive/30 text-destructive dark:bg-destructive/30",
    outline: "border-destructive text-destructive bg-transparent",
  },
  muted: {
    solid: "bg-muted text-muted-foreground",
    light: "bg-muted/30 text-muted-foreground dark:bg-muted/30",
    outline: "border-input text-muted-foreground bg-transparent",
  },
  success: {
    solid: "bg-success text-success-foreground dark:bg-success/60",
    light: "bg-success/30 text-success dark:bg-success/30",
    outline: "border-success text-success bg-transparent",
  },
  error: {
    solid: "bg-error text-error-foreground dark:bg-error/60",
    light: "bg-error/30 text-error dark:bg-error/30",
    outline: "border-error text-error bg-transparent",
  },
  warning: {
    solid: "bg-warning text-warning-foreground dark:bg-warning/60",
    light: "bg-warning/30 text-warning dark:bg-warning/30",
    outline: "border-warning text-warning bg-transparent",
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

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none transition-[color,box-shadow] font-medium",
  {
    variants: {
      variant: {
        solid: "",
        light: "",
        outline: "border",
      },
      size: {
        dot: "size-1.5 text-[0px] leading-0 [&>svg]:size-2", 
        xs: "h-4 min-w-4 text-[8px] leading-0 px-1 [&>svg]:size-2",
        sm: "h-5 min-w-5 text-[10px] leading-0 px-1 [&>svg]:size-3",
        normal: "h-6 min-w-6 text-[10px] leading-0 px-1.25 [&>svg]:size-3.5",
        lg: "h-7 min-w-7 text-xs leading-0 px-1.25 [&>svg]:size-4",
        xl: "h-8 min-w-8 text-sm leading-0 px-1.5 [&>svg]:size-5",
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
        className: "border border-background",
      },
      {
        border: true,
        size: "xs",
        className: "border border-background",
      },
      {
        border: true,
        size: "sm",
        className: "border border-background",
      },
      {
        border: true,
        size: "normal",
        className: "border border-background",
      },
      {
        border: true,
        size: "lg",
        className: "border-[2px] border-background",
      },
      {
        border: true,
        size: "xl",
        className: "border-[2px] border-background",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "normal",
      color: "primary",
      border: false,
    },
  },
);

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant, size, color, border, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(
          badgeVariants({ variant, size, color, border }),
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, type BadgeProps };
