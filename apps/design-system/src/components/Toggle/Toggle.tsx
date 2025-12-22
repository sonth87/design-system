import React from "react";
import { Toggle as SToggle } from "@dsui/ui/components/toggle";

export type ToggleProps = Omit<
  React.ComponentPropsWithoutRef<typeof SToggle>,
  "variant" | "size" | "color"
> & {
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "muted"
    | "success"
    | "error"
    | "warning";
};

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (props, ref) => {
    const { variant = "default", size = "default", color, ...rest } = props;

    return (
      <SToggle
        ref={ref}
        {...rest}
        variant={variant}
        size={size}
        color={color}
      />
    );
  }
);

Toggle.displayName = "Toggle";
export default Toggle;
