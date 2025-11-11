import React from "react";
import {
  Tabs as STabs,
  TabsList as STabsList,
  TabsTrigger as STabsTrigger,
  TabsContent as STabsContent,
} from "@dsui/ui/components/tabs";
import { cn } from "@dsui/ui/lib/utils";

export type TabsProps = React.ComponentProps<typeof STabs>;
export type TabsListProps = React.ComponentProps<typeof STabsList>;
export type TabsTriggerProps = React.ComponentProps<typeof STabsTrigger>;
export type TabsContentProps = React.ComponentProps<typeof STabsContent>;

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, ...props }, ref) => {
    return <STabs ref={ref} className={cn(className)} {...props} />;
  }
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    return <STabsList ref={ref} className={cn(className)} {...props} />;
  }
);
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, ...props }, ref) => {
    return <STabsTrigger ref={ref} className={cn(className)} {...props} />;
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, ...props }, ref) => {
    return <STabsContent ref={ref} className={cn(className)} {...props} />;
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
export default Tabs;
