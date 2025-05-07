import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  globalIgnores([".next/", ".node_modules/", "tailwind.config.ts", "scripts/"]),
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        window: "readonly",  // para ambiente de navegador
        process: "readonly", // para Node.js
        module: "readonly"
      }
    },
    rules: {
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      indent: ["error", 2, { "SwitchCase": 1 }],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-var": "error",
      "prefer-const": "error",
      "default-case": "warn",
      "object-shorthand": ["warn", "always"],
      "no-duplicate-imports": "error",
      "prefer-arrow-callback": "error",
      "object-curly-spacing": ["error", "always"],
      "react-hooks/exhaustive-deps": "off",

      // typescript
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];

export default eslintConfig;
