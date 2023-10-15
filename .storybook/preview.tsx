import { type Preview } from "@storybook/react";

import React from "react";

import { withThemeByClassName } from "@storybook/addon-styling";

/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import "@/styles/globals.css";

import { IBM_Plex_Mono } from "next/font/google";

export const sans = IBM_Plex_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const DefaultDecorator = (Story) => (
  <div
    className={`${sans.variable} flex w-screen flex-col font-sans md:flex-row`}
  >
    <div className="dark flex min-h-[50vh] items-center justify-center bg-neutral-950 p-2 md:h-screen md:w-1/2">
      <Story />
    </div>
    <div className="light flex min-h-[50vh] items-center justify-center bg-neutral-50 p-2 md:h-screen md:w-1/2">
      <Story />
    </div>
  </div>
);

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [DefaultDecorator],
};

export default preview;
