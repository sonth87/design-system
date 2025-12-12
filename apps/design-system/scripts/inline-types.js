#!/usr/bin/env node

/**
 * Script to inline base component types from @dsui/ui
 * This prevents external dependency issues in published types
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Map of @dsui/ui component types to inline type definitions
const typeReplacements = {
  InputProps: `Omit<React.ComponentProps<"input">, "size"> & {
  size?: "normal" | "sm" | "xs" | "lg" | "xl";
  state?: "default" | "success" | "error" | "warning";
}`,

  ButtonProps: `Omit<React.ComponentProps<"button">, "color"> & {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}`,

  BadgeProps: `React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "destructive" | "outline";
}`,

  SwitchProps: `Omit<React.ComponentProps<typeof RadixSwitch.Root>, "asChild">`,

  ScrollAreaProps: `React.ComponentPropsWithoutRef<typeof RadixScrollArea.Root>`,

  CalendarProps: `{
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | { from?: Date; to?: Date };
  onSelect?: (date: Date | Date[] | { from?: Date; to?: Date } | undefined) => void;
  disabled?: boolean | ((date: Date) => boolean);
  className?: string;
}`,

  RadioGroupProps: `Omit<React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>, "asChild">`,

  SheetProps: `React.ComponentPropsWithoutRef<typeof RadixDialog.Root>`,
};

console.log("📝 This script would inline base types from @dsui/ui");
console.log(
  "⚠️  However, a better approach is to ensure all components re-export their base types"
);
console.log("");
console.log("✅ Input component has been updated as an example");
console.log(
  "📌 Follow the same pattern for other components that extend @dsui/ui types"
);
