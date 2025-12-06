import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Dialog, { type DialogProps } from "../components/Dialog/Dialog";
import Button from "../components/Button/Button";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof Dialog> = {
  title: "Overlays/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["dialog", "confirm", "alert", "info", "warning"],
      description: i18n.t("stories.dialog.argTypes.variant.description"),
      table: {
        defaultValue: { summary: "dialog" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"],
      description: i18n.t("stories.dialog.argTypes.size.description"),
      table: {
        defaultValue: { summary: "md" },
        category: i18n.t("stories.category.appearance"),
      },
    },
    position: {
      control: "select",
      options: [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
      description: i18n.t("stories.dialog.argTypes.position.description"),
      table: {
        defaultValue: { summary: "center" },
        category: i18n.t("stories.category.layout"),
      },
    },
    animation: {
      control: "select",
      options: [
        "",
        "bounce",
        "slide-up",
        "slide-down",
        "slide-left",
        "slide-right",
        "zoom-in",
        "zoom-out",
        "skewed",
        "shake",
        "flip",
        "glow",
        "spec",
      ],
      description: i18n.t("stories.dialog.argTypes.animation.description"),
      table: {
        category: i18n.t("stories.category.ui"),
      },
    },
    open: {
      control: "boolean",
      description: i18n.t("stories.dialog.argTypes.open.description"),
      table: {
        category: i18n.t("stories.category.behavior"),
      },
    },
    closeOnEsc: {
      control: "boolean",
      description: i18n.t("stories.dialog.argTypes.closeOnEsc.description"),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    closeOnOutside: {
      control: "boolean",
      description: i18n.t("stories.dialog.argTypes.closeOnOutside.description"),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.behavior"),
      },
    },
    showCloseButton: {
      control: "boolean",
      description: i18n.t(
        "stories.dialog.argTypes.showCloseButton.description"
      ),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.ui"),
      },
    },
    fullscreen: {
      control: "boolean",
      description: i18n.t("stories.dialog.argTypes.fullscreen.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.layout"),
      },
    },
    scrollable: {
      control: "boolean",
      description: i18n.t("stories.dialog.argTypes.scrollable.description"),
      table: {
        defaultValue: { summary: "true" },
        category: i18n.t("stories.category.scroll"),
      },
    },
    stickyHeader: {
      control: "boolean",
      description: i18n.t("stories.dialog.argTypes.stickyHeader.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.scroll"),
      },
    },
    stickyFooter: {
      control: "boolean",
      description: i18n.t("stories.dialog.argTypes.stickyFooter.description"),
      table: {
        defaultValue: { summary: "false" },
        category: i18n.t("stories.category.scroll"),
      },
    },
    title: {
      control: "text",
      description: i18n.t("stories.dialog.argTypes.title.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    description: {
      control: "text",
      description: i18n.t("stories.dialog.argTypes.description.description"),
      table: {
        category: i18n.t("stories.category.content"),
      },
    },
    confirmText: {
      control: "text",
      description: i18n.t("stories.dialog.argTypes.confirmText.description"),
      table: {
        defaultValue: { summary: "Confirm" },
        category: i18n.t("stories.category.content"),
      },
    },
    cancelText: {
      control: "text",
      description: i18n.t("stories.dialog.argTypes.cancelText.description"),
      table: {
        defaultValue: { summary: "Cancel" },
        category: i18n.t("stories.category.content"),
      },
    },
  },
  args: {
    variant: "dialog",
    size: "md",
    position: "center",
    closeOnEsc: true,
    closeOnOutside: true,
    showCloseButton: true,
    fullscreen: false,
    scrollable: true,
    stickyHeader: false,
    stickyFooter: false,
  },
};

export default meta;
type Story = StoryObj<DialogProps>;

/**
 * Default dialog with trigger button.
 *
 */
export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Open Dialog</Button>}
        title="Dialog Title"
        description="This is a default dialog with a simple message."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)} color="primary">
              Save Changes
            </Button>
          </div>
        }
      >
        <p className="text-sm text-muted-foreground">
          You can place any content here. The dialog will automatically handle
          the layout and styling.
        </p>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const [open, setOpen] = useState(false);
