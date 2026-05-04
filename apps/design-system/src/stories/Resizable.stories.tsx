import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import Resizable, { type ResizableProps } from "../components/Resizable";
import i18n from "../../.storybook/i18n";
import Button from "../components/Button/Button";

const meta: Meta<ResizableProps> = {
  title: "Layout/Resizable",
  component: Resizable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: i18n.t("stories.resizable.argTypes.direction.description"),
      table: {
        defaultValue: { summary: "horizontal" },
        category: i18n.t("stories.category.layout"),
      },
    },
    panels: {
      control: "object",
      description: i18n.t("stories.resizable.argTypes.panels.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    withHandle: {
      control: "boolean",
      description: i18n.t("stories.resizable.argTypes.withHandle.description"),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    autoSaveId: {
      control: "text",
      description: i18n.t("stories.resizable.argTypes.autoSaveId.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    onLayout: {
      action: "layout changed",
      description: i18n.t("stories.resizable.argTypes.onLayout.description"),
      table: {
        category: i18n.t("stories.category.events"),
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.resizable.argTypes.className.description"),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    panelClassName: {
      control: "text",
      description: i18n.t(
        "stories.resizable.argTypes.panelClassName.description"
      ),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    handleClassName: {
      control: "text",
      description: i18n.t(
        "stories.resizable.argTypes.handleClassName.description"
      ),
      table: {
        category: i18n.t("stories.category.advanced"),
      },
    },
    keyboardResizeBy: {
      control: "number",
      description: i18n.t(
        "stories.resizable.argTypes.keyboardResizeBy.description"
      ),
      table: {
        defaultValue: { summary: "10" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    handleVariant: {
      control: "select",
      options: ["default", "line"],
      description: i18n.t(
        "stories.resizable.argTypes.handleVariant.description"
      ),
      table: {
        defaultValue: { summary: "default" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    handleIcon: {
      control: false,
      description: i18n.t("stories.resizable.argTypes.handleIcon.description"),
      table: {
        category: i18n.t("stories.category.appearance"),
      },
    },
  },
  args: {
    direction: "horizontal",
    withHandle: true,
  },
};

export default meta;
type Story = StoryObj<ResizableProps>;

// ============================================================================
// Panel Content Component
// ============================================================================

const PanelContent = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => (
  <div className={`ds:flex ds:h-full ds:items-center ds:justify-center ds:p-6 ${className}`}>
    <span className="ds:font-semibold">{title}</span>
  </div>
);

// ============================================================================
// Basic Stories - Wrapper Mode
// ============================================================================

export const Default: Story = {
  args: {
    direction: "horizontal",
    withHandle: true,
    panels: [
      {
        defaultSize: 25,
        minSize: 15,
        children: <PanelContent title="Sidebar" className="ds:bg-muted/50" />,
      },
      {
        defaultSize: 75,
        children: <PanelContent title="Content" className="ds:bg-background" />,
      },
    ],
  },
  render: (args) => (
    <div className="h-[400px] w-[800px] ds:rounded-lg ds:border">
      <Resizable {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
    withHandle: true,
    panels: [
      {
        defaultSize: 30,
        minSize: 20,
        children: <PanelContent title="Header" className="ds:bg-muted/50" />,
      },
      {
        defaultSize: 70,
        children: (
          <PanelContent title="Main Content" className="ds:bg-background" />
        ),
      },
    ],
  },
  render: (args) => (
    <div className="h-[400px] w-[600px] ds:rounded-lg ds:border">
      <Resizable {...args} />
    </div>
  ),
};

export const ThreePanels: Story = {
  args: {
    direction: "horizontal",
    withHandle: true,
    panels: [
      {
        id: "left",
        defaultSize: 20,
        minSize: 10,
        children: <PanelContent title="Left" className="ds:bg-blue-500/20" />,
      },
      {
        id: "center",
        defaultSize: 60,
        minSize: 30,
        children: <PanelContent title="Center" className="ds:bg-green-500/20" />,
      },
      {
        id: "right",
        defaultSize: 20,
        minSize: 10,
        children: <PanelContent title="Right" className="ds:bg-orange-500/20" />,
      },
    ],
  },
  render: (args) => (
    <div className="h-[400px] w-[800px] ds:rounded-lg ds:border">
      <Resizable {...args} />
    </div>
  ),
};

export const WithoutHandle: Story = {
  args: {
    direction: "horizontal",
    withHandle: false,
    panels: [
      {
        defaultSize: 30,
        children: <PanelContent title="Panel A" className="ds:bg-muted/50" />,
      },
      {
        defaultSize: 70,
        children: <PanelContent title="Panel B" className="ds:bg-background" />,
      },
    ],
  },
  render: (args) => (
    <div className="h-[400px] w-[600px] ds:rounded-lg ds:border">
      <Resizable {...args} />
    </div>
  ),
};

// ============================================================================
// Handle Variants
// ============================================================================

export const LineVariant: Story = {
  args: {
    direction: "horizontal",
    handleVariant: "line",
    panels: [
      {
        defaultSize: 30,
        children: <PanelContent title="Panel A" className="ds:bg-muted/50" />,
      },
      {
        defaultSize: 70,
        children: <PanelContent title="Panel B" className="ds:bg-background" />,
      },
    ],
  },
  render: (args) => (
    <div className="h-[400px] w-[600px] ds:rounded-lg ds:border">
      <Resizable {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Line variant: The handle line highlights on hover instead of showing an icon.",
      },
    },
  },
};

export const CustomHandleIcon: Story = {
  args: {
    direction: "horizontal",
    withHandle: true,
    handleIcon: (
      <span className="text-[8px] ds:-rotate-90 ds:h-fit ds:w-fit ds:px-2 ds:py-1 ds:bg-muted ds:hover:bg-primary ds:rounded-xl ds:z-10">
        Custom
      </span>
    ),
    panels: [
      {
        defaultSize: 30,
        children: <PanelContent title="Panel A" className="ds:bg-muted/50" />,
      },
      {
        defaultSize: 70,
        children: <PanelContent title="Panel B" className="ds:bg-background" />,
      },
    ],
  },
  render: (args) => (
    <div className="h-[400px] w-[600px] ds:rounded-lg ds:border">
      <Resizable {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Custom icon for the handle. Pass any React node as `handleIcon`.",
      },
    },
  },
};

// ============================================================================
// AutoSave Layout
// ============================================================================

export const AutoSaveLayout: Story = {
  args: {
    direction: "horizontal",
    withHandle: true,
    autoSaveId: "resizable-demo-layout",
    panels: [
      {
        id: "nav",
        defaultSize: 20,
        minSize: 10,
        children: (
          <div className="ds:flex ds:h-full ds:flex-col ds:bg-muted/50 ds:p-4">
            <h3 className="ds:font-semibold ds:mb-2">Navigation</h3>
            <p className="ds:text-xs ds:text-muted-foreground">
              Layout is saved to localStorage
            </p>
          </div>
        ),
      },
      {
        id: "main",
        defaultSize: 80,
        children: (
          <div className="ds:flex ds:h-full ds:flex-col ds:p-4">
            <h3 className="ds:font-semibold ds:mb-2">Content</h3>
            <p className="ds:text-sm ds:text-muted-foreground">
              Resize the panels and refresh the page - your layout will be
              preserved!
            </p>
          </div>
        ),
      },
    ],
  },
  render: (args) => (
    <div className="h-[400px] w-[800px] ds:rounded-lg ds:border">
      <Resizable {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The panel sizes are saved to `localStorage` using the provided `autoSaveId`. Resize the panels and refresh the page to see your layout preserved.",
      },
    },
  },
};

// ============================================================================
// Primitive Mode (Using Sub-components)
// ============================================================================

export const PrimitiveUsage: Story = {
  render: () => {
    return (
      <div className="h-[400px] w-[800px] ds:rounded-lg ds:border">
        <Resizable direction="horizontal">
          <Resizable.Panel defaultSize={25} minSize={15}>
            <PanelContent title="Panel 1" className="ds:bg-red-500/20" />
          </Resizable.Panel>
          <Resizable.Handle withHandle />
          <Resizable.Panel defaultSize={50}>
            <PanelContent title="Panel 2" className="ds:bg-green-500/20" />
          </Resizable.Panel>
          <Resizable.Handle withHandle />
          <Resizable.Panel defaultSize={25} minSize={15}>
            <PanelContent title="Panel 3" className="ds:bg-blue-500/20" />
          </Resizable.Panel>
        </Resizable>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Using primitive sub-components for more control: `<Resizable><Resizable.Panel /><Resizable.Handle /></Resizable>`",
      },
    },
  },
};

// ============================================================================
// Nested Resizable
// ============================================================================

export const NestedPanels: Story = {
  args: {
    direction: "horizontal",
    withHandle: true,
    panels: [
      {
        defaultSize: 30,
        minSize: 20,
        children: <PanelContent title="Sidebar" className="ds:bg-muted/50" />,
      },
      {
        defaultSize: 70,
        children: (
          <Resizable
            direction="vertical"
            withHandle
            className="ds:h-full"
            panels={[
              {
                defaultSize: 30,
                children: (
                  <PanelContent title="Header" className="ds:bg-blue-500/20" />
                ),
              },
              {
                defaultSize: 70,
                children: (
                  <PanelContent
                    title="Main Content"
                    className="ds:bg-green-500/20"
                  />
                ),
              },
            ]}
          />
        ),
      },
    ],
  },
  render: (args) => (
    <div className="h-[500px] w-[800px] ds:rounded-lg ds:border">
      <Resizable {...args} />
    </div>
  ),
};

// ============================================================================
// IDE Layout
// ============================================================================

export const IDELayout: Story = {
  args: {
    direction: "horizontal",
    panels: [
      {
        id: "activity-bar",
        defaultSize: 5,
        minSize: 3,
        maxSize: 8,
        className: "bg-muted",
        children: (
          <div className="ds:flex ds:h-full ds:flex-col ds:items-center ds:gap-4 ds:p-2 ds:pt-4">
            <div className="ds:w-8 ds:h-8 ds:rounded ds:bg-primary/20" />
            <div className="ds:w-8 ds:h-8 ds:rounded ds:bg-muted-foreground/20" />
            <div className="ds:w-8 ds:h-8 ds:rounded ds:bg-muted-foreground/20" />
            <div className="ds:w-8 ds:h-8 ds:rounded ds:bg-muted-foreground/20" />
          </div>
        ),
      },
      {
        id: "sidebar",
        defaultSize: 20,
        minSize: 15,
        maxSize: 35,
        collapsible: true,
        collapsedSize: 0,
        children: (
          <div className="ds:flex ds:h-full ds:flex-col ds:bg-muted/30">
            <div className="ds:border-b ds:p-3 ds:font-semibold ds:text-sm">Explorer</div>
            <div className="ds:flex-1 ds:p-2">
              <div className="ds:space-y-1">
                <div className="ds:px-2 ds:py-1 ds:text-sm ds:rounded ds:hover:bg-accent cursor-pointer">
                  📁 src
                </div>
                <div className="ds:px-2 ds:py-1 ds:text-sm ds:rounded ds:hover:bg-accent cursor-pointer ds:ml-4">
                  📁 components
                </div>
                <div className="ds:px-2 ds:py-1 ds:text-sm ds:rounded ds:hover:bg-accent cursor-pointer ds:ml-4">
                  📄 index.ts
                </div>
                <div className="ds:px-2 ds:py-1 ds:text-sm ds:rounded ds:hover:bg-accent cursor-pointer">
                  📄 package.json
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "main-content",
        defaultSize: 55,
        children: (
          <Resizable
            direction="vertical"
            withHandle
            panels={[
              {
                id: "editor",
                defaultSize: 70,
                children: (
                  <div className="ds:flex ds:h-full ds:flex-col">
                    <div className="ds:border-b ds:px-4 ds:py-2 ds:bg-muted/20">
                      <span className="ds:text-sm ds:font-medium">Resizable.tsx</span>
                    </div>
                    <div className="ds:flex-1 ds:p-4 ds:font-mono ds:text-sm">
                      <div className="ds:text-muted-foreground">
                        // Your code here
                      </div>
                      <div>
                        <span className="ds:text-blue-500">import</span> React{" "}
                        <span className="ds:text-blue-500">from</span>{" "}
                        <span className="ds:text-green-500">"react"</span>;
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                id: "terminal",
                defaultSize: 30,
                minSize: 15,
                collapsible: true,
                children: (
                  <div className="ds:flex ds:h-full ds:flex-col ds:bg-muted/20">
                    <div className="ds:border-b ds:px-4 ds:py-2">
                      <span className="ds:text-sm ds:font-medium">Terminal</span>
                    </div>
                    <div className="ds:flex-1 ds:p-4 ds:font-mono ds:text-sm ds:text-muted-foreground">
                      <div>$ npm run dev</div>
                      <div className="ds:text-green-500">
                        Server running on :3000
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        ),
      },
      {
        id: "properties",
        defaultSize: 20,
        minSize: 10,
        collapsible: true,
        collapsedSize: 0,
        children: (
          <div className="ds:flex ds:h-full ds:flex-col ds:bg-muted/30">
            <div className="ds:border-b ds:p-3 ds:font-semibold ds:text-sm">Properties</div>
            <div className="ds:flex-1 ds:p-4">
              <p className="ds:text-sm ds:text-muted-foreground">
                Select an element to see its properties
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
  render: (args) => (
    <div className="h-[600px] w-[1000px] ds:rounded-lg ds:border ds:bg-background overflow-hidden">
      <Resizable {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "An IDE-like layout with activity bar, sidebar, editor, terminal, and properties panel.",
      },
    },
  },
};

// ============================================================================
// Imperative Handle
// ============================================================================

interface PanelHandle {
  collapse: () => void;
  expand: () => void;
  resize: (size: number) => void;
  getId: () => string;
  getSize: () => number;
  isCollapsed: () => boolean;
  isExpanded: () => boolean;
}
export const ImperativeControl: Story = {
  render: () => {
    const Component = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const panelRef = useRef<PanelHandle>(null) as any;

      return (
        <div className="ds:space-y-4">
          <div className="ds:flex ds:gap-2">
            <Button size="sm" onClick={() => panelRef.current?.collapse()}>
              Collapse
            </Button>
            <Button size="sm" onClick={() => panelRef.current?.expand()}>
              Expand
            </Button>
            <Button size="sm" onClick={() => panelRef.current?.resize(50)}>
              Resize to 50%
            </Button>
          </div>
          <div className="h-[300px] w-[600px] ds:rounded-lg ds:border">
            <Resizable direction="horizontal">
              <Resizable.Panel
                ref={panelRef}
                defaultSize={30}
                minSize={10}
                collapsible
                collapsedSize={0}
              >
                <PanelContent
                  title="Controlled Panel"
                  className="ds:bg-primary/20"
                />
              </Resizable.Panel>
              <Resizable.Handle withHandle />
              <Resizable.Panel defaultSize={70}>
                <PanelContent title="Content" className="ds:bg-muted/50" />
              </Resizable.Panel>
            </Resizable>
          </div>
        </div>
      );
    };

    return <Component />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use `ref` to programmatically control panels (collapse, expand, resize).",
      },
    },
  },
};

// ============================================================================
// Min/Max Size
// ============================================================================

export const WithMinMaxSize: Story = {
  args: {
    direction: "horizontal",
    withHandle: true,
    panels: [
      {
        defaultSize: 30,
        minSize: 20,
        maxSize: 40,
        children: (
          <div className="ds:flex ds:h-full ds:flex-col ds:bg-amber-500/20 ds:p-4">
            <h3 className="ds:font-semibold ds:mb-2">Constrained Panel</h3>
            <p className="ds:text-xs ds:text-muted-foreground">Min: 20%, Max: 40%</p>
          </div>
        ),
      },
      {
        defaultSize: 70,
        children: (
          <div className="ds:flex ds:h-full ds:flex-col ds:p-4">
            <h3 className="ds:font-semibold ds:mb-2">Flexible Panel</h3>
            <p className="ds:text-sm ds:text-muted-foreground">
              This panel has no min/max constraints.
            </p>
          </div>
        ),
      },
    ],
  },
  render: (args) => (
    <div className="h-[300px] w-[600px] ds:rounded-lg ds:border">
      <Resizable {...args} />
    </div>
  ),
};
