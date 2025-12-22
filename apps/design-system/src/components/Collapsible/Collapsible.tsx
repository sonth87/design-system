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
      root: "rounded-lg border bg-card",
      trigger: "px-4 py-3 hover:bg-accent/50",
      content: "px-4 py-3 border-t",
    },
    bordered: {
      root: "rounded-lg border-2",
      trigger: "px-4 py-3 font-semibold hover:bg-accent",
      content: "px-4 py-3 border-t-2",
    },
    ghost: {
      root: "",
      trigger: "px-2 py-2 hover:bg-accent/30 rounded-md",
      content: "px-2 py-2",
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
          "flex w-full items-center justify-between transition-colors",
          styles.trigger,
          triggerClassName
        )}
      >
        {iconPosition === "left" && showIcon && (
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              iconRotation && isOpen && "rotate-180"
            )}
          />
        )}
        <span className="flex-1 text-left">{trigger}</span>
        {iconPosition === "right" && showIcon && (
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              iconRotation && isOpen && "rotate-180"
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
