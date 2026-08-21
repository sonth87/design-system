import * as React from "react";
import {
  Tooltip as DsTooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  type TooltipContentProps,
} from "@dsui/ui/components/tooltip";
import { cn } from "@dsui/ui/lib/utils";
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
        return "ds:bg-primaryA-500 ds:text-white ds:[&>span>svg]:bg-primaryA-500 ds:[&>span>svg]:fill-primaryA-500";
      case "secondary":
        return "ds:bg-primaryC-500 ds:text-white ds:[&>span>svg]:bg-primaryC-500 ds:[&>span>svg]:fill-primaryC-500";
      case "dark":
        return "";
      case "light":
        return "ds:bg-ink200 ds:text-ink900 ds:[&_svg]:bg-ink200 ds:[&_svg]:fill-ink200";
      case "inverted":
        return "ds:dark:bg-white ds:dark:text-ink900 ds:dark:[&_svg]:bg-white ds:dark:[&_svg]:fill-white";
      case "success":
        return "ds:bg-green500 ds:text-white ds:[&>span>svg]:bg-green500 ds:[&>span>svg]:fill-green500";
      case "warning":
        return "ds:bg-orange500 ds:text-white ds:[&>span>svg]:bg-orange500 ds:[&>span>svg]:fill-orange500";
      case "error":
        return "ds:bg-red500 ds:text-white ds:[&>span>svg]:bg-red500 ds:[&>span>svg]:fill-red500";
      case "glass":
        return "ds:bg-white/15 ds:text-ink800 ds:backdrop-blur-sm ds:shadow-lg ds:[&>span>svg]:bg-white/15 ds:[&>span>svg]:fill-white/15";
      default:
        return "ds:bg-ink800 ds:text-white ds:animate-in ds:fade-in-0 ds:zoom-in-95 ds:data-[state=closed]:animate-out ds:data-[state=closed]:fade-out-0 ds:data-[state=closed]:zoom-out-95 ds:data-[side=bottom]:slide-in-from-top-2 ds:data-[side=left]:slide-in-from-right-2 ds:data-[side=right]:slide-in-from-left-2 ds:data-[side=top]:slide-in-from-bottom-2 ds:z-50 ds:w-fit ds:origin-(--radix-tooltip-content-transform-origin) ds:rounded-md ds:px-3 ds:py-1.5 ds:text-xs ds:text-balance";
    }
  }, [props?.color]);

  // on mouse move
  const x = useMotionValue(0);
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const halfWidth = (event.target as HTMLElement).offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    },
    [x]
  );

  const ChildComp = React.memo(() => {
    if (!children) return <></>;

    return (
      <span
        onMouseMove={handleMouseMove}
        className={cn("ds:inline-block", childClassName)}
      >
        {children}
      </span>
    );
  });

  if (animation === "spec") {
    return (
      <motion.div
        className={cn("ds:relative ds:-me-2.5 ds:inline-block", className)}
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
            "ds:absolute ds:-top-2 ds:left-1/2 ds:z-50 ds:flex ds:-translate-x-1/2 ds:-translate-y-full ds:flex-col ds:items-center ds:justify-center ds:rounded-md ds:px-4 ds:py-2 ds:text-xs ds:shadow-xl",
            tooltipColor
          )}
        >
          <div className="ds:relative ds:z-1">{content}</div>
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
            "ds:[&>span>svg]:invisible": noArrow,
          })}
        >
          {content}
        </TooltipContent>
      </DsTooltip>
    </TooltipProvider>
  );
});
