import React, { useState, useRef, useCallback } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import i18n from "../../.storybook/i18n";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useDebounceValue } from "@/hooks/use-debounced-value";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useScript } from "@/hooks/use-script";
import { useCallbackRef } from "@/hooks/use-callback-ref";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { cn } from "@dsui/ui/index";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useEventListener } from "@/hooks/use-event-listener";
import { useMediaQuery } from "@/hooks/use-media-query";

const meta: Meta = {
  title: "Hooks",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

/**
 * Debounce Callback
 * ```tsx
 * const [input, setInput] = useState("");
 * const [output, setOutput] = useState("");
 *
 * const debouncedCallback = useDebouncedCallback((value: string) => {
 *   setOutput(`Debounced: ${value}`);
 * }, 500);
 *
 * const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 *   setInput(e.target.value);
 *   debouncedCallback(e.target.value);
 * };
 *
 * <Input
 *   type="text"
 *   value={input}
 *   onChange={handleChange}
 *   placeholder="Type something..."
 *   size="lg"
 *   className="my-4"
 * />
 * );
 * ```
 */
export const DebounceCallback: Story = {
  render: () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const debouncedCallback = useDebouncedCallback((value: string) => {
      setOutput(`Debounced: ${value}`);
    }, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      debouncedCallback(e.target.value);
    };

    return (
      <div className="ds:max-w-sm">
        <h3>Debounce Callback</h3>
        <Input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type something..."
          size="lg"
          className="ds:my-4"
        />
        <p>You typed: {output}</p>
      </div>
    );
  },
};

/**
 * Debounce Value
 * ```tsx
 * const [input, setInput] = useState("");
 * const [debouncedValue] = useDebounceValue(input, 500);
 * 
 * <input
 *   type="text"
 *   value={input}
 *   onChange={(e) => setInput(e.target.value)}
 *   placeholder="Type something..."
 *   style={{ padding: "8px", marginBottom: "10px" }}
/>
 */
export const DebounceValue: Story = {
  render: () => {
    const [input, setInput] = useState("");
    const [debouncedValue] = useDebounceValue(input, 500);

    return (
      <div className="ds:max-w-sm">
        <h3>Debounce Value</h3>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
          size="lg"
          className="ds:my-4"
        />
        <p>Input: {input}</p>
        <p>Debounced: {debouncedValue}</p>
      </div>
    );
  },
};

/**
 *
 * A custom hook that provides an easy way to use the Intersection Observer API in React.
 * It allows you to detect when an element enters or leaves the viewport, or intersects with another element.
 * This is useful for implementing features like lazy loading, infinite scrolling, or triggering animations.
 *
 * The hook returns a tuple: [ref, isIntersecting], where:
 * - ref: A function to assign to the element you want to observe
 * - isIntersecting: A boolean indicating if the element is currently intersecting
 *
 * You can pass IntersectionObserver options like threshold, root, rootMargin as the first parameter.
 *
 * ```tsx

 * ```
 */
