import { type Preview } from "@storybook/react";

import React from "react";

import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "@/styles/globals.css";

import { IBM_Plex_Mono } from "next/font/google";

export const sans = IBM_Plex_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const DefaultDecorator = (Story) => (
  <div className={`${sans.variable} font-sans`}>
    <Story />
  </div>
);

export const ThemeDecorator = withThemeByDataAttribute({
  themes: {
    light: "light",
    dark: "dark",
  },
  defaultTheme: "light",
  attributeName: "data-mode",
});

/* snipped for brevity */
const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // decorators: [DefaultDecorator, ThemeDecorator],
};

export const decorators = [DefaultDecorator, ThemeDecorator];

export default preview;
