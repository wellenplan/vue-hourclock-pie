/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    "prettier"
  ],
  overrides: [
    {
      files: ["e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:playwright/recommended"],
    },
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    extraFileExtensions: [".vue"],
    ecmaVersion: "latest",
  },
};
