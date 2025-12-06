import React from "react";
import {
  RadioGroupItem as SRadioGroupItem,
  RadioGroup as SRadioGroup,
  type RadioGroupProps,
  type RadioGroupItemProps,
} from "@dsui/ui/components/radio-group";
import { cn } from "@dsui/ui/index";

type RadioItemProps = RadioGroupItemProps & {
  label?: React.ReactNode;
  variant?: "option" | "button-group";
  size?: "default" | "sm" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "muted"
    | "success"
    | "error"
    | "warning";
  rootClassName?: string;
};

const RadioItem = React.forwardRef<HTMLButtonElement, RadioItemProps>(
  (props, ref) => {
    const { label, variant = "option", rootClassName, ...itemProps } = props;
    const id = React.useId();

    return (
      <div className={cn("flex items-center space-x-2", rootClassName)}>
        <SRadioGroupItem ref={ref} id={id} {...itemProps} />
        {variant === "option" && label && (
          <label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {variant === "button-group" && label && (
          <span className="sr-only">{label}</span>
        )}
      </div>
    );
  },
);

RadioItem.displayName = "RadioItem";

type RadioProps = {
  options?: Array<{
    label: React.ReactNode;
    value: string;
    disabled?: boolean;
  }>;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  variant?: "option" | "button-group";
  size?: "default" | "sm" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "muted"
    | "success"
    | "error"
    | "warning";
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  rootClassName?: string;
  disabled?: boolean;
} & RadioGroupProps;

const Radio = React.forwardRef<HTMLDivElement, RadioProps>((props, ref) => {
  const {
    options,
    label,
    helperText,
    variant = "option",
    size = "default",
    color,
    value,
    onValueChange,
    children,
    className,
    rootClassName,
    disabled,
  } = props;

  return (
    <div className={cn("flex flex-col gap-1.5", rootClassName)}>
      {label && <label className="text-sm font-medium">{label}</label>}

      <SRadioGroup
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        variant={variant}
        className={cn(className)}
      >
        {options &&
          options.map((option) => (
            <RadioItem
              key={option.value}
              value={option.value}
              label={option.label}
              disabled={disabled || option.disabled}
              variant={variant}
              size={size}
              color={color}
            />
          ))}
        {children}
      </SRadioGroup>

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}) as React.ForwardRefExoticComponent<
  RadioProps & React.RefAttributes<HTMLDivElement>
> & {
  Group: typeof SRadioGroup;
  Item: typeof RadioItem;
};

Radio.displayName = "Radio";

Radio.Group = SRadioGroup;
Radio.Item = RadioItem;

export default Radio;
export { type RadioProps, type RadioGroupProps, type RadioGroupItemProps };
