import * as React from "react";

import { cn } from "@dsui/ui/lib/utils";
import { Label } from "@dsui/ui/components/label";

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & { size?: string }
>(({ className, size = "xl", ...props }, ref) => {
  const lagerSize = size === "lg" || false;

  return (
    <Label
      className={cn(
        "absolute start-2 z-10 pointer-events-none select-none",
        "bg-background px-3 text-gray-500 translate-y-2",
        "block truncate whitespace-nowrap",
        {
          "top-0.5 origin-[0] scale-75 translate-x-1 max-w-full h-3 py-0": !lagerSize,
          // State empty (placeholder shown) - ở giữa input
          "peer-placeholder-shown:top-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:w-[calc(100%-theme(spacing.4))] peer-placeholder-shown:h-10 peer-placeholder-shown:py-3":
            !lagerSize,
          // // State focus - nằm trên input
          "peer-focus:top-0.5 peer-focus:origin-[0] peer-focus:scale-75 peer-focus:translate-x-1 peer-focus:text-primary peer-focus:max-w-full peer-focus:h-3 peer-focus:py-0":
            !lagerSize,
        },
        {
          "-top-3.5 origin-[0] scale-75 translate-x-0 max-w-full h-3 py-0": lagerSize,
          // State empty (placeholder shown) - ở giữa input
          "peer-placeholder-shown:-top-0.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:w-[calc(100%-theme(spacing.4))] peer-placeholder-shown:h-8 peer-placeholder-shown:py-2":
            lagerSize,
          // // State focus - nằm trên input
          "peer-focus:-top-3.5 peer-focus:origin-[0] peer-focus:scale-75 peer-focus:text-primary peer-focus:max-w-full peer-focus:h-3 peer-focus:py-0":
            lagerSize,
        },
        "will-change-transform transition-all duration-300 ease-in-out",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

FloatingLabel.displayName = "FloatingLabel";

export { FloatingLabel };
