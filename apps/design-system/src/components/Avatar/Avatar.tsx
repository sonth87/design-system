import * as React from "react";
import {
  Avatar as DsAvatar,
  AvatarImage,
  AvatarFallback,
} from "@dsui/ui/components/avatar";
import { cn } from "@dsui/ui/lib/utils";
import type { BasicAnimation, BasicColor } from "@/types/variables";
import { animationClass } from "@/utils/animations";

type Color = BasicColor | "dark" | "light" | "inverted";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

type Variant = "circle" | "square";

export type AvatarProps = React.ComponentProps<typeof DsAvatar> & {
  size?: Size;
  variant?: Variant;
  animation?: BasicAnimation;
  color?: Color | string;
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
};

export function Avatar({
  size = "md",
  variant = "circle",
  animation,
  color,
  className,
  src,
  alt,
  fallback,
  ...props
}: AvatarProps) {
  const avatarAnimation = React.useMemo<{ className?: string } | null>(() => {
    return animationClass(animation, className);
  }, [animation, className]);

  const avatarSize = React.useMemo<string>(() => {
    switch (size) {
      case "xs":
        return "ds:size-6";
      case "sm":
        return "ds:size-8";
      case "md":
        return "ds:size-10";
      case "lg":
        return "ds:size-12";
      case "xl":
        return "ds:size-16";
      default:
        return "ds:size-10";
    }
  }, [size]);

  const avatarVariant = React.useMemo<string>(() => {
    switch (variant) {
      case "circle":
        return "ds:rounded-full";
      case "square":
        return "ds:rounded-md";
      default:
        return "ds:rounded-full";
    }
  }, [variant]);

  const avatarColor = React.useMemo<string>(() => {
    switch (color) {
      case "primary":
        return "ds:bg-primaryA-500 ds:text-white";
      case "secondary":
        return "ds:bg-primaryC-500 ds:text-white";
      case "dark":
        return "ds:bg-ink1000 ds:text-white";
      case "light":
        return "ds:bg-ink200 ds:text-ink900";
      case "inverted":
        return "ds:dark:bg-white ds:dark:text-ink900";
      case "success":
        return "ds:bg-green500 ds:text-white";
      case "warning":
        return "ds:bg-orange500 ds:text-white";
      case "error":
        return "ds:bg-red500 ds:text-white";
      case "glass":
        return "ds:bg-white/15 ds:backdrop-blur-sm";
      default:
        return "";
    }
  }, [color]);

  return (
    <DsAvatar
      className={cn(
        "ds:relative ds:flex ds:shrink-0 ds:transition-all ds:duration-300",
        avatarSize,
        avatarVariant,
        avatarAnimation?.className,
        avatarColor,
        className
      )}
      {...props}
    >
      {src && <AvatarImage src={src} alt={alt} className="ds:rounded-[inherit]" />}
      <AvatarFallback
        className={cn("ds:rounded-[inherit]", avatarColor, className)}
      >
        {fallback}
      </AvatarFallback>
    </DsAvatar>
  );
}
