import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@dsui/ui/lib/utils";

const inputVariants = cva(
  "ds:file:text-foreground ds:placeholder:text-muted-foreground ds:selection:bg-primary ds:selection:text-primary-foreground ds:dark:bg-background ds:border-input ds:w-full ds:min-w-0 ds:rounded-md ds:border ds:bg-transparent ds:shadow-xs ds:transition-[color,box-shadow] ds:outline-none ds:file:inline-flex ds:file:h-7 ds:file:border-0 ds:file:bg-transparent ds:file:text-sm ds:file:font-medium ds:disabled:pointer-events-none ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:focus-visible:border-ring ds:focus-visible:ring-ring/50 ds:focus-visible:ring-[3px] ds:aria-invalid:ring-destructive/20 ds:dark:aria-invalid:ring-destructive/40 ds:aria-invalid:border-destructive",
  {
    variants: {
      size: {
        xs: "ds:h-6 ds:text-xs ds:px-2 ds:py-0.5",
        sm: "ds:h-8 ds:text-sm ds:px-2.5 ds:py-1",
        normal: "ds:h-9 ds:px-3 ds:py-1",
        lg: "ds:h-11 ds:px-4 ds:py-2",
        xl: "ds:h-14 ds:px-5 ds:py-3",
      },
      state: {
        default: "",
        success:
          "ds:border-success ds:ring-success/30 ds:focus-visible:border-success ds:focus-visible:ring-success/50",
        error:
          "ds:border-destructive ds:ring-destructive/30 ds:focus-visible:border-destructive ds:focus-visible:ring-destructive/50",
        warning:
          "ds:border-warning ds:ring-warning/30 ds:focus-visible:border-warning ds:focus-visible:ring-warning/50",
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
