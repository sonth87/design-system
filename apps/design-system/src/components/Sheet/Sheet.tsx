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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@dsui/ui/components/drawer";
import { cn } from "@dsui/ui/lib/utils";
import { ScrollArea } from "@dsui/ui/components/scroll-area";
import type { BasicAnimation } from "@/types/variables";
import { animationClass } from "@/utils/animations";
import { isMobile } from "react-device-detect";

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
  autoDrawerOnMobile?: boolean;

  // Layout
  size?: SheetSize;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  autoHeight?: boolean;

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
    sm: isVertical ? "max-h-[20vh]!" : "sm:max-w-sm",
    md: isVertical ? "max-h-[40vh]!" : "sm:max-w-md",
    lg: isVertical ? "max-h-[60vh]!" : "sm:max-w-lg",
    xl: isVertical ? "max-h-[80vh]!" : "sm:max-w-xl",
    full: isVertical ? "max-h-full!" : "sm:max-w-full",
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
    autoDrawerOnMobile = true,
    size = "md",
    stickyHeader = false,
    stickyFooter = false,
    autoHeight = true,
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
    className,
  );

  const headerClasses = cn("px-6 pt-6 text-left", headerClassName);

  const footerClasses = cn(
    "px-6 pb-6 flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    footerClassName,
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

  // Mobile: use drawer with bottom direction if enabled
  if (isMobile && autoDrawerOnMobile) {
    const drawerContentClasses = cn(
      "flex flex-col",
      animationResult.className,
      className,
    );

    return (
      <Drawer open={open} onOpenChange={onOpenChange} direction="bottom">
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent
          ref={ref}
          className={cn(
            drawerContentClasses,
            autoHeight ? "" : getSizeClasses(size, "bottom"),
          )}
        >
          {(title || description) && (
            <DrawerHeader className={headerClassName}>
              {title && (
                <DrawerTitle className={titleClassName}>{title}</DrawerTitle>
              )}
              {description && (
                <DrawerDescription className={descriptionClassName}>
                  {description}
                </DrawerDescription>
              )}
            </DrawerHeader>
          )}

          <ScrollArea className={cn("flex flex-col overflow-hidden")}>
            {children && (
              <div className={cn("px-4 py-2", contentClassName)}>
                {children}
              </div>
            )}
          </ScrollArea>

          {footer && (
            <DrawerFooter className={footerClassName}>{footer}</DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: use sheet with original behavior
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

export { SheetClose, DrawerClose };
export default Sheet;
