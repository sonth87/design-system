import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@dsui/ui/lib/utils";

const inputVariants = cva(
  "ds:file:text-ink800 ds:placeholder:text-ink700 ds:selection:bg-primaryA-500 ds:selection:text-white ds:dark:bg-white ds:border-border ds:w-full ds:min-w-0 ds:rounded-md ds:border ds:bg-transparent ds:shadow-xs ds:transition-[color,box-shadow] ds:outline-none ds:file:inline-flex ds:file:h-7 ds:file:border-0 ds:file:bg-transparent ds:file:text-sm ds:file:font-medium ds:disabled:pointer-events-none ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:focus-visible:border-ink500 ds:focus-visible:ring-ink500/50 ds:focus-visible:ring-[3px] ds:aria-invalid:ring-red600/20 ds:dark:aria-invalid:ring-red600/40 ds:aria-invalid:border-red600",
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
          "ds:border-green500 ds:ring-green500/30 ds:focus-visible:border-green500 ds:focus-visible:ring-green500/50",
        error:
          "ds:border-red600 ds:ring-red600/30 ds:focus-visible:border-red600 ds:focus-visible:ring-red600/50",
        warning:
          "ds:border-orange500 ds:ring-orange500/30 ds:focus-visible:border-orange500 ds:focus-visible:ring-orange500/50",
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
