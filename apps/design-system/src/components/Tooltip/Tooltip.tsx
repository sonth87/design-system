import * as React from "react";
import {
  Tooltip as DsTooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  type TooltipContentProps,
} from "@dsui/ui/components/tooltip";
import { cn } from "@dsui/ui/index";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { BasicAnimation, BasicColor } from "@/types/variables";
import { useMemo, useCallback } from "react";
import { animationClass } from "@/utils/animations";

type Color = BasicColor | "dark" | "light" | "inverted";

export type TooltipProps = TooltipContentProps & {
  content: React.ReactNode;
  children: React.ReactNode;
  sideOffset?: number;
  delayDuration?: number;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
  childClassName?: string;
  noArrow?: boolean;
  animation?: BasicAnimation;
  color?: Color;
};

export const Tooltip = React.memo(function Tooltip({
  content,
  children,
  sideOffset = 4,
  delayDuration = 0,
  className,
  childClassName,
  position = "top",
  noArrow = false,
  animation,
  ...props
}: TooltipProps) {
  const springConfig = { stiffness: 100, damping: 5 };

  const tooltipAnimation = useMemo<{ className?: string } | null>(() => {
    return animationClass(animation, className);
  }, [animation, className]);

  const tooltipColor = useMemo<string>(() => {
    switch (props.color) {
      case "primary":
        return "bg-primary text-primary-foreground [&>span>svg]:bg-primary [&>span>svg]:fill-primary";
      case "secondary":
        return "bg-secondary text-secondary-foreground [&>span>svg]:bg-secondary [&>span>svg]:fill-secondary";
      case "dark":
        return "";
      case "light":
        return "bg-neutral-200 text-neutral-950 [&_svg]:bg-neutral-200 [&_svg]:fill-neutral-200";
      case "inverted":
        return "dark:bg-white dark:text-black dark:[&_svg]:bg-white dark:[&_svg]:fill-white";
      case "success":
        return "bg-success text-success-foreground [&>span>svg]:bg-success [&>span>svg]:fill-success";
      case "warning":
        return "bg-warning text-warning-foreground [&>span>svg]:bg-warning [&>span>svg]:fill-warning";
      case "error":
        return "bg-error text-error-foreground [&>span>svg]:bg-error [&>span>svg]:fill-error";
      case "glass":
        return "bg-white/15 text-foreground backdrop-blur-sm shadow-lg [&>span>svg]:bg-white/15 [&>span>svg]:fill-white/15";
      default:
        return "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance";
    }
  }, [props?.color]);

  // on mouse move
  const x = useMotionValue(0);
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const halfWidth = (event.target as HTMLElement).offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    },
    [x],
  );

  const ChildComp = React.memo(() => {
    if (!children) return <></>;

    return (
      <span
        onMouseMove={handleMouseMove}
        className={cn("inline-block", childClassName)}
      >
        {children}
      </span>
    );
  });

  if (animation === "spec") {
    return (
      <motion.div
        className={cn("relative -me-2.5 inline-block", className)}
        whileHover="hover"
        initial="initial"
      >
        <motion.div
          variants={{
            initial: { opacity: 0, y: 20, scale: 0 },
            hover: {
              opacity: 1,
              y: -5,
              scale: 1,
              transition: {
                type: "tween",
                duration: 0.2,
                ease: "easeOut",
              },
            },
          }}
          style={{
            translateX: translateX,
            rotate: rotate,
            whiteSpace: "nowrap",
          }}
          className={cn(
            "absolute -top-2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-full flex-col items-center justify-center rounded-md px-4 py-2 text-xs shadow-xl",
            tooltipColor,
          )}
        >
          <div className="relative z-1">{content}</div>
        </motion.div>

        <ChildComp />
      </motion.div>
    );
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <DsTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          {...props}
          side={position}
          sideOffset={sideOffset}
          className={cn(tooltipAnimation?.className, tooltipColor, {
            "[&>span>svg]:invisible": noArrow,
          })}
        >
          {content}
        </TooltipContent>
      </DsTooltip>
    </TooltipProvider>
  );
});
