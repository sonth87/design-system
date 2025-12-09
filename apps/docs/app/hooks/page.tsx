"use client";

import { AdminLayout } from "@/components/admin-layout";
import Button from "@dsui/design-system/button";
import Input from "@dsui/design-system/input";
import { useState } from "react";
import { useDebouncedCallback } from "@dsui/design-system/use-debounced-callback";
import { useDebounceValue } from "@dsui/design-system/use-debounced-value";
import { useMediaQuery } from "@dsui/design-system/use-media-query";
import { useOnClickOutside } from "@dsui/design-system/use-on-click-outside";
import { useRef } from "react";
import { Label } from "@dsui/design-system";

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
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Design System Hooks</h1>
          <p className="text-muted-foreground mt-2">
            Explore custom React hooks from our design system.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="bg-card border rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold">useDebouncedValue</h2>
              <p className="text-muted-foreground mt-2">
                Debounces a value to prevent excessive updates
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="debounce-input" className="text-sm font-medium">
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
              <div className="space-y-2">
                <p>
                  <strong>Input:</strong> {inputValue}
                </p>
                <p>
                  <strong>Debounced (500ms):</strong> {debouncedValue}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold">useDebouncedCallback</h2>
              <p className="text-muted-foreground mt-2">
                Debounces a callback function
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <p>Count: {count}</p>
                <Button onClick={debouncedIncrement}>
                  Increment (debounced 1s)
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold">useMediaQuery</h2>
              <p className="text-muted-foreground mt-2">
                Responsive hook for media queries
              </p>
            </div>
            <div className="p-6">
              <p>
                <strong>Is Desktop (≥768px)?</strong> {isDesktop ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div className="bg-card border rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold">useOnClickOutside</h2>
              <p className="text-muted-foreground mt-2">
                Detects clicks outside of a referenced element
              </p>
            </div>
            <div className="p-6">
              <div
                ref={ref}
                className="p-4 border-2 border-dashed border-muted-foreground rounded-lg"
              >
                <p>Click inside this box - check console for outside clicks</p>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold">Available Hooks</h2>
              <p className="text-muted-foreground mt-2">
                Complete list of custom hooks in our design system
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 border rounded">
                  <code className="text-sm">useCallbackRef</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useDataTable</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useDebouncedCallback</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useDebouncedValue</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useEventListener</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useIntersectionObserver</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useIsomorphicLayoutEffect</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useMediaQuery</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useMousePosition</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useOnClickOutside</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useScript</code>
                </div>
                <div className="p-3 border rounded">
                  <code className="text-sm">useScrollLock</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
