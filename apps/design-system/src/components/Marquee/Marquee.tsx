"use client";

import { cn } from "@dsui/ui/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { useComposedRefs } from "@dsui/ui/lib/compose-refs";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const ROOT_NAME = "Marquee";
const CONTENT_NAME = "MarqueeContent";

type Side = "left" | "right" | "top" | "bottom";
type Orientation = "horizontal" | "vertical";
type Direction = "ltr" | "rtl";

type RootElement = React.ComponentRef<typeof MarqueeRoot>;
type ContentElement = React.ComponentRef<typeof MarqueeContent>;

interface Dimensions {
  width: number;
  height: number;
}

interface ElementDimensions {
  rootSize: number;
  contentSize: number;
}

function createResizeObserverStore() {
  const listeners = new Set<() => void>();
  let observer: ResizeObserver | null = null;
  const elements = new Map<Element, Dimensions>();
  const refCounts = new Map<Element, number>();
  const isSupported = typeof ResizeObserver !== "undefined";
  let notificationScheduled = false;

  const snapshotCache = new WeakMap<
    Element,
    WeakMap<
      Element,
      { horizontal: ElementDimensions; vertical: ElementDimensions }
    >
  >();

  function notify() {
    if (notificationScheduled) return;
    notificationScheduled = true;
    queueMicrotask(() => {
      notificationScheduled = false;
      for (const callback of listeners) {
        callback();
      }
    });
  }

  function cleanup() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    elements.clear();
    refCounts.clear();
  }

  function subscribe(callback: () => void) {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
      if (listeners.size === 0) {
        cleanup();
      }
    };
  }

  function getSnapshot(
    rootElement: RootElement | null,
    contentElement: ContentElement | null,
    orientation: Orientation
  ): ElementDimensions | null {
    if (!rootElement || !contentElement) return null;

    const rootDims = elements.get(rootElement);
    const contentDims = elements.get(contentElement);

    if (!rootDims || !contentDims) return null;

    const rootSize =
      orientation === "vertical" ? rootDims.height : rootDims.width;
    const contentSize =
      orientation === "vertical" ? contentDims.height : contentDims.width;

    let rootCache = snapshotCache.get(rootElement);
    if (!rootCache) {
      rootCache = new WeakMap();
      snapshotCache.set(rootElement, rootCache);
    }

    let contentCache = rootCache.get(contentElement);
    if (!contentCache) {
      contentCache = {
        horizontal: { rootSize: -1, contentSize: -1 },
        vertical: { rootSize: -1, contentSize: -1 },
      };
      rootCache.set(contentElement, contentCache);
    }

    const cached = contentCache[orientation];
    if (cached.rootSize === rootSize && cached.contentSize === contentSize) {
      return cached;
    }

    const snapshot = { rootSize, contentSize };
    contentCache[orientation] = snapshot;
    return snapshot;
  }

  function observe(
    rootElement: RootElement | null,
    contentElement: Element | null
  ) {
    if (!isSupported || !rootElement || !contentElement) return;

    if (!observer) {
      observer = new ResizeObserver((entries) => {
        let hasChanged = false;

        for (const entry of entries) {
          const element = entry.target;
          const { width, height } = entry.contentRect;

          const currentData = elements.get(element);

          if (
            !currentData ||
            currentData.width !== width ||
            currentData.height !== height
          ) {
            elements.set(element, { width, height });
            hasChanged = true;
          }
        }

        if (hasChanged) {
          notify();
        }
      });
    }

    refCounts.set(rootElement, (refCounts.get(rootElement) ?? 0) + 1);
    refCounts.set(contentElement, (refCounts.get(contentElement) ?? 0) + 1);

    observer.observe(rootElement);
    observer.observe(contentElement);

    const rootRect = rootElement.getBoundingClientRect();
    const contentRect = contentElement.getBoundingClientRect();

    const rootData = { width: rootRect.width, height: rootRect.height };
    const contentData = {
      width: contentRect.width,
      height: contentRect.height,
    };

    elements.set(rootElement, rootData);
    elements.set(contentElement, contentData);

    if (
      rootData.width > 0 &&
      rootData.height > 0 &&
      contentData.width > 0 &&
      contentData.height > 0
    ) {
      notify();
    }
  }

  function unobserve(
    rootElement: RootElement | null,
    contentElement: Element | null
  ) {
    if (!observer || !rootElement || !contentElement) return;

    const rootCount = (refCounts.get(rootElement) ?? 1) - 1;
    const contentCount = (refCounts.get(contentElement) ?? 1) - 1;

    if (rootCount <= 0) {
      observer.unobserve(rootElement);
      elements.delete(rootElement);
      refCounts.delete(rootElement);
    } else {
      refCounts.set(rootElement, rootCount);
    }

    if (contentCount <= 0) {
      observer.unobserve(contentElement);
      elements.delete(contentElement);
      refCounts.delete(contentElement);
    } else {
      refCounts.set(contentElement, contentCount);
    }
  }

  return {
    subscribe,
    getSnapshot,
    observe,
    unobserve,
  };
}

