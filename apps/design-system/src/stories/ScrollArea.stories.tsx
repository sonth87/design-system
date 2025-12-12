import type { Meta, StoryObj } from "@storybook/react";
import ScrollArea, {
  ScrollBar,
  type ScrollAreaProps,
} from "../components/ScrollArea/ScrollArea";
import Separator from "../components/Separator/Separator";
import i18n from "../../.storybook/i18n";

const meta: Meta<typeof ScrollArea> = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: i18n.t("stories.scrollarea.argTypes.className.description"),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.layout"),
      },
    },
    viewportClassName: {
      control: "text",
      description: i18n.t(
        "stories.scrollarea.argTypes.viewportClassName.description"
      ),
      table: {
        type: { summary: "string" },
        category: i18n.t("stories.category.layout"),
      },
    },
    snapType: {
      control: "select",
      options: [
        "none",
        "x",
        "y",
        "both",
        "x mandatory",
        "y mandatory",
        "both mandatory",
        "x proximity",
        "y proximity",
        "both proximity",
      ],
      description: i18n.t("stories.scrollarea.argTypes.snapType.description"),
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
        category: i18n.t("stories.category.scroll"),
      },
    },
  },
};

export default meta;
type Story = StoryObj<ScrollAreaProps>;

// Default vertical scroll
export const Default: Story = {
  render: (args: ScrollAreaProps) => (
    <ScrollArea className="h-72 w-48 rounded-md border" {...args}>
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="snap-start">
            <div className="text-sm">Tag {i + 1}</div>
            {i < 49 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Horizontal scroll
export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="shrink-0 rounded-md border w-[200px] h-[200px] flex items-center justify-center"
          >
            <div className="text-sm font-medium">Item {i + 1}</div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

// Both directions
export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[400px] rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">
          Scroll in both directions
        </h4>
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              {Array.from({ length: 10 }).map((_, j) => (
                <div
                  key={j}
                  className="shrink-0 rounded-md border w-[120px] h-[120px] flex items-center justify-center"
                >
                  <div className="text-sm">
                    {i + 1},{j + 1}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  ),
};

// Long text content
export const LongTextContent: Story = {
  render: () => (
    <ScrollArea className="h-[300px] w-[500px] rounded-md border p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Long Article</h3>
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i} className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Custom styled scrollbar
export const CustomStyled: Story = {
  render: () => (
    <ScrollArea className="h-72 w-64 rounded-md border bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
      <div className="p-4 space-y-3">
        <h4 className="mb-4 text-sm font-bold">Custom Styled</h4>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-white/50 dark:bg-black/20 p-3 text-sm font-medium"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Compact list
export const CompactList: Story = {
  render: () => (
    <ScrollArea className="h-48 w-56 rounded-md border">
      <div className="p-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer"
          >
            Option {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Image gallery
export const ImageGallery: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[600px] rounded-md border">
      <div className="grid grid-cols-3 gap-4 p-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Chat messages
export const ChatMessages: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[350px] rounded-md border bg-background">
      <div className="p-4 space-y-4">
        {Array.from({ length: 20 }).map((_, i) => {
          const isMe = i % 3 === 0;
          return (
            <div
              key={i}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                  isMe
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p>
                  {isMe ? "My message " : "Their message "}
                  {i + 1}
                </p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  ),
};

// Vertical snap scroll (mandatory)
export const SnapVertical: Story = {
  render: () => (
    <ScrollArea
      className="h-[400px] w-64 rounded-md border"
      snapType="y mandatory"
    >
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Snap Scroll (Vertical)</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Each item will snap into place when scrolling
        </p>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="snap-start h-[120px] mb-4 rounded-lg bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 flex items-center justify-center border"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">Card {i + 1}</div>
              <div className="text-sm text-muted-foreground">Snap to start</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Horizontal snap scroll
export const SnapHorizontal: Story = {
  render: () => (
    <ScrollArea
      className="w-[500px] whitespace-nowrap rounded-md border"
      snapType="x mandatory"
    >
      <div className="flex p-4 gap-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-[300px] h-[200px] rounded-lg bg-linear-to-r from-pink-100 to-orange-100 dark:from-pink-950 dark:to-orange-950 flex items-center justify-center border"
          >
            <div className="text-center">
              <div className="text-3xl font-bold">Slide {i + 1}</div>
              <div className="text-sm text-muted-foreground">
                Snap to center
              </div>
            </div>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

// Snap with proximity (softer snap)
export const SnapProximity: Story = {
  render: () => (
    <ScrollArea
      className="h-[400px] w-80 rounded-md border"
      snapType="y proximity"
    >
      <div className="p-4">
        <h4 className="mb-2 text-sm font-medium">Snap Proximity</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Snaps only when close to snap point (softer behavior)
        </p>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="snap-center h-[150px] mb-4 rounded-lg bg-linear-to-br from-green-100 to-teal-100 dark:from-green-950 dark:to-teal-950 flex items-center justify-center border"
          >
            <div className="text-center">
              <div className="text-xl font-bold">Section {i + 1}</div>
              <div className="text-xs text-muted-foreground">
                Proximity snap to center
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Carousel-like with snap
export const SnapCarousel: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground text-center">
        Swipe to navigate between slides
      </div>
      <ScrollArea
        className="w-[600px] whitespace-nowrap rounded-md border overflow-hidden"
        snapType="x mandatory"
      >
        <div className="flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-full h-[300px] flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, hsl(${i * 36}, 70%, 60%), hsl(${i * 36 + 60}, 70%, 50%))`,
              }}
            >
              <div className="text-white text-center">
                <div className="text-5xl font-bold mb-2">{i + 1}</div>
                <div className="text-xl">Slide {i + 1} of 10</div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ),
};

// Interactive snap demo with controls
export const InteractiveSnapDemo: Story = {
  args: {
    snapType: "y mandatory",
    className: "h-[400px] w-80 rounded-md border",
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        <h4 className="mb-2 text-sm font-medium">Interactive Snap Demo</h4>
        <p className="text-xs text-muted-foreground mb-4">
          Use the controls below to change snap behavior
        </p>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="snap-center h-[150px] mb-4 rounded-lg bg-linear-to-br from-indigo-100 to-cyan-100 dark:from-indigo-950 dark:to-cyan-950 flex items-center justify-center border"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">Item {i + 1}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Snap align: center
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
