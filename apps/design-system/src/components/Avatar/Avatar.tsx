import * as React from "react";
import {
  Avatar as DsAvatar,
  AvatarImage,
  AvatarFallback,
} from "@dsui/ui/components/avatar";
import { cn } from "@dsui/ui/index";
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
        return "size-10";
    }
  }, [size]);

  const avatarVariant = React.useMemo<string>(() => {
    switch (variant) {
      case "circle":
        return "rounded-full";
      case "square":
        return "rounded-md";
      default:
        return "rounded-full";
    }
  }, [variant]);

  const avatarColor = React.useMemo<string>(() => {
    switch (color) {
      case "primary":
        return "bg-primary text-primary-foreground";
      case "secondary":
        return "bg-secondary text-secondary-foreground";
      case "dark":
        return "bg-neutral-900 text-white";
      case "light":
        return "bg-neutral-200 text-neutral-950";
      case "inverted":
        return "dark:bg-white dark:text-black";
      case "success":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "error":
        return "bg-error text-error-foreground";
      case "glass":
        return "bg-white/15 backdrop-blur-sm";
      default:
        return "";
    }
  }, [color]);

  return (
    <DsAvatar
      className={cn(
        "relative flex shrink-0 overflow-hidden transition-all duration-300",
        avatarSize,
        avatarVariant,
        avatarAnimation?.className,
        avatarColor,
        className
      )}
      {...props}
    >
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback className={cn(avatarColor, className)}>
        {fallback}
      </AvatarFallback>
    </DsAvatar>
  );
}
