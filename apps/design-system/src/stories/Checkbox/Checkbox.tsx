import React from "react";
import { Checkbox as SCheckbox } from "@dsui/ui/components/checkbox";

export type CheckboxProps = React.ComponentProps<typeof SCheckbox>;

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => {
    const {
      variant = "default",
      size = "default",
      color = "primary",
      ...rest
    } = props;

    return (
      <SCheckbox
        ref={ref}
        {...rest}
        variant={variant}
        size={size}
        color={color}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
