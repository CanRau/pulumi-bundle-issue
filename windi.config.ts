// import { defineConfig, transform } from "windicss/helpers";
import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";
import forms from "windicss/plugin/forms";
import typography from "windicss/plugin/typography";
// import { NestObject } from "windicss/types/interfaces";

export default defineConfig({
  // prefix: "windi-",
  // TODO: Remove safelist once everything has been componentized
  safelist: [
    "max-w-32",
    "max-w-56",
    "max-w-96",
    "max-w-prose",
    "h-auto",
    "p-32",
    "block",
    "mb-40",
    "mb-20",
    "mt-12",
    "mt-20",
    "list-disc",
    "list-inside",
    "text-nord0",
    "text-nord1",
    "text-nord3",
    "text-nord4",
    "text-nord5",
    "text-nord6",
    "text-nord7",
    "text-nord14",
    "text-nord15",
    "text-primary",
    "bg-nord0",
    "bg-nord1",
    "bg-nord3",
    "bg-nord4",
    "bg-nord5",
    "bg-nord6",
    "bg-nord7",
    "bg-nord14",
    "bg-nord15",
    "bg-primary",
  ],
  theme: {
    fontSize: {
      xxs: [".65rem", { lineHeight: "1.25rem", letterSpacing: "0.01rem" }],
      xs: [".75rem", { lineHeight: "1.25rem", letterSpacing: "0.01rem" }],
      sm: [".875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.25rem" }],
      lg: ["1.125rem", { lineHeight: "1.25rem" }],
      xl: ["1.25rem", { lineHeight: "1.25rem" }],
      "2xl": ["1.5rem", { lineHeight: "1.25rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.3rem", letterSpacing: "-0.01rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.7rem", letterSpacing: "-0.01rem" }],
      "5xl": ["3rem", { lineHeight: "3.3rem", letterSpacing: "-0.05rem" }],
      "6xl": ["4rem", { lineHeight: "4.4rem", letterSpacing: "-0.05rem" }],
      "7xl": ["5rem", { lineHeight: "5rem", letterSpacing: "-0.05rem" }],
    },
    extend: {
      colors: {
        nord0: "rgb(46, 52, 64)",
        nord1: "rgb(59, 66, 82)",
        nord3: "rgb(76, 86, 106)",
        nord4: "rgb(216, 222, 233)",
        nord5: "rgb(229, 233, 240)",
        nord6: "rgb(236, 239, 244)",
        nord7: "rgb(143, 188, 187)",
        nord14: "rgb(163, 190, 140)",
        nord15: "rgb(180, 142, 173)",
        primary: "rgb(163, 190, 140)",
      },
    },
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
    include: ["{pages,src}/**/*.{ts,tsx}"],
    exclude: ["node_modules", ".git"],
  },
  plugins: [
    // transform("tailwind-nord"),
    forms,
    typography, // todo: check out, is it adding base styles?
    plugin(({ addBase, theme }) => {
      addBase({
        // h1: theme("fontSize.2xl"),
        // h2: theme("fontSize.xl"),
        // h3: theme("fontSize.lg"),
        // p: { fontSize: "1rem", lineHeight: "1.5rem" },
        a: {
          color: theme("colors.nord7"),
        },
        "a:hover": {
          textDecoration: "underline",
        },
      });
      // addComponents({
      //   ".button": {  },
      // });
    }),
  ],
});
