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
import { Label } from "../Label";

export type SelectOption = SSelectOption;

export type SelectProps = Omit<ComboboxProps, "ref"> & {
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
  onSearchChange?: (value: string) => void;
  shouldFilter?: boolean;
  loading?: boolean;
  loadingText?: string;
  clickToRemove?: boolean;
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff";
  className?: string;
  disabled?: boolean;
  onChange?: (value: string | string[]) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
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
      onSearchChange,
      shouldFilter,
      loading = false,
      loadingText,
      clickToRemove = true,
      overflowBehavior = "wrap-when-open",
      disabled,
      onChange,
      onFocus,
      onBlur,
      required,
    },
    ref
  ) => {
    const selectId = React.useId();

    // For single select, use controlled value or internal state
    const [internalValue, setInternalValue] = React.useState(
      value ?? defaultValue ?? ""
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
        onChange?.(val);
      },
      [onValueChange, onChange, value]
    );

    // Handle multi select values change
    const handleMultiValuesChange = React.useCallback(
      (newValues: string[]) => {
        onValuesChange?.(newValues);
        onChange?.(newValues);
      },
      [onValuesChange, onChange]
    );

    // Helper text styles
    const helperTextStyles = {
      default: "ds:text-muted-foreground",
      success: "ds:text-success",
      warning: "ds:text-warning",
      error: "ds:text-error",
    };

    // Calculate current size
    const currentSize = isFloatLabel
      ? size === "xl" || size === "lg"
        ? size
        : "xl"
      : size;

    // Render an option's label, stacking a small sublabel underneath when provided
    const renderOptionContent = React.useCallback(
      (option: SelectOption) => {
        if (tagRender) return tagRender(option);
        if (!option.sublabel) return option.label;
        return (
          <span className="ds:flex ds:min-w-0 ds:flex-col ds:items-start">
            <span className="ds:truncate">{option.label}</span>
            <span className="ds:truncate ds:text-xs ds:text-muted-foreground">
              {option.sublabel}
            </span>
          </span>
        );
      },
      [tagRender]
    );

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
      <div className={className}>
        <div
          ref={ref}
          className={cn("ds:flex ds:flex-col ds:gap-1.5 ds:relative", {
            "ds:floating-label ds:relative": isFloatLabel,
          })}
        >
          {!isFloatLabel && label && (
            <Label
              htmlFor={selectId}
              className="ds:flex ds:gap-2 ds:text-sm ds:font-medium ds:leading-none ds:peer-disabled:cursor-not-allowed ds:peer-disabled:opacity-70"
            >
              <span>
                {label}
                {required && <span className="ds:text-error ds:ml-0.5">*</span>}
              </span>
              {infoTooltip && (
                <Tooltip content={infoTooltip}>
                  <Info className="ds:size-3.5 ds:min-w-3.5" />
                </Tooltip>
              )}
            </Label>
          )}

          <div className="ds:relative">
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
                    "ds:peer ds:w-full ds:justify-start",
                    {
                      "ds:pt-5 ds:pb-1": isFloatLabel && size !== "lg",
                    }
                    // className,
                  )}
                  size={currentSize}
                  state={state}
                  dropdownClassName={cn("ds:opacity-40", {
                    "ds:translate-y-[-8px]": isFloatLabel && size !== "lg",
                  })}
                  searchable={!!search}
                  onSearchChange={onSearchChange}
                  shouldFilter={shouldFilter}
                  loading={loading}
                  loadingText={loadingText}
                  tagRender={tagRender}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                {isFloatLabel && (
                  <FloatingLabel
                    htmlFor={selectId}
                    size={size}
                    infoTooltip={infoTooltip}
                    required={required}
                    shouldFloat={!!(value ?? internalValue)}
                    className="ds:pointer-events-none"
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
                onValuesChange={handleMultiValuesChange}
              >
                <BaseMultiSelectTrigger
                  id={selectId}
                  disabled={disabled}
                  className={cn(
                    "ds:peer ds:w-full",
                    {
                      "ds:pt-5 ds:pb-1": isFloatLabel && size !== "lg",
                    },
                    className
                  )}
                  size={currentSize}
                  state={state}
                  onFocus={onFocus}
                  onBlur={onBlur}
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
                    required={required}
                  ></FloatingLabel>
                )}

                <BaseMultiSelectContent
                  search={search}
                  onSearchChange={onSearchChange}
                  shouldFilter={shouldFilter}
                  loading={loading}
                  loadingText={loadingText}
                >
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
                                badgeLabel={
                                  tagRender ? tagRender(option) : option.label
                                }
                              >
                                {renderOptionContent(option)}
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
                        badgeLabel={tagRender ? tagRender(option) : option.label}
                      >
                        {renderOptionContent(option)}
                      </BaseMultiSelectItem>
                    ));
                  })}
                </BaseMultiSelectContent>
              </BaseMultiSelect>
            )}
          </div>

          {helperText && (
            <p
              className={cn("ds:text-xs", state ? helperTextStyles[state] : "")}
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
