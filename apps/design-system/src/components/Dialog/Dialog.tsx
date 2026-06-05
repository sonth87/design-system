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
import { animationClass } from "@/utils/animations";
import { AlertTriangle, Info, CheckCircle2, AlertCircle } from "lucide-react";
import Button, { type ButtonProps } from "../Button/Button";

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

export interface DialogButtonConfig extends Omit<ButtonProps, "children"> {
  text?: React.ReactNode;
  onClick?: () => void;
}

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

  // Overlay
  backdropFilter?: number;
  overlay?: "dark" | "light";

  // Alert/Confirm buttons
  confirmButton?: DialogButtonConfig;
  cancelButton?: DialogButtonConfig;

  // Alert/Confirm specific
  showIcon?: boolean;
}

const variantIcons = {
  dialog: null,
  confirm: (
    <div className="ds:size-12 ds:flex ds:items-center ds:justify-center ds:rounded-full ds:bg-success/10 ds:mx-auto ds:mb-4">
      <CheckCircle2 className="ds:size-6 ds:text-success" />
    </div>
  ),
  alert: (
    <div className="ds:size-12 ds:flex ds:items-center ds:justify-center ds:rounded-full ds:bg-error/10 ds:mx-auto ds:mb-4">
      <AlertCircle className="ds:size-5 ds:text-error" />
    </div>
  ),
  info: (
    <div className="ds:size-12 ds:flex ds:items-center ds:justify-center ds:rounded-full ds:bg-blue-500/10 ds:mx-auto ds:mb-4">
      <Info className="ds:size-5 ds:text-blue-500" />
    </div>
  ),
  warning: (
    <div className="ds:size-12 ds:flex ds:items-center ds:justify-center ds:rounded-full ds:bg-warning/10 ds:mx-auto ds:mb-4">
      <AlertTriangle className="ds:size-5 ds:text-warning" />
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
  sm: "ds:sm:max-w-sm",
  md: "ds:sm:max-w-md",
  lg: "ds:sm:max-w-lg",
  xl: "ds:sm:max-w-xl",
  "2xl": "ds:sm:max-w-2xl ds:max-h-[90vh]",
  "3xl": "ds:sm:max-w-3xl ds:max-h-[90vh]",
  "4xl": "ds:sm:max-w-4xl ds:max-h-[90vh]",
  full: "ds:sm:max-w-[95vw] ds:h-[98vh]",
};

const positionClasses: Record<DialogPosition, string> = {
  center: "ds:!top-[50%] ds:!left-[50%] ds:!translate-x-[-50%] ds:!translate-y-[-50%]",
  top: "ds:!top-4 ds:!left-[50%] ds:!translate-x-[-50%] ds:!translate-y-0",
  bottom: "ds:!top-auto ds:!bottom-4 ds:!left-[50%] ds:!translate-x-[-50%] ds:!translate-y-0",
  left: "ds:!left-4 ds:!top-[50%] ds:!translate-x-0 ds:!translate-y-[-50%]",
  right: "ds:!left-auto ds:!right-4 ds:!top-[50%] ds:!translate-x-0 ds:!translate-y-[-50%]",
  "top-left": "ds:!top-4 ds:!left-4 ds:!translate-x-0 ds:!translate-y-0",
  "top-right": "ds:!top-4 ds:!left-auto ds:!right-4 ds:!translate-x-0 ds:!translate-y-0",
  "bottom-left": "ds:!top-auto ds:!bottom-4 ds:!left-4 ds:!translate-x-0 ds:!translate-y-0",
  "bottom-right":
    "ds:!top-auto ds:!bottom-4 ds:!left-auto ds:!right-4 ds:!translate-x-0 ds:!translate-y-0",
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
    confirmButton,
    cancelButton,
    showIcon = true,
    backdropFilter = 2,
    overlay = "dark",
  } = props;

  const animationResult = useMemo(() => {
    return animation ? animationClass(animation) : { className: "" };
  }, [animation]);

  const contentClasses = cn(
    // Remove default padding and gap to allow custom header/footer
    "ds:!p-0 ds:!gap-0 ds:flex ds:flex-col",
    sizeClasses[fullscreen ? "full" : size],
    positionClasses[position],
    variantColors[variant],
    animationResult.className,
    fullscreen ? "ds:h-[98vh]" : "ds:max-h-[90vh]"
  );

  const headerClasses = cn(
    "ds:px-6 ds:pt-6 ds:text-left",
    !scrollable && "ds:contents ds:space-y-0",
    headerClassName
  );

  const footerClasses = cn(
    "ds:px-6 ds:pb-6 ds:sm:justify-end",
    !scrollable && "ds:border-t ds:py-4",
    footerClassName
  );

  const icon = showIcon ? variantIcons[variant] : null;

  const headerComponents = useMemo(() => {
    return title || icon || description ? (
      <AlertDialogHeader
        className={cn(
          "ds:flex ds:items-center ds:gap-2 ds:py-4",
          { "ds:border-b": stickyHeader },
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
    // Merge configs with defaults
    const mergedConfirmButton: DialogButtonConfig = {
      variant: "solid",
      color: "primary",
      ...confirmButton,
      text: confirmButton?.text ?? "Confirm",
    };

    const mergedCancelButton: DialogButtonConfig = {
      variant: "outline",
      ...cancelButton,
      text: cancelButton?.text ?? "Cancel",
    };

    return footer || confirmButton || cancelButton ? (
      <AlertDialogFooter
        className={cn("ds:py-4", { "ds:border-t": stickyFooter }, footerClasses)}
      >
        {footer || (
          <>
            {cancelButton && (
              <Button
                {...mergedCancelButton}
                onClick={() => {
                  mergedCancelButton.onClick?.();
                }}
              >
                {mergedCancelButton.text}
              </Button>
            )}
            {confirmButton && (
              <Button
                {...mergedConfirmButton}
                onClick={() => {
                  mergedConfirmButton.onClick?.();
                }}
              >
                {mergedConfirmButton.text}
              </Button>
            )}
          </>
        )}
      </AlertDialogFooter>
    ) : null;
  }, [footer, footerClasses, confirmButton, cancelButton, stickyFooter]);

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
          backdropFilter={backdropFilter}
          overlay={overlay}
        >
          {stickyHeader && headerComponents}

          <ScrollArea className="ds:flex ds:max-h-full ds:flex-col ds:overflow-hidden">
            {!stickyHeader && headerComponents}
            {children && (
              <div className={cn("ds:px-6 ds:py-4", contentClassName)}>
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
        backdropFilter={backdropFilter}
        overlay={overlay}
      >
        {stickyHeader && (title || description) && (
          <DialogHeader
            className={cn({ "ds:py-4 ds:border-b": stickyHeader }, headerClasses)}
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
        <ScrollArea className="ds:flex ds:max-h-full ds:flex-col ds:overflow-hidden">
          {!stickyHeader && (title || description) && (
            <DialogHeader className={cn("ds:py-4", headerClasses)}>
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
            <div className={cn("ds:px-6 ds:py-4", contentClassName)}>{children}</div>
          )}
          {!stickyFooter && footer && (
            <DialogFooter className={cn("ds:py-4", footerClasses)}>
              {footer}
            </DialogFooter>
          )}
        </ScrollArea>
        {stickyFooter && footer && (
          <DialogFooter
            className={cn({ "ds:py-4 ds:border-t": stickyFooter }, footerClasses)}
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
