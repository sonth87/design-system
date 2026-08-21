"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "@dsui/ui/hooks/use-mobile";
import { cn } from "@dsui/ui/lib/utils";
import { Button } from "@dsui/ui/components/button";
import { Input } from "@dsui/ui/components/input";
import { Separator } from "@dsui/ui/components/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@dsui/ui/components/sheet";
import { Skeleton } from "@dsui/ui/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@dsui/ui/components/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "ds:group/sidebar-wrapper ds:has-data-[variant=inset]:bg-bgF1 ds:flex ds:min-h-svh ds:w-full",
            "ds:has-data-[variant=tilt]:[perspective:1000px] ds:has-data-[variant=tilt]:bg-blackOpacity300",
            "ds:has-data-[variant=depth]:[perspective:1000px] ds:has-data-[variant=depth]:bg-blackOpacity300",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset" | "tilt" | "depth";
  collapsible?: "offcanvas" | "icon" | "none";
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "ds:bg-bgF1 ds:text-ink800 ds:flex ds:h-full ds:w-(--sidebar-width) ds:flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="ds:bg-bgF1 ds:text-ink800 ds:w-(--sidebar-width) ds:p-0 ds:[&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="ds:sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="ds:flex ds:h-full ds:w-full ds:flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="ds:group ds:peer ds:text-ink800 ds:hidden ds:md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "ds:relative ds:w-(--sidebar-width) ds:bg-transparent ds:transition-[width] ds:duration-200 ds:ease-linear",
          "ds:group-data-[collapsible=offcanvas]:w-0",
          "ds:group-data-[side=right]:rotate-180",
          "ds:group-data-[side=right]:hidden",
          variant === "floating" || variant === "inset"
            ? "ds:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--ds-spacing(4)))]"
            : "ds:group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "ds:fixed ds:inset-y-0 ds:z-10 ds:hidden ds:h-svh ds:w-(--sidebar-width) ds:transition-[left,right,width] ds:duration-200 ds:ease-linear ds:md:flex",
          side === "left"
            ? "ds:left-0 ds:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "ds:right-0 ds:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "ds:p-2 ds:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--ds-spacing(4))+2px)]"
            : "ds:group-data-[collapsible=icon]:w-(--sidebar-width-icon) ds:group-data-[side=left]:border-r ds:group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="ds:bg-bgF1 ds:group-data-[variant=floating]:border-border ds:flex ds:h-full ds:w-full ds:flex-col ds:group-data-[variant=floating]:rounded-lg ds:group-data-[variant=floating]:border ds:group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("ds:size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="ds:sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "ds:hover:after:bg-border ds:absolute ds:inset-y-0 ds:z-20 ds:hidden ds:w-4 ds:-translate-x-1/2 ds:transition-all ds:ease-linear ds:group-data-[side=left]:-right-4 ds:group-data-[side=right]:left-0 ds:after:absolute ds:after:inset-y-0 ds:after:left-1/2 ds:after:w-[2px] ds:sm:flex",
        "ds:in-data-[side=left]:cursor-w-resize ds:in-data-[side=right]:cursor-e-resize",
        "ds:[[data-side=left][data-state=collapsed]_&]:cursor-e-resize ds:[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "ds:hover:group-data-[collapsible=offcanvas]:bg-bgF1 ds:group-data-[collapsible=offcanvas]:translate-x-0 ds:group-data-[collapsible=offcanvas]:after:left-full",
        "ds:[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "ds:[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  const { setOpen, state } = useSidebar();
  const mainRef = React.useRef<HTMLElement>(null);

  const handleClick = React.useCallback(() => {
    if (mainRef.current) {
      const sidebar = mainRef.current.parentElement?.querySelector(
        '[data-slot="sidebar"]'
      );
      const variant = sidebar?.getAttribute("data-variant");
      if ((variant === "tilt" || variant === "depth") && state === "expanded") {
        setOpen(false);
      }
    }
  }, [setOpen, state]);

  return (
    <main
      ref={mainRef}
      data-slot="sidebar-inset"
      onClick={handleClick}
      className={cn(
        "ds:bg-white ds:relative ds:flex ds:w-full ds:flex-1 ds:flex-col",
        "ds:md:peer-data-[variant=inset]:m-2 ds:md:peer-data-[variant=inset]:ml-0 ds:md:peer-data-[variant=inset]:rounded-xl ds:md:peer-data-[variant=inset]:shadow-sm ds:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        "ds:md:peer-data-[variant=sidebar]:peer-data-[side=left]:peer-data-[state=collapsed]:peer-data-[collapsible=icon]:ml-(--sidebar-width-icon) ds:md:peer-data-[variant=sidebar]:peer-data-[side=right]:peer-data-[state=collapsed]:peer-data-[collapsible=icon]:mr-(--sidebar-width-icon)",
        "ds:md:peer-data-[variant=sidebar]:peer-data-[state=collapsed]:peer-data-[collapsible=offcanvas]:ml-0 ds:md:peer-data-[variant=sidebar]:peer-data-[state=collapsed]:peer-data-[collapsible=offcanvas]:mr-0",
        "ds:md:peer-data-[variant=sidebar]:peer-data-[side=right]:mr-(--sidebar-width)",
        "ds:md:peer-data-[variant=inset]:peer-data-[side=left]:peer-data-[state=collapsed]:peer-data-[collapsible=icon]:ml-(--sidebar-width-icon) ds:md:peer-data-[variant=inset]:peer-data-[side=right]:peer-data-[state=collapsed]:peer-data-[collapsible=icon]:mr-(--sidebar-width-icon)",
        "ds:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:peer-data-[collapsible=offcanvas]:ml-0 ds:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:peer-data-[collapsible=offcanvas]:mr-0",
        "ds:md:peer-data-[variant=inset]:peer-data-[side=right]:mr-(--sidebar-width)",
        "ds:md:peer-data-[variant=tilt]:peer-data-[state=collapsed]:peer-data-[collapsible=offcanvas]:ml-0 ds:md:peer-data-[variant=tilt]:peer-data-[state=collapsed]:peer-data-[collapsible=offcanvas]:mr-0",
        "ds:md:peer-data-[variant=tilt]:peer-data-[side=right]:mr-(--sidebar-width)",
        "ds:md:peer-data-[variant=tilt]:transition-transform ds:md:peer-data-[variant=tilt]:duration-200 ds:md:peer-data-[variant=tilt]:ease-linear",
        "ds:md:peer-data-[variant=tilt]:peer-data-[side=left]:origin-right ds:md:peer-data-[variant=tilt]:peer-data-[side=left]:peer-data-[state=expanded]:[transform:rotate3d(0,1,0,-25deg)]",
        "ds:md:peer-data-[variant=tilt]:peer-data-[side=right]:origin-left ds:md:peer-data-[variant=tilt]:peer-data-[side=right]:peer-data-[state=expanded]:[transform:rotate3d(0,1,0,25deg)]",
        "ds:md:peer-data-[variant=tilt]:peer-data-[state=expanded]:blur-[2px]",
        "ds:md:peer-data-[variant=depth]:peer-data-[state=collapsed]:peer-data-[collapsible=offcanvas]:ml-0 ds:md:peer-data-[variant=depth]:peer-data-[state=collapsed]:peer-data-[collapsible=offcanvas]:mr-0",
        "ds:md:peer-data-[variant=depth]:peer-data-[side=right]:mr-(--sidebar-width)",
        "ds:md:peer-data-[variant=depth]:transition-transform ds:md:peer-data-[variant=depth]:duration-200 ds:md:peer-data-[variant=depth]:ease-linear",
        "ds:md:peer-data-[variant=depth]:peer-data-[state=expanded]:[transform:scale(0.95)_translateZ(-50px)]",
        "ds:md:peer-data-[variant=depth]:peer-data-[state=expanded]:backdrop-blur-[1px]",
        "ds:md:peer-data-[variant=depth]:peer-data-[state=expanded]:blur-[2px]",
        className
      )}
      {...props}
    />
  );
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("ds:bg-white ds:h-8 ds:w-full ds:shadow-none", className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("ds:flex ds:flex-col ds:gap-2 ds:p-2", className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("ds:flex ds:flex-col ds:gap-2 ds:p-2", className)}
      {...props}
    />
  );
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("ds:bg-border ds:mx-2 ds:w-auto", className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "ds:flex ds:min-h-0 ds:flex-1 ds:flex-col ds:gap-2 ds:overflow-auto ds:group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("ds:relative ds:flex ds:w-full ds:min-w-0 ds:flex-col ds:p-2", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "ds:text-ink800/70 ds:ring-ink500 ds:flex ds:h-8 ds:shrink-0 ds:items-center ds:rounded-md ds:px-2 ds:text-xs ds:font-medium ds:outline-hidden ds:transition-[margin,opacity] ds:duration-200 ds:ease-linear ds:focus-visible:ring-2 ds:[&>svg]:size-4 ds:[&>svg]:shrink-0",
        "ds:group-data-[collapsible=icon]:-mt-8 ds:group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "ds:text-ink800 ds:ring-ink500 ds:hover:bg-ink200 ds:hover:text-ink900 ds:absolute ds:top-3.5 ds:right-3 ds:flex ds:aspect-square ds:w-5 ds:items-center ds:justify-center ds:rounded-md ds:p-0 ds:outline-hidden ds:transition-transform ds:focus-visible:ring-2 ds:[&>svg]:size-4 ds:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "ds:after:absolute ds:after:-inset-2 ds:md:after:hidden",
        "ds:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("ds:w-full ds:text-sm", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("ds:flex ds:w-full ds:min-w-0 ds:flex-col ds:gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("ds:group/menu-item ds:relative", className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "ds:peer/menu-button ds:flex ds:w-full ds:items-center ds:gap-2 ds:overflow-hidden ds:rounded-md ds:p-2 ds:text-left ds:text-sm ds:outline-hidden ds:ring-ink500 ds:transition-[width,height,padding] ds:hover:bg-ink200 ds:hover:text-ink900 ds:focus-visible:ring-2 ds:active:bg-ink200 ds:active:text-ink900 ds:disabled:pointer-events-none ds:disabled:opacity-50 ds:group-has-data-[sidebar=menu-action]/menu-item:pr-8 ds:aria-disabled:pointer-events-none ds:aria-disabled:opacity-50 ds:data-[active=true]:bg-ink200 ds:data-[active=true]:font-medium ds:data-[active=true]:text-ink900 ds:data-[state=open]:hover:bg-ink200 ds:data-[state=open]:hover:text-ink900 ds:group-data-[collapsible=icon]:size-8! ds:group-data-[collapsible=icon]:p-2! ds:[&>span:last-child]:truncate ds:[&>svg]:size-4 ds:[&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "ds:hover:bg-ink200 ds:hover:text-ink900",
        outline:
          "ds:bg-white ds:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] ds:hover:bg-ink200 ds:hover:text-ink900 ds:hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "ds:h-8 ds:text-sm",
        sm: "ds:h-7 ds:text-xs",
        lg: "ds:h-12 ds:text-sm ds:group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "ds:text-ink800 ds:ring-ink500 ds:hover:bg-ink200 ds:hover:text-ink900 ds:peer-hover/menu-button:text-ink900 ds:absolute ds:top-1.5 ds:right-1 ds:flex ds:aspect-square ds:w-5 ds:items-center ds:justify-center ds:rounded-md ds:p-0 ds:outline-hidden ds:transition-transform ds:focus-visible:ring-2 ds:[&>svg]:size-4 ds:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "ds:after:absolute ds:after:-inset-2 ds:md:after:hidden",
        "ds:peer-data-[size=sm]/menu-button:top-1",
        "ds:peer-data-[size=default]/menu-button:top-1.5",
        "ds:peer-data-[size=lg]/menu-button:top-2.5",
        "ds:group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "ds:peer-data-[active=true]/menu-button:text-ink900 ds:group-focus-within/menu-item:opacity-100 ds:group-hover/menu-item:opacity-100 ds:data-[state=open]:opacity-100 ds:md:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "ds:text-ink800 ds:pointer-events-none ds:absolute ds:right-1 ds:flex ds:h-5 ds:min-w-5 ds:items-center ds:justify-center ds:rounded-md ds:px-1 ds:text-xs ds:font-medium ds:tabular-nums ds:select-none",
        "ds:peer-hover/menu-button:text-ink900 ds:peer-data-[active=true]/menu-button:text-ink900",
        "ds:peer-data-[size=sm]/menu-button:top-1",
        "ds:peer-data-[size=default]/menu-button:top-1.5",
        "ds:peer-data-[size=lg]/menu-button:top-2.5",
        "ds:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("ds:flex ds:h-8 ds:items-center ds:gap-2 ds:rounded-md ds:px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="ds:size-4 ds:rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="ds:h-4 ds:max-w-(--skeleton-width) ds:flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "ds:border-border ds:mx-3.5 ds:flex ds:min-w-0 ds:translate-x-px ds:flex-col ds:gap-1 ds:border-l ds:px-2.5 ds:py-0.5",
        "ds:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("ds:group/menu-sub-item ds:relative", className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "ds:text-ink800 ds:ring-ink500 ds:hover:bg-ink200 ds:hover:text-ink900 ds:active:bg-ink200 ds:active:text-ink900 ds:[&>svg]:text-ink900 ds:flex ds:h-7 ds:min-w-0 ds:-translate-x-px ds:items-center ds:gap-2 ds:overflow-hidden ds:rounded-md ds:px-2 ds:outline-hidden ds:focus-visible:ring-2 ds:disabled:pointer-events-none ds:disabled:opacity-50 ds:aria-disabled:pointer-events-none ds:aria-disabled:opacity-50 ds:[&>span:last-child]:truncate ds:[&>svg]:size-4 ds:[&>svg]:shrink-0",
        "ds:data-[active=true]:bg-ink200 ds:data-[active=true]:text-ink900",
        size === "sm" && "ds:text-xs",
        size === "md" && "ds:text-sm",
        "ds:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  );
}

export {
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
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
