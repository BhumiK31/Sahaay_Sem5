export default {
  ignores: ["dist"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    es2020: true,
  },
  plugins: ["react-hooks", "react-refresh", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
};
