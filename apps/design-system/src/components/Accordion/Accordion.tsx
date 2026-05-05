import React from "react";
import {
  Accordion as SAccordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@dsui/ui/components/accordion";
import { cn } from "@dsui/ui/lib/utils";
import { type BasicColor } from "@/types/variables";

export type AccordionItemConfig = {
  value: string;
  trigger: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

type AccordionBaseProps = {
  items?: AccordionItemConfig[];
  variant?: "default" | "bordered" | "separated" | "ghost";
  color?: BasicColor;
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

const colorVariants = {
  primary: {
    trigger:
      "ds:data-[state=open]:bg-primary/10 ds:data-[state=open]:text-primary ds:data-[state=open]:rounded-b-none ds:data-[state=open]:border-primary/20",
    content: "ds:bg-primary/10 ds:rounded-b-md",
  },
  secondary: {
    trigger:
      "ds:data-[state=open]:bg-secondary/10 ds:data-[state=open]:text-secondary ds:data-[state=open]:rounded-b-none ds:data-[state=open]:border-secondary/20",
    content: "ds:bg-secondary/10 ds:rounded-b-md",
  },
  success: {
    trigger:
      "ds:data-[state=open]:bg-success/10 ds:data-[state=open]:text-success ds:data-[state=open]:rounded-b-none ds:data-[state=open]:border-success/20",
    content: "ds:bg-success/10 ds:rounded-b-md",
  },
  warning: {
    trigger:
      "ds:data-[state=open]:bg-warning/10 ds:data-[state=open]:text-warning ds:data-[state=open]:rounded-b-none ds:data-[state=open]:border-warning/20",
    content: "ds:bg-warning/10 ds:rounded-b-md",
  },
  error: {
    trigger:
      "ds:data-[state=open]:bg-error/10 ds:data-[state=open]:text-error ds:data-[state=open]:rounded-b-none ds:data-[state=open]:border-error/20",
    content: "ds:bg-error/10 ds:rounded-b-md",
  },
  glass: {
    trigger:
      "ds:data-[state=open]:bg-glass/10 ds:data-[state=open]:text-glass ds:data-[state=open]:rounded-b-none ds:data-[state=open]:border-glass/20",
    content: "ds:bg-glass/10 ds:rounded-b-md",
  },
};

const variantStyles = {
  default: {
    root: "ds:rounded-lg",
    item: "ds:px-0",
    trigger: "ds:px-4 ds:hover:bg-accent/50",
    content: "ds:px-4",
  },
  bordered: {
    root: "ds:rounded-lg ds:border-2 ds:divide-y-2",
    item: "ds:px-0 ds:border-0",
    trigger: "ds:px-4 ds:font-semibold ds:hover:bg-accent",
    content: "ds:px-4",
  },
  separated: {
    root: "ds:space-y-2",
    item: "ds:rounded-lg ds:border ds:bg-card ds:last:border-b",
    trigger: "ds:px-4 ds:hover:bg-accent/50",
    content: "ds:px-4",
  },
  ghost: {
    root: "",
    item: "ds:border-0",
    trigger: "ds:px-2 ds:hover:bg-accent/30 ds:rounded-md",
    content: "ds:px-2",
  },
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const {
      items,
      variant = "default",
      color,
      className,
      itemClassName,
      triggerClassName,
      contentClassName,
      children,
      type,
      ...rest
    } = props;

    const styles = variantStyles[variant];
    const triggerColorClass = color ? colorVariants[color].trigger : "";
    const contentColorClass = color ? colorVariants[color].content : "";

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
                  triggerColorClass,
                  triggerClassName,
                  item.triggerClassName
                )}
              >
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent
                className={cn(
                  styles.content,
                  contentColorClass,
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
                triggerColorClass,
                triggerClassName,
                item.triggerClassName
              )}
            >
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                styles.content,
                contentColorClass,
                contentClassName,
                item.contentClassName
              )}
            >
              {item?.content}
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
