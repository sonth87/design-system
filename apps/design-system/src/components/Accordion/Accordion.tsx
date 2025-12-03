import React from "react";
import {
  Accordion as SAccordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@dsui/ui/components/accordion";
import { cn } from "@dsui/ui/lib/utils";

export type AccordionItemConfig = {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

type AccordionBaseProps = {
  items?: AccordionItemConfig[];
  variant?: "default" | "bordered" | "separated" | "ghost";
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "horizontal" | "vertical";
  asChild?: boolean;
};

type AccordionSingleProps = AccordionBaseProps & {
  type: "single";
  value?: string;
  defaultValue?: string;
  collapsible?: boolean;
  onValueChange?: (newValue: string) => void;
};

type AccordionMultipleProps = AccordionBaseProps & {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (newValue: string[]) => void;
};

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

const variantStyles = {
  default: {
    root: "rounded-lg",
    item: "px-0",
    trigger: "px-4 hover:bg-accent/50",
    content: "px-4",
  },
  bordered: {
    root: "rounded-lg border-2 divide-y-2",
    item: "px-0 border-0",
    trigger: "px-4 font-semibold hover:bg-accent",
    content: "px-4",
  },
  separated: {
    root: "space-y-2",
    item: "rounded-lg border bg-card last:border-b",
    trigger: "px-4 hover:bg-accent/50",
    content: "px-4",
  },
  ghost: {
    root: "",
    item: "border-0",
    trigger: "px-2 hover:bg-accent/30 rounded-md",
    content: "px-2",
  },
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const {
      items,
      variant = "default",
      className,
      itemClassName,
      triggerClassName,
      contentClassName,
      children,
      type,
      ...rest
    } = props;

    const styles = variantStyles[variant];

    // If children are provided, use them directly (primitive usage)
    if (children && !items) {
      if (type === "multiple") {
        return (
          <SAccordion
            ref={ref}
            type="multiple"
            className={cn(styles.root, className)}
            {...(rest as Omit<
              AccordionMultipleProps,
              keyof AccordionBaseProps | "type"
            >)}
          >
            {children}
          </SAccordion>
        );
      }
      return (
        <SAccordion
          ref={ref}
          type="single"
          className={cn(styles.root, className)}
          {...(rest as Omit<
            AccordionSingleProps,
            keyof AccordionBaseProps | "type"
          >)}
        >
          {children}
        </SAccordion>
      );
    }

    // Wrapper usage with items array
    if (type === "multiple") {
      return (
        <SAccordion
          ref={ref}
          type="multiple"
          className={cn(styles.root, className)}
          {...(rest as Omit<
            AccordionMultipleProps,
            keyof AccordionBaseProps | "type"
          >)}
        >
          {items?.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={cn(styles.item, itemClassName, item.className)}
            >
              <AccordionTrigger
                className={cn(
                  styles.trigger,
                  triggerClassName,
                  item.triggerClassName
                )}
              >
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  styles.content,
                  contentClassName,
                  item.contentClassName
                )}
              >
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </SAccordion>
      );
    }

    return (
      <SAccordion
        ref={ref}
        type="single"
        className={cn(styles.root, className)}
        {...(rest as Omit<
          AccordionSingleProps,
          keyof AccordionBaseProps | "type"
        >)}
      >
        {items?.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(styles.item, itemClassName, item.className)}
          >
            <AccordionTrigger
              className={cn(
                styles.trigger,
                triggerClassName,
                item.triggerClassName
              )}
            >
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                styles.content,
                contentClassName,
                item.contentClassName
              )}
            >
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </SAccordion>
    );
  }
);

Accordion.displayName = "Accordion";

// Create compound component
const AccordionCompound = Object.assign(Accordion, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export default AccordionCompound;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
