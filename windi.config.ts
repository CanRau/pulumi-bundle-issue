import { defineConfig, transform } from "windicss/helpers";
import plugin from "windicss/plugin";

export default defineConfig({
  darkMode: "class",
  // prefix: "windi-",
  theme: {
    extend: {},
  },
  extract: {
    include: ["pages/**/*.{ts,tsx}"],
    exclude: ["node_modules", ".git"],
  },
  plugins: [
    transform("daisyui"),
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") as string },
        h2: { fontSize: theme("fontSize.xl") as string },
        h3: { fontSize: theme("fontSize.lg") as string },
      });
    }),
  ],
});
