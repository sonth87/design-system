import type { Meta, StoryObj } from "@storybook/react";
import {
  CursorProvider,
  Cursor,
  CursorFollow,
} from "../../components/Interactive/CursorFollow";

const meta: Meta<typeof CursorFollow> = {
  title: "Interactive/CursorFollow",
  component: CursorFollow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
        "left",
        "right",
        "center",
      ],
      description: "Alignment of the follow element relative to the cursor",
    },
    sideOffset: {
      control: { type: "range", min: 0, max: 100, step: 5 },
      description: "Distance offset from the cursor in pixels",
    },
    variant: {
      control: "select",
      options: ["default", "pointer", "text", "crosshair", "grab", "custom"],
      description: "Predefined cursor variant style",
    },
    followText: {
      control: "text",
      description: "Custom text to display in the follow element",
    },
    transition: {
      control: "object",
      description: "Spring transition configuration",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CursorFollow>;

export const Default: Story = {
  args: {
    align: "bottom-right",
    sideOffset: 15,
  },
  render: (args) => (
    <div className="relative h-[400px] w-[600px] flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">Move your cursor here</div>
        <Cursor>
          <div className="h-5 w-5 rounded-full bg-white/30 border-2 border-white" />
        </Cursor>
        <CursorFollow {...args}>
          <div className="px-4 py-2 bg-white rounded-lg shadow-lg text-sm font-medium">
            Follow me!
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

export const WithEmoji: Story = {
  args: {
    align: "bottom-right",
    sideOffset: 20,
  },
  render: (args) => (
    <div className="relative h-[400px] w-[600px] flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">Hover to see emoji cursor</div>
        <Cursor>
          <div className="text-4xl">👆</div>
        </Cursor>
        <CursorFollow {...args}>
          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-purple-900">
            Click me!
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

export const DifferentAlignments: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(
        [
          "top",
          "top-left",
          "top-right",
          "bottom",
          "bottom-left",
          "bottom-right",
          "left",
          "right",
          "center",
        ] as const
      ).map((align) => (
        <div
          key={align}
          className="relative h-[200px] w-[200px] flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg"
        >
          <CursorProvider>
            <div className="text-white text-xs text-center">{align}</div>
            <Cursor>
              <div className="h-4 w-4 rounded-full bg-yellow-400" />
            </Cursor>
            <CursorFollow align={align} sideOffset={10}>
              <div className="px-2 py-1 bg-yellow-400 rounded text-xs font-bold text-blue-900">
                {align}
              </div>
            </CursorFollow>
          </CursorProvider>
        </div>
      ))}
    </div>
  ),
};

export const CustomCursor: Story = {
  args: {
    align: "bottom-right",
    sideOffset: 25,
  },
  render: (args) => (
    <div className="relative h-[500px] w-[700px] flex items-center justify-center bg-gradient-to-br from-emerald-900 to-teal-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-xl">Custom animated cursor</div>
        <Cursor>
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-emerald-400 animate-pulse" />
            <div className="absolute inset-0 h-8 w-8 rounded-full bg-emerald-400/30 animate-ping" />
          </div>
        </Cursor>
        <CursorFollow {...args}>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-xl">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-emerald-900">
              Following...
            </span>
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

export const SlowTransition: Story = {
  args: {
    align: "bottom-right",
    sideOffset: 15,
    transition: { stiffness: 100, damping: 20, bounce: 0 },
  },
  render: (args) => (
    <div className="relative h-[400px] w-[600px] flex items-center justify-center bg-gradient-to-br from-orange-900 to-red-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">Slow, smooth follow effect</div>
        <Cursor>
          <div className="h-6 w-6 rounded-full bg-orange-400 border-2 border-white" />
        </Cursor>
        <CursorFollow {...args}>
          <div className="px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-orange-900">
            Slow follow
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

export const FastTransition: Story = {
  args: {
    align: "bottom-right",
    sideOffset: 15,
    transition: { stiffness: 1000, damping: 80, bounce: 0 },
  },
  render: (args) => (
    <div className="relative h-[400px] w-[600px] flex items-center justify-center bg-gradient-to-br from-cyan-900 to-blue-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">Fast, snappy follow effect</div>
        <Cursor>
          <div className="h-6 w-6 rounded-full bg-cyan-400 border-2 border-white" />
        </Cursor>
        <CursorFollow {...args}>
          <div className="px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-cyan-900">
            Fast follow
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

export const InteractiveCard: Story = {
  args: {
    align: "center",
    sideOffset: 0,
  },
  render: (args) => (
    <div className="relative h-[500px] w-[800px] flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-xl p-8">
      <CursorProvider>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-32 w-32 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white text-2xl font-bold border border-white/20 hover:bg-white/20 transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
        <Cursor>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-50 blur-sm" />
        </Cursor>
        <CursorFollow {...args}>
          <div className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow-2xl text-white font-semibold text-sm">
            ✨ Interactive
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

export const ProductShowcase: Story = {
  args: {
    align: "bottom-right",
    sideOffset: 20,
    transition: { stiffness: 300, damping: 30, bounce: 0.2 },
  },
  render: (args) => (
    <div className="relative h-[600px] w-[900px] flex items-center justify-center bg-black rounded-xl overflow-hidden">
      <CursorProvider>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Product Showcase</h1>
          <p className="text-gray-400">
            Move your cursor to explore our features
          </p>
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div className="p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">
                Feature 1
              </h3>
              <p className="text-gray-300 text-sm">
                Amazing functionality that will blow your mind
              </p>
            </div>
            <div className="p-8 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-xl backdrop-blur-sm border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">
                Feature 2
              </h3>
              <p className="text-gray-300 text-sm">
                Incredible performance and smooth animations
              </p>
            </div>
          </div>
        </div>
        <Cursor>
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-60" />
            <div className="absolute inset-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-30 blur-md" />
          </div>
        </Cursor>
        <CursorFollow {...args}>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl border border-white/20">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-semibold text-white">Explore</span>
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  ),
};

// New Stories showcasing built-in variants
export const BuiltInVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(["default", "pointer", "text", "crosshair", "grab"] as const).map(
        (variant) => (
          <div
            key={variant}
            className="relative h-[250px] w-[300px] flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl"
          >
            <CursorProvider>
              <div className="text-white text-sm capitalize">{variant}</div>
              <Cursor variant={variant} />
              <CursorFollow variant={variant} align="bottom-right" />
            </CursorProvider>
          </div>
        )
      )}
    </div>
  ),
};

export const PointerVariant: Story = {
  args: {
    variant: "pointer",
    align: "bottom-right",
    sideOffset: 15,
  },
  render: (args) => (
    <div className="relative h-[400px] w-[600px] flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">
          Pointer variant with default follow text
        </div>
        <Cursor variant="pointer" />
        <CursorFollow {...args} />
      </CursorProvider>
    </div>
  ),
};

export const TextVariant: Story = {
  args: {
    variant: "text",
    align: "bottom-right",
    sideOffset: 15,
  },
  render: (args) => (
    <div className="relative h-[400px] w-[600px] flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">
          Text cursor variant - hover to see I-beam cursor
        </div>
        <Cursor variant="text" />
        <CursorFollow {...args} />
      </CursorProvider>
    </div>
  ),
};

export const GrabVariant: Story = {
  args: {
    variant: "grab",
    align: "bottom-right",
    sideOffset: 20,
  },
  render: (args) => (
    <div className="relative h-[400px] w-[600px] flex items-center justify-center bg-gradient-to-br from-amber-900 to-orange-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">
          Grab variant - perfect for draggable elements
        </div>
        <Cursor variant="grab" />
        <CursorFollow {...args} />
      </CursorProvider>
    </div>
  ),
};

export const CrosshairVariant: Story = {
  args: {
    variant: "crosshair",
    align: "bottom-right",
    sideOffset: 20,
  },
  render: (args) => (
    <div className="relative h-[400px] w-[600px] flex items-center justify-center bg-gradient-to-br from-red-900 to-pink-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">
          Crosshair variant - ideal for targeting or selection
        </div>
        <Cursor variant="crosshair" />
        <CursorFollow {...args} />
      </CursorProvider>
    </div>
  ),
};

export const WithFollowText: Story = {
  args: {
    variant: "pointer",
    followText: "Click to continue",
    align: "bottom-right",
    sideOffset: 15,
  },
  render: (args) => (
    <div className="relative h-[400px] w-[600px] flex items-center justify-center bg-gradient-to-br from-teal-900 to-cyan-800 rounded-xl">
      <CursorProvider>
        <div className="text-white text-lg">
          Custom follow text with variant
        </div>
        <Cursor variant="pointer" />
        <CursorFollow {...args} />
      </CursorProvider>
    </div>
  ),
};

export const QuickSetup: Story = {
  args: {
    variant: "default",
    followText: "Explore",
    align: "bottom-right",
    sideOffset: 15,
  },
  render: (args) => (
    <div className="relative h-[500px] w-[700px] flex items-center justify-center bg-gradient-to-br from-violet-900 to-fuchsia-800 rounded-xl p-8">
      <CursorProvider>
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold text-white">Quick Setup Demo</h2>
          <p className="text-gray-300">
            No custom styling needed - just use variant and followText props
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {["Option A", "Option B", "Option C"].map((option) => (
              <div
                key={option}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
              >
                <p className="text-white font-semibold">{option}</p>
              </div>
            ))}
          </div>
        </div>
        <Cursor variant={args.variant || "default"} />
        <CursorFollow {...args} />
      </CursorProvider>
    </div>
  ),
};
