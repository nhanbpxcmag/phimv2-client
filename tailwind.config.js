import { backgroundImage } from "./backgroundImage";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        // accent: {
        //   DEFAULT: "hsl(var(--accent) / <alpha-value>)",
        //   foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        // },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      zIndex: {
        dialog: "var(--z-index-dialog)",
        menu: "999",
      },
      keyframes: {
        pop: {
          "0%": {
            transform: "scale(0.95)",
          },

          "40%": {
            transform: "scale(1.02)",
          },

          to: {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "button-pop": "pop 0.5s ease-out",
        click: "animation-click 0.5s ease-out",
      },
      screens: {
        onlyHover: { raw: "(hover: hover) and (pointer: fine)" },
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        "8xl": "100rem",
        tv40: "240rem",
      },
      width: {
        screen1: "calc(100vw - var(--scrollbarX))",
      },
      height: {
        screen1: "var(--h-client)",
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries"), require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["business"],
  },
};