export const IntersectionObserver: Story = {
  render: () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [ref, isIntersecting] = useIntersectionObserver({
      threshold: 0.5,
    });

    React.useEffect(() => {
      if (targetRef.current) {
        ref(targetRef.current);
      }
    }, [ref]);

    return (
      <div className="ds:h-[200vh] ds:p-5">
        <h3>Intersection Observer</h3>
        <p>Scroll down to see the target element.</p>
        <div
          ref={targetRef}
          className={cn(
            "ds:flex ds:flex-col ds:items-center ds:justify-center ds:mt-[50vh] ds:text-white ds:p-4",
            isIntersecting ? "ds:bg-green-500/50" : "ds:bg-red-500/50"
          )}
        >
          {isIntersecting ? "Intersecting!" : "Not intersecting"}

          {/* Diagram */}
          <div className="ds:p-4 ds:rounded">
            <h4 className="ds:text-sm ds:font-semibold ds:mb-2">How it works</h4>
            <pre
              className={cn(
                "ds:text-xs ds:font-mono ds:whitespace-pre-wrap",
                isIntersecting ? "ds:text-green-600" : "ds:text-red-600"
              )}
            >
              {`Viewport (Browser Window)
┌─────────────────────────┐
│                         │
│     [Above Viewport]    │
│                         │
├─────────────────────────┤ ← Intersection Point
│                         │
│   [Target Element]      │ ← isIntersecting: true
│   (Green when visible)  │
│                         │
├─────────────────────────┤
│                         │
│    [Below Viewport]     │
│                         │
└─────────────────────────┘

When the target element crosses the intersection point,
isIntersecting changes from false to true (or vice versa).`}
            </pre>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const targetRef = useRef<HTMLDivElement>(null);
const [ref, isIntersecting] = useIntersectionObserver({
  threshold: 0.5,
});

React.useEffect(() => {
  if (targetRef.current) {
    ref(targetRef.current);
  }
}, [ref]);

<div className="h-[200vh] p-5">
  <h3>Intersection Observer</h3>
  <p>Scroll down to see the target element.</p>
  <div
    ref={targetRef}
    className={cn(
      "h-24 flex items-center justify-center mt-[50vh]",
      isIntersecting ? "bg-green-500" : "bg-red-500"
    )}
  >
    {isIntersecting ? "Intersecting!" : "Not intersecting"}
  </div>
</div>
        `,
      },
    },
  },
};

/**
 *
 * A custom hook for dynamically loading external scripts in React applications.
 * It manages the script loading lifecycle and provides status updates.
 * Useful for loading third-party libraries like analytics, widgets, or CDN scripts.
 *
 * The hook returns a status string: "idle", "loading", "ready", or "error".
 * Options include:
 * - removeOnUnmount: Whether to remove the script when the component unmounts (default: true)
 * - id: A unique ID for the script element to prevent duplicates
 *
 */
export const UseScript: Story = {
  render: () => {
    const status = useScript(
      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js",
      {
        removeOnUnmount: false,
        id: "confetti-script",
      }
    );

    const triggerConfetti = () => {
      if (
        status === "ready" &&
        typeof window !== "undefined" &&
        "confetti" in window
      ) {
        // @ts-ignore - confetti is loaded dynamically
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    };

    const getStatusVariant = (
      status: string
    ): "muted" | "secondary" | "destructive" => {
      switch (status) {
        case "ready":
          return "muted";
        case "error":
          return "destructive";
        default:
          return "secondary";
      }
    };

    return (
      <div className="ds:p-6 ds:max-w-sm ds:mx-auto ds:space-y-4">
        {/* Header */}
        <div className="ds:text-center ds:space-y-1">
          <h3 className="ds:text-lg ds:font-semibold">Script Loader Demo</h3>
          <p className="ds:text-sm ds:text-muted-foreground">
            Dynamic canvas-confetti loading
          </p>
        </div>

        {/* Status Display */}
        <div className="ds:space-y-2">
          <Label className="ds:text-sm ds:font-medium">Loading Status</Label>
          <div className="ds:bg-muted ds:rounded ds:p-2 ds:min-h-[40px] ds:flex ds:items-center ds:justify-center">
            <div className="ds:flex ds:items-center ds:gap-2">
              <Badge
                color={getStatusVariant(status)}
                className="ds:text-sm ds:px-3 ds:py-1 ds:font-mono"
              >
                {status}
              </Badge>
            </div>
          </div>
        </div>
        {/* Action Button */}
        <div className="ds:space-y-2">
          <Label className="ds:text-sm ds:font-medium">Test Script</Label>
          <div className="ds:min-h-[40px] ds:flex ds:items-center">
            <Button onClick={triggerConfetti} disabled={status !== "ready"}>
              {status === "ready"
                ? "🎉 Trigger Confetti!"
                : "Loading script..."}
            </Button>
          </div>
        </div>

        {/* Status Messages */}
        <div className="ds:text-center ds:min-h-[32px] ds:flex ds:items-center ds:justify-center">
          {status === "ready" && (
            <div className="ds:text-xs ds:text-green-600">
              Script loaded! Click button to test confetti
            </div>
          )}

          {status === "error" && (
            <div className="ds:text-xs ds:text-red-600">
              Failed to load script. Check your connection.
            </div>
          )}
          {status === "loading" && (
            <div className="ds:text-xs ds:text-muted-foreground">
              Loading canvas-confetti from CDN...
            </div>
          )}
          {status === "idle" && (
            <div className="ds:text-xs ds:text-muted-foreground">
              Script loader ready
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const status = useScript(
  "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js",
  {
    removeOnUnmount: false,
    id: "confetti-script",
  }
);
const triggerConfetti = () => {
  if (
    status === "ready" &&
    typeof window !== "undefined" &&
    "confetti" in window
  ) {
    // @ts-ignore - confetti is loaded dynamically
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
};
<Button onClick={triggerConfetti} disabled={status !== "ready"}>
  {status === "ready" ? "🎉 Trigger Confetti!" : "Loading script..."}
</Button>
        `,
      },
    },
  },
};

