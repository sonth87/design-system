import React, { useMemo } from "react";
import {
  badgeVariants,
  Badge as SBadge,
  type BadgeProps as SBadgeProps,
} from "@dsui/ui/components/badge";
import { cn } from "@dsui/ui/lib/utils";
import type { BadgeAnimation } from "@/types/variables";
import { LoaderCircle } from "lucide-react";
import { animationEffect } from "@/utils/css";

export type BadgeProps = SBadgeProps & {
  animation?: BadgeAnimation;
  isLoading?: boolean;
};

type AnimResult = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  variant?: SBadgeProps["variant"];
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { animation, ...rest } = props;

  const badgeAnimation = useMemo<AnimResult | null>(() => {
    return animationEffect<BadgeAnimation, SBadgeProps["variant"]>({
      animation,
      children: rest?.children,
      className: rest?.className,
      rootClassName: badgeVariants({
        variant: rest?.variant,
        size: rest?.size,
      }),
    });
  }, [animation, rest]);

  return (
    <SBadge
      ref={ref}
      {...rest}
      className={cn(rest?.className, badgeAnimation?.className)}
      asChild={badgeAnimation?.children ? true : rest.asChild}
    >
      <>
        {rest?.isLoading && <LoaderCircle className="animate-spin" />}
        {!rest?.isLoading && (badgeAnimation?.children ?? rest.children)}
      </>
    </SBadge>
  );
});

Badge.displayName = "Badge";
export default Badge;
