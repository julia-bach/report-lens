import type {Config} from "tailwindcss";
import {heroui} from "@heroui/react";

const primaryColor = process.env.NEXT_PUBLIC_PRIMARY_COLOR || "hsl(327, 54%, 50%)";
const secondaryColor = process.env.NEXT_PUBLIC_SECONDARY_COLOR || "hsl(85, 45%, 50%)";

function adjustHslLightness(hsl: string, amount: number): string {
  const match = hsl.match(/hsla?\((\d+)(?:deg)?,\s*(\d+)%?,\s*(\d+)%?(?:,\s*([\d.]+))?\)/i);
  if (!match) throw new Error("Invalid HSL(A) color");

  const [h, s, l] = match.slice(1, 4).map(Number);
  const a = match[4] !== undefined ? parseFloat(match[4]) : undefined;
  const newL = Math.min(100, Math.max(0, l + amount));

  return `hsl${a !== undefined ? 'a' : ''}(${h}, ${s}%, ${newL}%${a !== undefined ? `, ${a}` : ''})`;
}

export const themeColors = {
  primary: {
    50: adjustHslLightness(primaryColor, 50),
    100: adjustHslLightness(primaryColor, 40),
    200: adjustHslLightness(primaryColor, 25),
    300: adjustHslLightness(primaryColor, 10),
    400: primaryColor,
    500: adjustHslLightness(primaryColor, -10),
    600: adjustHslLightness(primaryColor, -25),
  },
  secondary: {
    50: adjustHslLightness(secondaryColor, 50),
    100: adjustHslLightness(secondaryColor, 40),
    200: adjustHslLightness(secondaryColor, 25),
    300: adjustHslLightness(secondaryColor, 10),
    400: secondaryColor,
    500: adjustHslLightness(secondaryColor, -10),
    600: adjustHslLightness(secondaryColor, -25),
  },
  black: "hsl(0, 0%, 0%)",
  white: "hsl(0, 0%, 100%)",
  gray: {
    100: "hsl(0, 0%, 95%)",
    200: "hsl(0, 0%, 85%)",
    300: "hsl(0, 0%, 70%)",
    400: "hsl(0, 0%, 50%)",
    500: "hsl(0, 0%, 30%)",
    600: "hsl(0, 0%, 15%)",
  },
  slate: {
    50:  "hsl(210, 40%, 98%)",
    100: "hsl(210, 40%, 96%)",
    200: "hsl(210, 40%, 90%)",
    300: "hsl(210, 35%, 80%)",
    400: "hsl(210, 30%, 70%)",
    500: "hsl(210, 25%, 60%)",
    600: "hsl(210, 20%, 45%)",
    700: "hsl(210, 25%, 35%)",
    800: "hsl(210, 25%, 25%)",
    900: "hsl(210, 20%, 15%)",
    950: "hsl(210, 25%, 10%)",
  },
  defaultAppColors: {
    primary: {
      50: "hsl(327, 54%, 100%)",
      100: "hsl(327, 54%, 90%)",
      200: "hsl(327, 54%, 75%)",
      300: "hsl(327, 54%, 60%)",
      400: "hsl(327, 54%, 50%)",
      500: "hsl(327, 54%, 40%)",
      600: "hsl(327, 54%, 25%)",
    },
    secondary: {
      50: "hsl(85, 45%, 100%)",
      100: "hsl(85, 45%, 90%)",
      200: "hsl(85, 45%, 75%)",
      300: "hsl(85, 45%, 60%)",
      400: "hsl(85, 45%, 50%)",
      500: "hsl(85, 45%, 40%)",
      600: "hsl(85, 45%, 25%)",
    }
  }
};

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
