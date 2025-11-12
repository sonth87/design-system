import React from "react";
import {
  Sidebar as SSidebar,
  SidebarContent as SSidebarContent,
  SidebarFooter as SSidebarFooter,
  SidebarGroup as SSidebarGroup,
  SidebarGroupAction as SSidebarGroupAction,
  SidebarGroupContent as SSidebarGroupContent,
  SidebarGroupLabel as SSidebarGroupLabel,
  SidebarHeader as SSidebarHeader,
  SidebarInput as SSidebarInput,
  SidebarInset as SSidebarInset,
  SidebarMenu as SSidebarMenu,
  SidebarMenuAction as SSidebarMenuAction,
  SidebarMenuBadge as SSidebarMenuBadge,
  SidebarMenuButton as SSidebarMenuButton,
  SidebarMenuItem as SSidebarMenuItem,
  SidebarMenuSkeleton as SSidebarMenuSkeleton,
  SidebarMenuSub as SSidebarMenuSub,
  SidebarMenuSubButton as SSidebarMenuSubButton,
  SidebarMenuSubItem as SSidebarMenuSubItem,
  SidebarProvider as SSidebarProvider,
  SidebarRail as SSidebarRail,
  SidebarSeparator as SSidebarSeparator,
  SidebarTrigger as SSidebarTrigger,
} from "@dsui/ui/components/sidebar";
import { cn } from "@dsui/ui/lib/utils";

// Export types for all components
export type SidebarProviderProps = Omit<
  React.ComponentProps<typeof SSidebarProvider>,
  "children"
> & {
  children?: React.ReactNode;
};

export type SidebarProps = Omit<
  React.ComponentProps<typeof SSidebar>,
  "children"
> & {
  children?: React.ReactNode;
};

export type SidebarContentProps = React.ComponentProps<typeof SSidebarContent>;
export type SidebarFooterProps = React.ComponentProps<typeof SSidebarFooter>;
export type SidebarGroupProps = React.ComponentProps<typeof SSidebarGroup>;
export type SidebarGroupActionProps = React.ComponentProps<
  typeof SSidebarGroupAction
>;
export type SidebarGroupContentProps = React.ComponentProps<
  typeof SSidebarGroupContent
>;
export type SidebarGroupLabelProps = React.ComponentProps<
  typeof SSidebarGroupLabel
>;
export type SidebarHeaderProps = React.ComponentProps<typeof SSidebarHeader>;
export type SidebarInputProps = React.ComponentProps<typeof SSidebarInput>;
export type SidebarInsetProps = React.ComponentProps<typeof SSidebarInset>;
export type SidebarMenuProps = React.ComponentProps<typeof SSidebarMenu>;
export type SidebarMenuActionProps = React.ComponentProps<
  typeof SSidebarMenuAction
>;
export type SidebarMenuBadgeProps = React.ComponentProps<
  typeof SSidebarMenuBadge
>;
export type SidebarMenuButtonProps = React.ComponentProps<
  typeof SSidebarMenuButton
>;
export type SidebarMenuItemProps = React.ComponentProps<
  typeof SSidebarMenuItem
>;
export type SidebarMenuSkeletonProps = React.ComponentProps<
  typeof SSidebarMenuSkeleton
>;
export type SidebarMenuSubProps = React.ComponentProps<typeof SSidebarMenuSub>;
export type SidebarMenuSubButtonProps = React.ComponentProps<
  typeof SSidebarMenuSubButton
>;
export type SidebarMenuSubItemProps = React.ComponentProps<
  typeof SSidebarMenuSubItem
>;
export type SidebarRailProps = React.ComponentProps<typeof SSidebarRail>;
export type SidebarSeparatorProps = React.ComponentProps<
  typeof SSidebarSeparator
>;
export type SidebarTriggerProps = React.ComponentProps<typeof SSidebarTrigger>;

// Main Provider Component
const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <SSidebarProvider ref={ref} className={cn(className)} {...props}>
        {children}
      </SSidebarProvider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

