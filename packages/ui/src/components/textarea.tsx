import * as React from "react";

import { cn } from "@dsui/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const textareaVariants = cva(
  "ds:border-input ds:placeholder:text-muted-foreground ds:focus-visible:border-ring ds:focus-visible:ring-ring/50 ds:aria-invalid:ring-destructive/20 ds:dark:aria-invalid:ring-destructive/40 ds:aria-invalid:border-destructive ds:dark:background ds:flex ds:field-sizing-content ds:min-h-16 ds:w-full ds:rounded-md ds:border ds:bg-transparent ds:text-base ds:shadow-xs ds:transition-[color,box-shadow] ds:outline-none ds:focus-visible:ring-[3px] ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:md:text-sm",
  {
    variants: {
      size: {
        xs: "ds:text-xs ds:min-h-32 ds:px-2 ds:py-0.5",
        sm: "ds:text-sm ds:min-h-32 ds:px-2.5 ds:py-1",
        normal: "ds:min-h-32 ds:px-3 ds:py-1",
        lg: "ds:min-h-32 ds:px-4 ds:py-2",
        xl: "ds:min-h-32 ds:px-5 ds:py-3",
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

type TextareaProps = Omit<React.ComponentProps<"textarea">, "size"> & {
  size?: "normal" | "sm" | "xs" | "lg" | "xl";
  state?: "default" | "success" | "error" | "warning";
} & VariantProps<typeof textareaVariants>;

function Textarea({ size, state, className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ size, state, className }), className)}
      {...props}
    />
  );
}

export { Textarea, type TextareaProps };
