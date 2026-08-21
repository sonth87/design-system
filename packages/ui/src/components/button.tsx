import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const colorVariants = {
  primary: {
    solid:
      "ds:border-primaryA-500 ds:bg-primaryA-500 ds:text-white ds:hover:bg-primaryA-500/90 ds:focus-visible:ring-primaryA-500/20",
    mix: "ds:bg-primaryA-500/30 ds:border-primaryA-500 ds:text-primaryA-500 ds:hover:bg-primaryA-500/40 ds:dark:bg-primaryA-500/30 ds:dark:hover:bg-primaryA-500/40",
    light:
      "ds:bg-primaryA-500/30 ds:border-primaryA-500/0 ds:text-primaryA-500 ds:hover:bg-primaryA-500/40 ds:dark:bg-primaryA-500/30 ds:dark:hover:bg-primaryA-500/40",
    outline:
      "ds:border-primaryA-500 ds:text-primaryA-500 ds:hover:bg-primaryA-500/10 ds:dark:border-primaryA-500 ds:dark:hover:bg-primaryA-500/20",
    stroke:
      "ds:border-primaryA-500 ds:text-primaryA-500 ds:hover:bg-primaryA-500/10 ds:dark:border-primaryA-500 ds:dark:hover:bg-primaryA-500/20",
    ghost:
      "ds:text-primaryA-500 ds:hover:bg-primaryA-500/10 ds:hover:text-primaryA-500 ds:dark:hover:bg-primaryA-500/20",
    link: "ds:text-primaryA-500",
  },
  secondary: {
    solid:
      "ds:border-primaryC-500 ds:bg-primaryC-500 ds:text-white ds:hover:bg-primaryC-500/80 ds:focus-visible:ring-primaryC-500/20",
    mix: "ds:bg-primaryC-500/30 ds:border-primaryC-500 ds:text-primaryC-500 ds:hover:bg-primaryC-500/40 ds:dark:bg-primaryC-500/30 ds:dark:hover:bg-primaryC-500/40",
    light:
      "ds:bg-primaryC-500/30 ds:border-primaryC-500/0 ds:text-primaryC-500 ds:hover:bg-primaryC-500/40 ds:dark:bg-primaryC-500/30 ds:dark:hover:bg-primaryC-500/40",
    outline:
      "ds:border-primaryC-500 ds:text-primaryC-500 ds:hover:bg-primaryC-500/10 ds:dark:border-primaryC-500 ds:dark:hover:bg-primaryC-500/20",
    stroke:
      "ds:border-primaryC-500 ds:text-primaryC-500 ds:hover:bg-primaryC-500/10 ds:dark:border-primaryC-500 ds:dark:hover:bg-primaryC-500/20",
    ghost:
      "ds:text-primaryC-500 ds:hover:bg-primaryC-500/10 ds:hover:text-primaryC-500 ds:dark:hover:bg-primaryC-500/20",
    link: "ds:text-primaryC-500",
  },
  accent: {
    solid:
      "ds:border-ink200 ds:bg-ink200 ds:text-ink900 ds:hover:bg-ink200/80 ds:focus-visible:ring-ink200/20",
    mix: "ds:bg-ink200/30 ds:border-ink200 ds:text-ink200 ds:hover:bg-ink200/40 ds:dark:bg-ink200/30 ds:dark:hover:bg-ink200/40",
    light:
      "ds:bg-ink200/30 ds:border-ink200/0 ds:text-ink200 ds:hover:bg-ink200/40 ds:dark:bg-ink200/30 ds:dark:hover:bg-ink200/40",
    outline:
      "ds:border-ink200 ds:text-ink200 ds:hover:bg-ink200/10 ds:dark:border-ink200 ds:dark:hover:bg-ink200/20",
    stroke:
      "ds:border-ink200 ds:text-ink200 ds:hover:bg-ink200/10 ds:dark:border-ink200 ds:dark:hover:bg-ink200/20",
    ghost:
      "ds:text-ink200 ds:hover:bg-ink200/10 ds:hover:text-ink200 ds:dark:hover:bg-ink200/20",
    link: "ds:text-ink200",
  },
  destructive: {
    solid:
      "ds:border-red600 ds:bg-red600 ds:text-white ds:hover:bg-red600/90 ds:focus-visible:ring-red600/20 ds:dark:bg-red600/60",
    mix: "ds:bg-red600/30 ds:border-red600 ds:text-red600 ds:hover:bg-red600/40 ds:dark:bg-red600/30 ds:dark:hover:bg-red600/40",
    light:
      "ds:bg-red600/30 ds:border-red600/0 ds:text-red600 ds:hover:bg-red600/40 ds:dark:bg-red600/30 ds:dark:hover:bg-red600/40",
    outline:
      "ds:border-red600 ds:text-red600 ds:hover:bg-red600/10 ds:dark:border-red600 ds:dark:hover:bg-red600/20",
    stroke:
      "ds:border-red600 ds:text-red600 ds:hover:bg-red600/10 ds:dark:border-red600 ds:dark:hover:bg-red600/20",
    ghost:
      "ds:text-red600 ds:hover:bg-red600/10 ds:hover:text-red600 ds:dark:hover:bg-red600/20",
    link: "ds:text-red600",
  },
  muted: {
    solid:
      "ds:border-ink200 ds:bg-ink200 ds:text-ink700 ds:hover:bg-ink200/80 ds:focus-visible:ring-ink200/20",
    mix: "ds:bg-ink200/30 ds:border-ink200 ds:text-ink700 ds:hover:bg-ink200/40 ds:dark:bg-ink200/30 ds:dark:hover:bg-ink200/40",
    light:
      "ds:bg-ink200/30 ds:border-ink200/0 ds:text-ink700 ds:hover:bg-ink200/40 ds:dark:bg-ink200/30 ds:dark:hover:bg-ink200/40",
    outline:
      "ds:border-border ds:text-ink700 ds:hover:bg-ink200 ds:hover:text-ink900 ds:dark:border-border ds:dark:hover:bg-border/50",
    stroke:
      "ds:border-border ds:text-ink700 ds:hover:bg-ink200 ds:hover:text-ink900 ds:dark:border-border ds:dark:hover:bg-border/50",
    ghost:
      "ds:text-ink700 ds:hover:bg-ink200 ds:hover:text-ink900 ds:dark:hover:bg-ink200/50",
    link: "ds:text-ink700",
  },
  success: {
    solid:
      "ds:border-green500 ds:bg-green500 ds:text-white ds:hover:bg-green500/90 ds:focus-visible:ring-green500/20 ds:dark:bg-green500/60",
    mix: "ds:bg-green500/30 ds:border-green500 ds:text-green500 ds:hover:bg-green500/40 ds:dark:bg-green500/30 ds:dark:hover:bg-green500/40",
    light:
      "ds:bg-green500/30 ds:border-green500/0 ds:text-green500 ds:hover:bg-green500/40 ds:dark:bg-green500/30 ds:dark:hover:bg-green500/40",
    outline:
      "ds:border-green500 ds:text-green500 ds:hover:bg-green500/10 ds:dark:border-green500 ds:dark:hover:bg-green500/20",
    stroke:
      "ds:border-green500 ds:text-green500 ds:hover:bg-green500/10 ds:dark:border-green500 ds:dark:hover:bg-green500/20",
    ghost:
      "ds:text-green500 ds:hover:bg-green500/10 ds:hover:text-green500 ds:dark:hover:bg-green500/20",
    link: "ds:text-green500",
  },
  error: {
    solid:
      "ds:border-red500 ds:bg-red500 ds:text-white ds:hover:bg-red500/90 ds:focus-visible:ring-red500/20 ds:dark:bg-red500/60",
    mix: "ds:bg-red500/30 ds:border-red500 ds:text-red500 ds:hover:bg-red500/40 ds:dark:bg-red500/30 ds:dark:hover:bg-red500/40",
    light:
      "ds:bg-red500/30 ds:border-red500/0 ds:text-red500 ds:hover:bg-red500/40 ds:dark:bg-red500/30 ds:dark:hover:bg-red500/40",
    outline:
      "ds:border-red500 ds:text-red500 ds:hover:bg-red500/10 ds:dark:border-red500 ds:dark:hover:bg-red500/20",
    stroke:
      "ds:border-red500 ds:text-red500 ds:hover:bg-red500/10 ds:dark:border-red500 ds:dark:hover:bg-red500/20",
    ghost:
      "ds:text-red500 ds:hover:bg-red500/10 ds:hover:text-red500 ds:dark:hover:bg-red500/20",
    link: "ds:text-red500",
  },
  warning: {
    solid:
      "ds:border-orange500 ds:bg-orange500 ds:text-white ds:hover:bg-orange500/90 ds:focus-visible:ring-orange500/20 ds:dark:bg-orange500/60",
    mix: "ds:bg-orange500/30 ds:border-orange500 ds:text-orange500 ds:hover:bg-orange500/40 ds:dark:bg-orange500/30 ds:dark:hover:bg-orange500/40",
    light:
      "ds:bg-orange500/30 ds:border-orange500/0 ds:text-orange500 ds:hover:bg-orange500/40 ds:dark:bg-orange500/30 ds:dark:hover:bg-orange500/40",
    outline:
      "ds:border-orange500 ds:text-orange500 ds:hover:bg-orange500/10 ds:dark:border-orange500 ds:dark:hover:bg-orange500/20",
    stroke:
      "ds:border-orange500 ds:text-orange500 ds:hover:bg-orange500/10 ds:dark:border-orange500 ds:dark:hover:bg-orange500/20",
    ghost:
      "ds:text-orange500 ds:hover:bg-orange500/10 ds:hover:text-orange500 ds:dark:hover:bg-orange500/20",
    link: "ds:text-orange500",
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
  "ds:inline-flex ds:items-center ds:justify-center ds:gap-2 ds:whitespace-nowrap ds:rounded-md ds:text-sm ds:font-medium ds:transition-all ds:disabled:pointer-events-none ds:disabled:opacity-50 ds:[&_svg]:pointer-events-none ds:[&_svg:not([class*='size-'])]:size-4 ds:shrink-0 ds:[&_svg]:shrink-0 ds:outline-none ds:focus-visible:border-ink500 ds:focus-visible:ring-ink500/50 ds:focus-visible:ring-[3px] ds:aria-invalid:ring-red600/20 ds:dark:aria-invalid:ring-red600/40 ds:aria-invalid:border-red600",
  {
    variants: {
      variant: {
        solid: "ds:border ds:hover:bg-border",
        mix: "ds:border ds:bg-white ds:shadow-xs ds:dark:bg-border/30",
        light: "ds:shadow-xs",
        outline: "ds:border ds:bg-white ds:shadow-xs ds:dark:bg-border/30",
        stroke: "ds:border ds:bg-white ds:shadow-xs ds:dark:bg-border/30",
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
