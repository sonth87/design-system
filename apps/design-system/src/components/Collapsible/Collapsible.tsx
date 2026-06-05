import React from "react";
import {
  Collapsible as SCollapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@dsui/ui/components/collapsible";
import { cn } from "@dsui/ui/lib/utils";
import { ChevronDown } from "lucide-react";

export type CollapsibleProps = Omit<
  React.ComponentPropsWithoutRef<typeof SCollapsible>,
  "children" | "content" | "open" | "defaultOpen" | "onOpenChange"
> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  showIcon?: boolean;
  iconPosition?: "left" | "right";
  iconRotation?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  variant?: "default" | "bordered" | "ghost";
  children?: React.ReactNode;
};

const Collapsible = React.forwardRef<
  React.ElementRef<typeof SCollapsible>,
  CollapsibleProps
>((props, ref) => {
  const {
    trigger,
    content,
    showIcon = true,
    iconPosition = "right",
    iconRotation = true,
    triggerClassName,
    contentClassName,
    variant = "default",
    className,
    open,
    defaultOpen,
    onOpenChange,
    children,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = React.useState(defaultOpen ?? false);

  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const variantStyles = {
    default: {
      root: "ds:rounded-lg ds:border ds:bg-card",
      trigger: "ds:px-4 ds:py-3 ds:hover:bg-accent/50",
      content: "ds:px-4 ds:py-3 ds:border-t",
    },
    bordered: {
      root: "ds:rounded-lg ds:border-2",
      trigger: "ds:px-4 ds:py-3 ds:font-semibold ds:hover:bg-accent",
      content: "ds:px-4 ds:py-3 ds:border-t-2",
    },
    ghost: {
      root: "",
      trigger: "ds:px-2 ds:py-2 ds:hover:bg-accent/30 ds:rounded-md",
      content: "ds:px-2 ds:py-2",
    },
  };

  const styles = variantStyles[variant];

  // If children are provided, use them directly (custom implementation)
  if (children && !trigger && !content) {
    return (
      <SCollapsible
        ref={ref}
        open={isOpen}
        onOpenChange={handleOpenChange}
        className={cn(styles.root, className)}
        {...rest}
      >
        {children}
      </SCollapsible>
    );
  }

  // Default implementation with trigger and content
  return (
    <SCollapsible
      ref={ref}
      open={isOpen}
      onOpenChange={handleOpenChange}
      className={cn(styles.root, className)}
      {...rest}
    >
      <CollapsibleTrigger
        className={cn(
          "ds:flex ds:w-full ds:items-center ds:justify-between ds:transition-colors",
          styles.trigger,
          triggerClassName
        )}
      >
        {iconPosition === "left" && showIcon && (
          <ChevronDown
            className={cn(
              "ds:size-4 ds:transition-transform ds:duration-200",
              iconRotation && isOpen && "ds:rotate-180"
            )}
          />
        )}
        <span className="ds:flex-1 ds:text-left">{trigger}</span>
        {iconPosition === "right" && showIcon && (
          <ChevronDown
            className={cn(
              "ds:size-4 ds:transition-transform ds:duration-200",
              iconRotation && isOpen && "ds:rotate-180"
            )}
          />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className={cn(styles.content, contentClassName)}>
        {content}
      </CollapsibleContent>
    </SCollapsible>
  );
});

Collapsible.displayName = "Collapsible";

export default Collapsible;
export { CollapsibleTrigger, CollapsibleContent };