const resizeObserverStore = createResizeObserverStore();

function useResizeObserverStore(
  rootRef: React.RefObject<RootElement | null>,
  contentRef: React.RefObject<ContentElement | null>,
  orientation: Orientation
) {
  const onSubscribe = React.useCallback(
    (callback: () => void) => resizeObserverStore.subscribe(callback),
    []
  );

  const getSnapshot = React.useCallback(
    () =>
      resizeObserverStore.getSnapshot(
        rootRef.current,
        contentRef.current,
        orientation
      ),
    [rootRef, contentRef, orientation]
  );

  return React.useSyncExternalStore(onSubscribe, getSnapshot, getSnapshot);
}

const DirectionContext = React.createContext<Direction | undefined>(undefined);

function useDirection(dir?: Direction): Direction {
  const contextDir = React.useContext(DirectionContext);
  return dir ?? contextDir ?? "ltr";
}

interface DivProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

interface MarqueeContextValue {
  side: Side;
  orientation: Orientation;
  dir: Direction;
  speed: number;
  loopCount: number;
  contentRef: React.RefObject<ContentElement | null>;
  rootRef: React.RefObject<RootElement | null>;
  autoFill: boolean;
  pauseOnHover: boolean;
  pauseOnKeyboard: boolean;
  reverse: boolean;
  paused: boolean;
}

const MarqueeContext = React.createContext<MarqueeContextValue | null>(null);

function useMarqueeContext(consumerName: string) {
  const context = React.useContext(MarqueeContext);
  if (!context) {
    throw new Error(`\`${consumerName}\` must be used within \`${ROOT_NAME}\``);
  }
  return context;
}

interface MarqueeRootProps extends DivProps {
  side?: Side;
  dir?: Direction;
  speed?: number;
  delay?: number;
  loopCount?: number;
  gap?: string | number;
  autoFill?: boolean;
  pauseOnHover?: boolean;
  pauseOnKeyboard?: boolean;
  reverse?: boolean;
}

