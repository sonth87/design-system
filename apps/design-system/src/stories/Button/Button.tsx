import React, { useMemo } from "react";
import {
  buttonVariants,
  Button as SButton,
  type ButtonProps as SButtonProps,
} from "@dsui/ui/components/button";
import { cn } from "@dsui/ui/lib/utils";
import type { ButtonAnimation } from "@/types/variables";
import { LoaderCircle } from "lucide-react";
import { animationEffect } from "@/utils/css";

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
    const {
      variant = "solid",
      size = "normal",
      color,
      animation,
      ...rest
    } = props;

    const buttonAnimation = useMemo<AnimResult | null>(() => {
      return animationEffect<ButtonAnimation, SButtonProps["variant"]>({
        animation,
        children: rest?.children,
        className: rest?.className,
        rootClassName: buttonVariants({
          variant: variant,
          size: size,
        }),
        variantType: variant,
        ...rest,
      });
    }, [animation, rest, color, size, variant]);

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
        variant={buttonAnimation?.variant ?? variant}
        color={color}
        size={size}
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
