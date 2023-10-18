import { type Preview } from "@storybook/react";
import React from "react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { DocsContainer } from "@storybook/blocks";
import { IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";

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
    layout: "centered",
    backgrounds: { disable: true },
    actions: {
      argTypesRegex: "^on[A-Z].*",
    },
    options: {
      storySort: {
        order: ["Introduction", "*", "Primitives"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // docs: {
    //   container: ({ children, context, ...props }) => (
    //     <DocsContainer context={context} {...props}>
    //       <div className={`${sans.variable} sb-unstyled font-sans`}>
    //         {children}
    //       </div>
    //     </DocsContainer>
    //   ),
    // },
  },
  // decorators: [DefaultDecorator, ThemeDecorator],
};

export const decorators = [DefaultDecorator, ThemeDecorator];

export default preview;
