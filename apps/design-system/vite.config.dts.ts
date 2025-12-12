import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "rollup-plugin-dts";

/**
 * Vite config specifically for bundling TypeScript declarations
 * This resolves external @dsui/ui imports by bundling all types together
 */
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "DesignSystem",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        // Keep these as external in type definitions
        "@number-flow/react",
        "class-variance-authority",
        "clsx",
        /^date-fns/,
        /^motion/,
        "react-day-picker",
        "react-device-detect",
        /^lucide-react/,
        "sonner",
        "use-mask-input",
        "qrcode",
        "gsap",
        /@floating-ui\/.*/,
        "@tanstack/react-table",
        "nuqs",
        "react-hook-form",
        "zod",
      ],
    },
  },
  plugins: [
    {
      ...dts({
        insertTypesEntry: true,
        // Resolve internal @dsui/ui package
        compilerOptions: {
          baseUrl: ".",
          paths: {
            "@/*": ["src/*"],
            "@dsui/ui": ["../../packages/ui/src/index.tsx"],
            "@dsui/ui/*": ["../../packages/ui/src/*"],
          },
        },
      }),
      apply: "build",
    },
  ],
});
