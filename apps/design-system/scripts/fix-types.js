#!/usr/bin/env node

/**
 * Script to fix the types folder structure
 * 1. Moves types from dist/types/apps/design-system/src/* to dist/types/*
 * 2. Inlines base types from @dsui/ui to prevent external dependencies
 * 3. Removes packages folder entirely to prevent duplicate export suggestions
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distTypesPath = path.resolve(__dirname, "../dist/types");
const wrongPath = path.join(distTypesPath, "apps/design-system/src");
const packagesPath = path.join(distTypesPath, "packages");

// ====================================================================
// STEP 1: Fix types folder structure (move from apps/design-system/src)
// ====================================================================
if (fs.existsSync(wrongPath)) {
  console.log("🔧 Fixing types folder structure...");

  const items = fs.readdirSync(wrongPath);

  items.forEach((item) => {
    const sourcePath = path.join(wrongPath, item);
    const targetPath = path.join(distTypesPath, item);

    if (fs.existsSync(targetPath)) {
      fs.rmSync(targetPath, { recursive: true, force: true });
    }

    fs.renameSync(sourcePath, targetPath);
    console.log("✓ Moved " + item);
  });

  const appsPath = path.join(distTypesPath, "apps");
  if (fs.existsSync(appsPath)) {
    fs.rmSync(appsPath, { recursive: true, force: true });
    console.log("✓ Removed apps folder");
  }

  console.log("✅ Types folder structure fixed!");
} else {
  console.log("✅ Types folder structure is already correct");
}

// ====================================================================
// STEP 2: Read base component types from packages/ui/src before deletion
// ====================================================================
console.log("\n🔧 Reading base types from packages/ui/src...");

const baseTypesMap = new Map();

// Extract type definitions from packages/ui/src/components
if (fs.existsSync(packagesPath)) {
  const componentFiles = glob.sync("ui/src/components/*.d.ts", {
    cwd: packagesPath,
    absolute: true,
  });

  componentFiles.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    const componentName = path.basename(file, ".d.ts");
    baseTypesMap.set(componentName, content);
  });

  console.log("✓ Cached " + baseTypesMap.size + " base component types");
}

// ====================================================================
// STEP 3: Fix imports in component .d.ts files
// Remove ALL @dsui/ui and packages/ui/src imports, inline known types
// ====================================================================
console.log("\n🔧 Fixing imports in component type files...");

const dtsFiles = glob.sync("**/*.d.ts", {
  cwd: distTypesPath,
  absolute: true,
});

let filesFixed = 0;

// Inline type definitions for common base types
const inlineTypes = {
  TextareaProps: 'Omit<React.ComponentProps<"textarea">, "size"> & { size?: "normal" | "sm" | "xs" | "lg" | "xl"; state?: "default" | "success" | "error" | "warning"; }',
  InputProps: 'Omit<React.ComponentProps<"input">, "size"> & { size?: "normal" | "sm" | "xs" | "lg" | "xl"; state?: "default" | "success" | "error" | "warning"; }',
  ButtonProps: 'React.ComponentProps<"button"> & { variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"; size?: "default" | "sm" | "lg" | "icon"; asChild?: boolean; }',
  BadgeProps: 'React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "destructive" | "outline"; }',
};

dtsFiles.forEach((file) => {
  let content = fs.readFileSync(file, "utf-8");
  const originalContent = content;

  // Remove ALL import lines from @dsui/ui or packages/ui/src
  // This handles both single and multi-named imports
  content = content.replace(
    /import\s*{[^}]+}\s*from\s*["'](?:@dsui\/ui[^"']*|[^"']*packages\/ui\/src[^"']*)["'];?\s*\n?/g,
    ""
  );

  // Also remove export lines from @dsui/ui or packages/ui/src
  content = content.replace(
    /export\s*{[^}]+}\s*from\s*["'](?:@dsui\/ui[^"']*|[^"']*packages\/ui\/src[^"']*)["'];?\s*\n?/g,
    ""
  );

  // Handle re-exports like: export { TreeView, type TreeDataItem } from "@dsui/ui/index";
  content = content.replace(
    /export\s+type?\s*{[^}]+}\s*from\s*["'](?:@dsui\/ui[^"']*|[^"']*packages\/ui\/src[^"']*)["'];?\s*\n?/g,
    ""
  );

  // Handle cn utility imports
  content = content.replace(
    /import\s*{\s*cn\s*}\s*from\s*["'](?:@dsui\/ui\/lib\/utils|[^"']*packages\/ui\/src\/lib\/utils)["'];?\s*\n?/g,
    ""
  );

  // For files that had STextareaProps, SInputProps etc. replaced, add inline types
  const needsInlineTypes = [];
  
  // Check if STextareaProps is used but not defined
  if (content.includes("STextareaProps") && !content.includes("type STextareaProps")) {
    needsInlineTypes.push("type STextareaProps = " + inlineTypes.TextareaProps + ";");
  }
  if (content.includes("SInputProps") && !content.includes("type SInputProps")) {
    needsInlineTypes.push("type SInputProps = " + inlineTypes.InputProps + ";");
  }
  if (content.includes("SButtonProps") && !content.includes("type SButtonProps")) {
    needsInlineTypes.push("type SButtonProps = " + inlineTypes.ButtonProps + ";");
  }
  if (content.includes("SBadgeProps") && !content.includes("type SBadgeProps")) {
    needsInlineTypes.push("type SBadgeProps = " + inlineTypes.BadgeProps + ";");
  }

  // Insert inline types after React import if needed
  if (needsInlineTypes.length > 0) {
    const reactImportMatch = content.match(/import\s+.*?from\s+["']react["'];?\s*\n?/);
    if (reactImportMatch) {
      const insertPos = reactImportMatch.index + reactImportMatch[0].length;
      content = content.slice(0, insertPos) + needsInlineTypes.join("\n") + "\n" + content.slice(insertPos);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, "utf-8");
    filesFixed++;
  }
});

console.log("✅ Fixed " + filesFixed + " component type files");

// ====================================================================
// STEP 4: Remove entire packages folder
// ====================================================================
console.log("\n🔧 Removing packages folder...");

if (fs.existsSync(packagesPath)) {
  fs.rmSync(packagesPath, { recursive: true, force: true });
  console.log("✅ Removed packages folder (prevents duplicate export suggestions)");
}

console.log("\n✅ All type fixes completed!");
