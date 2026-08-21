"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: "ds:bg-primaryA-500",
  secondary: "ds:bg-primaryC-500",
  accent: "ds:bg-ink200",
  destructive: "ds:bg-red600",
  muted: "ds:bg-ink200",
  success: "ds:bg-green500",
  error: "ds:bg-red500",
  warning: "ds:bg-orange500",
};

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  textPosition?: "start" | "center" | "end";
  children?: React.ReactNode;
  color?: keyof typeof colorVariants;
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  textPosition = "center",
  children,
  color,
  ...props
}: SeparatorProps) {
  const baseColor = color ? colorVariants[color] : "bg-border";
  if (children) {
    if (orientation === "horizontal") {
      return (
        <div className={cn("ds:flex ds:items-center", className)}>
          {textPosition === "start" && (
            <>
              <span className="ds:text-sm ds:text-ink700">{children}</span>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} ds:shrink-0 ds:h-px ds:flex-1 ds:ml-2`}
              />
            </>
          )}
          {textPosition === "center" && (
            <>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} ds:shrink-0 ds:h-px ds:flex-1`}
              />
              <span className="ds:text-sm ds:text-ink700 ds:px-2">
                {children}
              </span>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} ds:shrink-0 ds:h-px ds:flex-1`}
              />
            </>
          )}
          {textPosition === "end" && (
            <>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} ds:shrink-0 ds:h-px ds:flex-1 ds:mr-2`}
              />
              <span className="ds:text-sm ds:text-ink700">{children}</span>
            </>
          )}
        </div>
      );
    } else if (orientation === "vertical") {
      return (
        <div
          className={cn(
            "ds:flex ds:flex-col ds:items-center",
            orientation === "vertical" && "ds:h-full",
            className
          )}
        >
          {textPosition === "start" && (
            <>
              <span className="ds:text-sm ds:text-ink800 ds:bg-white ds:px-1 ds:rounded">
                {children}
              </span>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} ds:shrink-0 ds:w-px ds:h-full ds:flex-1 ds:mt-2`}
              />
            </>
          )}
          {textPosition === "center" && (
            <>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} ds:shrink-0 ds:w-px ds:h-full ds:flex-1`}
              />
              <span className="ds:text-sm ds:text-ink800 ds:bg-white ds:px-1 ds:rounded">
                {children}
              </span>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} ds:shrink-0 ds:w-px ds:h-full ds:flex-1`}
              />
            </>
          )}
          {textPosition === "end" && (
            <>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} ds:shrink-0 ds:w-px ds:h-full ds:flex-1 ds:mb-2`}
              />
              <span className="ds:text-sm ds:text-ink800 ds:bg-white ds:px-1 ds:rounded">
                {children}
              </span>
            </>
          )}
        </div>
      );
    }
  }

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        `${baseColor} ds:shrink-0 ds:data-[orientation=horizontal]:h-px ds:data-[orientation=horizontal]:w-full ds:data-[orientation=vertical]:h-full ds:data-[orientation=vertical]:w-px`,
        className
      )}
      {...props}
    />
  );
}

export { Separator, type SeparatorProps };
