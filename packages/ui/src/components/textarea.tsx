import * as React from "react";

import { cn } from "@dsui/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const textareaVariants = cva(
  "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      size: {
        xs: "text-xs min-h-32 px-2 py-0.5",
        sm: "text-sm min-h-32 px-2.5 py-1",
        normal: "min-h-32 px-3 py-1",
        lg: "min-h-32 px-4 py-2",
        xl: "min-h-32 px-5 py-3",
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
