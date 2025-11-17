import eslint from "@fonds/eslint-config";

export default eslint({
  typescript: true,
  formatters: true,
  vue: { a11y: true },
  jsx: { a11y: true },
  ignores: [
    "**/uni_modules/",
    "dist",
    "auto-import.d.ts",
    "uni-pages.d.ts",
    "src/pages.json",
    "src/manifest.json",
  ],
  rules: {
    "no-useless-return": "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "vue/no-unused-refs": "off",
    "unused-imports/no-unused-vars": "off",
    "eslint-comments/no-unlimited-disable": "off",
    "jsdoc/check-param-names": "off",
    "jsdoc/require-returns-description": "off",
    "ts/no-empty-object-type": "off",
    "no-extend-native": "off",
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        externalIgnores: ["text"],
      },
    ],
    // vue SFC 调换顺序改这里
    "vue/block-order": ["error", {
      order: [["script", "template"], "style"],
    }],
  },
});
