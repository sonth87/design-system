import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Sheet, { SheetClose, type SheetProps } from "../components/Sheet/Sheet";
import Button from "../components/Button/Button";
import {
  BookTextIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  CircleSmallIcon,
  HeartPlusIcon,
  HomeIcon,
  LayoutPanelTopIcon,
  LogInIcon,
  LogOutIcon,
  MailIcon,
  MessageSquareTextIcon,
  PanelTopIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Collapsible, {
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/Collapsible/Collapsible";

const meta: Meta<typeof Sheet> = {
  title: "Overlays/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "The side from which the sheet slides in",
      table: {
        defaultValue: { summary: "right" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "The size of the sheet",
      table: {
        defaultValue: { summary: "md" },
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
      description: "Animation effect for the sheet",
    },
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
    closeOnEsc: {
      control: "boolean",
      description: "Close sheet on Escape key press",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    closeOnOutside: {
      control: "boolean",
      description: "Close sheet when clicking outside",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    showCloseButton: {
      control: "boolean",
      description: "Show the close button",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    autoDrawerOnMobile: {
      control: "boolean",
      description: "Automatically use Drawer on mobile devices",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    autoHeight: {
      control: "boolean",
      description:
        "Use automatic height for drawer on mobile (up to 80vh), or fixed height based on size",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    stickyHeader: {
      control: "boolean",
      description: "Keep header outside scroll area (header won't scroll)",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    stickyFooter: {
      control: "boolean",
      description: "Keep footer outside scroll area (footer won't scroll)",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    title: {
      control: "text",
      description: "Sheet title",
    },
    description: {
      control: "text",
      description: "Sheet description",
    },
    className: { control: "text", description: "Additional CSS classes" },
    contentClassName: {
      control: "text",
      description: "CSS classes for content area",
    },
    headerClassName: { control: "text", description: "CSS classes for header" },
    titleClassName: { control: "text", description: "CSS classes for title" },
    descriptionClassName: {
      control: "text",
      description: "CSS classes for description",
    },
    footerClassName: { control: "text", description: "CSS classes for footer" },
    overlayClassName: {
      control: "text",
      description: "CSS classes for overlay",
    },
  },
  args: {
    side: "right",
    size: "md",
    closeOnEsc: true,
    closeOnOutside: true,
    showCloseButton: true,
    stickyHeader: false,
    stickyFooter: false,
    autoHeight: true,
    title: "Sheet Title",
    description: "This is a default sheet with a simple message.",
  },
};

export default meta;
type Story = StoryObj<SheetProps>;

// Default sheet with trigger button
export const Default: Story = {
  render: function RenderDefault(args) {
    const [open, setOpen] = useState(false);
    return (
      <Sheet
        {...args}
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Open Sheet</Button>}
        footer={
          <div className="flex gap-2 justify-end w-full">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            📖 Introduction
          </h2>
          <p className="text-sm text-muted-foreground">
            🏠 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-sm text-muted-foreground">
            💬 Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p className="text-sm text-muted-foreground">
            📅 Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <p className="text-sm text-muted-foreground">
            ❤️ Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
            aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit.
          </p>
          <p className="text-sm text-muted-foreground">
            ✉️ At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi.
          </p>
          <p className="text-sm text-muted-foreground">
            🛒 Et harum quidem rerum facilis est et expedita distinctio. Nam
            libero tempore, cum soluta nobis est eligendi optio cumque nihil
            impedit quo minus id quod maxime placeat facere possimus, omnis
            voluptas assumenda est, omnis dolor repellendus.
          </p>
          <p className="text-sm text-muted-foreground">
            📋 Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe eveniet ut et voluptates repudiandae sint et
            molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
            delectus, ut aut reiciendis voluptatibus maiores alias consequatur
            aut perferendis doloribus asperiores repellat.
          </p>
          <p className="text-sm text-muted-foreground">
            📄 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p className="text-sm text-muted-foreground">
            🔐 Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </Sheet>
    );
  },
};

export const Standalone: Story = {
  render: function RenderStandalone(args) {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Sheet</Button>

        <Sheet
          {...args}
          open={open}
          onOpenChange={setOpen}
          title="Sheet Title"
          description="This is a sheet opened via standalone control."
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
            The sheet's open state is controlled separately from the trigger
            button.
          </p>
        </Sheet>
      </div>
    );
  },
};

// Different sides
export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Sheet
        side="right"
        trigger={<Button>Right (Default)</Button>}
        title="Right Sheet"
        description="Sheet slides in from the right side."
      >
        <div className="py-4">
          <p className="text-sm">Content from the right side.</p>
        </div>
      </Sheet>

      <Sheet
        side="left"
        trigger={<Button>Left</Button>}
        title="Left Sheet"
        description="Sheet slides in from the left side."
      >
        <div className="py-4">
          <p className="text-sm">Content from the left side.</p>
        </div>
      </Sheet>

      <Sheet
        side="top"
        trigger={<Button>Top</Button>}
        title="Top Sheet"
        description="Sheet slides in from the top."
      >
        <div className="py-4">
          <p className="text-sm">Content from the top.</p>
        </div>
      </Sheet>

      <Sheet
        side="bottom"
        trigger={<Button>Bottom</Button>}
        title="Bottom Sheet"
        description="Sheet slides in from the bottom."
      >
        <div className="py-4">
          <p className="text-sm">Content from the bottom.</p>
        </div>
      </Sheet>
    </div>
  ),
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Sheet
        size="sm"
        trigger={<Button size="sm">Small</Button>}
        title="Small Sheet"
        description="This is a small sheet."
      >
        <div className="py-4">
          <p className="text-sm">Small sheet content.</p>
        </div>
      </Sheet>

      <Sheet
        size="md"
        trigger={<Button>Medium</Button>}
        title="Medium Sheet"
        description="This is a medium sheet (default)."
      >
        <div className="py-4">
          <p className="text-sm">Medium sheet content.</p>
        </div>
      </Sheet>

      <Sheet
        size="lg"
        trigger={<Button>Large</Button>}
        title="Large Sheet"
        description="This is a large sheet."
      >
        <div className="py-4">
          <p className="text-sm">Large sheet content with more space.</p>
        </div>
      </Sheet>

      <Sheet
        size="xl"
        trigger={<Button>Extra Large</Button>}
        title="Extra Large Sheet"
        description="This is an extra large sheet."
      >
        <div className="py-4">
          <p className="text-sm">
            Extra large sheet content with even more space.
          </p>
        </div>
      </Sheet>

      <Sheet
        size="full"
        trigger={<Button>Full Size</Button>}
        title="Full Size Sheet"
        description="This sheet takes up the full size."
      >
        <div className="py-4">
          <p className="text-sm">
            Full size sheet content. Great for complex forms or detailed
            information.
          </p>
        </div>
      </Sheet>
    </div>
  ),
};

// Scrollable content
export const ScrollableContent: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Sheet
        stickyHeader
        stickyFooter
        trigger={<Button>Sticky Header & Footer</Button>}
        title="Scrollable Sheet"
        description="Header and footer are outside scroll area, only content scrolls."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
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
      </Sheet>

      <Sheet
        stickyHeader
        trigger={<Button>Sticky Header Only</Button>}
        title="Sticky Header Sheet"
        description="Header is outside scroll area, content and footer scroll together."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
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
      </Sheet>

      <Sheet
        stickyFooter
        trigger={<Button>Sticky Footer Only</Button>}
        title="Sticky Footer Sheet"
        description="Footer is outside scroll area, header and content scroll together."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
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
      </Sheet>

      <Sheet
        trigger={<Button>Scroll Everything</Button>}
        title="Full Scroll Sheet"
        description="Everything scrolls together - header, content, and footer."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button>Save</Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="p-4 border rounded">
              <h3 className="font-semibold">Section {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Everything scrolls together in this sheet.
              </p>
            </div>
          ))}
        </div>
      </Sheet>
    </div>
  ),
};

// Behavior options
export const BehaviorOptions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Sheet
        closeOnEsc={false}
        trigger={<Button>No ESC Close</Button>}
        title="ESC Key Disabled"
        description="Press ESC - nothing happens. Use the button to close."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <SheetClose asChild>
              <Button>Close</Button>
            </SheetClose>
          </div>
        }
      >
        <div className="py-4">
          <p className="text-sm">
            This sheet cannot be closed with the ESC key.
          </p>
        </div>
      </Sheet>

      <Sheet
        closeOnOutside={false}
        trigger={<Button>No Outside Close</Button>}
        title="Outside Click Disabled"
        description="Click outside - nothing happens. Use the button to close."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <SheetClose asChild>
              <Button>Close</Button>
            </SheetClose>
          </div>
        }
      >
        <div className="py-4">
          <p className="text-sm">
            This sheet cannot be closed by clicking outside.
          </p>
        </div>
      </Sheet>

      <Sheet
        showCloseButton={false}
        trigger={<Button>No Close Button</Button>}
        title="No Close Button"
        description="The X button is hidden. Use the footer button to close."
        footer={
          <div className="flex gap-2 justify-end w-full">
            <SheetClose asChild>
              <Button>Close</Button>
            </SheetClose>
          </div>
        }
      >
        <div className="py-4">
          <p className="text-sm">
            This sheet has no close button in the corner.
          </p>
        </div>
      </Sheet>
    </div>
  ),
};

