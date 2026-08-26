"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronUp, LoaderCircle, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Label } from "./label";

const comboboxVariants = cva(
  "ds:justify-between ds:relative ds:dark:bg-background ds:dark:hover:bg-input/50 ds:border-input ds:w-full ds:min-w-0 ds:rounded-md ds:border ds:border-border ds:bg-transparent ds:shadow-xs ds:transition-[color,box-shadow] ds:outline-none ds:file:inline-flex ds:file:h-7 ds:file:border-0 ds:file:bg-transparent ds:file:text-sm ds:file:font-medium ds:disabled:pointer-events-none ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:focus-visible:border-ring ds:focus-visible:ring-ring/50 ds:focus-visible:ring-[3px] ds:aria-invalid:ring-destructive/20 ds:dark:aria-invalid:ring-destructive/40 ds:aria-invalid:border-destructive",
  {
    variants: {
      size: {
        xs: "ds:h-6 ds:text-xs ds:px-2 ds:py-0.5",
        sm: "ds:h-8 ds:text-sm ds:px-2.5 ds:py-1",
        normal: "ds:h-9 ds:px-3 ds:py-1",
        lg: "ds:h-11 ds:px-4 ds:py-2",
        xl: "ds:h-14 ds:px-5 ds:py-3",
      },
      state: {
        default: "",
        success:
          "ds:border-success ds:ring-success/30 ds:focus-visible:border-success ds:focus-visible:ring-success/50",
        error:
          "ds:border-destructive ds:ring-destructive/30 ds:focus-visible:border-destructive ds:focus-visible:ring-destructive/50",
        warning:
          "ds:border-warning ds:ring-warning/30 ds:focus-visible:border-warning ds:focus-visible:ring-warning/50",
      },
    },
    defaultVariants: {
      size: "normal",
      state: "default",
    },
  }
);

type SelectOption = {
  label: React.ReactNode;
  value: string;
  group?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type ComboboxProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Trigger>,
  "onChange"
> & {
  value?: string;
  options?: SelectOption[];
  placeHolder?: string;
  onChange?: (value?: string | null) => void;
  clearable?: boolean;
  emptyText?: string;
  className?: string;
  dropdownClassName?: string;
  children?: React.ReactNode;
  size?: "normal" | "sm" | "xs" | "lg" | "xl";
  state?: "default" | "success" | "error" | "warning";
  searchable?: boolean;
  onSearchChange?: (value: string) => void;
  shouldFilter?: boolean;
  loading?: boolean;
  loadingText?: string;
  tagRender?: (
    option: SelectOption & { onClick?: () => void }
  ) => React.ReactNode;
} & VariantProps<typeof comboboxVariants>;

function Combobox({
  value,
  options,
  placeHolder,
  emptyText,
  onChange,
  onSearchChange,
  shouldFilter,
  loading = false,
  loadingText,
  clearable,
  className,
  dropdownClassName,
  children,
  size,
  state = "default",
  searchable = true,
  tagRender,
  disabled,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (disabled) return;
      setOpen(newOpen);
    },
    [disabled]
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={true}>
      <PopoverTrigger asChild {...props} disabled={disabled}>
        {children ?? (
          <Label
            aria-disabled={disabled || undefined}
            data-disabled={disabled || undefined}
            className={cn(
              comboboxVariants({ size, state }),
              disabled &&
                "ds:pointer-events-none ds:cursor-not-allowed ds:opacity-50",
              className
            )}
          >
            <span
              className={cn(
                "ds:truncate ds:w-full ds:inline-block ds:align-middle ds:text-left",
                {
                  "ds:pr-8": clearable,
                }
              )}
            >
              {value
                ? options?.find((option) => option.value === value)?.label
                : placeHolder}
            </span>
            {open && (
              <ChevronUp
                className={cn(
                  "ds:z-10 ds:opacity-50",
                  {
                    "ds:size-4 ds:min-w-4": size === "sm" || size === "xs",
                    "ds:size-5 ds:min-w-5": size === "lg" || size === "xl",
                  },
                  dropdownClassName
                )}
              />
            )}
            {!open && (
              <ChevronDown
                className={cn(
                  "ds:z-10 ds:opacity-50",
                  {
                    "ds:size-4 ds:min-w-4": size === "sm" || size === "xs",
                    "ds:size-5 ds:min-w-5": size === "lg" || size === "xl",
                  },
                  dropdownClassName
                )}
              />
            )}
          </Label>
        )}
      </PopoverTrigger>

      {clearable && value && !disabled && (
        <Label
          onClick={(e) => {
            e.stopPropagation();
            onChange?.("");
          }}
          className="ds:absolute ds:right-11 ds:top-1/2 ds:-translate-y-1/2 ds:rounded-sm ds:p-1 ds:text-muted-foreground ds:hover:bg-accent ds:hover:text-accent-foreground ds:cursor-pointer ds:size-6 ds:opacity-50"
        >
          <X className="ds:h-4 ds:w-4" />
        </Label>
      )}
      <PopoverContent
        className={cn("ds:p-0 ds:w-(--radix-popover-trigger-width)")}
        onInteractOutside={(e) => {
          // Prevent closing when clicking the trigger
          const target = e.target as HTMLElement;
          if (target.closest('[data-slot="popover-trigger"]')) {
            e.preventDefault();
          }
        }}
      >
        <Command shouldFilter={shouldFilter}>
          {searchable && (
            <CommandInput
              placeholder={placeHolder}
              className="ds:h-9"
              onValueChange={onSearchChange}
            />
          )}
          <CommandList>
            {loading ? (
              <div className="ds:flex ds:items-center ds:justify-center ds:gap-2 ds:py-6 ds:text-sm ds:text-muted-foreground">
                <LoaderCircle className="ds:size-4 ds:animate-spin" />
                {loadingText ?? "Loading..."}
              </div>
            ) : (
              <>
                <CommandEmpty>{emptyText || "Not found"}</CommandEmpty>
                <CommandGroup>
                  {options?.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={String(option.label)} // Để Command search theo label
                      onSelect={
                        option?.disabled
                          ? undefined
                          : () => {
                              onChange?.(option.value); // Lưu value thực sự
                              setOpen(false);
                            }
                      }
                      className={cn(
                        option?.disabled &&
                          "ds:opacity-50 ds:cursor-not-allowed ds:grayscale",
                        value === option.value &&
                          "ds:bg-primary/10 ds:dark:bg-primary/20"
                      )}
                    >
                      {tagRender ? (
                        tagRender(option)
                      ) : (
                        <>
                          {option.icon && (
                            <span className="ds:mr-2 ds:max-w-4 ds:max-h-4">
                              {option.icon}
                            </span>
                          )}
                          {option.label}
                        </>
                      )}
                      <Check
                        className={cn(
                          "ds:ml-auto",
                          value === option.value
                            ? "ds:opacity-100"
                            : "ds:opacity-0" // So sánh theo value
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox, type ComboboxProps, type SelectOption };
