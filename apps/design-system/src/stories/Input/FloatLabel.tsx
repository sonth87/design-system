import * as React from "react";

import { cn } from "@dsui/ui/lib/utils";
import { Label } from "@dsui/ui/components/label";
import { Tooltip } from "../Tooltip/Tooltip";
import { Info } from "lucide-react";

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    infoTooltip?: React.ReactNode;
    size?: string;
  }
>(({ className, infoTooltip, size = "xl", children, ...props }, ref) => {
  const lagerSize = size === "lg" || false;

  return (
    <Label
      className={cn(
        "absolute start-2 z-10 select-none",
        "bg-background px-3 text-gray-500 translate-y-2",
        "flex",
        {
          "top-0.5 origin-[0] scale-75 translate-x-1 max-w-full h-3 py-0":
            !lagerSize,
          // State empty (placeholder shown) - ở giữa input
          "peer-placeholder-shown:top-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:w-[calc(100%-theme(spacing.4))] peer-placeholder-shown:h-[calc(100%-theme(spacing.4))] peer-placeholder-shown:py-3":
            !lagerSize,
          // // State focus - nằm trên input
          "peer-focus:top-0.5 peer-focus:origin-[0] peer-focus:scale-75 peer-focus:translate-x-1 peer-focus:text-primary peer-focus:max-w-full peer-focus:h-3 peer-focus:py-0":
            !lagerSize,
        },
        {
          "-top-3.5 origin-[0] scale-75 translate-x-0 max-w-full w-auto h-3 py-0":
            lagerSize,
          // State empty (placeholder shown) - ở giữa input
          "peer-placeholder-shown:-top-0.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:w-[calc(100%-theme(spacing.4))] peer-placeholder-shown:h-[calc(100%-theme(spacing.3))] peer-placeholder-shown:py-2":
            lagerSize,
          // // State focus - nằm trên input
          "peer-focus:-top-3.5 peer-focus:origin-[0] peer-focus:scale-75 peer-focus:text-primary peer-focus:max-w-full peer-focus:w-auto peer-focus:h-3 peer-focus:py-0":
            lagerSize,
        },
        "will-change-transform transition-all duration-300 ease-in-out",
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="truncate whitespace-nowrap max-w-full pointer-events-none">{children}</span>

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
