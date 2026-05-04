import type { Meta, StoryObj } from "@storybook/react";
import { ThreeDMarquee } from "../../components/Interactive/3DMarquee";
import i18n from "../../../.storybook/i18n";

const meta: Meta<typeof ThreeDMarquee> = {
  title: "Interactive/3DMarquee",
  component: ThreeDMarquee,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    images: {
      control: false,
      description: i18n.t("stories.3dmarquee.argTypes.images.description"),
      table: {
        category: "Content",
      },
    },
    className: {
      control: "text",
      description: i18n.t("stories.3dmarquee.argTypes.className.description"),
      table: {
        category: "Styling",
      },
    },

    // Rotation Props
    rotateX: {
      control: { type: "range", min: -180, max: 180, step: 1 },
      description: i18n.t("stories.3dmarquee.argTypes.rotateX.description"),
      table: {
        defaultValue: { summary: "55" },
        category: "Transform",
      },
    },
    rotateY: {
      control: { type: "range", min: -180, max: 180, step: 1 },
      description: i18n.t("stories.3dmarquee.argTypes.rotateY.description"),
      table: {
        defaultValue: { summary: "0" },
        category: "Transform",
      },
    },
    rotateZ: {
      control: { type: "range", min: -180, max: 180, step: 1 },
      description: i18n.t("stories.3dmarquee.argTypes.rotateZ.description"),
      table: {
        defaultValue: { summary: "-45" },
        category: "Transform",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThreeDMarquee>;

// Sample images for demonstration
const sampleImages = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  "https://assets.aceternity.com/signup-form.png",
  "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  "https://assets.aceternity.com/tabs.png",
  "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  "https://assets.aceternity.com/glowing-effect.webp",
  "https://assets.aceternity.com/hover-border-gradient.png",
  "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  "https://assets.aceternity.com/macbook-scroll.png",
  "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  "https://assets.aceternity.com/multi-step-loader.png",
  "https://assets.aceternity.com/vortex.png",
  "https://assets.aceternity.com/wobble-card.png",
  "https://assets.aceternity.com/world-map.webp",
];

export const Default: Story = {
  args: {
    images: sampleImages,
    rotateX: 55,
    rotateY: 0,
    rotateZ: -45,
  },
  render: (args) => (
    <div className="h-[300px] overflow-hidden ds:rounded-2xl ds:mx-auto">
      <ThreeDMarquee {...args} />
    </div>
  ),
};

export const HeroDemo: Story = {
  args: {
    images: sampleImages,
    rotateX: 55,
    rotateY: 0,
    rotateZ: -45,
  },
  render: (args) => (
    <div className="ds:relative ds:mx-auto ds:my-10 ds:flex ds:h-screen ds:w-full ds:max-w-7xl ds:flex-col ds:items-center ds:justify-center overflow-hidden ds:rounded-3xl">
      <h2 className="ds:relative ds:z-20 ds:mx-auto ds:max-w-4xl ds:text-center ds:text-2xl ds:font-bold ds:text-balance ds:text-white ds:md:text-4xl ds:lg:text-6xl">
        This is your life and it&apos;s ending one{" "}
        <span className="ds:relative ds:z-20 ds:inline-block ds:rounded-xl ds:bg-blue-500/40 ds:px-4 ds:py-1 ds:text-white underline ds:decoration-sky-500 decoration-[6px] underline-offset-[16px] ds:backdrop-blur-sm">
          moment
        </span>{" "}
        at a time.
      </h2>
      <p className="ds:relative ds:z-20 ds:mx-auto ds:max-w-2xl ds:py-8 ds:text-center ds:text-sm ds:text-neutral-200 ds:md:text-base">
        You are not your job, you&apos;re not how much money you have in the
        bank. You are not the car you drive. You&apos;re not the contents of
        your wallet.
      </p>
      <div className="ds:relative ds:z-20 ds:flex ds:flex-wrap ds:items-center ds:justify-center ds:gap-4 ds:pt-4">
        <button className="ds:rounded-md ds:bg-sky-600 ds:px-6 ds:py-2.5 ds:text-sm ds:font-medium ds:text-white ds:transition-colors ds:hover:bg-sky-700 ds:focus:ring-2 ds:focus:ring-sky-500 ds:focus:ring-offset-2 ds:focus:ring-offset-black ds:focus:outline-none">
          Join the club
        </button>
        <button className="ds:rounded-md ds:border ds:border-white/20 ds:bg-white/10 ds:px-6 ds:py-2.5 ds:text-sm ds:font-medium ds:text-white ds:backdrop-blur-sm ds:transition-colors ds:hover:bg-white/20 ds:focus:ring-2 ds:focus:ring-white/20 ds:focus:ring-offset-2 ds:focus:ring-offset-black ds:focus:outline-none">
          Read more
        </button>
      </div>
      {/* overlay */}
      <div className="ds:absolute ds:inset-0 ds:z-10 ds:h-full ds:w-full ds:bg-black/80 ds:dark:bg-black/40" />
      <ThreeDMarquee
        className="ds:pointer-events-none ds:absolute ds:inset-0 ds:h-full ds:w-full"
        {...args}
      />
    </div>
  ),
};
