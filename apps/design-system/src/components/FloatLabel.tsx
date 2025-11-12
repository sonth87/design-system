import * as React from "react";

import { cn } from "@dsui/ui/lib/utils";
import { Label } from "@dsui/ui/components/label";
import { Tooltip } from "./Tooltip/Tooltip";
import { Info } from "lucide-react";

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    infoTooltip?: React.ReactNode;
    size?: string;
    shouldFloat?: boolean;
  }
>(
  (
    { className, infoTooltip, size = "xl", shouldFloat, children, ...props },
    ref,
  ) => {
    const lagerSize = size === "lg" || false;

    return (
      <Label
        className={cn(
          "absolute start-2 select-none pointer-events-none",
          "bg-background px-3 translate-y-2",
          "flex",
          {
            "top-0.5 origin-left scale-75 translate-x-1 max-w-full h-3 py-0 bg-transparent":
              !lagerSize,
            // State empty (placeholder shown) - ở giữa input
            "peer-placeholder-shown:top-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-x-0 peer-placeholder-shown:w-[calc(100%-(--spacing(4)))] peer-placeholder-shown:h-[calc(100%-(--spacing(4)))] peer-placeholder-shown:py-3 peer-placeholder-shown:bg-background":
              !lagerSize,
            // // State focus - nằm trên input
            "peer-focus:top-0.5 peer-focus:origin-left peer-focus:scale-75 peer-focus:translate-x-1 peer-focus:text-primary peer-focus:max-w-full peer-focus:h-3 peer-focus:py-0 peer-focus:bg-transparent":
              !lagerSize,
            "group-focus-within:top-0.5 group-focus-within:origin-left group-focus-within:scale-75 group-focus-within:translate-x-1 group-focus-within:text-primary group-focus-within:max-w-full group-focus-within:h-3 group-focus-within:py-0 group-focus-within:bg-transparent":
              !lagerSize,
          },
          {
            "-top-3.5 origin-left scale-75 translate-x-0 max-w-full w-auto h-3 py-0":
              lagerSize,
            // State empty (placeholder shown) - ở giữa input
            "peer-placeholder-shown:-top-0.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:w-[calc(100%-(--spacing(4)))] peer-placeholder-shown:h-[calc(100%-(--spacing(3)))] peer-placeholder-shown:py-2 peer-placeholder-shown:bg-background":
              lagerSize,
            // // State focus - nằm trên input
            "peer-focus:-top-3.5 peer-focus:origin-left peer-focus:scale-75 peer-focus:text-primary peer-focus:max-w-full peer-focus:w-auto peer-focus:h-3 peer-focus:py-0":
              lagerSize,
            "group-focus-within:-top-3.5 group-focus-within:origin-left group-focus-within:scale-75 group-focus-within:text-primary group-focus-within:max-w-full group-focus-within:w-auto group-focus-within:h-3 group-focus-within:py-0":
              lagerSize,
          },

          // State when shouldFloat prop is set
          {
            "top-0.5 origin-left scale-75 translate-x-1 max-w-full h-3 py-0":
              typeof shouldFloat === "boolean" && shouldFloat && !lagerSize,
            "top-0 scale-100 translate-x-0 w-[calc(100%-(--spacing(4)))] h-[calc(100%-(--spacing(4)))] py-3 bg-background":
              typeof shouldFloat === "boolean" && !shouldFloat && !lagerSize,
          },
          {
            "-top-3.5 origin-left scale-75 translate-x-0 max-w-full h-3 py-0":
              typeof shouldFloat === "boolean" && shouldFloat && lagerSize,
            "top-0 scale-100 translate-x-0 w-[calc(100%-(--spacing(4)))] h-[calc(100%-(--spacing(4)))] py-3 bg-background":
              typeof shouldFloat === "boolean" && !shouldFloat && lagerSize,
          },
          "will-change-transform transition-all duration-300 ease-in-out",
          className,
        )}
        ref={ref}
        {...props}
      >
        <span className="truncate whitespace-nowrap max-w-full pointer-events-none">
          {children}
        </span>

        {infoTooltip && (
          <Tooltip content={infoTooltip}>
            <Info className="size-3.5 min-w-3.5 z-10 pointer-events-auto" />
          </Tooltip>
        )}
      </Label>
    );
  },
);

FloatingLabel.displayName = "FloatingLabel";

export { FloatingLabel };
