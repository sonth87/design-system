import type { Preview } from "@storybook/react";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "../src/index.css";
import "./storystyle.css";
// import { Toaster } from "../src/components/Toast/Toast";

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
      const locale = context.globals.locale || "en";

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

      useEffect(() => {
        i18n.changeLanguage(locale);
      }, [locale]);

      return (
        <I18nextProvider i18n={i18n}>
          <div className="">
            <Story />
          </div>

          {/* <Toaster
            position="top-left"
            richColors
            expand
            closeButton
            duration={3000}
          /> */}
        </I18nextProvider>
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
  locale: {
    name: "Language",
    description: "Internationalization locale",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", title: "English 🇺🇸", right: "EN" },
        { value: "vi", title: "Tiếng Việt 🇻🇳", right: "VI" },
      ],
      dynamicTitle: true,
    },
  },
};

export default preview;
