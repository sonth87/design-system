import type { Meta } from "@storybook/react";

import Button, { type ButtonProps } from "./Button";
import { ArrowLeft, ArrowRight, BottleWine, ShoppingBag } from "lucide-react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<ButtonProps> = {
  title: "Base/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "mix", "light", "outline", "ghost", "link"],
      description: "The visual style variant of the button",
      table: {
        defaultValue: { summary: "solid" },
      },
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "xl",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
        "icon-xl",
        "circle-icon",
        "circle-icon-xs",
        "circle-icon-sm",
        "circle-icon-lg",
        "circle-icon-xl",
      ],
      description: "The size of the button",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "accent",
        "destructive",
        "muted",
        "success",
        "error",
        "warning",
      ],
      description: "The color theme of the button",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Show loading state",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    animation: {
      control: "select",
      options: [
        " ",
        "heartbeat",
        "rainbow",
        "shine",
        "bounce",
        "tap",
        "glass",
        "glow",
        "liquid",
        "link-underline",
        "loading",
        "draw",
      ],
      description: "Animation effect for the button",
    },
    className: { control: "text", description: "Additional CSS classes" },
    asChild: {
      control: "boolean",
      description: "Render as a child component",
    },
    onClick: { action: "clicked" },
    children: { control: "text", description: "Button label text" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClick: undefined,
    children: "Button",
    variant: "solid",
    color: "primary",
    size: "normal",
  },
};

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = (args: ButtonProps) => (
  <Button {...args}>
    <BottleWine className="animate-draw" /> {args.children}
  </Button>
);

export const Variants = (args: ButtonProps) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-row gap-4">
      <Button {...args}>{args.children}</Button>
      <Button {...args} variant="mix">
        {args.children}
      </Button>
      <Button {...args} variant="outline">
        {args.children}
      </Button>
      <Button {...args} variant="light">
        {args.children}
      </Button>
      <Button {...args} variant="ghost">
        {args.children}
      </Button>
      <Button {...args} variant="link">
        {args.children}
      </Button>
    </div>
    <div className="flex flex-row gap-4">
      <Button {...args}>{args.children}</Button>
      <Button {...args} variant="mix" color="secondary">
        {args.children}
      </Button>
      <Button {...args} variant="outline" color="secondary">
        {args.children}
      </Button>
      <Button {...args} variant="light" color="secondary">
        {args.children}
      </Button>
      <Button {...args} variant="ghost" color="secondary">
        {args.children}
      </Button>
      <Button {...args} variant="link" color="secondary">
        {args.children}
      </Button>
    </div>
  </div>
);

export const WithIcon = (args: ButtonProps) => (
  <div className="flex flex-row gap-4">
    <Button {...args}>
      <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
      {args.children}
      <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
    </Button>

    <Button className="animate-draw">
      <ShoppingBag />
    </Button>

    <Button className="animate-draw rounded-full size-9">
      <BottleWine className="animate-draw" />
    </Button>

    <Button className="animate-draw rounded-full size-9 stroke-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          className="svg-path"
          d="M2.75012 3.24989L4.83012 3.60989L5.79312 15.0829C5.87012 16.0199 6.65312 16.7389 7.59312 16.7359H18.5021C19.3991 16.7379 20.1601 16.0779 20.2871 15.1899L21.2361 8.63189C21.3421 7.89889 20.8331 7.21889 20.1011 7.11289C20.0371 7.10389 5.16412 7.09889 5.16412 7.09889"
          stroke="stroke-current"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          className="svg-path"
          d="M14.1251 10.7948H16.8981"
          stroke="stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="svg-path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.15441 20.2025C7.45541 20.2025 7.69841 20.4465 7.69841 20.7465C7.69841 21.0475 7.45541 21.2915 7.15441 21.2915C6.85341 21.2915 6.61041 21.0475 6.61041 20.7465C6.61041 20.4465 6.85341 20.2025 7.15441 20.2025Z"
          fill="fill-current"
          stroke="stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="svg-path"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.4347 20.2025C18.7357 20.2025 18.9797 20.4465 18.9797 20.7465C18.9797 21.0475 18.7357 21.2915 18.4347 21.2915C18.1337 21.2915 17.8907 21.0475 17.8907 20.7465C17.8907 20.4465 18.1337 20.2025 18.4347 20.2025Z"
          fill="fill-current"
          stroke="stroke-current"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  </div>
);

export const GlassEffect = (args: ButtonProps) => (
  <div
    className="w-200 h-60 p-4 flex items-center justify-center bg-cover [animation:move-background_400s_linear_infinite]"
    style={{
      backgroundImage:
        "url('https://raw.githubusercontent.com/lucasromerodb/liquid-glass-effect-macos/refs/heads/main/assets/flowers.jpg')",
    }}
  >
    <Button {...args} animation="glass" size="lg">
      {args.children}
    </Button>
  </div>
);
