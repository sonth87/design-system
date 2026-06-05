import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const colorVariants = {
  primary: {
    solid:
      "ds:border-primary ds:bg-primary ds:text-primary-foreground ds:hover:bg-primary/90 ds:focus-visible:ring-primary/20",
    mix: "ds:bg-primary/30 ds:border-primary ds:text-primary ds:hover:bg-primary/40 ds:dark:bg-primary/30 ds:dark:hover:bg-primary/40",
    light:
      "ds:bg-primary/30 ds:border-primary/0 ds:text-primary ds:hover:bg-primary/40 ds:dark:bg-primary/30 ds:dark:hover:bg-primary/40",
    outline:
      "ds:border-primary ds:text-primary ds:hover:bg-primary/10 ds:dark:border-primary ds:dark:hover:bg-primary/20",
    stroke:
      "ds:border-primary ds:text-primary ds:hover:bg-primary/10 ds:dark:border-primary ds:dark:hover:bg-primary/20",
    ghost:
      "ds:text-primary ds:hover:bg-primary/10 ds:hover:text-primary ds:dark:hover:bg-primary/20",
    link: "ds:text-primary",
  },
  secondary: {
    solid:
      "ds:border-secondary ds:bg-secondary ds:text-secondary-foreground ds:hover:bg-secondary/80 ds:focus-visible:ring-secondary/20",
    mix: "ds:bg-secondary/30 ds:border-secondary ds:text-secondary ds:hover:bg-secondary/40 ds:dark:bg-secondary/30 ds:dark:hover:bg-secondary/40",
    light:
      "ds:bg-secondary/30 ds:border-secondary/0 ds:text-secondary ds:hover:bg-secondary/40 ds:dark:bg-secondary/30 ds:dark:hover:bg-secondary/40",
    outline:
      "ds:border-secondary ds:text-secondary ds:hover:bg-secondary/10 ds:dark:border-secondary ds:dark:hover:bg-secondary/20",
    stroke:
      "ds:border-secondary ds:text-secondary ds:hover:bg-secondary/10 ds:dark:border-secondary ds:dark:hover:bg-secondary/20",
    ghost:
      "ds:text-secondary ds:hover:bg-secondary/10 ds:hover:text-secondary ds:dark:hover:bg-secondary/20",
    link: "ds:text-secondary",
  },
  accent: {
    solid:
      "ds:border-accent ds:bg-accent ds:text-accent-foreground ds:hover:bg-accent/80 ds:focus-visible:ring-accent/20",
    mix: "ds:bg-accent/30 ds:border-accent ds:text-accent ds:hover:bg-accent/40 ds:dark:bg-accent/30 ds:dark:hover:bg-accent/40",
    light:
      "ds:bg-accent/30 ds:border-accent/0 ds:text-accent ds:hover:bg-accent/40 ds:dark:bg-accent/30 ds:dark:hover:bg-accent/40",
    outline:
      "ds:border-accent ds:text-accent ds:hover:bg-accent/10 ds:dark:border-accent ds:dark:hover:bg-accent/20",
    stroke:
      "ds:border-accent ds:text-accent ds:hover:bg-accent/10 ds:dark:border-accent ds:dark:hover:bg-accent/20",
    ghost:
      "ds:text-accent ds:hover:bg-accent/10 ds:hover:text-accent ds:dark:hover:bg-accent/20",
    link: "ds:text-accent",
  },
  destructive: {
    solid:
      "ds:border-destructive ds:bg-destructive ds:text-destructive-foreground ds:hover:bg-destructive/90 ds:focus-visible:ring-destructive/20 ds:dark:bg-destructive/60",
    mix: "ds:bg-destructive/30 ds:border-destructive ds:text-destructive ds:hover:bg-destructive/40 ds:dark:bg-destructive/30 ds:dark:hover:bg-destructive/40",
    light:
      "ds:bg-destructive/30 ds:border-destructive/0 ds:text-destructive ds:hover:bg-destructive/40 ds:dark:bg-destructive/30 ds:dark:hover:bg-destructive/40",
    outline:
      "ds:border-destructive ds:text-destructive ds:hover:bg-destructive/10 ds:dark:border-destructive ds:dark:hover:bg-destructive/20",
    stroke:
      "ds:border-destructive ds:text-destructive ds:hover:bg-destructive/10 ds:dark:border-destructive ds:dark:hover:bg-destructive/20",
    ghost:
      "ds:text-destructive ds:hover:bg-destructive/10 ds:hover:text-destructive ds:dark:hover:bg-destructive/20",
    link: "ds:text-destructive",
  },
  muted: {
    solid:
      "ds:border-muted ds:bg-muted ds:text-muted-foreground ds:hover:bg-muted/80 ds:focus-visible:ring-muted/20",
    mix: "ds:bg-muted/30 ds:border-muted ds:text-muted-foreground ds:hover:bg-muted/40 ds:dark:bg-muted/30 ds:dark:hover:bg-muted/40",
    light:
      "ds:bg-muted/30 ds:border-muted/0 ds:text-muted-foreground ds:hover:bg-muted/40 ds:dark:bg-muted/30 ds:dark:hover:bg-muted/40",
    outline:
      "ds:border-input ds:text-muted-foreground ds:hover:bg-accent ds:hover:text-accent-foreground ds:dark:border-input ds:dark:hover:bg-input/50",
    stroke:
      "ds:border-input ds:text-muted-foreground ds:hover:bg-accent ds:hover:text-accent-foreground ds:dark:border-input ds:dark:hover:bg-input/50",
    ghost:
      "ds:text-muted-foreground ds:hover:bg-accent ds:hover:text-accent-foreground ds:dark:hover:bg-accent/50",
    link: "ds:text-muted-foreground",
  },
  success: {
    solid:
      "ds:border-success ds:bg-success ds:text-success-foreground ds:hover:bg-success/90 ds:focus-visible:ring-success/20 ds:dark:bg-success/60",
    mix: "ds:bg-success/30 ds:border-success ds:text-success ds:hover:bg-success/40 ds:dark:bg-success/30 ds:dark:hover:bg-success/40",
    light:
      "ds:bg-success/30 ds:border-success/0 ds:text-success ds:hover:bg-success/40 ds:dark:bg-success/30 ds:dark:hover:bg-success/40",
    outline:
      "ds:border-success ds:text-success ds:hover:bg-success/10 ds:dark:border-success ds:dark:hover:bg-success/20",
    stroke:
      "ds:border-success ds:text-success ds:hover:bg-success/10 ds:dark:border-success ds:dark:hover:bg-success/20",
    ghost:
      "ds:text-success ds:hover:bg-success/10 ds:hover:text-success ds:dark:hover:bg-success/20",
    link: "ds:text-success",
  },
  error: {
    solid:
      "ds:border-error ds:bg-error ds:text-error-foreground ds:hover:bg-error/90 ds:focus-visible:ring-error/20 ds:dark:bg-error/60",
    mix: "ds:bg-error/30 ds:border-error ds:text-error ds:hover:bg-error/40 ds:dark:bg-error/30 ds:dark:hover:bg-error/40",
    light:
      "ds:bg-error/30 ds:border-error/0 ds:text-error ds:hover:bg-error/40 ds:dark:bg-error/30 ds:dark:hover:bg-error/40",
    outline:
      "ds:border-error ds:text-error ds:hover:bg-error/10 ds:dark:border-error ds:dark:hover:bg-error/20",
    stroke:
      "ds:border-error ds:text-error ds:hover:bg-error/10 ds:dark:border-error ds:dark:hover:bg-error/20",
    ghost:
      "ds:text-error ds:hover:bg-error/10 ds:hover:text-error ds:dark:hover:bg-error/20",
    link: "ds:text-error",
  },
  warning: {
    solid:
      "ds:border-warning ds:bg-warning ds:text-warning-foreground ds:hover:bg-warning/90 ds:focus-visible:ring-warning/20 ds:dark:bg-warning/60",
    mix: "ds:bg-warning/30 ds:border-warning ds:text-warning ds:hover:bg-warning/40 ds:dark:bg-warning/30 ds:dark:hover:bg-warning/40",
    light:
      "ds:bg-warning/30 ds:border-warning/0 ds:text-warning ds:hover:bg-warning/40 ds:dark:bg-warning/30 ds:dark:hover:bg-warning/40",
    outline:
      "ds:border-warning ds:text-warning ds:hover:bg-warning/10 ds:dark:border-warning ds:dark:hover:bg-warning/20",
    stroke:
      "ds:border-warning ds:text-warning ds:hover:bg-warning/10 ds:dark:border-warning ds:dark:hover:bg-warning/20",
    ghost:
      "ds:text-warning ds:hover:bg-warning/10 ds:hover:text-warning ds:dark:hover:bg-warning/20",
    link: "ds:text-warning",
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

const buttonVariants = cva(
  "ds:inline-flex ds:items-center ds:justify-center ds:gap-2 ds:whitespace-nowrap ds:rounded-md ds:text-sm ds:font-medium ds:transition-all ds:disabled:pointer-events-none ds:disabled:opacity-50 ds:[&_svg]:pointer-events-none ds:[&_svg:not([class*='size-'])]:size-4 ds:shrink-0 ds:[&_svg]:shrink-0 ds:outline-none ds:focus-visible:border-ring ds:focus-visible:ring-ring/50 ds:focus-visible:ring-[3px] ds:aria-invalid:ring-destructive/20 ds:dark:aria-invalid:ring-destructive/40 ds:aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        solid: "ds:border ds:hover:bg-border",
        mix: "ds:border ds:bg-background ds:shadow-xs ds:dark:bg-input/30",
        light: "ds:shadow-xs",
        outline: "ds:border ds:bg-background ds:shadow-xs ds:dark:bg-input/30",
        stroke: "ds:border ds:bg-background ds:shadow-xs ds:dark:bg-input/30",
        ghost: "",
        link: "",
      },
      size: {
        xs: "ds:h-6 ds:rounded-md ds:gap-2 ds:px-2 ds:text-sm ds:py-0.5 ds:has-[>svg]:px-2",
        sm: "ds:h-8 ds:rounded-md ds:gap-2 ds:px-3 ds:text-sm ds:py-1.5 ds:has-[>svg]:px-2.5",
        normal: "ds:h-10 ds:px-4 ds:py-2 ds:has-[>svg]:px-3",
        lg: "ds:h-12 ds:rounded-md ds:px-4 ds:py-3 ds:has-[>svg]:px-4",
        xl: "ds:h-14 ds:rounded-md ds:px-4 ds:py-4 ds:has-[>svg]:px-4",
        icon: "ds:size-10 ds:[&_svg:not([class*='size-'])]:size-6",
        "icon-xs": "ds:size-6 ds:[&_svg:not([class*='size-'])]:size-4",
        "icon-sm": "ds:size-8 ds:[&_svg:not([class*='size-'])]:size-5",
        "icon-lg": "ds:size-12 ds:[&_svg:not([class*='size-'])]:size-6",
        "icon-xl": "ds:size-14 ds:[&_svg:not([class*='size-'])]:size-6",
        "circle-icon":
          "ds:size-10 ds:rounded-full ds:[&_svg:not([class*='size-'])]:size-6",
        "circle-icon-xs":
          "ds:size-6 ds:rounded-full ds:[&_svg:not([class*='size-'])]:size-4",
        "circle-icon-sm":
          "ds:size-8 ds:rounded-full ds:[&_svg:not([class*='size-'])]:size-5",
        "circle-icon-lg":
          "ds:size-12 ds:rounded-full ds:[&_svg:not([class*='size-'])]:size-6",
        "circle-icon-xl":
          "ds:size-14 ds:rounded-full ds:[&_svg:not([class*='size-'])]:size-6",
      },
      color: {
        primary: "",
        secondary: "",
        accent: "",
        destructive: "",
        muted: "",
        mix: "",
        success: "",
        error: "",
        warning: "",
      },
    },
    compoundVariants: generateCompoundVariants(),
    defaultVariants: {
      variant: "solid",
      size: "normal",
      color: null,
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, color, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };
