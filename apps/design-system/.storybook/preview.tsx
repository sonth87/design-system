import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";
import "../src/index.css";
import "./storystyle.css";
import { Toaster } from "../src/stories/Toast/Toast";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Theme", "Configuration", "*"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    theme: {
      base: "light", // mặc định sáng
      brandTitle: "DS UI System",
      brandUrl: "https://example.com",
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
          root.classList.add("dark");
          document.body.style.background = "#303841";
        } else {
          root.classList.remove("dark");
          document.body.style.background = "#fafafa";
        }
      }, [theme]);

      return (
        <>
          <div
            className={
              theme === "dark"
                ? "dark bg-[#303841] text-[#94a0ad] p-6"
                : "bg-gray-50 text-gray-900 p-6 dark:bg-[#303841] dark:text-[#94a0ad]"
            }
          >
            <Story />
          </div>

          {/* <Toaster
            position="top-left"
            richColors
            expand
            closeButton
            duration={3000}
          /> */}
        </>
      );
    },
  ],
};

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme",
    defaultValue: "light",
    toolbar: {
      icon: "mirror",
      items: [
        { value: "light", title: "Light 🌞" },
        { value: "dark", title: "Dark 🌛" },
      ],
      dynamicTitle: true,
    },
  },
};

export default preview;
