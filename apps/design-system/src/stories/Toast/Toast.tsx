import {
  Toaster as SonnerToaster,
  toast as sonnerToast,
  type ToasterProps as SonnerToasterProps,
} from "sonner";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@dsui/ui/index";

const variantStyles = {
  default: "bg-neutral-800 text-white border border-neutral-700",
  success: "bg-success text-white border border-success/20",
  error: "bg-error text-white border border-error/20",
  warning: "bg-warning text-black border border-warning/20",
  info: "bg-info text-foreground border border-info/20",
  primary: "bg-primary text-primary-foreground border border-primary/20",
  secondary:
    "bg-secondary text-secondary-foreground border border-secondary/20",
};

const variantIcons = {
  success: <CheckCircle className="w-4 h-4 shrink-0" />,
  error: <XCircle className="w-4 h-4 shrink-0" />,
  warning: <AlertTriangle className="w-4 h-4 shrink-0" />,
  info: <Info className="w-4 h-4 shrink-0" />,
  default: null,
  primary: <Info className="w-4 h-4 shrink-0" />,
  secondary: <Info className="w-4 h-4 shrink-0" />,
};

type Variant = keyof typeof variantStyles;

const renderToastContent = (variant: Variant, message: React.ReactNode) => (
  <div
    className={cn(
      "flex items-center gap-2 rounded-md px-3 py-2 shadow-md text-sm font-medium",
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
);

function Toaster(props: SonnerToasterProps) {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
        classNames: {
          toast:
            "rounded-md shadow-md border text-sm font-medium backdrop-blur-sm text-black dark:text-white",
          description: "text-muted-foreground",
          actionButton: "bg-white/10",
        },
      }}
      {...props}
    />
  );
}

export { toast, Toaster };