// Component con để theo dõi số lần re-render - PHẢI đặt ngoài để không bị tạo lại
const ChildWithStableCallback = React.memo(
  ({
    onClick,
    label,
    buttonText,
    description,
    rendersLabel,
  }: {
    onClick: () => void;
    label: string;
    buttonText: string;
    description: string;
    rendersLabel: string;
  }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    return (
      <div className="ds:space-y-2 ds:p-4 ds:border ds:rounded ds:bg-green-50 ds:dark:bg-green-950">
        <div className="ds:flex ds:items-center ds:justify-between">
          <span className="ds:text-sm ds:font-medium">{label}</span>
          <Badge color="muted" className="ds:font-mono">
            {rendersLabel} {renderCount.current}
          </Badge>
        </div>
        <Button onClick={onClick} className="ds:w-full">
          {buttonText}
        </Button>
        <p className="ds:text-xs ds:text-muted-foreground">{description}</p>
      </div>
    );
  }
);
ChildWithStableCallback.displayName = "ChildWithStableCallback";

const ChildWithUnstableCallback = React.memo(
  ({
    onClick,
    label,
    buttonText,
    description,
    rendersLabel,
  }: {
    onClick: () => void;
    label: string;
    buttonText: string;
    description: string;
    rendersLabel: string;
  }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    return (
      <div className="ds:space-y-2 ds:p-4 ds:border ds:rounded ds:bg-red-50 ds:dark:bg-red-950">
        <div className="ds:flex ds:items-center ds:justify-between">
          <span className="ds:text-sm ds:font-medium">{label}</span>
          <Badge color="destructive" className="ds:font-mono">
            {rendersLabel} {renderCount.current}
          </Badge>
        </div>
        <Button onClick={onClick} className="ds:w-full">
          {buttonText}
        </Button>
        <p className="ds:text-xs ds:text-muted-foreground">{description}</p>
      </div>
    );
  }
);
ChildWithUnstableCallback.displayName = "ChildWithUnstableCallback";

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency. This is useful when you need to
 * pass a callback to a child component that should not cause the child to re-render every time the
 * callback changes, but still have access to the latest callback value.
 *
 *
 * Without useCallbackRef:
 * ```tsx
 * const Parent = () => {
 *   const [count, setCount] = useState(0);
 *
 *   // Callback được tạo lại mỗi lần render
 *   const handleClick = () => {
 *     setCount(c => c + 1);
 *   };
 *
 *   return <Child onClick={handleClick} />;
 * };
 *
 * const Child = React.memo(({ onClick }) => {
 *   console.log('Child re-rendered'); // Sẽ log mỗi lần Parent render
 *   return <button onClick={onClick}>Click me</button>;
 * });
 * ```
 *
 * With useCallbackRef:
 * ```tsx
 * const Parent = () => {
 *   const [count, setCount] = useState(0);
 *
 *   // Callback ổn định với useCallbackRef
 *   const handleClick = useCallbackRef(() => {
 *     setCount(c => c + 1);
 *   });
 *
 *   return <Child onClick={handleClick} />;
 * };
 *
 * const Child = React.memo(({ onClick }) => {
 *   console.log('Child re-rendered'); // Chỉ log lần đầu
 *   return <button onClick={onClick}>Click me</button>;
 * });
 * ```
 *
 */
