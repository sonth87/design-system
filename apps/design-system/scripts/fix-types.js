#!/usr/bin/env node

/**
 * Script to fix the types folder structure
 * Moves types from dist/types/apps/design-system/src/* to dist/types/*
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

  // Clean up the packages folder (we don't need packages types in the output)
  if (fs.existsSync(packagesPath)) {
    fs.rmSync(packagesPath, { recursive: true, force: true });
    console.log("✓ Removed packages folder");
  }

  console.log("✅ Types folder structure fixed!");
} else {
  console.log("✅ Types folder structure is already correct");
}
