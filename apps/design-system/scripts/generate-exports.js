#!/usr/bin/env node

/**
 * Script to automatically generate exports map for package.json.
 * Subpath exports prefer folder index files so modules like Table can expose
 * multiple named exports without forcing consumers through the root barrel.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, "../package.json");
const srcPath = path.resolve(__dirname, "../src");

function normalizePackagePath(value) {
  return value.replace(/\\/g, "/");
}

function withoutExt(filePath) {
  return normalizePackagePath(filePath.replace(/\.(ts|tsx)$/, ""));
}

function toExportName(name) {
  return name.toLowerCase();
}

function moduleRecord(relNoExt) {
  const normalized = normalizePackagePath(relNoExt);

  return {
    import: {
      types: `./dist/types/${normalized}.d.ts`,
      default: `./dist/esm/${normalized}.js`,
    },
    require: {
      types: `./dist/types/${normalized}.d.ts`,
      default: `./dist/cjs/${normalized}.cjs`,
    },
  };
}

function findDirectoryEntry(baseRel, dirName) {
  const candidates = [
    path.join(baseRel, dirName, "index.ts"),
    path.join(baseRel, dirName, "index.tsx"),
    path.join(baseRel, dirName, `${dirName}.ts`),
    path.join(baseRel, dirName, `${dirName}.tsx`),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(srcPath, candidate))) return withoutExt(candidate);
  }

  return null;
}

function getModulesFromDir(dirName) {
  const dirPath = path.join(srcPath, dirName);
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .flatMap((item) => {
      if (item.isDirectory()) {
        const rel = findDirectoryEntry(dirName, item.name);
        return rel ? [{ name: item.name, rel }] : [];
      }

      if (item.isFile() && /\.tsx?$/.test(item.name)) {
        const fileName = item.name.replace(/\.tsx?$/, "");
        if (fileName === "main") return [];
        return [{ name: fileName, rel: withoutExt(path.join(dirName, item.name)) }];
      }

      return [];
    });
}

function generateExports() {
  const components = getModulesFromDir("components");
  const libModules = getModulesFromDir("lib");
  const hooksModules = getModulesFromDir("hooks");

  const exports = {
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
    "./package.json": "./package.json",
    "./index.css": "./dist/esm/styles/index.css",
  };

  components.forEach(({ name, rel }) => {
    exports[`./${toExportName(name)}`] = moduleRecord(rel);
  });

  libModules.forEach(({ name, rel }) => {
    exports[`./${toExportName(name)}`] = moduleRecord(rel);
  });

  exports["./hooks"] = moduleRecord("hooks/index");
  hooksModules
    .filter(({ name }) => name !== "index")
    .forEach(({ name, rel }) => {
      exports[`./${toExportName(name)}`] = moduleRecord(rel);
    });

  const cssExports = [
    { name: "theme.css", rel: "styles/theme" },
    { name: "index.css", rel: "styles/index" },
    { name: "animation.css", rel: "styles/animation" },
  ];

  cssExports.forEach(({ name, rel }) => {
    const fullPath = path.join(srcPath, name);
    if (fs.existsSync(fullPath)) {
      exports[`./${name}`] = {
        import: `./dist/esm/${rel}.css`,
        require: `./dist/cjs/${rel}.css`,
      };
    }
  });

  return exports;
}

function generateTypesVersions() {
  const components = getModulesFromDir("components");
  const libModules = getModulesFromDir("lib");
  const hooksModules = getModulesFromDir("hooks");

  const typesVersions = {
    "*": {
      "*": ["./dist/types/index.d.ts"],
    },
  };

  const addType = ({ name, rel }) => {
    const normalizedRel = normalizePackagePath(rel);
    typesVersions["*"][toExportName(name)] = [`./dist/types/${normalizedRel}.d.ts`];
  };

  components.forEach(addType);
  libModules.forEach(addType);
  typesVersions["*"].hooks = ["./dist/types/hooks/index.d.ts"];
  hooksModules.filter(({ name }) => name !== "index").forEach(addType);

  return typesVersions;
}

function updatePackageJson() {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  packageJson.exports = generateExports();
  packageJson.typesVersions = generateTypesVersions();
  packageJson.main = "./dist/cjs/index.cjs";
  packageJson.module = "./dist/esm/index.js";
  packageJson.types = "./dist/types/index.d.ts";
  packageJson.files = ["dist", "README.md", "LICENSE", "AI_README.md"];
  packageJson.sideEffects = ["**/*.css"];

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
