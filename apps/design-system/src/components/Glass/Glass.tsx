import { cn } from "@dsui/ui/index";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const glassVariants = cva(
  "ds:inline-flex ds:items-center ds:justify-center ds:gap-2 ds:whitespace-nowrap ds:text-sm ds:font-medium ds:transition-all ds:disabled:pointer-events-none ds:disabled:opacity-50 ds:[&_svg]:pointer-events-none ds:[&_svg:not([class*='size-'])]:size-4 ds:shrink-0 ds:[&_svg]:shrink-0 ds:outline-none ds:focus-visible:border-ring ds:focus-visible:ring-ring/50 ds:focus-visible:ring-[3px] ds:aria-invalid:ring-destructive/20 ds:dark:aria-invalid:ring-destructive/40 ds:aria-invalid:border-destructive",
  {
    variants: {},
    defaultVariants: {},
  }
);

export type GlassProps = {
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof glassVariants>;

const Glass: React.FC<GlassProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "ds:relative ds:inline-flex ds:overflow-hidden ds:cursor-pointer ds:shadow-[0_6px_6px_rgba(0,0,0,0.2),0_0_20px_rgba(0,0,0,0.1)] ds:transition-all ds:duration-400 ds:ease-[cubic-bezier(0.175,0.885,0.32,2.2)] ds:p-0 ds:rounded-md",
        className
      )}
    >
      <div className="ds:absolute ds:z-0 ds:inset-0 ds:backdrop-blur-[2.5px] ds:overflow-hidden ds:isolate ds:[filter:url(#glass-distortion)] ds:rounded-[inherit]"></div>
      <div className="ds:z-1 ds:absolute ds:inset-0 ds:bg-white/25 ds:rounded-[inherit]"></div>
      <div className="ds:absolute ds:inset-0 ds:z-2 ds:overflow-hidden ds:shadow-[inset_2px_2px_1px_0_rgba(255,255,255,0.5),inset_-1px_-1px_1px_1px_rgba(255,255,255,0.5)] ds:rounded-[inherit]"></div>
      <div className="ds:z-3 ds:relative">
        <div className="ds:text-foreground ds:[text-shadow:0px_1px_3px_rgba(255, ds:255, ds:255, ds:0.3)] ds:transition-all ds:duration-100 ds:ease-in ds:inline-flex ds:gap-2">
          {children}
        </div>
      </div>
      <svg className="ds:hidden">
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
