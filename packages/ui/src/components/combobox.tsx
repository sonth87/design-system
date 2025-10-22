"use client";

import * as React from "react";
import {
  Check,
  ChevronDown,
  ChevronsDown,
  ChevronsUp,
  ChevronsUpDown,
  ChevronUp,
  X,
} from "lucide-react";
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
  "justify-between relative dark:bg-background dark:hover:bg-input/50 border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      size: {
        xs: "h-6 text-xs px-2 py-0.5",
        sm: "h-8 text-sm px-2.5 py-1",
        normal: "h-9 px-3 py-1",
        lg: "h-11 px-4 py-2",
        xl: "h-14 px-5 py-3",
      },
      state: {
        default: "",
        success:
          "border-success ring-success/30 focus-visible:border-success focus-visible:ring-success/50",
        error:
          "border-destructive ring-destructive/30 focus-visible:border-destructive focus-visible:ring-destructive/50",
        warning:
          "border-warning ring-warning/30 focus-visible:border-warning focus-visible:ring-warning/50",
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
} & VariantProps<typeof comboboxVariants>;

function Combobox({
  value,
  options,
  placeHolder,
  emptyText,
  onChange,
  clearable,
  className,
  dropdownClassName,
  children,
  size,
  state = "default",
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild {...props}>
        {children ?? (
          <Label className={cn(comboboxVariants({ size, state }), className)}>
            <span className="truncate w-full inline-block align-middle text-left pr-8">
              {value
                ? options?.find((option) => option.value === value)?.label
                : placeHolder}
            </span>
            {open && (
              <ChevronUp
                className={cn(
                  "z-10 opacity-50",
                  {
                    "size-4": size === "sm" || size === "xs",
                    "size-5": size === "lg" || size === "xl",
                  },
                  dropdownClassName
                )}
              />
            )}
            {!open && (
              <ChevronDown
                className={cn(
                  "z-10 opacity-50",
                  {
                    "size-4": size === "sm" || size === "xs",
                    "size-5": size === "lg" || size === "xl",
                  },
                  dropdownClassName
                )}
              />
            )}
          </Label>
        )}
      </PopoverTrigger>

      {clearable && value && (
        <Label
          onClick={(e) => {
            e.stopPropagation();
            onChange?.("");
          }}
          className="absolute right-11 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer size-6 opacity-50"
        >
          <X className="h-4 w-4" />
        </Label>
      )}
      <PopoverContent
        className={cn("p-0 w-(--radix-popover-trigger-width)")}
      >
        <Command>
          <CommandInput placeholder={placeHolder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText || "Not found"}</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={String(option.label)} // Để Command search theo label
                  onSelect={() => {
                    onChange?.(option.value); // Lưu value thực sự
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0" // So sánh theo value
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox, type ComboboxProps, type SelectOption };
