"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: "ds:bg-primary",
  secondary: "ds:bg-secondary",
  accent: "ds:bg-accent",
  destructive: "ds:bg-destructive",
  muted: "ds:bg-muted",
  success: "ds:bg-success",
  error: "ds:bg-error",
  warning: "ds:bg-warning",
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
  const baseColor = color ? colorVariants[color] : "ds:bg-border";
  if (children) {
    if (orientation === "horizontal") {
      return (
        <div className={cn("ds:flex ds:items-center", className)}>
          {textPosition === "start" && (
            <>
              <span className="ds:text-sm ds:text-muted-foreground">{children}</span>
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
              <span className="ds:text-sm ds:text-muted-foreground ds:px-2">
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
              <span className="ds:text-sm ds:text-muted-foreground">{children}</span>
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
              <span className="ds:text-sm ds:text-foreground ds:bg-background ds:px-1 ds:rounded">
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
              <span className="ds:text-sm ds:text-foreground ds:bg-background ds:px-1 ds:rounded">
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
              <span className="ds:text-sm ds:text-foreground ds:bg-background ds:px-1 ds:rounded">
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
        `${baseColor} shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px`,
        className
      )}
      {...props}
    />
  );
}

export { Separator, type SeparatorProps };
