"use client";

import { AdminLayout } from "@/components/admin-layout";
import Button from "@sth87/shadcn-design-system/button";
import Input from "@sth87/shadcn-design-system/input";
import { useState } from "react";
import { useDebouncedCallback } from "@sth87/shadcn-design-system/use-debounced-callback";
import { useDebounceValue } from "@sth87/shadcn-design-system/use-debounced-value";
import { useMediaQuery } from "@sth87/shadcn-design-system/use-media-query";
import { useOnClickOutside } from "@sth87/shadcn-design-system/use-on-click-outside";
import { useRef } from "react";
import { Label } from "@sth87/shadcn-design-system";

export default function HooksPage() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounceValue(inputValue, 500);
  const [count, setCount] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const ref = useRef<HTMLDivElement>(null);

  const debouncedIncrement = useDebouncedCallback(() => {
    setCount((c) => c + 1);
  }, 1000);

  useOnClickOutside(ref, () => {
    console.log("Clicked outside!");
  });

  return (
    <AdminLayout>
      <div className="ds:p-6 ds:space-y-8">
        <div>
          <h1 className="ds:text-3xl ds:font-bold">Design System Hooks</h1>
          <p className="ds:text-muted-foreground ds:mt-2">
            Explore custom React hooks from our design system.
          </p>
        </div>

        <div className="ds:grid ds:gap-6">
          <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
            <div className="ds:p-6 ds:border-b">
              <h2 className="ds:text-2xl ds:font-semibold">useDebouncedValue</h2>
              <p className="ds:text-muted-foreground ds:mt-2">
                Debounces a value to prevent excessive updates
              </p>
            </div>
            <div className="ds:p-6 ds:space-y-4">
              <div className="ds:space-y-2">
                <Label htmlFor="debounce-input" className="ds:text-sm ds:font-medium">
                  Type something:
                </Label>
                <Input
                  id="debounce-input"
                  value={inputValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                  }
                  placeholder="Type to see debounced value..."
                />
              </div>
              <div className="ds:space-y-2">
                <p>
                  <strong>Input:</strong> {inputValue}
                </p>
                <p>
                  <strong>Debounced (500ms):</strong> {debouncedValue}
                </p>
              </div>
            </div>
          </div>

          <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
            <div className="ds:p-6 ds:border-b">
              <h2 className="ds:text-2xl ds:font-semibold">useDebouncedCallback</h2>
              <p className="ds:text-muted-foreground ds:mt-2">
                Debounces a callback function
              </p>
            </div>
            <div className="ds:p-6 ds:space-y-4">
              <div className="ds:space-y-2">
                <p>Count: {count}</p>
                <Button onClick={debouncedIncrement}>
                  Increment (debounced 1s)
                </Button>
              </div>
            </div>
          </div>

          <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
            <div className="ds:p-6 ds:border-b">
              <h2 className="ds:text-2xl ds:font-semibold">useMediaQuery</h2>
              <p className="ds:text-muted-foreground ds:mt-2">
                Responsive hook for media queries
              </p>
            </div>
            <div className="ds:p-6">
              <p>
                <strong>Is Desktop (≥768px)?</strong> {isDesktop ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
            <div className="ds:p-6 ds:border-b">
              <h2 className="ds:text-2xl ds:font-semibold">useOnClickOutside</h2>
              <p className="ds:text-muted-foreground ds:mt-2">
                Detects clicks outside of a referenced element
              </p>
            </div>
            <div className="ds:p-6">
              <div
                ref={ref}
                className="ds:p-4 ds:border-2 ds:border-dashed ds:border-muted-foreground ds:rounded-lg"
              >
                <p>Click inside this box - check console for outside clicks</p>
              </div>
            </div>
          </div>

          <div className="ds:bg-card ds:border ds:rounded-lg ds:shadow-sm">
            <div className="ds:p-6 ds:border-b">
              <h2 className="ds:text-2xl ds:font-semibold">Available Hooks</h2>
              <p className="ds:text-muted-foreground ds:mt-2">
                Complete list of custom hooks in our design system
              </p>
            </div>
            <div className="ds:p-6">
              <div className="ds:grid ds:grid-cols-2 ds:md:grid-cols-3 ds:gap-4">
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useCallbackRef</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useDataTable</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useDebouncedCallback</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useDebouncedValue</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useEventListener</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useIntersectionObserver</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useIsomorphicLayoutEffect</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useMediaQuery</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useMousePosition</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useOnClickOutside</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useScript</code>
                </div>
                <div className="ds:p-3 ds:border ds:rounded">
                  <code className="ds:text-sm">useScrollLock</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