// Custom styling
export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Sheet
        trigger={<Button>Custom Header</Button>}
        title="Custom Styled Header"
        description="This sheet has custom styling."
        headerClassName="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white"
        titleClassName="text-xl font-bold"
        descriptionClassName="text-white/90"
      >
        <div>
          <p className="text-sm">Sheet with custom header styling.</p>
          <p className="text-xs text-muted-foreground mt-2">
            Notice the gradient header background.
          </p>
        </div>
      </Sheet>

      <Sheet
        trigger={<Button>Custom Footer</Button>}
        title="Custom Styled Footer"
        description="This sheet has a custom footer style."
        footerClassName="!bg-gray-100 dark:!bg-gray-800"
        footer={
          <div className="flex gap-2 justify-between w-full">
            <Button variant="ghost">Help</Button>
            <div className="flex gap-2">
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button>Submit</Button>
            </div>
          </div>
        }
      >
        <div>
          <p className="text-sm">Sheet with custom footer styling.</p>
        </div>
      </Sheet>

      <Sheet
        trigger={<Button>Gradient Background</Button>}
        title="Fully Customized"
        description="Every part of this sheet is customized."
        contentClassName="!bg-gradient-to-b !from-sky-100 !to-white dark:!from-sky-900 dark:!to-card"
        headerClassName="!bg-transparent"
        titleClassName="text-2xl font-bold"
        descriptionClassName="text-base"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button className="bg-sky-500 hover:bg-sky-600">Confirm</Button>
          </div>
        }
      >
        <div className="space-y-2">
          <p className="text-sm font-semibold">Every element is customized:</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>Custom background gradient</li>
            <li>Custom header styling</li>
            <li>Custom title and description styles</li>
            <li>Custom footer with styled buttons</li>
          </ul>
        </div>
      </Sheet>
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
      <Sheet
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
      </Sheet>
    );
  },
};

