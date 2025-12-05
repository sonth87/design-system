"use client";
import { useRef, useState } from "react";
import { useDebouncedCallback } from "./use-debounced-callback";

/**
 * Custom hook that returns a debounced version of the provided value, along with a function to update it.
 * @param initialValue The value to be debounced
 * @param delay The delay in milliseconds before the value is updated (default is 500ms)
 * @param options Optional configurations for the debouncing behavior
 * @returns An array containing the debounced value and the function to update it
 */
export function useDebounceValue<T>(
  initialValue: T | (() => T),
  delay: number,
): [T, (value: T) => void] {
  const unwrappedInitialValue =
    initialValue instanceof Function ? initialValue() : initialValue;
  const [debouncedValue, setDebouncedValue] = useState<T>(
    unwrappedInitialValue,
  );
  const previousValueRef = useRef<T | undefined>(unwrappedInitialValue);
  const updateDebouncedValue = useDebouncedCallback(setDebouncedValue, delay);
  // Update the debounced value if the initial value changes
  if (previousValueRef.current !== unwrappedInitialValue) {
    updateDebouncedValue(unwrappedInitialValue);
    previousValueRef.current = unwrappedInitialValue;
  }
  return [debouncedValue, updateDebouncedValue];
}
