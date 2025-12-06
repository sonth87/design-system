import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  docs: {
    defaultName: "Documentation",
    // docsMode: true,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": join(__dirname, "../src"),
          "@dsui/ui": join(__dirname, "../../../packages/ui/src"),
        },
      },
    });
  },
};

export default config;
