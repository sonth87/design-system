import { cn } from "@dsui/ui/index";
import type { BasicAnimation } from "@/types/variables";
import { easeOut, motion } from "motion/react";
import Glass from "../components/Glass/Glass";

export const animationClass = (
  animation?: BasicAnimation,
  className?: string,
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
        className: cn("animate-heartbeat", className),
      };
    case "rainbow":
      return {
        className: cn(
          "animate-rainbow text-primary-foreground focus-visible:ring-ring/50 relative inline-flex h-9 items-center justify-center gap-2 rounded-md border-2 border-transparent bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          "before:animate-rainbow before:absolute before:bottom-[-20%] before:left-0 before:z-0 before:h-1/5 before:w-full before:bg-[linear-gradient(90deg,#ff4242,#a1ff42,#42a1ff,#42d0ff,#a142ff)] before:[filter:blur(calc(0.625*1rem))] bg-[linear-gradient(var(--primary),var(--primary)),linear-gradient(var(--primary)_30%,rgba(0,0,0,0)),linear-gradient(90deg,#ff4242,#a1ff42,#42a1ff,#42d0ff,#a142ff)]",
          className,
        ),
      };
    case "shine":
      return {
        className: cn(
          "relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]",
          className,
        ),
      };
    case "bounce":
      return {
        children: (
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={cn(rootClassName, "transition-none", className)}
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
            className={cn(rootClassName, "transition-none", className)}
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
          <Glass className={cn("hover:scale-110", roundedClass)}>
            <span
              className={cn(
                rootClassName,
                "!bg-none !bg-transparent",
                className,
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
        className: cn(rootClassName, "animate-glow", className),
      };
    case "liquid":
      return {
        className: cn(
          "relative overflow-hidden",
          "bg-[linear-gradient(rgba(0,0,0,0.15)_0_0)] bg-no-repeat",
          "bg-[length:200%_0.4em] bg-[position:200%_100%]",
          "[transition:0.3s_0s,background-position_0.3s_0.3s]",
          "hover:bg-[length:200%_100%] hover:bg-[position:0%_100%]",
          "hover:text-white",
          "hover:[transition:0.3s_0.3s,background-position_0.3s_0s]",
          className,
        ),
      };
    case "link-underline":
      return {
        variant: (variantType ? "link" : undefined) as S,
        className: cn(
          "after:bg-primary relative !no-underline after:absolute after:bottom-2 after:h-px after:w-2/3 after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
          className,
        ),
      };
    case "loading":
      return {
        className: cn(
          "relative overflow-hidden",
          "before:content-[''] before:absolute before:z-[1] before:top-0 before:-left-full before:w-[300%] before:h-full",
          "before:bg-[repeating-linear-gradient(60deg,transparent,transparent_10px,#ffffff20_10px,#ffffff20_20px)]",
          "before:animate-slide-loading",
          className,
        ),
      };
    case "draw":
      return {
        className: cn("animate-draw", className),
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
