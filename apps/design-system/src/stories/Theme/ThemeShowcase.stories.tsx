import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { ThemeShowcase } from "./ThemeShowcase";

const meta = {
  title: "Theme",
  component: ThemeShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Design system Theme Configuration
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any, context: any) => {
      // Apply theme from Storybook toolbar
      const theme = context.globals.theme || "light";

      useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }, [theme]);

      return <Story />;
    },
  ],
} satisfies Meta<typeof ThemeShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The complete theme configuration showcase displaying all available colors,
 * border radius values, and component examples.
 *
 * Use the theme switcher in the toolbar to preview light and dark modes.
 */
export const Default: Story = {
  args: {},
};

/**
 * View the theme in dark mode. Click the theme switcher (🌛) in the toolbar
 * to see how all colors adapt to dark mode.
 */
// export const DarkMode: Story = {
//   args: {},
//   parameters: {
//     backgrounds: { default: 'dark' },
//   },
//   globals: {
//     theme: 'dark',
//   },
// };

/**
 * View the Rose theme variant. This demonstrates how you can create
 * custom theme variants using the `[data-theme="rose"]` selector.
 */
// export const RoseTheme: Story = {
//   args: {},
//   decorators: [
//     (Story: () => React.JSX.Element) => {
//       useEffect(() => {
//         document.documentElement.setAttribute('data-theme', 'rose');
//         return () => {
//           document.documentElement.removeAttribute('data-theme');
//         };
//       }, []);
//       return <Story />;
//     },
//   ],
// };

/**
 * View the Rose Dark theme variant.
 */
// export const RoseDarkTheme: Story = {
//   args: {},
//   parameters: {
//     backgrounds: { default: 'dark' },
//   },
//   decorators: [
//     (Story: () => React.JSX.Element) => {
//       useEffect(() => {
//         document.documentElement.setAttribute('data-theme', 'rose');
//         document.documentElement.classList.add('dark');
//         return () => {
//           document.documentElement.removeAttribute('data-theme');
//           document.documentElement.classList.remove('dark');
//         };
//       }, []);
//       return <Story />;
//     },
//   ],
// };