export const UseCallbackRef: Story = {
  render: () => {
    const UseCallbackRefDemo = () => {
      const [count, setCount] = useState(0);
      const parentRenderCount = useRef(0);
      parentRenderCount.current += 1;

      // Callback ổn định với useCallbackRef
      const stableCallback = useCallbackRef(() => {
        setCount((c) => c + 1);
      });

      // Callback không ổn định - được tạo lại mỗi lần render
      const unstableCallback = () => {
        setCount((c) => c + 1);
      };

      return (
        <div className="ds:max-w-2xl ds:space-y-6">
          <div>
            <h3 className="ds:text-lg ds:font-semibold">
              {i18n.t("stories.usecallbackref.title")}
            </h3>
            <p className="ds:text-sm ds:text-muted-foreground ds:mt-1">
              {i18n.t("stories.usecallbackref.subtitle")}
            </p>
          </div>

          {/* Parent Status */}
          <div className="ds:p-4 ds:bg-blue-50 ds:dark:bg-blue-950 ds:border ds:border-blue-200 ds:dark:border-blue-800 ds:rounded ds:space-y-2">
            <div className="ds:flex ds:items-center ds:justify-between">
              <span className="ds:font-medium">
                {i18n.t("stories.usecallbackref.parentComponent")}
              </span>
              <Badge color="secondary" className="ds:font-mono">
                {i18n.t("stories.usecallbackref.renders")}{" "}
                {parentRenderCount.current}
              </Badge>
            </div>
            <div className="ds:flex ds:items-center ds:gap-2">
              <span className="ds:text-sm">
                {i18n.t("stories.usecallbackref.count")}
              </span>
              <Badge className="ds:font-mono ds:text-lg ds:px-3 ds:py-1">{count}</Badge>
            </div>
            <p className="ds:text-xs ds:text-muted-foreground">
              {i18n.t("stories.usecallbackref.parentDescription")}
            </p>
          </div>

          {/* Children Components */}
          <div className="ds:grid ds:grid-cols-1 ds:md:grid-cols-2 ds:gap-4">
            <ChildWithStableCallback
              onClick={stableCallback}
              label={i18n.t("stories.usecallbackref.withCallbackRef")}
              buttonText={i18n.t("stories.usecallbackref.clickWithCallbackRef")}
              description={i18n.t("stories.usecallbackref.withDescription")}
              rendersLabel={i18n.t("stories.usecallbackref.renders")}
            />
            <ChildWithUnstableCallback
              onClick={unstableCallback}
              label={i18n.t("stories.usecallbackref.withoutCallbackRef")}
              buttonText={i18n.t(
                "stories.usecallbackref.clickWithoutCallbackRef"
              )}
              description={i18n.t("stories.usecallbackref.withoutDescription")}
              rendersLabel={i18n.t("stories.usecallbackref.renders")}
            />
          </div>

          {/* Explanation */}
          <div className="ds:p-4 ds:bg-muted ds:rounded ds:space-y-2">
            <p className="ds:text-sm ds:font-medium">
              {i18n.t("stories.usecallbackref.explanationTitle")}
            </p>
            <ul className="ds:text-sm ds:space-y-1 ds:list-disc ds:list-inside ds:text-muted-foreground">
              <li>{i18n.t("stories.usecallbackref.explanation1")}</li>
              <li>{i18n.t("stories.usecallbackref.explanation2")}</li>
              <li>{i18n.t("stories.usecallbackref.explanation3")}</li>
            </ul>

            {/* Diagram */}
            <div className="ds:mt-4 ds:p-4 ds:bg-white ds:dark:bg-gray-800 ds:rounded ds:border">
              <h4 className="ds:text-sm ds:font-semibold ds:mb-2">Flow Diagram</h4>
              <pre className="ds:text-xs ds:font-mono ds:text-muted-foreground ds:whitespace-pre-wrap">
                {`Without useCallbackRef:
Parent Component ──(render)──► New Callback ──(prop)──► Child Component (re-renders)

With useCallbackRef:
Parent Component ──(render)──► Stable Ref ──(prop)──► Child Component (stable)`}
              </pre>
            </div>
          </div>
        </div>
      );
    };

    return <UseCallbackRefDemo />;
  },
  parameters: {
    docs: {
      source: {
        code: `const Parent = () => {
  const [count, setCount] = useState(0);
  const stableCallback = useCallbackRef(() => {
    setCount(c => c + 1);
  });

  return (
    <div>
      <p>Count: {count}</p>
      <Child onClick={stableCallback} />
    </div>
  );
};

const Child = ({ onClick }) => {
  return <button onClick={onClick}>Increment</button>;
};`,
      },
    },
  },
};

