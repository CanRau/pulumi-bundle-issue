import { defineConfig, transform } from "windicss/helpers";
import plugin from "windicss/plugin";
import forms from "windicss/plugin/forms";
import typography from "windicss/plugin/typography";

export default defineConfig({
  // prefix: "windi-",
  theme: {
    extend: {},
    minHeight: {
      "0": "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
      "4": "4rem",
    },
  },
  extract: {
    include: ["pages/**/*.{ts,tsx}"],
    exclude: ["node_modules", ".git"],
  },
  plugins: [
    transform("tailwind-nord"),
    forms,
    typography,
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") as string },
        h2: { fontSize: theme("fontSize.xl") as string },
        h3: { fontSize: theme("fontSize.lg") as string },
      });
    }),
  ],
});
