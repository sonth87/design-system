import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const colorVariants = {
  primary: {
    solid:
      "border-primary bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/20",
    mix: "bg-primary/30 border-primary text-primary hover:bg-primary/40 dark:bg-primary/30 dark:hover:bg-primary/40",
    light:
      "bg-primary/30 border-primary/0 text-primary hover:bg-primary/40 dark:bg-primary/30 dark:hover:bg-primary/40",
    outline:
      "border-primary text-primary hover:bg-primary/10 dark:border-primary dark:hover:bg-primary/20",
    stroke:
      "border-primary text-primary hover:bg-primary/10 dark:border-primary dark:hover:bg-primary/20",
    ghost:
      "text-primary hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20",
    link: "text-primary",
  },
  secondary: {
    solid:
      "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary/20",
    mix: "bg-secondary/30 border-secondary text-secondary hover:bg-secondary/40 dark:bg-secondary/30 dark:hover:bg-secondary/40",
    light:
      "bg-secondary/30 border-secondary/0 text-secondary hover:bg-secondary/40 dark:bg-secondary/30 dark:hover:bg-secondary/40",
    outline:
      "border-secondary text-secondary hover:bg-secondary/10 dark:border-secondary dark:hover:bg-secondary/20",
    stroke:
      "border-secondary text-secondary hover:bg-secondary/10 dark:border-secondary dark:hover:bg-secondary/20",
    ghost:
      "text-secondary hover:bg-secondary/10 hover:text-secondary dark:hover:bg-secondary/20",
    link: "text-secondary",
  },
  accent: {
    solid:
      "border-accent bg-accent text-accent-foreground hover:bg-accent/80 focus-visible:ring-accent/20",
    mix: "bg-accent/30 border-accent text-accent hover:bg-accent/40 dark:bg-accent/30 dark:hover:bg-accent/40",
    light:
      "bg-accent/30 border-accent/0 text-accent hover:bg-accent/40 dark:bg-accent/30 dark:hover:bg-accent/40",
    outline:
      "border-accent text-accent hover:bg-accent/10 dark:border-accent dark:hover:bg-accent/20",
    stroke:
      "border-accent text-accent hover:bg-accent/10 dark:border-accent dark:hover:bg-accent/20",
    ghost:
      "text-accent hover:bg-accent/10 hover:text-accent dark:hover:bg-accent/20",
    link: "text-accent",
  },
  destructive: {
    solid:
      "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60",
    mix: "bg-destructive/30 border-destructive text-destructive hover:bg-destructive/40 dark:bg-destructive/30 dark:hover:bg-destructive/40",
    light:
      "bg-destructive/30 border-destructive/0 text-destructive hover:bg-destructive/40 dark:bg-destructive/30 dark:hover:bg-destructive/40",
    outline:
      "border-destructive text-destructive hover:bg-destructive/10 dark:border-destructive dark:hover:bg-destructive/20",
    stroke:
      "border-destructive text-destructive hover:bg-destructive/10 dark:border-destructive dark:hover:bg-destructive/20",
    ghost:
      "text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20",
    link: "text-destructive",
  },
  muted: {
    solid:
      "border-muted bg-muted text-muted-foreground hover:bg-muted/80 focus-visible:ring-muted/20",
    mix: "bg-muted/30 border-muted text-muted-foreground hover:bg-muted/40 dark:bg-muted/30 dark:hover:bg-muted/40",
    light:
      "bg-muted/30 border-muted/0 text-muted-foreground hover:bg-muted/40 dark:bg-muted/30 dark:hover:bg-muted/40",
    outline:
      "border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:border-input dark:hover:bg-input/50",
    stroke:
      "border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:border-input dark:hover:bg-input/50",
    ghost:
      "text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
    link: "text-muted-foreground",
  },
  success: {
    solid:
      "border-success bg-success text-success-foreground hover:bg-success/90 focus-visible:ring-success/20 dark:bg-success/60",
    mix: "bg-success/30 border-success text-success hover:bg-success/40 dark:bg-success/30 dark:hover:bg-success/40",
    light:
      "bg-success/30 border-success/0 text-success hover:bg-success/40 dark:bg-success/30 dark:hover:bg-success/40",
    outline:
      "border-success text-success hover:bg-success/10 dark:border-success dark:hover:bg-success/20",
    stroke:
      "border-success text-success hover:bg-success/10 dark:border-success dark:hover:bg-success/20",
    ghost:
      "text-success hover:bg-success/10 hover:text-success dark:hover:bg-success/20",
    link: "text-success",
  },
  error: {
    solid:
      "border-error bg-error text-error-foreground hover:bg-error/90 focus-visible:ring-error/20 dark:bg-error/60",
    mix: "bg-error/30 border-error text-error hover:bg-error/40 dark:bg-error/30 dark:hover:bg-error/40",
    light:
      "bg-error/30 border-error/0 text-error hover:bg-error/40 dark:bg-error/30 dark:hover:bg-error/40",
    outline:
      "border-error text-error hover:bg-error/10 dark:border-error dark:hover:bg-error/20",
    stroke:
      "border-error text-error hover:bg-error/10 dark:border-error dark:hover:bg-error/20",
    ghost:
      "text-error hover:bg-error/10 hover:text-error dark:hover:bg-error/20",
    link: "text-error",
  },
  warning: {
    solid:
      "border-warning bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:ring-warning/20 dark:bg-warning/60",
    mix: "bg-warning/30 border-warning text-warning hover:bg-warning/40 dark:bg-warning/30 dark:hover:bg-warning/40",
    light:
      "bg-warning/30 border-warning/0 text-warning hover:bg-warning/40 dark:bg-warning/30 dark:hover:bg-warning/40",
    outline:
      "border-warning text-warning hover:bg-warning/10 dark:border-warning dark:hover:bg-warning/20",
    stroke:
      "border-warning text-warning hover:bg-warning/10 dark:border-warning dark:hover:bg-warning/20",
    ghost:
      "text-warning hover:bg-warning/10 hover:text-warning dark:hover:bg-warning/20",
    link: "text-warning",
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
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        solid: "border hover:bg-border",
        mix: "border bg-background shadow-xs dark:bg-input/30",
        light: "shadow-xs",
        outline: "border bg-background shadow-xs dark:bg-input/30",
        stroke: "border bg-background shadow-xs dark:bg-input/30",
        ghost: "",
        link: "",
      },
      size: {
        xs: "h-6 rounded-md gap-2 px-2 text-sm py-0.5 has-[>svg]:px-2",
        sm: "h-8 rounded-md gap-2 px-3 text-sm py-1.5 has-[>svg]:px-2.5",
        normal: "h-10 px-4 py-2 has-[>svg]:px-3",
        lg: "h-12 rounded-md px-4 py-3 has-[>svg]:px-4",
        xl: "h-14 rounded-md px-4 py-4 has-[>svg]:px-4",
        icon: "size-10 [&_svg:not([class*='size-'])]:size-6",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-4",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-5",
        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-6",
        "icon-xl": "size-14 [&_svg:not([class*='size-'])]:size-6",
        "circle-icon":
          "size-10 rounded-full [&_svg:not([class*='size-'])]:size-6",
        "circle-icon-xs":
          "size-6 rounded-full [&_svg:not([class*='size-'])]:size-4",
        "circle-icon-sm":
          "size-8 rounded-full [&_svg:not([class*='size-'])]:size-5",
        "circle-icon-lg":
          "size-12 rounded-full [&_svg:not([class*='size-'])]:size-6",
        "circle-icon-xl":
          "size-14 rounded-full [&_svg:not([class*='size-'])]:size-6",
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
