import React from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  resizableHandleVariants,
} from "@dsui/ui/components/resizable";
import { cn } from "@dsui/ui/lib/utils";
import type { VariantProps } from "class-variance-authority";

// ============================================================================
// Types
// ============================================================================

export type ResizableDirection = "horizontal" | "vertical";

export type ResizableHandleVariant = VariantProps<
  typeof resizableHandleVariants
>["variant"];

export interface ResizablePanelConfig {
  id?: string;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  collapsible?: boolean;
  collapsedSize?: number;
  onCollapse?: () => void;
  onExpand?: () => void;
  onResize?: (size: number) => void;
  className?: string;
  children?: React.ReactNode;
  order?: number;
}

type PanelGroupOnLayout = (sizes: number[]) => void;

export interface ResizableProps {
  /** Direction of the resizable panels */
  direction?: ResizableDirection;
  /** Configuration for panels when using wrapper mode */
  panels?: ResizablePanelConfig[];
  /** Show handle with grip icon */
  withHandle?: boolean;
  /** Handle variant: 'default' shows icon, 'line' highlights on hover */
  handleVariant?: ResizableHandleVariant;
  /** Custom icon for the handle (only works with default variant) */
  handleIcon?: React.ReactNode;
  /** Auto save layout to localStorage with this id */
  autoSaveId?: string;
  /** Callback when layout changes */
  onLayout?: PanelGroupOnLayout;
  /** Additional class for the panel group */
  className?: string;
  /** Additional class for each panel */
  panelClassName?: string;
  /** Additional class for handles */
  handleClassName?: string;
  /** Children for primitive usage */
  children?: React.ReactNode;
  /** Keyboard resize by delta percentage (default: 10) */
  keyboardResizeBy?: number;
  /** Storage object for saving layout (default: localStorage) */
  storage?: {
    getItem: (name: string) => string | null;
    setItem: (name: string, value: string) => void;
  };
}

// ============================================================================
// Wrapper Component
// ============================================================================

const ResizableWrapper = (props: ResizableProps) => {
  const {
    direction = "horizontal",
    panels,
    withHandle = true,
    handleVariant,
    handleIcon,
    autoSaveId,
    onLayout,
    className,
    panelClassName,
    handleClassName,
    children,
    keyboardResizeBy,
    storage,
  } = props;

  // If children are provided, use primitive mode
  if (children && !panels) {
    return (
      <ResizablePanelGroup
        direction={direction}
        autoSaveId={autoSaveId}
        onLayout={onLayout}
        className={cn("h-full w-full", className)}
        keyboardResizeBy={keyboardResizeBy}
        storage={storage}
      >
        {children}
      </ResizablePanelGroup>
    );
  }

  // Wrapper mode with panels config
  if (!panels || panels.length === 0) {
    return null;
  }

  return (
    <ResizablePanelGroup
      direction={direction}
      autoSaveId={autoSaveId}
      onLayout={onLayout}
      className={cn("h-full w-full", className)}
      keyboardResizeBy={keyboardResizeBy}
      storage={storage}
    >
      {panels.map((panel, index) => (
        <React.Fragment key={panel.id || `panel-${index}`}>
          <ResizablePanel
            id={panel.id}
            defaultSize={panel.defaultSize}
            minSize={panel.minSize}
            maxSize={panel.maxSize}
            collapsible={panel.collapsible}
            collapsedSize={panel.collapsedSize}
            onCollapse={panel.onCollapse}
            onExpand={panel.onExpand}
            onResize={panel.onResize}
            order={panel.order}
            className={cn(panelClassName, panel.className)}
          >
            {panel.children}
          </ResizablePanel>
          {index < panels.length - 1 && (
            <ResizableHandle
              withHandle={withHandle}
              variant={handleVariant}
              icon={handleIcon}
              className={handleClassName}
            />
          )}
        </React.Fragment>
      ))}
    </ResizablePanelGroup>
  );
};

ResizableWrapper.displayName = "Resizable";

// ============================================================================
// Sub-components for primitive usage
// ============================================================================

export type ResizablePanelProps = React.ComponentProps<typeof ResizablePanel>;
export type ResizableHandleProps = React.ComponentProps<typeof ResizableHandle>;
export type ResizablePanelGroupProps = React.ComponentProps<
  typeof ResizablePanelGroup
>;

// Re-export Panel and Handle from shadcn for primitive usage
const Panel = ResizablePanel;
const Handle = ResizableHandle;

// ============================================================================
// Export with Object.assign pattern
// ============================================================================

const Resizable = Object.assign(ResizableWrapper, {
  Panel,
  Handle,
  PanelGroup: ResizablePanelGroup,
});

export default Resizable;
export {
  Resizable,
  ResizableWrapper,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  Panel,
  Handle,
};
