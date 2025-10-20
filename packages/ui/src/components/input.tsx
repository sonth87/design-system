import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@dsui/ui/lib/utils";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      size: {
        normal: "h-9 text-base px-3 py-1",
        xs: "h-6 text-xs px-2 py-0.5",
        sm: "h-8 text-sm px-2.5 py-1",
        lg: "h-11 text-lg px-4 py-2",
        xl: "h-14 text-xl px-5 py-3",
      },
      state: {
        default: "",
        success:
          "border-success ring-success/30 focus-visible:border-success focus-visible:ring-success/50",
        error:
          "border-destructive ring-destructive/30 focus-visible:border-destructive focus-visible:ring-destructive/50",
        warning:
          "border-warning ring-warning/30 focus-visible:border-warning focus-visible:ring-warning/50",
      },
    },
    defaultVariants: {
      size: "normal",
      state: "default",
    },
  }
);

type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  size?: "normal" | "sm" | "xs" | "lg" | "xl";
  state?: "default" | "success" | "error" | "warning";
} & VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, state = "default", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(inputVariants({ size, state, className }))}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants, type InputProps };
