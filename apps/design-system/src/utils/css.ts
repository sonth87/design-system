import { cn } from "@dsui/ui/index";
import type { BasicAnimation } from "@/types/variables";

export const animationClass = (
  animation?: BasicAnimation,
  className?: string
) => {
  switch (animation) {
    case "bounce":
      return {
        className: cn("animate-bounce", className),
      };
    case "slide-up":
      return {
        className: cn("animate-slide-in-from-bottom", className),
      };
    case "slide-down":
      return {
        className: cn("animate-slide-in-from-top", className),
      };
    case "slide-left":
      return {
        className: cn("animate-slide-in-from-right", className),
      };
    case "slide-right":
      return {
        className: cn("animate-slide-in-from-left", className),
      };
    case "zoom-in":
      return {
        className: cn("animate-zoom-in", className),
      };
    case "zoom-out":
      return {
        className: cn("animate-zoom-out", className),
      };
    case "skewed":
      return {
        className: cn("animate-skewed-in", className),
      };
    case "flip":
      return {
        className: cn("animate-flip-in", className),
      };
    case "shake":
      return {
        className: cn("animate-shake", className),
      };
    default:
      return { className };
  }
};
