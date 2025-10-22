import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  docs: {
    defaultName: "Documentation",
    docsMode: true,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config, { configType }) => {
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
