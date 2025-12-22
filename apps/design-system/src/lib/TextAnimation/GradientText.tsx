"use client";

import * as React from "react";
import { motion, type Transition } from "motion/react";
import { cn } from "@dsui/ui/index";

type GradientTextProps = React.ComponentProps<"span"> & {
  text: string;
  gradient?: string;
  neon?: boolean;
  transition?: Transition;
};

function GradientText({
  text,
  className,
  gradient = "linear-gradient(90deg, #3b82f6 0%, #a855f7 20%, #ec4899 50%, #a855f7 80%, #3b82f6 100%)",
  neon = false,
  transition = { duration: 3, repeat: Infinity, ease: "linear" },
  ...props
}: GradientTextProps) {
  const baseStyle: React.CSSProperties = {
    backgroundImage: gradient,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    backgroundSize: "200% 100%",
    color: "transparent",
  };

  return (
    <span
      data-slot="gradient-text"
      className={cn("relative inline-block", className)}
      {...(props as any)}
    >
      <motion.span
        className="m-0 text-transparent"
        style={baseStyle as any}
        animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
        transition={transition}
      >
        {text}
      </motion.span>

      {neon && (
        <motion.span
          className="m-0 absolute top-0 left-0 text-transparent blur-sm mix-blend-plus-lighter"
          style={baseStyle as any}
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={transition}
        >
          {text}
        </motion.span>
      )}
    </span>
  );
}

export { GradientText, type GradientTextProps };
