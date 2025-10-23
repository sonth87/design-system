"use client";

import { CheckIcon, ChevronDown, ChevronUp, XIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Badge } from "./badge";
import { Label } from "./label";
import { SelectOption } from "./combobox";

const multiSelectTriggerVariants = cva(
  "flex h-auto w-fit items-center justify-between gap-2 overflow-hidden rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground dark:bg-background dark:hover:bg-input/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
  {
    variants: {
      size: {
        xs: "min-h-6 text-xs px-2 py-0.5",
        sm: "min-h-8 text-sm px-2.5 py-1",
        normal: "min-h-9 px-3 py-1.5",
        lg: "min-h-11 px-4 py-2",
        xl: "min-h-14 px-5 py-3",
      },
      state: {
        default:
          "border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
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

type MultiSelectContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValues: Set<string>;
  toggleValue: (value: string) => void;
  items: Map<string, ReactNode>;
  onItemAdded: (value: string, label: ReactNode) => void;
};
const MultiSelectContext = createContext<MultiSelectContextType | null>(null);

export function MultiSelect({
  children,
  values,
  defaultValues,
  onValuesChange,
}: {
  children: ReactNode;
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [internalValues, setInternalValues] = useState(
    new Set<string>(values ?? defaultValues)
  );
  const selectedValues = values ? new Set(values) : internalValues;
  const [items, setItems] = useState<Map<string, ReactNode>>(new Map());

  function toggleValue(value: string) {
    const getNewSet = (prev: Set<string>) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    };
    setInternalValues(getNewSet);
    onValuesChange?.([...getNewSet(selectedValues)]);
  }

  const onItemAdded = useCallback((value: string, label: ReactNode) => {
    setItems((prev) => {
      if (prev.get(value) === label) return prev;
      return new Map(prev).set(value, label);
    });
  }, []);

  return (
    <MultiSelectContext
      value={{
        open,
        setOpen,
        selectedValues,
        toggleValue,
        items,
        onItemAdded,
      }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        {children}
      </Popover>
    </MultiSelectContext>
  );
}

export function MultiSelectTrigger({
  className,
  dropdownClassName,
  children,
  size,
  state = "default",
  ...props
}: {
  className?: string;
  dropdownClassName?: string;
  children?: ReactNode;
  size?: "normal" | "sm" | "xs" | "lg" | "xl";
  state?: "default" | "success" | "error" | "warning";
} & Omit<ComponentPropsWithoutRef<typeof Button>, "size"> &
  VariantProps<typeof multiSelectTriggerVariants>) {
  const { open } = useMultiSelectContext();

  return (
    <PopoverTrigger asChild>
      {/* <Button
        {...props}
        variant={props.variant ?? "outline"}
        role={props.role ?? "combobox"}
        aria-expanded={props["aria-expanded"] ?? open}
        className={cn(
          multiSelectTriggerVariants({ size, state }),
          "whitespace-nowrap text-sm",
          className
        )}
      >
        {children}
        <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
      </Button> */}

      <Label
        className={cn(multiSelectTriggerVariants({ size, state }), className)}
      >
        {children}
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
    </PopoverTrigger>
  );
}

export function MultiSelectValue({
  placeholder,
  clickToRemove = true,
  className,
  overflowBehavior = "wrap-when-open",
  ...props
}: {
  placeholder?: string;
  clickToRemove?: boolean;
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff";
} & Omit<ComponentPropsWithoutRef<"div">, "children">) {
  const { selectedValues, toggleValue, items, open } = useMultiSelectContext();
  const [overflowAmount, setOverflowAmount] = useState(0);
  const valueRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);

  const shouldWrap =
    overflowBehavior === "wrap" ||
    (overflowBehavior === "wrap-when-open" && open);

  const checkOverflow = useCallback(() => {
    if (valueRef.current == null) return;

    const containerElement = valueRef.current;
    const overflowElement = overflowRef.current;
    const items = containerElement.querySelectorAll<HTMLElement>(
      "[data-selected-item]"
    );

    if (overflowElement != null) overflowElement.style.display = "none";
    items.forEach((child) => child.style.removeProperty("display"));
    let amount = 0;
    for (let i = items.length - 1; i >= 0; i--) {
      const child = items[i]!;
      if (containerElement.scrollWidth <= containerElement.clientWidth) {
        break;
      }
      amount = items.length - i;
      child.style.display = "none";
      overflowElement?.style.removeProperty("display");
    }
    setOverflowAmount(amount);
  }, []);

  const handleResize = useCallback(
    (node: HTMLDivElement) => {
      valueRef.current = node;

      const observer = new ResizeObserver(checkOverflow);
      observer.observe(node);

      return () => {
        observer.disconnect();
        valueRef.current = null;
      };
    },
    [checkOverflow]
  );

  if (selectedValues.size === 0 && placeholder) {
    return (
      <span className="min-w-0 overflow-hidden font-normal text-muted-foreground">
        {placeholder}
      </span>
    );
  }

  return (
    <div
      {...props}
      ref={handleResize}
      className={cn(
        "flex w-fit gap-1.5 overflow-hidden",
        shouldWrap && "h-full flex-wrap",
        className
      )}
    >
      {[...selectedValues]
        .filter((value) => items.has(value))
        .map((value) => {
          const itemNode = items.get(value);
          const removeHandler = (e: React.MouseEvent) => {
            e.stopPropagation();
            toggleValue(value);
          };

          if (React.isValidElement(itemNode)) {
            const isDomElement =
              typeof itemNode.type === "string" &&
              ["div", "span", "button", "a"].includes(itemNode.type);

            const element = itemNode as React.ReactElement<any>;

            const cloneProps = isDomElement
              ? {
                  key: value,
                  onClick: clickToRemove ? removeHandler : undefined,
                  className: cn(
                    element.props.className,
                    "group flex items-center gap-1 whitespace-nowrap hover:scale-105 transition-transform",
                    {
                      "cursor-pointer": clickToRemove,
                    }
                  ),
                  "data-selected-item": true,
                }
              : {
                  key: value,
                  "data-selected-item": true,
                };

            return React.cloneElement(
              element,
              cloneProps,
              <>
                {element.props.children}
                {clickToRemove && (
                  <XIcon className="size-2 text-muted-foreground group-hover:text-destructive" />
                )}
              </>
            );
          }

          return (
            <Badge
              variant="outline"
              data-selected-item
              className="group flex items-center gap-1"
              key={value}
              onClick={clickToRemove ? removeHandler : undefined}
            >
              {itemNode}
              {clickToRemove && (
                <XIcon className="size-2 text-muted-foreground group-hover:text-destructive" />
              )}
            </Badge>
          );
        })}

      <Badge
        style={{
          display: overflowAmount > 0 && !shouldWrap ? "block" : "none",
        }}
        variant="outline"
        ref={overflowRef}
      >
        +{overflowAmount}
      </Badge>
    </div>
  );
}

export function MultiSelectContent({
  search = true,
  children,
  ...props
}: {
  search?: boolean | { placeholder?: string; emptyMessage?: string };
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Command>, "children">) {
  const canSearch = typeof search === "object" ? true : search;

  return (
    <>
      <div style={{ display: "none" }}>
        <Command>
          <CommandList>{children}</CommandList>
        </Command>
      </div>
      <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] p-0">
        <Command {...props}>
          {canSearch ? (
            <CommandInput
              placeholder={
                typeof search === "object" ? search.placeholder : undefined
              }
            />
          ) : (
            <button autoFocus className="sr-only" />
          )}
          <CommandList>
            {canSearch && (
              <CommandEmpty>
                {typeof search === "object" ? search.emptyMessage : undefined}
              </CommandEmpty>
            )}
            {children}
          </CommandList>
        </Command>
      </PopoverContent>
    </>
  );
}

export function MultiSelectItem({
  value,
  children,
  badgeLabel,
  onSelect,
  icon,
  tagRender,
  ...props
}: {
  badgeLabel?: ReactNode;
  value: string;
  icon?: ReactNode;
  tagRender?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof CommandItem>, "value">) {
  const { toggleValue, selectedValues, onItemAdded } = useMultiSelectContext();
  const isSelected = selectedValues.has(value);

  useEffect(() => {
    onItemAdded(value, badgeLabel ?? children);
  }, [value, children, onItemAdded, badgeLabel]);

  return (
    <CommandItem
      {...props}
      onSelect={
        props?.disabled
          ? undefined
          : () => {
              toggleValue(value);
              onSelect?.(value);
            }
      }
      className={cn(
        props?.disabled && "opacity-50 cursor-not-allowed grayscale"
      )}
    >
      {!tagRender && icon && (
        <span className="mr-2 max-w-4 max-h-4">{icon}</span>
      )}
      {children}
      <CheckIcon
        className={cn(
          "mr-2 ml-auto size-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
}

export function MultiSelectGroup(
  props: ComponentPropsWithoutRef<typeof CommandGroup>
) {
  return <CommandGroup {...props} />;
}

export function MultiSelectSeparator(
  props: ComponentPropsWithoutRef<typeof CommandSeparator>
) {
  return <CommandSeparator {...props} />;
}

function useMultiSelectContext() {
  const context = useContext(MultiSelectContext);
  if (context == null) {
    throw new Error(
      "useMultiSelectContext must be used within a MultiSelectContext"
    );
  }
  return context;
}
