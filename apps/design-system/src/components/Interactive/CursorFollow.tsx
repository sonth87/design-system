"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type HTMLMotionProps,
  type SpringOptions,
} from "motion/react";

import { cn } from "@dsui/ui/index";

// Transition presets
type TransitionPreset = "slow" | "normal" | "fast" | "realtime";

const TRANSITION_PRESETS: Record<TransitionPreset, SpringOptions> = {
  slow: { stiffness: 100, damping: 20, bounce: 0 },
  normal: { stiffness: 500, damping: 50, bounce: 0 },
  fast: { stiffness: 1000, damping: 80, bounce: 0 },
  realtime: { stiffness: 2000, damping: 100, bounce: 0 },
};

type CursorContextType = {
  cursorPos: { x: number; y: number };
  isActive: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  cursorRef: React.RefObject<HTMLDivElement | null>;
};

const CursorContext = React.createContext<CursorContextType | undefined>(
  undefined,
);

const useCursor = (): CursorContextType => {
  const context = React.useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

type CursorProviderProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  /** Auto-setup cursor with variant */
  cursorType?: CursorVariant;
  /** Auto-setup follow element with text */
  followText?: string;
  /** Show follow element (default: true when followText is provided) */
  showFollow?: boolean;
  /** Follow element alignment */
  followAlign?: Align;
  /** Follow element side offset */
  followSideOffset?: number;
  /** Follow element transition preset */
  followTransition?: TransitionPreset;
};

function CursorProvider({
  ref,
  children,
  cursorType,
  followText,
  showFollow,
  followAlign = "bottom-right",
  followSideOffset = 15,
  followTransition = "normal",
  ...props
}: CursorProviderProps) {
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cursorRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const parent = containerRef.current.parentElement;
    if (!parent) return;

    if (getComputedStyle(parent).position === "static") {
      parent.style.position = "relative";
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsActive(true);
    };
    const handleMouseLeave = () => setIsActive(false);

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Auto-setup: determine if we should show cursor and follow
  const shouldShowCursor = cursorType !== undefined;
  const shouldShowFollowElement = showFollow ?? followText !== undefined;

  // Convert preset to SpringOptions
  const transitionConfig = TRANSITION_PRESETS[followTransition];

  return (
    <CursorContext.Provider
      value={{ cursorPos, isActive, containerRef, cursorRef }}
    >
      <div ref={containerRef} data-slot="cursor-provider" {...props}>
        {children}

        {/* Auto-setup Cursor */}
        {shouldShowCursor && <Cursor variant={cursorType} />}

        {/* Auto-setup CursorFollow */}
        {shouldShowFollowElement && (
          <CursorFollow
            variant={cursorType}
            followText={followText}
            align={followAlign}
            sideOffset={followSideOffset}
            transition={transitionConfig}
          />
        )}
      </div>
    </CursorContext.Provider>
  );
}

type CursorProps = HTMLMotionProps<"div"> & {
  children?: React.ReactNode;
  cursorType?: CursorVariant;
};

