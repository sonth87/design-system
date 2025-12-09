"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@dsui/ui/lib/utils";

const colorVariants = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  destructive: "bg-destructive",
  muted: "bg-muted",
  success: "bg-success",
  error: "bg-error",
  warning: "bg-warning",
};

interface SeparatorProps extends React.ComponentProps<
  typeof SeparatorPrimitive.Root
> {
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
        <div className={cn("flex items-center", className)}>
          {textPosition === "start" && (
            <>
              <span className="text-sm text-muted-foreground">{children}</span>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} shrink-0 h-px flex-1 ml-2`}
              />
            </>
          )}
          {textPosition === "center" && (
            <>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} shrink-0 h-px flex-1`}
              />
              <span className="text-sm text-muted-foreground px-2">
                {children}
              </span>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} shrink-0 h-px flex-1`}
              />
            </>
          )}
          {textPosition === "end" && (
            <>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} shrink-0 h-px flex-1 mr-2`}
              />
              <span className="text-sm text-muted-foreground">{children}</span>
            </>
          )}
        </div>
      );
    } else if (orientation === "vertical") {
      return (
        <div
          className={cn(
            "flex flex-col items-center",
            orientation === "vertical" && "h-full",
            className,
          )}
        >
          {textPosition === "start" && (
            <>
              <span className="text-sm text-foreground bg-background px-1 rounded">
                {children}
              </span>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} shrink-0 w-px h-full flex-1 mt-2`}
              />
            </>
          )}
          {textPosition === "center" && (
            <>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} shrink-0 w-px h-full flex-1`}
              />
              <span className="text-sm text-foreground bg-background px-1 rounded">
                {children}
              </span>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} shrink-0 w-px h-full flex-1`}
              />
            </>
          )}
          {textPosition === "end" && (
            <>
              <SeparatorPrimitive.Root
                data-slot="separator"
                decorative={decorative}
                orientation={orientation}
                className={`${baseColor} shrink-0 w-px h-full flex-1 mb-2`}
              />
              <span className="text-sm text-foreground bg-background px-1 rounded">
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
        className,
      )}
      {...props}
    />
  );
}

export { Separator, type SeparatorProps };
