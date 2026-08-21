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
    required?: boolean;
  }
>(
  (
    {
      className,
      infoTooltip,
      size = "xl",
      shouldFloat,
      required,
      children,
      ...props
    },
    ref
  ) => {
    const lagerSize = size === "lg" || false;

    return (
      <Label
        className={cn(
          "ds:absolute ds:start-2 ds:select-none ds:pointer-events-none",
          "ds:bg-white ds:px-3 ds:translate-y-2",
          "ds:flex",
          {
            "ds:top-0.5 ds:origin-left ds:scale-75 ds:translate-x-1 ds:max-w-full ds:h-3 ds:py-0 ds:bg-transparent":
              !lagerSize,
            // State empty (placeholder shown) - ở giữa input
            "ds:peer-placeholder-shown:top-0 ds:peer-placeholder-shown:scale-100 ds:peer-placeholder-shown:translate-x-0 ds:peer-placeholder-shown:w-[calc(100%-(--spacing(4)))] ds:peer-placeholder-shown:h-[calc(100%-(--spacing(4)))] ds:peer-placeholder-shown:py-3 ds:peer-placeholder-shown:bg-white":
              !lagerSize,
            // // State focus - nằm trên input
            "ds:peer-focus:top-0.5 ds:peer-focus:origin-left ds:peer-focus:scale-75 ds:peer-focus:translate-x-1 ds:peer-focus:text-primaryA-500 ds:peer-focus:max-w-full ds:peer-focus:h-3 ds:peer-focus:py-0 ds:peer-focus:bg-transparent":
              !lagerSize,
            "ds:group-focus-within:top-0.5 ds:group-focus-within:origin-left ds:group-focus-within:scale-75 ds:group-focus-within:translate-x-1 ds:group-focus-within:text-primaryA-500 ds:group-focus-within:max-w-full ds:group-focus-within:h-3 ds:group-focus-within:py-0 ds:group-focus-within:bg-transparent":
              !lagerSize,
          },
          {
            "ds:-top-3.5 ds:origin-left ds:scale-75 ds:translate-x-0 ds:max-w-full ds:w-auto ds:h-3 ds:py-0":
              lagerSize,
            // State empty (placeholder shown) - ở giữa input
            "ds:peer-placeholder-shown:-top-0.5 ds:peer-placeholder-shown:scale-100 ds:peer-placeholder-shown:w-[calc(100%-(--spacing(4)))] ds:peer-placeholder-shown:h-[calc(100%-(--spacing(3)))] ds:peer-placeholder-shown:py-2 ds:peer-placeholder-shown:bg-white":
              lagerSize,
            // // State focus - nằm trên input
            "ds:peer-focus:-top-3.5 ds:peer-focus:origin-left ds:peer-focus:scale-75 ds:peer-focus:text-primaryA-500 ds:peer-focus:max-w-full ds:peer-focus:w-auto ds:peer-focus:h-3 ds:peer-focus:py-0":
              lagerSize,
            "ds:group-focus-within:-top-3.5 ds:group-focus-within:origin-left ds:group-focus-within:scale-75 ds:group-focus-within:text-primaryA-500 ds:group-focus-within:max-w-full ds:group-focus-within:w-auto ds:group-focus-within:h-3 ds:group-focus-within:py-0":
              lagerSize,
          },

          // State when shouldFloat prop is set
          {
            "ds:top-0.5 ds:origin-left ds:scale-75 ds:translate-x-1 ds:max-w-full ds:h-3 ds:py-0":
              typeof shouldFloat === "boolean" && shouldFloat && !lagerSize,
            "ds:top-0 ds:scale-100 ds:translate-x-0 ds:w-[calc(100%-(--spacing(4)))] ds:h-[calc(100%-(--spacing(4)))] ds:py-3 ds:bg-white":
              typeof shouldFloat === "boolean" && !shouldFloat && !lagerSize,
          },
          {
            "ds:-top-3.5 ds:origin-left ds:scale-75 ds:translate-x-0 ds:max-w-full ds:h-3 ds:py-0":
              typeof shouldFloat === "boolean" && shouldFloat && lagerSize,
            "ds:top-0 ds:scale-100 ds:translate-x-0 ds:w-[calc(100%-(--spacing(4)))] ds:h-[calc(100%-(--spacing(4)))] ds:py-3 ds:bg-white":
              typeof shouldFloat === "boolean" && !shouldFloat && lagerSize,
          },
          "ds:will-change-transform ds:transition-all ds:duration-300 ds:ease-in-out",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="ds:truncate ds:whitespace-nowrap ds:max-w-full ds:pointer-events-none">
          {children}
          {required && <span className="ds:text-red500 ds:ml-0.5">*</span>}
        </span>

        {infoTooltip && (
          <Tooltip content={infoTooltip}>
            <Info className="ds:size-3.5 ds:min-w-3.5 ds:z-10 ds:pointer-events-auto" />
          </Tooltip>
        )}
      </Label>
    );
  }
);

FloatingLabel.displayName = "FloatingLabel";

export { FloatingLabel };
