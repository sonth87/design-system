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
    "ds:text-primaryA-500 ds:[&_[data-slot=breadcrumb-link]:hover]:text-primaryA-500/80 ds:[&_[data-slot=breadcrumb-page]]:text-primaryA-500",
  secondary:
    "ds:text-primaryC-500 ds:[&_[data-slot=breadcrumb-link]:hover]:text-primaryC-500/80 ds:[&_[data-slot=breadcrumb-page]]:text-primaryC-500",
  accent:
    "ds:text-ink200 ds:[&_[data-slot=breadcrumb-link]:hover]:text-ink200/80 ds:[&_[data-slot=breadcrumb-page]]:text-ink200",
  destructive:
    "ds:text-red600 ds:[&_[data-slot=breadcrumb-link]:hover]:text-red600/80 ds:[&_[data-slot=breadcrumb-page]]:text-red600",
  muted:
    "ds:text-ink700 ds:[&_[data-slot=breadcrumb-link]:hover]:text-ink700/80 ds:[&_[data-slot=breadcrumb-page]]:text-ink700",
  success:
    "ds:text-green500 ds:[&_[data-slot=breadcrumb-link]:hover]:text-green500/80 ds:[&_[data-slot=breadcrumb-page]]:text-green500",
  error:
    "ds:text-red500 ds:[&_[data-slot=breadcrumb-link]:hover]:text-red500/80 ds:[&_[data-slot=breadcrumb-page]]:text-red500",
  warning:
    "ds:text-orange500 ds:[&_[data-slot=breadcrumb-link]:hover]:text-orange500/80 ds:[&_[data-slot=breadcrumb-page]]:text-orange500",
};

const variantClasses = {
  default: "",
  compact:
    "ds:text-xs ds:[&_[data-slot=breadcrumb-list]]:gap-1 ds:[&_[data-slot=breadcrumb-separator]>svg]:size-3",
  badge:
    "ds:[&_[data-slot=breadcrumb-list]]:gap-1 ds:[&_[data-slot=breadcrumb-item]]:border ds:[&_[data-slot=breadcrumb-item]]:bg-ink200 ds:[&_[data-slot=breadcrumb-item]]:px-2 ds:[&_[data-slot=breadcrumb-item]]:py-0.5 ds:[&_[data-slot=breadcrumb-item]]:rounded-full ds:[&_[data-slot=breadcrumb-item]]:text-sm",
  bordered: "ds:border ds:rounded-md ds:px-3 ds:py-2",
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
        homeItem = [{ icon: <Home className="ds:size-4" />, href: "/" }];
      } else if (normalizedShowHome === "both") {
        homeItem = [
          { label: "Home", icon: <Home className="ds:size-4" />, href: "/" },
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
            <PopoverContent className="ds:w-auto ds:max-w-64 ds:p-2">
              {hiddenItems.map((item, index) => (
                <div
                  key={index}
                  className="ds:flex ds:items-center ds:gap-2 ds:py-1 ds:px-3 ds:rounded ds:hover:bg-ink200"
                >
                  {item.icon}
                  {item.label && (
                    <a href={item.href} className="ds:text-sm ds:hover:underline">
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
                      <div className="ds:flex ds:items-center ds:gap-1">
                        {item.icon}
                        {item.label}
                      </div>
                    </SBreadcrumbPage>
                  ) : (
                    <SBreadcrumbLink href={item.href}>
                      <div className="ds:flex ds:items-center ds:gap-1">
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