function MarqueeRoot(props: MarqueeRootProps) {
  const {
    side = "left",
    dir: dirProp,
    speed = 50,
    delay = 0,
    loopCount = 0,
    gap = "1rem",
    asChild,
    autoFill = false,
    pauseOnHover = false,
    pauseOnKeyboard = false,
    reverse = false,
    className,
    style: styleProp,
    ref,
    ...marqueeProps
  } = props;

  const orientation: Orientation =
    side === "top" || side === "bottom" ? "vertical" : "horizontal";

  const dir = useDirection(dirProp);

  const rootRef = React.useRef<RootElement>(null);
  const contentRef = React.useRef<ContentElement>(null);
  const composedRef = useComposedRefs(ref, rootRef);

  const [paused, setPaused] = React.useState(false);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (pauseOnKeyboard && event.key === " ") {
        event.preventDefault();
        setPaused((prev) => !prev);
      }
    },
    [pauseOnKeyboard]
  );

  const dimensions = useResizeObserverStore(rootRef, contentRef, orientation);

  const duration = React.useMemo(() => {
    const safeSpeed = Math.max(0.001, speed);

    if (!dimensions) {
      const defaultDistance = autoFill ? 1000 : 2000;
      return defaultDistance / safeSpeed;
    }

    const { rootSize, contentSize } = dimensions;

    if (autoFill) {
      const multiplier =
        contentSize < rootSize ? Math.ceil(rootSize / contentSize) : 1;
      return (contentSize * multiplier) / safeSpeed;
    } else {
      return contentSize < rootSize
        ? rootSize / safeSpeed
        : contentSize / safeSpeed;
    }
  }, [dimensions, speed, autoFill]);

  const style = React.useMemo<React.CSSProperties>(
    () => ({
      "--marquee-duration": `${duration}s`,
      "--marquee-gap": gap,
      "--marquee-delay": `${delay}s`,
      "--marquee-loop-count":
        loopCount === 0 || loopCount === Infinity
          ? "infinite"
          : loopCount.toString(),
      ...styleProp,
    }),
    [duration, gap, delay, loopCount, styleProp]
  );

  const contextValue = React.useMemo<MarqueeContextValue>(
    () => ({
      side,
      orientation,
      dir,
      speed,
      loopCount,
      contentRef,
      rootRef,
      autoFill,
      paused,
      pauseOnHover,
      pauseOnKeyboard,
      reverse,
    }),
    [
      side,
      orientation,
      dir,
      speed,
      loopCount,
      autoFill,
      paused,
      pauseOnHover,
      pauseOnKeyboard,
      reverse,
    ]
  );

  const MarqueePrimitive = asChild ? Slot : "div";

  return (
    <MarqueeContext.Provider value={contextValue}>
      <div data-slot="marquee-wrapper" className="ds:grid">
        <MarqueePrimitive
          role="marquee"
          aria-live="off"
          data-orientation={orientation}
          data-slot="marquee"
          dir={dir}
          tabIndex={pauseOnKeyboard ? 0 : undefined}
          {...marqueeProps}
          ref={composedRef}
          className={cn(
            "ds:relative ds:flex ds:overflow-hidden ds:motion-reduce:animate-none",
            orientation === "vertical" && "ds:h-full ds:flex-col",
            orientation === "horizontal" && "ds:w-full",
            paused && "ds:[&_*]:[animation-play-state:paused]",
            pauseOnHover && "ds:group",
            pauseOnKeyboard &&
              "ds:rounded-md ds:focus-visible:border-ink500 ds:focus-visible:outline-none ds:focus-visible:ring-[3px] ds:focus-visible:ring-ink500/50",
            className
          )}
          style={style}
          onKeyDown={pauseOnKeyboard ? onKeyDown : undefined}
        />
      </div>
    </MarqueeContext.Provider>
  );
}

const marqueeContentVariants = cva(
  "ds:flex ds:min-w-full ds:shrink-0 ds:gap-(--marquee-gap)",
  {
    variants: {
      side: {
        left: "ds:animate-marquee-left",
        right: "ds:animate-marquee-right",
        top: "ds:min-h-full ds:min-w-auto ds:animate-marquee-up ds:flex-col",
        bottom: "ds:min-h-full ds:min-w-auto ds:animate-marquee-down ds:flex-col",
      },
      dir: {
        ltr: "",
        rtl: "",
      },
      pauseOnHover: {
        true: "ds:group-hover:[animation-play-state:paused]",
        false: "",
      },
      reverse: {
        true: "ds:[animation-direction:reverse]",
        false: "",
      },
    },
    compoundVariants: [
      {
        side: "left",
        dir: "rtl",
        className: "ds:animate-marquee-left-rtl",
      },
      {
        side: "right",
        dir: "rtl",
        className: "ds:animate-marquee-right-rtl",
      },
    ],
    defaultVariants: {
      side: "left",
      dir: "ltr",
      pauseOnHover: false,
      reverse: false,
    },
  }
);