// Main Sidebar Component
const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <SSidebar ref={ref} className={cn(className)} {...props}>
        {children}
      </SSidebar>
    );
  },
);
Sidebar.displayName = "Sidebar";

// Sidebar Content
const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarContent ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarContent.displayName = "SidebarContent";

// Sidebar Footer
const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarFooter ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarFooter.displayName = "SidebarFooter";

// Sidebar Group
const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarGroup ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarGroup.displayName = "SidebarGroup";

// Sidebar Group Action
const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  SidebarGroupActionProps
>(({ className, ...props }, ref) => {
  return <SSidebarGroupAction ref={ref} className={cn(className)} {...props} />;
});
SidebarGroupAction.displayName = "SidebarGroupAction";

// Sidebar Group Content
const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  SidebarGroupContentProps
>(({ className, ...props }, ref) => {
  return (
    <SSidebarGroupContent ref={ref} className={cn(className)} {...props} />
  );
});
SidebarGroupContent.displayName = "SidebarGroupContent";

// Sidebar Group Label
const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  SidebarGroupLabelProps
>(({ className, ...props }, ref) => {
  return <SSidebarGroupLabel ref={ref} className={cn(className)} {...props} />;
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

// Sidebar Header
const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarHeader ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarHeader.displayName = "SidebarHeader";

// Sidebar Input
const SidebarInput = React.forwardRef<HTMLInputElement, SidebarInputProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarInput ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarInput.displayName = "SidebarInput";

// Sidebar Inset
const SidebarInset = React.forwardRef<HTMLElement, SidebarInsetProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarInset ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarInset.displayName = "SidebarInset";

// Sidebar Menu
const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarMenu ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarMenu.displayName = "SidebarMenu";

// Sidebar Menu Action
const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuActionProps
>(({ className, ...props }, ref) => {
  return <SSidebarMenuAction ref={ref} className={cn(className)} {...props} />;
});
SidebarMenuAction.displayName = "SidebarMenuAction";

// Sidebar Menu Badge
const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  SidebarMenuBadgeProps
>(({ className, ...props }, ref) => {
  return <SSidebarMenuBadge ref={ref} className={cn(className)} {...props} />;
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";

// Sidebar Menu Button
const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, ...props }, ref) => {
  return <SSidebarMenuButton ref={ref} className={cn(className)} {...props} />;
});
SidebarMenuButton.displayName = "SidebarMenuButton";

// Sidebar Menu Item
const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarMenuItem ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarMenuItem.displayName = "SidebarMenuItem";

// Sidebar Menu Skeleton
const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  SidebarMenuSkeletonProps
>(({ className, ...props }, ref) => {
  return (
    <SSidebarMenuSkeleton ref={ref} className={cn(className)} {...props} />
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

// Sidebar Menu Sub
const SidebarMenuSub = React.forwardRef<HTMLUListElement, SidebarMenuSubProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarMenuSub ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarMenuSub.displayName = "SidebarMenuSub";

// Sidebar Menu Sub Button
const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  SidebarMenuSubButtonProps
>(({ className, ...props }, ref) => {
  return (
    <SSidebarMenuSubButton ref={ref} className={cn(className)} {...props} />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

// Sidebar Menu Sub Item
const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  SidebarMenuSubItemProps
>(({ className, ...props }, ref) => {
  return <SSidebarMenuSubItem ref={ref} className={cn(className)} {...props} />;
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

// Sidebar Rail
const SidebarRail = React.forwardRef<HTMLButtonElement, SidebarRailProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarRail ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarRail.displayName = "SidebarRail";

// Sidebar Separator
const SidebarSeparator = React.forwardRef<
  HTMLDivElement,
  SidebarSeparatorProps
>(({ className, ...props }, ref) => {
  return <SSidebarSeparator ref={ref} className={cn(className)} {...props} />;
});
SidebarSeparator.displayName = "SidebarSeparator";

// Sidebar Trigger
const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, ...props }, ref) => {
    return <SSidebarTrigger ref={ref} className={cn(className)} {...props} />;
  },
);
SidebarTrigger.displayName = "SidebarTrigger";

// Export all components
export {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
};

export default Sidebar;
