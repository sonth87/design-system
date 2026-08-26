"use client";

import {
  CheckIcon,
  ChevronDown,
  ChevronUp,
  LoaderCircle,
  XIcon,
} from "lucide-react";
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

const multiSelectTriggerVariants = cva(
  "ds:flex ds:h-auto ds:w-fit ds:items-center ds:justify-between ds:gap-2 ds:overflow-hidden ds:rounded-md ds:border ds:bg-transparent ds:shadow-xs ds:transition-[color,box-shadow] ds:outline-none ds:focus-visible:ring-[3px] ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:data-[placeholder]:text-muted-foreground ds:dark:bg-background ds:dark:hover:bg-input/50 ds:[&_svg]:pointer-events-none ds:[&_svg]:shrink-0 ds:[&_svg:not([class*='size-'])]:size-4 ds:[&_svg:not([class*='text-'])]:text-muted-foreground",
  {
    variants: {
      size: {
        xs: "ds:min-h-6 ds:text-xs ds:px-2 ds:py-0.5",
        sm: "ds:min-h-8 ds:text-sm ds:px-2.5 ds:py-1",
        normal: "ds:min-h-9 ds:px-3 ds:py-1.5",
        lg: "ds:min-h-11 ds:px-4 ds:py-2",
        xl: "ds:min-h-14 ds:px-5 ds:py-3",
      },
      state: {
        default:
          "ds:border-input ds:focus-visible:border-ring ds:focus-visible:ring-ring/50 ds:aria-invalid:border-destructive ds:aria-invalid:ring-destructive/20 ds:dark:aria-invalid:ring-destructive/40",
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
  disabled,
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
    <PopoverTrigger asChild disabled={disabled}>
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
        aria-disabled={disabled || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          multiSelectTriggerVariants({ size, state }),
          disabled &&
            "ds:pointer-events-none ds:cursor-not-allowed ds:opacity-50",
          className
        )}
      >
        {children}
        {open && (
          <ChevronUp
            className={cn(
              "ds:z-10 ds:opacity-50",
              {
                "ds:size-4": size === "sm" || size === "xs",
                "ds:size-5": size === "lg" || size === "xl",
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
                "ds:size-4": size === "sm" || size === "xs",
                "ds:size-5": size === "lg" || size === "xl",
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
      <span className="ds:min-w-0 ds:overflow-hidden ds:font-normal ds:text-muted-foreground">
        {placeholder}
      </span>
    );
  }

  return (
    <div
      {...props}
      ref={handleResize}
      className={cn(
        "ds:flex ds:w-fit ds:gap-1.5 ds:overflow-hidden",
        shouldWrap && "ds:h-full ds:flex-wrap",
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
                    "ds:group ds:flex ds:items-center ds:gap-1 ds:whitespace-nowrap ds:hover:scale-105 ds:transition-transform",
                    {
                      "ds:cursor-pointer": clickToRemove,
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
                  <XIcon className="ds:size-2 ds:text-muted-foreground ds:group-hover:text-destructive" />
                )}
              </>
            );
          }

          return (
            <Badge
              variant="outline"
              data-selected-item
              className="ds:group ds:flex ds:items-center ds:gap-1"
              key={value}
              onClick={clickToRemove ? removeHandler : undefined}
            >
              {itemNode}
              {clickToRemove && (
                <XIcon className="ds:size-2 ds:text-muted-foreground ds:group-hover:text-destructive" />
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
  onSearchChange,
  loading = false,
  loadingText,
  children,
  ...props
}: {
  search?: boolean | { placeholder?: string; emptyMessage?: string };
  onSearchChange?: (value: string) => void;
  loading?: boolean;
  loadingText?: string;
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
      <PopoverContent className="ds:min-w-[var(--radix-popover-trigger-width)] ds:p-0">
        <Command {...props}>
          {canSearch ? (
            <CommandInput
              placeholder={
                typeof search === "object" ? search.placeholder : undefined
              }
              onValueChange={onSearchChange}
            />
          ) : (
            <button
              type="button"
              aria-label="Search"
              autoFocus
              className="ds:sr-only"
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
                {canSearch && (
                  <CommandEmpty>
                    {typeof search === "object"
                      ? search.emptyMessage
                      : undefined}
                  </CommandEmpty>
                )}
                {children}
              </>
            )}
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
        props?.disabled && "ds:opacity-50 ds:cursor-not-allowed ds:grayscale",
        isSelected && "ds:bg-primary/10 ds:dark:bg-primary/20"
      )}
    >
      {!tagRender && icon && (
        <span className="ds:mr-2 ds:max-w-4 ds:max-h-4">{icon}</span>
      )}
      {children}
      <CheckIcon
        className={cn(
          "ds:mr-2 ds:ml-auto ds:size-4",
          isSelected ? "ds:opacity-100" : "ds:opacity-0"
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
