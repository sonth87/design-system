import React from "react";
import {
  Breadcrumb as SBreadcrumb,
  BreadcrumbList as SBreadcrumbList,
  BreadcrumbItem as SBreadcrumbItem,
  BreadcrumbLink as SBreadcrumbLink,
  BreadcrumbPage as SBreadcrumbPage,
  BreadcrumbSeparator as SBreadcrumbSeparator,
  BreadcrumbEllipsis as SBreadcrumbEllipsis,
} from "@dsui/ui/components/breadcrumb";
import { cn } from "@dsui/ui/lib/utils";
import { Home } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@dsui/ui/components/popover";

export type BreadcrumbItemType = {
  label?: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
};

export type BreadcrumbProps = React.ComponentProps<"nav"> & {
  variant?: "default" | "compact" | "badge" | "bordered";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "destructive"
    | "muted"
    | "success"
    | "error"
    | "warning";
  items: BreadcrumbItemType[];
  separator?: React.ReactNode;
  maxItems?: number;
  showEllipsis?: boolean;
  showHome?:
    | boolean
    | "label"
    | "icon"
    | "both"
    | React.ReactNode
    | { label?: React.ReactNode; icon?: React.ReactNode; href?: string };
  showPopoverOnEllipsis?: boolean;
};

const colorClasses = {
  default: "",
  primary:
    "text-primary [&_[data-slot=breadcrumb-link]:hover]:text-primary/80 [&_[data-slot=breadcrumb-page]]:text-primary",
  secondary:
    "text-secondary [&_[data-slot=breadcrumb-link]:hover]:text-secondary/80 [&_[data-slot=breadcrumb-page]]:text-secondary",
  accent:
    "text-accent [&_[data-slot=breadcrumb-link]:hover]:text-accent/80 [&_[data-slot=breadcrumb-page]]:text-accent",
  destructive:
    "text-destructive [&_[data-slot=breadcrumb-link]:hover]:text-destructive/80 [&_[data-slot=breadcrumb-page]]:text-destructive",
  muted:
    "text-muted-foreground [&_[data-slot=breadcrumb-link]:hover]:text-muted-foreground/80 [&_[data-slot=breadcrumb-page]]:text-muted-foreground",
  success:
    "text-success [&_[data-slot=breadcrumb-link]:hover]:text-success/80 [&_[data-slot=breadcrumb-page]]:text-success",
  error:
    "text-error [&_[data-slot=breadcrumb-link]:hover]:text-error/80 [&_[data-slot=breadcrumb-page]]:text-error",
  warning:
    "text-warning [&_[data-slot=breadcrumb-link]:hover]:text-warning/80 [&_[data-slot=breadcrumb-page]]:text-warning",
};

const variantClasses = {
  default: "",
  compact:
    "text-xs [&_[data-slot=breadcrumb-list]]:gap-1 [&_[data-slot=breadcrumb-separator]>svg]:size-3",
  badge:
    "[&_[data-slot=breadcrumb-list]]:gap-1 [&_[data-slot=breadcrumb-item]]:border [&_[data-slot=breadcrumb-item]]:bg-muted [&_[data-slot=breadcrumb-item]]:px-2 [&_[data-slot=breadcrumb-item]]:py-0.5 [&_[data-slot=breadcrumb-item]]:rounded-full [&_[data-slot=breadcrumb-item]]:text-sm",
  bordered: "border rounded-md px-3 py-2",
};

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      variant = "default",
      color = "default",
      items,
      separator,
      maxItems,
      showEllipsis = true,
      showHome = "label",
      showPopoverOnEllipsis = false,
      ...props
    },
    ref
  ) => {
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const userItems = items;
    let homeItem: BreadcrumbItemType[] = [];
    const normalizedShowHome = showHome === true ? "label" : showHome;
    if (normalizedShowHome) {
      if (normalizedShowHome === "label") {
        homeItem = [{ label: "Home", href: "/" }];
      } else if (normalizedShowHome === "icon") {
        homeItem = [{ icon: <Home className="size-4" />, href: "/" }];
      } else if (normalizedShowHome === "both") {
        homeItem = [
          { label: "Home", icon: <Home className="size-4" />, href: "/" },
        ];
      } else if (
        typeof normalizedShowHome === "object" &&
        !React.isValidElement(normalizedShowHome)
      ) {
        // custom object
        homeItem = [normalizedShowHome as BreadcrumbItemType];
      } else {
        // ReactNode
        homeItem = [
          { label: normalizedShowHome as React.ReactNode, href: "/" },
        ];
      }
    }
    // Calculate which items to display
    let displayItems: BreadcrumbItemType[] = [];
    let hasEllipsis = false;
    let hiddenItems: BreadcrumbItemType[] = [];

    if (maxItems === 0) {
      displayItems = [...homeItem, ...userItems];
    } else if (maxItems) {
      const numUserItems = maxItems - homeItem.length;
      const truncatedUserItems =
        numUserItems > 0 ? userItems.slice(-numUserItems) : [];
      displayItems = [...homeItem, ...truncatedUserItems];
      hasEllipsis =
        numUserItems > 0 && userItems.length > numUserItems && showEllipsis;
      hiddenItems =
        numUserItems > 0 ? userItems.slice(0, -numUserItems) : userItems;
    } else {
      displayItems = [...homeItem, ...userItems];
    }

    const renderEllipsis = () => {
      if (showPopoverOnEllipsis) {
        return (
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <SBreadcrumbItem>
                <SBreadcrumbEllipsis />
              </SBreadcrumbItem>
            </PopoverTrigger>
            <PopoverContent className="w-auto max-w-64 p-2">
              {hiddenItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 py-1 px-3 rounded hover:bg-muted"
                >
                  {item.icon}
                  {item.label && (
                    <a href={item.href} className="text-sm hover:underline">
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        );
      }
      return (
        <SBreadcrumbItem>
          <SBreadcrumbEllipsis />
        </SBreadcrumbItem>
      );
    };

    return (
      <SBreadcrumb
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      >
        <SBreadcrumbList className={colorClasses[color]}>
          {hasEllipsis && homeItem.length === 0 && (
            <>
              {renderEllipsis()}
              <SBreadcrumbSeparator>{separator}</SBreadcrumbSeparator>
            </>
          )}
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const shouldShowEllipsisAfter =
              hasEllipsis && index === 0 && homeItem.length > 0;
            return (
              <React.Fragment key={index}>
                <SBreadcrumbItem>
                  {isLast ? (
                    <SBreadcrumbPage>
                      <div className="flex items-center gap-1">
                        {item.icon}
                        {item.label}
                      </div>
                    </SBreadcrumbPage>
                  ) : (
                    <SBreadcrumbLink href={item.href}>
                      <div className="flex items-center gap-1">
                        {item.icon}
                        {item.label}
                      </div>
                    </SBreadcrumbLink>
                  )}
                </SBreadcrumbItem>
                {shouldShowEllipsisAfter && (
                  <>
                    <SBreadcrumbSeparator>{separator}</SBreadcrumbSeparator>
                    {renderEllipsis()}
                  </>
                )}
                {!isLast && (
                  <SBreadcrumbSeparator>{separator}</SBreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })}
        </SBreadcrumbList>
      </SBreadcrumb>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
