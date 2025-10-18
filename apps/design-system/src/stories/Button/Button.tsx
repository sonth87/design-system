import React, { useMemo } from "react";
import {
  buttonVariants,
  Button as SButton,
  type ButtonProps as SButtonProps,
} from "@dsui/ui/components/button";
import { cn } from "@dsui/ui/lib/utils";
import { motion } from "motion/react";
import type { ButtonAnimation } from "../../types/variables";
import Glass from "../Glass/Glass";
import { LoaderCircle } from "lucide-react";

export type ButtonProps = SButtonProps & {
  animation?: ButtonAnimation;
  isLoading?: boolean;
};

type AnimResult = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  variant?: SButtonProps["variant"];
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { animation, ...rest } = props;

    const buttonAnimation = useMemo<AnimResult | null>(() => {
      switch (animation) {
        case "heartbeat":
          return {
            className: cn("animate-heartbeat", rest?.className),
          };
        case "rainbow":
          return {
            className: cn(
              "animate-rainbow text-primary-foreground focus-visible:ring-ring/50 relative inline-flex h-9 items-center justify-center gap-2 rounded-md border-2 border-transparent bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-[3px] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
              "before:animate-rainbow before:absolute before:bottom-[-20%] before:left-0 before:z-0 before:h-1/5 before:w-full before:bg-[linear-gradient(90deg,#ff4242,#a1ff42,#42a1ff,#42d0ff,#a142ff)] before:[filter:blur(calc(0.625*1rem))] bg-[linear-gradient(var(--primary),var(--primary)),linear-gradient(var(--primary)_30%,rgba(0,0,0,0)),linear-gradient(90deg,#ff4242,#a1ff42,#42a1ff,#42d0ff,#a142ff)]",
              rest?.className
            ),
          };
        case "shine":
          return {
            className: cn(
              "relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]",
              rest?.className
            ),
          };
        case "bounce":
          return {
            children: (
              <motion.button
                whileHover={{ scale: 1.1 }}
                className={cn(
                  buttonVariants({ variant: rest?.variant, size: rest?.size }),
                  "transition-none",
                  rest?.className
                )}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {rest.children}
              </motion.button>
            ),
          };
        case "tap":
          return {
            children: (
              <motion.button
                whileTap={{ scale: 0.85 }}
                className={cn(
                  buttonVariants({ variant: rest?.variant, size: rest?.size }),
                  "transition-none",
                  rest?.className
                )}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {rest.children}
              </motion.button>
            ),
          };
        case "glass":
          return {
            variant: "link",
            className: cn("!no-underline", rest?.className),
            children: (
              <Glass className="hover:scale-110 hover:rounded-md">
                {rest.children}
              </Glass>
            ),
          };
        case "link-underline":
          return {
            variant: "link",
            className: cn(
              "after:bg-primary relative !no-underline after:absolute after:bottom-2 after:h-px after:w-2/3 after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
              rest?.className
            ),
          };
        case "loading":
          return {
            className: cn(
              "relative overflow-hidden",
              "before:content-[''] before:absolute before:z-[1] before:top-0 before:-left-full before:w-[300%] before:h-full",
              "before:bg-[repeating-linear-gradient(60deg,transparent,transparent_10px,#ffffff20_10px,#ffffff20_20px)]",
              "before:animate-slide-loading",
              rest?.className
            ),
          };
        case "draw":
          return {
            className: cn("animate-draw", rest?.className),
          };
        default:
          return null;
      }
    }, [animation, rest]);

    return (
      <SButton
        ref={ref}
        {...rest}
        className={cn(
          "cursor-pointer group",
          rest?.className,
          buttonAnimation?.className
        )}
        asChild={buttonAnimation?.children ? true : rest.asChild}
        style={{ ...(rest.style || {}), ...(buttonAnimation?.style || {}) }}
        variant={buttonAnimation?.variant ?? rest?.variant}
      >
        <>
          {rest?.isLoading && <LoaderCircle className="animate-spin" />}
          {
            (buttonAnimation?.children ??
              rest.children ??
              null) as SButtonProps["children"]
          }
        </>
      </SButton>
    );
  }
);

Button.displayName = "Button";
export default Button;
