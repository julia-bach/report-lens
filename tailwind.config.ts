import type {Config} from "tailwindcss";
import {heroui} from "@heroui/react";

export const themeColors = {};

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Safelisting for bg and text colors
    {
      pattern:
          /(bg|text|fill|stroke)-(blue|orange|lime|yellow|purple|green|slate)-(50|100|200|250|300|350|400|450|500|900|950)/,
      variants: ["lg", "hover", "focus", "lg:hover"]
    },
    // Safelisting for display utilities with responsive variants
    {
      pattern:
          /(hidden|block|inline|flex|inline-block|inline-flex|grid|inline-grid|table|table-row|table-cell)/,
      variants: ["sm", "md", "lg", "xl"]
    },
    {
      pattern: /animate-./
    }
  ],
  darkMode: "class",
  theme: {
    extend: {
      zIndex: {
        '999': '999',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        "autofill-bg": "transparent",
        "autofill-text": "inherit",
        ...themeColors
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    heroui(),
    function ({ addVariant }: { addVariant: (name: string, variant: string) => void }) {
      addVariant("aria-disabled", "&[aria-disabled='true']");
    },
    function ({ addBase }: { addBase: (styles: Record<string, unknown>) => void }) {
      addBase({
        "html": { fontSize: "14px" }
      });
    }
  ]
};

export default config;
