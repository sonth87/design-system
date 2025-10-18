import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const colorVariants = {
  primary: {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/20",
    outline:
      "border-primary text-primary hover:bg-primary/10 dark:border-primary dark:hover:bg-primary/20",
    ghost:
      "text-primary hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20",
    link: "text-primary",
  },
  secondary: {
    default:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary/20",
    outline:
      "border-secondary text-secondary hover:bg-secondary/10 dark:border-secondary dark:hover:bg-secondary/20",
    ghost:
      "text-secondary hover:bg-secondary/10 hover:text-secondary dark:hover:bg-secondary/20",
    link: "text-secondary",
  },
  accent: {
    default:
      "bg-accent text-accent-foreground hover:bg-accent/80 focus-visible:ring-accent/20",
    outline:
      "border-accent text-accent hover:bg-accent/10 dark:border-accent dark:hover:bg-accent/20",
    ghost:
      "text-accent hover:bg-accent/10 hover:text-accent dark:hover:bg-accent/20",
    link: "text-accent",
  },
  destructive: {
    default:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60",
    outline:
      "border-destructive text-destructive hover:bg-destructive/10 dark:border-destructive dark:hover:bg-destructive/20",
    ghost:
      "text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20",
    link: "text-destructive",
  },
  muted: {
    default:
      "bg-muted text-muted-foreground hover:bg-muted/80 focus-visible:ring-muted/20",
    outline:
      "border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:border-input dark:hover:bg-input/50",
    ghost:
      "text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
    link: "text-muted-foreground",
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
        default: "",
        outline: "border bg-background shadow-xs dark:bg-input/30",
        ghost: "",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-2 px-3 text-sm py-1.5 has-[>svg]:px-2.5",
        xs: "h-6 rounded-md gap-2 px-2 text-sm py-0.5 has-[>svg]:px-2",
        lg: "h-12 rounded-md px-4 py-3 has-[>svg]:px-4",
        xl: "h-14 rounded-md px-4 py-4 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      color: {
        primary: "",
        secondary: "",
        accent: "",
        destructive: "",
        muted: "",
      },
    },
    compoundVariants: generateCompoundVariants(),
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "primary",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  color,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, color, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