function Cursor({
  ref,
  children,
  cursorType = "default",
  className,
  style,
  ...props
}: CursorProps) {
  const { cursorPos, isActive, containerRef, cursorRef } = useCursor();
  React.useImperativeHandle(ref, () => cursorRef.current as HTMLDivElement);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Only hide default cursor if we have content to show
  const hasContent = children || cursorType !== "custom";

  React.useEffect(() => {
    const parentElement = containerRef.current?.parentElement;

    if (parentElement && isActive && hasContent) {
      parentElement.style.cursor = "none";
    }

    return () => {
      if (parentElement) parentElement.style.cursor = "default";
    };
  }, [containerRef, cursorPos, isActive, hasContent]);

  React.useEffect(() => {
    x.set(cursorPos.x);
    y.set(cursorPos.y);
  }, [cursorPos, x, y]);

  // Determine which content to render
  const cursorContent =
    children || (cursorType !== "custom" ? cursorVariants[cursorType] : null);

  // Only render if we have content to show
  if (!cursorContent) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={cursorRef}
          data-slot="cursor"
          className={cn(
            "transform-[translate(-50%,-50%)] pointer-events-none z-[9999] absolute",
            className,
          )}
          style={{ top: y, left: x, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...props}
        >
          {cursorContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type Align =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "center";

type CursorVariant = "default" | "pointer" | "custom";

// Predefined cursor variants
const cursorVariants: Record<
  Exclude<CursorVariant, "custom">,
  React.ReactNode
> = {
  default: null, // Use system default cursor
  pointer: (
    <div className="h-5 w-5 rounded-full bg-white/30 border-2 border-white" />
  ),
};

type CursorFollowProps = HTMLMotionProps<"div"> & {
  sideOffset?: number;
  align?: Align;
  transition?: SpringOptions;
  transitionPreset?: TransitionPreset;
  children?: React.ReactNode;
  variant?: CursorVariant;
  followText?: string;
};

function CursorFollow({
  ref,
  sideOffset = 15,
  align = "bottom-right",
  children,
  className,
  style,
  followText,
  transition,
  transitionPreset = "normal",
  ...props
}: CursorFollowProps) {
  const { cursorPos, isActive, cursorRef } = useCursor();
  const cursorFollowRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(
    ref,
    () => cursorFollowRef.current as HTMLDivElement,
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Use custom transition if provided, otherwise use preset
  const finalTransition = transition || TRANSITION_PRESETS[transitionPreset];

  const springX = useSpring(x, finalTransition);
  const springY = useSpring(y, finalTransition);

  const calculateOffset = React.useCallback(() => {
    const rect = cursorFollowRef.current?.getBoundingClientRect();
    const width = rect?.width ?? 0;
    const height = rect?.height ?? 0;

    let newOffset;

    switch (align) {
      case "center":
        newOffset = { x: width / 2, y: height / 2 };
        break;
      case "top":
        newOffset = { x: width / 2, y: height + sideOffset };
        break;
      case "top-left":
        newOffset = { x: width + sideOffset, y: height + sideOffset };
        break;
      case "top-right":
        newOffset = { x: -sideOffset, y: height + sideOffset };
        break;
      case "bottom":
        newOffset = { x: width / 2, y: -sideOffset };
        break;
      case "bottom-left":
        newOffset = { x: width + sideOffset, y: -sideOffset };
        break;
      case "bottom-right":
        newOffset = { x: -sideOffset, y: -sideOffset };
        break;
      case "left":
        newOffset = { x: width + sideOffset, y: height / 2 };
        break;
      case "right":
        newOffset = { x: -sideOffset, y: height / 2 };
        break;
      default:
        newOffset = { x: 0, y: 0 };
    }

    return newOffset;
  }, [align, sideOffset]);

  React.useEffect(() => {
    const offset = calculateOffset();
    const cursorRect = cursorRef.current?.getBoundingClientRect();
    const cursorWidth = cursorRect?.width ?? 20;
    const cursorHeight = cursorRect?.height ?? 20;

    x.set(cursorPos.x - offset.x + cursorWidth / 2);
    y.set(cursorPos.y - offset.y + cursorHeight / 2);
  }, [calculateOffset, cursorPos, cursorRef, x, y]);

  // Determine follow content based on variant and followText
  const getFollowContent = () => {
    if (children) return children;

    if (followText) {
      return (
        <div className="px-4 py-2 bg-white rounded-lg shadow-lg text-sm font-medium">
          {followText}
        </div>
      );
    }

    return null;
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={cursorFollowRef}
          data-slot="cursor-follow"
          className={cn(
            "transform-[translate(-50%,-50%)] pointer-events-none z-[9998] absolute",
            className,
          )}
          style={{ top: springY, left: springX, ...style }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          {...props}
        >
          {getFollowContent()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for easy cursor setup (Method 2)
type useCursorFollowOptions = {
  /** Cursor variant type */
  cursorType?: CursorVariant;
  /** Follow element text */
  followText?: string;
  /** Show follow element */
  showFollow?: boolean;
  /** Follow element alignment */
  align?: Align;
  /** Follow element side offset */
  sideOffset?: number;
  /** Follow element transition preset */
  transitionPreset?: TransitionPreset;
  /** Additional className for the container */
  className?: string;
  /** Additional style for the container */
  style?: React.CSSProperties;
};

function useCursorFollow(options: useCursorFollowOptions = {}) {
  const {
    cursorType = "default",
    followText,
    showFollow,
    align = "bottom-right",
    sideOffset = 15,
    transitionPreset = "normal",
    className,
    style,
  } = options;

  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cursorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsActive(true);
    };
    const handleMouseLeave = () => setIsActive(false);

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Only hide cursor if we have a custom cursor to show
  const hasCustomCursor = cursorType !== "custom";

  React.useEffect(() => {
    if (!containerRef.current || !isActive || !hasCustomCursor) return;
    const element = containerRef.current;
    element.style.cursor = "none";
    return () => {
      element.style.cursor = "default";
    };
  }, [isActive, hasCustomCursor]);

  // Render function for cursor elements
  const renderCursorElements = React.useCallback(() => {
    if (!isActive) return null;

    return (
      <CursorContext.Provider
        value={{ cursorPos, isActive, containerRef, cursorRef }}
      >
        <Cursor variant={cursorType} />
        {(showFollow ?? followText !== undefined) && (
          <CursorFollow
            variant={cursorType}
            followText={followText}
            align={align}
            sideOffset={sideOffset}
            transitionPreset={transitionPreset}
          />
        )}
      </CursorContext.Provider>
    );
  }, [
    isActive,
    cursorPos,
    cursorType,
    followText,
    showFollow,
    align,
    sideOffset,
    transitionPreset,
  ]);

  // Return props that can be spread on the container element
  return {
    ref: containerRef,
    className: cn("relative", className),
    style: { ...style },
    "data-cursor-container": true as const,
    children: (originalChildren: React.ReactNode) => (
      <>
        {originalChildren}
        {renderCursorElements()}
      </>
    ),
  };
}

export {
  CursorProvider,
  Cursor,
  CursorFollow,
  useCursor,
  useCursorFollow,
  TRANSITION_PRESETS,
  type CursorContextType,
  type CursorProviderProps,
  type CursorProps,
  type CursorFollowProps,
  type CursorVariant,
  type Align,
  type useCursorFollowOptions,
  type TransitionPreset,
};
