/* eslint-disable */

import { type Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./.storybook/preview.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "IBM_Plex_Mono", "sans-serif"],
      },
      colors: {
        primary: colors.pink,
        secondary: colors.yellow,
        neutral: colors.slate,
        error: colors.red,
      },
    },
  },
  plugins: [],
} satisfies Config;
