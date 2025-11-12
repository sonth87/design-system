import type { Meta, StoryObj } from "@storybook/react";
import Glass from "../components/Glass/Glass";

const meta: Meta<typeof Glass> = {
  title: "Layout/Glass",
  component: Glass,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // size: {
    //   control: "select",
    //   options: ["sm", "default", "lg"],
    // },
  },
} satisfies Meta<typeof Glass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Glass Effect",
    // size: "default",
  },
};

export const GlassButton: Story = {
  args: {
    children: <button className="px-4 py-2">Click Me</button>,
    // size: "default",
  },
  parameters: {
    docs: {
      description: {
        story: "Glass effect applied to a button element.",
      },
    },
  },
};

export const GlassInput: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Glass className="h-60 w-120">
        <div className="p-4 w-full h-full text-foreground">
          Đây là 1 container
        </div>
      </Glass>
      <Glass>
        <input
          type="email"
          placeholder="Enter your email..."
          className="px-6 py-2 bg-transparent border-none outline-none text-white placeholder:text-white/70"
        />
      </Glass>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Glass effect applied to input elements with different sizes.",
      },
    },
  },
};

export const GlassDiv: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Glass>
        <div className="p-4 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-2">Card Title</h3>
          <p className="text-sm">This is a glass card with some content.</p>
        </div>
      </Glass>
      <Glass>
        <div className="p-6 min-w-[250px]">
          <h3 className="text-xl font-bold mb-2">Large Card</h3>
          <p className="text-sm mb-2">
            A larger glass effect container with more content.
          </p>
          <p className="text-xs opacity-80">Additional information here.</p>
        </div>
      </Glass>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Glass effect applied to div containers as card-like elements.",
      },
    },
  },
};
