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

    // Generate sourcemaps for debugging
    sourcemap: true,

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
 * Get all entry points for the library
 *
 * MODE 1 (SIMPLE): Only build src/index.ts - Components exported here will be included
 * MODE 2 (ADVANCED): Build each component as separate entry for individual imports
 *
 * Current mode: SIMPLE (change to ADVANCED if you want per-component imports)
 */
function getEntryPoints() {
  const mode = process.env.BUILD_MODE || "SIMPLE"; // Change to "ADVANCED" for individual component builds

  // Main entry point (always included)
  const entries: Record<string, string> = {
    index: path.resolve(__dirname, "src/index.ts"),
  };

  // Add CSS files as entry points
  const cssFiles = [
    { name: "styles/theme", path: "src/theme.css" },
    { name: "styles/index", path: "src/index.css" },
    { name: "styles/animation", path: "src/animation.css" },
  ];

  cssFiles.forEach(({ name, path: cssPath }) => {
    const fullPath = path.resolve(__dirname, cssPath);
    if (fs.existsSync(fullPath)) {
      entries[name] = fullPath;
    }
  });

  // ADVANCED MODE: Build each component as separate entry point
  // This allows imports like: import Button from "@dsui/design-system/button"
  if (mode === "ADVANCED") {
    console.log(
      "📦 Building in ADVANCED mode - creating individual component entries"
    );

    // Get all component directories
    const componentDirs = glob.sync("src/components/*/", {
      cwd: __dirname,
    });

    componentDirs.forEach((dir) => {
      const componentName = path.basename(dir);
      const componentPath = path.resolve(
        __dirname,
        dir,
        `${componentName}.tsx`
      );

      // Check if component file exists
      if (fs.existsSync(componentPath)) {
        // Use lowercase for consistency: button, avatar, etc.
        entries[`components/${componentName.toLowerCase()}/index`] =
          componentPath;
      }
    });

    // Add standalone component files (not in directories)
    const standaloneFiles = glob.sync("src/components/*.tsx", {
      cwd: __dirname,
    });

    standaloneFiles.forEach((file) => {
      const fileName = path.basename(file, ".tsx");
      entries[`components/${fileName.toLowerCase()}`] = path.resolve(
        __dirname,
        file
      );
    });

    console.log(
      `✅ Found ${Object.keys(entries).length - 1 - cssFiles.length} components`
    );
  } else {
    console.log(
      "📦 Building in SIMPLE mode - only src/index.ts (components exported there will be included)"
    );
  }

  return entries;
}
