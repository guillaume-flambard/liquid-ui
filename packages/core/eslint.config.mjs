export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: await import("@typescript-eslint/parser"),
    },
    rules: {
      "no-unused-vars": "off", // TypeScript handles this
      "no-undef": "off", // TypeScript handles this
    },
  },
];