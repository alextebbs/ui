import { type Preview } from "@storybook/react";

import React from "react";

import { withThemeByClassName } from "@storybook/addon-styling";

/* TODO: update import to your tailwind styles file. If you're using Angular, inject this through your angular.json config instead */
import "../src/styles/globals.css";

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

  decorators: [
    (Story) => (
      <div className="flex w-screen">
        <div className="dark flex h-screen w-1/2 items-center justify-center bg-neutral-950 p-2">
          <Story />
        </div>
        <div className="light flex h-screen w-1/2 items-center justify-center bg-neutral-50 p-2">
          <Story />
        </div>
      </div>
    ),
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    // withThemeByClassName({
    //   themes: {
    //     light: "light",
    //     dark: "dark",
    //   },
    //   defaultTheme: "dark",
    // }),
  ],
};

export default preview;
