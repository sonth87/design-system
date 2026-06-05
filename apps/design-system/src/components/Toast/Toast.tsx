import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
  type ToasterProps as SonnerToasterProps,
} from "sonner";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@dsui/ui/index";

const variantStyles = {
  default: "ds:bg-neutral-800 ds:text-white ds:border ds:border-neutral-700",
  success: "ds:bg-success ds:text-white ds:border ds:border-success/20",
  error: "ds:bg-error ds:text-white ds:border ds:border-error/20",
  warning: "ds:bg-warning ds:text-black ds:border ds:border-warning/20",
  info: "ds:bg-info ds:text-foreground",
  primary: "ds:bg-primary ds:text-primary-foreground ds:border ds:border-primary/20",
  secondary:
    "ds:bg-secondary ds:text-secondary-foreground ds:border ds:border-secondary/20",
};

const variantIcons = {
  success: <CheckCircle className="ds:w-4 ds:h-4 ds:shrink-0" />,
  error: <XCircle className="ds:w-4 ds:h-4 ds:shrink-0" />,
  warning: <AlertTriangle className="ds:w-4 ds:h-4 ds:shrink-0" />,
  info: <Info className="ds:w-4 ds:h-4 ds:shrink-0" />,
  default: null,
  primary: <Info className="ds:w-4 ds:h-4 ds:shrink-0" />,
  secondary: <Info className="ds:w-4 ds:h-4 ds:shrink-0" />,
};

type Variant = keyof typeof variantStyles;

const renderToastContent = (variant: Variant, message: React.ReactNode) => (
  <div
    className={cn(
      "ds:flex ds:items-center ds:gap-2 ds:rounded-md ds:px-3 ds:py-2 ds:shadow-md ds:text-sm ds:font-medium",
      variantStyles[variant]
    )}
  >
    {variantIcons[variant]}
    <span>{message}</span>
  </div>
);

const toast = Object.assign(
  (...args: Parameters<typeof sonnerToast>) => {
    const [message] = args;
    const content =
      typeof message === "function" ? message() : (message ?? "Notification");

    return sonnerToast.custom(() => renderToastContent("default", content));
  },
  {
    success: (
      message: React.ReactNode,
      opts?: Parameters<typeof sonnerToast>[1]
    ) => sonnerToast.custom(() => renderToastContent("success", message), opts),

    error: (
      message: React.ReactNode,
      opts?: Parameters<typeof sonnerToast>[1]
    ) => sonnerToast.custom(() => renderToastContent("error", message), opts),

    warning: (
      message: React.ReactNode,
      opts?: Parameters<typeof sonnerToast>[1]
    ) => sonnerToast.custom(() => renderToastContent("warning", message), opts),

    info: (
      message: React.ReactNode,
      opts?: Parameters<typeof sonnerToast>[1]
    ) => sonnerToast.custom(() => renderToastContent("info", message), opts),

    primary: (
      message: React.ReactNode,
      opts?: Parameters<typeof sonnerToast>[1]
    ) => sonnerToast.custom(() => renderToastContent("primary", message), opts),

    secondary: (
      message: React.ReactNode,
      opts?: Parameters<typeof sonnerToast>[1]
    ) =>
      sonnerToast.custom(() => renderToastContent("secondary", message), opts),
  }
) as any;

function Toaster({
  position = "top-right",
  richColors = true,
  closeButton = false,
  expand = false,
  visibleToasts = 3,
  duration = 4000,
  ...props
}: SonnerToasterProps) {
  return (
    <SonnerToaster
      {...props}
      position={position}
      richColors={richColors}
      closeButton={closeButton}
      expand={expand}
      visibleToasts={visibleToasts}
      toastOptions={{
        duration: duration,
        classNames: {
          toast:
            "ds:rounded-md ds:shadow-md ds:border-none ds:text-sm ds:font-medium ds:backdrop-blur-sm ds:text-black ds:dark:text-white",
          description: "ds:text-muted-foreground",
          actionButton: "ds:bg-white/10",
        },
      }}
    />
  );
}

export { toast, Toaster };
