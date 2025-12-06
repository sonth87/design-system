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

function getModulesFromDir(dirName) {
  const dirPath = path.join(srcPath, dirName);
  if (!fs.existsSync(dirPath)) return [];

  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const modules = [];

  items.forEach((item) => {
    if (item.isDirectory()) {
      // Check if index file exists
      const indexFile = path.join(dirPath, item.name, `index.ts`);
      const indexTsxFile = path.join(dirPath, item.name, `index.tsx`);
      if (fs.existsSync(indexFile) || fs.existsSync(indexTsxFile)) {
        modules.push(item.name);
      }
    } else if (item.isFile() && (item.name.endsWith('.ts') || item.name.endsWith('.tsx'))) {
      // Standalone module files
      const fileName = item.name.replace(/\.tsx?$/, '');
      modules.push(fileName);
    }
  });

  return modules;
}

function getComponentDirectories() {
  return getModulesFromDir("components");
}

function getLibModules() {
  return getModulesFromDir("lib");
}

function getHooksModules() {
  return getModulesFromDir("hooks");
}

function generateExports() {
  const components = getComponentDirectories();
  const libModules = getLibModules();
  const hooksModules = getHooksModules();

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

  // Add each lib module
  libModules.forEach((module) => {
    const moduleLower = module.toLowerCase();
    const modulePath = `lib/${module}/index`;

    exports[`./${moduleLower}`] = {
      import: {
        types: `./dist/types/${modulePath}.d.ts`,
        default: `./dist/esm/${modulePath}.js`,
      },
      require: {
        types: `./dist/types/${modulePath}.d.ts`,
        default: `./dist/cjs/${modulePath}.cjs`,
      },
    };
  });

  // Add each hooks module
  hooksModules.forEach((module) => {
    const moduleLower = module.toLowerCase();
    const modulePath = `hooks/${module}`;

    exports[`./${moduleLower}`] = {
      import: {
        types: `./dist/types/${modulePath}.d.ts`,
        default: `./dist/esm/${modulePath}.js`,
      },
      require: {
        types: `./dist/types/${modulePath}.d.ts`,
        default: `./dist/cjs/${modulePath}.cjs`,
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
  const libModules = getLibModules();
  const hooksModules = getHooksModules();

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

  libModules.forEach((module) => {
    const moduleLower = module.toLowerCase();
    const modulePath = `lib/${module}/index`;

    typesVersions["*"][moduleLower] = [`./dist/types/${modulePath}.d.ts`];
  });

  hooksModules.forEach((module) => {
    const moduleLower = module.toLowerCase();
    const modulePath = `hooks/${module}`;

    typesVersions["*"][moduleLower] = [`./dist/types/${modulePath}.d.ts`];
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
