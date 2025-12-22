#!/usr/bin/env node

/**
 * Script to fix the types folder structure
 * 1. Moves types from dist/types/apps/design-system/src/* to dist/types/*
 * 2. Replaces imports from internal @dsui/ui package with inline types
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

// Check if wrong structure exists
if (fs.existsSync(wrongPath)) {
  console.log("🔧 Fixing types folder structure...");

  // Move all files from wrong path to correct path
  const items = fs.readdirSync(wrongPath);

  items.forEach((item) => {
    const sourcePath = path.join(wrongPath, item);
    const targetPath = path.join(distTypesPath, item);

    // Move the item
    if (fs.existsSync(targetPath)) {
      // Remove existing target first
      fs.rmSync(targetPath, { recursive: true, force: true });
    }

    fs.renameSync(sourcePath, targetPath);
    console.log(`✓ Moved ${item}`);
  });

  // Clean up the apps folder
  const appsPath = path.join(distTypesPath, "apps");
  if (fs.existsSync(appsPath)) {
    fs.rmSync(appsPath, { recursive: true, force: true });
    console.log("✓ Removed apps folder");
  }

  console.log("✅ Types folder structure fixed!");
} else {
  console.log("✅ Types folder structure is already correct");
}

// Fix imports from @dsui/ui to use relative paths to bundled code
console.log("\n🔧 Fixing @dsui/ui imports...");

// Find all .d.ts files
const dtsFiles = glob.sync("**/*.d.ts", {
  cwd: distTypesPath,
  absolute: true,
});

let filesFixed = 0;

dtsFiles.forEach((file) => {
  let content = fs.readFileSync(file, "utf-8");
  let modified = false;

  // Calculate relative path depth from current file to dist/types root
  const fileDepth =
    file.replace(distTypesPath, "").split("/").filter(Boolean).length - 1;
  const relativePrefix = fileDepth > 0 ? "../".repeat(fileDepth) : "./";

  // Replace imports from @dsui/ui to relative paths pointing to bundled packages/ui
  // Pattern 1: from "@dsui/ui/components/something"
  const componentImportRegex = /from ["']@dsui\/ui\/components\/([^"']+)["']/g;
  if (componentImportRegex.test(content)) {
    content = content.replace(
      /from ["']@dsui\/ui\/components\/([^"']+)["']/g,
      `from "${relativePrefix}packages/ui/src/components/$1"`
    );
    modified = true;
  }

  // Pattern 2: from "@dsui/ui/lib/utils"
  if (content.includes("@dsui/ui/lib/utils")) {
    content = content.replace(
      /from ["']@dsui\/ui\/lib\/utils["']/g,
      `from "${relativePrefix}packages/ui/src/lib/utils"`
    );
    modified = true;
  }

  // Pattern 3: from "@dsui/ui/index" or from "@dsui/ui"
  if (
    content.includes("@dsui/ui/index") ||
    content.includes('from "@dsui/ui"')
  ) {
    content = content.replace(
      /from ["']@dsui\/ui(?:\/index)?["']/g,
      `from "${relativePrefix}packages/ui/src/index"`
    );
    modified = true;
  }

  // Pattern 4: from "@dsui/ui/hooks/something"
  if (content.includes("@dsui/ui/hooks/")) {
    content = content.replace(
      /from ["']@dsui\/ui\/hooks\/([^"']+)["']/g,
      `from "${relativePrefix}packages/ui/src/hooks/$1"`
    );
    modified = true;
  }

  // Pattern 5: from "@dsui/ui/constants/something"
  if (content.includes("@dsui/ui/constants/")) {
    content = content.replace(
      /from ["']@dsui\/ui\/constants\/([^"']+)["']/g,
      `from "${relativePrefix}packages/ui/src/constants/$1"`
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content, "utf-8");
    filesFixed++;
  }
});

console.log(`✅ Fixed ${filesFixed} type definition files`);

// Remove packages folder after fixing all imports to prevent unwanted IDE auto-import suggestions
// All types are properly exported through package.json exports
if (fs.existsSync(packagesPath)) {
  console.log(
    "\n🔧 Removing packages folder to prevent IDE from suggesting internal paths..."
  );
  fs.rmSync(packagesPath, { recursive: true, force: true });
  console.log("✓ Removed packages folder");
  console.log("✅ Internal types cleaned up!\n");
} else {
  console.log("\n✅ All done!\n");
}