// Navigation menu example
export const NavigationMenu: Story = {
  render: function RenderNavigationMenu() {
    const [open, setOpen] = useState(false);

    const navigationMenu = [
      {
        name: "Dashboard",
        icon: HomeIcon,
        type: "page",
      },
      {
        name: "Layouts",
        icon: LayoutPanelTopIcon,
        type: "category",
        children: [
          {
            name: "Content Navbar",
            icon: LayoutPanelTopIcon,
            type: "page",
          },
          {
            name: "Horizontal",
            icon: LayoutPanelTopIcon,
            type: "page",
          },
          {
            name: "Without Menu",
            icon: LayoutPanelTopIcon,
            type: "page",
          },
        ],
      },
      {
        name: "Front Pages",
        icon: PanelTopIcon,
        type: "category",
        children: [
          {
            name: "Landing Page",
            icon: PanelTopIcon,
            type: "page",
          },
          {
            name: "Pricing Page",
            icon: PanelTopIcon,
            type: "page",
          },
          {
            name: "Checkout Page",
            icon: PanelTopIcon,
            type: "page",
          },
        ],
      },
      {
        name: "Chat",
        icon: MessageSquareTextIcon,
        type: "page",
      },
      {
        name: "Email",
        icon: MailIcon,
        type: "page",
      },
      {
        name: "Calendar",
        icon: CalendarDaysIcon,
        type: "page",
      },
      {
        name: "Ecommerce",
        icon: ShoppingCartIcon,
        type: "category",
        children: [
          {
            name: "Products",
            icon: ShoppingCartIcon,
            type: "page",
          },
          {
            name: "Categories",
            icon: ShoppingCartIcon,
            type: "page",
          },
          {
            name: "Shopping & Delivery",
            icon: ShoppingCartIcon,
            type: "page",
          },
          {
            name: "Location",
            icon: ShoppingCartIcon,
            type: "page",
          },
        ],
      },
      {
        name: "Sign In",
        icon: LogInIcon,
        type: "page",
      },
      {
        name: "Sign Out",
        icon: LogOutIcon,
        type: "page",
      },
      {
        name: "Support",
        icon: HeartPlusIcon,
        type: "page",
      },
      {
        name: "Documentation",
        icon: BookTextIcon,
        type: "page",
      },
    ];

    const NavigationMenu = ({ item, level }: { level: number; item: any }) => {
      if (item.type === "page") {
        return (
          <div
            className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]"
            style={{ paddingLeft: `${level === 0 ? 0.25 : 1.75}rem` }}
          >
            {level === 0 ? (
              <item.icon className="size-4 shrink-0" />
            ) : (
              <CircleSmallIcon className="size-4 shrink-0" />
            )}
            <span className="text-sm">{item.name}</span>
          </div>
        );
      }

      return (
        <Collapsible
          className="flex flex-col gap-1.5"
          style={{ paddingLeft: `${level === 0 ? 0 : 1.5}rem` }}
          variant="ghost"
        >
          <CollapsibleTrigger className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]">
            {level === 0 ? (
              <item.icon className="size-4 shrink-0" />
            ) : (
              <CircleSmallIcon className="size-4 shrink-0" />
            )}
            <span className="flex-1 text-start text-sm">{item.name}</span>
            <ChevronRightIcon className='size-4 shrink-0 transition-transform [[data-state="open"]>&]:rotate-90' />
          </CollapsibleTrigger>
          <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down flex flex-col gap-1.5 overflow-hidden transition-all duration-300">
            {item.children.map((item: any) => (
              <NavigationMenu key={item.name} item={item} level={level + 1} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    };

    return (
      <Sheet
        open={open}
        onOpenChange={setOpen}
        trigger={<Button>Open Menu</Button>}
        side="left"
        size="sm"
        title="Navigation"
        description="Main menu"
      >
        <nav className="space-y-1">
          {navigationMenu.map((item) => (
            <NavigationMenu key={item.name} item={item} level={0} />
          ))}
        </nav>
      </Sheet>
    );
  },
};

// Controlled sheet
export const ControlledSheet: Story = {
  render: function RenderControlledSheet() {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Sheet</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close Sheet
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Sheet is {open ? "open" : "closed"}
        </p>
        <Sheet
          open={open}
          onOpenChange={setOpen}
          title="Controlled Sheet"
          description="This sheet's open state is controlled externally."
          footer={
            <div className="flex gap-2 justify-end w-full">
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          }
        >
          <div className="py-4">
            <p className="text-sm">
              The buttons above control whether this sheet is open or closed.
            </p>
          </div>
        </Sheet>
      </div>
    );
  },
};

// Multiple sheets
export const MultipleSheets: Story = {
  render: function RenderMultipleSheets() {
    const [sheet1Open, setSheet1Open] = useState(false);
    const [sheet2Open, setSheet2Open] = useState(false);

    return (
      <div className="space-y-4">
        <Sheet
          open={sheet1Open}
          onOpenChange={setSheet1Open}
          trigger={<Button>Open First Sheet</Button>}
          side="left"
          title="First Sheet"
          description="This is the first sheet."
        >
          <div className="py-4">
            <p className="text-sm mb-4">
              You can open another sheet from here:
            </p>
            <Button onClick={() => setSheet2Open(true)}>
              Open Second Sheet
            </Button>
          </div>
        </Sheet>

        <Sheet
          open={sheet2Open}
          onOpenChange={setSheet2Open}
          side="right"
          title="Second Sheet"
          description="This is the second sheet."
        >
          <div className="py-4">
            <p className="text-sm">
              This sheet was opened from the first sheet!
            </p>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const Customize: Story = {
  render: function RenderCustomOverlay() {
    return (
      <div className="flex flex-wrap gap-4">
        <Sheet
          trigger={<Button>Custom Overlay</Button>}
          title="Custom Overlay Sheet"
          description="This sheet uses a custom overlay style."
          overlayClassName="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-80"
        >
          <div className="py-4">
            <p className="text-sm">
              The overlay behind this sheet has a vibrant gradient background.
            </p>
          </div>
        </Sheet>

        <Sheet
          trigger={<Button>Blur Background</Button>}
          title="Custom Overlay Sheet"
          description="This sheet uses a custom overlay style."
          overlayClassName="backdrop-blur-sm"
        >
          <div className="py-4">
            <p className="text-sm">
              The overlay behind this sheet has a vibrant gradient background.
            </p>
          </div>
        </Sheet>

        <Sheet
          trigger={<Button>Custom Background</Button>}
          title="Custom Overlay Sheet"
          description="This sheet uses a custom overlay style."
          className="to-card bg-gradient-to-b from-green-100 to-40% [background-size:100%_101%] sm:max-w-sm dark:from-green-900"
        >
          <div className="py-4">
            <p className="text-sm">
              The overlay behind this sheet has a vibrant gradient background.
            </p>
          </div>
        </Sheet>
      </div>
    );
  },
};
