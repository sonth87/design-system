#!/usr/bin/env node

/**
 * Script to automatically generate exports map for package.json
 * Run this before publishing to NPM
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, "../package.json");
const srcPath = path.resolve(__dirname, "../src");

function getComponentDirectories() {
  const componentsPath = path.join(srcPath, "components");
  const items = fs.readdirSync(componentsPath, { withFileTypes: true });

  const components = [];

  items.forEach((item) => {
    if (item.isDirectory()) {
      // Check if component file exists
      const componentFile = path.join(
        componentsPath,
        item.name,
        `${item.name}.tsx`
      );
      if (fs.existsSync(componentFile)) {
        components.push(item.name);
      }
    } else if (item.isFile() && item.name.endsWith(".tsx")) {
      // Standalone component files
      const fileName = item.name.replace(".tsx", "");
      components.push(fileName);
    }
  });

  return components;
}

function generateExports() {
  const components = getComponentDirectories();

  const exports = {
    // Main entry
    ".": {
      import: {
        types: "./dist/types/index.d.ts",
        default: "./dist/esm/index.js",
      },
      require: {
        types: "./dist/types/index.d.ts",
        default: "./dist/cjs/index.cjs",
      },
    },
    // Package.json
    "./package.json": "./package.json",
  };

  // Add each component
  components.forEach((component) => {
    const componentLower = component.toLowerCase();
    const componentPath = `components/${component}/${component}`;

    exports[`./${componentLower}`] = {
      import: {
        types: `./dist/types/${componentPath}.d.ts`,
        default: `./dist/esm/${componentPath}.js`,
      },
      require: {
        types: `./dist/types/${componentPath}.d.ts`,
        default: `./dist/cjs/${componentPath}.cjs`,
      },
    };
  });

  // Add CSS exports
  const cssExports = [
    { name: "theme.css", path: "styles/theme" },
    { name: "index.css", path: "styles/index" },
    { name: "animation.css", path: "styles/animation" },
  ];

  cssExports.forEach(({ name, path: cssPath }) => {
    const fullPath = path.join(srcPath, name);
    if (fs.existsSync(fullPath)) {
      exports[`./${name}`] = {
        import: `./dist/esm/${cssPath}.css`,
        require: `./dist/cjs/${cssPath}.css`,
      };
    }
  });

  return exports;
}

function generateTypesVersions() {
  const components = getComponentDirectories();

  const typesVersions = {
    "*": {
      "*": ["./dist/types/index.d.ts"],
    },
  };

  components.forEach((component) => {
    const componentLower = component.toLowerCase();
    const componentPath = `components/${component}/${component}`;

    typesVersions["*"][componentLower] = [`./dist/types/${componentPath}.d.ts`];
  });

  return typesVersions;
}

function updatePackageJson() {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  // Update exports
  packageJson.exports = generateExports();

  // Update typesVersions
  packageJson.typesVersions = generateTypesVersions();

  // Update main fields
  packageJson.main = "./dist/cjs/index.cjs";
  packageJson.module = "./dist/esm/index.js";
  packageJson.types = "./dist/types/index.d.ts";

  // Update files to include
  packageJson.files = ["dist", "README.md", "LICENSE"];

  // Update sideEffects (CSS files have side effects)
  packageJson.sideEffects = ["**/*.css"];

  // Write back
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

  console.log("✅ package.json updated successfully!");
  console.log(`📦 Found ${Object.keys(packageJson.exports).length} exports`);
}

try {
  updatePackageJson();
} catch (error) {
  console.error("❌ Error updating package.json:", error);
  process.exit(1);
}
