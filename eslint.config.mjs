import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Allow "any" type as a warning, not an error
      "react-hooks/exhaustive-deps": "warn", // Keep useEffect dependencies correct
      "@typescript-eslint/no-unused-vars": "warn", // Warn for unused variables instead of error
    },
  },
];

export default eslintConfig;
