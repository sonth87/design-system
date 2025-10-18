import { cn } from "@dsui/ui/index";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const glassVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type GlassProps = {
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof glassVariants>;

const Glass: React.FC<GlassProps> = ({ size, className, children }) => {
  return (
    <div
      className={cn(
        glassVariants({ size, className }),
        "relative inline-flex overflow-hidden cursor-pointer shadow-[0_6px_6px_rgba(0,0,0,0.2),0_0_20px_rgba(0,0,0,0.1)] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,2.2)] rounded-md"
      )}
    >
      <div className="absolute z-0 inset-0 backdrop-blur-[2.5px] overflow-hidden isolate [filter:url(#glass-distortion)] rounded-md"></div>
      <div className="z-[1] absolute inset-0 bg-white/25 rounded-md"></div>
      <div className="absolute inset-0 z-[2] overflow-hidden shadow-[inset_2px_2px_1px_0_rgba(255,255,255,0.5),inset_-1px_-1px_1px_1px_rgba(255,255,255,0.5)] rounded-md"></div>
      <div className="z-[3] rounded-md relative">
        <div className="text-white transition-all duration-100 ease-in hover:backdrop-blur-[2px]">
          {children}
        </div>
      </div>
      <svg className="hidden">
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            seed="5"
            result="turbulence"
          />

          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lighting-color="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>

          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale="120"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
};

export default Glass;
