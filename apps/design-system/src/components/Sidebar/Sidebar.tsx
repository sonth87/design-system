import * as React from "react";

// Re-export all Sidebar components from shadcn/ui
import {
  Sidebar as SSidebar,
  SidebarProvider as SSidebarProvider,
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
  SidebarRail as SSidebarRail,
  SidebarSeparator as SSidebarSeparator,
  SidebarTrigger as SSidebarTrigger,
} from "@dsui/ui/components/sidebar";

// Export types derived from component props
export type SidebarProviderProps = React.ComponentProps<typeof SSidebarProvider>;
export type SidebarProps = React.ComponentProps<typeof SSidebar>;
export type SidebarContentProps = React.ComponentProps<typeof SSidebarContent>;
export type SidebarFooterProps = React.ComponentProps<typeof SSidebarFooter>;
export type SidebarGroupProps = React.ComponentProps<typeof SSidebarGroup>;
export type SidebarGroupActionProps = React.ComponentProps<typeof SSidebarGroupAction>;
export type SidebarGroupContentProps = React.ComponentProps<typeof SSidebarGroupContent>;
export type SidebarGroupLabelProps = React.ComponentProps<typeof SSidebarGroupLabel>;
export type SidebarHeaderProps = React.ComponentProps<typeof SSidebarHeader>;
export type SidebarInputProps = React.ComponentProps<typeof SSidebarInput>;
export type SidebarInsetProps = React.ComponentProps<typeof SSidebarInset>;
export type SidebarMenuProps = React.ComponentProps<typeof SSidebarMenu>;
export type SidebarMenuActionProps = React.ComponentProps<typeof SSidebarMenuAction>;
export type SidebarMenuBadgeProps = React.ComponentProps<typeof SSidebarMenuBadge>;
export type SidebarMenuButtonProps = React.ComponentProps<typeof SSidebarMenuButton>;
export type SidebarMenuItemProps = React.ComponentProps<typeof SSidebarMenuItem>;
export type SidebarMenuSkeletonProps = React.ComponentProps<typeof SSidebarMenuSkeleton>;
export type SidebarMenuSubProps = React.ComponentProps<typeof SSidebarMenuSub>;
export type SidebarMenuSubButtonProps = React.ComponentProps<typeof SSidebarMenuSubButton>;
export type SidebarMenuSubItemProps = React.ComponentProps<typeof SSidebarMenuSubItem>;
export type SidebarRailProps = React.ComponentProps<typeof SSidebarRail>;
export type SidebarSeparatorProps = React.ComponentProps<typeof SSidebarSeparator>;
export type SidebarTriggerProps = React.ComponentProps<typeof SSidebarTrigger>;

// Re-export components (using const to prevent tree-shaking)
export const Sidebar = SSidebar;
export const SidebarProvider = SSidebarProvider;
export const SidebarContent = SSidebarContent;
export const SidebarFooter = SSidebarFooter;
export const SidebarGroup = SSidebarGroup;
export const SidebarGroupAction = SSidebarGroupAction;
export const SidebarGroupContent = SSidebarGroupContent;
export const SidebarGroupLabel = SSidebarGroupLabel;
export const SidebarHeader = SSidebarHeader;
export const SidebarInput = SSidebarInput;
export const SidebarInset = SSidebarInset;
export const SidebarMenu = SSidebarMenu;
export const SidebarMenuAction = SSidebarMenuAction;
export const SidebarMenuBadge = SSidebarMenuBadge;
export const SidebarMenuButton = SSidebarMenuButton;
export const SidebarMenuItem = SSidebarMenuItem;
export const SidebarMenuSkeleton = SSidebarMenuSkeleton;
export const SidebarMenuSub = SSidebarMenuSub;
export const SidebarMenuSubButton = SSidebarMenuSubButton;
export const SidebarMenuSubItem = SSidebarMenuSubItem;
export const SidebarRail = SSidebarRail;
export const SidebarSeparator = SSidebarSeparator;
export const SidebarTrigger = SSidebarTrigger;

// Default export
export default Sidebar;
