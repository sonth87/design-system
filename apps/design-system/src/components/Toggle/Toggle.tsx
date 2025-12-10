import React from "react";
import { Toggle as SToggle } from "@dsui/ui/components/toggle";

export type ToggleProps = React.ComponentProps<typeof SToggle>;

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