return (
  <Dialog
    {...args}
    open={open}
    onOpenChange={setOpen}
    trigger={<Button>Open Dialog</Button>}
    title="Dialog Title"
    description="This is a default dialog with a simple message."
    footer={
      <div className="flex gap-2 justify-end w-full">
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => setOpen(false)} color="primary">Save Changes</Button>
      </div>
    }
  >
    <p className="text-sm text-muted-foreground">
      You can place any content here. The dialog will automatically handle
      the layout and styling.
    </p>
  </Dialog>
);
        `,
      },
    },
  },
};

export const Standalone: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>

        <Dialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          title="Dialog Title"
          description="This is a default dialog with a simple message."
          footer={
            <div className="flex gap-2 justify-end w-full">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save Changes</Button>
            </div>
          }
        >
          <p className="text-sm text-muted-foreground">
            You can place any content here. The dialog will automatically handle
            the layout and styling.
          </p>
        </Dialog>
      </div>
    );
  },
};

export const Alert: Story = {
  render: function RenderAlert(args) {
    const [openAlert, setOpenAlert] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);

    return (
      <div className="flex gap-2">
        <Dialog
          variant="confirm"
          open={openConfirm}
          onOpenChange={setOpenConfirm}
          trigger={
            <Button variant="solid" color="secondary">
              Confirm
            </Button>
          }
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          onConfirm={() => {
            console.log("Confirmed");
            setOpenConfirm(false);
          }}
          cancelText="Cancel"
          onCancel={() => {
            console.log("Cancelled");
            setOpenConfirm(false);
          }}
        />

        <Dialog
          {...args}
          variant="alert"
          open={openAlert}
          onOpenChange={setOpenAlert}
          trigger={
            <Button variant="solid" color="destructive">
              Alert
            </Button>
          }
          title="Alert"
          description="This is an important alert message that requires your attention."
          onConfirm={() => {
            console.log("Alert acknowledged");
            setOpenAlert(false);
          }}
          confirmText="Acknowledge"
        />

        <Dialog
          variant="info"
          open={openInfo}
          onOpenChange={setOpenInfo}
          trigger={
            <Button variant="solid" color="success">
              Info without Icon
            </Button>
          }
          title="Information"
          description="Here's some useful information you should know."
          onConfirm={() => {
            console.log("Info acknowledged");
            setOpenInfo(false);
          }}
          confirmText="Got it"
          showIcon={false}
        />

        <Dialog
          variant="warning"
          open={openWarning}
          onOpenChange={setOpenWarning}
          trigger={
            <Button variant="solid" color="warning">
              Warning with Custom Icon
            </Button>
          }
          title={<div>⚠️ Custom Warning Icon</div>}
          description="Please be careful. This action may have consequences. Double check before proceeding."
          onConfirm={() => {
            console.log("Warning acknowledged");
            setOpenWarning(false);
          }}
          onCancel={() => setOpenWarning(false)}
          showIcon={false}
        />
      </div>
    );
  },
};

// Different variants
export const Variants: Story = {
  render: function RenderVariants() {
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);

    return (
      <div className="flex flex-wrap gap-4">
        <Dialog
          variant="dialog"
          open={openDialog}
          onOpenChange={setOpenDialog}
          trigger={<Button>Dialog</Button>}
          title="Standard Dialog"
          description="This is a standard dialog for general purposes."
          footer={
            <div className="flex gap-2 justify-end w-full">
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Close
              </Button>
            </div>
          }
        >
          <div className="py-4">
            <p className="text-sm">Standard dialog content goes here.</p>
          </div>
        </Dialog>

        <Dialog
          variant="confirm"
          open={openConfirm}
          onOpenChange={setOpenConfirm}
          trigger={
            <Button variant="solid" color="secondary">
              Confirm
            </Button>
          }
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          onConfirm={() => {
            console.log("Confirmed");
            setOpenConfirm(false);
          }}
          cancelText="Cancel"
          onCancel={() => {
            console.log("Cancelled");
            setOpenConfirm(false);
          }}
        />

        <Dialog
          variant="alert"
          open={openAlert}
          onOpenChange={setOpenAlert}
          trigger={
            <Button variant="solid" color="destructive">
              Alert
            </Button>
          }
          title="Alert"
          description="This is an important alert message that requires your attention."
          onConfirm={() => {
            console.log("Alert acknowledged");
            setOpenAlert(false);
          }}
          confirmText="Acknowledge"
        />

        <Dialog
          variant="info"
          open={openInfo}
          onOpenChange={setOpenInfo}
          trigger={
            <Button variant="solid" color="success">
              Info
            </Button>
          }
          title="Information"
          description="Here's some useful information you should know."
          onConfirm={() => {
            console.log("Info acknowledged");
            setOpenInfo(false);
          }}
          confirmText="Got it"
        />

        <Dialog
          variant="warning"
          open={openWarning}
          onOpenChange={setOpenWarning}
          trigger={
            <Button variant="solid" color="warning">
              Warning
            </Button>
          }
          title="Warning"
          description="Please be careful. This action may have consequences."
          onConfirm={() => {
            console.log("Warning acknowledged");
            setOpenWarning(false);
          }}
          onCancel={() => setOpenWarning(false)}
        />
      </div>
    );
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Dialog
        size="sm"
        trigger={<Button size="sm">Small</Button>}
        title="Small Dialog"
        description="This is a small dialog."
      >
        <div className="py-4">
          <p className="text-sm">Small dialog content.</p>
        </div>
      </Dialog>

      <Dialog
        size="md"
        trigger={<Button>Medium</Button>}
        title="Medium Dialog"
        description="This is a medium dialog."
      >
        <div className="py-4">
          <p className="text-sm">Medium dialog content.</p>
        </div>
      </Dialog>

      <Dialog
        size="lg"
        trigger={<Button>Large</Button>}
        title="Large Dialog"
        description="This is a large dialog."
      >
        <div className="py-4">
          <p className="text-sm">Large dialog content with more space.</p>
        </div>
      </Dialog>

      <Dialog
        size="xl"
        trigger={<Button>Extra Large</Button>}
        title="Extra Large Dialog"
        description="This is an extra large dialog."
      >
        <div className="py-4">
          <p className="text-sm">
            Extra large dialog content with even more space.
          </p>
        </div>
      </Dialog>

      <Dialog
        fullscreen
        trigger={<Button>Fullscreen</Button>}
        title="Fullscreen Dialog"
        description="This dialog takes up most of the screen."
      >
        <div className="py-4">
          <p className="text-sm">
            Fullscreen dialog content. This is great for complex forms or
            detailed information.
          </p>
        </div>
      </Dialog>
    </div>
  ),
};

// Different positions
export const Positions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Dialog
        position="center"
        trigger={<Button>Center</Button>}
        title="Centered Dialog"
        description="This dialog appears in the center of the screen."
      >
        <div className="py-4">
          <p className="text-sm">Center position (default).</p>
        </div>
      </Dialog>

      <Dialog
        position="top"
        trigger={<Button>Top</Button>}
        title="Top Dialog"
        description="This dialog appears at the top."
      >
        <div className="py-4">
          <p className="text-sm">Top position.</p>
        </div>
      </Dialog>

      <Dialog
        position="bottom"
        trigger={<Button>Bottom</Button>}
        title="Bottom Dialog"
        description="This dialog appears at the bottom."
      >
        <div className="py-4">
          <p className="text-sm">Bottom position.</p>
        </div>
      </Dialog>

      <Dialog
        position="left"
        trigger={<Button>Left</Button>}
        title="Left Dialog"
        description="This dialog appears on the left side."
      >
        <div className="py-4">
          <p className="text-sm">Left position.</p>
        </div>
      </Dialog>

      <Dialog
        position="right"
        trigger={<Button>Right</Button>}
        title="Right Dialog"
        description="This dialog appears on the right side."
      >
        <div className="py-4">
          <p className="text-sm">Right position.</p>
        </div>
      </Dialog>

      <Dialog
        position="top-left"
        trigger={<Button>Top-Left</Button>}
        title="Top-Left Dialog"
        description="This dialog appears in the top-left corner."
      >
        <div className="py-4">
          <p className="text-sm">Top-left corner.</p>
        </div>
      </Dialog>

      <Dialog
        position="top-right"
        trigger={<Button>Top-Right</Button>}
        title="Top-Right Dialog"
        description="This dialog appears in the top-right corner."
      >
        <div className="py-4">
          <p className="text-sm">Top-right corner.</p>
        </div>
      </Dialog>

      <Dialog
        position="bottom-left"
        trigger={<Button>Bottom-Left</Button>}
        title="Bottom-Left Dialog"
        description="This dialog appears in the bottom-left corner."
      >
        <div className="py-4">
          <p className="text-sm">Bottom-left corner.</p>
        </div>
      </Dialog>

      <Dialog
        position="bottom-right"
        trigger={<Button>Bottom-Right</Button>}
        title="Bottom-Right Dialog"
        description="This dialog appears in the bottom-right corner."
      >
        <div className="py-4">
          <p className="text-sm">Bottom-right corner.</p>
        </div>
      </Dialog>
    </div>
  ),
};

// Animations
export const Animations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Dialog
        animation="bounce"
        trigger={<Button>Bounce</Button>}
        title="Bounce Animation"
        description="Dialog with bounce animation."
      >
        <div className="py-4">
          <p className="text-sm">Content with bounce animation.</p>
        </div>
      </Dialog>

      <Dialog
        animation="slide-up"
        trigger={<Button>Slide Up</Button>}
        title="Slide Up Animation"
        description="Dialog slides up from bottom."
      >
        <div className="py-4">
          <p className="text-sm">Content slides up.</p>
        </div>
      </Dialog>

      <Dialog
        animation="slide-down"
        trigger={<Button>Slide Down</Button>}
        title="Slide Down Animation"
        description="Dialog slides down from top."
      >
        <div className="py-4">
          <p className="text-sm">Content slides down.</p>
        </div>
      </Dialog>

      <Dialog
        animation="zoom-in"
        trigger={<Button>Zoom In</Button>}
        title="Zoom In Animation"
        description="Dialog zooms in."
      >
        <div className="py-4">
          <p className="text-sm">Content zooms in.</p>
        </div>
      </Dialog>

      <Dialog
        animation="flip"
        trigger={<Button>Flip</Button>}
        title="Flip Animation"
        description="Dialog flips in."
      >
        <div className="py-4">
          <p className="text-sm">Content flips in.</p>
        </div>
      </Dialog>

      <Dialog
        animation="glow"
        trigger={<Button>Glow</Button>}
        title="Glow Animation"
        description="Dialog with glow effect."
      >
        <div className="py-4">
          <p className="text-sm">Content with glow effect.</p>
        </div>
      </Dialog>
    </div>
  ),
};

// Scrollable content
export const ScrollableContent: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Dialog
        stickyHeader
        stickyFooter
        trigger={<Button>Sticky Header & Footer</Button>}
        title="Scrollable Dialog"
        description="Header and footer are outside scroll area, only content scrolls."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="p-4 border rounded">
              <h3 className="font-semibold">Section {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                This is a scrollable section. The header and footer remain
                visible as you scroll through the content.
              </p>
            </div>
          ))}
        </div>
      </Dialog>

      <Dialog
        stickyHeader
        trigger={<Button>Sticky Header Only</Button>}
        title="Sticky Header Dialog"
        description="Header is outside scroll area, content and footer scroll together."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="p-4 border rounded">
              <h3 className="font-semibold">Section {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Content and footer scroll together.
              </p>
            </div>
          ))}
        </div>
      </Dialog>

      <Dialog
        stickyFooter
        trigger={<Button>Sticky Footer Only</Button>}
        title="Sticky Footer Dialog"
        description="Footer is outside scroll area, header and content scroll together."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="p-4 border rounded">
              <h3 className="font-semibold">Section {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Header and content scroll together.
              </p>
            </div>
          ))}
        </div>
      </Dialog>

      <Dialog
        trigger={<Button>Scroll Everything</Button>}
        title="Full Scroll Dialog"
        description="Everything scrolls together - header, content, and footer."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="p-4 border rounded">
              <h3 className="font-semibold">Section {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Everything scrolls together in this dialog.
              </p>
            </div>
          ))}
        </div>
      </Dialog>
    </div>
  ),
};

// Behavior options
export const BehaviorOptions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Dialog
        closeOnEsc={false}
        trigger={<Button>No ESC Close</Button>}
        title="ESC Key Disabled"
        description="Press ESC - nothing happens. Use the button to close."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button>Close</Button>
          </div>
        }
      >
        <div className="py-4">
          <p className="text-sm">
            This dialog cannot be closed with the ESC key.
          </p>
        </div>
      </Dialog>

      <Dialog
        closeOnOutside={false}
        trigger={<Button>No Outside Close</Button>}
        title="Outside Click Disabled"
        description="Click outside - nothing happens. Use the button to close."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button>Close</Button>
          </div>
        }
      >
        <div className="py-4">
          <p className="text-sm">
            This dialog cannot be closed by clicking outside.
          </p>
        </div>
      </Dialog>

      <Dialog
        showCloseButton={false}
        trigger={<Button>No Close Button</Button>}
        title="No Close Button"
        description="The X button is hidden. Use the footer button to close."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button>Close</Button>
          </div>
        }
      >
        <div className="py-4">
          <p className="text-sm">
            This dialog has no close button in the corner.
          </p>
        </div>
      </Dialog>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Dialog
        trigger={<Button>Custom Header</Button>}
        title="Custom Styled Header"
        description="This dialog has custom styling."
        headerClassName="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white rounded-t-md"
        titleClassName="text-xl font-bold"
        descriptionClassName="text-white/90"
        contentClassName="!border-2 !border-purple-500 overflow-hidden rounded-b-md"
      >
        <div>
          <p className="text-sm">
            Dialog with custom header styling that extends to edges.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Notice how the header background extends to the full width without
            padding gaps.
          </p>
        </div>
      </Dialog>

      <Dialog
        trigger={<Button>Custom Footer</Button>}
        title="Custom Styled Footer"
        description="This dialog has a custom footer style."
        footerClassName="!bg-gray-100 dark:!bg-gray-800"
        footer={
          <div className="flex gap-2 justify-between w-full">
            <Button variant="ghost">Help</Button>
            <div className="flex gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </div>
          </div>
        }
      >
        <div>
          <p className="text-sm">
            Dialog with custom footer styling that extends to edges.
          </p>
        </div>
      </Dialog>

      <Dialog
        trigger={<Button>Gradient Background</Button>}
        title="Fully Customized"
        description="Every part of this dialog is customized."
        className="to-card bg-linear-to-b from-sky-100 to-40% bg-size-[100%_101%] sm:max-w-sm dark:from-sky-900"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-500"
            >
              Cancel
            </Button>
            <Button className="bg-white text-blue-500 hover:bg-blue-100">
              Confirm
            </Button>
          </div>
        }
      >
        <div className="space-y-2">
          <p className="text-sm font-semibold">Every element is customized:</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Custom border color</li>
            <li>Custom header background (full width)</li>
            <li>Custom title and description styles</li>
            <li>Custom content background</li>
            <li>Custom footer with styled buttons (full width)</li>
          </ul>
        </div>
      </Dialog>
    </div>
  ),
};

// Complex form example
export const ComplexForm: Story = {
  render: function RenderComplexForm() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });

    const handleSubmit = () => {
      console.log("Form submitted:", formData);
      setOpen(false);
    };

    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Open Form</Button>}
        title="Contact Form"
        description="Fill out the form below to get in touch with us."
        size="lg"
        stickyFooter
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        }
      >
        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-3 py-2 border rounded-md"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Your message..."
            />
          </div>
        </div>
      </Dialog>
    );
  },
};

// Controlled dialog
export const ControlledDialog: Story = {
  render: function RenderControlledDialog() {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Dialog</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close Dialog
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Dialog is {open ? "open" : "closed"}
        </p>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Controlled Dialog"
          description="This dialog's open state is controlled externally."
          footer={
            <div className="flex gap-2 justify-end w-full">
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          }
        >
          <div className="py-4">
            <p className="text-sm">
              The buttons above control whether this dialog is open or closed.
            </p>
          </div>
        </Dialog>
      </div>
    );
  },
};
