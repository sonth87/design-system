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
    <ScrollArea className="ds:h-72 ds:w-48 ds:rounded-md ds:border" {...args}>
      <div className="ds:p-4">
        <h4 className="ds:mb-4 ds:text-sm ds:font-medium ds:leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="ds:snap-start">
            <div className="ds:text-sm">Tag {i + 1}</div>
            {i < 49 && <Separator className="ds:my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

// Horizontal scroll
export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="ds:w-96 ds:whitespace-nowrap ds:rounded-md ds:border">
      <div className="ds:flex ds:w-max ds:space-x-4 ds:p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="ds:shrink-0 ds:rounded-md ds:border ds:w-[200px] ds:h-[200px] ds:flex ds:items-center ds:justify-center"
          >
            <div className="ds:text-sm ds:font-medium">Item {i + 1}</div>
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
    <ScrollArea className="ds:h-[400px] ds:w-[400px] ds:rounded-md ds:border">
      <div className="ds:p-4">
        <h4 className="ds:mb-4 ds:text-sm ds:font-medium ds:leading-none">
          Scroll in both directions
        </h4>
        <div className="ds:flex ds:flex-col ds:space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="ds:flex ds:space-x-4">
              {Array.from({ length: 10 }).map((_, j) => (
                <div
                  key={j}
                  className="ds:shrink-0 ds:rounded-md ds:border ds:w-[120px] ds:h-[120px] ds:flex ds:items-center ds:justify-center"
                >
                  <div className="ds:text-sm">
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
    <ScrollArea className="ds:h-[300px] ds:w-[500px] ds:rounded-md ds:border ds:p-4">
      <div className="ds:space-y-4">
        <h3 className="ds:text-lg ds:font-semibold">Long Article</h3>
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i} className="ds:text-sm ds:text-muted-foreground">
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
    <ScrollArea className="ds:h-72 ds:w-64 ds:rounded-md ds:border ds:bg-linear-to-br ds:from-purple-50 ds:to-pink-50 ds:dark:from-purple-950 ds:dark:to-pink-950">
      <div className="ds:p-4 ds:space-y-3">
        <h4 className="ds:mb-4 ds:text-sm ds:font-bold">Custom Styled</h4>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="ds:rounded-lg ds:bg-white/50 ds:dark:bg-black/20 ds:p-3 ds:text-sm ds:font-medium"
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
    <ScrollArea className="ds:h-48 ds:w-56 ds:rounded-md ds:border">
      <div className="ds:p-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="ds:px-2 ds:py-1.5 ds:text-sm ds:hover:bg-accent ds:hover:text-accent-foreground ds:rounded-sm ds:cursor-pointer"
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
    <ScrollArea className="ds:h-[400px] ds:w-[600px] ds:rounded-md ds:border">
      <div className="ds:grid ds:grid-cols-3 ds:gap-4 ds:p-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="ds:aspect-square ds:rounded-lg ds:bg-linear-to-br ds:from-blue-400 ds:to-purple-500 ds:flex ds:items-center ds:justify-center ds:text-white ds:font-bold ds:text-2xl"
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
    <ScrollArea className="ds:h-[400px] ds:w-[350px] ds:rounded-md ds:border ds:bg-background">
      <div className="ds:p-4 ds:space-y-4">
        {Array.from({ length: 20 }).map((_, i) => {
          const isMe = i % 3 === 0;
          return (
            <div
              key={i}
              className={`ds:flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`ds:max-w-[70%] ds:rounded-lg ds:px-3 ds:py-2 ds:text-sm ${isMe
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted text-muted-foreground"}`}
              >
                <p>
                  {isMe ? "My message " : "Their message "}
                  {i + 1}
                </p>
                <p className="ds:text-xs ds:opacity-70 ds:mt-1">
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
      className="ds:h-[400px] ds:w-64 ds:rounded-md ds:border"
      snapType="y mandatory"
    >
      <div className="ds:p-4">
        <h4 className="ds:mb-4 ds:text-sm ds:font-medium">Snap Scroll (Vertical)</h4>
        <p className="ds:text-xs ds:text-muted-foreground ds:mb-4">
          Each item will snap into place when scrolling
        </p>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="ds:snap-start ds:h-[120px] ds:mb-4 ds:rounded-lg ds:bg-linear-to-br ds:from-blue-100 ds:to-purple-100 ds:dark:from-blue-950 ds:dark:to-purple-950 ds:flex ds:items-center ds:justify-center ds:border"
          >
            <div className="ds:text-center">
              <div className="ds:text-2xl ds:font-bold">Card {i + 1}</div>
              <div className="ds:text-sm ds:text-muted-foreground">Snap to start</div>
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
      className="ds:w-[500px] ds:whitespace-nowrap ds:rounded-md ds:border"
      snapType="x mandatory"
    >
      <div className="ds:flex ds:p-4 ds:gap-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="ds:snap-center ds:shrink-0 ds:w-[300px] ds:h-[200px] ds:rounded-lg ds:bg-linear-to-r ds:from-pink-100 ds:to-orange-100 ds:dark:from-pink-950 ds:dark:to-orange-950 ds:flex ds:items-center ds:justify-center ds:border"
          >
            <div className="ds:text-center">
              <div className="ds:text-3xl ds:font-bold">Slide {i + 1}</div>
              <div className="ds:text-sm ds:text-muted-foreground">
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
      className="ds:h-[400px] ds:w-80 ds:rounded-md ds:border"
      snapType="y proximity"
    >
      <div className="ds:p-4">
        <h4 className="ds:mb-2 ds:text-sm ds:font-medium">Snap Proximity</h4>
        <p className="ds:text-xs ds:text-muted-foreground ds:mb-4">
          Snaps only when close to snap point (softer behavior)
        </p>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="ds:snap-center ds:h-[150px] ds:mb-4 ds:rounded-lg ds:bg-linear-to-br ds:from-green-100 ds:to-teal-100 ds:dark:from-green-950 ds:dark:to-teal-950 ds:flex ds:items-center ds:justify-center ds:border"
          >
            <div className="ds:text-center">
              <div className="ds:text-xl ds:font-bold">Section {i + 1}</div>
              <div className="ds:text-xs ds:text-muted-foreground">
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
    <div className="ds:space-y-4">
      <div className="ds:text-sm ds:text-muted-foreground ds:text-center">
        Swipe to navigate between slides
      </div>
      <ScrollArea
        className="ds:w-[600px] ds:whitespace-nowrap ds:rounded-md ds:border ds:overflow-hidden"
        snapType="x mandatory"
      >
        <div className="ds:flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="ds:snap-start ds:shrink-0 ds:w-full ds:h-[300px] ds:flex ds:items-center ds:justify-center"
              style={{
                background: `linear-gradient(135deg, hsl(${i * 36}, 70%, 60%), hsl(${i * 36 + 60}, 70%, 50%))`,
              }}
            >
              <div className="ds:text-white ds:text-center">
                <div className="ds:text-5xl ds:font-bold ds:mb-2">{i + 1}</div>
                <div className="ds:text-xl">Slide {i + 1} of 10</div>
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
      <div className="ds:p-4">
        <h4 className="ds:mb-2 ds:text-sm ds:font-medium">Interactive Snap Demo</h4>
        <p className="ds:text-xs ds:text-muted-foreground ds:mb-4">
          Use the controls below to change snap behavior
        </p>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="ds:snap-center ds:h-[150px] ds:mb-4 ds:rounded-lg ds:bg-linear-to-br ds:from-indigo-100 ds:to-cyan-100 ds:dark:from-indigo-950 ds:dark:to-cyan-950 ds:flex ds:items-center ds:justify-center ds:border"
          >
            <div className="ds:text-center">
              <div className="ds:text-2xl ds:font-bold">Item {i + 1}</div>
              <div className="ds:text-xs ds:text-muted-foreground ds:mt-1">
                Snap align: center
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
