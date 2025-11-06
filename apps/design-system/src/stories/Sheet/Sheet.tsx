import React, { useMemo } from "react";
import {
  Sheet as SSheet,
  SheetContent as SSheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@dsui/ui/components/sheet";
import { cn } from "@dsui/ui/lib/utils";
import { ScrollArea } from "@dsui/ui/components/scroll-area";
import type { BasicAnimation } from "@/types/variables";
import { animationClass } from "@/utils/css";

export type SheetSide = "top" | "right" | "bottom" | "left";
export type SheetSize = "sm" | "md" | "lg" | "xl" | "full";

export interface SheetProps {
  // Core props
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Content
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  footer?: React.ReactNode;

  // Behavior
  side?: SheetSide;
  closeOnEsc?: boolean;
  closeOnOutside?: boolean;
  showCloseButton?: boolean;

  // Layout
  size?: SheetSize;
  fullHeight?: boolean;
  scrollable?: boolean;
  stickyHeader?: boolean;
  stickyFooter?: boolean;

  // Animation
  animation?: BasicAnimation;

  // Styling
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  footerClassName?: string;
  overlayClassName?: string;
}

const getSizeClasses = (size: SheetSize, side: SheetSide): string => {
  const isVertical = side === "top" || side === "bottom";
  const sizeMap: Record<SheetSize, string> = {
    sm: isVertical ? "sm:max-h-sm" : "sm:max-w-sm",
    md: isVertical ? "sm:max-h-md" : "sm:max-w-md",
    lg: isVertical ? "sm:max-h-lg" : "sm:max-w-lg",
    xl: isVertical ? "sm:max-h-xl" : "sm:max-w-xl",
    full: isVertical ? "sm:max-h-full" : "sm:max-w-full",
  };
  return sizeMap[size];
};

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>((props, ref) => {
  const {
    open,
    onOpenChange,
    title,
    description,
    children,
    trigger,
    footer,
    side = "right",
    closeOnEsc = true,
    closeOnOutside = true,
    showCloseButton = true,
    size = "md",
    fullHeight = false,
    scrollable = true,
    stickyHeader = false,
    stickyFooter = false,
    animation,
    className,
    contentClassName,
    headerClassName,
    titleClassName,
    descriptionClassName,
    footerClassName,
    overlayClassName,
  } = props;

  const animationResult = useMemo(() => {
    return animation ? animationClass(animation) : { className: "" };
  }, [animation]);

  const contentClasses = cn(
    // Remove default padding and gap to allow custom header/footer
    "!p-0 !gap-0 flex flex-col",
    getSizeClasses(size, side),
    animationResult.className,
    fullHeight ? "h-full" : "max-h-full",
    className
  );

  const headerClasses = cn(
    "px-6 pt-6 text-left",
    !scrollable && "contents space-y-0",
    headerClassName
  );

  const footerClasses = cn(
    "px-6 pb-6 flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    !scrollable && "border-t py-4",
    footerClassName
  );

  const headerComponents = useMemo(() => {
    return title || description ? (
      <SheetHeader
        className={cn("py-4", { "border-b": stickyHeader }, headerClasses)}
      >
        {title && <SheetTitle className={titleClassName}>{title}</SheetTitle>}
        {description && (
          <SheetDescription className={descriptionClassName}>
            {description}
          </SheetDescription>
        )}
      </SheetHeader>
    ) : null;
  }, [
    title,
    description,
    headerClasses,
    titleClassName,
    descriptionClassName,
    stickyHeader,
  ]);

  const footerComponents = useMemo(() => {
    return footer ? (
      <SheetFooter
        className={cn("py-4", { "border-t": stickyFooter }, footerClasses)}
      >
        {footer}
      </SheetFooter>
    ) : null;
  }, [footer, footerClasses, stickyFooter]);

  return (
    <SSheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SSheetContent
        ref={ref}
        side={side}
        className={cn(className, contentClasses)}
        onEscapeKeyDown={(e) => !closeOnEsc && e.preventDefault()}
        onInteractOutside={(e) => !closeOnOutside && e.preventDefault()}
        overlayClassName={cn(overlayClassName)}
      >
        {/* Hide default close button if showCloseButton is false */}
        {!showCloseButton && (
          <style>{`
            [data-slot="sheet-content"] > [data-slot="sheet-close"] {
              display: none;
            }
          `}</style>
        )}

        {stickyHeader && headerComponents}

        <ScrollArea className="flex max-h-full flex-col overflow-hidden">
          {!stickyHeader && headerComponents}
          {children && (
            <div className={cn("px-6 py-4", contentClassName)}>{children}</div>
          )}
          {!stickyFooter && footerComponents}
        </ScrollArea>

        {stickyFooter && footerComponents}
      </SSheetContent>
    </SSheet>
  );
});

Sheet.displayName = "Sheet";

export { SheetClose };
export default Sheet;
