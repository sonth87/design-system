import React, { useMemo } from "react";
import {
  Dialog as SDialog,
  DialogContent as SDialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dsui/ui/components/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@dsui/ui/components/alert-dialog";
import { ScrollArea } from "@dsui/ui/components/scroll-area";
import { cn } from "@dsui/ui/lib/utils";
import type { BasicAnimation } from "@/types/variables";
import { animationClass } from "@/utils/css";
import { AlertTriangle, Info, CheckCircle2, AlertCircle } from "lucide-react";

export type DialogVariant = "dialog" | "confirm" | "alert" | "info" | "warning";
export type DialogSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "full";
export type DialogPosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface DialogProps {
  // Core props
  variant?: DialogVariant;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Content
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
  footer?: React.ReactNode;

  // Behavior
  closeOnEsc?: boolean;
  closeOnOutside?: boolean;
  showCloseButton?: boolean;

  // Layout
  position?: DialogPosition;
  size?: DialogSize;
  fullscreen?: boolean;
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

  // Alert/Confirm specific
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const variantIcons = {
  dialog: null,
  confirm: (
    <div className="size-12 flex items-center justify-center rounded-full bg-success/10 mx-auto mb-4">
      <CheckCircle2 className="size-6 text-success" />
    </div>
  ),
  alert: (
    <div className="size-12 flex items-center justify-center rounded-full bg-error/10 mx-auto mb-4">
      <AlertCircle className="size-5 text-error" />
    </div>
  ),
  info: (
    <div className="size-12 flex items-center justify-center rounded-full bg-blue-500/10 mx-auto mb-4">
      <Info className="size-5 text-blue-500" />
    </div>
  ),
  warning: (
    <div className="size-12 flex items-center justify-center rounded-full bg-warning/10 mx-auto mb-4">
      <AlertTriangle className="size-5 text-warning" />
    </div>
  ),
};

const variantColors = {
  dialog: "",
  confirm: "border-blue-500/20",
  alert: "border-red-500/20",
  info: "border-blue-500/20",
  warning: "border-yellow-500/20",
};

const sizeClasses: Record<DialogSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  full: "sm:max-w-[95vw] h-[95vh]",
};

const positionClasses: Record<DialogPosition, string> = {
  center: "!top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%]",
  top: "!top-4 !left-[50%] !translate-x-[-50%] !translate-y-0",
  bottom: "!top-auto !bottom-4 !left-[50%] !translate-x-[-50%] !translate-y-0",
  left: "!left-4 !top-[50%] !translate-x-0 !translate-y-[-50%]",
  right: "!left-auto !right-4 !top-[50%] !translate-x-0 !translate-y-[-50%]",
  "top-left": "!top-4 !left-4 !translate-x-0 !translate-y-0",
  "top-right": "!top-4 !left-auto !right-4 !translate-x-0 !translate-y-0",
  "bottom-left": "!top-auto !bottom-4 !left-4 !translate-x-0 !translate-y-0",
  "bottom-right":
    "!top-auto !bottom-4 !left-auto !right-4 !translate-x-0 !translate-y-0",
};

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const {
    variant = "dialog",
    open,
    onOpenChange,
    title,
    description,
    children,
    trigger,
    footer,
    closeOnEsc = true,
    closeOnOutside = true,
    showCloseButton = true,
    position = "center",
    size = "md",
    fullscreen = false,
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
    // overlayClassName, // Not used in current implementation
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
  } = props;

  const animationResult = useMemo(() => {
    return animation ? animationClass(animation) : { className: "" };
  }, [animation]);

  const contentClasses = cn(
    // Remove default padding and gap to allow custom header/footer
    "!p-0 !gap-0 flex flex-col",
    sizeClasses[fullscreen ? "full" : size],
    positionClasses[position],
    variantColors[variant],
    animationResult.className,
    fullscreen ? "h-[95vh]" : "max-h-[min(600px,80vh)]"
  );

  const headerClasses = cn(
    "px-6 pt-6 text-left",
    !scrollable && "contents space-y-0",
    headerClassName
  );

  const footerClasses = cn(
    "px-6 pb-6 sm:justify-end",
    !scrollable && "border-t py-4",
    footerClassName
  );

  const icon = variantIcons[variant];

  const headerComponents = useMemo(() => {
    return title || icon || description ? (
      <AlertDialogHeader
        className={cn(
          "flex items-center gap-2 py-4",
          { "border-b": stickyHeader },
          headerClasses
        )}
      >
        {(title || icon) && (
          <AlertDialogTitle className={cn(titleClassName)}>
            {icon}
            {title}
          </AlertDialogTitle>
        )}
        {description && (
          <AlertDialogDescription className={descriptionClassName}>
            {description}
          </AlertDialogDescription>
        )}
      </AlertDialogHeader>
    ) : null;
  }, [
    title,
    icon,
    description,
    headerClasses,
    titleClassName,
    descriptionClassName,
    stickyHeader,
  ]);

  const footerComponents = useMemo(() => {
    return footer || onConfirm || onCancel ? (
      <AlertDialogFooter
        className={cn("py-4", { "border-t": stickyFooter }, footerClasses)}
      >
        {footer || (
          <>
            {onCancel && (
              <AlertDialogCancel onClick={onCancel}>
                {cancelText}
              </AlertDialogCancel>
            )}
            {onConfirm && (
              <AlertDialogAction onClick={onConfirm}>
                {confirmText}
              </AlertDialogAction>
            )}
          </>
        )}
      </AlertDialogFooter>
    ) : null;
  }, [
    footer,
    onConfirm,
    onCancel,
    footerClasses,
    confirmText,
    cancelText,
    stickyFooter,
  ]);

  // For alert-style dialogs (confirm, alert, info, warning)
  if (variant !== "dialog") {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
        <AlertDialogContent
          ref={ref}
          className={cn(className, contentClasses)}
          onEscapeKeyDown={(e) => !closeOnEsc && e.preventDefault()}
          noDefaultAnimation={!!animation}
        >
          {stickyHeader && headerComponents}

          <ScrollArea className="flex max-h-full flex-col overflow-hidden">
            {!stickyHeader && headerComponents}
            {children && (
              <div className={cn("px-6 py-4", contentClassName)}>
                {children}
              </div>
            )}
            {!stickyFooter && footerComponents}
          </ScrollArea>

          {stickyFooter && footerComponents}
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Regular dialog
  return (
    <SDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <SDialogContent
        ref={ref}
        className={cn(className, contentClasses)}
        showCloseButton={showCloseButton}
        onEscapeKeyDown={(e) => !closeOnEsc && e.preventDefault()}
        onInteractOutside={(e) => !closeOnOutside && e.preventDefault()}
        noDefaultAnimation={!!animation}
      >
        {stickyHeader && (title || description) && (
          <DialogHeader
            className={cn({ "py-4 border-b": stickyHeader }, headerClasses)}
          >
            {title && (
              <DialogTitle className={titleClassName}>{title}</DialogTitle>
            )}
            {description && (
              <DialogDescription className={descriptionClassName}>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        <ScrollArea className="flex max-h-full flex-col overflow-hidden">
          {!stickyHeader && (title || description) && (
            <DialogHeader className={cn("py-4", headerClasses)}>
              {title && (
                <DialogTitle className={titleClassName}>{title}</DialogTitle>
              )}
              {description && (
                <DialogDescription className={descriptionClassName}>
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}
          {children && (
            <div className={cn("px-6 py-4", contentClassName)}>{children}</div>
          )}
          {!stickyFooter && footer && (
            <DialogFooter className={cn("py-4", footerClasses)}>
              {footer}
            </DialogFooter>
          )}
        </ScrollArea>
        {stickyFooter && footer && (
          <DialogFooter
            className={cn({ "py-4 border-t": stickyFooter }, footerClasses)}
          >
            {footer}
          </DialogFooter>
        )}
      </SDialogContent>
    </SDialog>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;
