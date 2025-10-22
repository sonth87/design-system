import * as React from "react";
import {
  Tooltip as DsTooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  type TooltipContentProps,
} from "@dsui/ui/components/tooltip";
import { cn } from "@dsui/ui/index";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import type { BasicAnimation, BasicColor } from "@/types/variables";
import { useMemo } from "react";
import { animationClass } from "@/utils/css";

type Color = BasicColor | "dark" | "light" | "inverted";

export type TooltipProps = TooltipContentProps & {
  content: React.ReactNode;
  children: React.ReactNode;
  sideOffset?: number;
  delayDuration?: number;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
  noArrow?: boolean;
  animation?: BasicAnimation;
  color?: Color | string;
};

export function Tooltip({
  content,
  children,
  sideOffset = 4,
  delayDuration = 0,
  className,
  position = "top",
  noArrow = false,
  animation,
  ...props
}: TooltipProps) {
  const [show, setShow] = React.useState(false);
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
      default:
        return "";
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

  if (animation === "spec") {
    const ChildComp = () => {
      if (!children) return <></>;

      const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth);
      };
      const handleMouseEnter = () => setShow(true);
      const handleMouseLeave = () => setShow(false);

      if (typeof children === "string" || typeof children === "number") {
        return (
          <span
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </span>
        );
      }

      return React.cloneElement(children as any, {
        onMouseMove: handleMouseMove,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      });
    };

    return (
      <div className={cn("relative -me-2.5 inline-block", className)}>
        <AnimatePresence mode="popLayout">
          {show && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: -5,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="text-primary-foreground bg-primary absolute -top-2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-full flex-col items-center justify-center rounded-md px-4 py-2 text-xs shadow-xl"
            >
              <div className="relative z-1">{content}</div>
            </motion.div>
          )}
        </AnimatePresence>

        <ChildComp />
      </div>
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
}
