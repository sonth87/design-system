import {
  BlurText,
  CircularText,
  FlipWords,
  GradientText,
  RollingText,
  RotatingText,
  ShimmeringText,
  type RotatingTextProps,
} from "@/utils/TextAnimation";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Animation/TextAnimations",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

export const Rotating = () => (
  <RotatingText className="text-4xl" text={["Rotating", "Text", "Demo"]} />
);

export const Blur = () => (
  <BlurText
    text="Beautiful components that make React development a joy!"
    delay={150}
    animateBy="words"
    direction="top"
    className="text-4xl font-bold text-center max-w-4xl"
  />
);

export const Circular = () => (
  <CircularText
    text="SHADCN/UI • COMPONENTS • "
    onHover="speedUp"
    spinDuration={15}
    className="text-primary tracking-widest"
  />
);

export const Flip = () => (
  <div className="text-4xl font-normal text-center max-w-2xl">
    Build{" "}
    <FlipWords
      words={["better", "faster", "modern", "beautiful"]}
      duration={2500}
      className="text-blue-500 font-semibold"
    />{" "}
    websites with shadcn/ui
  </div>
);

export const Gradient = () => (
  <GradientText className="text-4xl font-bold" text="Gradient Text" />
);

export const Rolling = () => (
  <RollingText className="text-4xl font-bold" text="Rolling Text" />
);

export const Shimmering = () => (
  <ShimmeringText className="text-4xl font-bold" text="Shimmering Text" wave />
);
