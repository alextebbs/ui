/* eslint-disable */

import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Mono", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
