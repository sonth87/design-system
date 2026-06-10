import { cn } from "@dsui/ui/lib/utils";
import type { BasicAnimation } from "@/types/variables";
import { easeOut, motion } from "motion/react";
import Glass from "../components/Glass/Glass";

export const animationClass = (
  animation?: BasicAnimation,
  className?: string
) => {
  switch (animation) {
    case "bounce":
      return {
        className: cn("ds:animate-bounce", className),
      };
    case "slide-up":
      return {
        className: cn("ds:animate-slide-in-from-bottom", className),
      };
    case "slide-down":
      return {
        className: cn("ds:animate-slide-in-from-top", className),
      };
    case "slide-left":
      return {
        className: cn("ds:animate-slide-in-from-right", className),
      };
    case "slide-right":
      return {
        className: cn("ds:animate-slide-in-from-left", className),
      };
    case "zoom-in":
      return {
        className: cn("ds:animate-zoom-in", className),
      };
    case "zoom-out":
      return {
        className: cn("ds:animate-zoom-out", className),
      };
    case "skewed":
      return {
        className: cn("ds:animate-skewed-in", className),
      };
    case "flip":
      return {
        className: cn("ds:animate-flip-in", className),
      };
    case "shake":
      return {
        className: cn("ds:animate-shake", className),
      };
    case "gradient-outline":
      return {
        className: cn("ds:gradient-outline", className),
      };
    default:
      return { className };
  }
};

export const animationEffect = <T, S = undefined>({
  animation,
  children,
  className,
  rootClassName,
  variantType,
  ...rest
}: {
  animation?: T;
  children?: React.ReactNode;
  className?: string;
  rootClassName?: string;
  variantType?: S;
}) => {
  switch (animation) {
    case "heartbeat":
      return {
        className: cn("ds:animate-heartbeat", className),
      };
    case "rainbow":
      return {
        className: cn(
          "ds:animate-rainbow ds:text-primary-foreground ds:focus-visible:ring-ring/50 ds:relative ds:inline-flex ds:h-9 ds:items-center ds:justify-center ds:gap-2 ds:rounded-md ds:border-2 ds:border-transparent ds:bg-[length:200%] ds:[background-clip:padding-box,border-box,border-box] ds:[background-origin:border-box] ds:px-3 ds:py-2 ds:text-sm ds:font-medium ds:transition-colors ds:focus-visible:ring-[3px] ds:focus-visible:outline-none ds:disabled:pointer-events-none ds:disabled:opacity-50",
          "ds:before:animate-rainbow ds:before:absolute ds:before:bottom-[-20%] ds:before:left-0 ds:before:z-0 ds:before:h-1/5 ds:before:w-full ds:before:bg-[linear-gradient(90deg,#ff4242,#a1ff42,#42a1ff,#42d0ff,#a142ff)] ds:before:[filter:blur(calc(0.625*1rem))] ds:bg-[linear-gradient(var(--primary),var(--primary)),linear-gradient(var(--primary)_30%,rgba(0,0,0,0)),linear-gradient(90deg,#ff4242,#a1ff42,#42a1ff,#42d0ff,#a142ff)]",
          className
        ),
      };
    case "shine":
      return {
        className: cn(
          "ds:relative ds:overflow-hidden ds:before:absolute ds:before:inset-0 ds:before:rounded-[inherit] ds:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] ds:before:bg-[length:250%_250%,100%_100%] ds:before:bg-[position:200%_0,0_0] ds:before:bg-no-repeat ds:before:transition-[background-position_0s_ease] ds:before:duration-1000 ds:hover:before:bg-[position:-100%_0,0_0] ds:dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]",
          className
        ),
      };
    case "bounce":
      return {
        children: (
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={cn(rootClassName, "ds:transition-none", className)}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            {...rest}
          >
            {children}
          </motion.button>
        ),
      };
    case "tap":
      return {
        children: (
          <motion.button
            whileTap={{ scale: 0.85 }}
            className={cn(rootClassName, "ds:transition-none", className)}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            {...rest}
          >
            {children}
          </motion.button>
        ),
      };
    case "glass": {
      const roundedMatches = rootClassName?.match(/((?:!)?rounded-\S+)/g);
      const roundedClass = roundedMatches
        ? roundedMatches[roundedMatches.length - 1]
        : "rounded-md";

      return {
        variant: (variantType ? "link" : undefined) as S,
        children: (
          <Glass className={cn("ds:hover:scale-110", roundedClass)}>
            <span
              className={cn(
                rootClassName,
                "ds:!bg-none ds:!bg-transparent ds:border-0",
                className
              )}
            >
              {children}
            </span>
          </Glass>
        ),
      };
    }
    case "glow":
      return {
        className: cn(rootClassName, "ds:animate-glow", className),
      };
    case "liquid":
      return {
        className: cn(
          "ds:relative ds:overflow-hidden",
          "ds:bg-[linear-gradient(rgba(0,0,0,0.15)_0_0)] ds:bg-no-repeat",
          "ds:bg-[length:200%_0.4em] ds:bg-[position:200%_100%]",
          "ds:[transition:0.3s_0s,background-position_0.3s_0.3s]",
          "ds:hover:bg-[length:200%_100%] ds:hover:bg-[position:0%_100%]",
          "ds:hover:text-white",
          "ds:hover:[transition:0.3s_0.3s,background-position_0.3s_0s]",
          className
        ),
      };
    case "link-underline":
      return {
        variant: (variantType ? "link" : undefined) as S,
        className: cn(
          "ds:after:bg-primary ds:relative ds:!no-underline ds:after:absolute ds:after:bottom-2 ds:after:h-px ds:after:w-2/3 ds:after:origin-bottom-right ds:after:scale-x-0 ds:after:transition-transform ds:after:duration-300 ds:after:ease-in-out ds:hover:after:origin-bottom-left ds:hover:after:scale-x-100",
          className
        ),
      };
    case "loading":
      return {
        className: cn(
          "ds:relative ds:overflow-hidden",
          "ds:before:content-[''] ds:before:absolute ds:before:z-[1] ds:before:top-0 ds:before:-left-full ds:before:w-[300%] ds:before:h-full",
          "ds:before:bg-[repeating-linear-gradient(60deg,transparent,transparent_10px,#ffffff20_10px,#ffffff20_20px)]",
          "ds:before:animate-slide-loading",
          className
        ),
      };
    case "gradient-outline":
      return {
        className: cn("ds:gradient-outline", className),
      };
    case "draw":
      return {
        className: cn("ds:animate-draw", className),
      };
    default:
      return null;
  }
};

export const particleAnimation = (index: number) => {
  const angle = Math.random() * Math.PI * 2;
  const distance = 30 + Math.random() * 20;

  return {
    initial: { x: "50%", y: "50%", scale: 0, opacity: 0 },
    animate: {
      x: `calc(50% + ${Math.cos(angle) * distance}px)`,
      y: `calc(50% + ${Math.sin(angle) * distance}px)`,
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
    },
    transition: { duration: 0.4, delay: index * 0.05, ease: easeOut },
  };
};
