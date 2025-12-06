import {
  BlurText,
  CircularText,
  FlipWords,
  GradientText,
  RollingText,
  RotatingText,
  ShimmeringText,
  SplittingText,
  TextGenerateEffect,
  TextHoverEffect,
  TextPressure,
  TypingText,
  WritingText,
  type RotatingTextProps,
} from "@/lib/TextAnimation";
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

export const Splitting = () => (
  <SplittingText
    className="text-4xl font-bold"
    text="Splitting Text"
    type="chars"
  />
);

export const TextGenerate = () => (
  <TextGenerateEffect
    className="text-4xl font-bold"
    words="Text Generate Effect"
  />
);

export const TextHover = () => (
  <div className="text-4xl font-bold">
    <span className="mr-2">Hover</span>
    <TextHoverEffect text="SKYLINE" />
  </div>
);

export const TextPressureEffect = () => (
  <div className="w-full h-56 flex items-center justify-center">
    <TextPressure
      text="Skyline"
      flex={true}
      alpha={false}
      stroke={false}
      width={false}
      weight={true}
      italic={false}
      textColor="currentColor"
      minFontSize={56}
      className="text-foreground"
    />
  </div>
);

export const Typing = () => (
  <div className="text-4xl font-bold">
    <span className="mr-2">I am a</span>
    <TypingText
      text={[
        "Developer.",
        "Designer.",
        "Creator.",
        "Innovator.",
        "Problem Solver.",
      ]}
      typingSpeed={75}
      pauseDuration={1500}
      showCursor={true}
      className="text-4xl font-bold text-center max-w-2xl"
      cursorClassName="h-12"
      textColors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]}
      variableSpeed={{ min: 50, max: 120 }}
    />
  </div>
);

export const WritingTextEffect = () => (
  <div className="text-4xl font-bold">
    <WritingText
      className="text-4xl"
      text="Welcome to Writing Text Effect"
      spacing={9}
    />
  </div>
);
