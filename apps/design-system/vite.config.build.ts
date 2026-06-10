import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { glob } from "glob";
import fs from "fs";
import tailwindcss from "@tailwindcss/vite";

/**
 * Vite config for building the library (ESM + CJS)
 * Supports tree-shaking and per-component imports
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Output directory
    outDir: "dist",

    // Library mode
    lib: {
      entry: getEntryPoints(),
      formats: ["es", "cjs"],
    },

    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        // External all dependencies from package.json
        // NOTE: @dsui/ui is NOT externalized - it will be bundled into the package
        // This ensures types are properly available without external dependencies
        /@radix-ui\/.*/,
        "@number-flow/react",
        "class-variance-authority",
        "clsx",
        "cmdk",
        "input-otp",
        "react-resizable-panels",
        "vaul",
        "tw-animate-css",
        "tailwind-merge",
        /^date-fns/, // Match date-fns and all its subpaths
        /^motion/, // Match motion, motion/react, motion/*, etc.
        "react-day-picker",
        "react-device-detect",
        /^lucide-react/, // Match lucide-react and all its icons
        "sonner",
        "tailwindcss",
        "tailwindcss-animate",
        "use-mask-input",
        // Additional externals
        "qrcode",
        "gsap",
        /@floating-ui\/.*/,
        "@tanstack/react-table",
        "nuqs",
        "react-hook-form",
        "zod",
      ],

      output: [
        {
          // ESM build
          format: "es",
          dir: "dist/esm",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          exports: "named",
          // Preserve CSS imports
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              return "[name][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
        {
          // CJS build
          format: "cjs",
          dir: "dist/cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].cjs",
          exports: "named",
          // Preserve CSS imports
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              return "[name][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
      ],
    },

    // Generate sourcemaps only when explicitly requested for debugging
    sourcemap: process.env.BUILD_SOURCEMAP === "true",

    // Clear output dir before build
    emptyOutDir: true,

    // CSS code splitting
    cssCodeSplit: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@dsui/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
});

/**
 * Get all entry points for the library.
 * Multi-entry is the default so every public subpath can resolve to a small,
 * direct module instead of the legacy root barrel.
 */
function getEntryPoints() {
  const entries: Record<string, string> = {
    index: path.resolve(__dirname, "src/index.ts"),
  };

  const cssFiles = [
    { name: "styles/theme", path: "src/theme.css" },
    { name: "styles/index", path: "src/index.css" },
    { name: "styles/animation", path: "src/animation.css" },
  ];

  cssFiles.forEach(({ name, path: cssPath }) => {
    const fullPath = path.resolve(__dirname, cssPath);
    if (fs.existsSync(fullPath)) entries[name] = fullPath;
  });

  const addEntry = (entryName: string, relativePath: string) => {
    const fullPath = path.resolve(__dirname, relativePath);
    if (fs.existsSync(fullPath)) entries[entryName] = fullPath;
  };

  glob.sync("src/components/*/", { cwd: __dirname }).forEach((dir) => {
    const componentName = path.basename(dir);
    const indexTs = path.join(dir, "index.ts");
    const indexTsx = path.join(dir, "index.tsx");
    const componentTs = path.join(dir, `${componentName}.ts`);
    const componentTsx = path.join(dir, `${componentName}.tsx`);

    const entry =
      [indexTs, indexTsx, componentTs, componentTsx].find((candidate) =>
        fs.existsSync(path.resolve(__dirname, candidate))
      );

    if (entry) addEntry(`components/${componentName}/index`, entry);
  });

  glob.sync("src/components/*.{ts,tsx}", { cwd: __dirname }).forEach((file) => {
    const fileName = path.basename(file, path.extname(file));
    addEntry(`components/${fileName}`, file);
  });

  glob.sync("src/lib/*/", { cwd: __dirname }).forEach((dir) => {
    const moduleName = path.basename(dir);
    addEntry(`lib/${moduleName}/index`, path.join(dir, "index.ts"));
  });
  addEntry("lib/utils", "src/lib/utils.ts");

  addEntry("hooks/index", "src/hooks/index.ts");
  glob.sync("src/hooks/*.ts", { cwd: __dirname }).forEach((file) => {
    const hookName = path.basename(file, ".ts");
    if (hookName !== "index") addEntry(`hooks/${hookName}`, file);
  });

  console.log(`📦 Building library with ${Object.keys(entries).length} entry points`);
  return entries;
}
