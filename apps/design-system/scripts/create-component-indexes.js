#!/usr/bin/env node

/**
 * Script to create index.ts files for each component directory
 * This enables per-component imports like: import Button from "@dsui/design-system/button"
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsPath = path.resolve(__dirname, "../src/components");

function createComponentIndex(componentDir) {
  const componentName = path.basename(componentDir);
  const componentFile = path.join(componentDir, `${componentName}.tsx`);
  const indexFile = path.join(componentDir, "index.ts");

  // Check if component file exists
  if (!fs.existsSync(componentFile)) {
    console.log(`⏭️  Skipping ${componentName} (no ${componentName}.tsx found)`);
    return;
  }

  // Check if index already exists
  if (fs.existsSync(indexFile)) {
    console.log(`✓ ${componentName}/index.ts already exists`);
    return;
  }

  // Read component file to check export type
  const componentContent = fs.readFileSync(componentFile, "utf-8");
  const hasDefaultExport = /export\s+default\s+/m.test(componentContent);
  const hasNamedExport = new RegExp(
    `export\\s+(?:const|function|class)\\s+${componentName}`,
    "m"
  ).test(componentContent);

  // Generate index content
  let indexContent = "";

  if (hasDefaultExport) {
    // Default export
    indexContent = `export { default, default as ${componentName} } from "./${componentName}";\n`;
  } else if (hasNamedExport) {
    // Named export
    indexContent = `export { ${componentName} } from "./${componentName}";\n`;
    indexContent += `export type * from "./${componentName}";\n`;
  } else {
    // Re-export everything
    indexContent = `export * from "./${componentName}";\n`;
  }

  // Write index file
  fs.writeFileSync(indexFile, indexContent);
  console.log(`✅ Created ${componentName}/index.ts`);
}

function main() {
  console.log("🔍 Scanning components directory...\n");

  const items = fs.readdirSync(componentsPath, { withFileTypes: true });

  items.forEach((item) => {
    if (item.isDirectory()) {
      const componentDir = path.join(componentsPath, item.name);
      createComponentIndex(componentDir);
    }
  });

  console.log("\n✨ Done!");
}

try {
  main();
} catch (error) {
  console.error("❌ Error:", error);
  process.exit(1);
}
