import React from "react";
import { RadioGroupItem as SRadioGroupItem } from "@dsui/ui/components/radio-group";

export type RadioProps = React.ComponentProps<typeof SRadioGroupItem>;

const Radio = React.forwardRef<HTMLButtonElement, RadioProps>((props, ref) => {
  const {
    variant = "default",
    size = "default",
    color = "primary",
    ...rest
  } = props;

  return (
    <SRadioGroupItem
      ref={ref}
      {...rest}
      variant={variant}
      size={size}
      color={color}
    />
  );
});

Radio.displayName = "Radio";
export default Radio;
