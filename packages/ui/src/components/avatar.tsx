"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@dsui/ui/lib/utils";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

function Avatar({
  className,
  size = "sm",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: Size;
}) {
  const avatarSize = React.useMemo<string>(() => {
    switch (size) {
      case "xs":
        return "size-6";
      case "sm":
        return "size-8";
      case "md":
        return "size-10";
      case "lg":
        return "size-12";
      case "xl":
        return "size-16";
      default:
        return "size-8";
    }
  }, [size]);

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 rounded-full",
        avatarSize,
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