/**
 * Scroll Lock
 *
 * A custom hook for locking and unlocking scroll on a target element (default is document.body).
 * Useful for modals, drawers, or any overlay that should prevent background scrolling.
 *
 * The hook returns an object with:
 * - isLocked: boolean indicating if scroll is locked
 * - lock: function to lock scroll
 * - unlock: function to unlock scroll
 *
 * Options:
 * - autoLock: automatically lock on mount (default: true)
 * - lockTarget: HTMLElement or selector to lock (default: document.body)
 * - widthReflow: prevent width reflow when scrollbar is hidden (default: true)
 *
 */
export const ScrollLock: Story = {
  render: () => {
    const { isLocked, lock, unlock } = useScrollLock({ autoLock: false });
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerTarget, setContainerTarget] =
      React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
      if (containerRef.current && !containerTarget) {
        setContainerTarget(containerRef.current);
      }
    }, [containerTarget]);

    const {
      isLocked: isContainerLocked,
      lock: lockContainer,
      unlock: unlockContainer,
    } = useScrollLock({
      autoLock: false,
      lockTarget: containerTarget,
    });

    return (
      <div className="ds:max-w-2xl ds:space-y-6">
        <h3>Scroll Lock</h3>

        {/* Body Scroll Lock */}
        <div className="ds:space-y-4">
          <h4 className="ds:text-lg ds:font-medium">Body Scroll Lock</h4>
          <div className="ds:space-y-2">
            <Label className="ds:text-sm ds:font-medium">Status</Label>
            <Badge
              color={isLocked ? "destructive" : "muted"}
              className="ds:font-mono"
            >
              {isLocked ? "Locked" : "Unlocked"}
            </Badge>
          </div>
          <div className="ds:flex ds:gap-2">
            <Button onClick={lock} disabled={isLocked} className="ds:flex-1">
              Lock Body Scroll
            </Button>
            <Button onClick={unlock} disabled={!isLocked} className="ds:flex-1">
              Unlock Body Scroll
            </Button>
          </div>
          <p className="ds:text-xs ds:text-muted-foreground">
            Try scrolling the page after locking. The page scroll should be
            disabled.
          </p>
        </div>

        {/* Container Scroll Lock */}
        <div className="ds:space-y-4">
          <h4 className="ds:text-lg ds:font-medium">Container Scroll Lock</h4>
          <div className="ds:space-y-2">
            <Label className="ds:text-sm ds:font-medium">Status</Label>
            <Badge
              color={isContainerLocked ? "destructive" : "muted"}
              className="ds:font-mono"
            >
              {isContainerLocked ? "Locked" : "Unlocked"}
            </Badge>
          </div>
          <div className="ds:flex ds:gap-2">
            <Button
              onClick={lockContainer}
              disabled={isContainerLocked}
              className="ds:flex-1"
            >
              Lock Container Scroll
            </Button>
            <Button
              onClick={unlockContainer}
              disabled={!isContainerLocked}
              className="ds:flex-1"
            >
              Unlock Container Scroll
            </Button>
          </div>
          <p className="ds:text-xs ds:text-muted-foreground">
            Try scrolling inside the container after locking. Only the container
            scroll should be disabled.
          </p>
          <div
            ref={containerRef}
            className="ds:h-64 ds:bg-gradient-to-b ds:from-green-200 ds:to-blue-200 ds:rounded ds:p-4 ds:overflow-auto ds:border-2 ds:border-dashed ds:border-gray-300"
            style={{ height: "200px" }}
          >
            <p>This is a scrollable container.</p>
            <p>Scroll down to see more content...</p>
            <div className="ds:h-96 ds:bg-gray-100 ds:rounded ds:p-2 ds:mt-4">
              <p>More content here.</p>
              <p>Even more content.</p>
              <p>Keep scrolling...</p>
              <p>End of content.</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const { isLocked, lock, unlock } = useScrollLock({ autoLock: false });

// For body scroll lock
<Button onClick={lock}>Lock Body Scroll</Button>
<Button onClick={unlock}>Unlock Body Scroll</Button>

-------------------------------------------------------------

// For container scroll lock
const containerRef = useRef<HTMLDivElement>(null);
const { isLocked: isContainerLocked, lock: lockContainer, unlock: unlockContainer } = useScrollLock({
  autoLock: false,
  lockTarget: containerRef.current,
});

<div ref={containerRef} style={{ height: '200px', overflow: 'auto' }}>
  {/* Scrollable content */}
</div>
<Button onClick={lockContainer}>Lock Container Scroll</Button>
<Button onClick={unlockContainer}>Unlock Container Scroll</Button>
        `,
      },
    },
  },
};

export const MousePosition: Story = {
  render: () => {
    const [mouse, trackingRef] = useMousePosition<HTMLDivElement>();

    const isInside =
      mouse.elementX !== undefined && mouse.elementY !== undefined;
    return (
      <div className="ds:p-6 ds:max-w-sm ds:mx-auto ds:space-y-6">
        {/* Header */}
        <div className="ds:text-center ds:space-y-2">
          <h3 className="ds:text-lg ds:font-semibold">Mouse Position Demo</h3>
          <p className="ds:text-sm ds:text-muted-foreground">
            Real-time cursor tracking
          </p>
        </div>

        {/* Tracking Area */}
        <div className="ds:space-y-2">
          <Label className="ds:text-sm ds:font-medium">Tracking Area</Label>
          <div
            ref={trackingRef as any}
            className="ds:bg-muted ds:rounded-lg ds:h-20 ds:flex ds:items-center ds:justify-center ds:relative ds:cursor-crosshair"
          >
            <span className="ds:text-sm ds:text-muted-foreground">
              Move mouse here
            </span>

            {/* Position indicator dot */}
            {isInside && (
              <div
                className="ds:absolute ds:w-2 ds:h-2 ds:bg-primary ds:rounded-full ds:transform ds:-translate-x-1/2 ds:-translate-y-1/2 ds:pointer-events-none"
                style={{
                  left: `${mouse.elementX}px`,
                  top: `${mouse.elementY}px`,
                }}
              />
            )}
          </div>
        </div>
        {/* Position Display */}
        <div className="ds:space-y-2">
          <Label className="ds:text-sm ds:font-medium">Coordinates</Label>
          <div className="ds:grid ds:grid-cols-2 ds:gap-2">
            <div className="ds:bg-muted ds:rounded ds:p-2 ds:min-h-[40px] ds:flex ds:items-center ds:justify-center">
              <div className="ds:text-center">
                <div className="ds:text-xs ds:text-muted-foreground">Global</div>
                <Badge variant="outline" className="ds:text-xs ds:font-mono">
                  {mouse.x}, {mouse.y}
                </Badge>
              </div>
            </div>
            <div className="ds:bg-muted ds:rounded ds:p-2 ds:min-h-[40px] ds:flex ds:items-center ds:justify-center">
              <div className="ds:text-center">
                <div className="ds:text-xs ds:text-muted-foreground">Relative</div>
                <Badge variant="outline" className="ds:text-xs ds:font-mono">
                  {isInside
                    ? `${Math.round(mouse.elementX!)}, ${Math.round(mouse.elementY!)}`
                    : "-, -"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        {/* Status */}
        <div className="ds:space-y-2">
          <Label className="ds:text-sm ds:font-medium">Status</Label>
          <div className="ds:bg-muted ds:rounded ds:p-2 ds:min-h-[40px] ds:flex ds:items-center ds:justify-center">
            <Badge
              color={isInside ? "muted" : "secondary"}
              className="ds:text-sm ds:px-3 ds:py-1"
            >
              {isInside ? "🎯 Tracking" : "📍 Waiting"}
            </Badge>
          </div>
        </div>
        {/* Instructions */}
        <div className="ds:text-center ds:min-h-[20px] ds:flex ds:items-center ds:justify-center">
          <div className="ds:text-xs ds:text-muted-foreground">
            Hover over tracking area to see coordinates
          </div>
        </div>
      </div>
    );
  },
};

/**
 * On Click Outside
 */
export const OnClickOutside: Story = {
  render: () => {
    const Component = () => {
      const [clickedOutside, setClickedOutside] = useState(false);
      const ref = useRef<HTMLDivElement>(null);

      useOnClickOutside(ref, () => {
        setClickedOutside(true);
      });

      return (
        <div className="ds:max-w-sm ds:space-y-2">
          <h3>On Click Outside</h3>
          <div
            ref={ref}
            className="ds:bg-muted ds:rounded-lg ds:h-20 ds:flex ds:items-center ds:justify-center ds:relative ds:cursor-crosshair"
            onClick={() => setClickedOutside(false)}
          >
            Click inside me to reset
          </div>
          <div className="ds:flex ds:items-center ds:gap-2">
            Clicked outside:
            <Badge color={clickedOutside ? "success" : "error"}>
              {clickedOutside ? "Yes" : "No"}
            </Badge>
          </div>
        </div>
      );
    };

    return <Component />;
  },
  parameters: {
    docs: {
      source: {
        code: `
import { useOnClickOutside } from "...";

const [clickedOutside, setClickedOutside] = useState(false);
const ref = useRef<HTMLDivElement>(null);

useOnClickOutside(ref, () => {
  setClickedOutside(true);
});

return (
  <div ref={ref}>
    Click outside this box
    <div>
      Clicked outside: {clickedOutside ? "Yes" : "No"}
    </div>
  </div>
);
`,
      },
    },
  },
};

/**
 * On Click Outside
 */
export const EventListener: Story = {
  render: () => {
    const [keyPressed, setKeyPressed] = useState<string>("");

    // Global keyboard event
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
      setKeyPressed(event.key);
    }, []);

    // Attach event listener to window
    useEventListener("keydown", handleKeyDown);

    return (
      <div className="ds:p-6 ds:max-w-sm ds:mx-auto ds:space-y-6">
        {/* Header */}
        <div className="ds:text-center ds:space-y-2">
          <h3 className="ds:text-lg ds:font-semibold">Event Listener Demo</h3>
          <p className="ds:text-sm ds:text-muted-foreground">
            Global keyboard event handling
          </p>
        </div>

        {/* Key Display */}
        <div className="ds:space-y-2">
          <Label className="ds:text-sm ds:font-medium">Last Key Pressed</Label>
          <div className="ds:bg-muted ds:rounded ds:p-3 ds:min-h-[48px] ds:flex ds:items-center ds:justify-center">
            <Badge
              color={keyPressed ? "primary" : "muted"}
              className="ds:font-mono ds:text-lg ds:px-4 ds:py-2"
            >
              {keyPressed || "None"}
            </Badge>
          </div>
        </div>
        {/* Clear Button */}
        <div className="ds:min-h-[36px] ds:flex ds:items-center">
          <Button
            onClick={() => setKeyPressed("")}
            disabled={!keyPressed}
            variant="outline"
            size="sm"
            className="ds:w-full ds:text-sm ds:h-9"
          >
            Clear
          </Button>
        </div>
        {/* Instructions */}
        <div className="ds:text-center ds:min-h-[20px] ds:flex ds:items-center ds:justify-center">
          <div className="ds:text-xs ds:text-muted-foreground">
            Press any key to see it captured globally
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Media Query
 *
 * A custom hook that uses the MediaQuery API to check if a media query matches.
 * Useful for responsive design, detecting screen sizes, orientations, etc.
 *
 * The hook returns a boolean indicating if the query matches.
 *
 * ```tsx
 * const isSmallScreen = useMediaQuery("(max-width: 768px)");
 * const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
 *
 * return (
 *   <div>
 *     {isSmallScreen ? "Mobile" : "Desktop"}
 *   </div>
 * );
 * ```
 */
export const MediaQuery: Story = {
  render: () => {
    const MediaQueryDemo = () => {
      const isSmall = useMediaQuery("(max-width: 768px)");
      const isMedium = useMediaQuery(
        "(min-width: 769px) and (max-width: 1024px)"
      );
      const isLarge = useMediaQuery("(min-width: 1025px)");
      const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

      return (
        <div className="ds:p-6 ds:max-w-sm ds:mx-auto ds:space-y-6">
          {/* Header */}
          <div className="ds:text-center ds:space-y-2">
            <h3 className="ds:text-lg ds:font-semibold">Media Query Demo</h3>
            <p className="ds:text-sm ds:text-muted-foreground">
              Responsive breakpoint detection
            </p>
          </div>

          {/* Breakpoints */}
          <div className="ds:space-y-4">
            <div className="ds:space-y-2">
              <Label className="ds:text-sm ds:font-medium">Screen Size</Label>
              <div className="ds:grid ds:grid-cols-3 ds:gap-2">
                <div className="ds:bg-muted ds:rounded ds:p-2 ds:min-h-[40px] ds:flex ds:flex-col ds:items-center ds:justify-center">
                  <Badge
                    color={isSmall ? "success" : "muted"}
                    className="ds:text-xs"
                  >
                    Small
                  </Badge>
                  <span className="ds:text-xs ds:text-muted-foreground ds:mt-1">
                    ≤768px
                  </span>
                </div>
                <div className="ds:bg-muted ds:rounded ds:p-2 ds:min-h-[40px] ds:flex ds:flex-col ds:items-center ds:justify-center">
                  <Badge
                    color={isMedium ? "success" : "muted"}
                    className="ds:text-xs"
                  >
                    Medium
                  </Badge>
                  <span className="ds:text-xs ds:text-muted-foreground ds:mt-1">
                    769-1024px
                  </span>
                </div>
                <div className="ds:bg-muted ds:rounded ds:p-2 ds:min-h-[40px] ds:flex ds:flex-col ds:items-center ds:justify-center">
                  <Badge
                    color={isLarge ? "success" : "muted"}
                    className="ds:text-xs"
                  >
                    Large
                  </Badge>
                  <span className="ds:text-xs ds:text-muted-foreground ds:mt-1">
                    ≥1025px
                  </span>
                </div>
              </div>
            </div>

            {/* Dark Mode */}
            <div className="ds:space-y-2">
              <Label className="ds:text-sm ds:font-medium">Color Scheme</Label>
              <div className="ds:bg-muted ds:rounded ds:p-2 ds:min-h-[40px] ds:flex ds:items-center ds:justify-center">
                <Badge
                  color={isDarkMode ? "secondary" : "muted"}
                  className="ds:text-sm ds:px-3 ds:py-1"
                >
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="ds:text-center ds:min-h-[20px] ds:flex ds:items-center ds:justify-center">
            <div className="ds:text-xs ds:text-muted-foreground">
              Resize your browser window to see changes
            </div>
          </div>
        </div>
      );
    };

    return <MediaQueryDemo />;
  },
  parameters: {
    docs: {
      source: {
        code: `
const isSmall = useMediaQuery("(max-width: 768px)");
const isMedium = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
const isLarge = useMediaQuery("(min-width: 1025px)");
const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

<div>
  <p>Screen Size: {isSmall ? "Small" : isMedium ? "Medium" : "Large"}</p>
  <p>Color Scheme: {isDarkMode ? "Dark" : "Light"}</p>
</div>
        `,
      },
    },
  },
};
