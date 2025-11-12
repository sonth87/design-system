import React from "react";
import {
  MultiSelect as BaseMultiSelect,
  MultiSelectTrigger as BaseMultiSelectTrigger,
  MultiSelectValue as BaseMultiSelectValue,
  MultiSelectContent as BaseMultiSelectContent,
  MultiSelectItem as BaseMultiSelectItem,
  MultiSelectGroup as BaseMultiSelectGroup,
  MultiSelectSeparator as BaseMultiSelectSeparator,
} from "@dsui/ui/components/select";
import {
  Combobox,
  type ComboboxProps,
  type SelectOption as SSelectOption,
} from "@dsui/ui/components/combobox";
import { cn } from "@dsui/ui/lib/utils";
import { FloatingLabel } from "@/components/FloatLabel";
import { Info } from "lucide-react";
import { Tooltip } from "../Tooltip/Tooltip";

export type SelectOption = SSelectOption;

export type SelectProps = ComboboxProps & {
  label?: string;
  helperText?: React.ReactNode;
  state?: "default" | "success" | "warning" | "error";
  size?: "xs" | "sm" | "normal" | "lg" | "xl";
  isFloatLabel?: boolean;
  infoTooltip?: React.ReactNode;
  clearable?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  tagRender?: (option: SelectOption) => React.ReactNode;
  multiple?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  values?: string[];
  defaultValues?: string | string[];
  onValuesChange?: (values: string[]) => void;
  search?: boolean | { placeholder?: string; emptyMessage?: string };
  clickToRemove?: boolean;
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff";
  className?: string;
  disabled?: boolean;
};

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      state = "default",
      size = "normal",
      isFloatLabel,
      infoTooltip,
      clearable = false,
      placeholder = "",
      options = [],
      tagRender,
      multiple = false,
      value,
      defaultValue,
      onValueChange,
      values,
      defaultValues,
      onValuesChange,
      search,
      clickToRemove = true,
      overflowBehavior = "wrap-when-open",
      disabled,
    },
    ref,
  ) => {
    const selectId = React.useId();

    // For single select, use controlled value or internal state
    const [internalValue, setInternalValue] = React.useState(
      value ?? defaultValue ?? "",
    );

    React.useEffect(() => {
      if (!multiple && value !== undefined) {
        setInternalValue(value);
      }
    }, [multiple, value]);

    // Handle single select value change
    const handleSingleValueChange = React.useCallback(
      (newValue?: string | null) => {
        const val = newValue || "";
        if (value === undefined) {
          setInternalValue(val);
        }
        onValueChange?.(val);
      },
      [onValueChange, value],
    );

    // Helper text styles
    const helperTextStyles = {
      default: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
    };

    // Calculate current size
    const currentSize = isFloatLabel
      ? size === "xl" || size === "lg"
        ? size
        : "xl"
      : size;

    // Group options by group property
    const groupedOptions = React.useMemo(() => {
      const groups = new Map<string | undefined, SelectOption[]>();
      options.forEach((option) => {
        const group = option.group;
        if (!groups.has(group)) {
          groups.set(group, []);
        }
        groups.get(group)!.push(option);
      });
      return groups;
    }, [options]);

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-1.5 relative", {
          "floating-label relative": isFloatLabel,
        })}
      >
        {!isFloatLabel && label && (
          <label
            htmlFor={selectId}
            className="flex gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {infoTooltip && (
              <Tooltip content={infoTooltip}>
                <Info className="size-3.5 min-w-3.5" />
              </Tooltip>
            )}
          </label>
        )}

        <div className="relative">
          {!multiple ? (
            // Single Mode
            <>
              <Combobox
                value={value ?? internalValue}
                options={options}
                placeHolder={placeholder}
                emptyText={
                  typeof search === "object"
                    ? search.emptyMessage
                    : "No results found"
                }
                onChange={handleSingleValueChange}
                clearable={clearable}
                disabled={disabled}
                id={selectId}
                className={cn(
                  "peer w-full justify-start",
                  {
                    "pt-5 pb-1": isFloatLabel && size !== "lg",
                  },
                  className,
                )}
                size={currentSize}
                state={state}
                dropdownClassName={cn("opacity-40", {
                  "translate-y-[-8px]": isFloatLabel && size !== "lg",
                })}
                searchable={!!search}
                tagRender={tagRender}
              />
              {isFloatLabel && (
                <FloatingLabel
                  htmlFor={selectId}
                  size={size}
                  infoTooltip={infoTooltip}
                  shouldFloat={!!(value ?? internalValue)}
                  className="pointer-events-none"
                >
                  {label}
                </FloatingLabel>
              )}
            </>
          ) : (
            // Multi Mode
            <BaseMultiSelect
              values={values}
              defaultValues={
                typeof defaultValues === "string"
                  ? [defaultValues]
                  : defaultValues
              }
              onValuesChange={onValuesChange}
            >
              <BaseMultiSelectTrigger
                id={selectId}
                disabled={disabled}
                className={cn(
                  "peer w-full",
                  {
                    "pt-5 pb-1": isFloatLabel && size !== "lg",
                  },
                  className,
                )}
                size={currentSize}
                state={state}
              >
                <BaseMultiSelectValue
                  placeholder={placeholder}
                  clickToRemove={clickToRemove && clearable}
                  overflowBehavior={overflowBehavior}
                />
              </BaseMultiSelectTrigger>

              {isFloatLabel && (
                <FloatingLabel
                  htmlFor={selectId}
                  size={size}
                  infoTooltip={infoTooltip}
                >
                  {label}
                </FloatingLabel>
              )}

              <BaseMultiSelectContent search={search}>
                {[...groupedOptions.entries()].map(([group, items]) => {
                  if (group) {
                    return (
                      <React.Fragment key={group}>
                        <BaseMultiSelectGroup heading={group}>
                          {items.map((option) => (
                            <BaseMultiSelectItem
                              key={option.value}
                              value={option.value}
                              disabled={option?.disabled}
                              icon={option?.icon}
                              tagRender={!!tagRender}
                            >
                              {tagRender ? tagRender(option) : option.label}
                            </BaseMultiSelectItem>
                          ))}
                        </BaseMultiSelectGroup>
                        <BaseMultiSelectSeparator />
                      </React.Fragment>
                    );
                  }
                  return items.map((option) => (
                    <BaseMultiSelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option?.disabled}
                      icon={option?.icon}
                      tagRender={!!tagRender}
                    >
                      {tagRender ? tagRender(option) : option.label}
                    </BaseMultiSelectItem>
                  ));
                })}
              </BaseMultiSelectContent>
            </BaseMultiSelect>
          )}
        </div>

        {helperText && (
          <p className={cn("text-xs", state ? helperTextStyles[state] : "")}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
export default Select as unknown as React.ComponentType<SelectProps>;
