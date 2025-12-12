/**
 * Re-export utilities from @dsui/ui to ensure proper type definitions
 * This file helps avoid external dependency issues in the published package
 */

import { cn as _cn } from "@dsui/ui/lib/utils";
import { Slot as _Slot } from "@dsui/ui/index";
import { useComposedRefs as _useComposedRefs } from "@dsui/ui/index";
import type { ClassValue } from "clsx";

/**
 * Merges multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return _cn(...inputs);
}

export const Slot = _Slot;
export const useComposedRefs = _useComposedRefs;

export type { ClassValue };
