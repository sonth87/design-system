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
// STEP 3: Fix relative paths to packages/ui/src
// tsc-alias generates wrong relative paths, need to fix them
// ====================================================================
console.log("\n🔧 Fixing relative paths to packages/ui/src...");

const allDtsFiles = glob.sync("**/*.d.ts", {
  cwd: distTypesPath,
  absolute: true,
});

let pathsFixed = 0;

allDtsFiles.forEach((file) => {
  let content = fs.readFileSync(file, "utf-8");
  const originalContent = content;

  // Fix wrong relative paths like ../../../../../packages/ui/src
  // Should be ../../packages/ui/src (from dist/types/components/* to dist/types/packages/ui/src)
  content = content.replace(
    /from ["']\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/packages\/ui\/src\//g,
    'from "../../packages/ui/src/'
  );
  
  content = content.replace(
    /from ["']\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/packages\/ui\/src\//g,
    'from "../../../packages/ui/src/'
  );

  if (content !== originalContent) {
    fs.writeFileSync(file, content, "utf-8");
    pathsFixed++;
  }
});

console.log("✅ Fixed relative paths in " + pathsFixed + " files");

// ====================================================================
// STEP 4: Remove packages/ui/src/index.d.ts to prevent duplicate exports
// Keep other type files for proper type resolution
// ====================================================================
console.log("\n🔧 Removing packages/ui/src/index.d.ts...");

const packagesUiIndexPath = path.join(distTypesPath, "packages/ui/src/index.d.ts");
const packagesUiIndexMapPath = path.join(distTypesPath, "packages/ui/src/index.d.ts.map");

if (fs.existsSync(packagesUiIndexPath)) {
  fs.unlinkSync(packagesUiIndexPath);
  console.log("✅ Removed packages/ui/src/index.d.ts (prevents duplicate export suggestions)");
}

if (fs.existsSync(packagesUiIndexMapPath)) {
  fs.unlinkSync(packagesUiIndexMapPath);
  console.log("✅ Removed packages/ui/src/index.d.ts.map");
}

// Also remove other potential barrel exports that could cause duplicates
const barrelExports = [
  "packages/ui/src/components/index.d.ts",
  "packages/ui/src/hooks/index.d.ts", 
  "packages/ui/src/lib/index.d.ts",
];

barrelExports.forEach((barrelPath) => {
  const fullPath = path.join(distTypesPath, barrelPath);
  const mapPath = fullPath + ".map";
  
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log("✅ Removed " + barrelPath);
  }
  if (fs.existsSync(mapPath)) {
    fs.unlinkSync(mapPath);
  }
});

console.log("\n✅ All type fixes completed!");
