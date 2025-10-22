"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "../lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Label } from "./label";

type ComboboxProps = React.ComponentProps<typeof PopoverPrimitive.Trigger> & {
  value?: string;
  options?: { label: React.ReactNode; value: string }[];
  placeHolder?: string;
  onChange?: (value?: string | null) => void;
  clearable?: boolean;
  emptyText?: string;
  className?: string;
  dropdownClassName?: string;
};

function Combobox({
  value,
  options,
  placeHolder,
  emptyText,
  onChange,
  clearable,
  className,
  dropdownClassName,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild {...props}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between relative", className)}
        >
          <span className="truncate w-full inline-block align-middle text-left pr-8">
            {value
              ? options?.find((option) => option.value === value)?.label
              : placeHolder}
          </span>
          <ChevronsUpDown className={cn("opacity-50", dropdownClassName)} />
        </Button>
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
        className={cn("p-0 w-[var(--radix-popover-trigger-width)]")}
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

export { Combobox, type ComboboxProps };
