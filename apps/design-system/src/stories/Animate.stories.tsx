import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Bone, Copy, Check } from "lucide-react";

const meta: Meta = {
  title: "Animation/Showcase",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

const animationGroups = {
  Basic: [
    { name: "Bounce", class: "animate-bounce" },
    { name: "Spin", class: "animate-spin" },
    { name: "Ping", class: "animate-ping" },
    { name: "Pulse", class: "animate-pulse" },
    { name: "Heartbeat", class: "animate-heartbeat" },
    { name: "Glow", class: "animate-glow" },
    { name: "Wiggle", class: "animate-wiggle" },
    { name: "Tada", class: "animate-tada" },
    { name: "Jello", class: "animate-jello" },
    { name: "Rubber Band", class: "animate-rubber-band" },
    { name: "Swing", class: "animate-swing" },
    { name: "Wobble", class: "animate-wobble" },
    { name: "Shake", class: "animate-shake" },
    { name: "Flash", class: "animate-flash" },
  ],
  Fade: [
    { name: "Fade In", class: "animate-in fade-in" },
    { name: "Fade Out", class: "animate-out fade-out" },
  ],
  Rotate: [
    { name: "Rotate In", class: "animate-in spin-in" },
    { name: "Rotate Out", class: "animate-out spin-out" },
  ],
  Bounce: [
    { name: "Bounce In Down", class: "animate-bounce-in-down" },
    { name: "Bounce In Left", class: "animate-bounce-in-left" },
    { name: "Bounce In Right", class: "animate-bounce-in-right" },
    { name: "Bounce In Up", class: "animate-bounce-in-up" },
    { name: "Bounce Out Down", class: "animate-bounce-out-down" },
    { name: "Bounce Out Left", class: "animate-bounce-out-left" },
    { name: "Bounce Out Right", class: "animate-bounce-out-right" },
    { name: "Bounce Out Up", class: "animate-bounce-out-up" },
  ],
  Flip: [
    { name: "Flip", class: "animate-flip" },
    { name: "Flip In X", class: "animate-flip-in-x" },
    { name: "Flip In Y", class: "animate-flip-in-y" },
    { name: "Flip Out", class: "animate-flip-out" },
    { name: "Flip Out X", class: "animate-flip-out-x" },
    { name: "Flip Out Y", class: "animate-flip-out-y" },
  ],
  "Light Speed": [
    { name: "Light Speed In", class: "animate-light-speed-in" },
    { name: "Light Speed Out", class: "animate-light-speed-out" },
  ],
  Slide: [
    { name: "Slide In From Bottom", class: "animate-in slide-in-from-bottom" },
    { name: "Slide In From Top", class: "animate-in slide-in-from-top" },
    { name: "Slide In From Left", class: "animate-in slide-in-from-left" },
    { name: "Slide In From Right", class: "animate-in slide-in-from-right" },
    { name: "Slide Out To Bottom", class: "animate-out slide-out-to-bottom" },
    { name: "Slide Out To Top", class: "animate-out slide-out-to-top" },
    { name: "Slide Out To Left", class: "animate-out slide-out-to-left" },
    { name: "Slide Out To Right", class: "animate-out slide-out-to-right" },
  ],
  Zoom: [
    { name: "Zoom In", class: "animate-in zoom-in" },
    { name: "Zoom Out", class: "animate-out zoom-out" },
  ],
};

export const Showcase: Story = {
  render: () => {
    const AnimationItem = ({
      anim,
    }: {
      anim: { name: string; class: string };
    }) => {
      const [isHovered, setIsHovered] = useState(false);
      const [copied, setCopied] = useState(false);

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(anim.class);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      };

      return (
        <div
          className="ds:border ds:rounded-lg ds:p-4 ds:space-y-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h3 className="ds:font-semibold">{anim.name}</h3>
          <div className="ds:flex ds:items-center ds:space-x-2">
            <code className="ds:text-sm ds:bg-gray-100 ds:px-2 ds:py-1 ds:rounded ds:flex-1">
              {anim.class}
            </code>
            <button
              onClick={handleCopy}
              className="ds:p-1 ds:hover:bg-gray-200 ds:rounded ds:transition-colors"
              title="Copy class"
            >
              {copied ? (
                <Check className="ds:w-4 ds:h-4 ds:text-green-600" />
              ) : (
                <Copy className="ds:w-4 ds:h-4" />
              )}
            </button>
          </div>
          <div
            className={`ds:w-full ds:h-16 ds:bg-gray-200 ds:rounded ds:flex ds:items-center ds:justify-center ds:text-sm ds:font-medium ${isHovered ? anim.class : ""}`}
          >
            {anim.name}
          </div>
        </div>
      );
    };

    return (
      <div className="ds:p-8 ds:space-y-8">
        <h1 className="ds:text-2xl ds:font-bold">Animation Showcase</h1>
        {Object.entries(animationGroups).map(([groupName, anims]) => (
          <div key={groupName} className="ds:space-y-4">
            <h2 className="ds:text-xl ds:font-semibold">{groupName}</h2>
            <div className="ds:grid ds:grid-cols-1 ds:md:grid-cols-2 ds:lg:grid-cols-3 ds:gap-6">
              {anims.map((anim) => (
                <AnimationItem key={anim.name} anim={anim} />
              ))}
            </div>
          </div>
        ))}
        <div className="ds:border ds:rounded-lg ds:p-4 ds:space-y-2">
          <h3 className="ds:font-semibold">Draw Animation (Hover)</h3>
          <p className="ds:text-sm ds:text-gray-600">
            Hover over the SVG to see the draw animation
            <div className="ds:flex ds:items-center ds:space-x-2 ds:w-fit">
              <code className="ds:text-sm ds:bg-gray-100 ds:px-2 ds:py-1 ds:rounded ds:flex-1 ds:w-fit">
                animate-draw
              </code>
            </div>
          </p>
          <div className="ds:animate-draw ds:size-32">
            <Bone className="ds:size-32" />
          </div>
        </div>
      </div>
    );
  },
};