function MarqueeContent(props: DivProps) {
  const {
    className,
    asChild,
    ref,
    children,
    style: styleProp,
    ...contentProps
  } = props;

  const context = useMarqueeContext(CONTENT_NAME);
  const composedRef = useComposedRefs(ref, context.contentRef);

  const isVertical = context.orientation === "vertical";
  const isRtl = context.dir === "rtl";

  const dimensions = useResizeObserverStore(
    context.rootRef,
    context.contentRef,
    context.orientation
  );

  React.useEffect(() => {
    if (context.rootRef.current && context.contentRef.current) {
      resizeObserverStore.observe(
        context.rootRef.current,
        context.contentRef.current
      );

      return () => {
        resizeObserverStore.unobserve(
          context.rootRef.current,
          context.contentRef.current
        );
      };
    }
  }, [context.rootRef, context.contentRef]);

  const multiplier = React.useMemo(() => {
    if (!context.autoFill || !dimensions) return 1;

    const { rootSize, contentSize } = dimensions;
    if (contentSize === 0) return 1;

    return contentSize < rootSize ? Math.ceil(rootSize / contentSize) : 1;
  }, [context.autoFill, dimensions]);

  const onMultipliedChildrenRender = React.useCallback(
    (count: number) => {
      return Array.from({ length: Math.max(0, count) }).map((_, i) => (
        <React.Fragment key={i}>{children}</React.Fragment>
      ));
    },
    [children]
  );

  const style = React.useMemo(
    () => ({
      ...styleProp,
      animationDuration: "var(--marquee-duration)",
      animationDelay: "var(--marquee-delay)",
      animationIterationCount: "var(--marquee-loop-count)",
      animationDirection: context.reverse ? "reverse" : "normal",
    }),
    [styleProp, context.reverse]
  );

  const ContentPrimitive = asChild ? Slot : "div";

  return (
    <>
      <ContentPrimitive
        data-orientation={context.orientation}
        data-slot="marquee-content"
        {...contentProps}
        style={style}
        className={cn(
          marqueeContentVariants({
            side: context.side,
            dir: context.dir,
            pauseOnHover: context.pauseOnHover,
            reverse: context.reverse,
            className,
          }),
          isVertical && "ds:flex-col",
          isVertical
            ? "ds:mb-(--marquee-gap)"
            : isRtl
              ? "ds:ml-(--marquee-gap)"
              : "ds:mr-(--marquee-gap)"
        )}
      >
        <div
          ref={composedRef}
          className={cn(
            "ds:flex ds:shrink-0 ds:gap-(--marquee-gap)",
            isVertical && "ds:flex-col"
          )}
        >
          {children}
        </div>
        {onMultipliedChildrenRender(multiplier - 1)}
      </ContentPrimitive>
      <ContentPrimitive
        role="presentation"
        aria-hidden="true"
        {...contentProps}
        style={style}
        className={cn(
          marqueeContentVariants({
            side: context.side,
            dir: context.dir,
            pauseOnHover: context.pauseOnHover,
            reverse: context.reverse,
            className,
          }),
          isVertical && "ds:flex-col"
        )}
      >
        {onMultipliedChildrenRender(multiplier)}
      </ContentPrimitive>
    </>
  );
}

function MarqueeItem(props: DivProps) {
  const { className, asChild, ...itemProps } = props;

  const ItemPrimitive = asChild ? Slot : "div";

  return (
    <ItemPrimitive
      data-slot="marquee-item"
      {...itemProps}
      className={cn("ds:shrink-0", className)}
    />
  );
}

const marqueeEdgeVariants = cva("ds:pointer-events-none ds:absolute ds:z-10", {
  variants: {
    side: {
      left: "ds:top-0 ds:left-0 ds:h-full ds:bg-gradient-to-r ds:from-white ds:to-transparent",
      right:
        "ds:top-0 ds:right-0 ds:h-full ds:bg-gradient-to-l ds:from-white ds:to-transparent",
      top: "ds:top-0 ds:left-0 ds:w-full ds:bg-gradient-to-b ds:from-white ds:to-transparent",
      bottom:
        "ds:bottom-0 ds:left-0 ds:w-full ds:bg-gradient-to-t ds:from-white ds:to-transparent",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      side: ["left", "right"],
      size: "default",
      className: "ds:w-1/4",
    },
    {
      side: ["left", "right"],
      size: "sm",
      className: "ds:w-1/6",
    },
    {
      side: ["left", "right"],
      size: "lg",
      className: "ds:w-1/3",
    },
    {
      side: ["top", "bottom"],
      size: "default",
      className: "ds:h-1/4",
    },
    {
      side: ["top", "bottom"],
      size: "sm",
      className: "ds:h-1/6",
    },
    {
      side: ["top", "bottom"],
      size: "lg",
      className: "ds:h-1/3",
    },
  ],
  defaultVariants: {
    size: "default",
  },
});

interface MarqueeEdgeProps
  extends VariantProps<typeof marqueeEdgeVariants>,
    DivProps {}

function MarqueeEdge(props: MarqueeEdgeProps) {
  const { side, size, className, asChild, ...edgeProps } = props;

  const EdgePrimitive = asChild ? Slot : "div";

  return (
    <EdgePrimitive
      data-size={size}
      data-slot="marquee-edge"
      {...edgeProps}
      className={cn(marqueeEdgeVariants({ side, size, className }))}
    />
  );
}

export {
  MarqueeRoot as Root,
  MarqueeContent as Content,
  MarqueeItem as Item,
  MarqueeEdge as Edge,
  //
  MarqueeRoot as Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeEdge,
  // types
  type MarqueeRootProps,
  type MarqueeEdgeProps,
};
