import * as React from "react";

import { cn } from "@dsui/ui/lib/utils";
import { Label } from "@dsui/ui/components/label";
import { Tooltip } from "../Tooltip/Tooltip";
import { Info } from "lucide-react";

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    infoTooltip?: React.ReactNode;
    size?: "xs" | "sm" | "normal" | "lg" | "xl";
  }
>(({ className, infoTooltip, size = "normal", children, ...props }, ref) => {
  const largeSize = size === "lg" || size === "xl";

  return (
    <Label
      className={cn(
        "absolute start-2 z-10 select-none",
        "bg-background px-3 text-gray-500 translate-y-2",
        "flex items-center gap-2",
        {
          "top-0.5 origin-[0] scale-75 translate-x-1 max-w-full h-3 py-0":
            !largeSize,
          // State empty (placeholder shown) - ở giữa textarea
          "peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:w-[calc(100%-theme(spacing.4))] peer-placeholder-shown:h-10 peer-placeholder-shown:py-3":
            !largeSize,
          // State focus - nằm trên textarea
          "peer-focus:top-0.5 peer-focus:origin-[0] peer-focus:scale-75 peer-focus:translate-x-1 peer-focus:text-primary peer-focus:max-w-full peer-focus:h-3 peer-focus:py-0":
            !largeSize,
        },
        {
          "-top-3.5 origin-[0] scale-75 translate-x-0 max-w-full w-auto h-3 py-0":
            largeSize,
          // State empty (placeholder shown) - ở giữa textarea
          "peer-placeholder-shown:top-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:w-[calc(100%-theme(spacing.4))] peer-placeholder-shown:h-8 peer-placeholder-shown:py-2":
            largeSize,
          // State focus - nằm trên textarea
          "peer-focus:-top-3.5 peer-focus:origin-[0] peer-focus:scale-75 peer-focus:text-primary peer-focus:max-w-full peer-focus:w-auto peer-focus:h-3 peer-focus:py-0":
            largeSize,
        },
        "will-change-transform transition-all duration-300 ease-in-out",
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="truncate whitespace-nowrap max-w-full pointer-events-none">
        {children}
      </span>

      {infoTooltip && (
        <Tooltip content={infoTooltip}>
          <Info className="size-3.5 min-w-3.5" />
        </Tooltip>
      )}
    </Label>
  );
});

FloatingLabel.displayName = "FloatingLabel";

export { FloatingLabel };
