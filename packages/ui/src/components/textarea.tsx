import * as React from "react";

import { cn } from "@dsui/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const textareaVariants = cva(
  "ds:border-border ds:placeholder:text-ink700 ds:focus-visible:border-ink500 ds:focus-visible:ring-ink500/50 ds:aria-invalid:ring-red600/20 ds:dark:aria-invalid:ring-red600/40 ds:aria-invalid:border-red600 ds:dark:background ds:flex ds:field-sizing-content ds:min-h-16 ds:w-full ds:rounded-md ds:border ds:bg-transparent ds:text-base ds:shadow-xs ds:transition-[color,box-shadow] ds:outline-none ds:focus-visible:ring-[3px] ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:md:text-sm",
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
