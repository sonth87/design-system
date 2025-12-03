import React from "react";
import {
  ButtonGroup as SButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
} from "@dsui/ui/components/button-group";
import { cn } from "@dsui/ui/lib/utils";
import { type VariantProps } from "class-variance-authority";
import Button, { type ButtonProps } from "./Button";

export type ButtonGroupProps = React.ComponentProps<typeof SButtonGroup> &
  VariantProps<typeof buttonGroupVariants> & {
    variant?: ButtonProps["variant"];
    color?: ButtonProps["color"];
    size?: ButtonProps["size"];
    animation?: ButtonProps["animation"];
    isLoading?: ButtonProps["isLoading"];
    disabled?: boolean;
  };

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant,
      color,
      size,
      animation,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Button) {
        const childProps = child.props as ButtonProps;
        return React.cloneElement(child as React.ReactElement<ButtonProps>, {
          variant:
            animation === "glass" ? "ghost" : (childProps.variant ?? variant),
          color: childProps.color ?? color,
          size: childProps.size ?? size,
          animation: childProps.animation ?? animation,
          isLoading: childProps.isLoading ?? isLoading,
          disabled: childProps.disabled ?? disabled,
        });
      }
      return child;
    });

    return (
      <SButtonGroup
        ref={ref}
        orientation={orientation}
        className={cn(className)}
        {...props}
      >
        {childrenWithProps}
      </SButtonGroup>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroupSeparator, ButtonGroupText };
export default ButtonGroup;
