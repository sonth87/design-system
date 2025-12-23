#!/usr/bin/env node

/**
 * Script to fix the types folder structure
 * 1. Moves types from dist/types/apps/design-system/src/* to dist/types/*
 * 2. Fixes relative paths to packages/ui/src
 * 3. Removes barrel exports from packages/ui/src to prevent duplicate import suggestions
 * 4. Marks packages/ui/src types as internal
 * 
 * This ensures:
 * - Only one import path suggestion: "@sth87/shadcn-design-system"
 * - Full type inference (props, events, etc.) works correctly
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
// STEP 2: Fix relative paths to packages/ui/src
// After moving, paths need to be recalculated
// ====================================================================
console.log("\n🔧 Fixing relative paths to packages/ui/src...");

const allDtsFiles = glob.sync("**/*.d.ts", {
  cwd: distTypesPath,
  absolute: true,
  ignore: ["**/packages/**"]
});

let pathsFixed = 0;

allDtsFiles.forEach((file) => {
  let content = fs.readFileSync(file, "utf-8");
  const originalContent = content;
  
  // Calculate the correct relative path from this file to packages/ui/src
  const fileDir = path.dirname(file);
  const relativePath = path.relative(fileDir, path.join(distTypesPath, "packages/ui/src"));
  const normalizedRelativePath = relativePath.replace(/\\/g, '/');
  
  // Fix various wrong relative paths to packages/ui/src
  // Pattern: from "../../../../../../packages/ui/src/..." or similar
  content = content.replace(
    /from\s*["'](?:\.\.\/)+packages\/ui\/src\//g,
    `from "${normalizedRelativePath}/`
  );
  
  // Also fix any absolute-like paths that might have been generated
  content = content.replace(
    /from\s*["']@dsui\/ui\//g,
    `from "${normalizedRelativePath}/`
  );

  if (content !== originalContent) {
    fs.writeFileSync(file, content, "utf-8");
    pathsFixed++;
  }
});

console.log(`✅ Fixed relative paths in ${pathsFixed} files`);

// ====================================================================
// STEP 3: Remove barrel exports from packages/ui/src to prevent duplicate suggestions
// We keep the individual component type files for proper type resolution
// ====================================================================
console.log("\n🔧 Removing barrel exports from packages/ui/src...");

const barrelExports = [
  "packages/ui/src/index.d.ts",
  "packages/ui/src/index.d.ts.map",
  "packages/ui/src/components/index.d.ts",
  "packages/ui/src/components/index.d.ts.map",
  "packages/ui/src/hooks/index.d.ts", 
  "packages/ui/src/hooks/index.d.ts.map",
  "packages/ui/src/lib/index.d.ts",
  "packages/ui/src/lib/index.d.ts.map",
];

let removedCount = 0;
barrelExports.forEach((barrelPath) => {
  const fullPath = path.join(distTypesPath, barrelPath);
  
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log("✓ Removed " + barrelPath);
    removedCount++;
  }
});

console.log(`✅ Removed ${removedCount} barrel export files`);

// ====================================================================
// STEP 4: Mark packages/ui/src types as internal to hide from auto-import
// This adds @internal JSDoc comment which TypeScript respects
// ====================================================================
console.log("\n🔧 Marking packages/ui/src types as internal...");

if (fs.existsSync(packagesPath)) {
  const packageTypeFiles = glob.sync("**/*.d.ts", {
    cwd: packagesPath,
    absolute: true,
  });
  
  let markedCount = 0;
  packageTypeFiles.forEach((file) => {
    let content = fs.readFileSync(file, "utf-8");
    
    // Skip if already has @internal or @private
    if (content.includes("@internal") || content.includes("@private")) {
      return;
    }
    
    // Add @internal comment at the top to mark all exports as internal
    // This prevents IDE from suggesting imports from this path
    const internalComment = `/**
 * @internal
 * This module is for internal type resolution only.
 * Do not import directly from this path.
 * Use "@sth87/shadcn-design-system" instead.
 */
`;
    content = internalComment + content;
    
    fs.writeFileSync(file, content, "utf-8");
    markedCount++;
  });
  
  console.log(`✅ Marked ${markedCount} type files as @internal`);
}

console.log("\n✅ All type fixes completed!");
console.log("\n📝 Summary:");
console.log("   - Types folder structure: Fixed (moved from apps/design-system/src/)");
console.log("   - Relative paths: Fixed to point to packages/ui/src");
console.log("   - Barrel exports: Removed (prevents duplicate import suggestions)");
console.log("   - Internal types: Marked with @internal JSDoc");
console.log("\n💡 Users should import from: @sth87/shadcn-design-system");
